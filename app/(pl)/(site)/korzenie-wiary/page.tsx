import type { Metadata } from "next";

import { Divider, Eyebrow } from "@/components/ornament";
import { PageHeader } from "@/components/page-header";

export const metadata: Metadata = {
  title: "Korzenie wiary — spotkania z ks. Maciejem",
  description:
    "Cykl spotkań o żydowskich korzeniach chrześcijaństwa, historii Żydów w Wielkopolsce i dialogu chrześcijańsko-żydowskim.",
};

// PRZYKŁADOWE DANE — terminy, biogram i opisy do uzupełnienia przez parafię.
const meetings = [
  {
    date: "Pt, 6 listopada",
    title: "Szema, Izraelu",
    lead: "Modlitwa Jezusa: psalmy, błogosławieństwa i rytm dnia pobożnego Żyda w I wieku.",
  },
  {
    date: "Pt, 4 grudnia",
    title: "Od synagogi do ambony",
    lead: "Skąd w Mszy świętej czytania, psalm i homilia — liturgia słowa i jej żydowskie źródła.",
  },
  {
    date: "Pt, 15 stycznia",
    title: "Dzień Judaizmu w Kościele",
    lead: "Spotkanie tuż przed 17 stycznia: dlaczego Kościół w Polsce obchodzi ten dzień i jak go przeżyć.",
  },
  {
    date: "Pt, 5 lutego",
    title: "Nostra aetate po sześćdziesięciu latach",
    lead: "Lektura soborowej deklaracji i słów Jana Pawła II o „starszych braciach w wierze”.",
  },
  {
    date: "Pt, 12 marca",
    title: "Pascha i Wieczernik",
    lead: "Przed Wielkanocą: seder paschalny jako klucz do zrozumienia Ostatniej Wieczerzy.",
  },
  {
    date: "Pt, 7 maja",
    title: "Sąsiedzi, których zabrakło",
    lead: "Historia społeczności żydowskiej w Wielkopolsce i pamięć o niej w naszych miasteczkach.",
  },
];

const books = [
  { author: "Sobór Watykański II", title: "Deklaracja Nostra aetate", note: "Krótki tekst, od którego zaczyna się współczesny dialog." },
  { author: "Benedykt XVI", title: "Jezus z Nazaretu", note: "Ewangelia czytana na tle Pisma i tradycji Izraela." },
  { author: "Abraham Joshua Heschel", title: "Szabat", note: "Piękny esej o świętości czasu — także dla chrześcijan." },
  { author: "Brant Pitre", title: "Jezus i żydowskie korzenie Eucharystii", note: "Przystępnie o tym, co działo się w Wieczerniku." },
  { author: "Martin Buber", title: "Opowieści chasydów", note: "Mądrość i humor dawnych mistrzów — na długie wieczory." },
];

