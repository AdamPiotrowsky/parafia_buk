import Image from "next/image";
import Link from "next/link";
import { ArrowRight, ArrowUpRight } from "lucide-react";

import { SacredImage } from "@/components/sacred-image";
import { SaintOfDayCard } from "@/components/today-bar";
import { churches } from "@/lib/history";
import { keyYears, shortcuts } from "@/lib/home";
import { massSchedule, site } from "@/lib/site";

/* Łuk okna prezbiterium — eliptyczne zaokrąglenie górnych rogów */
const arch = { borderTopLeftRadius: "50% 38%", borderTopRightRadius: "50% 38%" };

/* Propozycja 5 — „Biel i złoto”: jasna strona, ołtarz fary w łukowym oknie */
export function HomeSg5() {
  return (
    <div className="bg-white">
      {/* Nagłówek i ołtarz */}
      <section className="mx-auto max-w-6xl px-5 pt-8 text-center lg:px-8 lg:pt-10">
        <Image src="/logo/logo-lapis.png" alt="Logo Sanktuarium" width={88} height={88} className="mx-auto h-14 w-14" priority />
        <p className="mt-3 text-[0.75rem] font-bold uppercase tracking-[0.32em] text-gold">Archidiecezja Poznańska</p>
        <h1 className="mt-2 font-display text-5xl font-semibold leading-[1.02] text-ink sm:text-6xl">
          Sanktuarium Matki Bożej <span className="italic text-lapis">Bukowskiej Literackiej</span>
        </h1>
        <p className="mt-2 text-ink-muted">{site.parish}</p>

        <div className="relative mx-auto mt-8 max-w-5xl">
          <div className="bg-gradient-to-b from-gold-light via-gold to-gold-light p-[3px] shadow-[0_40px_80px_-40px_rgba(16,29,59,0.55)]" style={arch}>
            <div className="relative aspect-[4/5] overflow-hidden bg-lapis-deep sm:aspect-[16/10]" style={arch}>
              <Image
                src="/images/fara-oltarz.jpg"
                alt="Ołtarz główny fary z obrazem Matki Bożej Bukowskiej Literackiej"
                fill
                priority
                sizes="(min-width: 1024px) 1024px, 100vw"
                className="hero-zoom object-cover object-[51%_45%]"
              />
            </div>
          </div>

          {/* Jasny pasek informacji, nachodzący na dół okna */}
          <div className="relative mx-auto -mt-20 grid max-w-3xl gap-px overflow-hidden rounded-2xl border border-line bg-line text-left shadow-[0_30px_60px_-30px_rgba(16,29,59,0.35)] sm:grid-cols-[1fr_auto]">
            <div className="bg-white p-6 sm:p-7 [&_p:nth-child(3)]:text-2xl">
              <SaintOfDayCard />
            </div>
            <div className="flex flex-col justify-center gap-2 bg-white p-6 sm:p-7">
              <Link href="/ogloszenia" className="inline-flex items-center justify-center gap-2 rounded-full bg-lapis px-6 py-3 text-sm font-bold text-gold-pale hover:bg-lapis-light">
                Ogłoszenia <ArrowRight size={15} />
              </Link>
              <Link href="/intencje" className="inline-flex items-center justify-center rounded-full border border-lapis/25 px-6 py-3 text-sm font-semibold text-lapis hover:bg-parchment">
                Intencje
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Na skróty — lekka lista */}
      <section className="mx-auto max-w-6xl px-5 py-20 lg:px-8">
        <div className="grid grid-cols-2 border-l border-t border-line sm:grid-cols-4">
          {shortcuts.map(({ title, hint, href, icon: Icon, external }) => {
            const cls = "group flex flex-col gap-3 border-b border-r border-line p-6 transition hover:bg-parchment/60";
            const body = (
              <>
                <Icon size={24} strokeWidth={1.4} className="text-gold" />
                <span>
                  <span className="flex items-center gap-1 font-display text-xl font-semibold text-ink group-hover:text-lapis">
                    {title}
                    {external && <ArrowUpRight size={14} className="text-gold" />}
                  </span>
                  <span className="text-sm text-ink-muted">{hint}</span>
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

      {/* Obraz */}
      <section className="border-y border-line bg-[#fcfaf6]">
        <div className="mx-auto grid max-w-6xl items-center gap-14 px-5 py-20 lg:grid-cols-[20rem_1fr] lg:px-8">
          <SacredImage src="/images/obraz-mbbl.jpg" alt="Matka Boża Bukowska Literacka" className="mx-auto w-full max-w-[20rem]" />
          <div>
            <p className="text-[0.72rem] font-bold uppercase tracking-[0.28em] text-gold">Historia obrazu</p>
            <h2 className="mt-3 font-display text-5xl font-semibold leading-tight text-ink">Hodegetria — Wskazująca Drogę</h2>
            <p className="mt-5 max-w-2xl text-[1.05rem] leading-8 text-ink-soft">
              Dzieciątko jedną ręką błogosławi, w drugiej trzyma grubą księgę — znak literatów. Wizerunek czczony w Buku
              co najmniej od 1430 roku ocalał z katastrofy fary w 1806, spłonął w 1945 i odrodził się w obrazie
              ukoronowanym 10 września 2017 roku.
            </p>
            <ol className="mt-8 flex flex-wrap gap-x-8 gap-y-4">
              {keyYears.map((k) => (
                <li key={k.year}>
                  <p className="font-display text-3xl font-semibold text-gold">{k.year}</p>
                  <p className="text-sm text-ink-muted">{k.text}</p>
                </li>
              ))}
            </ol>
            <Link href="/sanktuarium#historia" className="mt-8 inline-flex items-center gap-2 text-sm font-bold text-lapis hover:text-gold">
              Cała historia obrazu <ArrowRight size={15} />
            </Link>
          </div>
        </div>
      </section>

      {/* Kościoły i Msze */}
      <section className="mx-auto max-w-6xl px-5 py-20 lg:px-8">
        <div className="grid gap-6 md:grid-cols-2">
          {churches.map((c) => (
            <Link key={c.slug} href={`/koscioly#${c.slug}`} className="group">
              <div className="relative aspect-[16/10] overflow-hidden rounded-2xl">
                <Image src={c.cover} alt={c.name} fill sizes="(min-width: 768px) 560px, 100vw" className="object-cover transition duration-700 group-hover:scale-105" />
              </div>
              <p className="mt-4 text-[0.7rem] font-bold uppercase tracking-[0.22em] text-gold">{c.style} · {c.built}</p>
              <p className="font-display text-3xl font-semibold text-ink group-hover:text-lapis">{c.name}</p>
              <p className="mt-1 text-ink-muted">{c.intro}</p>
            </Link>
          ))}
        </div>

        <div className="mt-16 grid gap-6 border-t border-line pt-10 sm:grid-cols-2">
          {[
            { name: "Niedziele i święta", times: massSchedule.sunday },
            { name: "Dni powszednie", times: massSchedule.weekday },
          ].map((g) => (
            <div key={g.name}>
              <p className="text-[0.7rem] font-bold uppercase tracking-[0.22em] text-gold">{g.name}</p>
              <p className="mt-2 font-display text-3xl font-semibold tabular-nums text-lapis">{g.times.join(" · ")}</p>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
