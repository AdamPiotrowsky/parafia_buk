import type { Metadata } from "next";
import Link from "next/link";
import { ChevronLeft, ChevronRight } from "lucide-react";

import { Divider, Eyebrow } from "@/components/ornament";
import { PageHeader } from "@/components/page-header";
import { SaintOfDayCard } from "@/components/today-bar";
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

      {/* PATRONI */}
      <section className="mx-auto max-w-7xl px-5 py-20 lg:px-8">
        <div className="grid gap-10 lg:grid-cols-[20rem_1fr]">
          <div className="rounded-2xl border border-gold/40 bg-vellum p-8 lg:sticky lg:top-40 lg:self-start">
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
                </article>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* KALENDARZ */}
      <section id="kalendarz" className="scroll-mt-28 border-t border-line bg-vellum">
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

          <div className="mt-14 grid auto-rows-fr gap-6 md:grid-cols-2 xl:grid-cols-3">
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
