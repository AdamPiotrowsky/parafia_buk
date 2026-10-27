import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { ArrowLeft, ArrowRight } from "lucide-react";

import { Divider, Eyebrow } from "@/components/ornament";
import { PageHeader } from "@/components/page-header";
import { SaintPortrait } from "@/components/saint-portrait";
import { Timeline } from "@/components/timeline";
import { href, type ForeignLocale } from "@/lib/i18n/config";
import { content } from "@/lib/i18n/content";
import { legacyUrl } from "@/lib/legacy/assets";

const relicPhoto = legacyUrl("/uploads/relikwie/IMG_7077_ojciec_chylinski.jpg");

export async function generateMetadata({ params }: PageProps<"/[lang]/swieci/rafal-chylinski">): Promise<Metadata> {
  const t = content[(await params).lang as ForeignLocale].rafal;
  return { title: t.metaTitle, description: t.metaDescription };
}

export default async function RafalPage({ params }: PageProps<"/[lang]/swieci/rafal-chylinski">) {
  const lang = (await params).lang as ForeignLocale;
  const t = content[lang].rafal;

  return (
    <>
      <PageHeader eyebrow={t.eyebrow} title={t.title} lead={t.lead} />

      <section className="mx-auto grid max-w-6xl gap-14 px-5 py-20 lg:grid-cols-[18rem_1fr] lg:px-8">
        <div className="space-y-6 lg:sticky lg:top-40 lg:self-start">
          <SaintPortrait slug="rafal-chylinski" name={t.title} className="mx-auto aspect-[3/4] w-56 lg:w-full" />
          <a
            href={relicPhoto}
            target="_blank"
            rel="noopener noreferrer"
            className="relative mx-auto block aspect-square w-56 overflow-hidden rounded-2xl border border-gold/40 lg:w-full"
          >
            <Image src={relicPhoto} alt={t.relicCaption} fill sizes="288px" className="object-cover" />
          </a>
          <p className="text-center text-sm italic text-ink-muted">{t.relicCaption}</p>
        </div>

        <div>
          <div className="illuminated space-y-5 text-[1.08rem] leading-8 text-ink-soft">
            {t.bio.map((p) => (
              <p key={p.slice(0, 24)}>{p}</p>
            ))}
          </div>

          <div className="mt-12">
            <Eyebrow>{t.lifeEyebrow}</Eyebrow>
            <h2 className="mt-2 font-display text-4xl font-semibold text-lapis">{t.lifeTitle}</h2>
            <Timeline events={t.life} />
          </div>

          <blockquote className="mt-12 rounded-2xl border border-gold/40 bg-vellum p-8">
            <p className="text-[0.72rem] font-bold uppercase tracking-[0.25em] text-gold">{t.prayerLabel}</p>
            <p className="mt-3 font-display text-2xl italic leading-snug text-lapis">{t.prayer}</p>
          </blockquote>

          <Divider className="my-12" />

          <div className="grid gap-5 md:grid-cols-2">
            <div className="rounded-2xl border border-line bg-vellum p-7">
              <p className="font-display text-2xl font-semibold text-lapis">{t.wysoczkaTitle}</p>
              <p className="mt-2 leading-7 text-ink-soft">{t.wysoczkaText}</p>
            </div>
            <div className="rounded-2xl border border-line bg-vellum p-7">
              <p className="font-display text-2xl font-semibold text-lapis">{t.pilgrimageTitle}</p>
              <p className="mt-2 leading-7 text-ink-soft">{t.pilgrimageText}</p>
            </div>
          </div>

          <Link
            href="/parafia/wspolnoty#rafal-chylinski"
            hrefLang="pl"
            className="group mt-5 flex items-center justify-between gap-4 rounded-2xl bg-lapis p-6 text-gold-pale hover:bg-lapis-light"
          >
            <span>
              <span className="block font-display text-2xl font-semibold">{t.groupTitle}</span>
              <span className="text-sm text-gold-pale/70">{t.groupText}</span>
            </span>
            <ArrowRight size={18} className="shrink-0 text-gold-light transition group-hover:translate-x-1" />
          </Link>

          <Link href={href("/swieci", lang)} className="mt-10 inline-flex items-center gap-2 text-sm font-semibold text-lapis hover:text-gold">
            <ArrowLeft size={15} /> {t.back}
          </Link>
        </div>
      </section>
    </>
  );
}
