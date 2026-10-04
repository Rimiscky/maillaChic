import type { StaticImageData } from "next/image";
import cabasFacadeTissee from "@/assets/ambiance/cabas-facade-tissee.webp";
import femmeCabasPatchwork from "@/assets/ambiance/femme-cabas-patchwork.webp";
import minaudiereSpherique from "@/assets/ambiance/minaudiere-spherique.webp";
import sacBogolanLeve from "@/assets/ambiance/sac-bogolan-leve.webp";
import sacBordeauxVannerie from "@/assets/ambiance/sac-bordeaux-vannerie.webp";
import sacPyramideKente from "@/assets/ambiance/sac-pyramide-kente.webp";

/**
 * Photographies d'ambiance provisoires de la V1.
 * Elles montrent des pièces d'inspiration qui n'appartiennent pas à la collection Maila Chic :
 * la légende le dit toujours, et elles seront remplacées par les photographies de la collection.
 * Les visuels portant le logo ou le monogramme d'une autre marque (y compris sur un fermoir) sont exclus.
 */
export type AmbiancePhoto = {
  image: StaticImageData;
  alt: string;
  /** Clé du cadrage défini dans globals.css (object-position), pour garder la pièce visible. */
  focus: "patchwork" | "bogolan" | "kente" | "spherique" | "bordeaux" | "cabas";
};

export const AMBIANCE_CAPTION = "Photographie d'ambiance provisoire · pièce hors collection Maila Chic";

export const ambiancePhotos = {
  femmeCabasPatchwork: {
    image: femmeCabasPatchwork,
    alt: "Femme en robe longue bordeaux et foulard clair, portant trois cabas dont un en patchwork de peaux brunes, noires et blanches, sur fond peint.",
    focus: "patchwork",
  },
  sacBogolanLeve: {
    image: sacBogolanLeve,
    alt: "Grand sac souple en tissu noir à motifs bogolan écrus, tenu à bout de bras au-dessus de la tête, devant une robe brune rayée.",
    focus: "bogolan",
  },
  sacPyramideKente: {
    image: sacPyramideKente,
    alt: "Petit sac pyramidal en tissu kente jaune, vert, bleu et rouge, anse en boucle, sur fond orangé.",
    focus: "kente",
  },
  minaudiereSpherique: {
    image: minaudiereSpherique,
    alt: "Minaudière sphérique en wax bordeaux et bleu, monture argentée ouverte et pompon bordeaux, effleurée par une main aux bracelets d'argent.",
    focus: "spherique",
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
