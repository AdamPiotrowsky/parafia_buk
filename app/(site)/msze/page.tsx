import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, Droplets, Flame, HandHeart, Heart, HeartHandshake, Phone } from "lucide-react";

import { Eyebrow } from "@/components/ornament";
import { PageHeader } from "@/components/page-header";
import { massSchedule, site } from "@/lib/site";

export const metadata: Metadata = { title: "Msze i sakramenty" };

const weekdays = ["Poniedziałek", "Wtorek", "Środa", "Czwartek", "Piątek", "Sobota"];
const tel = `tel:${site.phone.replace(/\s/g, "")}`;

function Times({ times, strong = false }: { times: string[]; strong?: boolean }) {
  return (
    <div className="flex flex-wrap gap-2">
      {times.map((t) => (
        <span
          key={t}
          className={`rounded-full px-4 py-1.5 text-lg font-semibold tabular-nums ${
            strong ? "bg-lapis text-gold-pale" : "border border-lapis/25 text-lapis"
          }`}
        >
          {t}
        </span>
      ))}
    </div>
  );
}

type Sacrament = {
  id: string;
  icon: typeof Heart;
  name: string;
  lead: string;
  points: string[];
  link?: { href: string; label: string };
};

const sacraments: Sacrament[] = [
  {
    id: "chrzest",
    icon: Droplets,
    name: "Chrzest święty",
    lead: "Chrzest zgłaszamy w biurze parafialnym. W czasie wakacji sakramentu udzielamy:",
    points: [
      "w drugą niedzielę miesiąca — podczas Mszy Świętej o 10:30,",
      "w czwartą sobotę miesiąca — podczas Mszy Świętej o 18:30.",
      "Przygotowanie dla rodziców i chrzestnych: w piątek po wieczornej Mszy Świętej.",
      "Terminy mogą ulec zmianie — aktualne informacje podajemy w ogłoszeniach.",
    ],
    link: { href: "/kontakt", label: "Biuro parafialne" },
  },
  {
    id: "bierzmowanie",
    icon: Flame,
    name: "Bierzmowanie",
    lead: "Sakrament dojrzałości chrześcijańskiej, przyjmowany po przygotowaniu w parafii.",
    points: [
      "Terminy spotkań i wymagania dla kandydatów znajdziesz na stronie bierzmowania.",
      "Bieżące informacje podajemy także w ogłoszeniach duszpasterskich.",
    ],
    link: { href: "/bierzmowanie", label: "Strona bierzmowania" },
  },
  {
    id: "pojednanie",
    icon: HeartHandshake,
    name: "Sakrament pokuty i pojednania",
    lead: "Spowiedź święta — powrót do Boga i pojednanie z Kościołem.",
    points: [
      "Godziny spowiedzi, także przed świętami, podajemy w ogłoszeniach.",
      "Rozmowę z kapłanem można umówić przez biuro parafialne.",
    ],
    link: { href: "/ogloszenia", label: "Ogłoszenia" },
  },
  {
    id: "namaszczenie",
    icon: HandHeart,
    name: "Namaszczenie chorych",
    lead: "Sakrament umocnienia dla chorych, starszych i przygotowujących się do operacji.",
    points: [
      "Odwiedziny chorych w domu zgłaszamy w biurze parafialnym.",
      `W nagłych przypadkach prosimy o pilny telefon: ${site.phone.replace(/ /g, "\u00a0")}.`,
    ],
  },
  {
    id: "malzenstwo",
    icon: Heart,
    name: "Sakrament małżeństwa",
    lead: "Narzeczonych prosimy o zgłoszenie się do biura parafialnego co najmniej trzy miesiące przed planowanym ślubem.",
    points: [
      "Na spotkanie warto zabrać dowody osobiste oraz aktualne świadectwa chrztu i bierzmowania.",
      "Potrzebne jest też zaświadczenie o ukończeniu katechez przedmałżeńskich.",
      "Zapowiedzi przedślubne ogłaszamy w ogłoszeniach duszpasterskich.",
    ],
    link: { href: "/ogloszenia", label: "Zapowiedzi w ogłoszeniach" },
  },
];

