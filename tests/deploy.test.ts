import { spawnSync } from "node:child_process";
import { existsSync, mkdirSync, mkdtempSync, readFileSync, rmSync, writeFileSync } from "node:fs";
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
    expect(workflow).toContain("run: node scripts/hostinger-build.mjs");
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

  it("produit le serveur autonome qu'exige l'application Node.js de Hostinger", () => {
    expect(read("next.config.ts")).toContain('output: "standalone"');
    const workflow = read(".github/workflows/deploy-hostinger.yml");
    expect(workflow).toContain('pkg.scripts.start = "node .next/standalone/server.js"');
    expect(workflow).toContain("printf '/node_modules/\\n'");
  });

  it("réutilise le serveur autonome préconstruit et y copie les fichiers statiques", () => {
    const directory = mkdtempSync(path.join(tmpdir(), "maila-deploy-"));
    try {
      mkdirSync(path.join(directory, ".next", "standalone"), { recursive: true });
      mkdirSync(path.join(directory, ".next", "static", "chunks"), { recursive: true });
      writeFileSync(path.join(directory, ".next", "standalone", "server.js"), "");
      writeFileSync(path.join(directory, ".next", "static", "chunks", "app.css"), "body{}");
      const script = fileURLToPath(new URL("../scripts/hostinger-build.mjs", import.meta.url));
      const result = spawnSync(process.execPath, [script], { cwd: directory, encoding: "utf8" });
      expect(result.status).toBe(0);
      expect(result.stdout).toContain("compilation ignorée");
      expect(existsSync(path.join(directory, ".next", "standalone", ".next", "static", "chunks", "app.css"))).toBe(true);
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
