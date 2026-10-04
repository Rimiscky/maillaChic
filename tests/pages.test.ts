import { existsSync, readFileSync, readdirSync } from "node:fs";
import { describe, expect, it } from "vitest";

const root = new URL("../", import.meta.url);
const read = (path: string) => readFileSync(new URL(path, root), "utf8");

describe("parcours public V1", () => {
  it("livre toutes les pages annoncées dans la navigation", () => {
    for (const route of [
      "src/app/page.tsx",
      "src/app/univers/page.tsx",
      "src/app/collection/page.tsx",
      "src/app/carnet/page.tsx",
      "src/app/alerte/page.tsx",
      "src/app/mentions-legales/page.tsx",
      "src/app/confidentialite/page.tsx",
      "src/app/not-found.tsx",
    ]) expect(existsSync(new URL(route, root)), route).toBe(true);
  });

  it("propose une expérience de préouverture cohérente et sans achat", () => {
    const home = read("src/app/page.tsx");
    const collection = read("src/app/collection/page.tsx");
    expect(home).toContain("L'authenticité africaine, <em>le chic</em> à la française.");
    expect(home).toContain('href="/alerte"');
    expect(home).toContain("Découvrir la collection");
    expect(read("src/components/header.tsx")).toContain("La première collection se dessine");
    expect(collection).toContain("Aucune vente n'est ouverte");
    expect(`${home}\n${collection}`).not.toMatch(/ajouter au panier|acheter maintenant|commander/i);
  });

  it("rend le contenu principal atteignable et décrit les visuels temporaires", () => {
    const layout = read("src/app/layout.tsx");
    const footer = read("src/components/footer.tsx");
    const css = read("src/app/globals.css");
    expect(layout).toContain('<html lang="fr">');
    expect(layout).toContain('href="#contenu"');
    expect(layout).toContain('id="contenu"');
    expect(footer).toContain("Photographies d'ambiance provisoires");
    expect(footer).toContain("ne font pas partie de la collection Maila Chic");
    expect(css).toContain(":focus-visible");
    expect(css).toContain("min-height: 44px");
    expect(css).toContain("prefers-reduced-motion");
  });

  it("ne contient aucun tiret long", () => {
    const forbidden = String.fromCharCode(0x2014);
    const offenders: string[] = [];
    const base = new URL("src/", root);
    for (const entry of readdirSync(base, { recursive: true, encoding: "utf8" })) {
      if (!/\.(ts|tsx|css)$/.test(entry)) continue;
      if (readFileSync(new URL(entry, base), "utf8").includes(forbidden)) offenders.push(entry);
    }
    expect(offenders).toEqual([]);
  });
});

describe("direction de la maquette, sans affirmations non vérifiées", () => {
  it("présente pagne, cuir et artisans comme des intentions, sans commerce", () => {
    const home = read("src/app/page.tsx");
    for (const intention of ["tissu pagne africain et cuir", "pensée avec des artisans", "Nos univers", "Nos inspirations"]) {
      expect(home).toContain(intention);
    }
    const publicCopy = `${home}\n${read("src/components/header.tsx")}\n${read("src/components/footer.tsx")}`;
    expect(publicCopy).not.toMatch(/commerce équitable|cuir véritable|artisans africains|fait main|livraison|panier|€|\d+,\d{2}/i);
    expect(publicCopy).not.toMatch(/contact@|0[1-9](?: ?\d{2}){4}/);
  });
});
