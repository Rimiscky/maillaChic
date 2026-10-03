import { readFileSync } from "node:fs";
import { beforeEach, describe, expect, it } from "vitest";
import { enforceSignupRateLimit, resetSignupProtectionForTests } from "../src/lib/signup-protection";

const root = new URL("../", import.meta.url);
const read = (path: string) => readFileSync(new URL(path, root), "utf8");

describe("corrections de revue avant publication", () => {
  beforeEach(() => resetSignupProtectionForTests());

  it("limite les inscriptions répétées par origine et repère les adresses en double", () => {
    for (let index = 0; index < 5; index += 1) {
      expect(enforceSignupRateLimit("198.51.100.4", `person${index}@example.fr`, 1_000)).toEqual({ duplicate: false });
    }
    expect(() => enforceSignupRateLimit("198.51.100.4", "six@example.fr", 1_000)).toThrow(/réessayer/i);
    expect(enforceSignupRateLimit("203.0.113.8", "person0@example.fr", 1_000)).toEqual({ duplicate: true });
  });

  it("bloque l'indexation tant que les informations de publication manquent", () => {
    const layout = read("src/app/layout.tsx");
    const robots = read("src/app/robots.ts");
    expect(layout).toContain("index: false");
    expect(robots).toContain('disallow: "/"');
    expect(layout).not.toContain('alternates: { canonical: "/" }');
    expect(layout).not.toContain('url: "/"');
  });

  it("exige une configuration finale avant publication", () => {
    const packageJson = read("package.json");
    const script = read("scripts/validate-publication.mjs");
    expect(packageJson).toContain('"validate:publish"');
    expect(script).toContain("NEXT_PUBLIC_SITE_URL");
    expect(script).toContain("MAILA_SIGNUP_WEBHOOK_URL");
    expect(script).toContain("https:");
  });

  it("ne publie pas de localisation non confirmée et décrit toutes les données collectées", () => {
    expect(read("src/app/page.tsx")).not.toContain("Maison en préouverture · France");
    const privacy = read("src/app/confidentialite/page.tsx");
    expect(privacy).toContain("préférences de contenu");
    expect(privacy).toContain("source d'inscription");
  });
});
