/*
 * Teksty „ramy” strony — nagłówek, menu, stopka — we wszystkich językach.
 * Polska wersja korzysta z menu z lib/site.ts, żeby nic się w niej nie zmieniło.
 */
import { mainNav, site, type NavItem } from "@/lib/site";
import { href, type Locale } from "@/lib/i18n/config";

export type DockItem = { label: string; href: string; icon: "mass" | "news" | "intentions" | "church" | "contact" };

export type Ui = {
  diocese: string;
  parishShort: string;
  sanctuary: string;
  parishFull: string;
  live: string;
  massTimes: string;
  menuOpen: string;
  menuClose: string;
  mainNavLabel: string;
  mobileNavLabel: string;
  quickNavLabel: string;
  languageLabel: string;
  facebook: string;
  nav: NavItem[];
  dock: DockItem[];
  officeHours: { days: string; hours: string }[];
  footer: {
    address: string;
    showMap: string;
    office: string;
    callHours: string;
    offerings: string;
    copyAccount: string;
    copied: string;
    logoAlt: string;
  };
  /* Informacja na stronach obcojęzycznych: bieżące treści są po polsku */
  polishOnly?: { title: string; text: string; links: { label: string; href: string }[] };
};

const polishLinks = (labels: [string, string, string]) => [
  { label: labels[0], href: "/ogloszenia" },
  { label: labels[1], href: "/intencje" },
  { label: labels[2], href: "/aktualnosci" },
];

const foreignNav = (lang: Exclude<Locale, "pl">, l: [string, string, string, string, string, string]): NavItem[] => [
  { label: l[0], href: href("/sanktuarium", lang) },
  { label: l[1], href: href("/koscioly", lang) },
  { label: l[2], href: href("/msze", lang) },
  { label: l[3], href: href("/sakramenty", lang) },
  { label: l[4], href: href("/swieci", lang) },
  { label: l[5], href: href("/kontakt", lang) },
];

const foreignDock = (lang: Exclude<Locale, "pl">, l: [string, string, string]): DockItem[] => [
  { label: l[0], href: href("/msze", lang), icon: "mass" },
  { label: l[1], href: href("/sanktuarium", lang), icon: "church" },
  { label: l[2], href: href("/kontakt", lang), icon: "contact" },
];

