import Link from "next/link";
import { navigation, site } from "@/lib/site";

export function Header() {
  return (
    <header className="site-header">
      <Link className="brand" href="/" aria-label="Maila Chic, accueil">
        <span className="brand-word">Maila</span>
        <span className="brand-word brand-word-accent">Chic</span>
      </Link>
      <details className="mobile-menu">
        <summary>Menu</summary>
        <nav aria-label="Navigation mobile">
          {navigation.map((item) => <Link href={item.href} key={item.href}>{item.label}</Link>)}
        </nav>
      </details>
      <nav className="desktop-nav" aria-label="Navigation principale">
        {navigation.slice(1, -1).map((item) => <Link href={item.href} key={item.href}>{item.label}</Link>)}
      </nav>
      <Link className="header-cta" href="/alerte">{site.status}</Link>
    </header>
  );
}
