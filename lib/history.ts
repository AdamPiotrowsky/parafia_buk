export type TimelineEvent = {
  year: string;
  title: string;
  text: string;
  /** Wydarzenia przełomowe dostają większy, złoty znacznik. */
  major?: boolean;
};

export type Era = {
  name: string;
  span: string;
  events: TimelineEvent[];
};

/* Dzieje obrazu Matki Bożej Bukowskiej Literackiej */
export const imageHistory: Era[] = [
  {
    name: "Średniowiecze",
    span: "XV wiek",
    events: [
      {
        year: "1418",
        title: "Konsekracja gotyckiej fary",
        text:
          "Pierwszy murowany, ceglany kościół gotycki zostaje konsekrowany. Obraz zajmuje miejsce w jednym z ołtarzy bocznych.",
      },
      {
        year: "1430",
        title: "Pierwsza wzmianka o obrazie",
        text:
          "Najstarszy zachowany zapis o wizerunku „słynącym łaskami”. Daty sprowadzenia obrazu do Buku nie znamy.",
        major: true,
      },
    ],
  },
  {
    name: "Czasy staropolskie",
    span: "XVI – XVIII wiek",
    events: [
      {
        year: "1576",
        title: "Własna kaplica",
        text: "Obraz zostaje przeniesiony do specjalnie przygotowanej dla niego kaplicy.",
      },
      {
        year: "1662",
        title: "Srebrne korony",
        text:
          "Akta wizytacji biskupa poznańskiego Wojciecha Tolibowskiego odnotowują dwie srebrne korony — na głowie Maryi i Dzieciątka. Brak jednak dokumentu o formalnej koronacji.",
      },
      {
        year: "1697 – 1698",
        title: "Obraz uznany za cudowny",
        text:
          "Po urzędowym badaniu biskup Hieronim Wierzbowski, sufragan poznański, ogłasza obraz cudownym.",
        major: true,
      },
      {
        year: "1702",
        title: "Miedzioryt Siemieńskiego",
        text:
          "Rytownik Andrzej Siemieński wykonuje miedzianą matrycę do odbitek — wizerunek trafia do domów pielgrzymów.",
      },
      {
        year: "ok. 1760",
        title: "Srebrne sukienki",
        text: "Sto lat później wizerunek otrzymuje srebrne sukienki.",
      },
      {
        year: "1781",
        title: "Bulla papieża Piusa VI",
        text:
          "Bullą z 10 marca papież nadaje ołtarzowi Matki Bożej Literackiej odpust zupełny „na wieczne czasy” w święta Narodzenia (8 IX) i Nawiedzenia NMP (31 V).",
        major: true,
      },
    ],
  },
  {
    name: "Wiek XIX i odnowa",
    span: "1806 – 1939",
    events: [
      {
        year: "1806",
        title: "Katastrofa wieży",
        text:
          "Waląca się wieża niszczy gotycki kościół. Cudowny obraz ocalał i zostaje przeniesiony do drewnianego kościoła św. Krzyża.",
        major: true,
      },
      {
        year: "1846",
        title: "Powrót do ołtarza głównego",
        text:
          "W nowej farze, wzniesionej według projektu Karla Friedricha Schinkla, obraz zostaje umieszczony w ołtarzu głównym.",
      },
      {
        year: "1933 – 1934",
        title: "Renowacja ks. prof. Dettloffa",
        text:
          "Z inicjatywy ks. Stanisława Kuliszaka obraz odnawia ks. prof. Szczęsny Dettloff. 8 września 1934 roku wizerunek uroczyście wraca do fary, a nazajutrz zostaje odsłonięty.",
      },
      {
        year: "1935",
        title: "Hejnał bukowski",
        text:
          "Kapelmistrz Czesław Jakubowski ofiarowuje farze skomponowany przez siebie hejnał, „aby po wsze czasy wzywał wiernych do oddania czci Matce Najświętszej”.",
      },
      {
        year: "1936 – 1939",
        title: "Starania o koronację",
        text:
          "Ks. Kuliszak prosi o koronację papieską — najpierw na rok 1940, potem na wrzesień 1939, w 650-lecie lokacji Buku. Umiera 20 czerwca 1939 roku.",
      },
    ],
  },
  {
    name: "Wojna i odrodzenie",
    span: "1941 – dziś",
    events: [
      {
        year: "1941",
        title: "Fara magazynem",
        text: "Okupanci zamieniają kościół farny na magazyn mundurów wojskowych.",
      },
      {
        year: "5 I 1945",
        title: "Pożar i utrata obrazu",
        text:
          "Uciekający Niemcy podpalają kościół. Średniowieczny wizerunek spłonął.",
        major: true,
      },
      {
        year: "1945",
        title: "Nowy wizerunek",
        text:
          "Staraniem ks. Antoniego Hilomera parafia przejmuje kościół poprotestancki przy pl. Reszki. Umieszczono tam obraz namalowany na płótnie przez Eugenię Gogolewską.",
      },
      {
        year: "1948",
        title: "Konsekracja odbudowanej fary",
        text:
          "3 października abp Walenty Dymek konsekruje odbudowany kościół. Obraz Matki Bożej wraca do ołtarza głównego.",
      },
      {
        year: "2015",
        title: "Sanktuarium",
        text:
          "Dekretem abp. Stanisława Gądeckiego z 23 grudnia fara otrzymuje tytuł Diecezjalnego Sanktuarium Matki Bożej Bukowskiej Literackiej.",
        major: true,
      },
      {
        year: "2017",
        title: "Koronacja",
        text:
          "Po blisko osiemdziesięciu latach starań — 10 września — wizerunek Pani Bukowskiej zostaje ukoronowany.",
        major: true,
      },
    ],
  },
];

