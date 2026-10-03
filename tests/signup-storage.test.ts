import { mkdtempSync, readFileSync, rmSync, statSync } from "node:fs";
import { tmpdir } from "node:os";
import path from "node:path";
import { createHash } from "node:crypto";
import { afterEach, describe, expect, it, vi } from "vitest";
import { saveSignup, type Signup } from "../src/lib/signup";

const signup: Signup = { email: "camille@exemple.fr", consent: true, interests: ["matieres"] };
const webhook = "https://hooks.maila.test/inscriptions";

describe("stockage des inscriptions", () => {
  afterEach(() => vi.restoreAllMocks());

  it("transmet l'inscription au webhook avec un jeton et une clé d'idempotence", async () => {
    const fetchMock = vi.spyOn(globalThis, "fetch").mockResolvedValue(new Response("", { status: 202 }));
    await saveSignup(signup, { MAILA_SIGNUP_WEBHOOK_URL: webhook, MAILA_SIGNUP_WEBHOOK_TOKEN: "secret" });

    const [url, init] = fetchMock.mock.calls[0];
    expect(String(url)).toBe(webhook);
    expect(init?.method).toBe("POST");
    const headers = init?.headers as Record<string, string>;
    expect(headers.authorization).toBe("Bearer secret");
    expect(headers["x-idempotency-key"]).toBe(createHash("sha256").update(signup.email).digest("hex"));
    expect(JSON.parse(String(init?.body))).toMatchObject({ ...signup, source: "mailachic-v1" });
    expect(init?.signal).toBeInstanceOf(AbortSignal);
  });

  it("n'envoie pas d'en-tête d'autorisation sans jeton", async () => {
    const fetchMock = vi.spyOn(globalThis, "fetch").mockResolvedValue(new Response("", { status: 200 }));
    await saveSignup(signup, { MAILA_SIGNUP_WEBHOOK_URL: webhook });
    expect(fetchMock.mock.calls[0][1]?.headers).not.toHaveProperty("authorization");
  });

  it("refuse un webhook non chiffré sans l'appeler", async () => {
    const fetchMock = vi.spyOn(globalThis, "fetch");
    await expect(saveSignup(signup, { MAILA_SIGNUP_WEBHOOK_URL: "http://hooks.maila.test/x" })).rejects.toThrow(/HTTPS/);
    expect(fetchMock).not.toHaveBeenCalled();
  });

  it("remonte une erreur quand le webhook répond en échec", async () => {
    vi.spyOn(globalThis, "fetch").mockResolvedValue(new Response("", { status: 502 }));
    await expect(saveSignup(signup, { MAILA_SIGNUP_WEBHOOK_URL: webhook })).rejects.toThrow(/indisponible/);
  });

  it("écrit localement en NDJSON avec des droits restreints", async () => {
    const directory = mkdtempSync(path.join(tmpdir(), "maila-store-"));
    const file = path.join(directory, "nested", "subscribers.ndjson");
    try {
      await saveSignup(signup, { NODE_ENV: "development", MAILA_SUBSCRIBERS_FILE: file });
      await saveSignup({ ...signup, email: "alix@exemple.fr" }, { NODE_ENV: "development", MAILA_SUBSCRIBERS_FILE: file });
      const lines = readFileSync(file, "utf8").trim().split("\n").map((line) => JSON.parse(line));
      expect(lines.map((line) => line.email)).toEqual(["camille@exemple.fr", "alix@exemple.fr"]);
      if (process.platform !== "win32") expect(statSync(file).mode & 0o777).toBe(0o600);
    } finally {
      rmSync(directory, { recursive: true, force: true });
    }
  });

  it("refuse d'enregistrer en production sans destination durable", async () => {
    await expect(saveSignup(signup, { NODE_ENV: "production" })).rejects.toThrow(/activée avant la publication/);
  });
});
