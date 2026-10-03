import { spawnSync } from "node:child_process";
import { mkdirSync, mkdtempSync, readFileSync, rmSync, writeFileSync } from "node:fs";
import { tmpdir } from "node:os";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { describe, expect, it } from "vitest";

const root = new URL("../", import.meta.url);
const read = (path: string) => readFileSync(new URL(path, root), "utf8");

describe("architecture de deploiement Hostinger", () => {
  it("prepare une branche deploy/hostinger prete a servir sans rebuild local", () => {
    const workflow = read(".github/workflows/deploy-hostinger.yml");
    expect(workflow).toContain("deploy/hostinger");
    expect(workflow).toContain("npm run build");
    expect(workflow).toContain("deploy-tree");
    expect(workflow).not.toContain("SSH_PASSWORD");
  });

  it("publie les sources avec la sortie construite et un build qui sait reconstruire", () => {
    const workflow = read(".github/workflows/deploy-hostinger.yml");
    expect(workflow).toContain('pkg.scripts.build = "node scripts/hostinger-build.mjs"');
    expect(workflow).toContain("cp -R src scripts deploy-tree/");
    expect(workflow).toContain("tsconfig.json");
    expect(workflow).not.toMatch(/^\s+cp -R public/m);
    expect(read("package.json")).toContain('"build": "next build"');
  });

  it("réutilise la sortie préconstruite quand l'hébergeur l'a conservée", () => {
    const directory = mkdtempSync(path.join(tmpdir(), "maila-deploy-"));
    try {
      mkdirSync(path.join(directory, ".next"));
      writeFileSync(path.join(directory, ".next", "BUILD_ID"), "abc");
      const script = fileURLToPath(new URL("../scripts/hostinger-build.mjs", import.meta.url));
      const result = spawnSync(process.execPath, [script], { cwd: directory, encoding: "utf8" });
      expect(result.status).toBe(0);
      expect(result.stdout).toContain("compilation ignorée");
    } finally {
      rmSync(directory, { recursive: true, force: true });
    }
  });

  it("fige l'URL publique au build, car Hostinger ne reconstruit pas le site", () => {
    const workflow = read(".github/workflows/deploy-hostinger.yml");
    expect(workflow).toMatch(/NEXT_PUBLIC_SITE_URL: https:\/\/mailachic\.rimiscky\.fr/);
  });

  it("exclut le cache de build de la branche deployee", () => {
    const workflow = read(".github/workflows/deploy-hostinger.yml");
    expect(workflow).toContain(".next/cache");
  });

  it("ne casse pas l assemblage quand public/ est absent", () => {
    const workflow = read(".github/workflows/deploy-hostinger.yml");
    expect(workflow).toContain("if [ -d public ]");
  });

  it("verrouille les commandes du workflow par SHA", () => {
    const workflow = read(".github/workflows/deploy-hostinger.yml");
    const uses = workflow.match(/uses:\s*\S+/g) ?? [];
    for (const use of uses) {
      expect(use).toMatch(/@[0-9a-f]{40}/);
    }
  });
});
