import type { StaticImageData } from "next/image";
import cabasFacadeTissee from "@/assets/ambiance/cabas-facade-tissee.webp";
import modeleSacEcailles from "@/assets/ambiance/modele-sac-ecailles.webp";
import sacBordeauxVannerie from "@/assets/ambiance/sac-bordeaux-vannerie.webp";

/**
 * Photographies d'ambiance provisoires de la V1.
 * Elles montrent des pièces d'inspiration qui n'appartiennent pas à la collection Maila Chic :
 * la légende le dit toujours, et elles seront remplacées par les photographies de la collection.
 * Les visuels portant le logo d'une autre marque sont exclus.
 */
export type AmbiancePhoto = {
  image: StaticImageData;
  alt: string;
  /** Clé du cadrage défini dans globals.css (object-position), pour garder la pièce visible. */
  focus: "modele" | "detail" | "bordeaux" | "cabas";
};

export const AMBIANCE_CAPTION = "Photographie d'ambiance provisoire · pièce hors collection Maila Chic";

export const ambiancePhotos = {
  modeleSacEcailles: {
    image: modeleSacEcailles,
    alt: "Femme en veste blanche tenant au-dessus de sa tête un sac à rabat en cuir à motif d'écailles, anse et chaîne dorées.",
    focus: "modele",
  },
  /** Même prise de vue que modeleSacEcailles, resserrée sur les écailles et le fermoir. */
  detailSacEcailles: {
    image: modeleSacEcailles,
    alt: "Détail d'un sac à rabat en cuir à motif d'écailles en deux tons, fermoir et chaîne dorés.",
    focus: "detail",
  },
  sacBordeauxVannerie: {
    image: sacBordeauxVannerie,
    alt: "Sac à main en cuir grainé bordeaux, rabat en vannerie noire et écrue à motif géométrique, anse arrondie.",
    focus: "bordeaux",
  },
  cabasFacadeTissee: {
    image: cabasFacadeTissee,
    alt: "Cabas en cuir brun foncé, façade tissée à motif de losanges rouges, noirs et écrus, côtés en raphia tressé.",
    focus: "cabas",
  },
} satisfies Record<string, AmbiancePhoto>;
