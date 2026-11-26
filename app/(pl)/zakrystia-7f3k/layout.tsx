import type { Metadata } from "next";

/* Panel administracyjny — poza wyszukiwarkami */
export const metadata: Metadata = {
  title: { default: "Panel parafii", template: "%s · Panel parafii" },
  robots: { index: false, follow: false, nocache: true },
};

export default function AdminRootLayout({ children }: { children: React.ReactNode }) {
  return <div className="min-h-screen bg-parchment">{children}</div>;
}
