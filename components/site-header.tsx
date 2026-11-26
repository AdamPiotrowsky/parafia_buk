"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Church, ChevronDown, Clock, Mail, Megaphone, Menu, Radio, ScrollText, X } from "lucide-react";

import { FacebookIcon } from "@/components/icons";
import { LanguageSwitcher } from "@/components/language-switcher";
import { TodayBar } from "@/components/today-bar";
import { href, type Locale } from "@/lib/i18n/config";
import { ui, type DockItem } from "@/lib/i18n/ui";
import { site, type NavItem } from "@/lib/site";

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

export function SiteHeader({ lang = "pl" }: { lang?: Locale }) {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const closeMenu = useCallback(() => setOpen(false), []);
  const t = ui[lang];

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
              <span aria-hidden>✠</span> {t.diocese}
            </a>
            <div className="min-w-0 flex-1">
              <TodayBar lang={lang} />
            </div>
            <div className="flex shrink-0 items-center gap-3 border-l border-gold/25 pl-3 sm:gap-4 sm:pl-5">
              <a
                href={site.links.facebook}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={t.facebook}
                title={t.facebook}
                className="flex h-6 w-6 items-center justify-center rounded-full bg-gold-light/15 text-gold-pale transition hover:bg-[#1877f2] hover:text-white"
              >
                <FacebookIcon size={14} />
              </a>
              <LanguageSwitcher lang={lang} label={t.languageLabel} />
            </div>
          </div>
        </div>

        <div className="border-b border-line bg-parchment/95 backdrop-blur">
          <div className="mx-auto flex h-[4.5rem] max-w-7xl items-center justify-between gap-6 px-5 lg:px-8">
            <Link href={href("", lang)} className="group flex items-center gap-3">
              <span className="flex h-12 w-12 items-center justify-center rounded-full bg-lapis ring-1 ring-gold/50 transition group-hover:ring-gold">
                <Image src="/logo/postac-gold.png" alt="" width={40} height={40} className="h-10 w-10" priority />
              </span>
              <span className="leading-tight">
                <span className="block font-display text-[1.2rem] font-semibold leading-tight text-lapis sm:text-[1.35rem]">{t.parishShort}</span>
                {/* Inne języki mają dłuższe nazwy — na telefonie mniejszy napis i bez archidiecezji, żeby wszystko zmieściło się w pasku */}
                <span
                  className={`block uppercase text-ink-muted ${
                    lang === "pl" ? "text-[0.68rem] tracking-[0.2em]" : "text-[0.6rem] tracking-[0.12em] sm:text-[0.68rem] sm:tracking-[0.2em]"
                  }`}
                >
                  {t.sanctuary}
                </span>
                <span
                  className={`text-[0.62rem] font-semibold uppercase tracking-[0.2em] text-gold md:hidden ${lang === "pl" ? "block" : "hidden sm:block"}`}
                >
                  {t.diocese}
                </span>
              </span>
            </Link>

            <nav className="hidden items-center gap-1 xl:flex" aria-label={t.mainNavLabel}>
              {t.nav.map((item) =>
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
                {t.live}
              </a>

              <button
                type="button"
                onClick={() => setOpen((v) => !v)}
                className="flex h-11 w-11 items-center justify-center rounded-full text-lapis hover:bg-parchment-deep xl:hidden"
                aria-label={open ? t.menuClose : t.menuOpen}
                aria-expanded={open}
              >
                {open ? <X size={22} /> : <Menu size={22} />}
              </button>
            </div>
          </div>
        </div>

      </header>

      <MobileDrawer open={open} onClose={closeMenu} pathname={pathname} lang={lang} />
      <MobileDock pathname={pathname} items={t.dock} live={t.live} label={t.quickNavLabel} />
    </>
  );
}

/*
 * Menu na telefonie: panel wysuwany z prawej na ~2/3 szerokości.
 * Kliknięcie w przyciemnione tło, przycisk X albo Esc zamyka; panel przewija się sam, a strona pod nim stoi.
 * Zajmuje całą wysokość ponad dolnym paskiem, więc nic nie jest zasłonięte.
 */
function MobileDrawer({ open, onClose, pathname, lang }: { open: boolean; onClose: () => void; pathname: string; lang: Locale }) {
  const t = ui[lang];
  const closeRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (!open) return;
    const root = document.documentElement;
    const prev = root.style.overflow;
    root.style.overflow = "hidden";
    closeRef.current?.focus();
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    document.addEventListener("keydown", onKey);
    return () => {
      root.style.overflow = prev;
      document.removeEventListener("keydown", onKey);
    };
  }, [open, onClose]);

  const linkCls = (active: boolean, size: string) =>
    `flex items-center justify-between rounded-lg px-3 font-display transition ${size} ${
      active ? "bg-lapis text-gold-pale" : "text-lapis hover:bg-parchment-deep"
    }`;

  return (
    <div className={`fixed inset-0 z-[60] xl:hidden ${open ? "" : "pointer-events-none"}`} aria-hidden={!open}>
      <div
        onClick={onClose}
        className={`absolute inset-0 bg-lapis-deep/55 backdrop-blur-[2px] transition-opacity duration-300 ${open ? "opacity-100" : "opacity-0"}`}
      />
      <div
        role="dialog"
        aria-modal="true"
        aria-label={t.mobileNavLabel}
        inert={!open}
        className={`absolute inset-y-0 right-0 flex w-[68vw] min-w-[15.5rem] max-w-sm flex-col border-l border-gold/30 bg-parchment shadow-[-30px_0_60px_-30px_rgba(8,15,35,0.6)] transition-transform duration-300 ease-out motion-reduce:transition-none ${
          open ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <div className="flex h-16 shrink-0 items-center justify-between border-b border-line pl-5 pr-2">
          <span className="text-[0.7rem] font-bold uppercase tracking-[0.25em] text-gold">Menu</span>
          <button
            ref={closeRef}
            type="button"
            onClick={onClose}
            aria-label={t.menuClose}
            className="flex h-11 w-11 items-center justify-center rounded-full text-lapis hover:bg-parchment-deep"
          >
            <X size={22} />
          </button>
        </div>

        <nav className="flex-1 overflow-y-auto overscroll-contain px-2 py-3" aria-label={t.mobileNavLabel}>
          {t.nav.map((item) =>
            item.children ? (
              <div key={item.href} className="my-2 border-y border-line py-2">
                <p className="px-3 pb-1 pt-1.5 text-[0.68rem] font-bold uppercase tracking-[0.22em] text-gold">{item.label}</p>
                {item.children.map((c) => (
                  <MenuLink key={c.href} href={c.href} onClick={onClose} className={linkCls(isActive(pathname, c.href), "py-2 text-[1.05rem]")}>
                    {c.label}
                    {isExternal(c.href) && <span className="ml-1 text-gold">↗</span>}
                  </MenuLink>
                ))}
              </div>
            ) : (
              <Link key={item.href} href={item.href} onClick={onClose} className={linkCls(isActive(pathname, item.href), "py-2.5 text-[1.2rem]")}>
                {item.label}
              </Link>
            )
          )}
        </nav>

        <div className="shrink-0 border-t border-line p-3 pb-[max(0.75rem,env(safe-area-inset-bottom))]">
          <a
            href={site.links.live}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-center gap-2 rounded-full border border-wine/30 px-4 py-2.5 text-sm font-semibold text-wine hover:bg-wine hover:text-white"
          >
            <span className="h-2 w-2 rounded-full bg-red-600" /> {t.live}
          </a>
        </div>
      </div>
    </div>
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
const dockIcons = { mass: Clock, news: Megaphone, intentions: ScrollText, church: Church, contact: Mail };

function MobileDock({ pathname, items, live, label }: { pathname: string; items: DockItem[]; live: string; label: string }) {
  return (
    <nav
      className="fixed inset-x-0 bottom-0 z-50 border-t border-gold/30 bg-lapis-deep/95 pb-[env(safe-area-inset-bottom)] backdrop-blur sm:hidden"
      aria-label={label}
    >
      <div className="grid grid-cols-4">
        {items.map(({ label, href, icon }) => {
          const Icon = dockIcons[icon];
          return (
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
          );
        })}
        <a
          href={site.links.live}
          target="_blank"
          rel="noopener noreferrer"
          className="flex flex-col items-center gap-1 py-2.5 text-[0.68rem] font-medium text-gold-pale/70"
        >
          <Radio size={20} strokeWidth={1.6} className="text-red-400" />
          {live}
        </a>
      </div>
    </nav>
  );
}
