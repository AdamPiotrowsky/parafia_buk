import type { Metadata } from "next";
import { Download, FileText, Music, Phone, Users } from "lucide-react";

import { Eyebrow } from "@/components/ornament";
import { PageHeader } from "@/components/page-header";
import { legacyUrl } from "@/lib/legacy/assets";
import { site } from "@/lib/site";

export const metadata: Metadata = { title: "Bierzmowanie" };

/* Informacje i dokumenty z dotychczasowej strony bierzmowania (październik 2026) */
const documents = [
  {
    title: "Deklaracja kandydata do Sakramentu Bierzmowania",
    note: "Dla klas 7 — wydrukuj, wypełnij i podpisz",
    file: "/uploads/deklaracja_e8a7043886e06a49ba1562ea929c2cc8.pdf",
    primary: true,
  },
  {
    title: "Tabela uczestnictwa w spotkaniach i nabożeństwach",
    note: "Dla kandydatów w trakcie przygotowania",
    file: "/uploads/tabelauczestnictwawspotkaniachinaboestwach4_b66f89d5c7c2b3e305f39b7a9502bd01.pdf",
  },
  {
    title: "Moje życie sakramentalne",
    note: "Karta kandydata",
    file: "/uploads/mojeyciesakramentalne_4cf14644d544152cab2a107388985d32.pdf",
  },
];

const grade7Steps = [
  { when: "teraz", text: "Pobierz i wydrukuj deklarację kandydata (poniżej)." },
  { when: "do 4 października 2026", text: "Wypełnioną i podpisaną deklarację dostarcz do zakrystii, biura parafialnego lub swojego katechety." },
  { when: "do 6 listopada 2026", text: "Na tej stronie opublikujemy podział na małe grupy." },
  { when: "3. tydzień listopada", text: "Pierwsze spotkania w grupach." },
];

const songs = [
  "Duchu Święty, przyjdź",
  "Duchu Święty, przyjdź — Niech wiara zagości",
  "Duchu Święty, Stworzycielu",
  "Dotknij, Panie, moich oczu",
  "Duchu miłości, wylewaj się na nas",
  "Nie bój się",
  "Ofiaruję Tobie",
];

export default function BierzmowaniePage() {
  return (
    <>
      <PageHeader
        eyebrow="Msze i sakramenty"
        title="Bierzmowanie"
        lead="Informacje dla młodzieży przygotowującej się do Sakramentu Bierzmowania i dla ich rodziców."
      />

      <section className="mx-auto max-w-5xl px-5 py-16 lg:px-8">
        <p className="text-center font-display text-3xl italic leading-snug text-lapis sm:text-4xl">
          „Przyjdź i spróbujmy razem zaprzyjaźnić się z Jezusem!”
        </p>

        <div className="mt-12 grid gap-6 lg:grid-cols-[1.3fr_1fr]">
          {/* Klasy 7 */}
          <article className="rounded-2xl border border-gold/40 bg-vellum p-8">
            <Eyebrow>Klasy 7 · rozpoczęcie przygotowania</Eyebrow>
            <h2 className="mt-2 font-display text-3xl font-semibold text-lapis">Jak się zgłosić?</h2>
            <ol className="mt-6 space-y-5">
              {grade7Steps.map((s, i) => (
                <li key={s.when} className="grid grid-cols-[2.5rem_1fr] gap-4">
                  <span className="flex h-10 w-10 items-center justify-center rounded-full bg-lapis font-display text-lg font-semibold text-gold-light">{i + 1}</span>
                  <div>
                    <p className="text-[0.72rem] font-bold uppercase tracking-[0.2em] text-wine">{s.when}</p>
                    <p className="mt-0.5 leading-7 text-ink-soft">{s.text}</p>
                  </div>
                </li>
              ))}
            </ol>
          </article>

          {/* Klasy 8 */}
          <article className="flex flex-col rounded-2xl border border-line bg-vellum p-8">
            <Eyebrow>Klasy 8</Eyebrow>
            <h2 className="mt-2 font-display text-3xl font-semibold text-lapis">Spotkania w małych grupach</h2>
            <p className="mt-4 leading-7 text-ink-soft">Zapraszamy klasy 8 na spotkania w małych grupach w dniach:</p>
            <p className="mt-2 font-display text-4xl font-semibold text-wine">12 – 16 października</p>
            <p className="mt-4 leading-7 text-ink-soft">Pamiętaj o tabeli uczestnictwa i karcie „Moje życie sakramentalne” — znajdziesz je w dokumentach poniżej.</p>
            <div className="mt-6 flex items-center gap-3 rounded-xl border border-dashed border-gold/50 p-4 text-sm text-ink-muted">
              <Users size={20} className="shrink-0 text-gold" />
              Podział na grupy opublikujemy tutaj najpóźniej do 6 listopada 2026.
            </div>
          </article>
        </div>

        {/* DOKUMENTY */}
        <div className="mt-14">
          <Eyebrow>Do pobrania</Eyebrow>
          <h2 className="mt-2 font-display text-4xl font-semibold text-lapis">Dokumenty i zgody</h2>
          <ul className="mt-6 space-y-3">
            {documents.map((d) => (
              <li key={d.file}>
                <a
                  href={legacyUrl(d.file)}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group flex items-center gap-5 rounded-2xl border border-line bg-vellum p-5 transition hover:border-gold/60"
                >
                  <span className={`flex h-12 w-12 shrink-0 items-center justify-center rounded-xl ${d.primary ? "bg-lapis text-gold-light" : "bg-parchment-deep text-lapis"}`}>
                    <FileText size={22} strokeWidth={1.5} />
                  </span>
                  <span className="flex-1">
                    <span className="block font-display text-xl font-semibold text-lapis sm:text-2xl">{d.title}</span>
                    <span className="text-sm text-ink-muted">{d.note} · PDF</span>
                  </span>
                  <span className="hidden items-center gap-2 rounded-full border border-lapis/20 px-4 py-2 text-sm font-semibold text-lapis group-hover:bg-parchment-deep sm:flex">
                    <Download size={16} /> Pobierz
                  </span>
                </a>
              </li>
            ))}
          </ul>
        </div>

        {/* PIEŚNI */}
        <div className="mt-14 rounded-2xl border border-line bg-vellum p-8">
          <div className="flex items-center gap-3">
            <Music size={22} className="text-gold" />
            <h2 className="font-display text-3xl font-semibold text-lapis">Pieśni do nauczenia</h2>
          </div>
          <ol className="mt-5 grid gap-x-10 gap-y-2 sm:grid-cols-2">
            {songs.map((s, i) => (
              <li key={s} className="flex gap-3 font-display text-xl text-ink">
                <span className="w-6 text-right text-gold">{i + 1}.</span> {s}
              </li>
            ))}
          </ol>
        </div>

        <a href={`tel:${site.phone.replace(/\s/g, "")}`} className="mt-10 flex items-center justify-center gap-3 rounded-2xl bg-lapis p-6 text-gold-pale hover:bg-lapis-light">
          <Phone size={20} />
          <span>
            Pytania? Biuro parafialne: <strong className="font-display text-2xl">{site.phone}</strong>
          </span>
        </a>
      </section>
    </>
  );
}
