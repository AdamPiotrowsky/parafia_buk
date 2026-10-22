/*
 * Duszpasterze parafii — lista proboszczów i kapłanów pochodzących z parafii
 * według dotychczasowej strony sanktuarium-buk.pl, uzupełniona o zmianę proboszcza w 2025 roku.
 */

export const currentPastor = {
  name: "ks. Paweł Froelich",
  role: "Proboszcz parafii",
  since: "2025",
};

/* Pozostali duszpasterze posługujący obecnie w parafii */
export const currentClergy = [
  { name: "ks. Rafał Matelski", role: "Wikariusz" },
  { name: "ks. Maciej Wala", role: "Rezydent" },
];

export type Pastor = { years: string; name: string; note?: string };

export const pastors: Pastor[] = [
  { years: "1779 – 1803", name: "ks. Wojciech Wysogota Zakrzewski", note: "† 28.02.1804" },
  { years: "1803 – 1808", name: "ks. Walenty Kielanowicz", note: "† 11.09.1808" },
  { years: "1808 – 1810", name: "ks. Wojciech Sterczyński", note: "wikariusz zarządzający parafią" },
  { years: "1810 – 1841", name: "ks. Wawrzyniec Budzyński", note: "† 18.07.1841" },
  { years: "1841 – 1856", name: "ks. Bonawentura Kulczewicz", note: "† 6.04.1856" },
  { years: "1856 – 1870", name: "ks. Marcin Grzywieński", note: "† 1.05.1870" },
  { years: "1870 – 1900", name: "ks. Aleksander Akoszewski", note: "† 9.01.1900" },
  { years: "1900 – 1905", name: "ks. Jan Fligierski", note: "† 28.07.1905" },
  { years: "1906 – 1932", name: "ks. Stanisław Niziński", note: "† 5.12.1932" },
  { years: "1932 – 1939", name: "ks. Stanisław Kuliszak", note: "† 20.06.1939 — wielki czciciel Matki Bożej Bukowskiej" },
  { years: "1939 – 1942", name: "ks. Kornel Wierzbicki", note: "† w Dachau 12.08.1942" },
  { years: "1945 – 1958", name: "ks. Antoni Chilomer", note: "† 21.07.1958" },
  { years: "1958 – 1982", name: "ks. inf. Teofil Ratajczak", note: "† 15.09.2004" },
  { years: "1982 – 1989", name: "ks. dr Zygmunt Jonaczyk", note: "† 1.11.1999" },
  { years: "1989 – 1997", name: "ks. Jan Majchrzak", note: "† 18.06.2025" },
  { years: "1997 – 2025", name: "ks. Andrzej Szczepaniak", note: "sanktuarium (2015) i koronacja obrazu (2017)" },
  { years: "od 2025", name: "ks. Paweł Froelich" },
];

/* Kapłani i zakonnicy pochodzący z parafii — w nawiasie rok święceń */
export const vocations: { name: string; ordained?: string; note?: string }[] = [
  { name: "ks. Michał Kosicki", ordained: "1932", note: "† 1981" },
  { name: "ks. Bogdan Wąsowicz", ordained: "1933", note: "† 1981" },
  { name: "ks. Roman Hildebrand", ordained: "1934", note: "† 1971" },
  { name: "ks. Leon Cieślak SAC", ordained: "1939", note: "† 1953" },
  { name: "ks. Ignacy Cieślak SAC", ordained: "1943", note: "misjonarz w Rwandzie, † 28.12.2002" },
  { name: "ks. Henryk Herkt SAC", ordained: "1954", note: "Otwock" },
  { name: "ks. Adam Nowak", ordained: "1956", note: "† 1990" },
  { name: "ks. Kazimierz Wylegała", ordained: "1958", note: "proboszcz w Rawiczu" },
  { name: "ks. Lech Zeuschner", ordained: "1973", note: "proboszcz w Kołaczkowicach" },
  { name: "ks. Czesław Liczbański", ordained: "1973", note: "proboszcz w Poznaniu" },
  { name: "ks. Andrzej Szulc", ordained: "1974", note: "proboszcz w Lasocicach" },
  { name: "ks. Ireneusz Szwarc", ordained: "1979", note: "proboszcz Bazyliki Archikatedralnej w Poznaniu" },
  { name: "ks. Tadeusz Osiński", ordained: "1979", note: "proboszcz w Międzychodzie" },
  { name: "br. Flawiusz Laufer OFM", note: "Toruń" },
  { name: "ks. Marek Jankowski", ordained: "1991", note: "wikariusz w Szamotułach" },
  { name: "ks. Adam Przewoźny", ordained: "2002", note: "proboszcz w Lusówku" },
  { name: "ks. Jakub Lechmiak", ordained: "2006", note: "proboszcz w Kamionkach" },
  { name: "ks. Jan Cieślak", ordained: "2019" },
];