export default function KorzenieWiaryPage() {
  return (
    <>
      <PageHeader
        eyebrow="Spotkania w salce parafialnej"
        title="Korzenie wiary"
        lead="Cykl spotkań z ks. Maciejem o żydowskich korzeniach chrześcijaństwa, o historii naszych dawnych sąsiadów i o dialogu, do którego zaprasza Kościół."
      />

      <div className="border-b border-gold/40 bg-gold-pale/50">
        <p className="mx-auto max-w-7xl px-5 py-3 text-center text-sm text-ink-soft lg:px-8">
          Strona przykładowa — terminy, opisy i biogram są do uzupełnienia i zatwierdzenia przez prowadzącego.
        </p>
      </div>

      {/* O CYKLU + PROWADZĄCY */}
      <section className="mx-auto max-w-7xl px-5 py-20 lg:px-8">
        <div className="grid gap-10 lg:grid-cols-[1fr_22rem]">
          <div>
            <Eyebrow>O cyklu</Eyebrow>
            <h2 className="mt-3 font-display text-5xl font-semibold text-lapis">Jezus modlił się psalmami</h2>
            <div className="mt-6 space-y-5 text-lg leading-8 text-ink-soft">
              <p>
                Pan Jezus, Maryja i apostołowie byli Żydami. Chodzili do synagogi, świętowali Paschę i modlili się
                słowami, które dziś śpiewamy w psalmie responsoryjnym. Kto zna te korzenie, lepiej rozumie Ewangelię
                i liturgię, w której co niedzielę uczestniczy.
              </p>
              <p>
                Raz w miesiącu, w piątek po wieczornej Mszy świętej, spotykamy się przy herbacie, żeby razem czytać
                Pismo, poznawać historię i rozmawiać. Nie trzeba się zapisywać ani niczego wcześniej czytać — wystarczy
                przyjść.
              </p>
            </div>
          </div>

          <aside className="rounded-2xl border border-gold/40 bg-vellum p-8 lg:self-start">
            <p className="text-[0.7rem] font-bold uppercase tracking-[0.2em] text-gold">Prowadzi</p>
            <h3 className="mt-3 font-display text-3xl font-semibold leading-tight text-lapis">ks. Maciej</h3>
            <p className="mt-4 leading-7 text-ink-soft">
              [Krótki biogram do uzupełnienia: posługa w parafii, wykształcenie, zainteresowania. Najlepiej napisany
              lub zatwierdzony przez samego księdza.]
            </p>
            <dl className="mt-6 space-y-3 border-t border-line pt-5 text-sm">
              <div>
                <dt className="font-semibold text-ink">Kiedy</dt>
                <dd className="text-ink-muted">Raz w miesiącu w piątek, po Mszy wieczornej</dd>
              </div>
              <div>
                <dt className="font-semibold text-ink">Gdzie</dt>
                <dd className="text-ink-muted">Salka parafialna</dd>
              </div>
              <div>
                <dt className="font-semibold text-ink">Dla kogo</dt>
                <dd className="text-ink-muted">Dla każdego — młodzieży i dorosłych</dd>
              </div>
            </dl>
          </aside>
        </div>
      </section>

      {/* HARMONOGRAM */}
      <section className="border-t border-line bg-vellum">
        <div className="mx-auto max-w-7xl px-5 py-20 lg:px-8">
          <div className="text-center">
            <Eyebrow>Rok duszpasterski</Eyebrow>
            <h2 className="mt-3 font-display text-5xl font-semibold text-lapis">Najbliższe spotkania</h2>
            <Divider className="mt-6" />
          </div>
          <ol className="mt-14 grid gap-6 md:grid-cols-2 xl:grid-cols-3">
            {meetings.map((m, i) => (
              <li key={m.title} className="flex flex-col rounded-2xl border border-line bg-parchment p-8">
                <p className="flex items-baseline justify-between gap-3">
                  <span className="text-[0.7rem] font-bold uppercase tracking-[0.2em] text-gold">{m.date}</span>
                  <span className="font-display text-2xl font-semibold text-gold-light">{String(i + 1).padStart(2, "0")}</span>
                </p>
                <h3 className="mt-3 font-display text-3xl font-semibold leading-tight text-lapis">{m.title}</h3>
                <p className="mt-3 leading-7 text-ink-soft">{m.lead}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* LEKTURY */}
      <section className="mx-auto max-w-4xl px-5 py-20 lg:px-8">
        <div className="text-center">
          <Eyebrow>Półka ks. Macieja</Eyebrow>
          <h2 className="mt-3 font-display text-5xl font-semibold text-lapis">Warto przeczytać</h2>
          <p className="mx-auto mt-3 max-w-xl text-ink-muted">
            Kilka książek na początek. Część z nich można pożyczyć z biblioteczki parafialnej.
          </p>
          <Divider className="mt-6" />
        </div>
        <ul className="mt-12 divide-y divide-line border-y border-line">
          {books.map((b) => (
            <li key={b.title} className="grid gap-1 py-5 sm:grid-cols-[14rem_1fr] sm:gap-6">
              <span className="text-sm font-semibold text-ink-muted">{b.author}</span>
              <span>
                <span className="font-display text-2xl font-semibold text-lapis">{b.title}</span>
                <span className="mt-1 block leading-7 text-ink-soft">{b.note}</span>
              </span>
            </li>
          ))}
        </ul>
      </section>
    </>
  );
}
