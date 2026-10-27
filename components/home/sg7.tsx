import Image from "next/image";
import Link from "next/link";
import { ArrowRight, ArrowUpRight } from "lucide-react";

import { ParishTitle } from "@/components/home/parish-title";
import { SacredImage } from "@/components/sacred-image";
import { SaintOfDayCard } from "@/components/today-bar";
import { churches } from "@/lib/history";
import { keyYears, shortcuts } from "@/lib/home";

/* Łuk okna prezbiterium — eliptyczne zaokrąglenie górnych rogów */
const arch = { borderTopLeftRadius: "50% 38%", borderTopRightRadius: "50% 38%" };

/*
 * Propozycja 7 — „Biel i granat”: granatowe niebo z nazwami u góry,
 * pod nim wyraźny ołtarz w łukowym oknie przechodzący na białe tło.
 */
export function HomeSg7() {
  return (
    <div className="bg-white">
      <section className="lapis-sky px-5 pb-56 pt-12 sm:pb-72 lg:pt-16">
        <Image src="/logo/logo-gold.png" alt="Logo parafii i sanktuarium" width={96} height={96} className="mx-auto h-20 w-20 sm:h-24 sm:w-24" priority />
        <div className="mx-auto mt-6 max-w-5xl">
          <ParishTitle tone="dark" align="center" />
        </div>
      </section>

      {/* Ołtarz — bez przyciemnienia, wchodzi z granatu na biel */}
      <section className="relative mx-auto -mt-48 max-w-5xl px-5 sm:-mt-64 lg:px-8">
        <div className="bg-gradient-to-b from-gold-light via-gold to-gold-light p-[3px] shadow-[0_40px_80px_-40px_rgba(16,29,59,0.6)]" style={arch}>
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

        <div className="relative mx-auto -mt-16 grid max-w-3xl gap-3 sm:grid-cols-[1fr_auto]">
          <div className="rounded-2xl border border-line bg-white p-6 shadow-xl [&_p:nth-child(3)]:text-2xl">
            <SaintOfDayCard />
          </div>
          <div className="flex flex-col justify-center gap-2 rounded-2xl border border-line bg-white p-5 shadow-xl">
            <Link href="/ogloszenia" className="inline-flex items-center justify-center gap-2 rounded-full bg-lapis px-6 py-3 text-sm font-bold text-gold-pale hover:bg-lapis-light">
              Ogłoszenia <ArrowRight size={15} />
            </Link>
            <Link href="/intencje" className="inline-flex items-center justify-center rounded-full border border-lapis/25 px-6 py-3 text-sm font-semibold text-lapis hover:bg-parchment">
              Intencje
            </Link>
          </div>
        </div>
      </section>

      {/* Na skróty — granatowe ikony na bieli */}
      <section className="mx-auto max-w-6xl px-5 py-20 lg:px-8">
        <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
          {shortcuts.map(({ title, hint, href, icon: Icon, external }) => {
            const cls = "group flex items-center gap-4 rounded-2xl border border-line p-4 transition hover:border-lapis/40 hover:shadow-md";
            const body = (
              <>
                <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-lapis text-gold-light transition group-hover:bg-lapis-light">
                  <Icon size={20} strokeWidth={1.6} />
                </span>
                <span className="min-w-0">
                  <span className="flex items-center gap-1 font-display text-lg font-semibold leading-tight text-lapis">
                    {title}
                    {external && <ArrowUpRight size={13} className="text-gold" />}
                  </span>
                  <span className="block truncate text-xs text-ink-muted">{hint}</span>
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

      {/* Obraz — granatowy pas */}
      <section className="lapis-sky">
        <div className="mx-auto grid max-w-6xl items-center gap-14 px-5 py-20 lg:grid-cols-[20rem_1fr] lg:px-8">
          <SacredImage src="/images/obraz-mbbl.jpg" alt="Matka Boża Bukowska Literacka" className="mx-auto w-full max-w-[20rem]" />
          <div>
            <p className="text-[0.72rem] font-bold uppercase tracking-[0.28em] text-gold-light">Historia obrazu</p>
            <h2 className="mt-3 font-display text-5xl font-semibold leading-tight text-gold-pale">Hodegetria — Wskazująca Drogę</h2>
            <p className="mt-5 max-w-2xl text-[1.05rem] leading-8 text-gold-pale/80">
              Dzieciątko jedną ręką błogosławi, w drugiej trzyma grubą księgę — znak literatów. Wizerunek czczony w Buku co
              najmniej od 1430 roku ocalał z katastrofy fary w 1806, spłonął w 1945 i odrodził się w obrazie ukoronowanym
              10 września 2017 roku.
            </p>
            <ol className="mt-8 flex flex-wrap gap-x-8 gap-y-4">
              {keyYears.map((k) => (
                <li key={k.year}>
                  <p className="font-display text-3xl font-semibold text-gold-light">{k.year}</p>
                  <p className="text-sm text-gold-pale/60">{k.text}</p>
                </li>
              ))}
            </ol>
            <Link href="/sanktuarium#historia" className="mt-8 inline-flex items-center gap-2 rounded-full bg-gold-light px-6 py-3 text-sm font-bold text-lapis-deep hover:bg-gold-pale">
              Cała historia obrazu <ArrowRight size={15} />
            </Link>
          </div>
        </div>
      </section>

      {/* Kościoły */}
      <section className="mx-auto max-w-6xl px-5 py-20 lg:px-8">
        <div className="grid gap-6 md:grid-cols-2">
          {churches.map((c) => (
            <Link key={c.slug} href={`/koscioly#${c.slug}`} className="group overflow-hidden rounded-2xl border border-line">
              <div className="relative aspect-[16/10] overflow-hidden">
                <Image src={c.cover} alt={c.name} fill sizes="(min-width: 768px) 560px, 100vw" className="object-cover transition duration-700 group-hover:scale-105" />
              </div>
              <div className="border-t-4 border-lapis p-6">
                <p className="text-[0.7rem] font-bold uppercase tracking-[0.22em] text-gold">{c.style} · {c.built}</p>
                <p className="font-display text-3xl font-semibold text-lapis">{c.name}</p>
                <p className="mt-1 text-ink-muted">{c.intro}</p>
              </div>
            </Link>
          ))}
        </div>
      </section>
    </div>
  );
}
