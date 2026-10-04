import Link from "next/link";
import { WaxBand } from "@/components/wax-band";
import { site } from "@/lib/site";

export function Footer() {
  return (
    <>
      <WaxBand id="footer" />
      <footer className="site-footer">
        <div className="footer-intro">
          <p className="footer-brand"><span className="brand-word">Maila</span><span className="brand-word brand-word-accent">Chic</span></p>
          <p>{site.tagline}</p>
          <p>La première collection est en préparation.</p>
        </div>
        <nav className="footer-column" aria-label="Pages">
          <p>Maila Chic</p>
          <Link href="/univers">L'univers</Link>
          <Link href="/collection">Collection</Link>
          <Link href="/carnet">Carnet</Link>
        </nav>
        <nav className="footer-column footer-links" aria-label="Informations légales">
          <p>Informations</p>
          <Link href="/mentions-legales">Mentions légales</Link>
          <Link href="/confidentialite">Confidentialité</Link>
        </nav>
        <div className="footer-column footer-launch">
          <p>Lancement</p>
          <Link href="/alerte">Être informé de l'ouverture</Link>
        </div>
        <p className="asset-note">Photographies d'ambiance provisoires : les pièces montrées inspirent la direction artistique et ne font pas partie de la collection Maila Chic. Elles seront remplacées par les photographies de la collection.</p>
      </footer>
    </>
  );
}
