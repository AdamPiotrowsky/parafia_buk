import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

import { HomeBody } from "@/components/home/home-layout";
import { Eyebrow } from "@/components/ornament";
import { SaintOfDayCard } from "@/components/today-bar";
import { plHome } from "@/lib/home";

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

      <Sg1Body />
    </>
  );
}

/* Panel „na skróty” i dalsza część strony — wspólny układ (home-layout), polskie teksty */
export function Sg1Body() {
  return (
    <HomeBody
      t={plHome}
      today={
        <>
          <SaintOfDayCard />
          <Link href="/swieci#biezacy-miesiac" className="mt-6 inline-flex items-center gap-1 text-sm font-semibold text-lapis hover:text-gold">
            Kalendarz świętych <ArrowRight size={15} />
          </Link>
        </>
      }
    />
  );
}
