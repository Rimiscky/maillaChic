import type { CollectionVisual } from "@/lib/collection";

type Props = { visual: CollectionVisual; caption?: string; eager?: boolean; zoom?: boolean; className?: string };

// Visuel de la collection : img simple (CSP à nonce), légende factuelle, lien d'agrandissement
// pour les planches dont le texte est trop fin à taille de vignette.
export function CollectionFigure({ visual, caption, eager = false, zoom = false, className = "" }: Props) {
  const image = (
    // eslint-disable-next-line @next/next/no-img-element -- next/image ajoute des styles en ligne bloqués par la CSP
    <img
      src={visual.image.src}
      width={visual.image.width}
      height={visual.image.height}
      alt={visual.alt}
      loading={eager ? "eager" : "lazy"}
      fetchPriority={eager ? "high" : "auto"}
      decoding="async"
    />
  );
  return (
    <figure className={`collection-figure ${className}`.trim()}>
      {zoom ? <a href={visual.image.src} target="_blank" rel="noopener" aria-label={`Agrandir : ${visual.caption}`}>{image}</a> : image}
      <figcaption>{caption ?? visual.caption}</figcaption>
    </figure>
  );
}
