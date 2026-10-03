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

  it("accepte de nouveau une adresse après dix minutes", () => {
    enforceSignupRateLimit("a", "camille@exemple.fr", 0);
    expect(() => enforceSignupRateLimit("b", "camille@exemple.fr", 10 * MINUTE - 1)).toThrow(/déjà enregistrée/);
    expect(() => enforceSignupRateLimit("b", "camille@exemple.fr", 10 * MINUTE)).not.toThrow();
  });

  it("libère une adresse dont l'enregistrement a échoué", () => {
    enforceSignupRateLimit("a", "camille@exemple.fr", 0);
    releaseSignupEmail("camille@exemple.fr");
    expect(() => enforceSignupRateLimit("a", "camille@exemple.fr", 1)).not.toThrow();
  });

  it("ne compte pas une adresse en double dans la limite de l'origine", () => {
    enforceSignupRateLimit("a", "camille@exemple.fr", 0);
    for (let index = 0; index < 3; index += 1) {
      expect(() => enforceSignupRateLimit("a", "camille@exemple.fr", 1)).toThrow(/déjà enregistrée/);
    }
    for (let index = 1; index < 5; index += 1) enforceSignupRateLimit("a", `p${index}@exemple.fr`, 2);
    expect(() => enforceSignupRateLimit("a", "p6@exemple.fr", 3)).toThrow(/Trop de tentatives/);
  });
});
