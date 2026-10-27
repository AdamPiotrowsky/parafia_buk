import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, ChevronLeft, ChevronRight } from "lucide-react";

import { Divider, Eyebrow } from "@/components/ornament";
import { PageHeader } from "@/components/page-header";
import { SaintOfDayCard } from "@/components/today-bar";
import { SaintPortrait } from "@/components/saint-portrait";
import { legacyUrl } from "@/lib/legacy/assets";
import { relics } from "@/lib/relics";
import { calendarYear, warsawNow } from "@/lib/liturgy";
import { monthNames, patrons, type Rank } from "@/lib/saints";

export const metadata: Metadata = {
  title: "Święci i patroni",
  description: "Patroni parafii w Buku i kalendarz liturgiczny na cały rok — ze świętami ruchomymi.",
};

/* Wyraźne rozróżnienie stopni: kolorowy znaczek + kolor i grubość nazwy */
const ranks: Record<Rank, { badge: string; badgeClass: string; nameClass: string }> = {
  "dzień szczególny": { badge: "✝", badgeClass: "bg-[#5b3a7a] text-white", nameClass: "font-semibold text-[#5b3a7a]" },
  uroczystość: { badge: "U", badgeClass: "bg-wine text-white", nameClass: "font-bold text-wine" },
  święto: { badge: "Ś", badgeClass: "bg-lapis text-gold-pale", nameClass: "font-semibold text-lapis" },
  wspomnienie: { badge: "W", badgeClass: "border border-gold bg-gold-pale text-[#7d5f25]", nameClass: "text-ink" },
  "wspomnienie dowolne": { badge: "wd", badgeClass: "border border-line text-ink-muted", nameClass: "text-ink-muted" },
};

const legend: { rank: Rank; label: string }[] = [
  { rank: "uroczystość", label: "Uroczystość" },
  { rank: "święto", label: "Święto" },
  { rank: "wspomnienie", label: "Wspomnienie obowiązkowe" },
  { rank: "wspomnienie dowolne", label: "Wspomnienie dowolne" },
  { rank: "dzień szczególny", label: "Wielki Post, Triduum, Adwent" },
];

function Badge({ rank }: { rank: Rank }) {
  return (
    <span
      className={`inline-flex h-6 min-w-6 shrink-0 items-center justify-center rounded-md px-1 text-[0.65rem] font-bold ${ranks[rank].badgeClass}`}
      aria-label={rank}
      title={rank}
    >
      {ranks[rank].badge}
    </span>
  );
}

