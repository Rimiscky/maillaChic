import type { Metadata } from "next";

export const metadata: Metadata = { title: "Confidentialité" };

export default function PrivacyPage() {
  return <section className="legal-page"><p className="eyebrow">Données personnelles</p><h1>Politique de confidentialité</h1><div className="legal-warning"><strong>Version provisoire.</strong><p>Le responsable du traitement, le prestataire d'envoi et les durées opérationnelles devront être complétés avant la mise en ligne publique.</p></div><h2>Finalité</h2><p>Le formulaire de préouverture collecte une adresse électronique et le consentement associé afin d'informer la personne du lancement de Maila Chic.</p><h2>Base légale</h2><p>Le traitement repose sur le consentement. Il peut être retiré à tout moment.</p><h2>Données collectées</h2><p>Adresse électronique, préférences de contenu, date d'inscription, preuve de consentement et source d'inscription. L'adresse IP et le navigateur peuvent être traités temporairement pour limiter les abus, sans être ajoutés à la liste de lancement. La durée de conservation définitive dépendra de l'outil choisi.</p><h2>Vos droits</h2><p>Les coordonnées permettant d'exercer les droits d'accès, de rectification, d'effacement et d'opposition restent à fournir.</p></section>;
}
