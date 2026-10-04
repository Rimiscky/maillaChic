"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { navigation } from "@/lib/site";

export function DesktopNav() {
  const pathname = usePathname();
  return (
    <nav className="desktop-nav" aria-label="Navigation principale">
      {navigation.slice(0, -1).map((item) => (
        <Link href={item.href} key={item.href} aria-current={item.href === pathname ? "page" : undefined}>{item.label}</Link>
      ))}
    </nav>
  );
}
