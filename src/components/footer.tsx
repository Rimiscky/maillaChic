import Link from "next/link";
import { site } from "@/lib/site";

export function Footer() {
  return (
    <footer className="site-footer">
      <div>
        <p className="footer-brand">{site.name}</p>
        <p>La première collection est en préparation.</p>
      </div>
      <nav className="footer-links" aria-label="Informations légales">
        <Link href="/mentions-legales">Mentions légales</Link>
        <Link href="/confidentialite">Confidentialité</Link>
      </nav>
      <p className="asset-note">Photographies d'ambiance provisoires : les pièces montrées inspirent la direction artistique et ne font pas partie de la collection Maila Chic. Elles seront remplacées par les photographies de la collection.</p>
    </footer>
  );
}
