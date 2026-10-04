import { readFileSync, readdirSync } from "node:fs";
import { describe, expect, it } from "vitest";
import { collectionBoards, modelePetit } from "../src/lib/collection";

const root = new URL("../", import.meta.url);
const read = (path: string) => readFileSync(new URL(path, root), "utf8");

describe("maquettes de la collection 01", () => {
  it("reprend les caractéristiques du plan de fabrication fourni", () => {
    expect(modelePetit.specs).toEqual([
      ["Largeur", "24 cm"],
      ["Hauteur", "18 cm"],
      ["Profondeur", "9 cm"],
      ["Hauteur de poignée", "10 cm"],
    ]);
    expect(modelePetit.materials).toContain("Simili cuir beige sable");
    expect(modelePetit.materials).toContain("Pagne tissé bordeaux");
  });

  it("présente les visuels comme des maquettes, avec un texte alternatif pour chacun", () => {
    const page = read("src/app/collection/page.tsx");
    expect(page).toContain("Maquettes de conception");
    expect(page).toContain("non photographies de pièces fabriquées");
    expect(page).toContain("Aucune vente n'est ouverte");
    for (const visual of [...modelePetit.views, ...collectionBoards]) expect(visual.alt.length).toBeGreaterThan(40);
  });

  it("ne publie ni le PDF ni le plan de découpe", () => {
    const published = readdirSync(new URL("src/", root), { recursive: true, encoding: "utf8" });
    expect(published.filter((file) => /\.pdf$/i.test(file))).toEqual([]);
    expect(published.some((file) => /decoupe/i.test(file))).toBe(false);
  });

  it("parle de simili cuir, comme le plan de fabrication, et non de cuir", () => {
    for (const file of ["src/app/page.tsx", "src/lib/site.ts"]) {
      expect(read(file), file).not.toMatch(/pagne africain et cuir|et cuir,/i);
    }
    expect(read("src/app/page.tsx")).toContain("Simili cuir et tissu pagne africain");
  });
});
