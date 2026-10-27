import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

import { PageHeader } from "@/components/page-header";
import { massSchedule } from "@/lib/site";

export const metadata: Metadata = { title: "Porządek Mszy Świętych" };

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
        title="Porządek Mszy Świętych"
        lead="Msze Święte w kościele farnym — Sanktuarium Matki Bożej Bukowskiej Literackiej."
      />

      {/* MSZE */}
      <section className="mx-auto max-w-5xl px-5 py-16 lg:px-8">
        <div className="overflow-hidden rounded-2xl border border-line bg-vellum">
          <div className="grid gap-4 border-b border-line p-8 sm:grid-cols-[14rem_1fr] sm:items-center">
            <p className="font-display text-3xl font-semibold text-lapis">Niedziele i święta</p>
            <Times times={massSchedule.sunday} strong />
          </div>

          {weekdays.map((d) => (
            <div key={d} className="grid gap-3 border-b border-line px-8 py-4 last:border-b-0 sm:grid-cols-[14rem_1fr] sm:items-center">
              <p className="font-display text-xl text-ink">{d}</p>
              <Times times={massSchedule.weekday} />
            </div>
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-5xl px-5 pb-16 lg:px-8">
        <Link href="/sakramenty" className="group flex items-center justify-between gap-4 rounded-2xl border border-line bg-vellum p-6 transition hover:border-lapis/40">
          <span>
            <span className="block font-display text-2xl font-semibold text-lapis">Sakramenty</span>
            <span className="text-ink-soft">Chrzest, bierzmowanie, spowiedź, namaszczenie chorych, małżeństwo</span>
          </span>
          <ArrowRight size={18} className="shrink-0 text-gold transition group-hover:translate-x-1" />
        </Link>
      </section>
    </>
  );
}
