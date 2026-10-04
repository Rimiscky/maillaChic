// Flèche dessinée en SVG : le caractère « ↗ » s'affiche en emoji sur iOS, pas sur ordinateur.
export function ArrowIcon() {
  return (
    <svg className="arrow-icon" viewBox="0 0 12 12" width="12" height="12" aria-hidden="true" focusable="false">
      <path d="M3 9 9 3M4 3h5v5" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinecap="square" />
    </svg>
  );
}
