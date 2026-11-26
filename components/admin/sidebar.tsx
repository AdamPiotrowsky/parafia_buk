"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { ExternalLink, House, KeyRound, LogOut, Megaphone, Newspaper, ScrollText } from "lucide-react";

import { logout } from "@/app/(pl)/zakrystia-7f3k/actions";
import { ADMIN_PATH } from "@/lib/admin/path";

const items = [
  { href: ADMIN_PATH, label: "Start", icon: House },
  { href: `${ADMIN_PATH}/ogloszenia`, label: "Ogłoszenia", icon: Megaphone },
  { href: `${ADMIN_PATH}/intencje`, label: "Intencje", icon: ScrollText },
  { href: `${ADMIN_PATH}/aktualnosci`, label: "Aktualności", icon: Newspaper },
];

/* Menu boczne panelu; na telefonie — pasek u góry */
export function AdminSidebar() {
  const pathname = usePathname();
  const active = (href: string) => (href === ADMIN_PATH ? pathname === href : pathname.startsWith(href));
  const link = (href: string) =>
    `flex items-center gap-3 rounded-xl px-3.5 py-2.5 text-sm font-semibold transition ${
      active(href) ? "bg-gold-light text-lapis-deep" : "text-gold-pale/80 hover:bg-white/10 hover:text-gold-pale"
    }`;

  return (
    <aside className="lapis-sky shrink-0 lg:sticky lg:top-0 lg:flex lg:h-screen lg:w-64 lg:flex-col">
      <div className="flex items-center gap-3 px-5 py-4 lg:py-6">
        <Image src="/logo/logo-gold.png" alt="" width={44} height={44} className="h-10 w-10" />
        <div className="leading-tight">
          <p className="font-display text-xl font-semibold text-gold-pale">Panel parafii</p>
          <p className="text-xs text-gold-pale/60">św. Stanisława w Buku</p>
        </div>
      </div>

      <nav className="flex gap-1 overflow-x-auto px-3 pb-3 [scrollbar-width:none] lg:flex-1 lg:flex-col lg:overflow-visible lg:pb-0">
        <p className="hidden px-3.5 pb-2 pt-2 text-[0.68rem] font-bold uppercase tracking-[0.22em] text-gold-light/70 lg:block">Treści</p>
        {items.map(({ href, label, icon: Icon }) => (
          <Link key={href} href={href} className={`${link(href)} shrink-0`}>
            <Icon size={18} /> {label}
          </Link>
        ))}

        <div className="flex gap-1 lg:mt-auto lg:flex-col lg:border-t lg:border-gold/20 lg:pb-4 lg:pt-4">
          <a href="/" target="_blank" className={`${link("/__")} shrink-0`}>
            <ExternalLink size={18} /> Zobacz stronę
          </a>
          <Link href={`${ADMIN_PATH}/haslo`} className={`${link(`${ADMIN_PATH}/haslo`)} shrink-0`}>
            <KeyRound size={18} /> Hasło
          </Link>
          <form action={logout}>
            <button type="submit" className={`${link("/__")} w-full shrink-0`}>
              <LogOut size={18} /> Wyloguj
            </button>
          </form>
        </div>
      </nav>
    </aside>
  );
}
