import { NextResponse } from "next/server";

import { isValidDate } from "@/lib/rooms";
import { applyChanges, listBookings, validateChange, type BookingChange } from "@/lib/rooms-store";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

/* GET /api/salki?od=2026-10-20&do=2026-11-02 */
export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const from = searchParams.get("od") ?? "";
  const to = searchParams.get("do") ?? "";
  if (!isValidDate(from) || !isValidDate(to)) {
    return NextResponse.json({ error: "Podaj zakres dat ?od=RRRR-MM-DD&do=RRRR-MM-DD." }, { status: 400 });
  }
  return NextResponse.json({ bookings: await listBookings(from, to) });
}

/* POST { changes: [{ date, hour, room, who | null }], author?: "Imię Nazwisko" } */
export async function POST(request: Request) {
  const body = (await request.json().catch(() => null)) as { changes?: Partial<BookingChange>[]; author?: unknown } | null;
  const changes = body?.changes;
  const author = typeof body?.author === "string" ? body.author.slice(0, 80) : undefined;
  if (!Array.isArray(changes) || !changes.length || changes.length > 600 || !changes.every(validateChange)) {
    return NextResponse.json({ error: "Nieprawidłowe dane rezerwacji." }, { status: 400 });
  }
  const result = await applyChanges(changes as BookingChange[], author);
  if (!result.ok) {
    return NextResponse.json(
      { error: "Ta zmiana nadpisuje cudzą rezerwację — podaj imię i nazwisko.", ...result },
      { status: 409 }
    );
  }
  return NextResponse.json({ ok: true });
}
