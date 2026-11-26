import type { Metadata } from "next";

import { AsideLink, BulletinArchive, BulletinView } from "@/components/bulletin-view";
import { PageHeader } from "@/components/page-header";
import { getBulletinPage } from "@/lib/bulletins";

/* Treść dodawana w panelu — zawsze świeża */
export const dynamic = "force-dynamic";

export const metadata: Metadata = { title: "Ogłoszenia parafialne" };

export default async function OgloszeniaPage({ searchParams }: { searchParams: Promise<{ wpis?: string }> }) {
  const { bulletin, archive, currentId, latestId } = await getBulletinPage("announcements", (await searchParams).wpis);

  return (
    <>
      <PageHeader eyebrow="Bieżący tydzień" title="Ogłoszenia duszpasterskie" />
      <BulletinView
        bulletin={bulletin}
        aside={
          <>
            <BulletinArchive base="/ogloszenia" items={archive} currentId={currentId} latestId={latestId} />
            <AsideLink href="/msze" title="Porządek Mszy Świętych" text="Stałe godziny Mszy w kościele farnym" />
            <AsideLink href="/intencje" title="Intencje mszalne" text="Za kogo modlimy się w tym tygodniu" />
            <AsideLink href="/kontakt" title="Biuro parafialne" text="Godziny pracy i kontakt" />
          </>
        }
      />
    </>
  );
}
