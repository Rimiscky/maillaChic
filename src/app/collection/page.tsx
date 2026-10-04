import type { Metadata } from "next";
import Link from "next/link";
import { TextilePanel } from "@/components/textile-panel";
import { chapters } from "@/lib/site";

export const metadata: Metadata = { title: "Collection", description: "La première collection Maila Chic est en préparation. Aucun achat n'est encore ouvert." };

export default function CollectionPage() {
  return (
    <>
      <section className="page-hero collection-hero">
        <p className="eyebrow">Collection 01 · En préparation</p>
        <h1>Les pièces arriveront avec leurs preuves.</h1>
        <p>Aucune vente n'est ouverte. Les images, matières, dimensions, prix et conditions de fabrication seront publiés uniquement après validation.</p>
      </section>
      <section className="collection-grid" aria-label="Aperçu des futurs chapitres">
        {chapters.map((chapter, index) => (
          <article className="collection-card" key={chapter.number}>
            <TextilePanel variant={(["fold", "weave", "grain"] as const)[index]} label={`Emplacement temporaire, ${chapter.title.toLowerCase()}`} />
            <div><p>{chapter.number} · {chapter.status}</p><h2>{chapter.title}</h2><p>{chapter.description}</p></div>
          </article>
        ))}
      </section>
      <section className="transparency-note"><p className="eyebrow">Pourquoi attendre</p><h2>Une fiche vide ne devient pas crédible parce qu'elle ressemble à une boutique.</h2><p>Cette V1 prépare les futurs contenus et les futurs parcours sans inventer de références, de prix, de disponibilité ou de promesse logistique.</p><Link className="button button-dark" href="/alerte">Suivre la révélation</Link></section>
    </>
  );
}
