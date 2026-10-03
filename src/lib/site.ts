export const site = {
  name: "Maila Chic",
  locale: "fr_FR",
  status: "Préouverture",
  url: process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000",
  description:
    "Maila Chic prépare sa première collection, pensée autour des matières, des lignes et des détails. Découvrez le projet avant son ouverture.",
} as const;

export const navigation = [
  { label: "Accueil", href: "/" },
  { label: "L'univers", href: "/univers" },
  { label: "Collection", href: "/collection" },
  { label: "Carnet", href: "/carnet" },
  { label: "Être informé", href: "/alerte" },
] as const;

export const chapters = [
  {
    number: "01",
    title: "La ligne",
    status: "À révéler",
    description:
      "Le vocabulaire des formes et des usages sera précisé au fil de la mise au point de la première collection.",
  },
  {
    number: "02",
    title: "La matière",
    status: "À révéler",
    description:
      "La composition, l'origine et l'entretien des matières seront précisés avant la mise en vente.",
  },
  {
    number: "03",
    title: "Le détail",
    status: "À révéler",
    description:
      "Les finitions et les choix de fabrication seront précisés avec les fiches de chaque pièce.",
  },
] as const;

export const launchPrinciples = [
  "Montrer seulement ce qui est prêt à être documenté.",
  "Expliquer les matières et les choix avant l'ouverture des ventes.",
  "Construire une expérience lisible, calme et utile sur tous les écrans.",
] as const;
