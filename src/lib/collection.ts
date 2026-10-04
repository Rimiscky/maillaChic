import type { StaticImageData } from "next/image";
import cinqModeles from "@/assets/collection/cinq-modeles.webp";
import modele1 from "@/assets/collection/modele-1.webp";
import modele2Coloris from "@/assets/collection/modele-2-coloris.webp";
import modeleCouleurs from "@/assets/collection/modele-couleurs.webp";
import modelePetitArriereProfil from "@/assets/collection/modele-petit-arriere-profil.webp";
import modelePetitDetails from "@/assets/collection/modele-petit-details.webp";
import modelePetitFace from "@/assets/collection/modele-petit-face.webp";
import modelesPortes from "@/assets/collection/modeles-portes.webp";
import sacOrdinateurHomme from "@/assets/collection/sac-ordinateur-homme.webp";

/**
 * Maquettes de la collection 01, fournies par Maila Chic (visuels de conception et plan de
 * fabrication). Ce sont des rendus de conception, pas des photographies de pièces fabriquées :
 * la légende le dit. Le plan de découpe du PDF reste privé (non publié).
 */
export type CollectionVisual = { image: StaticImageData; alt: string; caption: string };

export const COLLECTION_CAPTION = "Maquette de conception · collection 01";

export const modelePetit = {
  name: "Sac à main · modèle petit",
  intro: "Un sac à main structuré : rabat à fermoir poussoir, poignée rigide et panneau de pagne tissé bordeaux encadré de simili cuir beige sable.",
  specs: [
    ["Largeur", "24 cm"],
    ["Hauteur", "18 cm"],
    ["Profondeur", "9 cm"],
    ["Hauteur de poignée", "10 cm"],
  ],
  materials: [
    "Simili cuir beige sable",
    "Pagne tissé bordeaux",
    "Finitions en cuivre poli",
    "Rabat à fermoir poussoir, poignée rigide",
    "Quatre pieds de protection en cuivre",
  ],
  views: [
    {
      image: modelePetitFace,
      alt: "Maquette du sac à main modèle petit : forme arrondie en simili cuir beige, panneau de pagne bordeaux à motifs dorés, rabat à fermoir cuivre et poignée rigide.",
      caption: "Vue de trois quarts",
    },
    {
      image: modelePetitDetails,
      alt: "Vue de face annotée du modèle petit : poignée rigide, simili cuir beige, panneau en pagne et fermoir cuivre.",
      caption: "Matières et détails",
    },
    {
      image: modelePetitArriereProfil,
      alt: "Vue arrière du modèle petit avec sa poche plaquée, et vue latérale montrant la profondeur du sac.",
      caption: "Vue arrière et profil",
    },
  ],
} as const;

export const collectionBoards: CollectionVisual[] = [
  {
    image: modele1,
    alt: "Maquette d'un sac à main en simili cuir beige orné d'un V métallique doré, bas en paille tressée, empiècement et bandoulière en pagne jaune et orange.",
    caption: "Modèle 1",
  },
  {
    image: modeleCouleurs,
    alt: "Planche du même modèle décliné en huit coloris de simili cuir et de pagne : beige, noir, vert olive, marron, bleu marine, blanc, bordeaux et rose poudré.",
    caption: "Un modèle, huit coloris",
  },
  {
    image: modele2Coloris,
    alt: "Planche de sacs à main en simili cuir beige, vert, bordeaux et noir, chacun associé à un empiècement de pagne, avec vues de détail des fermoirs et bijoux de sac.",
    caption: "Modèle 2 et ses coloris",
  },
  {
    image: modelesPortes,
    alt: "Deux maquettes portées : un sac bordeaux à rabat et anses en pagne tenu à la main, et une pochette beige à chaîne avec rabat en pagne.",
    caption: "Maquettes portées",
  },
  {
    image: cinqModeles,
    alt: "Planche de cinq modèles de sacs à main en simili cuir et pagne, avec leurs croquis techniques, détails de finitions et variations de couleurs.",
    caption: "Cinq silhouettes",
  },
  {
    image: sacOrdinateurHomme,
    alt: "Planche d'un sac ordinateur pour homme en simili cuir noir et pagne, avec dimensions, rangements intérieurs, matières et coloris envisagés.",
    caption: "Sac ordinateur homme",
  },
];

/** Visuel principal de l'accueil et de la carte « Sacs ». */
export const collectionHero: CollectionVisual = {
  image: modelePetitFace,
  alt: modelePetit.views[0].alt,
  caption: "Sac à main · modèle petit",
};
