import type { StaticImageData } from "next/image";
import cabasSoclesTisses from "@/assets/ambiance/cabas-socles-tisses.webp";
import duoCabasPeau from "@/assets/ambiance/duo-cabas-peau.webp";
import grandSacBogolanPorte from "@/assets/ambiance/grand-sac-bogolan-porte.webp";
import pochetteDemiLuneWax from "@/assets/ambiance/pochette-demi-lune-wax.webp";
import portraitMarchePanier from "@/assets/ambiance/portrait-marche-panier.webp";
import sacBogolanChaine from "@/assets/ambiance/sac-bogolan-chaine.webp";
import sacCuirGuitare from "@/assets/ambiance/sac-cuir-guitare.webp";
import sacFrangesMulticolores from "@/assets/ambiance/sac-franges-multicolores.webp";
import sacPerleEventail from "@/assets/ambiance/sac-perle-eventail.webp";
import sacRaffiaVertVisage from "@/assets/ambiance/sac-raffia-vert-visage.webp";
import sacsNoeudsWax from "@/assets/ambiance/sacs-noeuds-wax.webp";
import sacVoyageWaxJardin from "@/assets/ambiance/sac-voyage-wax-jardin.webp";
import vesteVolantsWax from "@/assets/ambiance/veste-volants-wax.webp";
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

/** Vignette d'inspiration : même règle que ci-dessus, avec un intitulé court de matière ou de geste. */
export type InspirationPhoto = {
  image: StaticImageData;
  alt: string;
  label: string;
};

export const INSPIRATION_NOTE = "Pièces d'inspiration, hors collection Maila Chic. Elles nourrissent la direction artistique et seront remplacées par les photographies de la collection.";

export const inspirationPhotos = {
  sacFrangesMulticolores: {
    image: sacFrangesMulticolores,
    alt: "Sac tressé de cordons multicolores à longues franges, porté à la main contre la jambe.",
    label: "Cordons et franges",
  },
  sacRaffiaVertVisage: {
    image: sacRaffiaVertVisage,
    alt: "Sac en raffia vert brodé d'un visage graphique, longues franges tombant de part et d'autre.",
    label: "Raffia brodé",
  },
  pochetteDemiLuneWax: {
    image: pochetteDemiLuneWax,
    alt: "Pochette en demi-lune en wax bleu, vert et orange, tenue par une main aux bracelets de tissu, sur fond bleu vif.",
    label: "Wax en demi-lune",
  },
  sacCuirGuitare: {
    image: sacCuirGuitare,
    alt: "Femme au foulard jaune portant en bandoulière un sac en cuir brun à la forme sculptée, barrette dorée sur le rabat.",
    label: "Cuir sculpté",
  },
  sacPerleEventail: {
    image: sacPerleEventail,
    alt: "Sac en éventail entièrement perlé de losanges rouges, bleus, verts et jaunes, bordé de grosses perles rouges.",
    label: "Perlage",
  },
  cabasSoclesTisses: {
    image: cabasSoclesTisses,
    alt: "Quatre cabas en tissus tissés et teints, anses et sangles de cuir noir, présentés sur des socles beiges.",
    label: "Tissages et sangles",
  },
  sacsNoeudsWax: {
    image: sacsNoeudsWax,
    alt: "Deux sacs structurés aux rabats graphiques, anses nouées de foulards en wax, sur fond turquoise.",
    label: "Foulards noués",
  },
  sacBogolanChaine: {
    image: sacBogolanChaine,
    alt: "Sac à rabat en V en cuir noir et tissu bogolan noir et écru, chaîne dorée, posé sur un napperon.",
    label: "Bogolan et cuir",
  },
  grandSacBogolanPorte: {
    image: grandSacBogolanPorte,
    alt: "Grand sac souple à motifs noirs et écrus et anses de bois, tenu à deux mains devant le visage.",
    label: "Volume porté",
  },
  duoCabasPeau: {
    image: duoCabasPeau,
    alt: "Femme en robe bordeaux tenant un cabas en patchwork de peaux, à côté d'un homme en tenue beige brodée, sur fond peint.",
    label: "Patchwork de peaux",
  },
  portraitMarchePanier: {
    image: portraitMarchePanier,
    alt: "Femme en ensemble teint orange et noir, assise dans un marché de perles, éventail tressé à la main et panier de paille à ses pieds.",
    label: "Paille tressée",
  },
  sacVoyageWaxJardin: {
    image: sacVoyageWaxJardin,
    alt: "Femme en robe noire tenant devant elle un sac de voyage en wax aux fleurs bleues et jaunes, anses de cuir, dans un jardin.",
    label: "Sac de voyage en wax",
  },
  vesteVolantsWax: {
    image: vesteVolantsWax,
    alt: "Femme en chemise blanche et pantalon noir, épaules couvertes d'une cape à volants en wax multicolores.",
    label: "Volants en wax",
  },
} satisfies Record<string, InspirationPhoto>;

/** Familles de pièces envisagées pour la première collection (intention, pas encore de catalogue). */
export const universes = [
  { title: "Sacs", photo: ambiancePhotos.cabasFacadeTissee },
  { title: "Petite maroquinerie", photo: inspirationPhotos.pochetteDemiLuneWax },
  { title: "Accessoires", photo: ambiancePhotos.sacPyramideKente },
  { title: "Vêtements", photo: inspirationPhotos.vesteVolantsWax },
] as const;
