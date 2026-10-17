import type { Metadata } from "next";
import { Sun, Droplets } from "lucide-react";

import { Eyebrow } from "@/components/ornament";
import { PageHeader } from "@/components/page-header";
import { massSchedule } from "@/lib/site";

export const metadata: Metadata = { title: "Msze Święte i nabożeństwa" };

const weekdays = ["Poniedziałek", "Wtorek", "Środa", "Czwartek", "Piątek", "Sobota"];

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

export default function MszePage() {
  return (
    <>
      <PageHeader
        eyebrow="Kościół farny · ul. Mury 30"
        title="Msze Święte"
        lead="Porządek Mszy Świętych w Sanktuarium Matki Bożej Bukowskiej Literackiej."
      />

      <section className="mx-auto max-w-5xl px-5 py-16 lg:px-8">
        <div className="overflow-hidden rounded-2xl border border-line bg-vellum">
          <div className="grid gap-4 border-b border-line p-8 sm:grid-cols-[14rem_1fr] sm:items-center">
            <div>
              <p className="font-display text-3xl font-semibold text-lapis">Niedziele i święta</p>
            </div>
            <Times times={massSchedule.sunday} strong />
          </div>

          {weekdays.map((d) => (
            <div key={d} className="grid gap-3 border-b border-line px-8 py-4 sm:grid-cols-[14rem_1fr] sm:items-center">
              <p className="font-display text-xl text-ink">{d}</p>
              <Times times={massSchedule.weekday} />
            </div>
          ))}

          <div className="grid gap-4 p-8 sm:grid-cols-[14rem_1fr] sm:items-center">
            <div>
              <p className="font-display text-2xl font-semibold text-lapis">Święta w dni pracy</p>
              <p className="text-sm text-ink-muted">np. 1 i 6 stycznia, 15 sierpnia, 1 listopada</p>
            </div>
            <Times times={massSchedule.holyDayOnWorkday} strong />
          </div>
        </div>

        <div className="mt-8 grid gap-6 md:grid-cols-2">
          <div className="rounded-2xl border border-gold/40 bg-gold-pale/40 p-8">
            <Sun className="text-gold" size={28} strokeWidth={1.5} />
            <Eyebrow>Lipiec i sierpień</Eyebrow>
            <p className="mt-3 font-display text-2xl font-semibold text-lapis">Porządek wakacyjny</p>
            <ul className="mt-3 space-y-1 leading-7 text-ink-soft">
              <li>w niedziele nie ma Mszy Świętej o 12:00,</li>
              <li>w dni powszednie Msze o 7:00 i 18:30.</li>
            </ul>
          </div>

          <div className="rounded-2xl border border-line bg-vellum p-8">
            <Droplets className="text-lapis-light" size={28} strokeWidth={1.5} />
            <Eyebrow>Sakrament chrztu</Eyebrow>
            <p className="mt-3 font-display text-2xl font-semibold text-lapis">Chrzest w czasie wakacji</p>
            <ul className="mt-3 space-y-1 leading-7 text-ink-soft">
              <li>druga niedziela miesiąca — Msza o 10:30,</li>
              <li>czwarta sobota miesiąca — Msza o 18:30.</li>
            </ul>
            <p className="mt-3 text-sm text-ink-muted">
              Przygotowanie rodziców i chrzestnych w piątek po wieczornej Mszy. Terminy mogą ulec zmianie.
            </p>
          </div>
        </div>
      </section>
    </>
  );
}
