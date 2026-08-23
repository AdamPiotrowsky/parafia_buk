import Link from "next/link";
import {
  ArrowRight,
  Camera,
  Church,
  Clock3,
  Megaphone,
  Radio,
} from "lucide-react";

const quickLinks = [
  {
    title: "Kamera online",
    description: "Transmisja na żywo z Sanktuarium w Buku.",
    href: "/kamera",
    icon: Radio,
    important: true,
  },
  {
    title: "Ogłoszenia",
    description: "Aktualne ogłoszenia parafialne.",
    href: "/ogloszenia",
    icon: Megaphone,
    important: true,
  },
  {
    title: "Intencje",
    description: "Intencje mszalne na najbliższe dni.",
    href: "/intencje",
    icon: Church,
    important: false,
  },
  {
    title: "Msze Święte",
    description: "Godziny Mszy Świętych i nabożeństw.",
    href: "/parafia/msze",
    icon: Clock3,
    important: false,
  },
];

export default function HomePage() {
  return (
    <>
      {/* HERO */}
      <section className="relative overflow-hidden bg-stone-950">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(217,119,6,0.18),transparent_45%)]" />

        <div className="relative mx-auto max-w-7xl px-5 py-24 sm:py-32 lg:px-8 lg:py-40">
          <div className="max-w-4xl">
            <p className="mb-5 text-sm font-semibold uppercase tracking-[0.25em] text-amber-400">
              Buk • Wielkopolska
            </p>

            <h1 className="max-w-4xl text-4xl font-semibold tracking-tight text-white sm:text-5xl lg:text-6xl">
              Sanktuarium Matki Bożej Bukowskiej Literackiej
            </h1>

            <p className="mt-6 max-w-2xl text-lg leading-8 text-stone-300">
              Parafia pw. św. Stanisława Biskupa w Buku.
              Aktualności, ogłoszenia, intencje, transmisje
              oraz historia naszej parafii i Sanktuarium.
            </p>

            <div className="mt-9 flex flex-wrap gap-3">
              <Link
                href="/ogloszenia"
                className="
                  group inline-flex items-center gap-2
                  rounded-full bg-white px-6 py-3
                  text-sm font-semibold text-stone-950
                  transition-all duration-300
                  hover:-translate-y-0.5 hover:bg-amber-50
                  hover:shadow-lg
                "
              >
                Najnowsze ogłoszenia

                <ArrowRight
                  size={17}
                  className="transition-transform duration-300 group-hover:translate-x-1"
                />
              </Link>

              <Link
                href="/kamera"
                className="
                  group inline-flex items-center gap-2
                  rounded-full border border-white/30
                  px-6 py-3 text-sm font-semibold text-white
                  transition-all duration-300
                  hover:-translate-y-0.5 hover:border-white/50
                  hover:bg-white/10
                "
              >
                <span className="relative flex h-2.5 w-2.5">
                  <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-red-400 opacity-75" />

                  <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-red-500" />
                </span>

                Kamera online
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* NAJWAŻNIEJSZE LINKI */}
      <section className="relative bg-stone-100">
        <div className="mx-auto max-w-7xl px-5 py-12 lg:px-8 lg:py-16">
          <div className="mb-8">
            <p className="text-sm font-semibold uppercase tracking-widest text-amber-800">
              Na skróty
            </p>

            <h2 className="mt-2 text-2xl font-semibold tracking-tight text-stone-950 sm:text-3xl">
              Najważniejsze informacje
            </h2>
          </div>

          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {quickLinks.map((item) => {
              const Icon = item.icon;

              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`
                    group relative overflow-hidden rounded-2xl
                    border p-6
                    transition-all duration-300
                    hover:-translate-y-1 hover:shadow-xl
                    ${
                      item.important
                        ? "border-amber-200 bg-amber-50"
                        : "border-stone-200 bg-white"
                    }
                  `}
                >
                  <div
                    className={`
                      mb-6 flex h-12 w-12 items-center
                      justify-center rounded-xl
                      transition-all duration-300
                      group-hover:scale-110
                      ${
                        item.href === "/kamera"
                          ? "bg-red-100 text-red-700"
                          : item.important
                          ? "bg-amber-100 text-amber-800"
                          : "bg-stone-100 text-stone-700"
                      }
                    `}
                  >
                    <Icon size={22} />
                  </div>

                  <h3
                    className="
                      text-lg font-semibold text-stone-900
                      transition-colors duration-300
                      group-hover:text-amber-800
                    "
                  >
                    {item.title}
                  </h3>

                  <p className="mt-2 text-sm leading-6 text-stone-500">
                    {item.description}
                  </p>

                  <div
                    className="
                      mt-6 flex items-center gap-1
                      text-sm font-semibold text-stone-700
                      transition-colors
                      group-hover:text-amber-800
                    "
                  >
                    Zobacz

                    <ArrowRight
                      size={15}
                      className="
                        transition-transform duration-300
                        group-hover:translate-x-1
                      "
                    />
                  </div>
                </Link>
              );
            })}
          </div>
        </div>
      </section>

      {/* AKTUALNOŚCI */}
      <section className="bg-white">
        <div className="mx-auto max-w-7xl px-5 py-20 lg:px-8">
          <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
            <div>
              <p className="text-sm font-semibold uppercase tracking-widest text-amber-800">
                Życie parafii
              </p>

              <h2 className="mt-2 text-3xl font-semibold tracking-tight text-stone-950">
                Aktualności
              </h2>
            </div>

            <Link
              href="/aktualnosci"
              className="
                group flex items-center gap-2
                text-sm font-semibold text-stone-600
                transition-colors hover:text-amber-800
              "
            >
              Wszystkie aktualności

              <ArrowRight
                size={16}
                className="transition-transform group-hover:translate-x-1"
              />
            </Link>
          </div>

          <div className="mt-10 grid gap-6 md:grid-cols-3">
            {[1, 2, 3].map((item) => (
              <div
                key={item}
                className="
                  group overflow-hidden rounded-2xl
                  border border-stone-200 bg-white
                  transition-all duration-300
                  hover:-translate-y-1 hover:shadow-lg
                "
              >
                <div className="aspect-[16/10] bg-stone-200" />

                <div className="p-6">
                  <p className="text-xs font-semibold uppercase tracking-wider text-amber-800">
                    Aktualności
                  </p>

                  <h3 className="mt-2 text-lg font-semibold text-stone-900">
                    Tutaj pojawi się aktualność
                  </h3>

                  <p className="mt-3 text-sm leading-6 text-stone-500">
                    Treści aktualności podłączymy później do bazy danych.
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* SANKTUARIUM */}
      <section className="bg-stone-950 text-white">
        <div className="mx-auto grid max-w-7xl gap-12 px-5 py-20 lg:grid-cols-2 lg:items-center lg:px-8">
          <div>
            <p className="text-sm font-semibold uppercase tracking-widest text-amber-400">
              Poznaj nasze Sanktuarium
            </p>

            <h2 className="mt-3 text-3xl font-semibold tracking-tight sm:text-4xl">
              Miejsce wiary, historii i tradycji
            </h2>

            <p className="mt-6 max-w-xl leading-7 text-stone-400">
              Poznaj historię Sanktuarium, obraz Matki Bożej
              Bukowskiej Literackiej, relikwie oraz dzieje
              bukowskich kościołów.
            </p>

            <Link
              href="/sanktuarium"
              className="
                group mt-8 inline-flex items-center gap-2
                rounded-full bg-white px-6 py-3
                text-sm font-semibold text-stone-950
                transition-all duration-300
                hover:-translate-y-0.5 hover:bg-amber-50
              "
            >
              Poznaj Sanktuarium

              <ArrowRight
                size={16}
                className="transition-transform group-hover:translate-x-1"
              />
            </Link>
          </div>

          <div className="flex aspect-[4/3] items-center justify-center rounded-3xl bg-stone-900">
            <div className="text-center text-stone-500">
              <Camera size={42} className="mx-auto" />

              <p className="mt-4 text-sm">
                Tutaj dodamy zdjęcie Sanktuarium
              </p>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}