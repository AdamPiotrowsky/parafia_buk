import type { BulletinKind } from "@/lib/content-store";

/* Ogłoszenia i intencje działają w panelu tak samo — różnią się tylko nazwami i adresami */
export const bulletinKinds: Record<
  BulletinKind,
  { label: string; segment: string; publicPath: string; newLabel: string; titleHint: string; dateHint: string }
> = {
  announcements: {
    label: "Ogłoszenia",
    segment: "ogloszenia",
    publicPath: "/ogloszenia",
    newLabel: "Nowe ogłoszenia",
    titleHint: "np. XXVIII Niedziela Zwykła",
    dateHint: "np. 12 października 2026",
  },
  intentions: {
    label: "Intencje",
    segment: "intencje",
    publicPath: "/intencje",
    newLabel: "Nowe intencje",
    titleHint: "np. Intencje mszalne",
    dateHint: "np. 13 – 19 października 2026",
  },
};
