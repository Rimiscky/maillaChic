import { existsSync, readdirSync, readFileSync } from "node:fs";
import { describe, expect, it } from "vitest";

const root = new URL("../", import.meta.url);
const read = (path: string) => readFileSync(new URL(path, root), "utf8");

describe("photographies d'ambiance provisoires", () => {
  const photos = read("src/lib/photos.ts");
  const component = read("src/components/ambiance-photo.tsx");

  it("ne publie que les trois photographies sans logo d'une autre marque", () => {
    const files = readdirSync(new URL("src/assets/ambiance/", root)).sort();
    expect(files).toEqual(["cabas-facade-tissee.webp", "modele-sac-ecailles.webp", "sac-bordeaux-vannerie.webp"]);
    for (const file of files) expect(existsSync(new URL(`src/assets/ambiance/${file}`, root))).toBe(true);
    expect(`${photos}\n${read("src/app/page.tsx")}\n${read("src/app/collection/page.tsx")}`).not.toMatch(/scelto|scèltö|koolafrika/i);
  });

  it("annonce toujours que la pièce est provisoire et hors collection", () => {
    expect(photos).toContain('AMBIANCE_CAPTION = "Photographie d\'ambiance provisoire · pièce hors collection Maila Chic"');
    expect(component).toContain("<figcaption>{AMBIANCE_CAPTION}</figcaption>");
  });

  it("décrit chaque image pour les lecteurs d'écran", () => {
    const alts = [...photos.matchAll(/alt: "([^"]+)"/g)].map(([, alt]) => alt);
    expect(alts).toHaveLength(4);
    for (const alt of alts) expect(alt.length).toBeGreaterThan(40);
  });

  it("reste compatible avec la CSP à nonce : aucun attribut style en ligne", () => {
    expect(component).not.toMatch(/style=\{/);
    expect(component).not.toMatch(/from "next\/image"/);
    const css = read("src/app/globals.css");
    for (const focus of ["modele", "detail", "bordeaux", "cabas"]) expect(css).toContain(`img[data-focus="${focus}"]`);
  });

  it("utilise les photographies sur l'accueil et la collection", () => {
    expect(read("src/app/page.tsx")).toContain("<AmbiancePhoto photo={ambiancePhotos.modeleSacEcailles} eager />");
    expect(read("src/app/collection/page.tsx")).toContain("chapterPhotos[index]");
  });
});
