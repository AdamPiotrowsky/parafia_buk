import type { Metadata } from "next";

import { AsideLink, BulletinView } from "@/components/bulletin-view";
import { PageHeader } from "@/components/page-header";
import { currentAnnouncements } from "@/lib/bulletins";
import { site } from "@/lib/site";

export const metadata: Metadata = { title: "Ogłoszenia parafialne" };

export default function OgloszeniaPage() {
  return (
    <>
      <PageHeader eyebrow="Bieżący tydzień" title="Ogłoszenia duszpasterskie" />
      <BulletinView
        bulletin={currentAnnouncements}
        aside={
          <>
            <AsideLink href="/intencje" title="Intencje mszalne" text="Za kogo modlimy się w tym tygodniu" />
            <AsideLink href={site.links.adoration} title="Adoracja" text="Zapisz się na godzinę czuwania" />
          </>
        }
      />
    </>
  );
}
