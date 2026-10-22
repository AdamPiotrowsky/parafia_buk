import { NextResponse } from "next/server";

import { listLog } from "@/lib/rooms-store";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

/* GET /api/salki/historia — ostatnie nadpisania i zwolnienia cudzych rezerwacji */
export async function GET() {
  return NextResponse.json({ log: await listLog() });
}
