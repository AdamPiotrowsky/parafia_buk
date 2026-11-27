import { Church, Clock, Droplets, Landmark, Megaphone, Phone, Radio, Sparkles, type LucideIcon } from "lucide-react";

import { href, type ForeignLocale } from "@/lib/i18n/config";
import { content } from "@/lib/i18n/content";
import type { HomeShortcutKey } from "@/lib/i18n/content/types";
import { ui } from "@/lib/i18n/ui";
import { keyYears, type HomeTexts } from "@/lib/home";
import { site } from "@/lib/site";

/* Skróty na stronie głównej w innych językach — tylko strony, które mają tłumaczenie (plus ogłoszenia po polsku) */
const shortcutLinks: { key: HomeShortcutKey; path: string; icon: LucideIcon; external?: boolean; polish?: boolean }[] = [
  { key: "sanctuary", path: "/sanktuarium", icon: Landmark },
  { key: "masses", path: "/msze", icon: Clock },
  { key: "churches", path: "/koscioly", icon: Church },
  { key: "sacraments", path: "/sakramenty", icon: Droplets },
  { key: "saints", path: "/swieci", icon: Sparkles },
  { key: "live", path: site.links.live, icon: Radio, external: true },
  { key: "contact", path: "/kontakt", icon: Phone },
  { key: "announcements", path: "/ogloszenia", icon: Megaphone, polish: true },
];

/* Te same sekcje co w polskiej wersji (components/home/home-layout.tsx), z tekstami w danym języku */
export function foreignHome(lang: ForeignLocale): HomeTexts {
  const c = content[lang];
  const t = c.home;
  const p = t.panel;
  const u = ui[lang];

  return {
    lang,
    hero: { diocese: u.diocese, parish: p.hero.parish, sanctuary: p.hero.sanctuary },
    shortcuts: shortcutLinks.map(({ key, path, icon, external, polish }) => ({
      ...p.shortcuts[key],
      href: external || polish ? path : href(path, lang),
      icon,
      external,
    })),
    masses: {
      title: t.massTitle,
      sunday: c.masses.sunday,
      weekday: p.weekday,
      note: t.massNote,
      officeLabel: p.officeLabel,
      full: p.fullSchedule,
      fullHref: href("/msze", lang),
    },
    image: {
      eyebrow: p.imageEyebrow,
      title: t.imageTitle,
      paragraphs: [t.imageText, p.imageMore],
      alt: c.sanctuary.imageAlt,
      caption: c.sanctuary.altarCaption,
      keyYears: keyYears.map((k, i) => ({ year: k.year, text: p.keyYears[i] })),
      link: t.imageLink,
      linkHref: `${href("/sanktuarium", lang)}#historia`,
    },
    video: {
      eyebrow: p.videoEyebrow,
      title: p.videoTitle,
      link: p.videoLink,
      href: `${href("/koscioly", lang)}#fara`,
      label: c.churches.items.fara.caption,
    },
    churches: {
      eyebrow: p.churchesEyebrow,
      title: p.churchesTitle,
      link: p.churchLink,
      href: href("/koscioly", lang),
      items: {
        fara: { name: c.churches.items.fara.name, subtitle: c.churches.items.fara.subtitle, intro: p.churchIntro.fara },
        "swiety-krzyz": {
          name: c.churches.items["swiety-krzyz"].name,
          subtitle: c.churches.items["swiety-krzyz"].subtitle,
          intro: p.churchIntro["swiety-krzyz"],
        },
      },
    },
  };
}
