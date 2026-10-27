import type { Metadata } from "next";

import { AsideLink, BulletinView } from "@/components/bulletin-view";
import { PageHeader } from "@/components/page-header";
import { currentAnnouncements } from "@/lib/bulletins";

export const metadata: Metadata = { title: "Ogłoszenia parafialne" };

export default function OgloszeniaPage() {
  return (
    <>
      <PageHeader eyebrow="Bieżący tydzień" title="Ogłoszenia duszpasterskie" />
      <BulletinView
        bulletin={currentAnnouncements}
        aside={
          <>
            <AsideLink href="/msze" title="Porządek Mszy Świętych" text="Stałe godziny Mszy w kościele farnym" />
            <AsideLink href="/intencje" title="Intencje mszalne" text="Za kogo modlimy się w tym tygodniu" />
            <AsideLink href="/kontakt" title="Biuro parafialne" text="Godziny pracy i kontakt" />
          </>
        }
      />
    </>
  );
}
