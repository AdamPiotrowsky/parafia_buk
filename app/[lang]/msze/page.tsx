import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, Info } from "lucide-react";

import { PageHeader } from "@/components/page-header";
import { href, type ForeignLocale } from "@/lib/i18n/config";
import { content } from "@/lib/i18n/content";
import { massSchedule } from "@/lib/site";

function Times({ times, strong = false }: { times: string[]; strong?: boolean }) {
  return (
    <div className="flex flex-wrap gap-2">
      {times.map((t) => (
        <span
          key={t}
          className={`rounded-full px-4 py-1.5 text-lg font-semibold tabular-nums ${
            strong ? "bg-lapis text-gold-pale" : "border border-lapis/25 text-lapis"
          }`}
        >
          {t}
        </span>
      ))}
    </div>
  );
}

export async function generateMetadata({ params }: PageProps<"/[lang]/msze">): Promise<Metadata> {
  return { title: content[(await params).lang as ForeignLocale].masses.metaTitle };
}

export default async function MassesPage({ params }: PageProps<"/[lang]/msze">) {
  const lang = (await params).lang as ForeignLocale;
  const t = content[lang].masses;

  return (
    <>
      <PageHeader eyebrow={t.eyebrow} title={t.title} lead={t.lead} />

      <section className="mx-auto max-w-5xl px-5 py-16 lg:px-8">
        <p className="mb-6 flex gap-3 rounded-2xl border border-gold/40 bg-white p-5 text-ink-soft">
          <Info size={20} className="mt-0.5 shrink-0 text-gold" />
          {t.note}
        </p>

        <div className="overflow-hidden rounded-2xl border border-line bg-vellum">
          <div className="grid gap-4 border-b border-line p-8 sm:grid-cols-[14rem_1fr] sm:items-center">
            <p className="font-display text-3xl font-semibold text-lapis">{t.sunday}</p>
            <Times times={massSchedule.sunday} strong />
          </div>

          {t.weekdays.map((d) => (
            <div key={d} className="grid gap-3 border-b border-line px-8 py-4 last:border-b-0 sm:grid-cols-[14rem_1fr] sm:items-center">
              <p className="font-display text-xl text-ink">{d}</p>
              <Times times={massSchedule.weekday} />
            </div>
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-5xl px-5 pb-16 lg:px-8">
        <Link href={href("/sakramenty", lang)} className="group flex items-center justify-between gap-4 rounded-2xl border border-line bg-vellum p-6 transition hover:border-lapis/40">
          <span>
            <span className="block font-display text-2xl font-semibold text-lapis">{t.sacramentsTitle}</span>
            <span className="text-ink-soft">{t.sacramentsText}</span>
          </span>
          <ArrowRight size={18} className="shrink-0 text-gold transition group-hover:translate-x-1" />
        </Link>
      </section>
    </>
  );
}
