import type { InspirationPhoto as Photo } from "@/lib/photos";

// Même choix que AmbiancePhoto : une balise img simple, sans attribut style (CSP à nonce).
export function InspirationPhoto({ photo }: { photo: Photo }) {
  return (
    <figure className="inspiration-photo">
      {/* eslint-disable-next-line @next/next/no-img-element -- next/image ajoute des styles en ligne bloqués par la CSP */}
      <img src={photo.image.src} width={photo.image.width} height={photo.image.height} alt={photo.alt} loading="lazy" decoding="async" />
      <figcaption>{photo.label}</figcaption>
    </figure>
  );
}
