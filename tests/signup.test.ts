import { describe, expect, it } from "vitest";
import { parseSignup, signupConfiguration } from "../src/lib/signup";

describe("inscription à l'alerte de lancement", () => {
  it("normalise une adresse valide et exige le consentement", () => {
    expect(parseSignup({ email: "  Camille@Example.FR ", consent: true, company: "", interests: ["collection", "matieres", "inconnu"] })).toEqual({
      email: "camille@example.fr",
      consent: true,
      interests: ["collection", "matieres"],
    });
    expect(() => parseSignup({ email: "camille@example.fr", consent: false, company: "" })).toThrow("consentement");
  });

  it("rejette les adresses invalides et le champ piège rempli", () => {
    expect(() => parseSignup({ email: "pas-un-email", consent: true, company: "" })).toThrow("adresse");
    expect(() => parseSignup({ email: "bot@example.fr", consent: true, company: "robot" })).toThrow(/requête/i);
  });

  it("refuse un lancement public sans destination durable", () => {
    expect(signupConfiguration({ NODE_ENV: "production" })).toEqual({ enabled: false, mode: "unconfigured" });
    expect(signupConfiguration({ NODE_ENV: "production", MAILA_SIGNUP_WEBHOOK_URL: "https://example.com/hook" })).toEqual({ enabled: true, mode: "webhook" });
    expect(signupConfiguration({ NODE_ENV: "development" })).toEqual({ enabled: true, mode: "local" });
  });
});

describe("validation des entrées d'inscription", () => {
  it("rejette les entrées qui ne sont pas des objets", () => {
    for (const input of [null, undefined, "camille@exemple.fr", 42]) {
      expect(() => parseSignup(input)).toThrow(/Requête invalide/);
    }
  });

  it("exige un consentement booléen explicite", () => {
    for (const consent of ["true", "on", 1, undefined]) {
      expect(() => parseSignup({ email: "camille@exemple.fr", consent })).toThrow("consentement");
    }
  });

  it("rejette les adresses trop longues ou sans domaine complet", () => {
    expect(() => parseSignup({ email: `${"a".repeat(250)}@exemple.fr`, consent: true })).toThrow("adresse");
    expect(() => parseSignup({ email: "camille@exemple", consent: true })).toThrow("adresse");
    expect(() => parseSignup({ email: "camille @exemple.fr", consent: true })).toThrow("adresse");
    expect(() => parseSignup({ email: 42, consent: true })).toThrow("adresse");
  });

  it("dédoublonne les centres d'intérêt et ignore les valeurs non reconnues", () => {
    expect(parseSignup({ email: "a@exemple.fr", consent: true, interests: ["collection", "collection", 3, "coulisses"] }).interests)
      .toEqual(["collection", "coulisses"]);
    expect(parseSignup({ email: "a@exemple.fr", consent: true, interests: "collection" }).interests).toEqual([]);
  });

  it("ne conserve aucun champ supplémentaire", () => {
    expect(Object.keys(parseSignup({ email: "a@exemple.fr", consent: true, role: "admin", company: "  " }))).toEqual(["email", "consent", "interests"]);
  });
});
