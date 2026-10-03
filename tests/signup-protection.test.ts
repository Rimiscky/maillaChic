import { beforeEach, describe, expect, it } from "vitest";
import { enforceSignupRateLimit, releaseSignupEmail, resetSignupProtectionForTests, SignupAbuseError } from "../src/lib/signup-protection";

const MINUTE = 60_000;

describe("protection contre les abus d'inscription", () => {
  beforeEach(() => resetSignupProtectionForTests());

  it("rouvre l'origine après la fenêtre de quinze minutes", () => {
    for (let index = 0; index < 5; index += 1) enforceSignupRateLimit("origine", `p${index}@exemple.fr`, 0);
    expect(() => enforceSignupRateLimit("origine", "p5@exemple.fr", 15 * MINUTE - 1)).toThrow(SignupAbuseError);
    expect(() => enforceSignupRateLimit("origine", "p5@exemple.fr", 15 * MINUTE)).not.toThrow();
  });

  it("considère une adresse comme nouvelle après dix minutes", () => {
    expect(enforceSignupRateLimit("a", "camille@exemple.fr", 0).duplicate).toBe(false);
    expect(enforceSignupRateLimit("b", "camille@exemple.fr", 10 * MINUTE - 1).duplicate).toBe(true);
    expect(enforceSignupRateLimit("b", "camille@exemple.fr", 10 * MINUTE).duplicate).toBe(false);
  });

  it("libère une adresse dont l'enregistrement a échoué", () => {
    enforceSignupRateLimit("a", "camille@exemple.fr", 0);
    releaseSignupEmail("camille@exemple.fr");
    expect(enforceSignupRateLimit("a", "camille@exemple.fr", 1).duplicate).toBe(false);
  });

  it("compte les doublons dans la limite de l'origine pour freiner le sondage d'adresses", () => {
    enforceSignupRateLimit("a", "camille@exemple.fr", 0);
    for (let index = 0; index < 4; index += 1) enforceSignupRateLimit("a", "camille@exemple.fr", 1);
    expect(() => enforceSignupRateLimit("a", "camille@exemple.fr", 2)).toThrow(/Trop de tentatives/);
  });

  it("ne réinitialise pas les limites existantes quand beaucoup de clés arrivent", () => {
    for (let index = 0; index < 5; index += 1) enforceSignupRateLimit("bloquee", `p${index}@exemple.fr`, 0);
    for (let index = 0; index < 9_990; index += 1) enforceSignupRateLimit(`flot-${index}`, `flot-${index}@exemple.fr`, 1);
    expect(() => enforceSignupRateLimit("bloquee", "p6@exemple.fr", 2)).toThrow(/Trop de tentatives/);
  });
});
