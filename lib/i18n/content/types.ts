import type { TimelineEvent } from "@/lib/history";

export type HomeShortcutKey = "sanctuary" | "masses" | "churches" | "sacraments" | "saints" | "live" | "contact" | "announcements";

/* Treść stałych stron w jednym języku — układ stron jest wspólny (app/[lang]) */
export type PageContent = {
  home: {
    metaTitle: string;
    metaDescription: string;
    intro: string;
    welcomeTitle: string;
    welcome: string[];
    cards: { key: "sanctuary" | "churches" | "masses" | "contact"; title: string; text: string }[];
    massTitle: string;
    massNote: string;
    imageTitle: string;
    imageText: string;
    imageLink: string;
    more: string;
    /* Teksty wspólnego układu strony głównej (jak w wersji polskiej) */
    panel: {
      hero: { parish: [string, string]; sanctuary: [string, string] };
      shortcuts: Record<HomeShortcutKey, { title: string; hint: string }>;
      weekday: string;
      officeLabel: string;
      fullSchedule: string;
      imageEyebrow: string;
      imageMore: string;
      keyYears: [string, string, string, string, string];
      videoEyebrow: string;
      videoTitle: string;
      videoLink: string;
      churchesEyebrow: string;
      churchesTitle: string;
      churchLink: string;
      churchIntro: Record<"fara" | "swiety-krzyz", string>;
      contactLink: string;
    };
  };

  sanctuary: {
    metaTitle: string;
    eyebrow: string;
    title: string;
    lead: string;
    coronationEyebrow: string;
    coronationTitle: string;
    coronation: string[];
    pillars: { title: string; text: string }[];
    feastsTitle: string;
    feasts: { date: string; name: string; note: string }[];
    historyEyebrow: string;
    historyTitle: string;
    image: string[];
    quote: string;
    quoteBy: string;
    timelineEyebrow: string;
    timelineTitle: string;
    eras: { name: string; span: string; events: TimelineEvent[] }[];
    imageAlt: string;
    crownedCaption: string;
    altarCaption: string;
  };

  churches: {
    metaTitle: string;
    eyebrow: string;
    title: string;
    lead: string;
    timeline: string;
    items: Record<
      "fara" | "swiety-krzyz",
      {
        name: string;
        subtitle: string;
        style: string;
        paragraphs: string[];
        facts: { label: string; value: string }[];
        timeline: TimelineEvent[];
        caption: string;
      }
    >;
  };

  masses: {
    metaTitle: string;
    eyebrow: string;
    title: string;
    lead: string;
    sunday: string;
    weekdays: string[];
    note: string;
    sacramentsTitle: string;
    sacramentsText: string;
  };

  sacraments: {
    metaTitle: string;
    eyebrow: string;
    title: string;
    lead: string;
    intro: string;
    items: { id: string; name: string; lead: string; points: string[] }[];
    massesTitle: string;
    massesSummary: (sunday: string, weekday: string) => string;
    see: string;
    callTitle: string;
    callText: string;
  };

  contact: {
    metaTitle: string;
    title: string;
    call: string;
    write: string;
    account: string;
    mapTitle: string;
  };

  saints: SaintsContent;
  rafal: RafalContent;
};

/* Strona „Święci” bez kalendarza liturgicznego (ten zostaje po polsku) */
export type SaintsContent = {
  metaTitle: string;
  eyebrow: string;
  title: string;
  lead: string;
  onThisPage: string;
  patronsEyebrow: string;
  patronsTitle: string;
  attribute: string;
  readMore: string;
  /* W tej samej kolejności co patrons w lib/saints.ts */
  patrons: { name: string; feast: string; role: string; attribute: string; text: string }[];
  relicsEyebrow: string;
  relicsTitle: string;
  relicsLead: string;
  feastLabel: string;
  moreRafal: string;
  relicPhoto: string;
  relicAlt: string;
  /* Klucz = slug z lib/relics.ts */
  relics: Record<string, { name: string; life?: string; feast?: string; text: string }>;
  calendarNote: string;
};

export type RafalContent = {
  metaTitle: string;
  metaDescription: string;
  eyebrow: string;
  title: string;
  lead: string;
  relicCaption: string;
  bio: string[];
  lifeEyebrow: string;
  lifeTitle: string;
  life: TimelineEvent[];
  prayerLabel: string;
  prayer: string;
  wysoczkaTitle: string;
  wysoczkaText: string;
  pilgrimageTitle: string;
  pilgrimageText: string;
  groupTitle: string;
  groupText: string;
  back: string;
};
