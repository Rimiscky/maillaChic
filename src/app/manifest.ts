import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "Maila Chic",
    short_name: "Maila Chic",
    description: "Première collection en préparation.",
    start_url: "/",
    display: "standalone",
    background_color: "#f2eee6",
    theme_color: "#241f1b",
    lang: "fr",
  };
}
