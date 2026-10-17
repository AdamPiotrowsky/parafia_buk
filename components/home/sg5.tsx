import Image from "next/image";
import Link from "next/link";

import { NextMassCard, SaintOfDayCard } from "@/components/today-bar";
import { currentAnnouncements } from "@/lib/bulletins";
import { shortcuts } from "@/lib/home";
import { massSchedule, site } from "@/lib/site";

const strip = (html: string) => html.replace(/<[^>]+>/g, "").trim();
const announcementItems = [...currentAnnouncements.html.matchAll(/<li>([\s\S]*?)<\/li>/g)].map((m) => strip(m[1])).slice(0, 3);

const contents = [
  ...shortcuts.slice(0, 3),
  { title: "Historia obrazu", href: "/sanktuarium/historia-obrazu" },
  { title: "Nasze kościoły", href: "/koscioly" },
  { title: "Święci i patroni", href: "/swieci" },
  ...shortcuts.slice(3),
];

/* Propozycja 5 — „Księga”: strona jak otwarta, iluminowana księga */
export function HomeSg5() {
  return (
    <section className="relative overflow-hidden bg-[#2a2016] px-3 py-10 sm:px-6 lg:py-16">
      {/* Ciepłe, przyciemnione wnętrze w tle — jak stół w zakrystii */}
      <Image src="/images/swiety-krzyz-wnetrze.jpg" alt="" fill sizes="100vw" className="object-cover opacity-25 blur-sm" aria-hidden />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_30%,rgba(20,14,8,0.85)_100%)]" />

      <div className="book relative mx-auto grid max-w-6xl lg:grid-cols-2">
        {/* Strona lewa — o obrazie */}
        <article className="book-page book-left relative bg-vellum px-7 py-10 sm:px-12 lg:rounded-l-md">
          <Folio>
            <p className="text-center text-[0.68rem] font-bold uppercase tracking-[0.32em] text-wine">
              Archidiecezja Poznańska · Sanktuarium w Buku
            </p>
            <h1 className="mt-4 text-center font-display text-[2.6rem] font-semibold leading-[1.05] text-lapis sm:text-5xl">
              Matka Boża Bukowska <span className="italic text-wine">Literacka</span>
            </h1>
            <Ornament />

            <div className="mt-6 grid gap-7 sm:grid-cols-[11rem_1fr]">
              <figure className="mx-auto w-44 sm:w-full">
                <div className="rounded-t-[999px] border-[3px] border-gold p-1">
                  <div className="relative aspect-[3/4] overflow-hidden rounded-t-[999px]">
                    <Image src="/images/obraz-mbbl.jpg" alt="Matka Boża Bukowska Literacka" fill sizes="180px" className="object-cover object-top" priority />
                  </div>
                </div>
                <figcaption className="mt-2 text-center font-display text-sm italic text-ink-muted">Hodegetria</figcaption>
              </figure>
              <div className="illuminated space-y-4 font-display text-[1.2rem] leading-[1.55] text-ink-soft">
                <p>
                  Najstarszy zapis o obrazie słynącym łaskami pochodzi z 1430 roku. Dzieciątko błogosławi, a w drugiej
                  dłoni trzyma grubą księgę — znak literatów, którzy otaczali wizerunek czcią.
                </p>
                <p>
                  Ocalał, gdy w 1806 roku runęła wieża fary; spłonął w styczniu 1945. Odrodzony w obrazie Eugenii
                  Gogolewskiej, został ukoronowany 10 września 2017 roku.
                </p>
              </div>
            </div>

            <p className="mt-8 text-center">
              <Link href="/sanktuarium/historia-obrazu" className="font-display text-xl italic text-wine underline decoration-gold/60 underline-offset-4 hover:text-lapis">
                Czytaj dalej dzieje obrazu ❧
              </Link>
            </p>
          </Folio>
          <p className="absolute bottom-4 left-0 right-0 text-center font-display text-sm italic text-ink-muted">— i —</p>
        </article>

        {/* Strona prawa — dziś i spis treści */}
        <article className="book-page book-right relative bg-vellum px-7 py-10 sm:px-12 lg:rounded-r-md">
          <Folio>
            <p className="text-center text-[0.68rem] font-bold uppercase tracking-[0.32em] text-wine">Kalendarz dnia</p>

            <div className="mt-5 grid gap-6 sm:grid-cols-2">
              <div className="rounded-sm bg-lapis p-5 text-gold-pale">
                <NextMassCard />
              </div>
              <div>
                <SaintOfDayCard />
              </div>
            </div>

            <dl className="mt-6 space-y-1.5 border-y border-gold/40 py-4 font-display text-lg">
              <div className="flex gap-3">
                <dt className="w-40 shrink-0 italic text-wine">Niedziele i święta</dt>
                <dd className="tabular-nums text-ink">{massSchedule.sunday.join(" · ")}</dd>
              </div>
              <div className="flex gap-3">
                <dt className="w-40 shrink-0 italic text-wine">Dni powszednie</dt>
                <dd className="tabular-nums text-ink">{massSchedule.weekday.join(" · ")}</dd>
              </div>
            </dl>

            <p className="mt-6 text-[0.68rem] font-bold uppercase tracking-[0.32em] text-wine">Z ogłoszeń</p>
            <ol className="mt-2 space-y-2 text-[0.95rem] leading-6 text-ink-soft">
              {announcementItems.map((a, i) => (
                <li key={i} className="flex gap-2">
                  <span className="font-display text-lg font-semibold leading-6 text-wine">{["I", "II", "III"][i]}.</span>
                  {a}
                </li>
              ))}
            </ol>

            <p className="mt-7 text-[0.68rem] font-bold uppercase tracking-[0.32em] text-wine">Spis treści</p>
            <ul className="mt-2 font-display text-lg">
              {contents.map((c) => {
                const external = "external" in c && c.external;
                const row = (
                  <>
                    <span className="text-lapis group-hover:text-wine">{c.title}</span>
                    <span className="mx-2 mb-1.5 flex-1 border-b border-dotted border-ink-muted/50" />
                    <span className="text-gold">{external ? "↗" : "→"}</span>
                  </>
                );
                const cls = "group flex items-end py-0.5";
                return (
                  <li key={c.title}>
                    {external ? (
                      <a href={c.href} target="_blank" rel="noopener noreferrer" className={cls}>{row}</a>
                    ) : (
                      <Link href={c.href} className={cls}>{row}</Link>
                    )}
                  </li>
                );
              })}
            </ul>
            <p className="mt-6 text-center text-sm text-ink-muted">
              {site.address.street}, {site.address.city} · tel. {site.phone}
            </p>
          </Folio>
          <p className="absolute bottom-4 left-0 right-0 text-center font-display text-sm italic text-ink-muted">— ii —</p>
        </article>
      </div>
    </section>
  );
}

/* Podwójna ramka strony: złota linia i czerwona rubryka */
function Folio({ children }: { children: React.ReactNode }) {
  return <div className="h-full border border-gold/60 p-1"><div className="h-full border border-wine/25 px-4 py-8 sm:px-7">{children}</div></div>;
}

function Ornament() {
  return (
    <p className="mt-3 text-center text-xl tracking-[0.5em] text-gold" aria-hidden>
      ✦ ❦ ✦
    </p>
  );
}
