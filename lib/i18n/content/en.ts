import { rafal, saints } from "./saints-en";
import type { PageContent } from "./types";

export const en: PageContent = {
  home: {
    metaTitle: "Parish of St. Stanislaus in Buk · Sanctuary of Our Lady of Buk",
    metaDescription:
      "The Sanctuary of Our Lady of Buk “Literacka” and the Parish of St. Stanislaus, Bishop and Martyr, in Buk, Archdiocese of Poznań. Mass times, history and contact.",
    intro: "For nearly six centuries pilgrims have come here to the One who shows the way to her Son.",
    welcomeTitle: "Welcome to Buk",
    welcome: [
      "Buk is a small town in Greater Poland, about 35 km west of Poznań. Its parish church of St. Stanislaus is home to the miraculous image of Our Lady of Buk, venerated since at least 1430 and crowned in 2017.",
      "We warmly welcome pilgrims and visitors. Holy Mass is celebrated in Polish; if you would like to arrange a visit, a Mass for a group or a conversation with a priest, please contact the parish office.",
    ],
    cards: [
      { key: "sanctuary", title: "The Sanctuary", text: "The story of the miraculous image, its coronation and the sanctuary feasts." },
      { key: "churches", title: "Two churches", text: "A classicist church designed by Schinkel and a wooden church from 1760." },
      { key: "masses", title: "Mass times", text: "Sundays, weekdays and holy days in the parish church." },
      { key: "contact", title: "Contact", text: "Parish office hours, phone, e-mail and directions." },
    ],
    massTitle: "Holy Mass",
    massNote: "All Masses are celebrated in Polish in the parish church (Mury 30 Street).",
    imageTitle: "Hodegetria — She Who Shows the Way",
    imageText:
      "The Child Jesus blesses with one hand and holds a thick book in the other — the sign of the “literati”, the old church confraternities that gave the image its name.",
    imageLink: "History of the image",
    more: "Read more",
  },

  sanctuary: {
    metaTitle: "The Sanctuary",
    eyebrow: "Diocesan sanctuary · since 2015",
    title: "Sanctuary of Our Lady of Buk “Literacka”",
    lead: "The parish church of St. Stanislaus, Bishop and Martyr — where pilgrims have entrusted themselves to Our Lady of Buk since the 15th century.",
    coronationEyebrow: "Crowned on 10 September 2017",
    coronationTitle: "Almost eighty years of waiting for the crowns",
    coronation: [
      "As early as 1936 Fr. Stanisław Kuliszak asked for a papal coronation of the miraculous image. The ceremony was planned for September 1939 — the 650th anniversary of the town charter of Buk. The war ended those plans, and in January 1945 the medieval image burned together with the church.",
      "Devotion to Our Lady survived. A new image was painted by Eugenia Gogolewska; on 23 December 2015 Archbishop Stanisław Gądecki established a diocesan sanctuary in the parish church, and on 10 September 2017 the image of Our Lady of Buk was crowned.",
    ],
    pillars: [
      {
        title: "Why “Literacka”?",
        text: "The Child holds a thick book — the sign of the literati, old church confraternities that surrounded the image with special devotion.",
      },
      {
        title: "A plenary indulgence for all time",
        text: "In a bull of 10 March 1781 Pope Pius VI granted the altar of Our Lady a plenary indulgence on the feasts of the Visitation (31 May) and the Nativity of Mary (8 September).",
      },
      {
        title: "The Buk bugle call",
        text: "Since 1935 a bugle call composed and given to the church by bandmaster Czesław Jakubowski has summoned the faithful to honour the Mother of God.",
      },
    ],
    feastsTitle: "Sanctuary feasts",
    feasts: [
      { date: "31 May", name: "Visitation of the Blessed Virgin Mary", note: "Plenary indulgence at the altar of Our Lady" },
      { date: "8 September", name: "Nativity of the Blessed Virgin Mary", note: "Main feast of the sanctuary" },
    ],
    historyEyebrow: "History of the image",
    historyTitle: "Our Lady of Buk through six centuries",
    image: [
      "We do not know when the image came to Buk. The first mention of a picture “famous for graces” dates from 1430. It shows the Blessed Virgin Mary with the Child Jesus on her left arm. Jesus holds a thick book — the symbol of the literati — and raises his other hand in blessing.",
      "Fr. Prof. Szczęsny Dettloff, who restored the image in 1933–1934, classified the Madonna of Buk as a Hodegetria — “She Who Shows the Way” — a type that came from Byzantine art and spread in Poland in many variants. It is not known whether the pattern reached Buk directly from Byzantium or through Italy.",
      "The angels reveal the local character of the image: instead of censers they hold ribbons inscribed with the beginning of the Easter hymn “Rejoice, O Queen, Alleluia” and the words “Hail Mary, full of grace”. According to Dettloff, such a Hodegetria cannot be found anywhere outside Poland.",
    ],
    quote:
      "Looking out from beneath her veil with a captivating gaze, the Mother of God passes the spiritual contact on to the Son of God, who blesses her with his eyes and the gesture of his little hand.",
    quoteBy: "after Fr. Prof. Szczęsny Dettloff",
    timelineEyebrow: "Timeline",
    timelineTitle: "The story of the image",
    eras: [
      {
        name: "Middle Ages",
        span: "15th century",
        events: [
          { year: "1418", title: "Consecration of the Gothic church", text: "The first brick Gothic church is consecrated. The image is placed in one of the side altars." },
          { year: "1430", title: "First mention of the image", text: "The oldest surviving record of the image “famous for graces”. We do not know when it was brought to Buk.", major: true },
        ],
      },
      {
        name: "Old Polish times",
        span: "16th – 18th century",
        events: [
          { year: "1576", title: "Its own chapel", text: "The image is moved to a chapel prepared especially for it." },
          { year: "1662", title: "Silver crowns", text: "The records of a visitation by Bishop Wojciech Tolibowski of Poznań mention two silver crowns — on the heads of Mary and the Child. There is, however, no record of a formal coronation." },
          { year: "1697 – 1698", title: "Declared miraculous", text: "After an official inquiry, Bishop Hieronim Wierzbowski, auxiliary bishop of Poznań, declares the image miraculous.", major: true },
          { year: "1702", title: "Siemieński's copperplate", text: "The engraver Andrzej Siemieński makes a copper plate for prints — the image enters pilgrims' homes." },
          { year: "c. 1760", title: "Silver robes", text: "A century later the image receives silver robes." },
          { year: "1781", title: "Bull of Pope Pius VI", text: "By a bull of 10 March the Pope grants the altar of Our Lady “Literacka” a plenary indulgence “for all time” on the feasts of the Nativity (8 Sept.) and the Visitation (31 May).", major: true },
        ],
      },
      {
        name: "The 19th century and renewal",
        span: "1806 – 1939",
        events: [
          { year: "1806", title: "The tower collapses", text: "The falling tower destroys the Gothic church. The miraculous image survives and is moved to the wooden church of the Holy Cross.", major: true },
          { year: "1846", title: "Back on the high altar", text: "In the new church, built to a design by Karl Friedrich Schinkel, the image is placed in the high altar." },
          { year: "1933 – 1934", title: "Restoration by Fr. Prof. Dettloff", text: "At the initiative of Fr. Stanisław Kuliszak the image is restored by Fr. Prof. Szczęsny Dettloff. On 8 September 1934 it solemnly returns to the church and is unveiled the next day." },
          { year: "1935", title: "The Buk bugle call", text: "Bandmaster Czesław Jakubowski gives the church a bugle call of his own composition, “to summon the faithful for all time to honour the Most Holy Mother”." },
          { year: "1936 – 1939", title: "Efforts for a coronation", text: "Fr. Kuliszak asks for a papal coronation — first for 1940, then for September 1939, the 650th anniversary of the town charter. He dies on 20 June 1939." },
        ],
      },
      {
        name: "War and rebirth",
        span: "1941 – today",
        events: [
          { year: "1941", title: "The church as a warehouse", text: "The occupiers turn the parish church into a store for military uniforms." },
          { year: "5 Jan 1945", title: "Fire and the loss of the image", text: "The retreating Germans set the church on fire. The medieval image burns.", major: true },
          { year: "1945", title: "A new image", text: "Through the efforts of Fr. Antoni Hilomer the parish takes over the former Protestant church on Reszki Square. An image painted on canvas by Eugenia Gogolewska is placed there." },
          { year: "1948", title: "Consecration of the rebuilt church", text: "On 3 October Archbishop Walenty Dymek consecrates the rebuilt church. The image of Our Lady returns to the high altar." },
          { year: "2015", title: "Sanctuary", text: "By a decree of Archbishop Stanisław Gądecki of 23 December, the parish church becomes the Diocesan Sanctuary of Our Lady of Buk “Literacka”.", major: true },
          { year: "2017", title: "Coronation", text: "After almost eighty years of efforts — on 10 September — the image of Our Lady of Buk is crowned.", major: true },
        ],
      },
    ],
    imageAlt: "The crowned image of Our Lady of Buk",
    crownedCaption: "Crowned on 10 September 2017",
    altarCaption: "The image in the high altar of the parish church",
  },

  churches: {
    metaTitle: "Churches of the parish",
    eyebrow: "Heritage of the parish",
    title: "Two churches, eight centuries",
    lead: "A classicist parish church designed by Schinkel and a wooden church on the site of the old stronghold — witnesses to the whole history of Buk.",
    timeline: "Timeline",
    items: {
      fara: {
        name: "Parish church",
        subtitle: "of St. Stanislaus, Bishop and Martyr",
        style: "Late classicism",
        paragraphs: [
          "The first records of a parish church in Buk date from 1257 and 1298. In 1414–1426 a brick Gothic church was built here, in which the miraculous image was venerated for almost four hundred years.",
          "In 1806 the tower collapsed and the ruined church was demolished. In its place, in 1838–1846, a late classicist church inspired by the Ionic order was built to a design by Karl Friedrich Schinkel — the architect who transformed Berlin.",
          "On 5 January 1945 the retreating Germans set the church on fire; only the outer walls survived. Reconstruction lasted from 1946 to 1951. In 1957 St. Powalisz made four stained-glass windows, and in 1965–1966 T. and St. Szukalski covered the interior with wall paintings.",
        ],
        facts: [
          { label: "First record", value: "1257" },
          { label: "Architect", value: "K. F. Schinkel" },
          { label: "Rebuilt", value: "1946 – 1951" },
          { label: "Sanctuary since", value: "2015" },
        ],
        timeline: [
          { year: "1257", title: "First record", text: "The parish church appears in the sources." },
          { year: "1414 – 1426", title: "Gothic church", text: "A brick church, consecrated in 1418." },
          { year: "1806", title: "The tower collapses", text: "The church is demolished.", major: true },
          { year: "1838 – 1846", title: "Schinkel's church", text: "A new classicist church." },
          { year: "1945", title: "Burned", text: "Only the outer walls remain.", major: true },
          { year: "1946 – 1951", title: "Reconstruction", text: "Consecrated on 3 October 1948." },
          { year: "1957", title: "Stained glass", text: "Four windows by St. Powalisz." },
          { year: "1965 – 1966", title: "Wall paintings", text: "Murals by T. and St. Szukalski." },
        ],
        caption: "The parish church from the air — a classicist portico among the greenery of old Buk",
      },
      "swiety-krzyz": {
        name: "Church of the Holy Cross",
        subtitle: "in the former Konary district",
        style: "Wooden architecture",
        paragraphs: [
          "The church stands on the site of the oldest stronghold of Buk or its outer settlement, later the Konary suburb. In 1609 Bishop Andrzej Opaliński of Poznań built a church of St. Adalbert here.",
          "Renovated in the 17th century, it was demolished in the middle of the following one. In 1760 the present wooden church on the plan of a Greek cross was built in its place, founded by Wiktor Raczyński, lord of Wojnowice.",
          "The church has kept its original wall paintings with scenes from the life of St. Adalbert — a reminder of the former patron of the place. Next to it stand a wooden bell tower from 1757 and an “Ecce Homo” statue from 1762.",
        ],
        facts: [
          { label: "First church", value: "1609" },
          { label: "Present church", value: "1760" },
          { label: "Bell tower", value: "1757" },
          { label: "Ecce Homo", value: "1762" },
        ],
        timeline: [
          { year: "1609", title: "Church of St. Adalbert", text: "Founded by Bishop Andrzej Opaliński." },
          { year: "mid-18th c.", title: "Demolition", text: "The old church is pulled down." },
          { year: "1757", title: "Bell tower", text: "A wooden bell tower that survives to this day." },
          { year: "1760", title: "A new church", text: "Founded by Wiktor Raczyński.", major: true },
          { year: "1762", title: "Ecce Homo", text: "A statue of the Sorrowful Christ by the church." },
          { year: "1806", title: "Refuge for the image", text: "The miraculous image is brought here after the disaster in the parish church.", major: true },
        ],
        caption: "Interior of the Holy Cross church — a painted wooden vault and an altar with a crucifix",
      },
    },
  },

  masses: {
    metaTitle: "Mass times",
    eyebrow: "Parish church · Mury 30",
    title: "Mass times",
    lead: "Holy Masses in the parish church — the Sanctuary of Our Lady of Buk.",
    sunday: "Sundays and feasts",
    weekdays: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"],
    note: "Masses are celebrated in Polish. Changes and additional Masses are given in the parish announcements (in Polish).",
    sacramentsTitle: "Sacraments",
    sacramentsText: "Baptism, confirmation, confession, anointing of the sick, marriage",
  },

  sacraments: {
    metaTitle: "Sacraments",
    eyebrow: "Parish of St. Stanislaus in Buk",
    title: "Sacraments",
    lead: "Baptism, confirmation, confession, anointing of the sick and marriage — what to prepare and whom to contact.",
    intro: "The parish office will help with every matter — in person, by phone or by e-mail. Sacraments are celebrated in Polish.",
    items: [
      {
        id: "chrzest",
        name: "Baptism",
        lead: "Baptisms are arranged at the parish office. During the summer holidays the sacrament is administered:",
        points: [
          "on the second Sunday of the month — at the 10:30 Mass,",
          "on the fourth Saturday of the month — at the 18:30 Mass.",
          "Preparation for parents and godparents: on Friday after the evening Mass.",
          "Dates may change — current information is given in the announcements.",
        ],
      },
      {
        id: "bierzmowanie",
        name: "Confirmation",
        lead: "The sacrament of Christian maturity, received after preparation in the parish.",
        points: ["Meetings and requirements for candidates are announced in the parish (in Polish)."],
      },
      {
        id: "pojednanie",
        name: "Confession",
        lead: "The sacrament of penance and reconciliation — returning to God and being reconciled with the Church.",
        points: [
          "Confession times, also before major feasts, are given in the announcements.",
          "A conversation with a priest can be arranged through the parish office.",
        ],
      },
      {
        id: "namaszczenie",
        name: "Anointing of the sick",
        lead: "A sacrament of strength for the sick, the elderly and those preparing for surgery.",
        points: ["Home visits to the sick are arranged at the parish office."],
      },
      {
        id: "malzenstwo",
        name: "Marriage",
        lead: "Engaged couples are asked to contact the parish office at least three months before the planned wedding.",
        points: [
          "Please bring your identity documents and recent certificates of baptism and confirmation.",
          "A certificate of completed marriage preparation is also required.",
          "Wedding banns are published in the parish announcements.",
        ],
      },
    ],
    massesTitle: "Mass times",
    massesSummary: (sunday, weekday) => `Sundays and feasts: ${sunday} · weekdays: ${weekday}`,
    see: "See",
    callTitle: "Parish office",
    callText: "Please call during office hours",
  },

  contact: {
    metaTitle: "Contact and parish office",
    title: "Contact and parish office",
    call: "Call during office hours",
    write: "Write to us",
    account: "Bank account",
    mapTitle: "Map — Sanctuary in Buk",
  },

  saints,
  rafal,
};
