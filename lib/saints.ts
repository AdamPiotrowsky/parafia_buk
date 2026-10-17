/*
 * Kalendarz świętych o stałych datach (kalendarz liturgiczny Kościoła w Polsce):
 * uroczystości, święta, wspomnienia obowiązkowe i kilka szczególnie
 * bliskich parafii wspomnień dowolnych.
 *
 * Klucz: "MM-DD".
 */

export type Rank = "uroczystość" | "święto" | "wspomnienie" | "wspomnienie dowolne";

export type CalendarEntry = {
  name: string;
  rank: Rank;
  /** Krótka notka, gdy dzień ma szczególny związek z Bukiem. */
  local?: string;
};

export const saintsCalendar: Record<string, CalendarEntry> = {
  "01-01": { name: "Świętej Bożej Rodzicielki Maryi", rank: "uroczystość" },
  "01-02": { name: "Świętych Bazylego Wielkiego i Grzegorza z Nazjanzu", rank: "wspomnienie" },
  "01-06": { name: "Objawienie Pańskie", rank: "uroczystość" },
  "01-17": { name: "Św. Antoniego, opata", rank: "wspomnienie" },
  "01-21": { name: "Św. Agnieszki, dziewicy i męczennicy", rank: "wspomnienie" },
  "01-24": { name: "Św. Franciszka Salezego", rank: "wspomnienie" },
  "01-25": { name: "Nawrócenie św. Pawła Apostoła", rank: "święto" },
  "01-26": { name: "Świętych Tymoteusza i Tytusa", rank: "wspomnienie" },
  "01-28": { name: "Św. Tomasza z Akwinu", rank: "wspomnienie" },
  "01-31": { name: "Św. Jana Bosko", rank: "wspomnienie" },

  "02-02": { name: "Ofiarowanie Pańskie (Matki Bożej Gromnicznej)", rank: "święto" },
  "02-03": { name: "Św. Błażeja, biskupa i męczennika", rank: "wspomnienie dowolne" },
  "02-05": { name: "Św. Agaty, dziewicy i męczennicy", rank: "wspomnienie" },
  "02-06": { name: "Świętych Pawła Miki i Towarzyszy", rank: "wspomnienie" },
  "02-10": { name: "Św. Scholastyki", rank: "wspomnienie" },
  "02-11": { name: "Najświętszej Maryi Panny z Lourdes", rank: "wspomnienie dowolne" },
  "02-14": { name: "Świętych Cyryla i Metodego, patronów Europy", rank: "święto" },
  "02-22": { name: "Katedry św. Piotra Apostoła", rank: "święto" },
  "02-23": { name: "Św. Polikarpa", rank: "wspomnienie" },

  "03-04": { name: "Św. Kazimierza, królewicza", rank: "święto" },
  "03-07": { name: "Świętych Perpetuy i Felicyty", rank: "wspomnienie" },
  "03-19": { name: "Św. Józefa, Oblubieńca NMP", rank: "uroczystość" },
  "03-25": { name: "Zwiastowanie Pańskie", rank: "uroczystość" },

  "04-23": {
    name: "Św. Wojciecha, biskupa i męczennika, głównego patrona Polski",
    rank: "uroczystość",
    local: "Sceny z jego życia zdobią ściany drewnianego kościoła św. Krzyża.",
  },
  "04-25": { name: "Św. Marka, Ewangelisty", rank: "święto" },
  "04-29": { name: "Św. Katarzyny Sieneńskiej, patronki Europy", rank: "święto" },

  "05-01": { name: "Św. Józefa, Rzemieślnika", rank: "wspomnienie dowolne" },
  "05-02": { name: "Św. Atanazego", rank: "wspomnienie" },
  "05-03": { name: "Najświętszej Maryi Panny, Królowej Polski", rank: "uroczystość" },
  "05-06": { name: "Świętych Apostołów Filipa i Jakuba", rank: "święto" },
  "05-08": {
    name: "Św. Stanisława, biskupa i męczennika, głównego patrona Polski",
    rank: "uroczystość",
    local: "Patron naszej parafii i kościoła farnego — odpust parafialny.",
  },
  "05-14": { name: "Św. Macieja Apostoła", rank: "święto" },
  "05-16": { name: "Św. Andrzeja Boboli, patrona Polski", rank: "święto" },
  "05-26": { name: "Św. Filipa Nereusza", rank: "wspomnienie" },
  "05-31": {
    name: "Nawiedzenie Najświętszej Maryi Panny",
    rank: "święto",
    local: "Odpust zupełny przy ołtarzu Matki Bożej Bukowskiej (bulla Piusa VI, 1781).",
  },

  "06-01": { name: "Św. Justyna, męczennika", rank: "wspomnienie" },
  "06-03": { name: "Świętych Karola Lwangi i Towarzyszy", rank: "wspomnienie" },
  "06-05": { name: "Św. Bonifacego", rank: "wspomnienie" },
  "06-11": { name: "Św. Barnaby Apostoła", rank: "wspomnienie" },
  "06-12": { name: "Błogosławionych 108 męczenników II wojny światowej", rank: "wspomnienie" },
  "06-13": { name: "Św. Antoniego z Padwy", rank: "wspomnienie" },
  "06-21": { name: "Św. Alojzego Gonzagi", rank: "wspomnienie" },
  "06-24": { name: "Narodzenie św. Jana Chrzciciela", rank: "uroczystość" },
  "06-28": { name: "Św. Ireneusza", rank: "wspomnienie" },
  "06-29": { name: "Świętych Apostołów Piotra i Pawła", rank: "uroczystość" },

  "07-03": { name: "Św. Tomasza Apostoła", rank: "święto" },
  "07-11": { name: "Św. Benedykta, opata, patrona Europy", rank: "święto" },
  "07-15": { name: "Św. Bonawentury", rank: "wspomnienie" },
  "07-16": { name: "Najświętszej Maryi Panny z Góry Karmel", rank: "wspomnienie dowolne" },
  "07-22": { name: "Św. Marii Magdaleny", rank: "święto" },
  "07-23": { name: "Św. Brygidy, patronki Europy", rank: "święto" },
  "07-25": { name: "Św. Jakuba Apostoła", rank: "święto" },
  "07-26": { name: "Świętych Joachima i Anny, rodziców NMP", rank: "wspomnienie" },
  "07-29": { name: "Świętych Marty, Marii i Łazarza", rank: "wspomnienie" },
  "07-31": { name: "Św. Ignacego z Loyoli", rank: "wspomnienie" },

  "08-01": { name: "Św. Alfonsa Marii Liguoriego", rank: "wspomnienie" },
  "08-04": { name: "Św. Jana Marii Vianneya", rank: "wspomnienie" },
  "08-06": { name: "Przemienienie Pańskie", rank: "święto" },
  "08-08": { name: "Św. Dominika", rank: "wspomnienie" },
  "08-09": { name: "Św. Teresy Benedykty od Krzyża, patronki Europy", rank: "święto" },
  "08-10": { name: "Św. Wawrzyńca, diakona i męczennika", rank: "święto" },
  "08-11": { name: "Św. Klary", rank: "wspomnienie" },
  "08-14": { name: "Św. Maksymiliana Marii Kolbego", rank: "wspomnienie" },
  "08-15": { name: "Wniebowzięcie Najświętszej Maryi Panny", rank: "uroczystość" },
  "08-20": { name: "Św. Bernarda", rank: "wspomnienie" },
  "08-22": { name: "Najświętszej Maryi Panny Królowej", rank: "wspomnienie" },
  "08-24": { name: "Św. Bartłomieja Apostoła", rank: "święto" },
  "08-26": { name: "Najświętszej Maryi Panny Częstochowskiej", rank: "uroczystość" },
  "08-27": { name: "Św. Moniki", rank: "wspomnienie" },
  "08-28": { name: "Św. Augustyna", rank: "wspomnienie" },
  "08-29": { name: "Męczeństwo św. Jana Chrzciciela", rank: "wspomnienie" },

  "09-03": { name: "Św. Grzegorza Wielkiego", rank: "wspomnienie" },
  "09-08": {
    name: "Narodzenie Najświętszej Maryi Panny",
    rank: "święto",
    local: "Główny odpust w Sanktuarium Matki Bożej Bukowskiej Literackiej.",
  },
  "09-13": { name: "Św. Jana Chryzostoma", rank: "wspomnienie" },
  "09-14": {
    name: "Podwyższenie Krzyża Świętego",
    rank: "święto",
    local: "Święto tytułu naszego zabytkowego kościoła św. Krzyża.",
  },
  "09-15": { name: "Najświętszej Maryi Panny Bolesnej", rank: "wspomnienie" },
  "09-16": { name: "Świętych Korneliusza i Cypriana", rank: "wspomnienie" },
  "09-18": { name: "Św. Stanisława Kostki, patrona Polski", rank: "święto" },
  "09-21": { name: "Św. Mateusza, Apostoła i Ewangelisty", rank: "święto" },
  "09-23": { name: "Św. Pio z Pietrelciny", rank: "wspomnienie" },
  "09-27": { name: "Św. Wincentego a Paulo", rank: "wspomnienie" },
  "09-29": { name: "Świętych Archaniołów Michała, Gabriela i Rafała", rank: "święto" },
  "09-30": { name: "Św. Hieronima", rank: "wspomnienie" },

  "10-01": { name: "Św. Teresy od Dzieciątka Jezus", rank: "wspomnienie" },
  "10-02": { name: "Świętych Aniołów Stróżów", rank: "wspomnienie" },
  "10-04": { name: "Św. Franciszka z Asyżu", rank: "wspomnienie" },
  "10-05": { name: "Św. Faustyny Kowalskiej", rank: "wspomnienie dowolne" },
  "10-07": { name: "Najświętszej Maryi Panny Różańcowej", rank: "wspomnienie" },
  "10-15": { name: "Św. Teresy od Jezusa", rank: "wspomnienie" },
  "10-17": { name: "Św. Ignacego Antiocheńskiego", rank: "wspomnienie" },
  "10-18": { name: "Św. Łukasza Ewangelisty", rank: "święto" },
  "10-22": { name: "Św. Jana Pawła II, papieża", rank: "wspomnienie" },
  "10-28": { name: "Świętych Apostołów Szymona i Judy Tadeusza", rank: "święto" },

  "11-01": { name: "Wszystkich Świętych", rank: "uroczystość" },
  "11-02": { name: "Wspomnienie wszystkich wiernych zmarłych", rank: "wspomnienie" },
  "11-04": { name: "Św. Karola Boromeusza", rank: "wspomnienie" },
  "11-09": { name: "Rocznica poświęcenia Bazyliki Laterańskiej", rank: "święto" },
  "11-10": { name: "Św. Leona Wielkiego", rank: "wspomnienie" },
  "11-11": { name: "Św. Marcina z Tours", rank: "wspomnienie" },
  "11-12": { name: "Św. Jozafata", rank: "wspomnienie" },
  "11-13": { name: "Świętych Pierwszych Męczenników Polski", rank: "wspomnienie" },
  "11-17": { name: "Św. Elżbiety Węgierskiej", rank: "wspomnienie" },
  "11-21": { name: "Ofiarowanie Najświętszej Maryi Panny", rank: "wspomnienie" },
  "11-22": { name: "Św. Cecylii, patronki muzyki kościelnej", rank: "wspomnienie" },
  "11-24": { name: "Świętych Andrzeja Dung-Lac i Towarzyszy", rank: "wspomnienie" },
  "11-30": { name: "Św. Andrzeja Apostoła", rank: "święto" },

  "12-03": { name: "Św. Franciszka Ksawerego", rank: "wspomnienie" },
  "12-04": { name: "Św. Barbary", rank: "wspomnienie" },
  "12-06": { name: "Św. Mikołaja", rank: "wspomnienie dowolne" },
  "12-07": { name: "Św. Ambrożego", rank: "wspomnienie" },
  "12-08": { name: "Niepokalane Poczęcie Najświętszej Maryi Panny", rank: "uroczystość" },
  "12-13": { name: "Św. Łucji", rank: "wspomnienie" },
  "12-14": { name: "Św. Jana od Krzyża", rank: "wspomnienie" },
  "12-25": { name: "Narodzenie Pańskie", rank: "uroczystość" },
  "12-26": { name: "Św. Szczepana, pierwszego męczennika", rank: "święto" },
  "12-27": { name: "Św. Jana, Apostoła i Ewangelisty", rank: "święto" },
  "12-28": { name: "Świętych Młodzianków, męczenników", rank: "święto" },
};

