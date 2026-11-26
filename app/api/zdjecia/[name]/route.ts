import fs from "node:fs/promises";
import path from "node:path";

import { PHOTOS_DIR } from "@/lib/content-store";

/* Zdjęcia aktualności dodane w panelu (data/zdjecia) — nazwy są losowe i się nie zmieniają */
export async function GET(_: Request, { params }: { params: Promise<{ name: string }> }) {
  const { name } = await params;
  if (!/^[a-f0-9]{16}\.jpg$/.test(name)) return new Response("Nie znaleziono", { status: 404 });
  try {
    const data = await fs.readFile(path.join(PHOTOS_DIR, name));
    return new Response(data, {
      headers: { "Content-Type": "image/jpeg", "Cache-Control": "public, max-age=31536000, immutable" },
    });
  } catch {
    return new Response("Nie znaleziono", { status: 404 });
  }
}
