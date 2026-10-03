import type { Metadata } from "next";
import { Footer } from "@/components/footer";
import { Header } from "@/components/header";
import { site } from "@/lib/site";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: { default: "Maila Chic | Première collection en préparation", template: "%s | Maila Chic" },
  description: site.description,
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    locale: site.locale,
    title: "Maila Chic | Première collection en préparation",
    description: site.description,
    siteName: site.name,
    url: "/",
  },
  robots: { index: true, follow: true },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="fr">
      <body>
        <a className="skip-link" href="#contenu">Aller au contenu</a>
        <Header />
        <main id="contenu" tabIndex={-1}>{children}</main>
        <Footer />
      </body>
    </html>
  );
}
