export const site = {
  name: "Parafia św. Stanisława w Buku",
  /* Pierwsza, najważniejsza nazwa — potem sanktuarium */
  parishShort: "Parafia św. Stanisława w Buku",
  fullName: "Sanktuarium Matki Bożej Bukowskiej Literackiej",
  parish: "Parafia pw. św. Stanisława Biskupa i Męczennika w Buku",
  diocese: "Archidiecezja Poznańska",

  address: {
    street: "ul. Mury 30",
    city: "64-320 Buk",
  },
  phone: "61 8140 141",
  email: "parbuk@archpoznan.pl",
  bankAccount: "67 9048 0007 0025 4298 2000 0001",

  /* Krótko — przy każdym numerze telefonu do biura */
  officeHoursShort: "wt., czw., pt., sob. 9:00–11:00 · śr. 16:00–18:00",

  officeHours: [
    { days: "wtorek, czwartek, piątek, sobota", hours: "9:00 – 11:00" },
    { days: "środa", hours: "16:00 – 18:00" },
  ],

  links: {
    live: "https://www.youtube.com/@SanktuariumParafiaBuk/streams",
    facebook: "https://www.facebook.com/Parafiabuk",
    petitions:
      "https://docs.google.com/forms/d/e/1FAIpQLSeBMEkxy6iR5xzZSCaboyYwRQq-vYnhUxqbk5JS0m6LXelkKA/viewform",
    adoration:
      "https://docs.google.com/document/d/1BjJI5QpoLK8t6g1WImEvnzgNm9UyWPJuSJKQzSN-kT0/edit",
    rooms:
      "https://docs.google.com/spreadsheets/d/1uW2syCGSRjCLa-bnj94euFdiwue4nabFhDuJv35Xpu8/edit",
    map: "https://www.google.com/maps/search/?api=1&query=ul.+Mury+30,+64-320+Buk",
  },
};

export type NavLink = { label: string; href: string };
export type NavItem = NavLink & { children?: NavLink[] };

export const mainNav: NavItem[] = [
  { label: "Aktualności", href: "/aktualnosci" },
  { label: "Ogłoszenia", href: "/ogloszenia" },
  { label: "Intencje", href: "/intencje" },
  { label: "Sakramenty", href: "/sakramenty" },
  { label: "Galeria", href: "/galeria" },
  {
    label: "Parafia",
    href: "/parafia",
    children: [
      { label: "Sanktuarium", href: "/sanktuarium" },
      { label: "Kościoły", href: "/koscioly" },
      { label: "Duszpasterze", href: "/parafia/duszpasterze" },
      { label: "Wspólnoty", href: "/parafia/wspolnoty" },
      { label: "Święci", href: "/swieci" },
      { label: "Ochrona dzieci", href: "/parafia/ochrona-dzieci" },
      { label: "Grafik salek", href: "/parafia/grafik-salek" },
    ],
  },
  { label: "Kontakt", href: "/kontakt" },
];

/* Wszystkie linki menu w jednej liście (stopka, mapa strony) */
export const flatNav: NavLink[] = mainNav.flatMap((item) => (item.children ? item.children : [item]));

/*
 * Porządek Mszy Świętych.
 * W lipcu i sierpniu nie ma niedzielnej Mszy o 12:00.
 */
export const massSchedule = {
  sunday: ["7:00", "9:00", "10:30", "12:00", "18:30"],
  sundaySummer: ["7:00", "9:00", "10:30", "18:30"],
  weekday: ["7:00", "18:30"],
  holyDayOnWorkday: ["7:00", "10:30", "18:30"],
};
