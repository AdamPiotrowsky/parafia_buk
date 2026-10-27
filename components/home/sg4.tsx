import Image from "next/image";
import Link from "next/link";
import { ArrowRight, ArrowUpRight, ChevronDown } from "lucide-react";

import { ParishTitle } from "@/components/home/parish-title";
import { Reveal } from "@/components/reveal";
import { churches, imageHistory } from "@/lib/history";
import { shortcuts } from "@/lib/home";


const [fara, swietyKrzyz] = churches;
const milestones = imageHistory.flatMap((era) => era.events).filter((e) => e.major);

/* Propozycja 4 — „Opowieść”: pełnoekranowe zdjęcia przewijane jak album */
export function HomeSg4() {
  return (
    <>
      {/* I. Ołtarz */}
      <section className="relative flex min-h-[calc(100svh-7.25rem)] flex-col overflow-hidden bg-lapis-deep">
        <div className="absolute inset-0" aria-hidden>
          <Image src="/images/fara-oltarz-ostre.jpg" alt="" fill priority quality={92} sizes="100vw" className="object-cover object-[51%_45%]" />
        </div>
        {/* Lekkie przyciemnienie tylko u góry i na dole — środek zdjęcia zostaje wyraźny */}
        <div className="absolute inset-0 bg-gradient-to-b from-lapis-deep/55 via-transparent via-40% to-lapis-deep" />

        <div className="relative mx-auto flex w-full max-w-7xl flex-1 flex-col items-center justify-end px-5 pb-8 pt-[38svh] text-center lg:items-start lg:justify-center lg:pt-16 lg:text-left xl:px-8">
          {/* Parafia i sanktuarium na granatowej tablicy — czytelne na każdym fragmencie zdjęcia */}
          <Reveal>
            <div className="mx-auto max-w-4xl rounded-3xl border border-gold/40 bg-lapis-deep/85 px-6 py-7 lg:mx-0 lg:max-w-[28rem] shadow-[0_30px_80px_-30px_rgba(8,15,35,0.9)] backdrop-blur-sm sm:px-10 sm:py-8">
              <div className="lg:hidden"><ParishTitle tone="dark" align="center" size="md" /></div>
              <div className="hidden lg:block"><ParishTitle tone="dark" size="md" /></div>
              <p className="mx-auto mt-4 max-w-xl text-base leading-7 text-gold-pale/80 lg:mx-0">
                Od blisko sześciu wieków przychodzimy tu do Tej, która wskazuje drogę do Syna.
              </p>
            </div>
          </Reveal>
          <a href="#obraz" className="mt-6 flex flex-col items-center gap-2 lg:hidden text-xs uppercase tracking-[0.25em] text-gold-pale [text-shadow:0_1px_8px_rgba(8,15,35,0.9)] hover:text-white">
            Wejdź
            <ChevronDown className="animate-bounce motion-reduce:animate-none" size={22} />
          </a>
        </div>

        {/* Najważniejsze od razu, na dole pierwszego ekranu */}
        <div className="relative border-t border-gold/25 bg-lapis-deep/70 backdrop-blur">
          <div className="mx-auto flex max-w-7xl flex-wrap items-center justify-center gap-6 px-5 py-5 lg:px-8">
            <div className="flex flex-wrap justify-center gap-2">
              {shortcuts.slice(0, 4).map(({ title, href, external }) =>
                external ? (
                  <a key={title} href={href} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1 rounded-full border border-gold-light/40 px-5 py-2.5 text-sm font-semibold text-gold-pale hover:bg-gold-light/10">
                    {title} <ArrowUpRight size={14} />
                  </a>
                ) : (
                  <Link key={title} href={href} className="rounded-full bg-gold-light px-5 py-2.5 text-sm font-bold text-lapis-deep hover:bg-gold-pale">
                    {title}
                  </Link>
                )
              )}
            </div>
          </div>
        </div>
      </section>

      {/* II. Obraz */}
      <section id="obraz" className="grid scroll-mt-28 lg:min-h-screen lg:grid-cols-2">
        <div className="relative min-h-[70vh] bg-lapis-deep">
          <Image src="/images/obraz-mbbl.jpg" alt="Matka Boża Bukowska Literacka" fill sizes="(min-width: 1024px) 50vw, 100vw" className="object-cover object-top" />
        </div>
        <div className="flex items-center bg-vellum px-6 py-20 sm:px-12 lg:px-20">
          <Reveal className="max-w-lg">
            <p className="font-display text-8xl font-semibold leading-none text-gold/70">1430</p>
            <p className="mt-2 text-[0.72rem] font-bold uppercase tracking-[0.28em] text-gold">pierwsza wzmianka o obrazie</p>
            <h2 className="mt-8 font-display text-5xl font-semibold leading-tight text-lapis">Hodegetria — Wskazująca Drogę</h2>
            <p className="mt-6 text-[1.08rem] leading-8 text-ink-soft">
              Dzieciątko jedną ręką błogosławi, w drugiej trzyma grubą księgę — znak literatów. Wizerunek ocalał z
              katastrofy fary w 1806 roku, spłonął w styczniu 1945 i odrodził się w obrazie Eugenii Gogolewskiej,
              ukoronowanym 10 września 2017 roku.
            </p>
            <Link href="/sanktuarium#historia" className="mt-8 inline-flex items-center gap-2 rounded-full bg-lapis px-7 py-3.5 text-sm font-bold text-gold-pale hover:bg-lapis-light">
              Cała historia obrazu <ArrowRight size={16} />
            </Link>
          </Reveal>
        </div>
      </section>

      {/* III. Fara */}
      <FullBleed image={fara.cover} year={fara.built} title={fara.name} subtitle={fara.subtitle} text={fara.intro} href="/koscioly#fara" />

      {/* IV. Kościół św. Krzyża */}
      <FullBleed
        image={swietyKrzyz.cover}
        year={swietyKrzyz.built}
        title={swietyKrzyz.name}
        subtitle={swietyKrzyz.subtitle}
        text={swietyKrzyz.intro}
        href="/koscioly#swiety-krzyz"
        inset="/images/swiety-krzyz-wnetrze.jpg"
        align="right"
      />

      {/* V. Kalendarium */}
      <section className="lapis-sky py-24">
        <div className="mx-auto max-w-7xl px-5 lg:px-8">
          <Reveal>
            <p className="text-[0.72rem] font-bold uppercase tracking-[0.28em] text-gold-light">Kalendarium</p>
            <h2 className="mt-3 font-display text-5xl font-semibold text-gold-pale">Sześć wieków w siedmiu datach</h2>
          </Reveal>
        </div>
        <ol className="mt-12 flex snap-x snap-mandatory gap-5 overflow-x-auto px-5 pb-6 lg:px-[max(2rem,calc((100vw-80rem)/2+2rem))]">
          {milestones.map((m) => (
            <li key={m.year} className="w-72 shrink-0 snap-start rounded-2xl border border-gold/30 bg-lapis-deep/60 p-7">
              <p className="font-display text-5xl font-semibold text-gold-light">{m.year}</p>
              <p className="mt-4 font-display text-2xl font-semibold text-gold-pale">{m.title}</p>
              <p className="mt-2 text-sm leading-6 text-gold-pale/70">{m.text}</p>
            </li>
          ))}
        </ol>
      </section>

    </>
  );
}

