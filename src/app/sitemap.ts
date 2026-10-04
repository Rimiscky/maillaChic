import type { MetadataRoute } from "next";
import { navigation, site } from "@/lib/site";

export default function sitemap(): MetadataRoute.Sitemap {
  return navigation.map(({ href }) => ({
    url: new URL(href, site.url).toString(),
    changeFrequency: href === "/carnet" ? "monthly" : "weekly",
    priority: href === "/" ? 1 : .7,
  }));
}
