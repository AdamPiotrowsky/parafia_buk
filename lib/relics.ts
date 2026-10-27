/*
 * Relikwie w kościele farnym — lista i zdjęcia relikwiarzy z dotychczasowej strony sanktuarium-buk.pl.
 * Wizerunek świętego: plik public/images/swieci/<slug>.jpg (dopóki go nie ma, pokazujemy ozdobny zamiennik).
 */
export type Relic = {
  slug: string;
  name: string;
  life?: string;
  feast?: string;
  text: string;
  photos: string[]; // zdjęcia relikwiarza (/uploads/relikwie/...)
  href?: string;
};

export const relics: Relic[] = [
  {
    slug: "stanislaw-bm",
    name: "Św. Stanisław, biskup i męczennik",
    life: "ok. 1030 – 1079",
    feast: "8 maja",
    text: "Biskup krakowski, zabity przy ołtarzu na Skałce za upominanie króla Bolesława Śmiałego. Główny patron Polski i patron naszej parafii.",
    photos: ["/uploads/relikwie/IMG_7065_stanislawa_biskupa.jpg"],
  },
  {
    slug: "rafal-chylinski",
    name: "Bł. Rafał Chyliński",
    life: "1694 – 1741",
    feast: "2 grudnia",
    text: "Franciszkanin urodzony w Wysoczce w naszej parafii, „ojciec biedaków”. Beatyfikowany przez Jana Pawła II w 1991 roku.",
    photos: ["/uploads/relikwie/IMG_7077_ojciec_chylinski.jpg"],
    href: "/swieci/rafal-chylinski",
  },
  {
    slug: "jan-pawel-ii",
    name: "Św. Jan Paweł II",
    life: "1920 – 2005",
    feast: "22 października",
    text: "Papież z Polski, pielgrzym ewangelii na wszystkich kontynentach. Beatyfikował bł. Rafała Chylińskiego.",
    photos: ["/uploads/relikwie/IMG_7072_jan_pawel_2.jpg"],
  },
  {
    slug: "faustyna",
    name: "Św. Siostra Faustyna Kowalska",
    life: "1905 – 1938",
    feast: "5 października",
    text: "Zakonnica ze Zgromadzenia Matki Bożej Miłosierdzia, apostołka Bożego Miłosierdzia, autorka „Dzienniczka”.",
    photos: ["/uploads/relikwie/IMG_7067_siostra_faustyna.jpg"],
  },
  {
    slug: "maksymilian-kolbe",
    name: "Św. Maksymilian Maria Kolbe",
    life: "1894 – 1941",
    feast: "14 sierpnia",
    text: "Franciszkanin, założyciel Niepokalanowa. W Auschwitz oddał życie za współwięźnia, ojca rodziny.",
    photos: ["/uploads/relikwie/sw_Maksymilian_Maria_Kolbe_IMG_2249.jpg"],
  },
  {
    slug: "stanislaw-kostka",
    name: "Św. Stanisław Kostka",
    life: "1550 – 1568",
    feast: "18 września",
    text: "Młody jezuita, który pieszo wyruszył do Rzymu, by wstąpić do zakonu. Patron Polski i patron dzieci i młodzieży.",
    photos: ["/uploads/relikwie/IMG_7071_stanislaw_kostka.jpg"],
  },
  {
    slug: "ojciec-pio",
    name: "Św. Ojciec Pio z Pietrelciny",
    life: "1887 – 1968",
    feast: "23 września",
    text: "Kapucyn, stygmatyk i niestrudzony spowiednik, do którego przybywały tysiące pielgrzymów.",
    photos: ["/uploads/relikwie/IMG_7075_ojciec_pio.jpg"],
  },
  {
    slug: "rita",
    name: "Św. Rita z Cascii",
    life: "1381 – 1457",
    feast: "22 maja",
    text: "Żona, matka, a po śmierci bliskich augustianka. Wzywana jako patronka spraw trudnych i beznadziejnych.",
    photos: ["/uploads/relikwie/IMG_7079_swieta_rita.jpg"],
  },
  {
    slug: "wincenty-a-paulo",
    name: "Św. Wincenty a Paulo",
    life: "1581 – 1660",
    feast: "27 września",
    text: "Francuski kapłan, założyciel Zgromadzenia Misji i — wraz ze św. Ludwiką de Marillac — Sióstr Miłosierdzia. Patron dzieł miłosierdzia.",
    photos: ["/uploads/relikwie/IMG_1980_sw_wincenty_a_paulo.jpg", "/uploads/relikwie/sw_Wincenty_aPaulo_IMG_2251.jpg"],
  },
  {
    slug: "ludwika-de-marillac",
    name: "Św. Ludwika de Marillac",
    life: "1591 – 1660",
    text: "Współzałożycielka Sióstr Miłosierdzia (szarytek), która poświęciła życie ubogim i chorym.",
    photos: ["/uploads/relikwie/IMG_1984_sw_Ludwika_de_Marillac.jpg", "/uploads/relikwie/sw_Ludwika_de_Marillac_IMG_2253.jpg"],
  },
  {
    slug: "miriam",
    name: "Św. Miriam od Jezusa Ukrzyżowanego",
    life: "1846 – 1878",
    text: "Mariam Baouardy, zwana „Małą Arabką” — karmelitanka z Galilei i mistyczka. Na starej stronie jako błogosławiona; kanonizowana w 2015 roku.",
    photos: ["/uploads/relikwie/IMG_1982_bl_Miriam_mala_arabka.jpg"],
  },
  {
    slug: "zygmunt-felinski",
    name: "Św. Zygmunt Szczęsny Feliński",
    life: "1822 – 1895",
    feast: "17 września",
    text: "Arcybiskup warszawski, przez dwadzieścia lat zesłaniec w Jarosławiu nad Wołgą, założyciel Zgromadzenia Sióstr Franciszkanek Rodziny Maryi.",
    photos: ["/uploads/relikwie/IMG_7069_felinski.jpg"],
  },
  {
    slug: "jerzy-popieluszko",
    name: "Bł. ks. Jerzy Popiełuszko",
    life: "1947 – 1984",
    feast: "19 października",
    text: "Kapelan „Solidarności”, głosił: „Zło dobrem zwyciężaj”. Zamordowany przez funkcjonariuszy SB, beatyfikowany w 2010 roku.",
    photos: ["/uploads/relikwie/IMG_7063_jerzy_popieluszko.jpg"],
  },
  {
    slug: "stefan-wyszynski",
    name: "Bł. kard. Stefan Wyszyński",
    life: "1901 – 1981",
    feast: "28 maja",
    text: "Prymas Tysiąclecia, więziony przez władze komunistyczne. Przewodnik Kościoła w Polsce w trudnych latach. Beatyfikowany w 2021 roku.",
    photos: ["/uploads/relikwie/relikwie_blogosławionego_kardynala_stefana_wyszynskiego.jpg"],
  },
  {
    slug: "rodzina-ulmow",
    name: "Bł. Rodzina Ulmów",
    life: "zm. 1944",
    text: "Józef i Wiktoria Ulmowie z siedmiorgiem dzieci z Markowej, zamordowani przez Niemców za ukrywanie Żydów. Beatyfikowani w 2023 roku.",
    photos: ["/uploads/relikwie/relikwie_blogoslawionej_rodziny_ulmow.jpg"],
  },
  {
    slug: "maria-angela-truszkowska",
    name: "Bł. Maria Angela Truszkowska",
    life: "1825 – 1899",
    feast: "10 października",
    text: "Założycielka Zgromadzenia Sióstr św. Feliksa z Kantalicjo (felicjanek), oddanego opiece nad ubogimi i sierotami.",
    photos: ["/uploads/relikwie/IMG_7954_Maria_Angela_Truszkowska.jpg"],
  },
  {
    slug: "jozef-kut",
    name: "Bł. ks. Józef Kut",
    life: "1905 – 1942",
    text: "Kapłan, męczennik obozu w Dachau, jeden ze 108 błogosławionych męczenników II wojny światowej.",
    photos: ["/uploads/relikwie/IMG_7949_bl_Jozef_Kut.jpg"],
  },
];
