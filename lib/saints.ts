/*
 * Kalendarz świętych o stałych datach (kalendarz liturgiczny Kościoła w Polsce):
 * uroczystości, święta, wspomnienia obowiązkowe i kilka szczególnie
 * bliskich parafii wspomnień dowolnych.
 *
 * Klucz: "MM-DD".
 */

export type Rank = "dzień szczególny" | "uroczystość" | "święto" | "wspomnienie" | "wspomnienie dowolne";

/* Pierwszeństwo dni liturgicznych — im mniejsza liczba, tym ważniejszy dzień */
export const rankOrder: Record<Rank, number> = {
  "dzień szczególny": 0,
  uroczystość: 1,
  święto: 2,
  wspomnienie: 3,
  "wspomnienie dowolne": 4,
};

export type CalendarEntry = {
  name: string;
  rank: Rank;
  /** Święto ruchome — data liczona co roku od Wielkanocy lub Adwentu. */
  movable?: boolean;
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

  "04-07": { name: "Św. Jana Chrzciciela de la Salle", rank: "wspomnienie" },
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
  "07-24": { name: "Św. Kingi, dziewicy", rank: "wspomnienie" },
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
  "08-21": { name: "Św. Piusa X, papieża", rank: "wspomnienie" },
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
  "09-20": { name: "Świętych Andrzeja Kim Taegon, Pawła Chong Hasang i Towarzyszy", rank: "wspomnienie" },
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
  "10-16": { name: "Św. Jadwigi Śląskiej", rank: "wspomnienie" },
  "10-17": { name: "Św. Ignacego Antiocheńskiego", rank: "wspomnienie" },
  "10-18": { name: "Św. Łukasza Ewangelisty", rank: "święto" },
  "10-20": { name: "Św. Jana Kantego, prezbitera", rank: "wspomnienie" },
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

/*
 * Wspomnienia dowolne — te same daty co roku, obok głównego obchodu dnia.
 */
export const optionalMemorials: Record<string, string[]> = {
  "01-03": ["Najświętszego Imienia Jezus"],
  "01-07": ["Św. Rajmunda z Penyafort"],
  "01-13": ["Św. Hilarego"],
  "01-19": ["Św. Józefa Sebastiana Pelczara"],
  "01-20": ["Św. Fabiana, papieża, i św. Sebastiana, męczenników"],
  "01-22": ["Św. Wincentego, diakona i męczennika"],
  "01-27": ["Św. Anieli Merici"],
  "02-08": ["Św. Hieronima Emilianiego", "Św. Józefiny Bakhity"],
  "02-17": ["Siedmiu Świętych Założycieli Zakonu Serwitów"],
  "02-21": ["Św. Piotra Damianiego"],
  "03-08": ["Św. Jana Bożego"],
  "03-09": ["Św. Franciszki Rzymianki"],
  "03-17": ["Św. Patryka"],
  "03-18": ["Św. Cyryla Jerozolimskiego"],
  "03-23": ["Św. Turybiusza z Mongrovejo"],
  "04-02": ["Św. Franciszka z Paoli"],
  "04-04": ["Św. Izydora"],
  "04-05": ["Św. Wincentego Ferreriusza"],
  "04-13": ["Św. Marcina I, papieża"],
  "04-21": ["Św. Anzelma"],
  "04-24": ["Św. Fidelisa z Sigmaringen"],
  "04-28": ["Św. Piotra Chanel", "Św. Ludwika Marii Grignion de Montfort"],
  "04-30": ["Św. Piusa V, papieża"],
  "05-12": ["Świętych Nereusza i Achillesa", "Św. Pankracego"],
  "05-13": ["Najświętszej Maryi Panny Fatimskiej"],
  "05-18": ["Św. Jana I, papieża"],
  "05-20": ["Św. Bernardyna ze Sieny"],
  "05-21": ["Świętych Krzysztofa Magallanesa i Towarzyszy"],
  "05-22": ["Św. Rity z Cascii"],
  "05-24": ["Najświętszej Maryi Panny Wspomożycielki Wiernych"],
  "05-25": ["Św. Bedy Czcigodnego", "Św. Grzegorza VII, papieża", "Św. Marii Magdaleny de' Pazzi"],
  "05-27": ["Św. Augustyna z Canterbury"],
  "06-02": ["Świętych Marcelina i Piotra"],
  "06-06": ["Św. Norberta"],
  "06-09": ["Św. Efrema"],
  "06-19": ["Św. Romualda"],
  "06-22": ["Św. Paulina z Noli", "Świętych Jana Fishera i Tomasza More"],
  "06-27": ["Św. Cyryla Aleksandryjskiego", "Najświętszej Maryi Panny Nieustającej Pomocy"],
  "06-30": ["Świętych Pierwszych Męczenników Kościoła Rzymskiego"],
  "07-04": ["Św. Elżbiety Portugalskiej"],
  "07-05": ["Św. Antoniego Marii Zaccarii"],
  "07-06": ["Św. Marii Goretti"],
  "07-09": ["Świętych Augustyna Zhao Rong i Towarzyszy"],
  "07-13": ["Św. Henryka"],
  "07-14": ["Św. Kamila de Lellis"],
  "07-20": ["Św. Apolinarego"],
  "07-21": ["Św. Wawrzyńca z Brindisi"],
  "07-30": ["Św. Piotra Chryzologa"],
  "08-02": ["Św. Euzebiusza z Vercelli", "Św. Piotra Juliana Eymarda"],
  "08-07": ["Świętych Sykstusa II i Towarzyszy", "Św. Kajetana"],
  "08-13": ["Świętych Poncjana i Hipolita"],
  "08-16": ["Św. Stefana Węgierskiego"],
  "08-19": ["Św. Jana Eudesa"],
  "08-23": ["Św. Róży z Limy"],
  "08-25": ["Św. Ludwika", "Św. Józefa Kalasantego"],
  "09-09": ["Św. Piotra Klawera"],
  "09-12": ["Najświętszego Imienia Maryi"],
  "09-17": ["Św. Roberta Bellarmina"],
  "09-19": ["Św. Januarego"],
  "09-26": ["Świętych Kosmy i Damiana"],
  "09-28": ["Św. Wacława", "Świętych Wawrzyńca Ruiz i Towarzyszy"],
  "10-06": ["Św. Brunona"],
  "10-09": ["Świętych Dionizego i Towarzyszy", "Św. Jana Leonardiego"],
  "10-14": ["Św. Kaliksta I, papieża"],
  "10-16": ["Św. Małgorzaty Marii Alacoque"],
  "10-19": ["Świętych Jana de Brébeuf, Izaaka Joguesa i Towarzyszy", "Św. Pawła od Krzyża"],
  "10-23": ["Św. Jana Kapistrana"],
  "10-24": ["Św. Antoniego Marii Clareta"],
  "11-03": ["Św. Marcina de Porres"],
  "11-15": ["Św. Alberta Wielkiego"],
  "11-16": ["Św. Gertrudy", "Św. Małgorzaty Szkockiej"],
  "11-18": ["Rocznica poświęcenia bazylik św. Piotra i św. Pawła"],
  "11-25": ["Św. Katarzyny Aleksandryjskiej"],
  "12-09": ["Św. Juana Diego"],
  "12-11": ["Św. Damazego I, papieża"],
  "12-12": ["Najświętszej Maryi Panny z Guadalupe"],
  "12-21": ["Św. Piotra Kanizjusza"],
  "12-29": ["Św. Tomasza Becketa"],
  "12-31": ["Św. Sylwestra I, papieża"],
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
