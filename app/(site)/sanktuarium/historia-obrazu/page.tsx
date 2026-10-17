import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

import { Divider, Eyebrow } from "@/components/ornament";
import { PageHeader } from "@/components/page-header";
import { SacredImage } from "@/components/sacred-image";
import { Timeline } from "@/components/timeline";
import { imageHistory } from "@/lib/history";

export const metadata: Metadata = {
  title: "Historia obrazu Pani Bukowskiej",
  description: "Dzieje cudownego obrazu Matki Bożej Bukowskiej Literackiej od 1430 roku do koronacji w 2017 roku.",
};

export default function HistoriaObrazuPage() {
  return (
    <>
      <PageHeader
        eyebrow="Historia obrazu"
        title="Pani Bukowska przez sześć wieków"
        lead="Od pierwszej wzmianki w 1430 roku, przez pożar fary, aż po koronację w 2017 roku — dzieje wizerunku, który ocalał, zginął i odrodził się w sercach mieszkańców Buku."
      />

      {/* OPIS WIZERUNKU */}
      <section className="mx-auto grid max-w-7xl gap-16 px-5 py-20 lg:grid-cols-[22rem_1fr] lg:px-8">
        <SacredImage
          src="/images/obraz-mbbl.jpg"
          alt="Matka Boża Bukowska Literacka"
          caption="Hodegetria — „Wskazująca Drogę”"
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

      <section className="mx-auto max-w-7xl px-5 py-20 text-center lg:px-8">
        <p className="font-display text-3xl text-lapis">Obraz ocalał w 1806 roku w drewnianym kościele św. Krzyża.</p>
        <Link
          href="/koscioly#swiety-krzyz"
          className="mt-6 inline-flex items-center gap-2 rounded-full bg-lapis px-7 py-3.5 text-sm font-bold text-gold-pale hover:bg-lapis-light"
        >
          Historia kościołów <ArrowRight size={16} />
        </Link>
      </section>
    </>
  );
}
