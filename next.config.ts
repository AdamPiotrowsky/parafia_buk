import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /*
   * Pozwala otwierać serwer deweloperski z innych urządzeń w sieci domowej
   * (np. telefon, tablet, inny komputer) — bez tego strona się wyświetla,
   * ale skrypty są blokowane i nic nie da się kliknąć.
   */
  /* Wspólna strona 404 dla kilku głównych layoutów (polski i /en, /de, /es) */
  experimental: {
    globalNotFound: true,
    /* Panel: zdjęcia aktualności z telefonu mają po kilka MB (domyślny limit akcji to 1 MB) */
    serverActions: { bodySizeLimit: "16mb" },
  },

  allowedDevOrigins: ["192.168.1.12", "192.168.1.*", "192.168.0.*"],

  images: {
    qualities: [75, 92],
    /* Zdjęcia galerii i aktualności ze starej strony — do czasu przeniesienia folderu uploads */
    remotePatterns: [{ protocol: "https", hostname: "sanktuarium-buk.pl", pathname: "/uploads/**" }],
  },
};

export default nextConfig;
