import type { Metadata } from "next";

import { PageHeader } from "@/components/page-header";
import { RoomSchedule } from "@/components/room-schedule";
import { rooms } from "@/lib/rooms";

export const metadata: Metadata = { title: "Grafik salek", robots: { index: false } };

export default function GrafikSalekPage() {
  return (
    <>
      <PageHeader
        eyebrow="Dla wspólnot"
        title="Grafik salek"
        lead={`Rezerwacja sal parafialnych: ${rooms.map((r) => r.name.toLowerCase()).join(" i ")}. Kliknij wolną godzinę, aby ją zarezerwować, lub zajętą — aby ją zmienić albo zwolnić.`}
      />
      <section className="mx-auto max-w-[88rem] px-4 py-12 sm:px-5 lg:px-8">
        <RoomSchedule />
      </section>
    </>
  );
}
