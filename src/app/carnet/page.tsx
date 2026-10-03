import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = { title: "Carnet", description: "Le carnet de préouverture de Maila Chic." };

const entries = [
  { date: "Note 01", title: "Pourquoi commencer par une préouverture", text: "Présenter le projet sans fabriquer une fausse boutique. Le carnet accueillera les décisions confirmées au fil du développement." },
  { date: "Note 02", title: "Ce qui doit encore être documenté", text: "Les pièces, les matières, la fabrication, les photographies, les prix et le calendrier seront ajoutés après validation." },
  { date: "Note 03", title: "Préparer une expérience utile", text: "Le site est structuré pour accueillir les fiches de collection, les contenus éditoriaux et la future couche commerce sans brouiller la V1." },
];

export default function CarnetPage() {
  return (
    <>
      <section className="page-hero"><p className="eyebrow">Carnet de préouverture</p><h1>Le projet, étape après étape.</h1><p>Un espace pour publier ce qui est confirmé, signaler ce qui manque et documenter la construction de Maila Chic.</p></section>
      <section className="journal-list">
        {entries.map((entry) => <article key={entry.date}><p>{entry.date}</p><h2>{entry.title}</h2><p>{entry.text}</p></article>)}
      </section>
      <section className="next-step"><p className="eyebrow">Prochaine publication</p><h2>La première note de collection.</h2><Link className="text-action" href="/alerte">Recevoir l'annonce <span aria-hidden="true">↗</span></Link></section>
    </>
  );
}
