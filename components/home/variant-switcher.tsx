"use client";

import { useSyncExternalStore } from "react";
import Link from "next/link";

import { variants } from "@/lib/home";

const noopSubscribe = () => () => {};

/* Pływający pasek do przełączania propozycji strony głównej (ukryty w podglądzie /pokaz) */
export function VariantSwitcher({ current }: { current: number }) {
  const isTopWindow = useSyncExternalStore(noopSubscribe, () => window.self === window.top, () => false);
  const active = variants.find((v) => v.id === current);
  if (!isTopWindow) return null;

  return (
    <div className="fixed inset-x-0 bottom-20 z-40 flex justify-center px-4 sm:inset-x-auto sm:bottom-auto sm:right-6 sm:top-32">
      <nav
        aria-label="Propozycje strony głównej"
        className="flex max-w-full items-center gap-1 overflow-x-auto rounded-full border border-gold/40 bg-lapis-deep/90 p-1.5 pl-4 [scrollbar-width:none] text-gold-pale shadow-[0_20px_40px_-15px_rgba(0,0,0,0.6)] backdrop-blur"
      >
        <Link href="/pokaz" className="mr-2 hidden text-xs font-semibold uppercase tracking-[0.18em] text-gold-light hover:text-gold-pale sm:block">
          Propozycja · {active?.name}
        </Link>
        {variants.map((v) => (
          <Link
            key={v.id}
            href={v.href}
            title={v.name}
            className={`flex h-9 min-w-9 shrink-0 items-center justify-center rounded-full px-3 text-sm font-bold transition ${
              v.id === current ? "bg-gold-light text-lapis-deep" : "text-gold-pale/80 hover:bg-white/10"
            }`}
          >
            SG{v.id}
          </Link>
        ))}
      </nav>
    </div>
  );
}