export default function MszePage() {
  return (
    <>
      <PageHeader
        eyebrow="Kościół farny · ul. Mury 30"
        title="Msze i sakramenty"
        lead="Porządek Mszy Świętych w Sanktuarium Matki Bożej Bukowskiej Literackiej i najważniejsze informacje o sakramentach."
      />

      {/* MSZE */}
      <section className="mx-auto max-w-5xl px-5 py-16 lg:px-8">
        <div className="overflow-hidden rounded-2xl border border-line bg-vellum">
          <div className="grid gap-4 border-b border-line p-8 sm:grid-cols-[14rem_1fr] sm:items-center">
            <p className="font-display text-3xl font-semibold text-lapis">Niedziele i święta</p>
            <Times times={massSchedule.sunday} strong />
          </div>

          {weekdays.map((d) => (
            <div key={d} className="grid gap-3 border-b border-line px-8 py-4 sm:grid-cols-[14rem_1fr] sm:items-center">
              <p className="font-display text-xl text-ink">{d}</p>
              <Times times={massSchedule.weekday} />
            </div>
          ))}

          <div className="grid gap-4 p-8 sm:grid-cols-[14rem_1fr] sm:items-center">
            <div>
              <p className="font-display text-2xl font-semibold text-lapis">Święta w dni pracy</p>
              <p className="text-sm text-ink-muted">np. 1 i 6 stycznia, 15 sierpnia, 1 listopada</p>
            </div>
            <Times times={massSchedule.holyDayOnWorkday} strong />
          </div>
        </div>
      </section>

      {/* SAKRAMENTY */}
      <section className="border-t border-line bg-vellum">
        <div className="mx-auto max-w-5xl px-5 py-16 lg:px-8">
          <Eyebrow>Sakramenty</Eyebrow>
          <h2 className="mt-3 font-display text-5xl font-semibold text-lapis">Jak przyjąć sakrament?</h2>
          <p className="mt-3 max-w-2xl text-ink-soft">
            W każdej sprawie pomoże biuro parafialne — osobiście, telefonicznie lub mailowo.
          </p>

          <div className="mt-10 space-y-4">
            {sacraments.map(({ id, icon: Icon, name, lead, points, link }) => (
              <article
                key={id}
                id={id}
                className="grid scroll-mt-32 gap-4 rounded-2xl border border-line bg-parchment p-6 md:grid-cols-[15rem_1fr] md:gap-8"
              >
                <div className="flex items-center gap-3 md:items-start">
                  <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-lapis text-gold-light">
                    <Icon size={20} strokeWidth={1.6} />
                  </span>
                  <h3 className="font-display text-2xl font-semibold leading-tight text-lapis">{name}</h3>
                </div>
                <div>
                  <p className="leading-7 text-ink">{lead}</p>
                  <ul className="mt-2 grid gap-x-8 gap-y-1 leading-7 text-ink-soft lg:grid-cols-2">
                    {points.map((p) => (
                      <li key={p} className="flex gap-3">
                        <span className="mt-2.5 h-1.5 w-1.5 shrink-0 rotate-45 bg-gold" aria-hidden />
                        {p}
                      </li>
                    ))}
                  </ul>
                  {link && (
                    <Link href={link.href} className="mt-3 inline-flex items-center gap-2 text-sm font-bold text-lapis hover:text-gold">
                      {link.label} <ArrowRight size={15} />
                    </Link>
                  )}
                </div>
              </article>
            ))}
          </div>

          <a href={tel} className="mt-8 flex items-center justify-center gap-3 rounded-2xl bg-lapis p-6 text-gold-pale hover:bg-lapis-light">
            <Phone size={20} />
            <span>
              Biuro parafialne: <strong className="font-display text-2xl">{site.phone}</strong>
            </span>
          </a>
        </div>
      </section>
    </>
  );
}
