import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

import { Divider, Eyebrow } from "@/components/ornament";
import { PageHeader } from "@/components/page-header";
import { SaintPortrait } from "@/components/saint-portrait";
import { href, type ForeignLocale } from "@/lib/i18n/config";
import { content } from "@/lib/i18n/content";
import { legacyUrl } from "@/lib/legacy/assets";
import { relics } from "@/lib/relics";
import { patrons } from "@/lib/saints";

export async function generateMetadata({ params }: PageProps<"/[lang]/swieci">): Promise<Metadata> {
  return { title: content[(await params).lang as ForeignLocale].saints.metaTitle };
}

/* Patroni i relikwie — kalendarz liturgiczny jest tylko w wersji polskiej */
export default async function SaintsPage({ params }: PageProps<"/[lang]/swieci">) {
  const lang = (await params).lang as ForeignLocale;
  const t = content[lang].saints;

  return (
    <>
      <PageHeader eyebrow={t.eyebrow} title={t.title} lead={t.lead} />

      <nav aria-label={t.onThisPage} className="sticky top-[calc(6.75rem+1px)] z-30 border-b border-line bg-parchment/95 backdrop-blur">
        <div className="mx-auto flex max-w-7xl gap-1 overflow-x-auto px-5 py-2.5 [scrollbar-width:none] lg:px-8">
          {[
            { href: "#patroni", label: t.patronsEyebrow },
            { href: "#relikwie", label: t.relicsTitle },
          ].map((l) => (
            <a key={l.href} href={l.href} className="shrink-0 rounded-full px-4 py-2 text-sm font-semibold text-lapis transition hover:bg-lapis hover:text-gold-pale">
              {l.label}
            </a>
          ))}
        </div>
      </nav>

      {/* PATRONI */}
      <section id="patroni" className="mx-auto max-w-7xl scroll-mt-44 px-5 py-20 lg:px-8">
        <Eyebrow>{t.patronsEyebrow}</Eyebrow>
        <h2 className="mt-3 font-display text-5xl font-semibold text-lapis">{t.patronsTitle}</h2>
        <div className="mt-10 grid gap-6 md:grid-cols-2 xl:grid-cols-3">
          {patrons.map((base, i) => {
            const p = t.patrons[i];
            return (
              <article key={base.name} className="flex flex-col rounded-2xl border border-line bg-vellum p-8">
                <p className="text-[0.7rem] font-bold uppercase tracking-[0.2em] text-gold">{p.role}</p>
                <h3 className="mt-3 font-display text-3xl font-semibold leading-tight text-lapis">{p.name}</h3>
                <p className="mt-1 font-display text-lg italic text-wine">{p.feast}</p>
                <p className="mt-4 flex-1 leading-7 text-ink-soft">{p.text}</p>
                <p className="mt-5 border-t border-line pt-4 text-sm text-ink-muted">
                  <span className="font-semibold text-ink">{t.attribute}:</span> {p.attribute}
                </p>
                {base.href && (
                  <Link href={href(base.href, lang)} className="mt-4 inline-flex items-center gap-2 text-sm font-bold text-lapis hover:text-gold">
                    {t.readMore} <ArrowRight size={15} />
                  </Link>
                )}
              </article>
            );
          })}
        </div>
      </section>

      {/* RELIKWIE */}
      <section id="relikwie" className="scroll-mt-44 border-t border-line">
        <div className="mx-auto max-w-6xl px-5 py-20 lg:px-8">
          <div className="text-center">
            <Eyebrow>{t.relicsEyebrow}</Eyebrow>
            <h2 className="mt-3 font-display text-5xl font-semibold text-lapis">{t.relicsTitle}</h2>
            <p className="mx-auto mt-3 max-w-xl text-ink-muted">{t.relicsLead}</p>
            <Divider className="mt-6" />
          </div>

          <ul className="mt-12 space-y-4">
            {relics.map((base) => {
              const r = t.relics[base.slug];
              const life = r.life ?? base.life;
              return (
                <li
                  key={base.slug}
                  className="grid items-center gap-5 rounded-2xl border border-line bg-vellum p-5 sm:grid-cols-[6.5rem_1fr] md:grid-cols-[7.5rem_1fr_11rem] md:gap-7 md:p-6"
                >
                  <SaintPortrait slug={base.slug} name={r.name} className="mx-auto aspect-[3/4] w-24 sm:w-full" />
                  <div className="text-center sm:text-left">
                    <h3 className="font-display text-2xl font-semibold leading-tight text-lapis sm:text-3xl">{r.name}</h3>
                    <p className="mt-1 text-sm text-ink-muted">
                      {[life, r.feast && `${t.feastLabel}: ${r.feast}`].filter(Boolean).join(" · ")}
                    </p>
                    <p className="mt-3 leading-7 text-ink-soft">{r.text}</p>
                    {base.href && (
                      <Link href={href(base.href, lang)} className="mt-3 inline-flex items-center gap-2 text-sm font-bold text-lapis hover:text-gold">
                        {t.moreRafal} <ArrowRight size={15} />
                      </Link>
                    )}
                  </div>
                  <div className="flex justify-center gap-2 sm:col-span-2 md:col-span-1 md:flex-col">
                    {base.photos.map((ph) => (
                      <a
                        key={ph}
                        href={legacyUrl(ph)}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="relative block aspect-square w-36 overflow-hidden rounded-xl border border-gold/40 bg-white md:w-full"
                        title={t.relicPhoto}
                      >
                        <Image src={legacyUrl(ph)} alt={`${t.relicAlt}: ${r.name}`} fill sizes="176px" className="object-cover" />
                      </a>
                    ))}
                  </div>
                </li>
              );
            })}
          </ul>

          <p className="mt-10 text-center text-sm text-ink-muted">
            {t.calendarNote}{" "}
            <Link href="/swieci#kalendarz" hrefLang="pl" className="font-semibold text-lapis underline-offset-4 hover:underline">
              Kalendarz świętych (PL)
            </Link>
          </p>
        </div>
      </section>
    </>
  );
}
