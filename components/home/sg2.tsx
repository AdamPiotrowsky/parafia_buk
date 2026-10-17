import Image from "next/image";
import Link from "next/link";
import { ArrowRight, ArrowUpRight } from "lucide-react";

import { Triptych, type WingData } from "@/components/home/triptych";
import { NextMassCard, SaintOfDayCard } from "@/components/today-bar";
import { churches } from "@/lib/history";
import { keyYears, shortcuts } from "@/lib/home";
import { massSchedule, site } from "@/lib/site";

const fara = churches[0];
const swietyKrzyz = churches[1];

const imageWing: WingData = {
  label: "Obraz",
  image: "/images/obraz-mbbl.jpg",
  subtitle: "Patronka sanktuarium",
  title: "Matka Boża Bukowska Literacka",
  text:
    "Hodegetria — „Wskazująca Drogę”. Dzieciątko jedną ręką błogosławi, w drugiej trzyma grubą księgę, znak literatów. Średniowieczny wizerunek spłonął w 1945 roku; dziś w ołtarzu jaśnieje obraz namalowany przez Eugenię Gogolewską, ukoronowany w 2017 roku.",
  facts: keyYears,
  links: [
    { href: "/sanktuarium/historia-obrazu", label: "Historia obrazu" },
    { href: "/sanktuarium", label: "Sanktuarium" },
  ],
};

const churchWing: WingData = {
  label: "Kościół",
  image: "/images/fara-front.jpg",
  subtitle: fara.subtitle,
  title: fara.name,
  text: `${fara.intro} Obok, na dawnych Konarach, stoi drewniany kościół św. Krzyża z ${swietyKrzyz.built} roku.`,
  facts: [
    { year: "1257", text: "pierwsza wzmianka o świątyni parafialnej" },
    { year: "1418", text: "konsekracja gotyckiej fary" },
    { year: "1846", text: "nowy kościół według projektu Schinkla" },
    { year: "1945", text: "spalony przez Niemców" },
    { year: "1948", text: "konsekracja odbudowanej fary" },
    { year: "2015", text: "tytuł sanktuarium" },
  ],
  links: [
    { href: "/koscioly#fara", label: "Historia fary" },
    { href: "/koscioly#swiety-krzyz", label: "Kościół św. Krzyża" },
  ],
};

/* Propozycja 2 — „Tryptyk”: wysuwane skrzydła z obrazem i kościołem */
export function HomeSg2() {
  return (
    <>
      <section className="relative overflow-hidden bg-lapis-deep">
        <div className="absolute inset-0" aria-hidden>
          <Image src="/images/fara-oltarz.jpg" alt="" fill priority sizes="100vw" className="object-cover object-[51%_45%] opacity-35 blur-[2px]" />
        </div>
        <div className="lapis-sky absolute inset-0 opacity-80" />

        <div className="relative mx-auto max-w-[96rem] px-5 lg:px-8">
          <Triptych left={imageWing} right={churchWing}>
            <div className="max-w-xl text-center">
              <Image src="/logo/logo-gold.png" alt="Logo Sanktuarium Matki Bożej Bukowskiej Literackiej" width={176} height={176} className="mx-auto h-36 w-36 sm:h-44 sm:w-44" priority />
              <p className="mt-6 text-[0.75rem] font-bold uppercase tracking-[0.3em] text-gold-light">Archidiecezja Poznańska</p>
              <h1 className="mt-3 font-display text-5xl font-semibold leading-[1.02] text-gold-pale sm:text-6xl">
                Sanktuarium Matki Bożej <span className="gold-text italic">Bukowskiej Literackiej</span>
              </h1>
              <p className="mt-4 text-gold-pale/75">{site.parish}</p>

              <div className="mx-auto mt-8 flex max-w-md items-center justify-center gap-8 rounded-2xl border border-gold/30 bg-lapis-deep/60 px-6 py-5 text-left backdrop-blur">
                <NextMassCard />
              </div>

              <div className="mt-7 flex flex-wrap justify-center gap-3">
                <Link href="/ogloszenia" className="inline-flex items-center gap-2 rounded-full bg-gold-light px-6 py-3 text-sm font-bold text-lapis-deep hover:bg-gold-pale">
                  Ogłoszenia <ArrowRight size={16} />
                </Link>
                <Link href="/intencje" className="rounded-full border border-gold-light/40 px-6 py-3 text-sm font-semibold text-gold-pale hover:bg-gold-light/10">
                  Intencje
                </Link>
              </div>
              <p className="mt-8 hidden text-xs uppercase tracking-[0.2em] text-gold-pale/50 lg:block">
                ← Kliknij skrzydło, aby poznać obraz i kościół →
              </p>
            </div>
          </Triptych>
        </div>
      </section>

      {/* Pasek na skróty */}
      <section className="border-b border-line bg-vellum">
        <div className="mx-auto grid max-w-7xl grid-cols-2 gap-px px-5 sm:grid-cols-4 lg:grid-cols-8 lg:px-8">
          {shortcuts.map(({ title, href, icon: Icon, external }) => {
            const cls = "group flex flex-col items-center gap-2 px-2 py-6 text-center transition hover:bg-parchment";
            const body = (
              <>
                <Icon size={22} strokeWidth={1.5} className="text-gold transition group-hover:text-lapis" />
                <span className="flex items-center gap-1 text-[0.82rem] font-semibold leading-tight text-lapis">
                  {title}
                  {external && <ArrowUpRight size={12} className="text-gold" />}
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

      {/* Msze i święty dnia */}
      <section className="mx-auto grid max-w-7xl gap-6 px-5 py-16 lg:grid-cols-[1fr_22rem] lg:px-8">
        <div className="rounded-2xl border border-line bg-vellum p-8">
          <p className="text-[0.7rem] font-bold uppercase tracking-[0.25em] text-gold">Porządek Mszy Świętych</p>
          <div className="mt-6 grid gap-6 sm:grid-cols-3">
            {[
              { name: "Niedziele i święta", times: massSchedule.sunday },
              { name: "Dni powszednie", times: massSchedule.weekday },
              { name: "Święta w dni pracy", times: massSchedule.holyDayOnWorkday },
            ].map((g) => (
              <div key={g.name}>
                <p className="font-display text-xl font-semibold text-lapis">{g.name}</p>
                <p className="mt-2 font-display text-3xl font-semibold tabular-nums text-ink">{g.times.join(" · ")}</p>
              </div>
            ))}
          </div>
          <p className="mt-6 border-t border-line pt-4 text-sm text-ink-muted">
            W lipcu i sierpniu w niedziele bez Mszy o 12:00. ·{" "}
            <Link href="/msze" className="font-semibold text-lapis hover:text-gold">Pełny porządek</Link>
          </p>
        </div>
        <div className="rounded-2xl border border-gold/40 bg-vellum p-8">
          <SaintOfDayCard />
        </div>
      </section>
    </>
  );
}