export const monthNames = [
  "Styczeń", "Luty", "Marzec", "Kwiecień", "Maj", "Czerwiec",
  "Lipiec", "Sierpień", "Wrzesień", "Październik", "Listopad", "Grudzień",
];

/* Patroni i święci szczególnie związani z Bukiem */
export type Patron = {
  name: string;
  feast: string;
  role: string;
  text: string;
  attribute: string;
};

export const patrons: Patron[] = [
  {
    name: "Matka Boża Bukowska Literacka",
    feast: "8 września · 31 maja",
    role: "Patronka sanktuarium",
    attribute: "Księga w dłoni Dzieciątka",
    text:
      "Hodegetria — „Wskazująca Drogę”. Dzieciątko trzyma grubą księgę, znak literatów, czyli dawnych bractw śpiewaczych, od których obraz wziął swoje miano. Czczona w Buku co najmniej od 1430 roku.",
  },
  {
    name: "Św. Stanisław ze Szczepanowa",
    feast: "8 maja",
    role: "Patron parafii i kościoła farnego",
    attribute: "Pastorał i wskrzeszony Piotrowin",
    text:
      "Biskup krakowski, zamordowany w 1079 roku przy ołtarzu na Skałce za upominanie króla Bolesława Śmiałego. Kanonizowany w 1253 roku — kilka lat przed pierwszą wzmianką o bukowskiej świątyni parafialnej (1257).",
  },
  {
    name: "Św. Wojciech",
    feast: "23 kwietnia",
    role: "Patron dawnego kościoła na Konarach",
    attribute: "Wiosło i włócznie",
    text:
      "Biskup praski i męczennik, główny patron Polski. W 1609 roku na miejscu dawnego grodu stanął kościół jego imienia; dzisiejszy kościół św. Krzyża zachował malowidła ze scenami z jego życia.",
  },
  {
    name: "Krzyż Święty",
    feast: "14 września",
    role: "Tytuł drewnianego kościoła z 1760 roku",
    attribute: "Krzyż i figura „Ecce Homo” (1762)",
    text:
      "Drewniany kościół na planie krzyża greckiego, ufundowany przez Wiktora Raczyńskiego. Tu w 1806 roku przeniesiono cudowny obraz, gdy wieża fary runęła.",
  },
];
