import Link from "next/link";
import { AmbiancePhoto } from "@/components/ambiance-photo";
import { ArrowIcon } from "@/components/arrow-icon";
import { Icon, Ornament } from "@/components/icons";
import { InspirationPhoto } from "@/components/inspiration-photo";
import { WaxBand } from "@/components/wax-band";
import { INSPIRATION_NOTE, ambiancePhotos, inspirationPhotos, universes } from "@/lib/photos";

const homeInspirations = [
  inspirationPhotos.sacFrangesMulticolores,
  inspirationPhotos.sacPerleEventail,
  inspirationPhotos.sacRaffiaVertVisage,
  inspirationPhotos.sacCuirGuitare,
  inspirationPhotos.cabasSoclesTisses,
];

// Intentions de la première collection : rien ici n'affirme une fabrication déjà vérifiée.
const heroPromises = [
  { icon: "fabric", text: "Tissu pagne africain et cuir" },
  { icon: "hands", text: "Pensée avec des artisans" },
  { icon: "durable", text: "Des pièces conçues pour durer" },
] as const;

const craftPoints = [
  { icon: "needle", text: "Le savoir-faire à l'honneur" },
  { icon: "leather", text: "Pagne africain et cuir" },
  { icon: "eye", text: "Des matières documentées" },
  { icon: "durable", text: "Des pièces pensées pour durer" },
] as const;

export default function Home() {
  return (
    <>
      <section className="home-hero">
        <div className="hero-copy">
          <p className="eyebrow">Préouverture · Collection 01</p>
          <h1>L'authenticité africaine, <em>le chic</em> à la française.</h1>
          <p className="hero-lead">Maila Chic prépare une première collection qui associe tissu pagne africain et cuir, pensée avec des artisans. Découvrez l'univers avant l'ouverture.</p>
          <div className="hero-actions">
            <Link className="button button-accent" href="/collection">Découvrir la collection</Link>
            <Link className="button button-outline" href="/alerte">Être informé du lancement</Link>
          </div>
          <ul className="hero-promises">
            {heroPromises.map((item) => <li key={item.text}><Icon name={item.icon} /><span>{item.text}</span></li>)}
          </ul>
        </div>
        <AmbiancePhoto photo={ambiancePhotos.femmeCabasPatchwork} eager />
        <p className="hero-badge" aria-hidden="true"><span>Collection 01</span><span>Bientôt</span></p>
      </section>

      <WaxBand id="hero" />

      <section className="universes-section" aria-labelledby="universes-title">
        <header className="centered-heading">
          <h2 id="universes-title">Nos univers</h2>
          <Ornament />
          <p>Les familles de pièces envisagées pour la première collection.</p>
        </header>
        <div className="universes-grid">
          {universes.map((universe) => (
            <article className="universe-card" key={universe.title}>
              {/* eslint-disable-next-line @next/next/no-img-element -- next/image ajoute des styles en ligne bloqués par la CSP */}
              <img src={universe.photo.image.src} width={universe.photo.image.width} height={universe.photo.image.height} alt={universe.photo.alt} loading="lazy" decoding="async" />
              <div><h3>{universe.title}</h3><span>Bientôt</span></div>
            </article>
          ))}
        </div>
        <p className="inspiration-note centered-note">{INSPIRATION_NOTE}</p>
      </section>

      <section className="inspiration-section" aria-labelledby="inspiration-title">
        <header className="centered-heading">
          <h2 id="inspiration-title">Nos inspirations</h2>
          <Ornament />
        </header>
        <div className="inspiration-grid inspiration-row">
          {homeInspirations.map((photo) => <InspirationPhoto photo={photo} key={photo.label} />)}
        </div>
        <div className="centered-action">
          <Link className="button button-accent" href="/collection">Voir la collection en préparation</Link>
        </div>
      </section>

      <section className="craft-section" aria-labelledby="craft-title">
        <div className="craft-copy">
          <h2 id="craft-title">L'artisanat au cœur de la démarche</h2>
          <Ornament />
          <p>Chaque pièce de la première collection est pensée avec des artisans. Leurs savoir-faire, les matières et les conditions de fabrication seront présentés avec chaque fiche, une fois vérifiés.</p>
          <Link className="button button-light" href="/univers">Découvrir l'univers</Link>
        </div>
        <ul className="craft-points">
          {craftPoints.map((item) => <li key={item.text}><Icon name={item.icon} size={36} /><span>{item.text}</span></li>)}
        </ul>
        <AmbiancePhoto photo={ambiancePhotos.sacBogolanLeve} />
      </section>

      <section className="newsletter-band" aria-labelledby="newsletter-title">
        <Icon name="envelope" size={44} />
        <div>
          <h2 id="newsletter-title">Rejoignez l'univers Maila Chic</h2>
          <p>Recevez la révélation de la collection et la date d'ouverture, sans envois superflus.</p>
        </div>
        <Link className="button button-accent" href="/alerte">Je m'inscris <ArrowIcon /></Link>
      </section>
    </>
  );
}
