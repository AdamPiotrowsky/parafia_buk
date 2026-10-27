import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, Clock, Droplets, Flame, HandHeart, Heart, HeartHandshake } from "lucide-react";

import { PageHeader } from "@/components/page-header";
import { PhoneCta } from "@/components/phone-cta";
import { massSchedule, site } from "@/lib/site";

export const metadata: Metadata = { title: "Sakramenty" };


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
      `Telefon do biura parafialnego: ${site.phone.replace(/ /g, "\u00a0")} — w godzinach pracy biura (${site.officeHoursShort}).`,
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

export default function SakramentyPage() {
  return (
    <>
      <PageHeader
        eyebrow="Parafia św. Stanisława w Buku"
        title="Sakramenty"
        lead="Chrzest, bierzmowanie, spowiedź, namaszczenie chorych i małżeństwo — co przygotować i do kogo się zgłosić."
      />

      {/* SAKRAMENTY */}
      <section className="bg-vellum">
        <div className="mx-auto max-w-5xl px-5 py-16 lg:px-8">
          <p className="max-w-2xl text-ink-soft">W każdej sprawie pomoże biuro parafialne — osobiście, telefonicznie lub mailowo.</p>

          <div className="mt-8 space-y-4">
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

          {/* Kafelek z porządkiem Mszy */}
          <Link href="/msze" className="group mt-8 grid items-center gap-5 rounded-2xl border border-gold/40 bg-white p-6 transition hover:border-lapis/40 hover:shadow-md sm:grid-cols-[auto_1fr_auto]">
            <span className="flex h-12 w-12 items-center justify-center rounded-full bg-gold-pale text-lapis">
              <Clock size={22} strokeWidth={1.6} />
            </span>
            <span>
              <span className="block font-display text-2xl font-semibold text-lapis">Porządek Mszy Świętych</span>
              <span className="mt-1 block text-ink-soft">
                Niedziele i święta: {massSchedule.sunday.join(", ")} · dni powszednie: {massSchedule.weekday.join(", ")}
              </span>
            </span>
            <span className="inline-flex items-center gap-1 text-sm font-bold text-lapis group-hover:text-gold">
              Zobacz <ArrowRight size={15} className="transition group-hover:translate-x-1" />
            </span>
          </Link>

          <PhoneCta className="mt-4" />
        </div>
      </section>
    </>
  );
}
