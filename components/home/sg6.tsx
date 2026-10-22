import Image from "next/image";
import Link from "next/link";
import { ArrowRight, ArrowUpRight } from "lucide-react";

import { Nave, type NavePanel } from "@/components/home/nave";
import { NextMassCard } from "@/components/today-bar";
import { churches } from "@/lib/history";
import { keyYears, shortcuts } from "@/lib/home";
import { massSchedule, site } from "@/lib/site";

const [fara, swietyKrzyz] = churches;

function Dates({ items }: { items: { year: string; text: string }[] }) {
  return (
    <ul className="mt-4 grid grid-cols-2 gap-x-6 gap-y-2 sm:grid-cols-3">
      {items.map((d) => (
        <li key={d.year}>
          <span className="block font-display text-2xl font-semibold text-gold">
            {d.year}
          </span>
          <span className="block text-sm text-ink-muted">{d.text}</span>
        </li>
      ))}
    </ul>
  );
}

const panels: NavePanel[] = [
  {
    id: "obraz",
    title: "Obraz Matki Bożej",
    summary: "Hodegetria z księgą · czczona od 1430 roku",
    image: "/images/obraz-mbbl.jpg",
    imagePosition: "object-top",
    caption: "Matka Boża Bukowska Literacka",
    body: (
      <>
        <p>
          Dzieciątko jedną ręką błogosławi, w drugiej trzyma grubą księgę — znak
          literatów. Wizerunek ocalał z katastrofy fary w 1806 roku, spłonął w
          styczniu 1945 i odrodził się w obrazie Eugenii Gogolewskiej,
          ukoronowanym 10 września 2017 roku.
        </p>
        <Dates items={keyYears} />
      </>
    ),
    link: {
      href: "/sanktuarium/historia-obrazu",
      label: "Cała historia obrazu",
    },
  },
  {
    id: "fara",
    title: fara.name,
    summary: `${fara.subtitle} · ${fara.built}`,
    image: fara.cover,
    caption: `${fara.name} — klasycystyczny portyk`,
    body: (
      <>
        <p>{fara.intro}</p>
        <Dates
          items={[
            { year: "1257", text: "pierwsza wzmianka" },
            { year: "1846", text: "kościół Schinkla" },
            { year: "1945", text: "spalony" },
            { year: "1948", text: "konsekracja" },
            { year: "2015", text: "sanktuarium" },
          ]}
        />
      </>
    ),
    link: { href: "/koscioly#fara", label: "Historia fary" },
  },
  {
    id: "krzyz",
    title: swietyKrzyz.name,
    summary: `${swietyKrzyz.subtitle} · ${swietyKrzyz.built}`,
    image: swietyKrzyz.feature.src,
    caption: swietyKrzyz.feature.caption,
    body: <p>{swietyKrzyz.intro}</p>,
    link: { href: "/koscioly#swiety-krzyz", label: "Historia kościoła" },
  },
  {
    id: "msze",
    title: "Msze Święte",
    summary: `Niedziele: ${massSchedule.sunday.join(", ")}`,
    body: (
      <>
        <dl className="space-y-3">
          {[
            { name: "Niedziele i święta", times: massSchedule.sunday },
            { name: "Dni powszednie", times: massSchedule.weekday },
            {
              name: "Święta w dni pracy",
              times: massSchedule.holyDayOnWorkday,
            },
          ].map((g) => (
            <div
              key={g.name}
              className="flex flex-wrap items-baseline justify-between gap-2"
            >
              <dt>{g.name}</dt>
              <dd className="font-display text-2xl font-semibold tabular-nums text-lapis">
                {g.times.join(" · ")}
              </dd>
            </div>
          ))}
        </dl>
        <p className="mt-3 text-sm text-ink-muted">
          W lipcu i sierpniu w niedziele bez Mszy o 12:00.
        </p>
      </>
    ),
    link: { href: "/msze", label: "Porządek nabożeństw" },
  },
  {
    id: "biuro",
    title: "Biuro parafialne i kontakt",
    summary: `${site.address.street}, ${site.address.city} · tel. ${site.phone}`,
    body: (
      <>
        <dl className="space-y-2">
          {site.officeHours.map((o) => (
            <div key={o.days} className="flex flex-wrap justify-between gap-2">
              <dt className="first-letter:uppercase">{o.days}</dt>
              <dd className="font-semibold tabular-nums text-lapis">
                {o.hours}
              </dd>
            </div>
          ))}
        </dl>
        <p className="pt-3">
          <a
            href={`tel:${site.phone.replace(/\s/g, "")}`}
            className="font-semibold text-lapis"
          >
            {site.phone}
          </a>{" "}
          ·{" "}
          <a href={`mailto:${site.email}`} className="font-semibold text-lapis">
            {site.email}
          </a>
        </p>
      </>
    ),
    link: { href: "/kontakt", label: "Kontakt i mapa" },
  },
];

/* Propozycja 6 — „Nawa”: ołtarz po lewej, białe wysuwane panele po prawej */
export function HomeSg6() {
  return (
    <>
      <Nave
        panels={panels}
        intro={
          <>
            <div className="flex items-center gap-4">
              <Image
                src="/logo/logo-lapis.png"
                alt="Logo Sanktuarium"
                width={64}
                height={64}
                className="h-16 w-16"
                priority
              />
              <p className="text-[0.72rem] font-bold uppercase tracking-[0.28em] text-gold">
                Archidiecezja Poznańska
                <span className="mt-1 block font-normal normal-case tracking-normal text-ink-muted">
                  {site.parish}
                </span>
              </p>
            </div>
            <h1 className="mt-8 font-display text-5xl font-semibold leading-[1.02] text-ink sm:text-6xl">
              Sanktuarium Matki Bożej{" "}
              <span className="italic text-lapis">Bukowskiej Literackiej</span>
            </h1>
            <div className="mt-8 flex flex-wrap items-end gap-x-10 gap-y-6">
              <NextMassCard tone="light" />
              <div className="flex gap-2">
                <Link
                  href="/ogloszenia"
                  className="inline-flex items-center gap-2 rounded-full bg-lapis px-6 py-3 text-sm font-bold text-gold-pale hover:bg-lapis-light"
                >
                  Ogłoszenia <ArrowRight size={15} />
                </Link>
                <Link
                  href="/intencje"
                  className="rounded-full border border-lapis/25 px-6 py-3 text-sm font-semibold text-lapis hover:bg-parchment"
                >
                  Intencje
                </Link>
              </div>
            </div>
          </>
        }
      />

      <section className="border-t border-line bg-white">
        <div className="mx-auto grid max-w-7xl grid-cols-2 gap-px px-5 sm:grid-cols-4 lg:grid-cols-8 lg:px-8">
          {shortcuts.map(({ title, href, icon: Icon, external }) => {
            const cls =
              "group flex flex-col items-center gap-2 px-2 py-7 text-center transition hover:bg-parchment/60";
            const body = (
              <>
                <Icon
                  size={22}
                  strokeWidth={1.4}
                  className="text-gold transition group-hover:text-lapis"
                />
                <span className="flex items-center gap-1 text-[0.82rem] font-semibold leading-tight text-ink">
                  {title}
                  {external && <ArrowUpRight size={12} className="text-gold" />}
                </span>
              </>
            );
            return external ? (
              <a
                key={title}
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                className={cls}
              >
                {body}
              </a>
            ) : (
              <Link key={title} href={href} className={cls}>
                {body}
              </Link>
            );
          })}
        </div>
      </section>
    </>
  );
}
