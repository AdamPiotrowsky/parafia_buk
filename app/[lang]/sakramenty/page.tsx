import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, Clock, Droplets, Flame, HandHeart, Heart, HeartHandshake, Phone } from "lucide-react";

import { PageHeader } from "@/components/page-header";
import { href, type ForeignLocale } from "@/lib/i18n/config";
import { content } from "@/lib/i18n/content";
import { ui } from "@/lib/i18n/ui";
import { massSchedule, site } from "@/lib/site";

const icons: Record<string, typeof Heart> = {
  chrzest: Droplets,
  bierzmowanie: Flame,
  pojednanie: HeartHandshake,
  namaszczenie: HandHeart,
  malzenstwo: Heart,
};

export async function generateMetadata({ params }: PageProps<"/[lang]/sakramenty">): Promise<Metadata> {
  return { title: content[(await params).lang as ForeignLocale].sacraments.metaTitle };
}

export default async function SacramentsPage({ params }: PageProps<"/[lang]/sakramenty">) {
  const lang = (await params).lang as ForeignLocale;
  const t = content[lang].sacraments;
  const hours = ui[lang].officeHours.map((o) => `${o.days} ${o.hours}`).join(" · ");

  return (
    <>
      <PageHeader eyebrow={t.eyebrow} title={t.title} lead={t.lead} />

      <section className="bg-vellum">
        <div className="mx-auto max-w-5xl px-5 py-16 lg:px-8">
          <p className="max-w-2xl text-ink-soft">{t.intro}</p>

          <div className="mt-8 space-y-4">
            {t.items.map(({ id, name, lead, points }) => {
              const Icon = icons[id] ?? Heart;
              return (
                <article
                  key={id}
                  id={id}
                  className="grid scroll-mt-32 gap-4 rounded-2xl border border-line bg-parchment p-6 md:grid-cols-[15rem_1fr] md:gap-8"
                >
                  <div className="flex items-center gap-3 md:items-start">
                    <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-lapis text-gold-light">
                      <Icon size={20} strokeWidth={1.6} />
                    </span>
                    <h3 className="font-display text-2xl font-semibold leading-tight text-lapis">{name}</h3>
                  </div>
                  <div>
                    <p className="leading-7 text-ink">{lead}</p>
                    <ul className="mt-2 grid gap-x-8 gap-y-1 leading-7 text-ink-soft lg:grid-cols-2">
                      {points.map((p) => (
                        <li key={p} className="flex gap-3">
                          <span className="mt-2.5 h-1.5 w-1.5 shrink-0 rotate-45 bg-gold" aria-hidden />
                          {p}
                        </li>
                      ))}
                    </ul>
                  </div>
                </article>
              );
            })}
          </div>

          <Link
            href={href("/msze", lang)}
            className="group mt-8 grid items-center gap-5 rounded-2xl border border-gold/40 bg-white p-6 transition hover:border-lapis/40 hover:shadow-md sm:grid-cols-[auto_1fr_auto]"
          >
            <span className="flex h-12 w-12 items-center justify-center rounded-full bg-gold-pale text-lapis">
              <Clock size={22} strokeWidth={1.6} />
            </span>
            <span>
              <span className="block font-display text-2xl font-semibold text-lapis">{t.massesTitle}</span>
              <span className="mt-1 block text-ink-soft">
                {t.massesSummary(massSchedule.sunday.join(", "), massSchedule.weekday.join(", "))}
              </span>
            </span>
            <span className="inline-flex items-center gap-1 text-sm font-bold text-lapis group-hover:text-gold">
              {t.see} <ArrowRight size={15} className="transition group-hover:translate-x-1" />
            </span>
          </Link>

          <a
            href={`tel:+48${site.phone.replace(/\s/g, "")}`}
            className="mt-4 flex flex-wrap items-center gap-4 rounded-2xl bg-lapis p-6 text-gold-pale transition hover:bg-lapis-light"
          >
            <Phone size={22} className="text-gold-light" />
            <span>
              <span className="block font-display text-2xl font-semibold">
                {t.callTitle}: +48 {site.phone}
              </span>
              <span className="text-sm text-gold-pale/70">
                {t.callText} — {hours}
              </span>
            </span>
          </a>
        </div>
      </section>
    </>
  );
}
