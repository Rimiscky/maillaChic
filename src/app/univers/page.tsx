import type { Metadata } from "next";
import Link from "next/link";
import { AmbiancePhoto } from "@/components/ambiance-photo";
import { InspirationPhoto } from "@/components/inspiration-photo";
import { INSPIRATION_NOTE, ambiancePhotos, inspirationPhotos } from "@/lib/photos";
import { ArrowIcon } from "@/components/arrow-icon";

export const metadata: Metadata = { title: "L'univers", description: "La direction créative et les principes de préouverture de Maila Chic." };

export default function UniversPage() {
  return (
    <>
      <section className="page-hero page-hero-split">
        <div><p className="eyebrow">L'univers</p><h1>Une élégance qui laisse respirer la matière.</h1></div>
        <p>Maila Chic se construit avec une règle simple : ne rien affirmer avant de pouvoir le montrer. La première collection sera présentée avec ses matières, ses détails et ses conditions de fabrication.</p>
      </section>
      <section className="editorial-pair">
        <AmbiancePhoto photo={ambiancePhotos.sacPyramideKente} />
        <article>
          <p className="section-number">01 / 03</p>
          <h2>Observer avant de nommer.</h2>
          <p>Les photographies actuelles posent un rythme et une palette. Elles montrent des pièces d'inspiration qui n'appartiennent pas à Maila Chic, ni à un atelier partenaire. Les photographies de la collection les remplaceront avant la publication officielle.</p>
        </article>
      </section>
      <section className="values-strip" aria-label="Principes de création">
        <article><InspirationPhoto photo={inspirationPhotos.sacsNoeudsWax} /><span>01</span><h2>Clarté</h2><p>Des informations lisibles, sans promesse commerciale prématurée.</p></article>
        <article><InspirationPhoto photo={inspirationPhotos.sacBogolanChaine} /><span>02</span><h2>Matière</h2><p>Une place centrale réservée aux textures, aux coupes et aux finitions réelles.</p></article>
        <article><InspirationPhoto photo={inspirationPhotos.grandSacBogolanPorte} /><span>03</span><h2>Durée</h2><p>Des choix d'usage et d'entretien expliqués lorsque les pièces seront documentées.</p></article>
      </section>
      <p className="inspiration-note">{INSPIRATION_NOTE}</p>
      <section className="next-step"><p className="eyebrow">Étape suivante</p><h2>Découvrir le plan de révélation.</h2><Link className="text-action" href="/collection">Voir la collection en préparation <ArrowIcon /></Link></section>
    </>
  );
}
