"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

import { Flag } from "@/components/icons";
import { localeNames, locales, switchLocalePath, type Locale } from "@/lib/i18n/config";

/* Małe flagi — ta sama strona w innym języku (jeśli jest przetłumaczona) */
export function LanguageSwitcher({ lang, label, className = "" }: { lang: Locale; label: string; className?: string }) {
  const pathname = usePathname();

  return (
    <nav aria-label={label} className={`flex shrink-0 items-center gap-1.5 ${className}`}>
      {locales.map((l) => (
        <Link
          key={l}
          href={switchLocalePath(pathname, l)}
          hrefLang={l}
          lang={l}
          title={localeNames[l]}
          aria-current={l === lang ? "true" : undefined}
          className={`block rounded-[3px] p-0.5 transition ${
            l === lang ? "ring-1 ring-gold-light" : "opacity-60 hover:opacity-100"
          }`}
        >
          <Flag lang={l} className="block h-3 w-[1.125rem] rounded-[2px] shadow-[0_0_0_1px_rgba(255,255,255,0.25)]" />
          <span className="sr-only">{localeNames[l]}</span>
        </Link>
      ))}
    </nav>
  );
}
