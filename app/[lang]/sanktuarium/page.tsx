import type { Metadata } from "next";
import { BookOpen, Music, Sparkles } from "lucide-react";

import { Divider, Eyebrow } from "@/components/ornament";
import { PageHeader } from "@/components/page-header";
import { SacredImage } from "@/components/sacred-image";
import { Timeline } from "@/components/timeline";
import type { ForeignLocale } from "@/lib/i18n/config";
import { content } from "@/lib/i18n/content";

const icons = [BookOpen, Sparkles, Music];

export async function generateMetadata({ params }: PageProps<"/[lang]/sanktuarium">): Promise<Metadata> {
  return { title: content[(await params).lang as ForeignLocale].sanctuary.metaTitle };
}

export default async function SanctuaryPage({ params }: PageProps<"/[lang]/sanktuarium">) {
  const t = content[(await params).lang as ForeignLocale].sanctuary;

  return (
    <>
      <PageHeader eyebrow={t.eyebrow} title={t.title} lead={t.lead} />

      <section className="mx-auto grid max-w-7xl gap-16 px-5 py-20 lg:grid-cols-[1fr_22rem] lg:items-center lg:px-8">
        <div className="max-w-2xl">
          <Eyebrow>{t.coronationEyebrow}</Eyebrow>
          <h2 className="mt-4 font-display text-5xl font-semibold leading-tight text-lapis">{t.coronationTitle}</h2>
          <div className="mt-6 space-y-5 text-[1.05rem] leading-8 text-ink-soft">
            {t.coronation.map((p) => (
              <p key={p.slice(0, 24)}>{p}</p>
            ))}
          </div>
        </div>
        <SacredImage src="/images/obraz-mbbl.jpg" alt={t.imageAlt} caption={t.crownedCaption} />
      </section>

      <section className="border-y border-line bg-vellum">
        <div className="mx-auto grid max-w-7xl gap-px px-5 py-16 md:grid-cols-3 lg:px-8">
          {t.pillars.map(({ title, text }, i) => {
            const Icon = icons[i];
            return (
              <div key={title} className="p-6">
                <Icon className="text-gold" size={30} strokeWidth={1.4} />
                <h3 className="mt-5 font-display text-2xl font-semibold text-lapis">{title}</h3>
                <p className="mt-3 leading-7 text-ink-soft">{text}</p>
              </div>
            );
          })}
        </div>
      </section>

      <section className="mx-auto max-w-5xl px-5 py-20 lg:px-8">
        <h2 className="text-center font-display text-4xl font-semibold text-lapis">{t.feastsTitle}</h2>
        <div className="mt-10 grid gap-6 sm:grid-cols-2">
          {t.feasts.map((o) => (
            <div key={o.date} className="rounded-2xl border border-gold/40 bg-vellum p-8">
              <p className="font-display text-5xl font-semibold text-gold">{o.date}</p>
              <p className="mt-3 font-display text-2xl font-semibold text-lapis">{o.name}</p>
              <p className="mt-1 text-ink-muted">{o.note}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Historia obrazu */}
      <section id="historia" className="scroll-mt-32 border-t border-line">
        <div className="mx-auto max-w-7xl px-5 pt-20 text-center lg:px-8">
          <Eyebrow>{t.historyEyebrow}</Eyebrow>
          <h2 className="mt-4 font-display text-5xl font-semibold text-lapis">{t.historyTitle}</h2>
          <Divider className="mt-6" />
        </div>
        <div className="mx-auto grid max-w-7xl items-start gap-16 px-5 py-16 lg:grid-cols-[22rem_1fr] lg:px-8">
          <SacredImage src="/images/fara-oltarz.jpg" alt={t.altarCaption} caption={t.altarCaption} />
          <div className="illuminated max-w-2xl space-y-6 text-[1.08rem] leading-8 text-ink-soft">
            {t.image.map((p) => (
              <p key={p.slice(0, 24)}>{p}</p>
            ))}
            <blockquote className="my-10 border-y border-gold/40 py-8 text-center font-display text-2xl italic leading-snug text-lapis sm:text-[1.7rem]">
              {t.quote}
              <footer className="mt-4 font-sans text-xs not-italic uppercase tracking-[0.2em] text-ink-muted">{t.quoteBy}</footer>
            </blockquote>
          </div>
        </div>
      </section>

      <section className="border-t border-line bg-vellum">
        <div className="mx-auto max-w-5xl px-5 py-20 lg:px-8">
          <div className="text-center">
            <Eyebrow>{t.timelineEyebrow}</Eyebrow>
            <h2 className="mt-4 font-display text-5xl font-semibold text-lapis">{t.timelineTitle}</h2>
            <Divider className="mt-6" />
          </div>
          {t.eras.map((era, i) => (
            <div key={era.name} className="mt-16">
              <div className="mb-4 flex items-baseline gap-4 border-b border-line pb-3">
                <span className="font-display text-5xl font-semibold text-gold/40">{["I", "II", "III", "IV"][i]}</span>
                <div>
                  <h3 className="font-display text-3xl font-semibold text-lapis">{era.name}</h3>
                  <p className="text-sm uppercase tracking-[0.2em] text-ink-muted">{era.span}</p>
                </div>
              </div>
              <Timeline events={era.events} />
            </div>
          ))}
        </div>
      </section>
    </>
  );
}
