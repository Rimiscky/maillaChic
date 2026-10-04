import { readFileSync } from "node:fs";
import { describe, expect, it } from "vitest";

const root = new URL("../", import.meta.url);
const read = (path: string) => readFileSync(new URL(path, root), "utf8");

describe("experience mobile-first", () => {
  it("agrandit la zone tactile du menu et du brand sur mobile", () => {
    const css = read("src/app/globals.css");
    expect(css).toMatch(/\.mobile-menu summary[^}]*min-height: 44px/);
    expect(css).toMatch(/\.mobile-menu summary[^}]*min-width: 44px/);
  });

  it("garantit des cases a cocher faciles a toucher", () => {
    const css = read("src/app/globals.css");
    expect(css).toMatch(/\.interest-fieldset label[^}]*min-height: 48px/);
    expect(css).toMatch(/\.consent-row[^}]*min-height: 48px/);
    expect(css).toMatch(/\.interest-fieldset input[^}]*width: 1\.35rem/);
  });

  it("affiche un etat de focus net sur le champ email souligne", () => {
    const css = read("src/app/globals.css");
    expect(css).toMatch(/\.field input:focus[^}]*border-bottom-width: 2px/);
  });

  it("etend le bouton d envoi en pleine largeur sur petits ecrans", () => {
    const css = read("src/app/globals.css");
    expect(css).toMatch(/@media \(max-width: 520px\)[\s\S]*\.signup-form \.button \{ width: 100%; \}/);
  });

  it("renforce le contraste du kicker sur fond sombre", () => {
    const css = read("src/app/globals.css");
    expect(css).toMatch(/\.manifesto-copy \.eyebrow[^{]*\{[^}]*var\(--sand\)/);
  });
});
