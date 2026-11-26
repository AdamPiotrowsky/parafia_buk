import Image from "next/image";

import { Sg1Body } from "@/components/home/sg1";
import { site } from "@/lib/site";

/* Propozycja 10 — strona główna: wyraźny ołtarz z granatową tablicą, niżej panel na skróty i treści z SG1 */
export function HomeSg10() {
  return (
    <>
      <Sg10Hero />
      <Sg1Body />
    </>
  );
}

/* Nazwa sanktuarium „wypisuje się” litera po literze — w dwóch linijkach */
const sanctuaryLines = ["Sanktuarium Matki Bożej", "Bukowskiej Literackiej"];

/* Kolejne litery z numerem (spacja też liczy się jako chwila pisania) */
const writtenLines = (() => {
  let n = 0;
  return sanctuaryLines.map((line) =>
    line.split(" ").map((word) => {
      const letters = [...word].map((ch) => ({ ch, n: n++ }));
      n++;
      return letters;
    })
  );
})();

function WrittenLines({ start, step }: { start: number; step: number }) {
  return writtenLines.map((words, l) => (
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

function Sg10Hero() {
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
          <p className="hidden text-[0.72rem] font-bold uppercase tracking-[0.3em] text-gold-light lg:block">{site.diocese}</p>
          <h1 className="font-display text-[2rem] font-semibold leading-[1.05] text-gold-pale sm:text-4xl lg:mt-4 lg:text-[3.15rem]">
            <span className="block whitespace-nowrap">Parafia św. Stanisława</span>
            <span className="block">w Buku</span>
          </h1>
          <div className="mx-auto mt-3 flex items-center justify-center gap-3 lg:mt-5 lg:justify-start">
            <span className="hero-rule h-px w-10 bg-gold-light/60" aria-hidden />
          </div>
          <p className="mt-3 font-display text-[1.35rem] italic leading-tight sm:text-2xl lg:mt-5 lg:text-[2rem]">
            <span className="sr-only">Sanktuarium Matki Bożej Bukowskiej Literackiej</span>
            <span aria-hidden>
              <WrittenLines start={900} step={45} />
            </span>
          </p>
        </div>
      </div>
    </section>
  );
}
