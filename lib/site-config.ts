export type NavigationItem = {
  label: string;
  href?: string;
  children?: {
    label: string;
    href: string;
  }[];
};

export const siteConfig = {
  name: "Sanktuarium w Buku",

  fullName: "Sanktuarium Matki Bożej Bukowskiej Literackiej",

  parishName: "Parafia pw. św. Stanisława Biskupa w Buku",

  navigation: [
    {
      label: "Ogłoszenia",
      href: "/ogloszenia",
    },
    {
      label: "Intencje",
      href: "/intencje",
    },

    {
      label: "Sanktuarium",
      children: [
        {
          label: "O Sanktuarium",
          href: "/sanktuarium",
        },
        {
          label: "Historia Sanktuarium",
          href: "/sanktuarium/historia",
        },
        {
          label: "Matka Boża Bukowska Literacka",
          href: "/sanktuarium/matka-boza-bukowska",
        },
        {
          label: "Historia obrazu",
          href: "/sanktuarium/historia-obrazu",
        },
        {
          label: "Relikwie",
          href: "/sanktuarium/relikwie",
        },
        {
          label: "Patroni",
          href: "/sanktuarium/patroni",
        },
      ],
    },

    {
      label: "Parafia",
      children: [
        {
          label: "O parafii",
          href: "/parafia",
        },
        {
          label: "Historia parafii",
          href: "/parafia/historia",
        },
        {
          label: "Nasze kościoły",
          href: "/parafia/koscioly",
        },
        {
          label: "Duszpasterze",
          href: "/parafia/duszpasterze",
        },
        {
          label: "Msze i nabożeństwa",
          href: "/parafia/msze",
        },
        {
          label: "Biuro parafialne",
          href: "/parafia/biuro-parafialne",
        },
        {
          label: "Sakramenty",
          href: "/parafia/sakramenty",
        },
        {
          label: "Plan kolędy",
          href: "/parafia/koleda",
        },
        {
          label: "Ochrona dzieci i młodzieży",
          href: "/parafia/ochrona-dzieci",
        },
      ],
    },

    {
      label: "Wspólnota",
      children: [
        {
          label: "Nasza wspólnota",
          href: "/wspolnota",
        },
        {
          label: "Wspólnoty parafialne",
          href: "/wspolnota/grupy",
        },
        {
          label: "Bierzmowanie",
          href: "/wspolnota/bierzmowanie",
        },
        {
          label: "Ministranci",
          href: "/wspolnota/ministranci",
        },
        {
          label: "Schola i chór",
          href: "/wspolnota/schola",
        },
      ],
    },

    {
      label: "Galeria",
      href: "/galeria",
    },

    {
      label: "Kontakt",
      href: "/kontakt",
    },
  ] satisfies NavigationItem[],
};