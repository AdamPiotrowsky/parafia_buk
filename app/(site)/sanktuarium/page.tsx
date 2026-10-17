import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, ArrowUpRight, BookOpen, Music, Sparkles } from "lucide-react";

import { Eyebrow } from "@/components/ornament";
import { PageHeader } from "@/components/page-header";
import { SacredImage } from "@/components/sacred-image";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "Sanktuarium",
  description: "Diecezjalne Sanktuarium Matki Bożej Bukowskiej Literackiej w Buku — odpusty, hejnał, koronacja.",
};

const pillars = [
  {
    icon: BookOpen,
    title: "Dlaczego „Literacka”?",
    text:
      "Dzieciątko trzyma w dłoni grubą księgę — znak literatów, dawnych bractw kościelnych, które otaczały wizerunek szczególną czcią.",
  },
  {
    icon: Sparkles,
    title: "Odpust zupełny na wieczne czasy",
    text:
      "Papież Pius VI w bulli z 10 marca 1781 roku obdarzył ołtarz Matki Bożej odpustem zupełnym w święta Nawiedzenia (31 V) i Narodzenia NMP (8 IX).",
  },
  {
    icon: Music,
    title: "Hejnał bukowski",
    text:
      "Od 1935 roku wiernych do czci Matki Najświętszej wzywa hejnał skomponowany i ofiarowany farze przez kapelmistrza Czesława Jakubowskiego.",
  },
];

export default function SanktuariumPage() {
  return (
    <>
      <PageHeader
        eyebrow="Diecezjalne Sanktuarium · od 2015 roku"
        title="Sanktuarium Matki Bożej Bukowskiej Literackiej"
        lead="Kościół farny pw. św. Stanisława Biskupa i Męczennika — miejsce, gdzie od XV wieku pielgrzymi powierzają się Pani Bukowskiej."
      />

      <section className="mx-auto grid max-w-7xl gap-16 px-5 py-20 lg:grid-cols-[1fr_22rem] lg:items-center lg:px-8">
        <div className="max-w-2xl">
          <Eyebrow>Koronowana 10 września 2017</Eyebrow>
          <h2 className="mt-4 font-display text-5xl font-semibold leading-tight text-lapis">
            Prawie osiemdziesiąt lat czekania na korony
          </h2>
          <div className="mt-6 space-y-5 text-[1.05rem] leading-8 text-ink-soft">
            <p>
              Już w 1936 roku ks. Stanisław Kuliszak prosił o koronację papieską cudownego wizerunku. Uroczystość
              planowano na wrzesień 1939 roku — 650-lecie lokacji Buku. Wojna przekreśliła te plany, a w styczniu 1945
              roku średniowieczny obraz spłonął razem z farą.
            </p>
            <p>
              Cześć Matki Bożej przetrwała. Nowy wizerunek namalowała Eugenia Gogolewska, 23 grudnia 2015 roku
              arcybiskup Stanisław Gądecki ustanowił w farze diecezjalne sanktuarium, a 10 września 2017 roku obraz
              Pani Bukowskiej został ukoronowany.
            </p>
          </div>
          <Link
            href="/sanktuarium/historia-obrazu"
            className="mt-8 inline-flex items-center gap-2 rounded-full bg-lapis px-7 py-3.5 text-sm font-bold text-gold-pale hover:bg-lapis-light"
          >
            Pełna historia obrazu <ArrowRight size={16} />
          </Link>
        </div>
        <SacredImage
          src="/images/obraz-mbbl.jpg"
          alt="Ukoronowany wizerunek Matki Bożej Bukowskiej Literackiej"
          caption="Ukoronowana 10 września 2017"
          className="mx-auto w-full max-w-[22rem]"
        />
      </section>

      <section className="border-y border-line bg-vellum">
        <div className="mx-auto grid max-w-7xl gap-px px-5 py-20 md:grid-cols-3 lg:px-8">
          {pillars.map(({ icon: Icon, title, text }) => (
            <div key={title} className="p-6">
              <Icon className="text-gold" size={30} strokeWidth={1.4} />
              <h3 className="mt-5 font-display text-2xl font-semibold text-lapis">{title}</h3>
              <p className="mt-3 leading-7 text-ink-soft">{text}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-5 py-20 lg:px-8">
        <div className="grid gap-6 md:grid-cols-2">
          {[
            { date: "31 maja", name: "Nawiedzenie NMP", note: "Odpust zupełny przy ołtarzu Matki Bożej" },
            { date: "8 września", name: "Narodzenie NMP", note: "Główny odpust sanktuaryjny" },
          ].map((o) => (
            <div key={o.date} className="rounded-2xl border border-gold/40 bg-vellum p-8">
              <p className="font-display text-5xl font-semibold text-gold">{o.date}</p>
              <p className="mt-3 font-display text-2xl font-semibold text-lapis">{o.name}</p>
              <p className="mt-1 text-ink-muted">{o.note}</p>
            </div>
          ))}
        </div>

        <div className="mt-6 flex flex-col items-start justify-between gap-6 rounded-2xl bg-lapis p-8 text-gold-pale sm:flex-row sm:items-center">
          <div>
            <p className="font-display text-2xl font-semibold">Prośby i podziękowania</p>
            <p className="mt-1 text-gold-pale/70">Odczytywane w każdy czwartek przed wieczorną Mszą Świętą.</p>
          </div>
          <a
            href={site.links.petitions}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex shrink-0 items-center gap-2 rounded-full bg-gold-light px-6 py-3 text-sm font-bold text-lapis-deep hover:bg-gold-pale"
          >
            Napisz intencję <ArrowUpRight size={16} />
          </a>
        </div>
      </section>
    </>
  );
}
