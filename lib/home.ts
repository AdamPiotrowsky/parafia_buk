import {
  CalendarDays,
  Flame,
  HeartHandshake,
  Megaphone,
  Phone,
  Radio,
  ScrollText,
  Sparkles,
  type LucideIcon,
} from "lucide-react";

import { churches } from "@/lib/history";
import type { Locale } from "@/lib/i18n/config";
import { site } from "@/lib/site";

export type Shortcut = {
  title: string;
  hint: string;
  href: string;
  icon: LucideIcon;
  external?: boolean;
};

/* Najczęściej potrzebne rzeczy — wspólne dla wszystkich wariantów strony głównej */
export const shortcuts: Shortcut[] = [
  { title: "Ogłoszenia", hint: "Na ten tydzień", href: "/ogloszenia", icon: Megaphone },
  { title: "Intencje", hint: "Msze w intencjach", href: "/intencje", icon: ScrollText },
  { title: "Święci", hint: "Patroni i święci naszej parafii", href: "/swieci", icon: Sparkles },
  { title: "Transmisja", hint: "Na żywo z fary", href: site.links.live, icon: Radio, external: true },
  { title: "Spowiedź święta", hint: "Sakrament pojednania", href: "/sakramenty#pojednanie", icon: HeartHandshake },
  { title: "Bierzmowanie", hint: "Dla kandydatów i rodziców", href: "/bierzmowanie", icon: Flame },
  { title: "Biuro parafialne", hint: "Godziny i kontakt", href: "/kontakt", icon: Phone },
  { title: "Grafik salek", hint: "Dla wspólnot", href: "/parafia/grafik-salek", icon: CalendarDays },
];

export const keyYears = [
  { year: "1430", text: "pierwsza wzmianka" },
  { year: "1698", text: "ogłoszony cudownym" },
  { year: "1781", text: "bulla Piusa VI" },
  { year: "1945", text: "spłonął w pożarze" },
  { year: "2017", text: "koronacja" },
];

/* Propozycje układu strony głównej do pokazania proboszczowi */
export const variants = [
  {
    id: 1,
    href: "/sg1",
    image: "/images/fara-oltarz.jpg",
    name: "Iluminacja",
    text: "Ołtarz fary w tle z powolnym przybliżaniem, panel „na skróty”, historia obrazu i przelot drona nad farą.",
  },
  {
    id: 4,
    href: "/sg4",
    image: "/images/swiety-krzyz-zewnatrz.jpg",
    name: "Opowieść",
    text: "Wyraźny ołtarz z granatową tablicą parafii i sanktuarium, dalej zdjęcia przewijane jak album — obraz, oba kościoły i ich historia.",
  },
  {
    id: 5,
    href: "/sg5",
    image: "/images/fara-oltarz.jpg",
    name: "Biel i złoto",
    text: "Jasna, biała strona — ołtarz fary w dużym łukowym oknie jak w prezbiterium, pod nim najbliższa Msza i święty dnia.",
  },
  {
    id: 7,
    href: "/sg7",
    image: "/images/fara-oltarz.jpg",
    name: "Biel i granat",
    text: "Nazwy parafii i sanktuarium na granatowym niebie, pod nimi wyraźny ołtarz w łukowym oknie przechodzący na białe tło.",
  },
  {
    id: 9,
    href: "/sg9",
    image: "/images/fara-oltarz.jpg",
    name: "Tablica",
    text: "Ołtarz na całą szerokość przechodzący w granat, a na nim granatowa tablica: parafia, sanktuarium i najbliższa Msza.",
  },
  {
    id: 10,
    href: "/sg10",
    image: "/images/fara-oltarz-ostre.jpg",
    name: "Opowieść z panelem",
    text: "Góra z „Opowieści” — wyraźny ołtarz z granatową tablicą parafii i sanktuarium — a pod nią panel na skróty z „Iluminacji”: ogłoszenia, intencje, transmisja, spowiedź i reszta.",
  },
];

/* Teksty wspólnego układu strony głównej (components/home/home-layout.tsx) w jednym języku */
export type HomeTexts = {
  lang: Locale;
  hero: { diocese: string; parish: [string, string]; sanctuary: [string, string] };
  shortcuts: Shortcut[];
  masses: {
    title: string;
    sunday: string;
    weekday: string;
    note?: string;
    officeLabel: string;
    full: string;
    fullHref: string;
  };
  image: {
    eyebrow: string;
    title: string;
    paragraphs: string[];
    alt: string;
    caption: string;
    keyYears: { year: string; text: string }[];
    link: string;
    linkHref: string;
  };
  video: { eyebrow: string; title: string; link: string; href: string; label: string };
  churches: {
    eyebrow: string;
    title: string;
    link: string;
    href: string;
    items: Record<"fara" | "swiety-krzyz", { name: string; subtitle: string; intro: string }>;
  };
};

const [faraPl, krzyzPl] = churches;

export const plHome: HomeTexts = {
  lang: "pl",
  hero: {
    diocese: site.diocese,
    parish: ["Parafia św. Stanisława", "w Buku"],
    sanctuary: ["Sanktuarium Matki Bożej", "Bukowskiej Literackiej"],
  },
  shortcuts,
  masses: {
    title: "Msze Święte",
    sunday: "Niedziele i święta",
    weekday: "Dni powszednie",
    officeLabel: "Biuro parafialne",
    full: "Pełny porządek",
    fullHref: "/msze",
  },
  image: {
    eyebrow: "Historia obrazu",
    title: "Hodegetria z księgą w dłoni Dzieciątka",
    paragraphs: [
      "Maryja trzyma Jezusa na lewym ramieniu. Dzieciątko jedną ręką błogosławi, w drugiej trzyma grubą księgę — znak literatów, dawnych bractw, które śpiewały w kościele godzinki. Aniołowie zamiast kadzielnic niosą wstęgi z napisami „Wesel się, Królowo miła” i „Zdrowaś Maryjo”.",
      "Ks. prof. Szczęsny Dettloff, który odnawiał obraz w 1933 roku, pisał, że takiej Hodegetrii poza Polską nie znajdziemy nigdzie.",
    ],
    alt: "Matka Boża Bukowska Literacka",
    caption: "Wizerunek w ołtarzu głównym fary",
    keyYears,
    link: "Poznaj całą historię",
    linkHref: "/sanktuarium#historia",
  },
  video: {
    eyebrow: "Fara z lotu ptaka",
    title: "Kościół św. Stanisława — serce Buku od XIII wieku",
    link: "Historia fary",
    href: "/koscioly#fara",
    label: "Przelot drona wokół kościoła farnego w Buku",
  },
  churches: {
    eyebrow: "Dwa kościoły, jedna parafia",
    title: "Nasze świątynie",
    link: "Historia kościoła",
    href: "/koscioly",
    items: {
      fara: { name: faraPl.name, subtitle: faraPl.subtitle, intro: faraPl.intro },
      "swiety-krzyz": { name: krzyzPl.name, subtitle: krzyzPl.subtitle, intro: krzyzPl.intro },
    },
  },
};