export const ui: Record<Locale, Ui> = {
  pl: {
    diocese: site.diocese,
    parishShort: site.parishShort,
    sanctuary: "Sanktuarium Matki Bożej Bukowskiej Literackiej",
    parishFull: site.parish,
    live: "Na żywo",
    massTimes: "Porządek Mszy Świętych",
    menuOpen: "Otwórz menu",
    menuClose: "Zamknij menu",
    mainNavLabel: "Główna nawigacja",
    mobileNavLabel: "Menu mobilne",
    quickNavLabel: "Szybki dostęp",
    languageLabel: "Język strony",
    facebook: "Parafia na Facebooku",
    nav: mainNav,
    dock: [
      { label: "Msze", href: "/msze", icon: "mass" },
      { label: "Ogłoszenia", href: "/ogloszenia", icon: "news" },
      { label: "Intencje", href: "/intencje", icon: "intentions" },
    ],
    officeHours: site.officeHours,
    footer: {
      address: "Adres",
      showMap: "Pokaż na mapie",
      office: "Biuro parafialne",
      callHours: "Dzwoń w godzinach pracy biura:",
      offerings: "Ofiary na sanktuarium",
      copyAccount: "Kopiuj numer konta",
      copied: "Skopiowano",
      logoAlt: "Logo Sanktuarium Matki Bożej Bukowskiej Literackiej",
    },
  },

  en: {
    diocese: "Archdiocese of Poznań",
    parishShort: "Parish of St. Stanislaus in Buk",
    sanctuary: "Sanctuary of Our Lady of Buk “Literacka”",
    parishFull: "Parish of St. Stanislaus, Bishop and Martyr, in Buk",
    live: "Live",
    massTimes: "Mass times",
    menuOpen: "Open menu",
    menuClose: "Close menu",
    mainNavLabel: "Main navigation",
    mobileNavLabel: "Mobile menu",
    quickNavLabel: "Quick access",
    languageLabel: "Language",
    facebook: "The parish on Facebook",
    nav: foreignNav("en", ["Sanctuary", "Churches", "Mass times", "Sacraments", "Saints", "Contact"]),
    dock: foreignDock("en", ["Masses", "Sanctuary", "Contact"]),
    officeHours: [
      { days: "Tuesday, Thursday, Friday, Saturday", hours: "9:00 – 11:00" },
      { days: "Wednesday", hours: "16:00 – 18:00" },
    ],
    footer: {
      address: "Address",
      showMap: "Show on map",
      office: "Parish office",
      callHours: "Please call during office hours:",
      offerings: "Donations to the sanctuary",
      copyAccount: "Copy account number",
      copied: "Copied",
      logoAlt: "Logo of the Sanctuary of Our Lady of Buk",
    },
    polishOnly: {
      title: "Current information in Polish",
      text: "Weekly announcements, Mass intentions and parish news are published in Polish only.",
      links: polishLinks(["Announcements", "Mass intentions", "News"]),
    },
  },

  de: {
    diocese: "Erzbistum Posen",
    parishShort: "Pfarrei St. Stanislaus in Buk",
    sanctuary: "Heiligtum der Muttergottes von Buk „Literacka“",
    parishFull: "Pfarrei St. Stanislaus, Bischof und Märtyrer, in Buk",
    live: "Live",
    massTimes: "Gottesdienstzeiten",
    menuOpen: "Menü öffnen",
    menuClose: "Menü schließen",
    mainNavLabel: "Hauptnavigation",
    mobileNavLabel: "Mobiles Menü",
    quickNavLabel: "Schnellzugriff",
    languageLabel: "Sprache",
    facebook: "Die Pfarrei auf Facebook",
    nav: foreignNav("de", ["Heiligtum", "Kirchen", "Messzeiten", "Sakramente", "Heilige", "Kontakt"]),
    dock: foreignDock("de", ["Messen", "Heiligtum", "Kontakt"]),
    officeHours: [
      { days: "Dienstag, Donnerstag, Freitag, Samstag", hours: "9:00 – 11:00" },
      { days: "Mittwoch", hours: "16:00 – 18:00" },
    ],
    footer: {
      address: "Adresse",
      showMap: "Auf der Karte zeigen",
      office: "Pfarrbüro",
      callHours: "Telefonisch zu den Bürozeiten:",
      offerings: "Spenden für das Heiligtum",
      copyAccount: "Kontonummer kopieren",
      copied: "Kopiert",
      logoAlt: "Logo des Heiligtums der Muttergottes von Buk",
    },
    polishOnly: {
      title: "Aktuelles auf Polnisch",
      text: "Wochenankündigungen, Messintentionen und Neuigkeiten aus der Pfarrei erscheinen nur auf Polnisch.",
      links: polishLinks(["Ankündigungen", "Messintentionen", "Neuigkeiten"]),
    },
  },

  es: {
    diocese: "Archidiócesis de Poznań",
    parishShort: "Parroquia de San Estanislao en Buk",
    sanctuary: "Santuario de Nuestra Señora de Buk «Literacka»",
    parishFull: "Parroquia de San Estanislao, obispo y mártir, en Buk",
    live: "En directo",
    massTimes: "Horario de misas",
    menuOpen: "Abrir menú",
    menuClose: "Cerrar menú",
    mainNavLabel: "Navegación principal",
    mobileNavLabel: "Menú móvil",
    quickNavLabel: "Acceso rápido",
    languageLabel: "Idioma",
    facebook: "La parroquia en Facebook",
    nav: foreignNav("es", ["Santuario", "Iglesias", "Horario de misas", "Sacramentos", "Santos", "Contacto"]),
    dock: foreignDock("es", ["Misas", "Santuario", "Contacto"]),
    officeHours: [
      { days: "martes, jueves, viernes, sábado", hours: "9:00 – 11:00" },
      { days: "miércoles", hours: "16:00 – 18:00" },
    ],
    footer: {
      address: "Dirección",
      showMap: "Ver en el mapa",
      office: "Despacho parroquial",
      callHours: "Llame en el horario del despacho:",
      offerings: "Donativos para el santuario",
      copyAccount: "Copiar número de cuenta",
      copied: "Copiado",
      logoAlt: "Logotipo del Santuario de Nuestra Señora de Buk",
    },
    polishOnly: {
      title: "Información actual en polaco",
      text: "Los avisos parroquiales, las intenciones de las misas y las noticias se publican solo en polaco.",
      links: polishLinks(["Avisos", "Intenciones", "Noticias"]),
    },
  },
};
