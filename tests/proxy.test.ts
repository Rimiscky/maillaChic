import { NextRequest } from "next/server";
import { describe, expect, it } from "vitest";
import { config, contentSecurityPolicy, proxy } from "../src/proxy";

const scriptSource = (policy: string) => policy.split("; ").find((directive) => directive.startsWith("script-src")) ?? "";

describe("politique de sécurité du contenu", () => {
  it("autorise les scripts par nonce, sans 'unsafe-inline' ni 'unsafe-eval' en production", () => {
    const policy = contentSecurityPolicy("abc", false);
    expect(scriptSource(policy)).toBe("script-src 'self' 'nonce-abc' 'strict-dynamic'");
    expect(policy).not.toContain("unsafe-inline");
    expect(policy).not.toContain("unsafe-eval");
    for (const directive of ["frame-ancestors 'none'", "object-src 'none'", "base-uri 'self'", "form-action 'self'"]) {
      expect(policy).toContain(directive);
    }
  });

  it("n'autorise eval qu'en développement", () => {
    expect(scriptSource(contentSecurityPolicy("abc", true))).toContain("'unsafe-eval'");
  });

  it("génère un nonce différent à chaque requête et le transmet au rendu", () => {
    const first = proxy(new NextRequest("http://localhost/"));
    const second = proxy(new NextRequest("http://localhost/"));
    const policy = first.headers.get("content-security-policy") ?? "";
    const nonce = /'nonce-([^']+)'/.exec(policy)?.[1];
    expect(nonce).toMatch(/^[A-Za-z0-9+/=]{24,}$/);
    expect(second.headers.get("content-security-policy")).not.toContain(nonce);
    expect(first.headers.get("x-middleware-request-x-nonce")).toBe(nonce);
  });

  it("ignore l'API, les fichiers statiques et les préchargements", () => {
    const [matcher] = config.matcher;
    const pattern = new RegExp(`^${matcher.source}$`);
    expect(pattern.test("/collection")).toBe(true);
    expect(pattern.test("/api/signup")).toBe(false);
    expect(pattern.test("/_next/static/chunks/app.js")).toBe(false);
    expect(matcher.missing.map(({ key }) => key)).toContain("next-router-prefetch");
  });
});
