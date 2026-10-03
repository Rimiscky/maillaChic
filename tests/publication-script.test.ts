import { spawnSync } from "node:child_process";
import { fileURLToPath } from "node:url";
import { describe, expect, it } from "vitest";

const script = fileURLToPath(new URL("../scripts/validate-publication.mjs", import.meta.url));

function validate(env: Record<string, string>) {
  const { PATH, HOME } = process.env;
  const result = spawnSync(process.execPath, [script], { env: { PATH, HOME, NODE_ENV: "production", ...env }, encoding: "utf8" });
  return { status: result.status, output: `${result.stdout}${result.stderr}` };
}

const finalSite = "https://www.mailachic.fr";
const finalHook = "https://api.emailing-prestataire.fr/hooks/maila";

describe("validation de publication", () => {
  it("accepte une configuration HTTPS finale", () => {
    expect(validate({ NEXT_PUBLIC_SITE_URL: finalSite, MAILA_SIGNUP_WEBHOOK_URL: finalHook })).toMatchObject({ status: 0 });
  });

  it("signale les variables manquantes", () => {
    const result = validate({ NEXT_PUBLIC_SITE_URL: finalSite });
    expect(result.status).toBe(1);
    expect(result.output).toContain("MAILA_SIGNUP_WEBHOOK_URL");
  });

  it.each([
    ["URL invalide", "pas une url"],
    ["HTTP", "http://www.mailachic.fr"],
    ["localhost", "https://localhost:3000"],
    ["IPv4", "https://127.0.0.1"],
    ["IPv6", "https://[::1]"],
    ["sous-domaine d'exemple", "https://www.example.com"],
    ["example.org", "https://example.org"],
    ["domaine de test", "https://maila.test"],
    ["domaine local", "https://maila.local"],
    ["valeur de .env.example", "https://votre-domaine.fr"],
    ["nom sans domaine", "https://intranet"],
  ])("refuse une URL de site incorrecte : %s", (_label, url) => {
    expect(validate({ NEXT_PUBLIC_SITE_URL: url, MAILA_SIGNUP_WEBHOOK_URL: finalHook }).status).toBe(1);
  });

  it("refuse le webhook d'exemple fourni dans .env.example", () => {
    const result = validate({ NEXT_PUBLIC_SITE_URL: finalSite, MAILA_SIGNUP_WEBHOOK_URL: "https://votre-service-email.fr/api/inscriptions" });
    expect(result.status).toBe(1);
    expect(result.output).toContain("domaine public final");
  });
});
