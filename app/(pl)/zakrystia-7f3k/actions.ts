"use server";

import crypto from "node:crypto";
import fs from "node:fs/promises";
import path from "node:path";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import sharp from "sharp";

import {
  checkPassword,
  clearFailedLogins,
  endSession,
  loginBlockedFor,
  recordFailedLogin,
  requireAdmin,
  savePassword,
  startSession,
} from "@/lib/admin/auth";
import { bulletinKinds } from "@/lib/admin/kinds";
import { ADMIN_PATH } from "@/lib/admin/path";
import {
  deleteBulletin,
  deleteNews,
  PHOTOS_DIR,
  removePhotos,
  saveBulletin,
  saveNews,
  type BulletinKind,
} from "@/lib/content-store";
import { convertDocxToHtml, sanitizeContent, type ConvertedDocument } from "@/lib/documents/convert-docx";
import { news as legacyNews } from "@/lib/legacy";

export type FormState = { error?: string; ok?: string } | undefined;

const text = (fd: FormData, key: string, max = 300) => String(fd.get(key) ?? "").trim().slice(0, max);

/* ---------- logowanie ---------- */

export async function login(_: FormState, fd: FormData): Promise<FormState> {
  const blocked = await loginBlockedFor();
  if (blocked) return { error: `Zbyt wiele prób. Spróbuj ponownie za ${blocked} min.` };

  if (!(await checkPassword(String(fd.get("password") ?? "")))) {
    await recordFailedLogin();
    // chwila zwłoki utrudnia zgadywanie hasła
    await new Promise((r) => setTimeout(r, 800));
    return { error: "Nieprawidłowe hasło." };
  }
  await clearFailedLogins();
  await startSession();
  redirect(ADMIN_PATH);
}

export async function logout() {
  await endSession();
  redirect(`${ADMIN_PATH}/logowanie`);
}

export async function changePassword(_: FormState, fd: FormData): Promise<FormState> {
  await requireAdmin();
  const current = String(fd.get("current") ?? "");
  const next = String(fd.get("next") ?? "");
  if (!(await checkPassword(current))) return { error: "Obecne hasło jest nieprawidłowe." };
  if (next.length < 10) return { error: "Nowe hasło musi mieć co najmniej 10 znaków." };
  if (next !== String(fd.get("repeat") ?? "")) return { error: "Powtórzone hasło jest inne." };
  await savePassword(next);
  // nowy klucz sesji wylogował wszystkich — także nas, więc logujemy od nowa
  await startSession();
  return { ok: "Hasło zmienione. Pozostałe urządzenia zostały wylogowane." };
}

/* ---------- import z Worda ---------- */

const MAX_WORD = 10 * 1024 * 1024;

export async function convertWord(fd: FormData): Promise<ConvertedDocument | { error: string }> {
  await requireAdmin();
  const file = fd.get("file");
  if (!(file instanceof File)) return { error: "Nie przesłano pliku." };
  if (!file.name.toLowerCase().endsWith(".docx"))
    return { error: "To nie jest plik .docx. Starsze pliki .doc zapisz w Wordzie jako „Dokument programu Word (.docx)”." };
  if (file.size > MAX_WORD) return { error: "Plik jest za duży (maks. 10 MB)." };
  try {
    return await convertDocxToHtml(Buffer.from(await file.arrayBuffer()));
  } catch (e) {
    console.error(e);
    return { error: "Nie udało się odczytać pliku. Czy to na pewno dokument Word?" };
  }
}

/* ---------- ogłoszenia i intencje ---------- */

export async function saveBulletinAction(
  kind: BulletinKind,
  id: string | undefined,
  _: FormState,
  fd: FormData
): Promise<FormState> {
  await requireAdmin();
  const title = text(fd, "title", 200);
  const html = sanitizeContent(String(fd.get("html") ?? ""));
  if (!title) return { error: "Podaj tytuł." };
  if (!html) return { error: "Treść jest pusta — wgraj plik Word albo wpisz treść." };

  await saveBulletin(kind, { title, dateLabel: text(fd, "dateLabel", 120), html, fileName: text(fd, "fileName", 200) || undefined }, id);
  const k = bulletinKinds[kind];
  revalidatePath(k.publicPath);
  redirect(`${ADMIN_PATH}/${k.segment}?zapisano=1`);
}

export async function deleteBulletinAction(kind: BulletinKind, id: string) {
  await requireAdmin();
  await deleteBulletin(kind, id);
  const k = bulletinKinds[kind];
  revalidatePath(k.publicPath);
  redirect(`${ADMIN_PATH}/${k.segment}`);
}

/* ---------- aktualności ---------- */

const MAX_PHOTO = 15 * 1024 * 1024;

/* Zdjęcie zmniejszamy do rozsądnego rozmiaru i zapisujemy jako JPG (zdjęcia z telefonu mają po kilka MB) */
async function storePhoto(file: File) {
  const name = `${crypto.randomBytes(8).toString("hex")}.jpg`;
  const data = await sharp(Buffer.from(await file.arrayBuffer()))
    .rotate()
    .resize({ width: 1800, height: 1800, fit: "inside", withoutEnlargement: true })
    .jpeg({ quality: 84, mozjpeg: true })
    .toBuffer();
  await fs.mkdir(PHOTOS_DIR, { recursive: true });
  await fs.writeFile(path.join(PHOTOS_DIR, name), data);
  return name;
}

export async function saveNewsAction(id: string | undefined, _: FormState, fd: FormData): Promise<FormState> {
  await requireAdmin();
  const title = text(fd, "title", 200);
  const date = text(fd, "date", 10);
  const html = sanitizeContent(String(fd.get("html") ?? ""));
  if (!title) return { error: "Podaj tytuł." };
  if (!/^\d{4}-\d{2}-\d{2}$/.test(date)) return { error: "Podaj datę." };
  if (!html) return { error: "Wpisz treść aktualności." };

  let image: string | null | undefined;
  const photo = fd.get("photo");
  if (photo instanceof File && photo.size > 0) {
    if (!photo.type.startsWith("image/")) return { error: "Zdjęcie musi być plikiem graficznym (JPG, PNG, WEBP)." };
    if (photo.size > MAX_PHOTO) return { error: "Zdjęcie jest za duże (maks. 15 MB)." };
    try {
      image = await storePhoto(photo);
    } catch {
      return { error: "Nie udało się odczytać zdjęcia. Spróbuj z plikiem JPG lub PNG." };
    }
  } else if (fd.get("removePhoto") === "1") {
    image = null;
  }

  const removed = await saveNews({ title, date, html, image }, id, legacyNews.map((n) => n.slug));
  await removePhotos(removed);
  revalidatePath("/aktualnosci", "layout");
  redirect(`${ADMIN_PATH}/aktualnosci?zapisano=1`);
}

export async function deleteNewsAction(id: string) {
  await requireAdmin();
  await removePhotos(await deleteNews(id));
  revalidatePath("/aktualnosci", "layout");
  redirect(`${ADMIN_PATH}/aktualnosci`);
}
