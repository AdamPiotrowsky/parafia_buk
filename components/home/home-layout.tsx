import Image from "next/image";
import Link from "next/link";
import { ArrowRight, ArrowUpRight } from "lucide-react";

import { AmbientVideo } from "@/components/ambient-video";
import { Divider, Eyebrow } from "@/components/ornament";
import { SacredImage } from "@/components/sacred-image";
import { churches } from "@/lib/history";
import type { HomeTexts } from "@/lib/home";
import { massSchedule } from "@/lib/site";

/*
 * Wspólny układ strony głównej (SG10) — ten sam w każdym języku, różnią się tylko teksty (HomeTexts).
 * Polska: lib/home.ts, pozostałe języki: lib/i18n/home.ts.
 */

/* Nazwa sanktuarium „wypisuje się” litera po literze (spacja też liczy się jako chwila pisania) */
function WrittenLines({ lines, start, step }: { lines: readonly string[]; start: number; step: number }) {
  let n = 0;
  const numbered = lines.map((line) =>
    line.split(" ").map((word) => {
      const letters = [...word].map((ch) => ({ ch, n: n++ }));
      n++;
      return letters;
    })
  );
  return numbered.map((words, l) => (
    <span key={l} className="block">
      {words.map((letters, w) => (
        <span key={w}>
          <span className="inline-block whitespace-nowrap">
            {letters.map(({ ch, n }) => (
              <span key={n} className="ink-letter gold-text" style={{ animationDelay: `${start + n * step}ms` }}>
                {ch}
              </span>
            ))}
          </span>{" "}
        </span>
      ))}
    </span>
  ));
}

/* Ołtarz fary z granatową tablicą: parafia w dwóch linijkach, pod nią wypisywane sanktuarium */
export function ParishHero({ hero }: { hero: HomeTexts["hero"] }) {
  return (
    <section className="relative flex min-h-[calc(100svh-7.25rem)] flex-col overflow-hidden bg-lapis-deep">
      {/* Telefon: zdjęcie zjeżdża niżej, żeby cały ołtarz był widoczny pod tablicą; góra płynnie przechodzi w granat */}
      <div
        className="absolute inset-x-0 top-[9svh] -bottom-[9svh] [mask-image:linear-gradient(to_bottom,transparent,#000_14%)] lg:inset-0 lg:[mask-image:none]"
        aria-hidden
      >
        <Image
          src="/images/fara-oltarz-ostre.jpg"
          alt=""
          fill
          priority
          quality={92}
          // telefon: zdjęcie wypełnia wysokość ekranu i jest mocno przycięte z boków — potrzebny pełny plik, nie wersja „na szerokość ekranu”
          sizes="(max-width: 1023px) 1600px, 100vw"
          className="object-cover object-[51%_45%]"
        />
      </div>
      {/* Telefon: ciemniej u góry pod tablicą (tam jest tylko sklepienie), środek z obrazem zostaje wyraźny */}
      <div className="absolute inset-0 bg-gradient-to-b from-lapis-deep/75 via-transparent via-45% to-lapis-deep lg:from-lapis-deep/55 lg:via-40%" />

      <div className="relative mx-auto flex w-full max-w-7xl flex-1 flex-col px-4 pb-36 pt-[3svh] sm:px-5 lg:justify-center lg:pb-32 lg:pt-16 xl:px-8">
        <div className="hero-card mx-auto w-full max-w-[22rem] rounded-2xl border border-gold/35 bg-lapis-deep/70 px-5 py-5 text-center shadow-[0_24px_60px_-28px_rgba(8,15,35,0.9)] backdrop-blur-md sm:max-w-md sm:px-8 sm:py-7 lg:mx-0 lg:w-auto lg:max-w-[37rem] lg:self-start lg:rounded-3xl lg:bg-lapis-deep/85 lg:px-10 lg:py-10 lg:text-left">
          <p className="hidden text-[0.72rem] font-bold uppercase tracking-[0.3em] text-gold-light lg:block">{hero.diocese}</p>
          <h1 className="font-display text-[2rem] font-semibold leading-[1.05] text-gold-pale sm:text-4xl lg:mt-4 lg:text-[3.15rem]">
            <span className="block lg:whitespace-nowrap">{hero.parish[0]}</span>
            <span className="block">{hero.parish[1]}</span>
          </h1>
          <div className="mx-auto mt-3 flex items-center justify-center gap-3 lg:mt-5 lg:justify-start">
            <span className="hero-rule h-px w-10 bg-gold-light/60" aria-hidden />
          </div>
          <p className="mt-3 font-display text-[1.35rem] italic leading-tight sm:text-2xl lg:mt-5 lg:text-[2rem]">
            <span className="sr-only">{hero.sanctuary.join(" ")}</span>
            <span aria-hidden>
              <WrittenLines lines={hero.sanctuary} start={900} step={45} />
            </span>
          </p>
        </div>
      </div>
    </section>
  );
}

