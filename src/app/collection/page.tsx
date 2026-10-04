import type { Metadata } from "next";
import Link from "next/link";
import { CollectionFigure } from "@/components/collection-figure";
import { Ornament } from "@/components/icons";
import { COLLECTION_CAPTION, collectionBoards, modelePetit } from "@/lib/collection";

export const metadata: Metadata = {
  title: "Collection",
  description: "Les maquettes de la collection 01 de Maila Chic : sacs en simili cuir et pagne. Aucun achat n'est encore ouvert.",
};

export default function CollectionPage() {
  return (
    <>
      <section className="page-hero collection-hero">
        <p className="eyebrow">Collection 01 · Maquettes de conception</p>
        <h1>Les premières maquettes.</h1>
        <p>Simili cuir et pagne, lignes structurées, finitions métalliques. Aucune vente n'est ouverte : prix, disponibilités et photographies des pièces fabriquées seront publiés après validation.</p>
      </section>

      <section className="model-section" aria-labelledby="model-title">
        <header className="centered-heading">
          <h2 id="model-title">{modelePetit.name}</h2>
          <Ornament />
          <p>{modelePetit.intro}</p>
        </header>
        <div className="model-views">
          {modelePetit.views.map((view, index) => (
            <CollectionFigure visual={view} key={view.caption} eager={index === 0} />
          ))}
        </div>
        <div className="model-specs">
          <div>
            <h3>Dimensions</h3>
            <dl>
              {modelePetit.specs.map(([label, value]) => <div key={label}><dt>{label}</dt><dd>{value}</dd></div>)}
            </dl>
          </div>
          <div>
            <h3>Matières et finitions</h3>
            <ul>{modelePetit.materials.map((item) => <li key={item}>{item}</li>)}</ul>
          </div>
        </div>
        <p className="inspiration-note centered-note">Données issues du plan de fabrication de la maquette. Elles peuvent évoluer avant la mise en production.</p>
      </section>

      <section className="boards-section" aria-labelledby="boards-title">
        <header className="centered-heading">
          <h2 id="boards-title">Planches de la collection</h2>
          <Ornament />
          <p>Modèles, coloris et déclinaisons à l'étude. Touchez une planche pour l'agrandir.</p>
        </header>
        <div className="boards-grid">
          {collectionBoards.map((board) => <CollectionFigure visual={board} key={board.caption} zoom />)}
        </div>
        <p className="inspiration-note centered-note">{COLLECTION_CAPTION} : rendus de conception, et non photographies de pièces fabriquées.</p>
      </section>

      <section className="transparency-note"><p className="eyebrow">Avant l'ouverture</p><h2>Les pièces arriveront avec leurs preuves.</h2><p>Les maquettes montrent l'intention de la collection. Les fiches définitives, avec photographies, prix et conditions de fabrication, seront publiées une fois validées.</p><Link className="button button-dark" href="/alerte">Suivre la révélation</Link></section>
    </>
  );
}
