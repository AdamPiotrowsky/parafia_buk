import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Church, Clock, Landmark, Mail } from "lucide-react";

import { SacredImage } from "@/components/sacred-image";
import { href, type ForeignLocale } from "@/lib/i18n/config";
import { content } from "@/lib/i18n/content";
import { ui } from "@/lib/i18n/ui";
import { massSchedule } from "@/lib/site";

const cardLinks = {
  sanctuary: { path: "/sanktuarium", icon: Landmark },
  churches: { path: "/koscioly", icon: Church },
  masses: { path: "/msze", icon: Clock },
  contact: { path: "/kontakt", icon: Mail },
};

export default async function LocaleHome({ params }: PageProps<"/[lang]">) {
  const lang = (await params).lang as ForeignLocale;
  const t = content[lang].home;
  const m = content[lang].masses;
  const u = ui[lang];

  return (
    <div className="bg-white">
      {/* Ołtarz fary i nazwy na granatowej tablicy */}
      <section className="relative h-[52svh] min-h-[22rem] overflow-hidden bg-lapis-deep lg:h-[66svh]">
        <Image
          src="/images/fara-oltarz-ostre.jpg"
          alt={content[lang].sanctuary.altarCaption}
          fill
          priority
          quality={92}
          sizes="100vw"
          className="object-cover object-[51%_42%]"
        />
        <div className="absolute inset-x-0 bottom-0 h-48 bg-gradient-to-t from-lapis-deep via-lapis-deep/70 to-transparent" />
      </section>

      <section className="relative flow-root bg-[linear-gradient(to_bottom,var(--color-lapis-deep)_0,var(--color-lapis-deep)_50%,#fff_50%)]">
        <div className="relative mx-auto -mt-32 max-w-6xl px-4 sm:-mt-40 lg:px-8">
          <div className="lapis-sky overflow-hidden rounded-3xl shadow-[0_40px_90px_-40px_rgba(16,29,59,0.75)] ring-1 ring-gold/40">
            <div className="h-1.5 bg-gradient-to-r from-gold/40 via-gold-light to-gold/40" aria-hidden />
            <div className="flex gap-6 p-7 sm:p-10 lg:p-12">
              <Image src="/logo/logo-gold.png" alt="" width={96} height={96} className="hidden h-24 w-24 shrink-0 sm:block" priority />
              <div>
                <p className="text-[0.72rem] font-bold uppercase tracking-[0.3em] text-gold-light">{u.diocese}</p>
                <h1 className="mt-3 font-display text-4xl font-semibold leading-[1.05] text-gold-pale sm:text-5xl lg:text-6xl">{u.parishShort}</h1>
                <p className="gold-text mt-3 font-display text-2xl italic leading-tight sm:text-3xl">{u.sanctuary}</p>
                <p className="mt-5 max-w-2xl text-gold-pale/80">{t.intro}</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Powitanie i najważniejsze strony */}
      <section className="mx-auto grid max-w-6xl gap-12 px-5 py-16 lg:grid-cols-[1fr_1.1fr] lg:px-8">
        <div>
          <h2 className="font-display text-4xl font-semibold text-lapis">{t.welcomeTitle}</h2>
          <div className="mt-5 space-y-4 text-[1.05rem] leading-8 text-ink-soft">
            {t.welcome.map((p) => (
              <p key={p.slice(0, 24)}>{p}</p>
            ))}
          </div>
        </div>
        <div className="grid gap-3 sm:grid-cols-2">
          {t.cards.map((c) => {
            const { path, icon: Icon } = cardLinks[c.key];
            return (
              <Link
                key={c.key}
                href={href(path, lang)}
                className="group flex flex-col gap-3 rounded-2xl border border-line bg-vellum p-6 transition hover:border-lapis/40 hover:bg-lapis"
              >
                <Icon size={24} strokeWidth={1.4} className="text-lapis transition group-hover:text-gold-light" />
                <span className="font-display text-2xl font-semibold text-lapis group-hover:text-gold-pale">{c.title}</span>
                <span className="text-sm leading-6 text-ink-muted group-hover:text-gold-pale/75">{c.text}</span>
              </Link>
            );
          })}
        </div>
      </section>

      {/* Msze Święte */}
      <section className="lapis-sky">
        <div className="mx-auto max-w-6xl px-5 py-14 lg:px-8">
          <p className="text-[0.72rem] font-bold uppercase tracking-[0.28em] text-gold-light">{t.massTitle}</p>
          <div className="mt-6 grid gap-6 sm:grid-cols-2">
            {[
              { name: m.sunday, times: massSchedule.sunday },
              { name: `${m.weekdays[0]} – ${m.weekdays[5]}`, times: massSchedule.weekday },
            ].map((g) => (
              <div key={g.name}>
                <p className="font-display text-xl font-semibold text-gold-pale">{g.name}</p>
                <p className="mt-2 font-display text-2xl font-semibold tabular-nums text-gold-light">{g.times.join(" · ")}</p>
              </div>
            ))}
          </div>
          <p className="mt-6 text-sm text-gold-pale/70">{t.massNote}</p>
        </div>
      </section>

      {/* Obraz */}
      <section className="mx-auto grid max-w-6xl items-center gap-14 px-5 py-20 lg:grid-cols-[20rem_1fr] lg:px-8">
        <SacredImage src="/images/obraz-mbbl.jpg" alt={content[lang].sanctuary.imageAlt} className="mx-auto w-full max-w-[20rem]" />
        <div>
          <p className="text-[0.72rem] font-bold uppercase tracking-[0.28em] text-gold">1430 · 2017</p>
          <h2 className="mt-3 font-display text-5xl font-semibold leading-tight text-lapis">{t.imageTitle}</h2>
          <p className="mt-5 max-w-xl text-[1.05rem] leading-8 text-ink-soft">{t.imageText}</p>
          <Link
            href={`${href("/sanktuarium", lang)}#historia`}
            className="mt-8 inline-flex items-center gap-2 rounded-full bg-lapis px-6 py-3 text-sm font-bold text-gold-pale hover:bg-lapis-light"
          >
            {t.imageLink} <ArrowRight size={15} />
          </Link>
        </div>
      </section>
    </div>
  );
}
