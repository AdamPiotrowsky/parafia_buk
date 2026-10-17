import type { Metadata } from "next";

import { Divider, Eyebrow } from "@/components/ornament";
import { PageHeader } from "@/components/page-header";
import { SaintOfDayCard } from "@/components/today-bar";
import { monthNames, patrons, saintsCalendar, type Rank } from "@/lib/saints";

export const metadata: Metadata = {
  title: "Święci i patroni",
  description: "Patroni parafii w Buku i kalendarz świętych na cały rok.",
};

const rankStyle: Record<Rank, string> = {
  uroczystość: "text-wine font-semibold",
  święto: "text-lapis font-semibold",
  wspomnienie: "text-ink-soft",
  "wspomnienie dowolne": "text-ink-muted italic",
};

export default function SwieciPage() {
  const byMonth = monthNames.map((_, m) =>
    Object.entries(saintsCalendar)
      .filter(([k]) => Number(k.slice(0, 2)) === m + 1)
      .sort(([a], [b]) => a.localeCompare(b))
      .map(([k, v]) => ({ day: Number(k.slice(3)), ...v }))
  );

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
      <section className="border-t border-line bg-vellum">
        <div className="mx-auto max-w-7xl px-5 py-20 lg:px-8">
          <div className="text-center">
            <Eyebrow>Rok liturgiczny</Eyebrow>
            <h2 className="mt-3 font-display text-5xl font-semibold text-lapis">Kalendarz świętych</h2>
            <p className="mx-auto mt-3 max-w-xl text-ink-muted">
              Uroczystości, święta i wspomnienia o stałych datach. Złotym znakiem wyróżniono dni szczególnie
              związane z Bukiem.
            </p>
            <Divider className="mt-6" />
            <p className="mt-6 flex flex-wrap justify-center gap-x-6 gap-y-1 text-sm">
              {(Object.keys(rankStyle) as Rank[]).map((r) => (
                <span key={r} className={rankStyle[r]}>{r}</span>
              ))}
            </p>
          </div>

          <div className="mt-14 columns-1 gap-8 md:columns-2 xl:columns-3">
            {byMonth.map((entries, m) => (
              <div key={m} className="mb-8 break-inside-avoid rounded-2xl border border-line bg-parchment p-6">
                <h3 className="mb-3 font-display text-2xl font-semibold text-lapis">{monthNames[m]}</h3>
                <ul className="space-y-2">
                  {entries.map((e) => (
                    <li key={e.day} className="grid grid-cols-[2rem_1fr] gap-2 text-[0.93rem] leading-6">
                      <span className="text-right font-display text-lg font-semibold leading-6 text-gold">{e.day}</span>
                      <span className={rankStyle[e.rank]}>
                        {e.name}
                        {e.local && (
                          <span className="mt-0.5 block text-xs not-italic font-normal text-gold" title={e.local}>
                            ✦ {e.local}
                          </span>
                        )}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
