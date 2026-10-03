import { describe, expect, it } from "vitest";
import manifest from "../src/app/manifest";
import robots from "../src/app/robots";
import sitemap from "../src/app/sitemap";
import { navigation, site } from "../src/lib/site";

describe("routes de métadonnées", () => {
  it("bloque tous les robots pendant la préouverture", () => {
    const result = robots();
    expect(result.rules).toEqual({ userAgent: "*", disallow: "/" });
    expect(result.sitemap).toBe(new URL("/sitemap.xml", site.url).toString());
  });

  it("liste chaque page de la navigation en URL absolue", () => {
    const entries = sitemap();
    expect(entries.map(({ url }) => new URL(url).pathname)).toEqual(navigation.map(({ href }) => href));
    for (const entry of entries) expect(entry.url.startsWith(new URL(site.url).origin)).toBe(true);
    expect(entries.find(({ url }) => new URL(url).pathname === "/")?.priority).toBe(1);
  });

  it("décrit une application française aux couleurs de la marque", () => {
    expect(manifest()).toMatchObject({ name: site.name, lang: "fr", start_url: "/", theme_color: "#241f1b" });
  });
});
