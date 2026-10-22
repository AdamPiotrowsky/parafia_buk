import type { Metadata } from "next";
import Image from "next/image";

import { Divider, Eyebrow } from "@/components/ornament";
import { PageHeader } from "@/components/page-header";
import { currentClergy, currentPastor, pastors, vocations } from "@/lib/clergy";
import { site } from "@/lib/site";

export const metadata: Metadata = { title: "Duszpasterze" };

export default function DuszpasterzePage() {
  return (
    <>
      <PageHeader
        eyebrow="Parafia"
        title="Duszpasterze"
        lead="Kapłani posługujący w parafii pw. św. Stanisława Biskupa i Męczennika oraz w Sanktuarium Matki Bożej Bukowskiej Literackiej."
      />

      {/* OBECNI */}
      <section className="mx-auto max-w-5xl px-5 py-16 lg:px-8">
        <div className="grid items-center gap-8 rounded-3xl border border-gold/40 bg-vellum p-8 sm:grid-cols-[auto_1fr] sm:p-10">
          <span className="mx-auto flex h-28 w-28 items-center justify-center rounded-full bg-lapis ring-4 ring-gold/30">
            <Image src="/logo/postac-gold.png" alt="" width={80} height={80} className="h-20 w-20" />
          </span>
          <div className="text-center sm:text-left">
            <p className="text-[0.72rem] font-bold uppercase tracking-[0.25em] text-gold">{currentPastor.role}</p>
            <h2 className="mt-2 font-display text-5xl font-semibold text-lapis">{currentPastor.name}</h2>
            <p className="mt-2 text-ink-muted">w parafii od {currentPastor.since} roku</p>
          </div>
        </div>
        <div className="mt-5 grid gap-5 sm:grid-cols-2">
          {currentClergy.map((c) => (
            <div key={c.name} className="rounded-2xl border border-line bg-vellum p-7 text-center sm:text-left">
              <p className="text-[0.72rem] font-bold uppercase tracking-[0.25em] text-gold">{c.role}</p>
              <p className="mt-2 font-display text-3xl font-semibold text-lapis">{c.name}</p>
            </div>
          ))}
        </div>
        <p className="mt-6 text-center text-sm text-ink-muted">
          W sprawach duszpasterskich prosimy o kontakt z biurem parafialnym:{" "}
          <a href={`tel:${site.phone.replace(/\s/g, "")}`} className="font-semibold text-lapis">{site.phone}</a>.
        </p>
      </section>

      {/* PROBOSZCZOWIE */}
      <section className="border-y border-line bg-vellum">
        <div className="mx-auto max-w-5xl px-5 py-16 lg:px-8">
          <div className="text-center">
            <Eyebrow>Od 1779 roku</Eyebrow>
            <h2 className="mt-3 font-display text-5xl font-semibold text-lapis">Proboszczowie bukowscy</h2>
            <Divider className="mt-6" />
          </div>
          <ol className="relative mt-12">
            <span className="absolute bottom-3 left-[8.5rem] top-3 hidden w-px bg-gradient-to-b from-gold/0 via-gold/60 to-gold/0 sm:block" aria-hidden />
            {pastors.map((p, i) => {
              const current = i === pastors.length - 1;
              return (
                <li key={p.name} className="relative grid gap-1 py-3 sm:grid-cols-[8.5rem_1fr]">
                  <p className={`font-display text-lg font-semibold tabular-nums sm:pr-7 sm:text-right ${current ? "text-wine" : "text-gold"}`}>{p.years}</p>
                  <span
                    className={`absolute left-[8.5rem] top-[1.15rem] hidden -translate-x-1/2 rotate-45 sm:block ${current ? "h-3.5 w-3.5 border border-gold bg-wine" : "h-2 w-2 bg-gold"}`}
                    aria-hidden
                  />
                  <div className="sm:pl-8">
                    <p className={`font-display text-2xl leading-tight ${current ? "font-bold text-wine" : "font-semibold text-lapis"}`}>{p.name}</p>
                    {p.note && <p className="text-sm text-ink-muted">{p.note}</p>}
                  </div>
                </li>
              );
            })}
          </ol>
        </div>
      </section>

      {/* POWOŁANIA */}
      <section className="mx-auto max-w-5xl px-5 py-16 lg:px-8">
        <div className="text-center">
          <Eyebrow>Powołania z naszej parafii</Eyebrow>
          <h2 className="mt-3 font-display text-4xl font-semibold text-lapis">Kapłani pochodzący z Buku</h2>
          <p className="mt-2 text-sm text-ink-muted">W nawiasie rok święceń</p>
        </div>
        <ul className="mt-10 grid gap-x-10 gap-y-3 sm:grid-cols-2">
          {vocations.map((v) => (
            <li key={v.name} className="border-b border-line pb-3">
              <p className="font-display text-xl font-semibold text-ink">
                {v.name} {v.ordained && <span className="font-sans text-sm font-normal text-gold">({v.ordained})</span>}
              </p>
              {v.note && <p className="text-sm text-ink-muted">{v.note}</p>}
            </li>
          ))}
        </ul>
      </section>
    </>
  );
}
