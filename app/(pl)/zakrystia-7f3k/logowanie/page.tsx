import type { Metadata } from "next";
import Image from "next/image";
import { redirect } from "next/navigation";

import { LoginForm } from "@/components/admin/login-form";
import { hasPassword, isLoggedIn } from "@/lib/admin/auth";
import { ADMIN_PATH } from "@/lib/admin/path";

export const metadata: Metadata = { title: "Logowanie" };

export default async function LoginPage() {
  if (await isLoggedIn()) redirect(ADMIN_PATH);
  const ready = await hasPassword();

  return (
    <main className="lapis-sky flex min-h-screen items-center justify-center px-5 py-16">
      <div className="w-full max-w-sm rounded-3xl border border-gold/40 bg-vellum p-8 shadow-[0_40px_90px_-40px_rgba(8,15,35,0.9)]">
        <Image src="/logo/logo-gold.png" alt="" width={72} height={72} className="mx-auto h-16 w-16 rounded-full bg-lapis p-2" />
        <h1 className="mt-5 text-center font-display text-3xl font-semibold text-lapis">Panel parafii</h1>
        <p className="mt-1 text-center text-sm text-ink-muted">Ogłoszenia, intencje i aktualności</p>

        {ready ? (
          <LoginForm />
        ) : (
          <p className="mt-6 rounded-xl bg-wine/10 p-4 text-sm leading-6 text-wine">
            Hasło do panelu nie jest jeszcze ustawione. Na serwerze uruchom polecenie{" "}
            <code className="font-mono font-semibold">npm run admin:haslo</code>.
          </p>
        )}
      </div>
    </main>
  );
}
