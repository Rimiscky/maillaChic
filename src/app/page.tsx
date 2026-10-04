import Link from "next/link";
import { AmbiancePhoto } from "@/components/ambiance-photo";
import { InspirationPhoto } from "@/components/inspiration-photo";
import { INSPIRATION_NOTE, ambiancePhotos, inspirationPhotos } from "@/lib/photos";
import { chapters, launchPrinciples } from "@/lib/site";
import { ArrowIcon } from "@/components/arrow-icon";

const homeInspirations = [
  inspirationPhotos.sacFrangesMulticolores,
  inspirationPhotos.pochetteDemiLuneWax,
  inspirationPhotos.sacRaffiaVertVisage,
  inspirationPhotos.sacCuirGuitare,
  inspirationPhotos.cabasSoclesTisses,
  inspirationPhotos.sacPerleEventail,
];

export default function Home() {
  return (
    <>
      <section className="home-hero">
        <div className="hero-copy">
          <p className="eyebrow">Maison en préouverture</p>
          <h1>La première collection se dessine.</h1>
          <p className="hero-lead">Une maison de mode pensée comme un dialogue entre la ligne, la matière et le détail. Maila Chic ouvre aujourd'hui son carnet de création.</p>
          <div className="hero-actions">
            <Link className="button button-dark" href="/collection">Voir ce qui se prépare</Link>
            <Link className="text-action" href="/alerte">Être informé du lancement <ArrowIcon /></Link>
          </div>
        </div>
        <AmbiancePhoto photo={ambiancePhotos.femmeCabasPatchwork} eager />
        <p className="hero-index" aria-hidden="true">ÉDITION 01 / BIENTÔT</p>
      </section>

      <section className="intro-band" aria-labelledby="intro-title">
        <p className="section-number">01</p>
        <div>
          <p className="eyebrow">L'intention</p>
          <h2 id="intro-title">Révéler moins.<br />Raconter mieux.</h2>
        </div>
        <p>Avant de présenter les pièces, Maila Chic construit un langage clair : des formes lisibles, des matières documentées et des détails qui ont une raison d'être.</p>
      </section>

      <section className="chapters-section" aria-labelledby="chapters-title">
        <header className="section-header">
          <p className="eyebrow">Carnet de création</p>
          <h2 id="chapters-title">Trois chapitres<br />avant l'ouverture.</h2>
        </header>
        <div className="chapters-list">
          {chapters.map((chapter) => (
            <article className="chapter-row" key={chapter.number}>
              <p>{chapter.number}</p>
              <h3>{chapter.title}</h3>
              <p>{chapter.description}</p>
              <span>{chapter.status}</span>
            </article>
          ))}
        </div>
      </section>

      <section className="inspiration-section" aria-labelledby="inspiration-title">
        <div className="inspiration-header">
          <div>
            <p className="eyebrow">Carnet d'inspiration</p>
            <h2 id="inspiration-title">Ce qui nous inspire.</h2>
          </div>
          <p>{INSPIRATION_NOTE}</p>
        </div>
        <div className="inspiration-grid">
          {homeInspirations.map((photo) => <InspirationPhoto photo={photo} key={photo.label} />)}
        </div>
      </section>

      <section className="manifesto-grid">
        <AmbiancePhoto photo={ambiancePhotos.sacBogolanLeve} />
        <div className="manifesto-copy">
          <p className="eyebrow">Une préouverture honnête</p>
          <h2>Le beau commence par la précision.</h2>
          <ol>{launchPrinciples.map((principle) => <li key={principle}>{principle}</li>)}</ol>
          <Link className="text-action" href="/univers">Entrer dans l'univers <ArrowIcon /></Link>
        </div>
      </section>

      <section className="signup-callout">
        <p className="eyebrow">La suite, sans bruit inutile</p>
        <h2>Recevez uniquement les étapes qui comptent.</h2>
        <p>La révélation de la première collection, l'ouverture et les informations confirmées.</p>
        <Link className="button button-light" href="/alerte">Rejoindre la liste de lancement</Link>
      </section>
    </>
  );
}
