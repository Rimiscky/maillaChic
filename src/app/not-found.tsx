import Link from "next/link";

export default function NotFound() {
  return <section className="not-found"><p className="eyebrow">Erreur 404</p><h1>Cette page n'est pas encore dans le carnet.</h1><p>Le lien demandé n'existe pas ou a été déplacé.</p><Link className="button button-dark" href="/">Revenir à l'accueil</Link></section>;
}
