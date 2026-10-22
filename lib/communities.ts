/*
 * Wspólnoty parafialne — opisy na podstawie dotychczasowej strony sanktuarium-buk.pl.
 * Wspólnoty bez opisu na starej stronie mają tylko nazwę i zaproszenie do kontaktu.
 */
export type Community = {
  slug: string;
  name: string;
  group: "modlitwa" | "posługa" | "dzieci i młodzież" | "formacja";
  since?: string;
  meetings?: string;
  summary?: string;
  details?: string[];
  contact?: string;
};

export const communities: Community[] = [
  {
    slug: "czciciele-mbbl",
    name: "Czciciele Matki Bożej Bukowskiej Literackiej",
    group: "modlitwa",
    since: "2009",
    meetings: "co najmniej raz w miesiącu",
    summary:
      "Wspólnota powstała w 2009 roku jako „Bractwo Literackie”, by przywrócić farze tytuł sanktuarium i doprowadzić do koronacji cudownego obrazu. Oba cele zostały osiągnięte — w 2015 i 2017 roku.",
    details: [
      "Wydała reprint manuskryptu ks. Stanisława Kuliszaka o dziejach obrazu (1934) oraz obrazki z wizerunkiem Matki Bożej.",
      "Zeskanowała kronikę parafialną prowadzoną w latach 1958–1982 przez ks. inf. Teofila Ratajczaka.",
      "Sprowadziła do fary relikwie św. Jana Pawła II i św. Stanisława Biskupa i Męczennika.",
    ],
  },
  {
    slug: "rafal-chylinski",
    name: "Grupa bł. Ojca Rafała Chylińskiego",
    group: "modlitwa",
    since: "2016",
    meetings: "trzeci wtorek miesiąca, po wieczornej Mszy Świętej",
    summary:
      "Grupa modlitewna założona 2 grudnia 2016 roku, w 275. rocznicę śmierci bł. o. Rafała — franciszkanina urodzonego w Wysoczce, w bukowskiej parafii. Motto: „Takiego wzoru nam potrzeba i takiego wstawiennictwa zapragnęliśmy”.",
    details: [
      "Co roku 9 czerwca, w rocznicę beatyfikacji, z fary do Wysoczki wyrusza pielgrzymka z relikwiami bł. o. Rafała.",
      "Na spotkaniach poznajemy życie błogosławionego i modlimy się litanią, nowenną i modlitwą za jego wstawiennictwem.",
    ],
  },
  {
    slug: "zywy-rozaniec",
    name: "Żywy Różaniec",
    group: "modlitwa",
    summary: "Róże różańcowe, w których każdy codziennie odmawia jedną dziesiątkę — razem cały różaniec w intencjach Kościoła i parafii.",
  },
  {
    slug: "rozaniec-rodzicow",
    name: "Różaniec Rodziców",
    group: "modlitwa",
    since: "2001",
    summary:
      "Rodzice codziennie odmawiają jedną dziesiątkę różańca w intencji swoich dzieci i wszystkich dzieci z róży. Dwadzieścia osób tworzy jedną różę — w Buku działa ich 22.",
    details: [
      "Bez spotkań — dziesiątkę można odmówić w dowolnym miejscu i czasie, zajmuje około 5 minut.",
      "Modlitwą obejmowane są dzieci rodzone i adoptowane, synowe i zięciowie, chrześniacy i dzieci jeszcze nienarodzone.",
    ],
    contact: "Zapisy w biurze parafialnym lub mailowo: kasikwieczorek@gmail.com",
  },
  {
    slug: "krucjata-rodzin",
    name: "Krucjata Rodzin",
    group: "modlitwa",
    since: "2011",
    summary:
      "Otwarta wspólnota modlitwy w domu w intencji małżeństw i rodzin, zrzeszająca wiernych z Buku i Niepruszewa — za wstawiennictwem Matki Bożej Bukowskiej Literackiej, św. Wawrzyńca, św. Rity, św. Józefa, św. Jana Pawła II, św. Stanisława i bł. o. Rafała Chylińskiego.",
    details: ["W wyznaczonym dniu uczestnicy podejmują post, odmawiają cztery części różańca i ofiarują Mszę i Komunię Świętą."],
  },
  {
    slug: "grupa-ojca-pio",
    name: "Grupa Ojca Pio",
    group: "modlitwa",
  },
  {
    slug: "apostolat-milosierdzia",
    name: "Apostolat Miłosierdzia",
    group: "modlitwa",
  },
  {
    slug: "przymierze-milosierdzia",
    name: "Przymierze Miłosierdzia",
    group: "formacja",
    summary:
      "Stowarzyszenie wiernych założone w 2000 roku w Brazylii, obecne także w Polsce. Jego charyzmatem jest ewangelizacja i dzieła miłosierdzia wobec najuboższych — materialnie i duchowo.",
  },
  {
    slug: "grupa-biblijna",
    name: "Grupa biblijna",
    group: "formacja",
    since: "2003",
    meetings: "co tydzień, po Mszy Świętej",
    summary:
      "Czytamy i rozważamy Słowo Boże we wspólnocie, dzielimy się świadectwem i modlimy się o dar wiary. W spotkaniach uczestniczy około 15 osób.",
  },
  {
    slug: "ikonopisarze",
    name: "Wspólnota Ikonopisarzy",
    group: "formacja",
    since: "2015",
    summary:
      "Ludzie, którzy przez pisanie ikon poszukują Bożego Oblicza — przy Pracowni Ikon Serca Jezusowego. Pracownia organizuje wystawy i aukcje charytatywne, rekolekcje i warsztaty.",
    contact: "„Zapraszamy wszystkich do naszej wspólnoty. I Ty zostań Ikonopisarzem.”",
  },
  {
    slug: "akcja-katolicka",
    name: "Akcja Katolicka",
    group: "formacja",
  },
  {
    slug: "caritas",
    name: "Caritas",
    group: "posługa",
  },
  {
    slug: "chorek",
    name: "Chórek parafialny",
    group: "posługa",
  },
  {
    slug: "ministranci",
    name: "Ministranci",
    group: "dzieci i młodzież",
    summary:
      "„Ministrant” pochodzi od łacińskiego ministrare — służyć. Ministranci posługują kapłanowi przy ołtarzu podczas Mszy Świętej i nabożeństw; to wielkie wyróżnienie i zaszczyt.",
  },
  {
    slug: "sdim",
    name: "Stowarzyszenie Dzieci i Młodzieży Maryjnej",
    group: "dzieci i młodzież",
  },
  {
    slug: "bierzmowani",
    name: "Bierzmowani",
    group: "dzieci i młodzież",
    summary: "Młodzież przygotowująca się do sakramentu bierzmowania. Wszystkie informacje podajemy w ogłoszeniach parafialnych.",
  },
];

export const communityGroups: { id: Community["group"]; label: string }[] = [
  { id: "modlitwa", label: "Wspólnoty modlitwy" },
  { id: "formacja", label: "Formacja i Słowo Boże" },
  { id: "posługa", label: "Posługa i śpiew" },
  { id: "dzieci i młodzież", label: "Dzieci i młodzież" },
];
