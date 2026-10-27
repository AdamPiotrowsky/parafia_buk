import type { Metadata } from "next";
import Image from "next/image";

import { cormorant, manrope } from "@/lib/fonts";
import "./globals.css";

/* Wspólna strona 404 — serwis ma kilka głównych layoutów (polski i obcojęzyczne) */
export const metadata: Metadata = { title: "Nie znaleziono strony · Page not found" };

const links = [
  { href: "/", label: "Strona główna", lang: "pl" },
  { href: "/en", label: "Home page", lang: "en" },
  { href: "/de", label: "Startseite", lang: "de" },
  { href: "/es", label: "Página principal", lang: "es" },
];

export default function GlobalNotFound() {
  return (
    <html lang="pl" className={`${cormorant.variable} ${manrope.variable}`}>
      <body className="lapis-sky flex min-h-svh items-center justify-center px-5 text-center">
        <main>
          <Image src="/logo/logo-gold.png" alt="" width={128} height={128} className="mx-auto h-28 w-28" />
          <p className="mt-6 font-display text-7xl font-semibold text-gold-light">404</p>
          <h1 className="mt-2 font-display text-3xl font-semibold text-gold-pale">Nie znaleziono strony</h1>
          <p className="mt-1 text-gold-pale/70" lang="en">Page not found</p>
          <nav className="mt-8 flex flex-wrap justify-center gap-2">
            {links.map((l) => (
              <a
                key={l.href}
                href={l.href}
                hrefLang={l.lang}
                className="rounded-full border border-gold-light/40 px-5 py-2.5 text-sm font-semibold text-gold-pale hover:bg-gold-light/10"
              >
                {l.label}
              </a>
            ))}
          </nav>
        </main>
      </body>
    </html>
  );
}
