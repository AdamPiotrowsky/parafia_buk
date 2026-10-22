"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { ChevronDown, Clock, Megaphone, Menu, Radio, ScrollText, X } from "lucide-react";

import { TodayBar } from "@/components/today-bar";
import { mainNav, site, type NavItem } from "@/lib/site";

function isActive(pathname: string, href: string) {
  return pathname === href || pathname.startsWith(`${href}/`);
}

function isItemActive(pathname: string, item: NavItem) {
  return isActive(pathname, item.href) || !!item.children?.some((c) => isActive(pathname, c.href));
}

const isExternal = (href: string) => href.startsWith("http");

/* Link menu — zewnętrzne (np. grafik salek) otwierają się w nowej karcie */
function MenuLink({ href, className, onClick, children }: { href: string; className: string; onClick?: () => void; children: React.ReactNode }) {
  return isExternal(href) ? (
    <a href={href} target="_blank" rel="noopener noreferrer" className={className} onClick={onClick}>
      {children}
    </a>
  ) : (
    <Link href={href} className={className} onClick={onClick}>
      {children}
    </Link>
  );
}

const pill = (active: boolean) =>
  `whitespace-nowrap rounded-full px-3.5 py-2 text-[0.88rem] font-medium transition ${
    active ? "bg-lapis text-gold-pale" : "text-ink-soft hover:bg-parchment-deep hover:text-lapis"
  }`;

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

            <nav className="hidden items-center gap-1 lg:flex" aria-label="Główna nawigacja">
              {mainNav.map((item) =>
                item.children ? (
                  <NavDropdown key={item.href} item={item} pathname={pathname} />
                ) : (
                  <Link key={item.href} href={item.href} className={pill(isItemActive(pathname, item))}>
                    {item.label}
                  </Link>
                )
              )}
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
                className="flex h-11 w-11 items-center justify-center rounded-full text-lapis hover:bg-parchment-deep lg:hidden"
                aria-label={open ? "Zamknij menu" : "Otwórz menu"}
                aria-expanded={open}
              >
                {open ? <X size={22} /> : <Menu size={22} />}
              </button>
            </div>
          </div>
        </div>

        {open && (
          <div className="border-b border-line bg-parchment lg:hidden">
            <nav className="mx-auto max-h-[calc(100svh-8rem)] max-w-7xl overflow-y-auto px-5 py-4" aria-label="Menu mobilne">
              {mainNav.map((item) =>
                item.children ? (
                  <div key={item.href} className="my-2 border-y border-line py-2">
                    <p className="px-4 pb-1 pt-2 text-[0.7rem] font-bold uppercase tracking-[0.25em] text-gold">{item.label}</p>
                    <div className="grid gap-1 sm:grid-cols-2">
                      {item.children.map((c) => (
                        <MenuLink
                          key={c.href}
                          href={c.href}
                          onClick={() => setOpen(false)}
                          className={`rounded-lg px-4 py-2.5 font-display text-lg ${
                            isActive(pathname, c.href) ? "bg-lapis text-gold-pale" : "text-lapis hover:bg-parchment-deep"
                          }`}
                        >
                          {c.label}
                          {isExternal(c.href) && <span className="ml-1 text-gold">↗</span>}
                        </MenuLink>
                      ))}
                    </div>
                  </div>
                ) : (
                  <Link
                    key={item.href}
                    href={item.href}
                    onClick={() => setOpen(false)}
                    className={`block rounded-lg px-4 py-3 font-display text-xl ${
                      isActive(pathname, item.href) ? "bg-lapis text-gold-pale" : "text-lapis hover:bg-parchment-deep"
                    }`}
                  >
                    {item.label}
                  </Link>
                )
              )}
            </nav>
          </div>
        )}
      </header>

      <MobileDock pathname={pathname} />
    </>
  );
}

/* Rozwijane menu (np. Parafia) — otwiera się po najechaniu lub kliknięciu */
function NavDropdown({ item, pathname }: { item: NavItem; pathname: string }) {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!open) return;
    const onDown = (e: MouseEvent) => {
      if (!ref.current?.contains(e.target as Node)) setOpen(false);
    };
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    document.addEventListener("mousedown", onDown);
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("mousedown", onDown);
      document.removeEventListener("keydown", onKey);
    };
  }, [open]);

  return (
    <div ref={ref} className="relative" onMouseEnter={() => setOpen(true)} onMouseLeave={() => setOpen(false)}>
      <button
        type="button"
        onClick={() => setOpen(true)}
        aria-expanded={open}
        aria-haspopup="true"
        className={`${pill(isItemActive(pathname, item))} flex items-center gap-1`}
      >
        {item.label}
        <ChevronDown size={15} className={`transition ${open ? "rotate-180" : ""}`} />
      </button>
      <div
        className={`absolute left-1/2 top-full z-50 -translate-x-1/2 pt-3 transition ${
          open ? "visible translate-y-0 opacity-100" : "invisible -translate-y-1 opacity-0"
        }`}
      >
        <ul className="w-64 overflow-hidden rounded-2xl border border-line bg-white p-2 shadow-[0_30px_60px_-25px_rgba(16,29,59,0.45)]">
          {item.children!.map((c) => (
            <li key={c.href}>
              <MenuLink
                href={c.href}
                onClick={() => setOpen(false)}
                className={`flex items-center justify-between rounded-xl px-4 py-2.5 font-display text-lg transition ${
                  isActive(pathname, c.href) ? "bg-lapis text-gold-pale" : "text-lapis hover:bg-parchment"
                }`}
              >
                {c.label}
                <span className="text-gold" aria-hidden>
                  {isExternal(c.href) ? "↗" : "›"}
                </span>
              </MenuLink>
            </li>
          ))}
        </ul>
      </div>
    </div>
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
