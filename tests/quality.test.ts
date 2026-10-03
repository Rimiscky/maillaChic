import { existsSync, readFileSync } from "node:fs";
import { describe, expect, it } from "vitest";

const root = new URL("../", import.meta.url);
const read = (path: string) => readFileSync(new URL(path, root), "utf8");

describe("qualité de publication", () => {
  it("expose les routes SEO et une image sociale dédiée", () => {
    for (const file of ["src/app/sitemap.ts", "src/app/robots.ts", "src/app/manifest.ts", "src/app/opengraph-image.tsx"]) {
      expect(existsSync(new URL(file, root)), file).toBe(true);
    }
    const layout = read("src/app/layout.tsx");
    expect(layout).toContain('images: ["/opengraph-image"]');
    expect(layout).toContain('applicationName: site.name');
  });

  it("envoie des en-têtes défensifs compatibles avec la V1", () => {
    const config = read("next.config.ts");
    for (const value of [
      "X-Content-Type-Options",
      "Referrer-Policy",
      "Permissions-Policy",
      "Content-Security-Policy",
      "frame-ancestors 'none'",
    ]) expect(config).toContain(value);
    expect(config).toContain("poweredByHeader: false");
  });

  it("rend les pages à la demande pour appliquer le nonce de la CSP", () => {
    expect(read("src/app/layout.tsx")).toContain("await connection()");
    expect(read("src/proxy.ts")).toContain("export function proxy");
  });

  it("valide dans la CI les mêmes barrières qu'en local", () => {
    const workflow = read(".github/workflows/ci.yml");
    for (const command of ["npm ci", "npm test", "npm run typecheck", "npm run lint", "npm run build", "npm audit --omit=dev"]) {
      expect(workflow).toContain(command);
    }
  });
});
