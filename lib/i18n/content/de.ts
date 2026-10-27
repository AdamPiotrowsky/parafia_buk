import { rafal, saints } from "./saints-de";
import type { PageContent } from "./types";

export const de: PageContent = {
  home: {
    metaTitle: "Pfarrei St. Stanislaus in Buk · Heiligtum der Muttergottes von Buk",
    metaDescription:
      "Das Heiligtum der Muttergottes von Buk „Literacka“ und die Pfarrei St. Stanislaus, Bischof und Märtyrer, in Buk, Erzbistum Posen. Messzeiten, Geschichte und Kontakt.",
    intro: "Seit fast sechs Jahrhunderten kommen Pilger hierher zu ihr, die den Weg zu ihrem Sohn weist.",
    welcomeTitle: "Willkommen in Buk",
    welcome: [
      "Buk ist eine kleine Stadt in Großpolen, etwa 35 km westlich von Posen (Poznań). In der Pfarrkirche St. Stanislaus befindet sich das Gnadenbild der Muttergottes von Buk, das mindestens seit 1430 verehrt und 2017 gekrönt wurde.",
      "Pilger und Besucher sind herzlich willkommen. Die heilige Messe wird auf Polnisch gefeiert; wenn Sie einen Besuch, eine Messe für eine Gruppe oder ein Gespräch mit einem Priester vereinbaren möchten, wenden Sie sich bitte an das Pfarrbüro.",
    ],
    cards: [
      { key: "sanctuary", title: "Das Heiligtum", text: "Die Geschichte des Gnadenbildes, seine Krönung und die Feste des Heiligtums." },
      { key: "churches", title: "Zwei Kirchen", text: "Eine klassizistische Kirche nach Schinkels Entwurf und eine Holzkirche von 1760." },
      { key: "masses", title: "Messzeiten", text: "Sonntage, Werktage und Feiertage in der Pfarrkirche." },
      { key: "contact", title: "Kontakt", text: "Öffnungszeiten des Pfarrbüros, Telefon, E-Mail und Anfahrt." },
    ],
    massTitle: "Heilige Messe",
    massNote: "Alle Messen werden auf Polnisch in der Pfarrkirche (ul. Mury 30) gefeiert.",
    imageTitle: "Hodegetria – die Wegweiserin",
    imageText:
      "Das Jesuskind segnet mit der einen Hand und hält in der anderen ein dickes Buch – das Zeichen der „Literaten“, der alten kirchlichen Bruderschaften, nach denen das Bild benannt ist.",
    imageLink: "Geschichte des Gnadenbildes",
    more: "Mehr erfahren",
  },

  sanctuary: {
    metaTitle: "Das Heiligtum",
    eyebrow: "Diözesanheiligtum · seit 2015",
    title: "Heiligtum der Muttergottes von Buk „Literacka“",
    lead: "Die Pfarrkirche St. Stanislaus, Bischof und Märtyrer – hier vertrauen sich Pilger seit dem 15. Jahrhundert der Muttergottes von Buk an.",
    coronationEyebrow: "Gekrönt am 10. September 2017",
    coronationTitle: "Fast achtzig Jahre Warten auf die Kronen",
    coronation: [
      "Schon 1936 bat Pfarrer Stanisław Kuliszak um die päpstliche Krönung des Gnadenbildes. Die Feier war für September 1939 geplant – zum 650. Jahrestag der Stadtrechte von Buk. Der Krieg machte diese Pläne zunichte, und im Januar 1945 verbrannte das mittelalterliche Bild zusammen mit der Kirche.",
      "Die Verehrung der Muttergottes überdauerte. Ein neues Bild malte Eugenia Gogolewska; am 23. Dezember 2015 errichtete Erzbischof Stanisław Gądecki in der Pfarrkirche ein Diözesanheiligtum, und am 10. September 2017 wurde das Bild der Muttergottes von Buk gekrönt.",
    ],
    pillars: [
      {
        title: "Warum „Literacka“?",
        text: "Das Kind hält ein dickes Buch – das Zeichen der Literaten, alter kirchlicher Bruderschaften, die das Bild besonders verehrten.",
      },
      {
        title: "Ein vollkommener Ablass für alle Zeiten",
        text: "Mit einer Bulle vom 10. März 1781 gewährte Papst Pius VI. dem Marienaltar einen vollkommenen Ablass an den Festen Mariä Heimsuchung (31. Mai) und Mariä Geburt (8. September).",
      },
      {
        title: "Das Turmsignal von Buk",
        text: "Seit 1935 ruft ein Turmsignal, komponiert und der Kirche geschenkt von Kapellmeister Czesław Jakubowski, die Gläubigen zur Verehrung der Gottesmutter.",
      },
    ],
    feastsTitle: "Feste des Heiligtums",
    feasts: [
      { date: "31. Mai", name: "Mariä Heimsuchung", note: "Vollkommener Ablass am Marienaltar" },
      { date: "8. September", name: "Mariä Geburt", note: "Hauptfest des Heiligtums" },
    ],
    historyEyebrow: "Geschichte des Gnadenbildes",
    historyTitle: "Die Muttergottes von Buk durch sechs Jahrhunderte",
    image: [
      "Wann das Bild nach Buk kam, wissen wir nicht. Die erste Erwähnung eines „gnadenreichen“ Bildes stammt aus dem Jahr 1430. Es zeigt die allerseligste Jungfrau Maria mit dem Jesuskind auf dem linken Arm. Jesus hält ein dickes Buch – das Symbol der Literaten – und erhebt die andere Hand zum Segen.",
      "Prof. Szczęsny Dettloff, der das Bild 1933–1934 restaurierte, ordnete die Madonna von Buk dem Typus der Hodegetria zu – der „Wegweiserin“ –, der aus der byzantinischen Kunst stammt und in Polen in vielen Varianten verbreitet war. Ob das Vorbild direkt aus Byzanz oder über Italien nach Buk gelangte, ist unbekannt.",
      "Den heimischen Charakter des Bildes verraten die Engel: Statt Weihrauchfässern halten sie Bänder mit dem Anfang des Osterhymnus „Freu dich, du Himmelskönigin, Halleluja“ und den Worten „Gegrüßet seist du, Maria, voll der Gnade“. Nach Dettloff findet man eine solche Hodegetria nirgends außerhalb Polens.",
    ],
    quote:
      "Unter dem Schleier hervor blickt die Gottesmutter den Betrachter fesselnd an und lenkt die geistige Begegnung auf den Sohn Gottes, der sie mit seinem Blick und der Geste seines Händchens segnet.",
    quoteBy: "nach Prof. Szczęsny Dettloff",
    timelineEyebrow: "Zeittafel",
    timelineTitle: "Die Geschichte des Bildes",
    eras: [
      {
        name: "Mittelalter",
        span: "15. Jahrhundert",
        events: [
          { year: "1418", title: "Weihe der gotischen Kirche", text: "Die erste gemauerte, gotische Backsteinkirche wird geweiht. Das Bild erhält seinen Platz in einem der Seitenaltäre." },
          { year: "1430", title: "Erste Erwähnung des Bildes", text: "Die älteste erhaltene Nachricht über das „gnadenreiche“ Bild. Wann es nach Buk kam, wissen wir nicht.", major: true },
        ],
      },
      {
        name: "Altpolnische Zeit",
        span: "16. – 18. Jahrhundert",
        events: [
          { year: "1576", title: "Eine eigene Kapelle", text: "Das Bild wird in eine eigens für es eingerichtete Kapelle übertragen." },
          { year: "1662", title: "Silberne Kronen", text: "Die Visitationsakten des Posener Bischofs Wojciech Tolibowski erwähnen zwei silberne Kronen – auf dem Haupt Marias und des Kindes. Ein Dokument über eine förmliche Krönung fehlt jedoch." },
          { year: "1697 – 1698", title: "Als Gnadenbild anerkannt", text: "Nach einer amtlichen Untersuchung erklärt der Posener Weihbischof Hieronim Wierzbowski das Bild für wundertätig.", major: true },
          { year: "1702", title: "Kupferstich von Siemieński", text: "Der Stecher Andrzej Siemieński fertigt eine Kupferplatte für Abzüge an – das Bild gelangt in die Häuser der Pilger." },
          { year: "um 1760", title: "Silberne Kleider", text: "Hundert Jahre später erhält das Bild silberne Kleider." },
          { year: "1781", title: "Bulle von Papst Pius VI.", text: "Mit einer Bulle vom 10. März gewährt der Papst dem Altar der Muttergottes „Literacka“ einen vollkommenen Ablass „für ewige Zeiten“ an den Festen Mariä Geburt (8. IX.) und Mariä Heimsuchung (31. V.).", major: true },
        ],
      },
      {
        name: "Das 19. Jahrhundert und die Erneuerung",
        span: "1806 – 1939",
        events: [
          { year: "1806", title: "Einsturz des Turms", text: "Der einstürzende Turm zerstört die gotische Kirche. Das Gnadenbild bleibt erhalten und wird in die hölzerne Heilig-Kreuz-Kirche gebracht.", major: true },
          { year: "1846", title: "Zurück auf dem Hochaltar", text: "In der neuen Pfarrkirche, erbaut nach einem Entwurf von Karl Friedrich Schinkel, erhält das Bild seinen Platz im Hochaltar." },
          { year: "1933 – 1934", title: "Restaurierung durch Prof. Dettloff", text: "Auf Initiative von Pfarrer Stanisław Kuliszak restauriert Prof. Szczęsny Dettloff das Bild. Am 8. September 1934 kehrt es feierlich in die Kirche zurück und wird am folgenden Tag enthüllt." },
          { year: "1935", title: "Das Turmsignal von Buk", text: "Kapellmeister Czesław Jakubowski schenkt der Kirche ein selbst komponiertes Turmsignal, „damit es für alle Zeiten die Gläubigen zur Verehrung der allerheiligsten Mutter rufe“." },
          { year: "1936 – 1939", title: "Bemühungen um die Krönung", text: "Pfarrer Kuliszak bittet um die päpstliche Krönung – zuerst für 1940, dann für September 1939, zum 650. Jahrestag der Stadtrechte. Er stirbt am 20. Juni 1939." },
        ],
      },
      {
        name: "Krieg und Wiedergeburt",
        span: "1941 – heute",
        events: [
          { year: "1941", title: "Die Kirche als Lager", text: "Die Besatzer machen die Pfarrkirche zu einem Lager für Militäruniformen." },
          { year: "5. I. 1945", title: "Brand und Verlust des Bildes", text: "Die abziehenden deutschen Truppen setzen die Kirche in Brand. Das mittelalterliche Bild verbrennt.", major: true },
          { year: "1945", title: "Ein neues Bild", text: "Auf Betreiben von Pfarrer Antoni Hilomer übernimmt die Pfarrei die ehemals evangelische Kirche am Reszki-Platz. Dort wird ein von Eugenia Gogolewska auf Leinwand gemaltes Bild aufgestellt." },
          { year: "1948", title: "Weihe der wiederaufgebauten Kirche", text: "Am 3. Oktober weiht Erzbischof Walenty Dymek die wiederaufgebaute Kirche. Das Bild der Muttergottes kehrt auf den Hochaltar zurück." },
          { year: "2015", title: "Heiligtum", text: "Mit Dekret von Erzbischof Stanisław Gądecki vom 23. Dezember wird die Pfarrkirche zum Diözesanheiligtum der Muttergottes von Buk „Literacka“.", major: true },
          { year: "2017", title: "Krönung", text: "Nach fast achtzig Jahren der Bemühungen wird das Bild der Muttergottes von Buk am 10. September gekrönt.", major: true },
        ],
      },
    ],
    imageAlt: "Das gekrönte Bild der Muttergottes von Buk",
    crownedCaption: "Gekrönt am 10. September 2017",
    altarCaption: "Das Gnadenbild im Hochaltar der Pfarrkirche",
  },

  churches: {
    metaTitle: "Die Kirchen der Pfarrei",
    eyebrow: "Erbe der Pfarrei",
    title: "Zwei Kirchen, acht Jahrhunderte",
    lead: "Eine klassizistische Pfarrkirche nach Schinkels Entwurf und eine Holzkirche auf dem Gelände der alten Burg – Zeugen der ganzen Geschichte von Buk.",
    timeline: "Zeittafel",
    items: {
      fara: {
        name: "Pfarrkirche",
        subtitle: "St. Stanislaus, Bischof und Märtyrer",
        style: "Spätklassizismus",
        paragraphs: [
          "Die ersten Erwähnungen einer Pfarrkirche in Buk stammen aus den Jahren 1257 und 1298. 1414–1426 wurde hier eine gotische Backsteinkirche errichtet, in der das Gnadenbild fast vierhundert Jahre lang verehrt wurde.",
          "1806 stürzte der Turm ein, und die zerstörte Kirche wurde abgetragen. An ihrer Stelle entstand 1838–1846 eine spätklassizistische Kirche in Anlehnung an die ionische Ordnung nach einem Entwurf von Karl Friedrich Schinkel – dem Architekten, der das Gesicht Berlins prägte.",
          "Am 5. Januar 1945 setzten die abziehenden deutschen Truppen die Kirche in Brand; nur die Außenmauern blieben stehen. Der Wiederaufbau dauerte von 1946 bis 1951. 1957 schuf St. Powalisz vier Buntglasfenster, 1965–1966 bemalten T. und St. Szukalski das Innere mit Wandmalereien.",
        ],
        facts: [
          { label: "Erste Erwähnung", value: "1257" },
          { label: "Architekt", value: "K. F. Schinkel" },
          { label: "Wiederaufbau", value: "1946 – 1951" },
          { label: "Heiligtum seit", value: "2015" },
        ],
        timeline: [
          { year: "1257", title: "Erste Erwähnung", text: "Die Pfarrkirche erscheint in den Quellen." },
          { year: "1414 – 1426", title: "Gotische Kirche", text: "Eine Backsteinkirche, geweiht 1418." },
          { year: "1806", title: "Einsturz des Turms", text: "Die Kirche wird abgetragen.", major: true },
          { year: "1838 – 1846", title: "Schinkels Kirche", text: "Ein neuer klassizistischer Bau." },
          { year: "1945", title: "Brand", text: "Nur die Außenmauern bleiben.", major: true },
          { year: "1946 – 1951", title: "Wiederaufbau", text: "Weihe am 3. Oktober 1948." },
          { year: "1957", title: "Buntglasfenster", text: "Vier Fenster von St. Powalisz." },
          { year: "1965 – 1966", title: "Wandmalereien", text: "Ausmalung von T. und St. Szukalski." },
        ],
        caption: "Die Pfarrkirche aus der Luft – ein klassizistischer Portikus im Grün der Altstadt von Buk",
      },
      "swiety-krzyz": {
        name: "Heilig-Kreuz-Kirche",
        subtitle: "in der ehemaligen Vorstadt Konary",
        style: "Holzarchitektur",
        paragraphs: [
          "Die Kirche steht auf dem Gelände der ältesten Burg von Buk oder ihrer Vorburg, der späteren Vorstadt Konary. 1609 erbaute hier der Posener Bischof Andrzej Opaliński eine Kirche des hl. Adalbert.",
          "Im 17. Jahrhundert erneuert, wurde sie Mitte des folgenden Jahrhunderts abgetragen. 1760 entstand an ihrer Stelle die heutige Holzkirche über dem Grundriss eines griechischen Kreuzes, gestiftet von Wiktor Raczyński, dem Gutsherrn von Wojnowice.",
          "Die Kirche hat ihre ursprünglichen Wandmalereien mit Szenen aus dem Leben des hl. Adalbert bewahrt – eine Erinnerung an den früheren Patron dieses Ortes. Daneben stehen ein hölzerner Glockenturm von 1757 und eine „Ecce Homo“-Figur von 1762.",
        ],
        facts: [
          { label: "Erste Kirche", value: "1609" },
          { label: "Heutiger Bau", value: "1760" },
          { label: "Glockenturm", value: "1757" },
          { label: "Ecce Homo", value: "1762" },
        ],
        timeline: [
          { year: "1609", title: "St.-Adalbert-Kirche", text: "Stiftung von Bischof Andrzej Opaliński." },
          { year: "Mitte 18. Jh.", title: "Abriss", text: "Die alte Kirche wird abgetragen." },
          { year: "1757", title: "Glockenturm", text: "Ein hölzerner Glockenturm, bis heute erhalten." },
          { year: "1760", title: "Neue Kirche", text: "Stiftung von Wiktor Raczyński.", major: true },
          { year: "1762", title: "Ecce Homo", text: "Figur des leidenden Christus bei der Kirche." },
          { year: "1806", title: "Zuflucht des Gnadenbildes", text: "Nach der Katastrophe der Pfarrkirche wird das Gnadenbild hierher gebracht.", major: true },
        ],
        caption: "Inneres der Heilig-Kreuz-Kirche – bemaltes Holzgewölbe und Altar mit Kruzifix",
      },
    },
  },

  masses: {
    metaTitle: "Messzeiten",
    eyebrow: "Pfarrkirche · ul. Mury 30",
    title: "Messzeiten",
    lead: "Heilige Messen in der Pfarrkirche – dem Heiligtum der Muttergottes von Buk.",
    sunday: "Sonn- und Feiertage",
    weekdays: ["Montag", "Dienstag", "Mittwoch", "Donnerstag", "Freitag", "Samstag"],
    note: "Die Messen werden auf Polnisch gefeiert. Änderungen und zusätzliche Messen stehen in den Pfarrankündigungen (auf Polnisch).",
    sacramentsTitle: "Sakramente",
    sacramentsText: "Taufe, Firmung, Beichte, Krankensalbung, Ehe",
  },

  sacraments: {
    metaTitle: "Sakramente",
    eyebrow: "Pfarrei St. Stanislaus in Buk",
    title: "Sakramente",
    lead: "Taufe, Firmung, Beichte, Krankensalbung und Ehe – was vorzubereiten ist und an wen Sie sich wenden.",
    intro: "Das Pfarrbüro hilft in allen Angelegenheiten – persönlich, telefonisch oder per E-Mail. Die Sakramente werden auf Polnisch gefeiert.",
    items: [
      {
        id: "chrzest",
        name: "Taufe",
        lead: "Taufen werden im Pfarrbüro angemeldet. In den Sommerferien wird das Sakrament gespendet:",
        points: [
          "am zweiten Sonntag des Monats – in der Messe um 10:30 Uhr,",
          "am vierten Samstag des Monats – in der Messe um 18:30 Uhr.",
          "Vorbereitung für Eltern und Paten: freitags nach der Abendmesse.",
          "Termine können sich ändern – aktuelle Informationen stehen in den Ankündigungen.",
        ],
      },
      {
        id: "bierzmowanie",
        name: "Firmung",
        lead: "Das Sakrament der christlichen Reife, empfangen nach der Vorbereitung in der Pfarrei.",
        points: ["Treffen und Voraussetzungen für die Firmlinge werden in der Pfarrei bekanntgegeben (auf Polnisch)."],
      },
      {
        id: "pojednanie",
        name: "Beichte",
        lead: "Das Sakrament der Buße und Versöhnung – Rückkehr zu Gott und Versöhnung mit der Kirche.",
        points: [
          "Beichtzeiten, auch vor den Hochfesten, stehen in den Ankündigungen.",
          "Ein Gespräch mit einem Priester kann über das Pfarrbüro vereinbart werden.",
        ],
      },
      {
        id: "namaszczenie",
        name: "Krankensalbung",
        lead: "Ein Sakrament der Stärkung für Kranke, ältere Menschen und vor Operationen.",
        points: ["Krankenbesuche zu Hause werden im Pfarrbüro angemeldet."],
      },
      {
        id: "malzenstwo",
        name: "Ehe",
        lead: "Brautpaare werden gebeten, sich mindestens drei Monate vor der geplanten Hochzeit im Pfarrbüro zu melden.",
        points: [
          "Bitte bringen Sie Ihre Ausweise sowie aktuelle Tauf- und Firmbescheinigungen mit.",
          "Erforderlich ist auch eine Bescheinigung über die Ehevorbereitung.",
          "Das Aufgebot wird in den Pfarrankündigungen veröffentlicht.",
        ],
      },
    ],
    massesTitle: "Messzeiten",
    massesSummary: (sunday, weekday) => `Sonn- und Feiertage: ${sunday} · Werktage: ${weekday}`,
    see: "Ansehen",
    callTitle: "Pfarrbüro",
    callText: "Bitte rufen Sie zu den Bürozeiten an",
  },

  contact: {
    metaTitle: "Kontakt und Pfarrbüro",
    title: "Kontakt und Pfarrbüro",
    call: "Anrufen zu den Bürozeiten",
    write: "Schreiben Sie uns",
    account: "Bankverbindung",
    mapTitle: "Karte – Heiligtum in Buk",
  },

  saints,
  rafal,
};
