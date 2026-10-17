import {
  CalendarDays,
  Clock,
  Flame,
  HandHeart,
  Megaphone,
  Phone,
  Radio,
  ScrollText,
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
  { title: "Msze Święte", hint: "Porządek nabożeństw", href: "/msze", icon: Clock },
  { title: "Transmisja", hint: "Na żywo z fary", href: site.links.live, icon: Radio, external: true },
  { title: "Prośby i podziękowania", hint: "Do Matki Bożej", href: site.links.petitions, icon: HandHeart, external: true },
  { title: "Adoracja", hint: "Zapisz się na godzinę", href: site.links.adoration, icon: Flame, external: true },
  { title: "Kancelaria", hint: "Godziny i kontakt", href: "/kontakt", icon: Phone },
  { title: "Grafik salek", hint: "Dla wspólnot", href: site.links.rooms, icon: CalendarDays, external: true },
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
    id: 2,
    href: "/sg2",
    image: "/images/obraz-mbbl.jpg",
    name: "Tryptyk",
    text: "Jak ołtarz skrzydłowy: po lewej wysuwa się obraz Matki Bożej, po prawej kościół — w środku najważniejsze informacje.",
  },
  {
    id: 3,
    href: "/sg3",
    image: "/images/fara-front.jpg",
    name: "Dziś w parafii",
    text: "Praktyczny pulpit: najbliższa Msza, święty dnia, ogłoszenia i intencje od razu na pierwszym ekranie. Duże, czytelne litery.",
  },
  {
    id: 4,
    href: "/sg4",
    image: "/images/swiety-krzyz-zewnatrz.jpg",
    name: "Opowieść",
    text: "Pełnoekranowe zdjęcia przewijane jak album — od ołtarza, przez obraz, po oba kościoły i ich historię.",
  },
  {
    id: 5,
    href: "/sg5",
    image: "/images/swiety-krzyz-wnetrze.jpg",
    name: "Księga",
    text: "Nawiązanie do „Literackiej”: strona jak otwarta, iluminowana księga — po lewej obraz i jego dzieje, po prawej kalendarz dnia i spis treści.",
  },
  {
    id: 6,
    href: "/sg6",
    image: "/images/fara-z-lotu.jpg",
    name: "Jasna",
    text: "Nowocześnie i lekko: jasna siatka kafelków ze zdjęciami, filmem z drona i najważniejszymi informacjami — wszystko widać od razu.",
  },
];
