import crypto from "node:crypto";
import fs from "node:fs/promises";
import path from "node:path";

import { cookies, headers } from "next/headers";
import { redirect } from "next/navigation";

import { ADMIN_PATH } from "@/lib/admin/path";

/*
 * Jedno wspólne hasło do panelu — bez kont i loginów.
 *
 * data/admin.json przechowuje:
 *   hash   skrót hasła (scrypt z solą — samego hasła nie da się z niego odczytać),
 *   secret klucz do podpisywania ciasteczka sesji; zmienia się przy każdej zmianie hasła,
 *          więc zmiana hasła wylogowuje wszystkich.
 *
 * Pierwsze hasło ustawia się poleceniem `npm run admin:haslo` (scripts/ustaw-haslo.mjs
 * zapisuje ten sam format).
 */
const FILE = path.join(process.cwd(), "data", "admin.json");
const COOKIE = "zakrystia";
const SESSION_DAYS = 14;

type AdminConfig = { hash: string; salt: string; secret: string };

async function readConfig(): Promise<AdminConfig | null> {
  try {
    const c = JSON.parse(await fs.readFile(FILE, "utf-8")) as AdminConfig;
    return c.hash && c.salt && c.secret ? c : null;
  } catch {
    return null;
  }
}

function hashPassword(password: string, salt: string) {
  return crypto.scryptSync(password, salt, 64).toString("hex");
}

export async function hasPassword() {
  return (await readConfig()) !== null;
}

export async function savePassword(password: string) {
  const salt = crypto.randomBytes(16).toString("hex");
  const config: AdminConfig = {
    salt,
    hash: hashPassword(password, salt),
    secret: crypto.randomBytes(32).toString("hex"),
  };
  await fs.mkdir(path.dirname(FILE), { recursive: true });
  await fs.writeFile(FILE, JSON.stringify(config, null, 1));
}

export async function checkPassword(password: string) {
  const config = await readConfig();
  if (!config) return false;
  const a = Buffer.from(hashPassword(password, config.salt), "hex");
  const b = Buffer.from(config.hash, "hex");
  return a.length === b.length && crypto.timingSafeEqual(a, b);
}

/* ---------- sesja: „ważne do” + podpis HMAC ---------- */

function sign(value: string, secret: string) {
  return crypto.createHmac("sha256", secret).update(value).digest("hex");
}

export async function startSession() {
  const config = await readConfig();
  if (!config) return;
  const expires = Date.now() + SESSION_DAYS * 24 * 60 * 60 * 1000;
  (await cookies()).set(COOKIE, `${expires}.${sign(String(expires), config.secret)}`, {
    httpOnly: true,
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
    path: "/",
    expires: new Date(expires),
  });
}

export async function endSession() {
  (await cookies()).delete(COOKIE);
}

export async function isLoggedIn() {
  const value = (await cookies()).get(COOKIE)?.value;
  const config = await readConfig();
  if (!value || !config) return false;
  const [expires, signature] = value.split(".");
  if (!expires || !signature || Number(expires) < Date.now()) return false;
  const expected = Buffer.from(sign(expires, config.secret), "hex");
  const given = Buffer.from(signature, "hex");
  return expected.length === given.length && crypto.timingSafeEqual(expected, given);
}

/* Na początku każdej strony panelu i KAŻDEJ akcji zapisującej dane */
export async function requireAdmin() {
  if (!(await isLoggedIn())) redirect(`${ADMIN_PATH}/logowanie`);
}

/* ---------- ochrona przed zgadywaniem hasła: 5 prób na 15 minut z jednego adresu ---------- */

const attempts = new Map<string, number[]>();
const WINDOW = 15 * 60 * 1000;
const MAX_ATTEMPTS = 5;

async function clientKey() {
  const h = await headers();
  return h.get("x-forwarded-for")?.split(",")[0].trim() || h.get("x-real-ip") || "local";
}

export async function loginBlockedFor() {
  const key = await clientKey();
  const recent = (attempts.get(key) ?? []).filter((t) => Date.now() - t < WINDOW);
  attempts.set(key, recent);
  return recent.length >= MAX_ATTEMPTS ? Math.ceil((recent[0] + WINDOW - Date.now()) / 60000) : 0;
}

export async function recordFailedLogin() {
  const key = await clientKey();
  attempts.set(key, [...(attempts.get(key) ?? []), Date.now()]);
}

export async function clearFailedLogins() {
  attempts.delete(await clientKey());
}
