"use client";

import { KeyboardEvent, MouseEvent, useRef } from "react";
import Link from "next/link";
import { navigation } from "@/lib/site";

export function MobileMenu() {
  const menu = useRef<HTMLDetailsElement>(null);

  // Le layout persiste entre les navigations : le menu doit se refermer explicitement.
  function close() {
    if (menu.current) menu.current.open = false;
  }

  function onClick(event: MouseEvent<HTMLElement>) {
    if ((event.target as HTMLElement).closest("a")) close();
  }

  function onKeyDown(event: KeyboardEvent<HTMLDetailsElement>) {
    if (event.key !== "Escape" || !menu.current?.open) return;
    close();
    menu.current.querySelector("summary")?.focus();
  }

  return (
    <details className="mobile-menu" ref={menu} onKeyDown={onKeyDown}>
      <summary>Menu</summary>
      <nav aria-label="Navigation mobile" onClick={onClick}>
        {navigation.map((item) => <Link href={item.href} key={item.href}>{item.label}</Link>)}
      </nav>
    </details>
  );
}
