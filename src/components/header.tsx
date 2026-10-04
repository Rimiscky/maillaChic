import Link from "next/link";
import { DesktopNav } from "@/components/desktop-nav";
import { MobileMenu } from "@/components/mobile-menu";
import { site } from "@/lib/site";

export function Header() {
  return (
    <>
      <p className="top-bar">Préouverture<span className="top-bar-more"> · La première collection se dessine</span></p>
      <header className="site-header">
        <Link className="brand" href="/" aria-label="Maila Chic, accueil">
          <span className="brand-word">Maila</span>
          <span className="brand-word brand-word-accent">Chic</span>
        </Link>
        <MobileMenu />
        <DesktopNav />
        <Link className="header-cta" href="/alerte">{site.status}</Link>
      </header>
    </>
  );
}
