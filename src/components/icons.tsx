// Pictogrammes au trait, en currentColor : aucun emoji ni police d'icônes, rendu identique partout.
type IconName = "fabric" | "hands" | "durable" | "needle" | "leather" | "eye" | "envelope";

const paths: Record<IconName, string> = {
  fabric: "M5 6h22v20H5zM5 12h22M5 19h22M12 6v20M20 6v20",
  hands: "M8 20c-2-3-3-7 0-10l3 4M24 20c2-3 3-7 0-10l-3 4M11 14c1 4 3 7 5 9 2-2 4-5 5-9M16 9v6",
  durable: "M16 5c6 4 9 9 6 15-2 4-8 5-11 1-3-5 0-11 5-16zM16 12v15",
  needle: "M25 5 9 21M23 5l4 4M9 21l-3 6 6-3M14 11c-4 0-6 3-6 6",
  leather: "M8 6h16l3 6-3 14H8L5 12zM5 12h22M12 6l-1 6M20 6l1 6",
  eye: "M3 16s5-8 13-8 13 8 13 8-5 8-13 8S3 16 3 16zM16 20a4 4 0 1 0 0-8 4 4 0 0 0 0 8z",
  envelope: "M4 8h24v16H4zM4 8l12 9 12-9",
};

export function Icon({ name, size = 32 }: { name: IconName; size?: number }) {
  return (
    <svg className="line-icon" viewBox="0 0 32 32" width={size} height={size} aria-hidden="true" focusable="false">
      <path d={paths[name]} fill="none" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

/** Petit losange encadré de deux filets, sous les titres de section. */
export function Ornament() {
  return (
    <svg className="ornament" viewBox="0 0 72 12" width="72" height="12" aria-hidden="true" focusable="false">
      <path d="M0 6h26M46 6h26M36 1l5 5-5 5-5-5z" fill="none" stroke="currentColor" strokeWidth="1.2" />
    </svg>
  );
}
