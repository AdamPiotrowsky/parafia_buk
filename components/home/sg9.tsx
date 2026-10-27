import Image from "next/image";
import Link from "next/link";
import { ArrowRight, ArrowUpRight } from "lucide-react";

import { ParishTitle } from "@/components/home/parish-title";
import { SacredImage } from "@/components/sacred-image";
import { SaintOfDayCard } from "@/components/today-bar";
import { keyYears, shortcuts } from "@/lib/home";
import { massSchedule } from "@/lib/site";

/*
 * Propozycja 9 — „Tablica”: ołtarz na całą szerokość, wyraźny,
 * przechodzący w granat, a na nim granatowa tablica ze złotym brzegiem i nazwami parafii i sanktuarium.
 */
export function HomeSg9() {
  return (
    <div className="bg-white">
      {/* Ołtarz — u dołu przechodzi w granat, na którym stoi tablica */}
      <section className="relative h-[62svh] min-h-[26rem] overflow-hidden bg-lapis-deep lg:h-[74svh]">
        <Image
          src="/images/fara-oltarz-ostre.jpg"
          alt="Ołtarz główny fary z obrazem Matki Bożej Bukowskiej Literackiej"
          fill
          priority
          quality={92}
          sizes="100vw"
          className="hero-zoom object-cover object-[51%_42%]"
        />
        <div className="absolute inset-x-0 bottom-0 h-48 bg-gradient-to-t from-lapis-deep via-lapis-deep/70 to-transparent" />
      </section>

      {/* Tablica z nazwami */}
      {/* Granat spod zdjęcia sięga do połowy tablicy, niżej strona jest biała */}
      <section className="relative flow-root bg-[linear-gradient(to_bottom,var(--color-lapis-deep)_0,var(--color-lapis-deep)_50%,#fff_50%)]">
      <div className="relative mx-auto -mt-36 max-w-6xl px-4 sm:-mt-44 lg:px-8">
        <div className="lapis-sky overflow-hidden rounded-3xl shadow-[0_40px_90px_-40px_rgba(16,29,59,0.75)] ring-1 ring-gold/40">
          <div className="h-1.5 bg-gradient-to-r from-gold/40 via-gold-light to-gold/40" aria-hidden />
          <div className="grid gap-10 p-7 sm:p-10 lg:grid-cols-[1fr_auto] lg:items-end lg:p-12">
            <div className="flex gap-6">
              <Image src="/logo/logo-gold.png" alt="" width={96} height={96} className="hidden h-24 w-24 shrink-0 sm:block" priority />
              <ParishTitle tone="dark" size="md" />
            </div>
            <div className="flex flex-col gap-3 rounded-2xl border border-gold/30 bg-lapis-deep/70 p-6 lg:min-w-72">
              <Link href="/msze" className="inline-flex items-center justify-center rounded-full border border-gold-light/40 px-5 py-2.5 text-sm font-semibold text-gold-pale hover:bg-gold-light/10">
                Porządek Mszy Świętych
              </Link>
              <div className="flex gap-2">
                <Link href="/ogloszenia" className="inline-flex flex-1 items-center justify-center gap-2 rounded-full bg-gold-light px-5 py-2.5 text-sm font-bold text-lapis-deep hover:bg-gold-pale">
                  Ogłoszenia <ArrowRight size={15} />
                </Link>
                <Link href="/intencje" className="inline-flex flex-1 items-center justify-center rounded-full border border-gold-light/40 px-5 py-2.5 text-sm font-semibold text-gold-pale hover:bg-gold-light/10">
                  Intencje
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
      </section>

      {/* Na skróty */}
      <section className="mx-auto max-w-6xl px-5 py-16 lg:px-8">
        <div className="grid grid-cols-2 border-l border-t border-line sm:grid-cols-4">
          {shortcuts.map(({ title, hint, href, icon: Icon, external }) => {
            const cls = "group flex flex-col gap-3 border-b border-r border-line p-6 transition hover:bg-lapis";
            const body = (
              <>
                <Icon size={24} strokeWidth={1.4} className="text-lapis transition group-hover:text-gold-light" />
                <span>
                  <span className="flex items-center gap-1 font-display text-xl font-semibold text-lapis group-hover:text-gold-pale">
                    {title}
                    {external && <ArrowUpRight size={14} className="text-gold" />}
                  </span>
                  <span className="text-sm text-ink-muted group-hover:text-gold-pale/70">{hint}</span>
                </span>
              </>
            );
            return external ? (
              <a key={title} href={href} target="_blank" rel="noopener noreferrer" className={cls}>{body}</a>
            ) : (
              <Link key={title} href={href} className={cls}>{body}</Link>
            );
          })}
        </div>
      </section>

      {/* Granatowy pas: Msze i święty dnia */}
      <section className="lapis-sky">
        <div className="mx-auto grid max-w-6xl gap-10 px-5 py-16 lg:grid-cols-[1fr_20rem] lg:px-8">
          <div>
            <p className="text-[0.72rem] font-bold uppercase tracking-[0.28em] text-gold-light">Msze Święte</p>
            <div className="mt-6 grid gap-6 sm:grid-cols-2">
              {[
                { name: "Niedziele i święta", times: massSchedule.sunday },
                { name: "Dni powszednie", times: massSchedule.weekday },
              ].map((g) => (
                <div key={g.name}>
                  <p className="font-display text-xl font-semibold text-gold-pale">{g.name}</p>
                  <p className="mt-2 font-display text-2xl font-semibold tabular-nums text-gold-light">{g.times.join(" · ")}</p>
                </div>
              ))}
            </div>
          </div>
          <div className="rounded-2xl bg-white p-7">
            <SaintOfDayCard />
          </div>
        </div>
      </section>

      {/* Obraz */}
      <section className="mx-auto grid max-w-6xl items-center gap-14 px-5 py-20 lg:grid-cols-[20rem_1fr] lg:px-8">
        <SacredImage src="/images/obraz-mbbl.jpg" alt="Matka Boża Bukowska Literacka" className="mx-auto w-full max-w-[20rem]" />
        <div>
          <p className="text-[0.72rem] font-bold uppercase tracking-[0.28em] text-gold">Historia obrazu</p>
          <h2 className="mt-3 font-display text-5xl font-semibold leading-tight text-lapis">Hodegetria — Wskazująca Drogę</h2>
          <ol className="mt-8 flex flex-wrap gap-x-8 gap-y-4">
            {keyYears.map((k) => (
              <li key={k.year}>
                <p className="font-display text-3xl font-semibold text-lapis">{k.year}</p>
                <p className="text-sm text-ink-muted">{k.text}</p>
              </li>
            ))}
          </ol>
          <Link href="/sanktuarium#historia" className="mt-8 inline-flex items-center gap-2 rounded-full bg-lapis px-6 py-3 text-sm font-bold text-gold-pale hover:bg-lapis-light">
            Cała historia obrazu <ArrowRight size={15} />
          </Link>
        </div>
      </section>
    </div>
  );
}
