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
];
