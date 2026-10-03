import Link from "next/link";
import { TextilePanel } from "@/components/textile-panel";
import { chapters, launchPrinciples } from "@/lib/site";

export default function Home() {
  return (
    <>
      <section className="home-hero">
        <div className="hero-copy">
          <p className="eyebrow">Maison en préouverture · France</p>
          <h1>La première collection se dessine.</h1>
          <p className="hero-lead">Une maison de mode pensée comme un dialogue entre la ligne, la matière et le détail. Maila Chic ouvre aujourd'hui son carnet de création.</p>
          <div className="hero-actions">
            <Link className="button button-dark" href="/collection">Voir ce qui se prépare</Link>
            <Link className="text-action" href="/alerte">Être informé du lancement <span aria-hidden="true">↗</span></Link>
          </div>
        </div>
        <TextilePanel variant="fold" label="Composition textile temporaire pour la préouverture" />
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

      <section className="manifesto-grid">
        <TextilePanel variant="thread" label="Étude graphique temporaire inspirée du fil" />
        <div className="manifesto-copy">
          <p className="eyebrow">Une préouverture honnête</p>
          <h2>Le beau commence par la précision.</h2>
          <ol>{launchPrinciples.map((principle) => <li key={principle}>{principle}</li>)}</ol>
          <Link className="text-action" href="/univers">Entrer dans l'univers <span aria-hidden="true">↗</span></Link>
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
