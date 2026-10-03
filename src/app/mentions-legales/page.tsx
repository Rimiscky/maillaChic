import type { Metadata } from "next";

export const metadata: Metadata = { title: "Mentions légales" };

export default function LegalPage() {
  return <section className="legal-page"><p className="eyebrow">Informations légales</p><h1>Mentions légales</h1><div className="legal-warning"><strong>Informations requises avant publication.</strong><p>L'identité de l'éditeur, sa forme juridique, son adresse, ses coordonnées, son numéro d'immatriculation et l'identité de l'hébergeur n'ont pas encore été fournis. Cette page ne doit pas être considérée comme finalisée.</p></div><h2>Éditeur</h2><p>Maila Chic - informations administratives à compléter.</p><h2>Hébergement</h2><p>Prestataire et adresse à compléter après choix de l'hébergement.</p><h2>Propriété intellectuelle</h2><p>Les éléments définitifs de marque et les droits associés devront être confirmés avant publication.</p></section>;
}
