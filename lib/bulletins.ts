/*
 * Ogłoszenia i intencje.
 *
 * Docelowo treść trafia tu z panelu administracyjnego (import z Worda przez
 * /api/docx/preview → baza). Na razie to PRZYKŁADOWA treść pokazująca wygląd.
 */

export type Bulletin = {
  title: string;
  dateLabel: string;
  html: string;
  sample?: boolean;
};

export const currentAnnouncements: Bulletin = {
  title: "XXVIII Niedziela Zwykła",
  dateLabel: "12 października 2026",
  sample: true,
  html: `
<ol>
<li>Dziś po każdej Mszy Świętej zbiórka do puszek na pomoc misjom.</li>
<li>Nabożeństwa różańcowe w dni powszednie o 18:00, w niedziele o 17:45. Dzieci zapraszamy w środę po Mszy wieczornej.</li>
<li>W czwartek przed Mszą Świętą o 18:30 odczytamy prośby i podziękowania skierowane do Matki Bożej Bukowskiej Literackiej.</li>
<li>W środę, 22 października, wspomnienie św. Jana Pawła II.</li>
<li>Biuro parafialne czynne we wtorek, czwartek, piątek i sobotę w godz. 9:00–11:00 oraz w środę w godz. 16:00–18:00.</li>
</ol>
<blockquote>Bóg zapłać za każdą ofiarę składaną na potrzeby sanktuarium.</blockquote>
`,
};

export const currentIntentions: Bulletin = {
  title: "Intencje mszalne",
  dateLabel: "13 – 19 października 2026",
  sample: true,
  html: `
<h3>Poniedziałek, 13 października</h3>
<table><tbody>
<tr><td>7:00</td><td>† Jan Kowalski w 1. rocznicę śmierci</td></tr>
<tr><td>18:30</td><td>Dziękczynna w 25. rocznicę ślubu Anny i Piotra, z prośbą o dalsze błogosławieństwo</td></tr>
</tbody></table>
<h3>Wtorek, 14 października</h3>
<table><tbody>
<tr><td>7:00</td><td>† Maria i Stanisław z rodzicami</td></tr>
<tr><td>18:30</td><td>W intencji parafian</td></tr>
</tbody></table>
<h3>Środa, 15 października — św. Teresy od Jezusa</h3>
<table><tbody>
<tr><td>7:00</td><td>† Teresa Nowak (od sąsiadów)</td></tr>
<tr><td>18:30</td><td>O zdrowie i Boże błogosławieństwo dla Zofii</td></tr>
</tbody></table>
`,
};
