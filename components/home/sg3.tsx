import Image from "next/image";
import Link from "next/link";
import { ArrowRight, ArrowUpRight, Phone } from "lucide-react";

import { NextMassCard, SaintOfDayCard } from "@/components/today-bar";
import { OfficeStatus, TodayMasses } from "@/components/home/today-panels";
import { currentAnnouncements, currentIntentions } from "@/lib/bulletins";
import { churches } from "@/lib/history";
import { shortcuts } from "@/lib/home";
import { site } from "@/lib/site";

const strip = (html: string) => html.replace(/<[^>]+>/g, "").trim();

/* Pierwsze punkty ogłoszeń i intencje pierwszego dnia — skrót na stronę główną */
const announcementItems = [...currentAnnouncements.html.matchAll(/<li>([\s\S]*?)<\/li>/g)].map((m) => strip(m[1])).slice(0, 4);

const firstDay = currentIntentions.html.split("<h3>")[1] ?? "";
const intentionDay = strip(firstDay.split("</h3>")[0] ?? "");
const intentionRows = [...firstDay.matchAll(/<tr><td>([\s\S]*?)<\/td><td>([\s\S]*?)<\/td><\/tr>/g)].map((m) => ({
  time: strip(m[1]),
  text: strip(m[2]),
}));

/* Propozycja 3 — „Dziś w parafii”: praktyczny pulpit, duże i czytelne */
export function HomeSg3() {
  return (
    <>
      {/* Nagłówek — jasny, spokojny */}
      <section className="border-b border-line bg-vellum">
        <div className="mx-auto flex max-w-7xl flex-col items-start gap-6 px-5 py-10 sm:flex-row sm:items-center lg:px-8">
          <Image src="/logo/logo-lapis.png" alt="Logo Sanktuarium" width={112} height={112} className="h-24 w-24 shrink-0 sm:h-28 sm:w-28" priority />
          <div className="flex-1">
            <p className="text-[0.75rem] font-bold uppercase tracking-[0.28em] text-gold">Archidiecezja Poznańska</p>
            <h1 className="mt-1 font-display text-4xl font-semibold leading-tight text-lapis sm:text-5xl">
              Sanktuarium Matki Bożej Bukowskiej Literackiej
            </h1>
            <p className="mt-1 text-lg text-ink-soft">{site.parish}</p>
          </div>
          <a
            href={`tel:${site.phone.replace(/\s/g, "")}`}
            className="flex items-center gap-3 rounded-full border border-lapis/20 px-5 py-3 text-lapis hover:bg-parchment-deep"
          >
            <Phone size={20} />
            <span className="font-display text-2xl font-semibold">{site.phone}</span>
          </a>
        </div>
      </section>

      {/* Pulpit */}
      <section className="mx-auto max-w-7xl px-5 py-10 lg:px-8">
        <div className="grid gap-5 lg:grid-cols-12">
          <div className="rounded-3xl bg-lapis p-8 text-gold-pale lg:col-span-5">
            <NextMassCard />
            <div className="mt-6 border-t border-gold/25 pt-5">
              <TodayMasses />
            </div>
            <Link href="/msze" className="mt-6 inline-flex items-center gap-1 text-sm font-semibold text-gold-light hover:text-gold-pale">
              Porządek na cały tydzień <ArrowRight size={15} />
            </Link>
          </div>

          <div className="rounded-3xl border border-gold/40 bg-vellum p-8 lg:col-span-4">
            <SaintOfDayCard />
          </div>

          <div className="rounded-3xl border border-line bg-vellum p-8 lg:col-span-3">
            <p className="text-[0.7rem] font-bold uppercase tracking-[0.25em] text-gold">Kancelaria</p>
            <div className="mt-4">
              <OfficeStatus />
            </div>
            <ul className="mt-5 space-y-1 border-t border-line pt-4 text-sm text-ink-muted">
              {site.officeHours.map((o) => (
                <li key={o.days} className="first-letter:uppercase">{o.days}: {o.hours}</li>
              ))}
            </ul>
          </div>

          <article className="rounded-3xl border border-line bg-vellum p-8 lg:col-span-7">
            <div className="flex items-baseline justify-between gap-4">
              <p className="text-[0.7rem] font-bold uppercase tracking-[0.25em] text-gold">Ogłoszenia · {currentAnnouncements.dateLabel}</p>
              {currentAnnouncements.sample && <span className="text-[0.7rem] font-semibold text-wine">przykład</span>}
            </div>
            <h2 className="mt-2 font-display text-3xl font-semibold text-lapis">{currentAnnouncements.title}</h2>
            <ol className="mt-5 space-y-4">
              {announcementItems.map((item, i) => (
                <li key={i} className="grid grid-cols-[2rem_1fr] gap-3 text-[1.05rem] leading-7 text-ink-soft">
                  <span className="font-display text-2xl font-semibold leading-7 text-gold">{i + 1}</span>
                  {item}
                </li>
              ))}
            </ol>
            <Link href="/ogloszenia" className="mt-6 inline-flex items-center gap-2 rounded-full bg-lapis px-6 py-3 text-sm font-bold text-gold-pale hover:bg-lapis-light">
              Wszystkie ogłoszenia <ArrowRight size={16} />
            </Link>
          </article>

          <article className="rounded-3xl border border-line bg-vellum p-8 lg:col-span-5">
            <div className="flex items-baseline justify-between gap-4">
              <p className="text-[0.7rem] font-bold uppercase tracking-[0.25em] text-gold">Intencje mszalne</p>
              {currentIntentions.sample && <span className="text-[0.7rem] font-semibold text-wine">przykład</span>}
            </div>
            <h2 className="mt-2 font-display text-3xl font-semibold text-lapis">{intentionDay}</h2>
            <dl className="mt-5 divide-y divide-line">
              {intentionRows.map((r) => (
                <div key={r.time} className="grid grid-cols-[4rem_1fr] gap-3 py-3">
                  <dt className="font-display text-2xl font-semibold tabular-nums text-lapis">{r.time}</dt>
                  <dd className="leading-7 text-ink-soft">{r.text}</dd>
                </div>
              ))}
            </dl>
            <Link href="/intencje" className="mt-6 inline-flex items-center gap-1 text-sm font-semibold text-lapis hover:text-gold">
              Intencje na cały tydzień <ArrowRight size={15} />
            </Link>
          </article>
        </div>

        {/* Duże przyciski */}
        <div className="mt-5 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
          {shortcuts.slice(3).map(({ title, hint, href, icon: Icon, external }) => {
            const cls = "group flex items-center gap-4 rounded-2xl border border-line bg-vellum p-5 transition hover:border-gold/60 hover:bg-white";
            const body = (
              <>
                <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-parchment-deep text-lapis group-hover:bg-lapis group-hover:text-gold-light">
                  <Icon size={22} strokeWidth={1.6} />
                </span>
                <span className="flex-1">
                  <span className="block font-display text-xl font-semibold leading-tight text-lapis">{title}</span>
                  <span className="block text-sm text-ink-muted">{hint}</span>
                </span>
                {external ? <ArrowUpRight size={18} className="text-gold" /> : <ArrowRight size={18} className="text-gold" />}
              </>
            );
            return external ? (
              <a key={title} href={href} target="_blank" rel="noopener noreferrer" className={cls}>{body}</a>
            ) : (
              <Link key={title} href={href} className={cls}>{body}</Link>
            );
          })}
        </div>
      </section>

      {/* Dziedzictwo — skromnie, na dole */}
      <section className="mx-auto max-w-7xl px-5 pb-20 lg:px-8">
        <div className="grid gap-5 md:grid-cols-3">
          {[
            { href: "/sanktuarium/historia-obrazu", image: "/images/obraz-mbbl.jpg", title: "Historia obrazu", text: "Od 1430 roku do koronacji w 2017", pos: "object-top" },
            ...churches.map((c) => ({ href: `/koscioly#${c.slug}`, image: c.cover, title: c.name, text: `${c.style} · ${c.built}`, pos: "object-center" })),
          ].map((c) => (
            <Link key={c.href} href={c.href} className="group overflow-hidden rounded-3xl border border-line bg-vellum">
              <div className="relative aspect-[16/10] overflow-hidden">
                <Image src={c.image} alt={c.title} fill sizes="(min-width: 768px) 400px, 100vw" className={`object-cover ${c.pos} transition duration-700 group-hover:scale-105`} />
              </div>
              <div className="p-6">
                <p className="font-display text-2xl font-semibold text-lapis">{c.title}</p>
                <p className="text-sm text-ink-muted">{c.text}</p>
              </div>
            </Link>
          ))}
        </div>
      </section>
    </>
  );
}
