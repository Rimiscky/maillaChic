import { mkdtempSync, readFileSync, rmSync } from "node:fs";
import { tmpdir } from "node:os";
import path from "node:path";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { POST } from "../src/app/api/signup/route";
import { resetSignupProtectionForTests } from "../src/lib/signup-protection";

let directory: string;
let subscribersFile: string;

function signupRequest(body: unknown, headers: Record<string, string> = {}) {
  return new Request("http://localhost/api/signup", {
    method: "POST",
    headers: { "content-type": "application/json", "x-real-ip": "198.51.100.10", "user-agent": "vitest", ...headers },
    body: typeof body === "string" ? body : JSON.stringify(body),
  });
}

const valid = { email: "Camille@Exemple.fr", consent: true, company: "", interests: ["collection"] };

describe("route d'inscription", () => {
  beforeEach(() => {
    resetSignupProtectionForTests();
    directory = mkdtempSync(path.join(tmpdir(), "maila-route-"));
    subscribersFile = path.join(directory, "subscribers.ndjson");
    vi.stubEnv("MAILA_SUBSCRIBERS_FILE", subscribersFile);
    vi.stubEnv("MAILA_SIGNUP_WEBHOOK_URL", "");
  });

  afterEach(() => {
    vi.unstubAllEnvs();
    vi.restoreAllMocks();
    rmSync(directory, { recursive: true, force: true });
  });

  it("classe le JSON mal formé comme erreur client", async () => {
    const response = await POST(signupRequest("{"));
    expect(response.status).toBe(400);
  });

  it("refuse un corps déclaré trop volumineux", async () => {
    const response = await POST(signupRequest("{}", { "content-length": "9000" }));
    expect(response.status).toBe(413);
  });

  it("mesure la taille réelle du corps en octets", async () => {
    // 4 200 caractères accentués occupent 8 400 octets : sous la limite en caractères, au-dessus en octets.
    const response = await POST(signupRequest({ ...valid, padding: "é".repeat(4_200) }));
    expect(response.status).toBe(413);
  });

  it("classe une adresse invalide comme erreur client", async () => {
    const response = await POST(signupRequest({ email: "incorrect", consent: true, company: "" }));
    expect(response.status).toBe(400);
  });

  it("enregistre une inscription valide en développement", async () => {
    const response = await POST(signupRequest(valid));
    expect(response.status).toBe(201);
    expect(await response.json()).toEqual({ message: "Votre inscription est enregistrée." });
    const record = JSON.parse(readFileSync(subscribersFile, "utf8").trim());
    expect(record).toMatchObject({ email: "camille@exemple.fr", consent: true, interests: ["collection"], source: "mailachic-v1" });
    expect(Number.isNaN(Date.parse(record.consentedAt))).toBe(false);
    expect(record).not.toHaveProperty("company");
  });

  it("refuse honnêtement l'inscription en production sans webhook", async () => {
    vi.stubEnv("NODE_ENV", "production");
    vi.spyOn(console, "error").mockImplementation(() => {});
    const response = await POST(signupRequest(valid));
    expect(response.status).toBe(503);
    expect((await response.json()).message).toMatch(/pas disponible/);
  });

  it("ne révèle pas qu'une adresse est déjà inscrite et ne l'enregistre qu'une fois", async () => {
    const first = await POST(signupRequest(valid));
    const second = await POST(signupRequest(valid, { "x-real-ip": "203.0.113.20" }));
    expect(second.status).toBe(first.status);
    expect(await second.json()).toEqual(await first.json());
    expect(readFileSync(subscribersFile, "utf8").trim().split("\n")).toHaveLength(1);
  });

  it("limite les tentatives par origine", async () => {
    expect((await POST(signupRequest(valid))).status).toBe(201);
    for (let index = 1; index < 5; index += 1) {
      expect((await POST(signupRequest({ ...valid, email: `personne${index}@exemple.fr` }))).status).toBe(201);
    }
    expect((await POST(signupRequest({ ...valid, email: "sixieme@exemple.fr" }))).status).toBe(429);
    expect((await POST(signupRequest({ ...valid, email: "sixieme@exemple.fr" }, { "x-real-ip": "203.0.113.9" }))).status).toBe(201);
  });

  it("autorise une nouvelle tentative après un échec d'enregistrement", async () => {
    vi.stubEnv("MAILA_SIGNUP_WEBHOOK_URL", "https://hooks.maila.test/inscriptions");
    vi.spyOn(console, "error").mockImplementation(() => {});
    const fetchMock = vi.spyOn(globalThis, "fetch").mockResolvedValueOnce(new Response("", { status: 500 }));
    expect((await POST(signupRequest(valid))).status).toBe(503);

    fetchMock.mockResolvedValueOnce(new Response("", { status: 200 }));
    expect((await POST(signupRequest(valid))).status).toBe(201);
    expect(fetchMock).toHaveBeenCalledTimes(2);
  });

  it("ignore les adresses x-forwarded-for choisies par le client", async () => {
    const forwarded = (spoofed: string) => signupRequest({ ...valid, email: `${spoofed}@exemple.fr` }, {
      "x-real-ip": "",
      "x-forwarded-for": `${spoofed}, 198.51.100.77`,
    });
    for (let index = 0; index < 5; index += 1) expect((await POST(forwarded(`10.0.0.${index}`))).status).toBe(201);
    expect((await POST(forwarded("10.0.0.99"))).status).toBe(429);
  });

  it("ne divulgue pas le détail des erreurs internes", async () => {
    vi.stubEnv("MAILA_SIGNUP_WEBHOOK_URL", "https://hooks.maila.test/inscriptions");
    const log = vi.spyOn(console, "error").mockImplementation(() => {});
    vi.spyOn(globalThis, "fetch").mockRejectedValueOnce(new TypeError("connect ECONNREFUSED 10.0.0.4:443"));
    const response = await POST(signupRequest(valid));
    expect(response.status).toBe(503);
    const text = await response.text();
    expect(text).not.toContain("ECONNREFUSED");
    expect(JSON.stringify(log.mock.calls)).not.toContain("camille");
  });
});