export type Church = {
  slug: string;
  name: string;
  subtitle: string;
  style: string;
  built: string;
  intro: string;
  /** Zdjęcie poziome (karty na stronie głównej). */
  cover: string;
  /** Duże zdjęcie lub film pokazywany przy opisie kościoła. */
  feature: { kind: "image" | "video"; src: string; poster?: string; caption: string };
  paragraphs: string[];
  facts: { label: string; value: string }[];
  timeline: TimelineEvent[];
};

export const churches: Church[] = [
  {
    slug: "fara",
    cover: "/images/fara-front.jpg",
    feature: {
      kind: "video",
      src: "/images/fara-z-lotu.mp4",
      poster: "/images/fara-z-lotu.jpg",
      caption: "Fara z lotu ptaka — klasycystyczny portyk i bryła wśród zieleni starego Buku",
    },
    name: "Kościół farny",
    subtitle: "pw. św. Stanisława Biskupa i Męczennika",
    style: "Późny klasycyzm",
    built: "1838 – 1846",
    intro:
      "Serce parafii i dom Matki Bożej Bukowskiej. Trzecia świątynia na tym miejscu — projekt Schinkla, dwa razy podnoszone z ruin.",
    paragraphs: [
      "Pierwsze wzmianki o świątyni parafialnej w Buku pochodzą z lat 1257 i 1298. W latach 1414–1426 wzniesiono tu ceglany kościół gotycki, w którym przez blisko czterysta lat czczono cudowny obraz.",
      "W 1806 roku runęła wieża, a zrujnowaną świątynię rozebrano. Na jej miejscu w latach 1838–1846 stanął kościół w stylu późnoklasycystycznym, nawiązującym do porządku jońskiego, według projektu Karla Friedricha Schinkla — architekta, który odmienił oblicze Berlina.",
      "5 stycznia 1945 roku wycofujący się Niemcy podpalili kościół; przetrwały jedynie mury obwodowe. Odbudowa trwała od 1946 do 1951 roku. W 1957 roku St. Powalisz wykonał cztery witraże, a w latach 1965–1966 T. i St. Szukałowie pokryli wnętrze polichromią.",
    ],
    facts: [
      { label: "Pierwsza wzmianka", value: "1257" },
      { label: "Architekt", value: "K. F. Schinkel" },
      { label: "Odbudowa", value: "1946 – 1951" },
      { label: "Sanktuarium od", value: "2015" },
    ],
    timeline: [
      { year: "1257", title: "Pierwsza wzmianka", text: "Świątynia parafialna w źródłach." },
      { year: "1414 – 1426", title: "Fara gotycka", text: "Ceglany kościół, konsekrowany w 1418 roku." },
      { year: "1806", title: "Zawalenie wieży", text: "Kościół zostaje rozebrany.", major: true },
      { year: "1838 – 1846", title: "Kościół Schinkla", text: "Nowa, klasycystyczna świątynia." },
      { year: "1945", title: "Spalenie", text: "Zostają tylko mury obwodowe.", major: true },
      { year: "1946 – 1951", title: "Odbudowa", text: "Konsekracja 3 października 1948." },
      { year: "1957", title: "Witraże", text: "Cztery witraże St. Powalisza." },
      { year: "1965 – 1966", title: "Polichromia", text: "Malarstwo ścienne T. i St. Szukałów." },
    ],
  },
  {
    slug: "swiety-krzyz",
    cover: "/images/swiety-krzyz-zewnatrz.jpg",
    feature: {
      kind: "image",
      src: "/images/swiety-krzyz-wnetrze.jpg",
      caption: "Wnętrze kościoła św. Krzyża — drewniane sklepienie z malowidłami i ołtarz z krucyfiksem",
    },
    name: "Kościół św. Krzyża",
    subtitle: "na dawnych Konarach",
    style: "Architektura drewniana",
    built: "1760",
    intro:
      "Najstarsze miejsce Buku — teren dawnego grodu. Drewniany kościół na planie krzyża greckiego, który w 1806 roku przyjął pod swój dach cudowny obraz.",
    paragraphs: [
      "Kościół stoi na terenie najstarszego bukowskiego grodu lub podgrodzia, późniejszego przedmieścia Konary. W 1609 roku biskup poznański Andrzej Opaliński zbudował tu kościół pw. św. Wojciecha.",
      "Odnawiany w XVII wieku, w połowie następnego stulecia został rozebrany. W 1760 roku na jego miejscu stanął obecny drewniany kościół na planie krzyża greckiego, ufundowany przez dziedzica Wojnowic Wiktora Raczyńskiego.",
      "Świątynia zachowała oryginalne malowidła ścienne ze scenami z życia św. Wojciecha — pamiątkę po dawnym patronie tego miejsca. Obok stoi drewniana dzwonnica z 1757 roku i figura „Ecce Homo” z 1762 roku.",
    ],
    facts: [
      { label: "Pierwszy kościół", value: "1609" },
      { label: "Obecna świątynia", value: "1760" },
      { label: "Dzwonnica", value: "1757" },
      { label: "Ecce Homo", value: "1762" },
    ],
    timeline: [
      { year: "1609", title: "Kościół św. Wojciecha", text: "Fundacja bp. Andrzeja Opalińskiego." },
      { year: "poł. XVIII w.", title: "Rozbiórka", text: "Stary kościół zostaje rozebrany." },
      { year: "1757", title: "Dzwonnica", text: "Drewniana dzwonnica, zachowana do dziś." },
      { year: "1760", title: "Nowy kościół", text: "Fundacja Wiktora Raczyńskiego.", major: true },
      { year: "1762", title: "Ecce Homo", text: "Figura Chrystusa Frasobliwego przy kościele." },
      { year: "1806", title: "Schronienie obrazu", text: "Tu trafia cudowny obraz po katastrofie fary.", major: true },
    ],
  },
];
