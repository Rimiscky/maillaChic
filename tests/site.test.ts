import { describe, expect, it } from "vitest";
import { navigation, site, chapters } from "../src/lib/site";

describe("socle éditorial Maila Chic", () => {
  it("présente une préouverture française sans simuler une boutique", () => {
    expect(site.name).toBe("Maila Chic");
    expect(site.locale).toBe("fr_FR");
    expect(site.status).toBe("Préouverture");
    expect(site.description).toContain("première collection");
    expect(site.description).not.toMatch(/livraison|retours|paiement|commander/i);
  });

  it("organise un parcours complet autour de contenus réellement disponibles", () => {
    expect(navigation.map(({ href }) => href)).toEqual([
      "/",
      "/univers",
      "/collection",
      "/carnet",
      "/alerte",
    ]);
    expect(chapters).toHaveLength(3);
    for (const chapter of chapters) {
      expect(chapter.status).toBe("À révéler");
      expect(chapter.description).toMatch(/ser(?:a|ont) précisé/);
    }
  });
});
