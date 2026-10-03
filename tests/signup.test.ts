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
