import Link from "next/link";
import { ArrowRight } from "lucide-react";

import { HomeBody, ParishHero } from "@/components/home/home-layout";
import { href, type ForeignLocale } from "@/lib/i18n/config";
import { content } from "@/lib/i18n/content";
import { foreignHome } from "@/lib/i18n/home";

/* Strona główna w innych językach — ten sam układ co polska (SG10), tylko z tłumaczeniem */
export default async function LocaleHome({ params }: PageProps<"/[lang]">) {
  const lang = (await params).lang as ForeignLocale;
  const t = content[lang].home;
  const home = foreignHome(lang);

  return (
    <>
      <ParishHero hero={home.hero} />
      <HomeBody
        t={home}
        today={
          /* Zamiast polskiego świętego dnia — powitanie gości z zagranicy */
          <>
            <p className="text-[0.7rem] font-bold uppercase tracking-[0.25em] text-gold">{t.welcomeTitle}</p>
            <p className="mt-4 leading-7 text-ink-soft">{t.welcome[0]}</p>
            <p className="mt-3 text-sm leading-6 text-ink-muted">{t.welcome[1]}</p>
            <Link href={href("/kontakt", lang)} className="mt-6 inline-flex items-center gap-1 text-sm font-semibold text-lapis hover:text-gold">
              {t.panel.contactLink} <ArrowRight size={15} />
            </Link>
          </>
        }
      />
    </>
  );
}
