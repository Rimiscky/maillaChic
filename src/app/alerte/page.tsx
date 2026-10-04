import type { Metadata } from "next";
import { SignupForm } from "@/components/signup-form";

export const metadata: Metadata = { title: "Être informé", description: "S'inscrire à l'alerte de lancement de Maila Chic." };

export default function AlertPage() {
  return (
    <section className="alert-page">
      <div className="alert-intro">
        <p className="eyebrow">Liste de lancement</p>
        <h1>Voir la suite au bon moment.</h1>
        <p>Pas de fausse urgence ni d'envoi quotidien. Maila Chic vous écrira pour les étapes confirmées de la première collection.</p>
        <ul><li>Révélation de la collection</li><li>Date d'ouverture confirmée</li><li>Informations de matière et d'entretien</li></ul>
      </div>
      <div className="form-panel"><SignupForm /><p className="form-disclaimer">Le prestataire d'envoi définitif doit être configuré avant la publication publique. En développement, les inscriptions sont enregistrées localement.</p></div>
    </section>
  );
}
