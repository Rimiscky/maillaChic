import type { Metadata } from "next";
import Link from "next/link";
import { TextilePanel } from "@/components/textile-panel";

export const metadata: Metadata = { title: "L'univers", description: "La direction créative et les principes de préouverture de Maila Chic." };

export default function UniversPage() {
  return (
    <>
      <section className="page-hero page-hero-split">
        <div><p className="eyebrow">L'univers</p><h1>Une élégance qui laisse respirer la matière.</h1></div>
        <p>Maila Chic se construit avec une règle simple : ne rien affirmer avant de pouvoir le montrer. La première collection sera présentée avec ses matières, ses détails et ses conditions de fabrication.</p>
      </section>
      <section className="editorial-pair">
        <TextilePanel variant="grain" label="Étude graphique temporaire de matière" />
        <article>
          <p className="section-number">01 / 03</p>
          <h2>Observer avant de nommer.</h2>
          <p>Les visuels actuels posent un rythme et une palette. Ils ne représentent ni un produit final, ni un atelier partenaire. Les photographies réelles les remplaceront avant la publication officielle.</p>
        </article>
      </section>
      <section className="values-strip" aria-label="Principes de création">
        <article><span>01</span><h2>Clarté</h2><p>Des informations lisibles, sans promesse commerciale prématurée.</p></article>
        <article><span>02</span><h2>Matière</h2><p>Une place centrale réservée aux textures, aux coupes et aux finitions réelles.</p></article>
        <article><span>03</span><h2>Durée</h2><p>Des choix d'usage et d'entretien expliqués lorsque les pièces seront documentées.</p></article>
      </section>
      <section className="next-step"><p className="eyebrow">Étape suivante</p><h2>Découvrir le plan de révélation.</h2><Link className="text-action" href="/collection">Voir la collection en préparation <span aria-hidden="true">↗</span></Link></section>
    </>
  );
}
