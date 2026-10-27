import Image from "next/image";
import Link from "next/link";
import { ArrowRight, ArrowUpRight } from "lucide-react";

import { AmbientVideo } from "@/components/ambient-video";
import { Divider, Eyebrow } from "@/components/ornament";
import { SacredImage } from "@/components/sacred-image";
import { SaintOfDayCard } from "@/components/today-bar";
import { churches } from "@/lib/history";
import { keyYears, shortcuts } from "@/lib/home";
import { massSchedule, site } from "@/lib/site";

/* Propozycja 1 — „Iluminacja”: ołtarz w tle, panel na skróty, historia obrazu, fara z lotu ptaka */
export function HomeSg1() {
  return (
    <>
      {/* HERO — ołtarz główny fary, powolne przybliżanie w stronę obrazu */}
      <section className="relative overflow-hidden bg-lapis-deep">
        <div className="absolute inset-0" aria-hidden>
          <Image
            src="/images/fara-oltarz.jpg"
            alt=""
            fill
            priority
            sizes="100vw"
            className="hero-zoom object-cover object-[51%_45%]"
          />
        </div>
        <div className="absolute inset-0 bg-lapis-deep/60 lg:bg-transparent lg:bg-gradient-to-r lg:from-lapis-deep/95 lg:via-lapis-deep/65 lg:to-lapis-deep/20" />
        <div className="absolute inset-0 bg-gradient-to-t from-lapis-deep via-lapis-deep/20 via-30% to-lapis-deep/40" />

        <div className="relative mx-auto flex max-w-7xl items-center px-5 pb-40 pt-20 lg:min-h-[46rem] lg:px-8 lg:pb-48 lg:pt-24">
          <div className="max-w-2xl [text-shadow:0_2px_30px_rgba(16,29,59,0.7)]">
            <Eyebrow light>Archidiecezja Poznańska · Buk · od 1430 roku</Eyebrow>
            <h1 className="mt-6 font-display text-[3.2rem] font-semibold leading-[0.98] text-gold-pale sm:text-7xl lg:text-[5.4rem]">
              Matka Boża
              <br />
              <span className="gold-text italic [text-shadow:none]">Bukowska Literacka</span>
            </h1>
            <p className="mt-7 max-w-xl text-lg leading-8 text-gold-pale/85">
              Sanktuarium i Parafia pw. św. Stanisława Biskupa i Męczennika w Buku. Od blisko sześciu wieków
              przychodzimy tu do Tej, która wskazuje drogę do Syna.
            </p>

            <div className="mt-10 flex flex-wrap items-end gap-x-12 gap-y-8">
              <div className="flex flex-wrap gap-3">
                <Link
                  href="/ogloszenia"
                  className="group inline-flex items-center gap-2 rounded-full bg-gold-light px-6 py-3 text-sm font-bold text-lapis-deep transition hover:bg-gold-pale"
                >
                  Ogłoszenia
                  <ArrowRight size={16} className="transition group-hover:translate-x-1" />
                </Link>
                <Link
                  href="/msze"
                  className="inline-flex items-center gap-2 rounded-full border border-gold-light/40 px-6 py-3 text-sm font-semibold text-gold-pale transition hover:border-gold-light hover:bg-gold-light/10"
                >
                  Porządek Mszy
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* NA SKRÓTY */}
      <section className="relative z-10 mx-auto -mt-28 max-w-7xl px-5 lg:px-8">
        <div className="rounded-2xl border border-gold/30 bg-vellum p-3 shadow-[0_40px_80px_-40px_rgba(16,29,59,0.45)] sm:p-4">
          <div className="grid grid-cols-2 gap-2 md:grid-cols-4">
            {shortcuts.map(({ title, hint, href, icon: Icon, external }) => {
              const content = (
                <>
                  <span className="flex h-11 w-11 items-center justify-center rounded-full bg-parchment-deep text-lapis transition group-hover:bg-lapis group-hover:text-gold-light">
                    <Icon size={20} strokeWidth={1.6} />
                  </span>
                  <span className="mt-4 flex items-center gap-1 font-display text-[1.35rem] font-semibold leading-tight text-lapis">
                    {title}
                    {external && <ArrowUpRight size={15} className="text-gold" />}
                  </span>
                  <span className="mt-0.5 text-[0.8rem] text-ink-muted">{hint}</span>
                </>
              );
              const cls = "group flex flex-col rounded-xl p-4 transition hover:bg-parchment sm:p-5";
              return external ? (
                <a key={title} href={href} target="_blank" rel="noopener noreferrer" className={cls}>{content}</a>
              ) : (
                <Link key={title} href={href} className={cls}>{content}</Link>
              );
            })}
          </div>
        </div>
      </section>

      {/* DZIŚ */}
      <section className="mx-auto grid max-w-7xl gap-6 px-5 py-20 lg:grid-cols-3 lg:px-8">
        <div className="rounded-2xl border border-line bg-vellum p-8">
          <SaintOfDayCard />
          <Link href="/swieci" className="mt-6 inline-flex items-center gap-1 text-sm font-semibold text-lapis hover:text-gold">
            Kalendarz świętych <ArrowRight size={15} />
          </Link>
        </div>

        <div className="rounded-2xl border border-line bg-vellum p-8 lg:col-span-2">
          <p className="text-[0.7rem] font-bold uppercase tracking-[0.25em] text-gold">Msze Święte</p>
          <div className="mt-5 grid gap-8 sm:grid-cols-2">
            <div>
              <p className="font-display text-2xl font-semibold text-lapis">Niedziele i święta</p>
              <p className="mt-3 flex flex-wrap gap-2">
                {massSchedule.sunday.map((t) => (
                  <span key={t} className="rounded-full bg-lapis px-3.5 py-1.5 font-semibold tabular-nums text-gold-pale">{t}</span>
                ))}
              </p>
            </div>
            <div>
              <p className="font-display text-2xl font-semibold text-lapis">Dni powszednie</p>
              <p className="mt-3 flex flex-wrap gap-2">
                {massSchedule.weekday.map((t) => (
                  <span key={t} className="rounded-full border border-lapis/30 px-3.5 py-1.5 font-semibold tabular-nums text-lapis">{t}</span>
                ))}
              </p>
            </div>
          </div>
          <div className="mt-8 flex flex-wrap items-center justify-between gap-4 border-t border-line pt-6">
            <p className="text-sm text-ink-soft">
              <strong className="text-ink">Biuro parafialne:</strong>{" "}
              {site.officeHours.map((o) => `${o.days} ${o.hours}`).join(" · ")}
            </p>
            <Link href="/msze" className="inline-flex items-center gap-1 text-sm font-semibold text-lapis hover:text-gold">
              Pełny porządek <ArrowRight size={15} />
            </Link>
          </div>
        </div>
      </section>

      {/* HISTORIA OBRAZU */}
      <section className="border-y border-line bg-vellum">
        <div className="mx-auto max-w-7xl px-5 py-24 lg:px-8">
          <div className="grid gap-14 lg:grid-cols-[21rem_1fr] lg:items-center lg:gap-20">
            <SacredImage
              src="/images/obraz-mbbl.jpg"
              alt="Matka Boża Bukowska Literacka"
              caption="Wizerunek w ołtarzu głównym fary"
              className="mx-auto w-full max-w-[21rem]"
            />
            <div>
              <Eyebrow>Historia obrazu</Eyebrow>
              <h2 className="mt-4 font-display text-5xl font-semibold leading-[1.05] text-lapis sm:text-6xl">
                Hodegetria z&nbsp;księgą w&nbsp;dłoni Dzieciątka
              </h2>
              <div className="mt-8 max-w-2xl space-y-5 text-[1.05rem] leading-8 text-ink-soft">
                <p>
                  Maryja trzyma Jezusa na lewym ramieniu. Dzieciątko jedną ręką błogosławi, w drugiej trzyma grubą
                  księgę — znak <em>literatów</em>, dawnych bractw, które śpiewały w kościele godzinki. Aniołowie zamiast
                  kadzielnic niosą wstęgi z&nbsp;napisami „Wesel się, Królowo miła” i&nbsp;„Zdrowaś Maryjo”.
                </p>
                <p>
                  Ks. prof. Szczęsny Dettloff, który odnawiał obraz w&nbsp;1933 roku, pisał, że takiej Hodegetrii poza
                  Polską nie znajdziemy nigdzie.
                </p>
              </div>
            </div>
          </div>

          <ol className="mt-16 grid grid-cols-2 gap-px overflow-hidden rounded-2xl border border-line bg-line sm:grid-cols-5">
            {keyYears.map((k) => (
              <li key={k.year} className="bg-parchment p-6 text-center">
                <p className="font-display text-4xl font-semibold text-gold">{k.year}</p>
                <p className="mt-1 text-sm text-ink-muted">{k.text}</p>
              </li>
            ))}
          </ol>

          <div className="mt-10 flex justify-center">
            <Link
              href="/sanktuarium#historia"
              className="group inline-flex items-center gap-2 rounded-full bg-lapis px-7 py-3.5 text-sm font-bold text-gold-pale transition hover:bg-lapis-light"
            >
              Poznaj całą historię
              <ArrowRight size={16} className="transition group-hover:translate-x-1" />
            </Link>
          </div>
        </div>
      </section>

      {/* FARA Z LOTU PTAKA */}
      <section className="relative h-[70vh] min-h-[28rem] overflow-hidden bg-lapis-deep">
        <AmbientVideo
          src="/images/fara-z-lotu.mp4"
          poster="/images/fara-z-lotu.jpg"
          label="Przelot drona wokół kościoła farnego w Buku"
          className="absolute inset-0 h-full w-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-lapis-deep via-lapis-deep/75 via-45% to-lapis-deep/25" />
        <div className="relative mx-auto flex h-full max-w-7xl flex-col justify-end px-5 pb-14 lg:px-8">
          <Eyebrow light>Fara z lotu ptaka</Eyebrow>
          <p className="mt-3 max-w-3xl font-display text-4xl font-semibold leading-tight text-gold-pale [text-shadow:0_2px_24px_rgba(16,29,59,0.8)] sm:text-6xl">
            Kościół św. Stanisława — serce Buku od&nbsp;XIII wieku
          </p>
          <Link
            href="/koscioly#fara"
            className="mt-6 inline-flex w-fit items-center gap-2 rounded-full border border-gold-light/50 bg-lapis-deep/40 px-6 py-3 text-sm font-semibold text-gold-pale backdrop-blur transition hover:bg-gold-light hover:text-lapis-deep"
          >
            Historia fary <ArrowRight size={16} />
          </Link>
        </div>
      </section>

      {/* KOŚCIOŁY */}
      <section className="mx-auto max-w-7xl px-5 py-24 lg:px-8">
        <div className="text-center">
          <Eyebrow>Dwa kościoły, jedna parafia</Eyebrow>
          <h2 className="mt-4 font-display text-5xl font-semibold text-lapis">Nasze świątynie</h2>
          <Divider className="mt-6" />
        </div>

        <div className="mt-14 grid gap-6 lg:grid-cols-2">
          {churches.map((c) => (
            <Link
              key={c.slug}
              href={`/koscioly#${c.slug}`}
              className="group flex flex-col overflow-hidden rounded-2xl border border-line bg-vellum transition hover:-translate-y-1 hover:border-gold/60 hover:shadow-[0_30px_60px_-30px_rgba(16,29,59,0.35)]"
            >
              <div className="relative aspect-[16/9] overflow-hidden">
                <Image
                  src={c.cover}
                  alt={c.name}
                  fill
                  sizes="(min-width: 1024px) 600px, 100vw"
                  className="object-cover transition duration-700 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-lapis-deep/70 to-transparent" />
                <p className="absolute bottom-5 left-8 font-display text-5xl font-semibold leading-none text-gold-pale sm:left-10">
                  {c.built}
                </p>
              </div>
              <div className="flex flex-1 flex-col p-8 sm:p-10">
                <h3 className="font-display text-3xl font-semibold text-lapis">{c.name}</h3>
                <p className="text-sm uppercase tracking-[0.18em] text-ink-muted">{c.subtitle}</p>
                <p className="mt-5 flex-1 leading-7 text-ink-soft">{c.intro}</p>
                <span className="mt-6 inline-flex items-center gap-1 text-sm font-semibold text-lapis group-hover:text-gold">
                  Historia kościoła <ArrowRight size={15} className="transition group-hover:translate-x-1" />
                </span>
              </div>
            </Link>
          ))}
        </div>
      </section>

    </>
  );
}
