import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /*
   * Pozwala otwierać serwer deweloperski z innych urządzeń w sieci domowej
   * (np. telefon, tablet, inny komputer) — bez tego strona się wyświetla,
   * ale skrypty są blokowane i nic nie da się kliknąć.
   */
  allowedDevOrigins: ["192.168.1.12", "192.168.1.*", "192.168.0.*"],
};

export default nextConfig;
