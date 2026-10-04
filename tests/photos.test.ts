import { existsSync, readdirSync, readFileSync } from "node:fs";
import { describe, expect, it } from "vitest";

const root = new URL("../", import.meta.url);
const read = (path: string) => readFileSync(new URL(path, root), "utf8");

describe("photographies d'ambiance provisoires", () => {
  const photos = read("src/lib/photos.ts");
  const component = read("src/components/ambiance-photo.tsx");

  it("ne publie que les photographies sans logo ni monogramme d'une autre marque", () => {
    const files = readdirSync(new URL("src/assets/ambiance/", root)).sort();
    expect(files).toEqual([
      "cabas-facade-tissee.webp", "cabas-socles-tisses.webp", "duo-cabas-peau.webp", "femme-cabas-patchwork.webp",
      "grand-sac-bogolan-porte.webp", "minaudiere-spherique.webp", "pochette-demi-lune-wax.webp", "portrait-marche-panier.webp",
      "sac-bogolan-chaine.webp", "sac-bogolan-leve.webp", "sac-bordeaux-vannerie.webp", "sac-cuir-guitare.webp",
      "sac-franges-multicolores.webp", "sac-perle-eventail.webp", "sac-pyramide-kente.webp", "sac-raffia-vert-visage.webp",
      "sac-voyage-wax-jardin.webp", "sacs-noeuds-wax.webp", "veste-volants-wax.webp",
    ]);
    for (const file of files) expect(existsSync(new URL(`src/assets/ambiance/${file}`, root))).toBe(true);
    expect(readdirSync(new URL("src/", root)).filter((file) => /\.(jpe?g|png|webp)$/i.test(file))).toEqual([]);
    expect(`${photos}\n${read("src/app/page.tsx")}\n${read("src/app/collection/page.tsx")}`).not.toMatch(/scelto|scèltö|koolafrika/i);
  });

  it("annonce toujours que la pièce est provisoire et hors collection", () => {
    expect(photos).toContain('AMBIANCE_CAPTION = "Photographie d\'ambiance provisoire · pièce hors collection Maila Chic"');
    expect(component).toContain("<figcaption>{AMBIANCE_CAPTION}</figcaption>");
  });

  it("décrit chaque image pour les lecteurs d'écran", () => {
    const alts = [...photos.matchAll(/alt: "([^"]+)"/g)].map(([, alt]) => alt);
    expect(alts).toHaveLength(20);
    for (const alt of alts) expect(alt.length).toBeGreaterThan(40);
  });

  it("reste compatible avec la CSP à nonce : aucun attribut style en ligne", () => {
    expect(component).not.toMatch(/style=\{/);
    expect(component).not.toMatch(/from "next\/image"/);
    const css = read("src/app/globals.css");
    for (const focus of ["patchwork", "bogolan", "kente", "spherique", "bordeaux", "cabas"]) expect(css).toContain(`img[data-focus="${focus}"]`);
  });

  it("signale les vignettes d'inspiration comme hors collection sur chaque page qui les montre", () => {
    expect(photos).toContain("Pièces d'inspiration, hors collection Maila Chic.");
    for (const page of ["src/app/page.tsx", "src/app/univers/page.tsx", "src/app/carnet/page.tsx"]) {
      const source = read(page);
      expect(source, page).toContain("<InspirationPhoto");
      expect(source, page).toContain("{INSPIRATION_NOTE}");
    }
    const inspiration = read("src/components/inspiration-photo.tsx");
    expect(inspiration).not.toMatch(/style=\{/);
    expect(inspiration).not.toMatch(/from "next\/image"/);
  });

  it("utilise les photographies sur l'accueil et la collection", () => {
    expect(read("src/app/page.tsx")).toContain("<CollectionFigure visual={collectionHero}");
    expect(read("src/app/page.tsx")).toContain("<AmbiancePhoto photo={ambiancePhotos.sacBogolanLeve} />");
    expect(read("src/app/univers/page.tsx")).toContain("<AmbiancePhoto photo={ambiancePhotos.sacPyramideKente} />");
    expect(read("src/app/collection/page.tsx")).toContain("collectionBoards.map");
  });
});
