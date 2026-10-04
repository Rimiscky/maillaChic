type TextilePanelProps = {
  variant?: "weave" | "fold" | "thread" | "grain";
  label: string;
  priority?: boolean;
};

export function TextilePanel({ variant = "weave", label }: TextilePanelProps) {
  return (
    <figure className={`textile-panel textile-${variant}`} aria-label={label}>
      <div className="textile-mark" aria-hidden="true">MC</div>
      <figcaption>{label}</figcaption>
    </figure>
  );
}
