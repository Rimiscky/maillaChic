import { readFileSync } from "node:fs";
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

  it("neutralise le script de build uniquement sur la branche deployee", () => {
    const workflow = read(".github/workflows/deploy-hostinger.yml");
    expect(workflow).toContain("Build deja realise par GitHub Actions");
    const sources = read("package.json");
    expect(sources).toContain('"build"');
  });

  it("exclut le cache de build de la branche deployee", () => {
    const workflow = read(".github/workflows/deploy-hostinger.yml");
    expect(workflow).toContain(".next/cache");
  });

  it("verrouille les commandes du workflow par SHA", () => {
    const workflow = read(".github/workflows/deploy-hostinger.yml");
    const uses = workflow.match(/uses:\s*\S+/g) ?? [];
    for (const use of uses) {
      expect(use).toMatch(/@[0-9a-f]{40}/);
    }
  });
});
