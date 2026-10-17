"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Clock, Megaphone, Menu, Radio, ScrollText, X } from "lucide-react";

import { TodayBar } from "@/components/today-bar";
import { mainNav, site } from "@/lib/site";

function isActive(pathname: string, href: string) {
  return pathname === href || pathname.startsWith(`${href}/`);
}

export function SiteHeader() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  return (
    <>
      <header className="sticky top-0 z-50">
        <div className="bg-lapis-deep">
          <div className="mx-auto flex max-w-7xl items-center gap-6 px-5 lg:px-8">
            <a
              href="https://archpoznan.pl"
              target="_blank"
              rel="noopener noreferrer"
              className="hidden shrink-0 items-center gap-2 border-r border-gold/25 pr-6 text-[0.72rem] font-semibold uppercase tracking-[0.18em] text-gold-light hover:text-gold-pale md:flex"
            >
              <span aria-hidden>✠</span> Archidiecezja Poznańska
            </a>
            <div className="min-w-0 flex-1">
              <TodayBar />
            </div>
          </div>
        </div>

        <div className="border-b border-line bg-parchment/95 backdrop-blur">
          <div className="mx-auto flex h-[4.5rem] max-w-7xl items-center justify-between gap-6 px-5 lg:px-8">
            <Link href="/" className="group flex items-center gap-3">
              <span className="flex h-12 w-12 items-center justify-center rounded-full bg-lapis ring-1 ring-gold/50 transition group-hover:ring-gold">
                <Image src="/logo/postac-gold.png" alt="" width={40} height={40} className="h-10 w-10" priority />
              </span>
              <span className="leading-tight">
                <span className="block font-display text-[1.35rem] font-semibold text-lapis">Sanktuarium w Buku</span>
                <span className="block text-[0.68rem] uppercase tracking-[0.2em] text-ink-muted">
                  Matki Bożej Bukowskiej Literackiej
                </span>
                <span className="block text-[0.62rem] font-semibold uppercase tracking-[0.2em] text-gold md:hidden">
                  Archidiecezja Poznańska
                </span>
              </span>
            </Link>

            <nav className="hidden items-center gap-1 xl:flex" aria-label="Główna nawigacja">
              {mainNav.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`whitespace-nowrap rounded-full px-3.5 py-2 text-[0.88rem] font-medium transition ${
                    isActive(pathname, item.href)
                      ? "bg-lapis text-gold-pale"
                      : "text-ink-soft hover:bg-parchment-deep hover:text-lapis"
                  }`}
                >
                  {item.label}
                </Link>
              ))}
            </nav>

            <div className="flex items-center gap-2">
              <a
                href={site.links.live}
                target="_blank"
                rel="noopener noreferrer"
                className="hidden items-center gap-2 whitespace-nowrap rounded-full border border-wine/30 px-4 py-2 text-[0.85rem] font-semibold text-wine transition hover:bg-wine hover:text-white sm:flex"
              >
                <span className="relative flex h-2 w-2">
                  <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-red-500 opacity-60" />
                  <span className="relative inline-flex h-2 w-2 rounded-full bg-red-600" />
                </span>
                Na żywo
              </a>

              <button
                type="button"
                onClick={() => setOpen((v) => !v)}
                className="flex h-11 w-11 items-center justify-center rounded-full text-lapis hover:bg-parchment-deep xl:hidden"
                aria-label={open ? "Zamknij menu" : "Otwórz menu"}
                aria-expanded={open}
              >
                {open ? <X size={22} /> : <Menu size={22} />}
              </button>
            </div>
          </div>
        </div>

        {open && (
          <div className="border-b border-line bg-parchment xl:hidden">
            <nav className="mx-auto grid max-w-7xl gap-1 px-5 py-4 sm:grid-cols-2" aria-label="Menu mobilne">
              {mainNav.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={() => setOpen(false)}
                  className={`rounded-lg px-4 py-3 font-display text-xl ${
                    isActive(pathname, item.href) ? "bg-lapis text-gold-pale" : "text-lapis hover:bg-parchment-deep"
                  }`}
                >
                  {item.label}
                </Link>
              ))}
            </nav>
          </div>
        )}
      </header>

      <MobileDock pathname={pathname} />
    </>
  );
}

/* Dolny pasek na telefonie — najczęściej używane rzeczy pod kciukiem */
function MobileDock({ pathname }: { pathname: string }) {
  const items = [
    { label: "Msze", href: "/msze", icon: Clock },
    { label: "Ogłoszenia", href: "/ogloszenia", icon: Megaphone },
    { label: "Intencje", href: "/intencje", icon: ScrollText },
  ];

  return (
    <nav
      className="fixed inset-x-0 bottom-0 z-50 border-t border-gold/30 bg-lapis-deep/95 pb-[env(safe-area-inset-bottom)] backdrop-blur sm:hidden"
      aria-label="Szybki dostęp"
    >
      <div className="grid grid-cols-4">
        {items.map(({ label, href, icon: Icon }) => (
          <Link
            key={href}
            href={href}
            className={`flex flex-col items-center gap-1 py-2.5 text-[0.68rem] font-medium ${
              isActive(pathname, href) ? "text-gold-light" : "text-gold-pale/70"
            }`}
          >
            <Icon size={20} strokeWidth={1.6} />
            {label}
          </Link>
        ))}
        <a
          href={site.links.live}
          target="_blank"
          rel="noopener noreferrer"
          className="flex flex-col items-center gap-1 py-2.5 text-[0.68rem] font-medium text-gold-pale/70"
        >
          <Radio size={20} strokeWidth={1.6} className="text-red-400" />
          Na żywo
        </a>
      </div>
    </nav>
  );
}
