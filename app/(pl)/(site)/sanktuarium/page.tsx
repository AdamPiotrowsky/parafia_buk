import type { Metadata } from "next";
import { BookOpen, Music, Sparkles } from "lucide-react";

import { Divider, Eyebrow } from "@/components/ornament";
import { PageHeader } from "@/components/page-header";
import { SacredImage } from "@/components/sacred-image";
import { Timeline } from "@/components/timeline";
import { imageHistory } from "@/lib/history";

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

      </section>
      {/* HISTORIA OBRAZU */}
      <section id="historia" className="scroll-mt-32 border-t border-line">
        <div className="mx-auto max-w-7xl px-5 pt-20 text-center lg:px-8">
          <Eyebrow>Historia obrazu</Eyebrow>
          <h2 className="mt-4 font-display text-5xl font-semibold text-lapis">Pani Bukowska przez sześć wieków</h2>
          <Divider className="mt-6" />
        </div>
      </section>
      <section className="mx-auto grid max-w-7xl gap-16 px-5 py-16 lg:grid-cols-[22rem_1fr] lg:px-8">
        <SacredImage
          src="/images/fara-oltarz.jpg"
          alt="Ołtarz główny fary z obrazem Matki Bożej"
          caption="Obraz w ołtarzu głównym fary"
          className="mx-auto w-full max-w-[22rem] lg:sticky lg:top-40 lg:self-start"
        />

        <div className="illuminated max-w-2xl space-y-6 text-[1.08rem] leading-8 text-ink-soft">
          <p>
            Nie znamy daty sprowadzenia obrazu do Buku. Pierwsza wzmianka o wizerunku słynącym łaskami pochodzi z
            1430 roku. Obraz przedstawia Najświętszą Maryję Pannę z Dzieciątkiem Jezus na lewym ramieniu. Jezus
            trzyma w ręce grubą księgę — symbol literatów — a drugą rękę wznosi do błogosławieństwa.
          </p>
          <p>
            Ks. prof. Szczęsny Dettloff, który w latach 1933–1934 przeprowadził renowację obrazu, zaliczył Madonnę
            bukowską do typu <em>Hodegetrii</em> — przewodniczki wskazującej drogę — rozpowszechnionego w Polsce w
            wielu odmianach, a wywodzącego się ze sztuki bizantyjskiej. Nie wiadomo, czy wzór dotarł do nas
            bezpośrednio z Bizancjum, czy przez Italię.
          </p>
          <p>
            Rodzimy rys wizerunku zdradzają aniołowie: zamiast kadzielnic trzymają szarfy z napisami — początkiem
            wielkanocnego hymnu „Wesel się, Królowo miła, Alleluja” i słowami „Zdrowaś Maryjo, łaski pełna”.
            Według Dettloffa takiej Hodegetrii poza Polską nie znajdziemy nigdzie.
          </p>

          <blockquote className="my-10 border-y border-gold/40 py-8 text-center font-display text-2xl italic leading-snug text-lapis sm:text-[1.7rem]">
            Matka Boża, spoglądając spod maforium wzrokiem fascynującym ku widzowi, przenosi kontakt duchowy na
            Syna Bożego, który błogosławi Ją wzrokiem i gestem rączki.
            <footer className="mt-4 font-sans text-xs not-italic uppercase tracking-[0.2em] text-ink-muted">
              za ks. prof. Szczęsnym Dettloffem
            </footer>
          </blockquote>
        </div>
      </section>

      {/* OŚ CZASU */}
      <section className="border-t border-line bg-vellum">
        <div className="mx-auto max-w-5xl px-5 py-20 lg:px-8">
          <div className="text-center">
            <Eyebrow>Kalendarium</Eyebrow>
            <h2 className="mt-4 font-display text-5xl font-semibold text-lapis">Dzieje wizerunku</h2>
            <Divider className="mt-6" />
          </div>

          {imageHistory.map((era, i) => (
            <div key={era.name} className="mt-16">
              <div className="mb-4 flex items-baseline gap-4 border-b border-line pb-3">
                <span className="font-display text-5xl font-semibold text-gold/40">{["I", "II", "III", "IV"][i]}</span>
                <div>
                  <h3 className="font-display text-3xl font-semibold text-lapis">{era.name}</h3>
                  <p className="text-sm uppercase tracking-[0.2em] text-ink-muted">{era.span}</p>
                </div>
              </div>
              <Timeline events={era.events} />
            </div>
          ))}
        </div>
      </section>

    </>
  );
}
