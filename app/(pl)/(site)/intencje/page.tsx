import type { Metadata } from "next";

import { AsideLink, BulletinArchive, BulletinView } from "@/components/bulletin-view";
import { PageHeader } from "@/components/page-header";
import { getBulletinPage } from "@/lib/bulletins";

/* Treść dodawana w panelu — zawsze świeża */
export const dynamic = "force-dynamic";

export const metadata: Metadata = { title: "Intencje mszalne" };

export default async function IntencjePage({ searchParams }: { searchParams: Promise<{ wpis?: string }> }) {
  const { bulletin, archive, currentId, latestId } = await getBulletinPage("intentions", (await searchParams).wpis);

  return (
    <>
      <PageHeader eyebrow="Bieżący tydzień" title="Intencje mszalne" />
      <BulletinView
        bulletin={bulletin}
        aside={
          <>
            <BulletinArchive base="/intencje" items={archive} currentId={currentId} latestId={latestId} />
            <AsideLink href="/ogloszenia" title="Ogłoszenia" text="Ogłoszenia duszpasterskie na ten tydzień" />
            <AsideLink href="/kontakt" title="Biuro parafialne" text="Zamów Mszę Świętą w swojej intencji" />
          </>
        }
      />
    </>
  );
}
