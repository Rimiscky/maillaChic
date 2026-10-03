import { readFileSync } from "node:fs";
import { describe, expect, it } from "vitest";

const root = new URL("../", import.meta.url);
const read = (path: string) => readFileSync(new URL(path, root), "utf8");
const css = read("src/app/globals.css");

function mediaBlock(query: string) {
  const start = css.indexOf(`@media (${query})`);
  expect(start, query).toBeGreaterThan(-1);
  let depth = 0;
  for (let index = css.indexOf("{", start); index < css.length; index += 1) {
    if (css[index] === "{") depth += 1;
    if (css[index] === "}" && --depth === 0) return css.slice(start, index);
  }
  return "";
}

describe("design mobile", () => {
  it("aligne toutes les sections sur la même gouttière en petit écran", () => {
    const phone = mediaBlock("max-width: 520px");
    for (const selector of [".hero-copy", ".manifesto-copy", ".signup-callout", ".editorial-pair article", ".values-strip article", ".collection-card > div", ".journal-list", ".alert-intro", ".form-panel"]) {
      expect(phone, selector).toContain(selector);
    }
    expect(phone).toContain("padding-right: 1.25rem; padding-left: 1.25rem;");
  });

  it("réserve les petites capitales aux étiquettes et laisse les textes longs en casse normale", () => {
    expect(css).toContain(".collection-card > div > p:first-child");
    expect(css).toContain(".journal-list article > p:first-child");
    expect(css).not.toMatch(/\.collection-card > div > p[,\s{]/);
  });

  it("donne aux titres un interligne serré et un retour à la ligne équilibré", () => {
    expect(css).toMatch(/h1, h2, h3 \{ line-height: 1\.1; text-wrap: balance; \}/);
  });

  it("garde des textes lisibles sur les fonds sombres et clairs", () => {
    expect(css).toContain(".manifesto-copy .eyebrow { color: var(--sand); }");
    expect(css).toMatch(/\.textile-grain figcaption \{[^}]*color: var\(--ink\)/);
  });

  it("signale la page courante dans le menu mobile et le referme proprement", () => {
    const menu = read("src/components/mobile-menu.tsx");
    expect(menu).toContain("usePathname");
    expect(menu).toContain('aria-current={item.href === pathname ? "page" : undefined}');
    expect(mediaBlock("max-width: 900px")).toContain('.mobile-menu a[aria-current="page"]');
  });
});