function FullBleed({
  image,
  year,
  title,
  subtitle,
  text,
  href,
  inset,
  align = "left",
}: {
  image: string;
  year: string;
  title: string;
  subtitle: string;
  text: string;
  href: string;
  inset?: string;
  align?: "left" | "right";
}) {
  const right = align === "right";
  return (
    <section className="relative flex min-h-screen items-end overflow-hidden bg-lapis-deep">
      <Image src={image} alt={title} fill sizes="100vw" className="object-cover" />
      <div className={`absolute inset-0 bg-gradient-to-t from-lapis-deep via-lapis-deep/40 to-transparent ${right ? "lg:bg-gradient-to-l" : "lg:bg-gradient-to-r"} lg:from-lapis-deep/95 lg:via-lapis-deep/75 lg:via-45% lg:to-lapis-deep/10`} />
      <div className={`relative mx-auto flex w-full max-w-7xl flex-col gap-10 px-5 py-20 lg:flex-row lg:items-end lg:px-8 ${right ? "lg:flex-row-reverse" : ""}`}>
        <Reveal className={`max-w-xl ${right ? "lg:text-right" : ""}`}>
          <p className="font-display text-7xl font-semibold leading-none text-gold-light sm:text-8xl">{year}</p>
          <h2 className="mt-6 font-display text-5xl font-semibold leading-tight text-gold-pale">{title}</h2>
          <p className="text-sm uppercase tracking-[0.2em] text-gold-pale/70">{subtitle}</p>
          <p className="mt-5 text-lg leading-8 text-gold-pale/85">{text}</p>
          <Link href={href} className="mt-8 inline-flex items-center gap-2 rounded-full bg-gold-light px-7 py-3.5 text-sm font-bold text-lapis-deep hover:bg-gold-pale">
            Historia kościoła <ArrowRight size={16} />
          </Link>
        </Reveal>
        {inset && (
          <Reveal delay={300} className="hidden flex-1 lg:block">
            <div className={`relative aspect-[3/2] w-full max-w-md overflow-hidden rounded-xl border border-gold/50 shadow-2xl ${right ? "" : "ml-auto"}`}>
              <Image src={inset} alt={`${title} — wnętrze`} fill sizes="450px" className="object-cover" />
            </div>
          </Reveal>
        )}
      </div>
    </section>
  );
}