/* Panel na skróty, dziś i msze, historia obrazu, fara z lotu ptaka, kościoły */
export function HomeBody({ t, today }: { t: HomeTexts; today: React.ReactNode }) {
  return (
    <>
      {/* NA SKRÓTY */}
      <section className="relative z-10 mx-auto -mt-28 max-w-7xl px-5 lg:px-8">
        <div className="rounded-2xl border border-gold/30 bg-vellum p-3 shadow-[0_40px_80px_-40px_rgba(16,29,59,0.45)] sm:p-4">
          <div className="grid grid-cols-2 gap-2 md:grid-cols-4">
            {t.shortcuts.map(({ title, hint, href, icon: Icon, external }) => {
              const content = (
                <>
                  <span className="flex h-11 w-11 items-center justify-center rounded-full bg-parchment-deep text-lapis transition group-hover:bg-lapis group-hover:text-gold-light">
                    <Icon size={20} strokeWidth={1.6} />
                  </span>
                  <span className="mt-4 flex items-center gap-1 font-display text-[1.35rem] font-semibold leading-tight text-lapis min-w-0 break-words hyphens-auto">
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
        <div className="rounded-2xl border border-line bg-vellum p-8">{today}</div>

        <div className="rounded-2xl border border-line bg-vellum p-8 lg:col-span-2">
          <p className="text-[0.7rem] font-bold uppercase tracking-[0.25em] text-gold">{t.masses.title}</p>
          <div className="mt-5 grid gap-8 sm:grid-cols-2">
            <div>
              <p className="font-display text-2xl font-semibold text-lapis">{t.masses.sunday}</p>
              <p className="mt-3 flex flex-wrap gap-2">
                {massSchedule.sunday.map((time) => (
                  <span key={time} className="rounded-full bg-lapis px-3.5 py-1.5 font-semibold tabular-nums text-gold-pale">{time}</span>
                ))}
              </p>
            </div>
            <div>
              <p className="font-display text-2xl font-semibold text-lapis">{t.masses.weekday}</p>
              <p className="mt-3 flex flex-wrap gap-2">
                {massSchedule.weekday.map((time) => (
                  <span key={time} className="rounded-full border border-lapis/30 px-3.5 py-1.5 font-semibold tabular-nums text-lapis">{time}</span>
                ))}
              </p>
            </div>
          </div>
          {t.masses.note && <p className="mt-6 text-sm text-ink-muted">{t.masses.note}</p>}
          <div className="mt-8 flex flex-wrap items-center justify-between gap-4 border-t border-line pt-6">
            <p className="text-sm text-ink-soft">
              <strong className="text-ink">{t.masses.officeLabel}:</strong> {t.masses.office}
            </p>
            <Link href={t.masses.fullHref} className="inline-flex items-center gap-1 text-sm font-semibold text-lapis hover:text-gold">
              {t.masses.full} <ArrowRight size={15} />
            </Link>
          </div>
        </div>
      </section>

      {/* HISTORIA OBRAZU */}
      <section className="border-y border-line bg-vellum">
        <div className="mx-auto max-w-7xl px-5 py-24 lg:px-8">
          <div className="grid gap-14 lg:grid-cols-[21rem_1fr] lg:items-center lg:gap-20">
            <SacredImage src="/images/obraz-mbbl.jpg" alt={t.image.alt} caption={t.image.caption} className="mx-auto w-full max-w-[21rem]" />
            <div>
              <Eyebrow>{t.image.eyebrow}</Eyebrow>
              <h2 className="mt-4 font-display text-5xl font-semibold leading-[1.05] text-lapis sm:text-6xl">{t.image.title}</h2>
              <div className="mt-8 max-w-2xl space-y-5 text-[1.05rem] leading-8 text-ink-soft">
                {t.image.paragraphs.map((p) => (
                  <p key={p.slice(0, 32)}>{p}</p>
                ))}
              </div>
            </div>
          </div>

          <ol className="mt-16 grid grid-cols-2 gap-px overflow-hidden rounded-2xl border border-line bg-line sm:grid-cols-5">
            {t.image.keyYears.map((k) => (
              <li key={k.year} className="bg-parchment p-6 text-center">
                <p className="font-display text-4xl font-semibold text-gold">{k.year}</p>
                <p className="mt-1 text-sm text-ink-muted">{k.text}</p>
              </li>
            ))}
          </ol>

          <div className="mt-10 flex justify-center">
            <Link
              href={t.image.linkHref}
              className="group inline-flex items-center gap-2 rounded-full bg-lapis px-7 py-3.5 text-sm font-bold text-gold-pale transition hover:bg-lapis-light"
            >
              {t.image.link}
              <ArrowRight size={16} className="transition group-hover:translate-x-1" />
            </Link>
          </div>
        </div>
      </section>

      {/* FARA Z LOTU PTAKA */}
      <section className="relative h-[70vh] min-h-[28rem] overflow-hidden bg-lapis-deep">
        <AmbientVideo
          src="/images/fara-z-lotu.mp4"
          mobileSrc="/images/fara-z-lotu-720.mp4"
          poster="/images/fara-z-lotu.jpg"
          label={t.video.label}
          className="absolute inset-0 h-full w-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-lapis-deep via-lapis-deep/75 via-45% to-lapis-deep/25" />
        <div className="relative mx-auto flex h-full max-w-7xl flex-col justify-end px-5 pb-14 lg:px-8">
          <Eyebrow light>{t.video.eyebrow}</Eyebrow>
          <p className="mt-3 max-w-3xl font-display text-4xl font-semibold leading-tight text-gold-pale [text-shadow:0_2px_24px_rgba(16,29,59,0.8)] sm:text-6xl">
            {t.video.title}
          </p>
          <Link
            href={t.video.href}
            className="mt-6 inline-flex w-fit items-center gap-2 rounded-full border border-gold-light/50 bg-lapis-deep/40 px-6 py-3 text-sm font-semibold text-gold-pale backdrop-blur transition hover:bg-gold-light hover:text-lapis-deep"
          >
            {t.video.link} <ArrowRight size={16} />
          </Link>
        </div>
      </section>

      {/* KOŚCIOŁY */}
      <section className="mx-auto max-w-7xl px-5 py-24 lg:px-8">
        <div className="text-center">
          <Eyebrow>{t.churches.eyebrow}</Eyebrow>
          <h2 className="mt-4 font-display text-5xl font-semibold text-lapis">{t.churches.title}</h2>
          <Divider className="mt-6" />
        </div>

        <div className="mt-14 grid gap-6 lg:grid-cols-2">
          {churches.map((c) => {
            const item = t.churches.items[c.slug as keyof HomeTexts["churches"]["items"]];
            return (
              <Link
                key={c.slug}
                href={`${t.churches.href}#${c.slug}`}
                className="group flex flex-col overflow-hidden rounded-2xl border border-line bg-vellum transition hover:-translate-y-1 hover:border-gold/60 hover:shadow-[0_30px_60px_-30px_rgba(16,29,59,0.35)]"
              >
                <div className="relative aspect-[16/9] overflow-hidden">
                  <Image
                    src={c.cover}
                    alt={item.name}
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
                  <h3 className="font-display text-3xl font-semibold text-lapis">{item.name}</h3>
                  <p className="text-sm uppercase tracking-[0.18em] text-ink-muted">{item.subtitle}</p>
                  <p className="mt-5 flex-1 leading-7 text-ink-soft">{item.intro}</p>
                  <span className="mt-6 inline-flex items-center gap-1 text-sm font-semibold text-lapis group-hover:text-gold">
                    {t.churches.link} <ArrowRight size={15} className="transition group-hover:translate-x-1" />
                  </span>
                </div>
              </Link>
            );
          })}
        </div>
      </section>
    </>
  );
}