export default async function SwieciPage({ searchParams }: { searchParams: Promise<{ rok?: string }> }) {
  const now = warsawNow();
  const requested = Number((await searchParams).rok);
  const year = requested >= 1900 && requested <= 2200 ? requested : now.year;
  const months = calendarYear(year);
  const isToday = (m: number, d: number) => year === now.year && m + 1 === now.month && d === now.day;

  return (
    <>
      <PageHeader
        eyebrow="Communio sanctorum"
        title="Święci i patroni"
        lead="Ci, którzy od wieków czuwają nad Bukiem — i kalendarz świętych, których wspominamy przez cały rok."
      />

      {/* Nawigacja po stronie */}
      <nav aria-label="Na tej stronie" className="sticky top-[calc(6.75rem+1px)] z-30 border-b border-line bg-parchment/95 backdrop-blur">
        <div className="mx-auto flex max-w-7xl gap-1 overflow-x-auto px-5 py-2.5 [scrollbar-width:none] lg:px-8">
          {[
            { href: "#patroni", label: "Nasi patroni" },
            { href: "#relikwie", label: "Relikwie" },
            { href: "#kalendarz", label: "Kalendarz świętych" },
          ].map((l) => (
            <a key={l.href} href={l.href} className="shrink-0 rounded-full px-4 py-2 text-sm font-semibold text-lapis transition hover:bg-lapis hover:text-gold-pale">
              {l.label}
            </a>
          ))}
        </div>
      </nav>

      {/* PATRONI */}
      <section id="patroni" className="mx-auto max-w-7xl scroll-mt-44 px-5 py-20 lg:px-8">
        <div className="grid gap-10 lg:grid-cols-[20rem_1fr]">
          <div className="rounded-2xl border border-gold/40 bg-vellum p-8 lg:sticky lg:top-48 lg:self-start">
            <SaintOfDayCard />
          </div>

          <div>
            <Eyebrow>Nasi patroni</Eyebrow>
            <h2 className="mt-3 font-display text-5xl font-semibold text-lapis">Opiekunowie parafii</h2>
            <div className="mt-10 grid gap-6 md:grid-cols-2">
              {patrons.map((p) => (
                <article key={p.name} className="flex flex-col rounded-2xl border border-line bg-vellum p-8">
                  <p className="text-[0.7rem] font-bold uppercase tracking-[0.2em] text-gold">{p.role}</p>
                  <h3 className="mt-3 font-display text-3xl font-semibold leading-tight text-lapis">{p.name}</h3>
                  <p className="mt-1 font-display text-lg italic text-wine">{p.feast}</p>
                  <p className="mt-4 flex-1 leading-7 text-ink-soft">{p.text}</p>
                  <p className="mt-5 border-t border-line pt-4 text-sm text-ink-muted">
                    <span className="font-semibold text-ink">Atrybut:</span> {p.attribute}
                  </p>
                  {p.href && (
                    <Link href={p.href} className="mt-4 inline-flex items-center gap-2 text-sm font-bold text-lapis hover:text-gold">
                      Poznaj historię <ArrowRight size={15} />
                    </Link>
                  )}
                </article>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* RELIKWIE */}
      <section id="relikwie" className="scroll-mt-44 border-t border-line">
        <div className="mx-auto max-w-6xl px-5 py-20 lg:px-8">
          <div className="text-center">
            <Eyebrow>W kościele farnym</Eyebrow>
            <h2 className="mt-3 font-display text-5xl font-semibold text-lapis">Relikwie</h2>
            <p className="mx-auto mt-3 max-w-xl text-ink-muted">
              Relikwie świętych i błogosławionych, przed którymi modlimy się w naszym sanktuarium.
            </p>
            <Divider className="mt-6" />
          </div>

          <ul className="mt-12 space-y-4">
            {relics.map((r) => (
              <li
                key={r.slug}
                className="grid items-center gap-5 rounded-2xl border border-line bg-vellum p-5 sm:grid-cols-[6.5rem_1fr] md:grid-cols-[7.5rem_1fr_11rem] md:gap-7 md:p-6"
              >
                <SaintPortrait slug={r.slug} name={r.name} className="mx-auto aspect-[3/4] w-24 sm:w-full" />
                <div className="text-center sm:text-left">
                  <h3 className="font-display text-2xl font-semibold leading-tight text-lapis sm:text-3xl">{r.name}</h3>
                  <p className="mt-1 text-sm text-ink-muted">
                    {[r.life, r.feast && `wspomnienie: ${r.feast}`].filter(Boolean).join(" · ")}
                  </p>
                  <p className="mt-3 leading-7 text-ink-soft">{r.text}</p>
                  {r.href && (
                    <Link href={r.href} className="mt-3 inline-flex items-center gap-2 text-sm font-bold text-lapis hover:text-gold">
                      Więcej o bł. Rafale <ArrowRight size={15} />
                    </Link>
                  )}
                </div>
                <div className="flex justify-center gap-2 sm:col-span-2 md:col-span-1 md:flex-col">
                  {r.photos.map((ph) => (
                    <a key={ph} href={legacyUrl(ph)} target="_blank" rel="noopener noreferrer" className="relative block aspect-square w-36 overflow-hidden rounded-xl border border-gold/40 bg-white md:w-full" title="Zdjęcie relikwiarza — powiększ">
                      <Image src={legacyUrl(ph)} alt={`Relikwie: ${r.name}`} fill sizes="176px" className="object-cover" />
                    </a>
                  ))}
                </div>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* KALENDARZ */}
      <section id="kalendarz" className="scroll-mt-44 border-t border-line bg-vellum">
        <div className="mx-auto max-w-7xl px-5 py-20 lg:px-8">
          <div className="text-center">
            <Eyebrow>Rok liturgiczny</Eyebrow>
            <h2 className="mt-3 font-display text-5xl font-semibold text-lapis">Kalendarz świętych</h2>

            <div className="mt-6 flex items-center justify-center gap-4">
              <Link href={`/swieci?rok=${year - 1}#kalendarz`} aria-label="Poprzedni rok" className="flex h-10 w-10 items-center justify-center rounded-full border border-lapis/20 text-lapis hover:bg-parchment-deep">
                <ChevronLeft size={18} />
              </Link>
              <p className="font-display text-4xl font-semibold tabular-nums text-ink">{year}</p>
              <Link href={`/swieci?rok=${year + 1}#kalendarz`} aria-label="Następny rok" className="flex h-10 w-10 items-center justify-center rounded-full border border-lapis/20 text-lapis hover:bg-parchment-deep">
                <ChevronRight size={18} />
              </Link>
            </div>

            <p className="mx-auto mt-4 max-w-2xl text-ink-muted">
              Wszystkie uroczystości, święta i wspomnienia — także ruchome, liczone od Wielkanocy i Adwentu dla wybranego roku.
              Złotą gwiazdką ✦ wyróżniono dni szczególnie związane z Bukiem.
            </p>
            <Divider className="mt-6" />
            <ul className="mx-auto mt-6 flex max-w-3xl flex-wrap justify-center gap-x-6 gap-y-3 text-sm">
              {legend.map(({ rank, label }) => (
                <li key={rank} className="flex items-center gap-2">
                  <Badge rank={rank} />
                  <span className={ranks[rank].nameClass}>{label}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="mt-14 grid gap-6 md:grid-cols-2 xl:grid-cols-3">
            {months.map((days, m) => (
              <div key={m} className="flex flex-col rounded-2xl border border-line bg-parchment p-6">
                <h3 className="mb-4 flex items-baseline justify-between border-b border-line pb-3 font-display text-2xl font-semibold text-lapis">
                  {monthNames[m]}
                  <span className="text-sm font-normal text-ink-muted">{year}</span>
                </h3>
                <ul className="space-y-1.5">
                  {days.map(({ day, entries }) => (
                    <li
                      key={day}
                      className={`grid grid-cols-[1.75rem_1fr] gap-2 rounded-lg px-1 py-0.5 text-[0.9rem] leading-6 ${
                        isToday(m, day) ? "bg-gold-pale ring-1 ring-gold" : ""
                      }`}
                    >
                      <span className="text-right font-display text-lg font-semibold leading-6 text-gold">{day}</span>
                      <span className="space-y-1">
                        {entries.map((e) => (
                          <span key={e.name} className="flex items-start gap-2">
                            <Badge rank={e.rank} />
                            <span className={ranks[e.rank].nameClass}>
                              {e.name}
                              {e.local && <span className="ml-1 text-gold" title={e.local}>✦</span>}
                            </span>
                          </span>
                        ))}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          <p className="mx-auto mt-10 max-w-3xl text-center text-xs leading-5 text-ink-muted">
            Kalendarz ogólny Kościoła w Polsce. Gdy wspomnienie przypada w niedzielę lub w dzień ważniejszego obchodu, w
            liturgii zwykle się je pomija — aktualne informacje podajemy w ogłoszeniach.
          </p>
        </div>
      </section>
    </>
  );
}
