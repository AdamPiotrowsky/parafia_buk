import type { Metadata } from "next";

import { AdminHeader } from "@/components/admin/admin-header";
import { PasswordForm } from "@/components/admin/password-form";

export const metadata: Metadata = { title: "Hasło" };

export default function PasswordPage() {
  return (
    <>
      <AdminHeader
        title="Hasło do panelu"
        lead="Jedno wspólne hasło dla wszystkich osób, które dodają treści. Po zmianie trzeba je przekazać pozostałym — ich urządzenia zostaną wylogowane."
      />
      <PasswordForm />
    </>
  );
}
