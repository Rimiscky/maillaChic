// Bandeau graphique inspiré des motifs wax, dessiné en SVG (aucune photo de tissu tiers).
export function WaxBand({ id }: { id: string }) {
  const pattern = `wax-${id}`;
  return (
    <svg className="wax-band" width="100%" height="16" aria-hidden="true" focusable="false">
      <defs>
        <pattern id={pattern} width="48" height="16" patternUnits="userSpaceOnUse">
          <rect width="48" height="16" fill="#3b2416" />
          <path d="M0 16 8 0l8 16z" fill="#b5651d" />
          <circle cx="24" cy="8" r="5" fill="#d9a441" />
          <circle cx="24" cy="8" r="2" fill="#3b2416" />
          <path d="M32 0h16L40 16z" fill="#7a3b1b" />
          <path d="M34 2h12l-6 11z" fill="#1f3a5a" />
        </pattern>
      </defs>
      <rect width="100%" height="16" fill={`url(#${pattern})`} />
    </svg>
  );
}
