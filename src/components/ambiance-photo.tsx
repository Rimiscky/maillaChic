import { AMBIANCE_CAPTION, type AmbiancePhoto as Photo } from "@/lib/photos";

type AmbiancePhotoProps = {
  photo: Photo;
  /** Photographie visible dès l'arrivée sur la page (héros) : chargement prioritaire. */
  eager?: boolean;
};

// Une balise img simple plutôt que next/image : ce dernier ajoute des attributs style en ligne,
// que la Content-Security-Policy à nonce (src/proxy.ts) bloque. Les fichiers sont déjà optimisés.
export function AmbiancePhoto({ photo, eager = false }: AmbiancePhotoProps) {
  return (
    <figure className="textile-panel photo-panel">
      {/* eslint-disable-next-line @next/next/no-img-element -- voir le commentaire ci-dessus */}
      <img
        src={photo.image.src}
        width={photo.image.width}
        height={photo.image.height}
        alt={photo.alt}
        data-focus={photo.focus}
        loading={eager ? "eager" : "lazy"}
        fetchPriority={eager ? "high" : "auto"}
        decoding="async"
      />
      <figcaption>{AMBIANCE_CAPTION}</figcaption>
    </figure>
  );
}
