import { rafal, saints } from "./saints-es";
import type { PageContent } from "./types";

export const es: PageContent = {
  home: {
    metaTitle: "Parroquia de San Estanislao en Buk · Santuario de Nuestra Señora de Buk",
    metaDescription:
      "Santuario de Nuestra Señora de Buk «Literacka» y Parroquia de San Estanislao, obispo y mártir, en Buk, Archidiócesis de Poznań. Horario de misas, historia y contacto.",
    intro: "Desde hace casi seis siglos los peregrinos vienen aquí a encontrarse con Aquella que muestra el camino hacia su Hijo.",
    welcomeTitle: "Bienvenidos a Buk",
    welcome: [
      "Buk es una pequeña ciudad de la Gran Polonia, a unos 35 km al oeste de Poznań. En su iglesia parroquial de San Estanislao se venera la imagen milagrosa de Nuestra Señora de Buk, conocida al menos desde 1430 y coronada en 2017.",
      "Peregrinos y visitantes son siempre bienvenidos. La Santa Misa se celebra en polaco; si desea concertar una visita, una misa para un grupo o una conversación con un sacerdote, póngase en contacto con el despacho parroquial.",
    ],
    cards: [
      { key: "sanctuary", title: "El santuario", text: "La historia de la imagen milagrosa, su coronación y las fiestas del santuario." },
      { key: "churches", title: "Dos iglesias", text: "Una iglesia clasicista proyectada por Schinkel y una iglesia de madera de 1760." },
      { key: "masses", title: "Horario de misas", text: "Domingos, días laborables y festivos en la iglesia parroquial." },
      { key: "contact", title: "Contacto", text: "Horario del despacho parroquial, teléfono, correo y cómo llegar." },
    ],
    massTitle: "Santa Misa",
    massNote: "Todas las misas se celebran en polaco en la iglesia parroquial (calle Mury 30).",
    imageTitle: "Hodegetria, la que muestra el camino",
    imageText:
      "El Niño Jesús bendice con una mano y sostiene en la otra un libro grueso, signo de los «literatos», las antiguas cofradías que dieron nombre a la imagen.",
    imageLink: "Historia de la imagen",
    more: "Más información",
  },

  sanctuary: {
    metaTitle: "El santuario",
    eyebrow: "Santuario diocesano · desde 2015",
    title: "Santuario de Nuestra Señora de Buk «Literacka»",
    lead: "La iglesia parroquial de San Estanislao, obispo y mártir, donde desde el siglo XV los peregrinos se encomiendan a Nuestra Señora de Buk.",
    coronationEyebrow: "Coronada el 10 de septiembre de 2017",
    coronationTitle: "Casi ochenta años esperando las coronas",
    coronation: [
      "Ya en 1936 el párroco Stanisław Kuliszak pidió la coronación pontificia de la imagen milagrosa. La ceremonia se preparó para septiembre de 1939, en el 650.º aniversario de la fundación de la ciudad. La guerra truncó esos planes y en enero de 1945 la imagen medieval ardió junto con la iglesia.",
      "La devoción a la Virgen sobrevivió. Eugenia Gogolewska pintó una nueva imagen; el 23 de diciembre de 2015 el arzobispo Stanisław Gądecki erigió en la iglesia parroquial un santuario diocesano, y el 10 de septiembre de 2017 la imagen de Nuestra Señora de Buk fue coronada.",
    ],
    pillars: [
      {
        title: "¿Por qué «Literacka»?",
        text: "El Niño sostiene un libro grueso, signo de los literatos, antiguas cofradías que rodeaban la imagen de una especial veneración.",
      },
      {
        title: "Indulgencia plenaria a perpetuidad",
        text: "Por una bula del 10 de marzo de 1781, el papa Pío VI concedió al altar de la Virgen indulgencia plenaria en las fiestas de la Visitación (31 de mayo) y de la Natividad de María (8 de septiembre).",
      },
      {
        title: "El toque de clarín de Buk",
        text: "Desde 1935 un toque de clarín, compuesto y donado a la iglesia por el director de banda Czesław Jakubowski, invita a los fieles a honrar a la Madre de Dios.",
      },
    ],
    feastsTitle: "Fiestas del santuario",
    feasts: [
      { date: "31 de mayo", name: "Visitación de la Virgen María", note: "Indulgencia plenaria en el altar de la Virgen" },
      { date: "8 de septiembre", name: "Natividad de la Virgen María", note: "Fiesta principal del santuario" },
    ],
    historyEyebrow: "Historia de la imagen",
    historyTitle: "Nuestra Señora de Buk a lo largo de seis siglos",
    image: [
      "No sabemos cuándo llegó la imagen a Buk. La primera mención de una imagen «famosa por sus gracias» data de 1430. Representa a la Santísima Virgen María con el Niño Jesús en el brazo izquierdo. Jesús sostiene un libro grueso, símbolo de los literatos, y levanta la otra mano para bendecir.",
      "El sacerdote y profesor Szczęsny Dettloff, que restauró la imagen en 1933–1934, clasificó a la Virgen de Buk como Hodegetria, «la que muestra el camino», un tipo procedente del arte bizantino y muy difundido en Polonia en numerosas variantes. No se sabe si el modelo llegó directamente de Bizancio o a través de Italia.",
      "Los ángeles revelan el carácter local de la imagen: en lugar de incensarios sostienen cintas con el comienzo del himno pascual «Alégrate, Reina del cielo, aleluya» y las palabras «Dios te salve, María, llena eres de gracia». Según Dettloff, una Hodegetria así no se encuentra en ningún lugar fuera de Polonia.",
    ],
    quote:
      "La Madre de Dios, mirando desde debajo de su velo con una mirada cautivadora hacia el espectador, traslada el contacto espiritual al Hijo de Dios, que la bendice con la mirada y con el gesto de su manita.",
    quoteBy: "según el prof. Szczęsny Dettloff",
    timelineEyebrow: "Cronología",
    timelineTitle: "La historia de la imagen",
    eras: [
      {
        name: "Edad Media",
        span: "siglo XV",
        events: [
          { year: "1418", title: "Consagración de la iglesia gótica", text: "Se consagra la primera iglesia gótica de ladrillo. La imagen ocupa un lugar en uno de los altares laterales." },
          { year: "1430", title: "Primera mención de la imagen", text: "El registro más antiguo conservado de la imagen «famosa por sus gracias». No sabemos cuándo fue traída a Buk.", major: true },
        ],
      },
      {
        name: "La antigua Polonia",
        span: "siglos XVI – XVIII",
        events: [
          { year: "1576", title: "Una capilla propia", text: "La imagen se traslada a una capilla preparada especialmente para ella." },
          { year: "1662", title: "Coronas de plata", text: "Las actas de la visita del obispo de Poznań Wojciech Tolibowski mencionan dos coronas de plata, sobre la cabeza de María y del Niño. Sin embargo, no hay documento de una coronación formal." },
          { year: "1697 – 1698", title: "Declarada milagrosa", text: "Tras una investigación oficial, el obispo auxiliar de Poznań Hieronim Wierzbowski declara milagrosa la imagen.", major: true },
          { year: "1702", title: "El grabado de Siemieński", text: "El grabador Andrzej Siemieński realiza una plancha de cobre para estampas: la imagen llega a los hogares de los peregrinos." },
          { year: "h. 1760", title: "Vestidos de plata", text: "Un siglo después, la imagen recibe vestidos de plata." },
          { year: "1781", title: "Bula del papa Pío VI", text: "Por una bula del 10 de marzo, el papa concede al altar de Nuestra Señora «Literacka» indulgencia plenaria «a perpetuidad» en las fiestas de la Natividad (8 IX) y de la Visitación (31 V).", major: true },
        ],
      },
      {
        name: "El siglo XIX y la renovación",
        span: "1806 – 1939",
        events: [
          { year: "1806", title: "Se derrumba la torre", text: "La torre, al derrumbarse, destruye la iglesia gótica. La imagen milagrosa se salva y es trasladada a la iglesia de madera de la Santa Cruz.", major: true },
          { year: "1846", title: "De vuelta al altar mayor", text: "En la nueva iglesia parroquial, construida según el proyecto de Karl Friedrich Schinkel, la imagen se coloca en el altar mayor." },
          { year: "1933 – 1934", title: "Restauración del prof. Dettloff", text: "Por iniciativa del párroco Stanisław Kuliszak, el prof. Szczęsny Dettloff restaura la imagen. El 8 de septiembre de 1934 vuelve solemnemente a la iglesia y al día siguiente es descubierta." },
          { year: "1935", title: "El toque de clarín de Buk", text: "El director de banda Czesław Jakubowski dona a la iglesia un toque de clarín de su composición, «para que por siempre llame a los fieles a honrar a la Santísima Madre»." },
          { year: "1936 – 1939", title: "Gestiones para la coronación", text: "El párroco Kuliszak pide la coronación pontificia, primero para 1940 y después para septiembre de 1939, en el 650.º aniversario de la ciudad. Muere el 20 de junio de 1939." },
        ],
      },
      {
        name: "Guerra y renacimiento",
        span: "1941 – hoy",
        events: [
          { year: "1941", title: "La iglesia, almacén", text: "Los ocupantes convierten la iglesia parroquial en un almacén de uniformes militares." },
          { year: "5 I 1945", title: "Incendio y pérdida de la imagen", text: "Las tropas alemanas en retirada incendian la iglesia. La imagen medieval arde.", major: true },
          { year: "1945", title: "Una nueva imagen", text: "Gracias al párroco Antoni Hilomer, la parroquia asume la antigua iglesia protestante de la plaza Reszki. Allí se coloca una imagen pintada sobre lienzo por Eugenia Gogolewska." },
          { year: "1948", title: "Consagración de la iglesia reconstruida", text: "El 3 de octubre el arzobispo Walenty Dymek consagra la iglesia reconstruida. La imagen de la Virgen vuelve al altar mayor." },
          { year: "2015", title: "Santuario", text: "Por decreto del arzobispo Stanisław Gądecki del 23 de diciembre, la iglesia parroquial recibe el título de Santuario Diocesano de Nuestra Señora de Buk «Literacka».", major: true },
          { year: "2017", title: "Coronación", text: "Tras casi ochenta años de gestiones, el 10 de septiembre la imagen de Nuestra Señora de Buk es coronada.", major: true },
        ],
      },
    ],
    imageAlt: "La imagen coronada de Nuestra Señora de Buk",
    crownedCaption: "Coronada el 10 de septiembre de 2017",
    altarCaption: "La imagen en el altar mayor de la iglesia parroquial",
  },

  churches: {
    metaTitle: "Iglesias de la parroquia",
    eyebrow: "Patrimonio de la parroquia",
    title: "Dos iglesias, ocho siglos",
    lead: "Una iglesia parroquial clasicista proyectada por Schinkel y una iglesia de madera en el lugar del antiguo castro: testigos de toda la historia de Buk.",
    timeline: "Cronología",
    items: {
      fara: {
        name: "Iglesia parroquial",
        subtitle: "de San Estanislao, obispo y mártir",
        style: "Clasicismo tardío",
        paragraphs: [
          "Las primeras menciones de una iglesia parroquial en Buk datan de 1257 y 1298. En 1414–1426 se levantó aquí una iglesia gótica de ladrillo, en la que la imagen milagrosa fue venerada durante casi cuatrocientos años.",
          "En 1806 se derrumbó la torre y la iglesia en ruinas fue demolida. En su lugar, en 1838–1846, se construyó una iglesia de estilo clasicista tardío, inspirada en el orden jónico, según el proyecto de Karl Friedrich Schinkel, el arquitecto que transformó Berlín.",
          "El 5 de enero de 1945 las tropas alemanas en retirada incendiaron la iglesia; solo quedaron los muros exteriores. La reconstrucción duró de 1946 a 1951. En 1957 St. Powalisz realizó cuatro vidrieras y en 1965–1966 T. y St. Szukalski cubrieron el interior de pinturas murales.",
        ],
        facts: [
          { label: "Primera mención", value: "1257" },
          { label: "Arquitecto", value: "K. F. Schinkel" },
          { label: "Reconstrucción", value: "1946 – 1951" },
          { label: "Santuario desde", value: "2015" },
        ],
        timeline: [
          { year: "1257", title: "Primera mención", text: "La iglesia parroquial aparece en las fuentes." },
          { year: "1414 – 1426", title: "Iglesia gótica", text: "Una iglesia de ladrillo, consagrada en 1418." },
          { year: "1806", title: "Se derrumba la torre", text: "La iglesia es demolida.", major: true },
          { year: "1838 – 1846", title: "La iglesia de Schinkel", text: "Un nuevo templo clasicista." },
          { year: "1945", title: "Incendio", text: "Solo quedan los muros exteriores.", major: true },
          { year: "1946 – 1951", title: "Reconstrucción", text: "Consagrada el 3 de octubre de 1948." },
          { year: "1957", title: "Vidrieras", text: "Cuatro vidrieras de St. Powalisz." },
          { year: "1965 – 1966", title: "Pinturas murales", text: "Obra de T. y St. Szukalski." },
        ],
        caption: "La iglesia parroquial a vista de pájaro: un pórtico clasicista entre el verde del viejo Buk",
      },
      "swiety-krzyz": {
        name: "Iglesia de la Santa Cruz",
        subtitle: "en el antiguo arrabal de Konary",
        style: "Arquitectura de madera",
        paragraphs: [
          "La iglesia se alza en el lugar del castro más antiguo de Buk o de su arrabal, más tarde el barrio de Konary. En 1609 el obispo de Poznań Andrzej Opaliński construyó aquí una iglesia dedicada a San Adalberto.",
          "Renovada en el siglo XVII, fue demolida a mediados del siguiente. En 1760 se levantó en su lugar la actual iglesia de madera con planta de cruz griega, fundada por Wiktor Raczyński, señor de Wojnowice.",
          "El templo conserva sus pinturas murales originales con escenas de la vida de San Adalberto, recuerdo del antiguo patrono del lugar. Junto a él se encuentran un campanario de madera de 1757 y una figura del «Ecce Homo» de 1762.",
        ],
        facts: [
          { label: "Primera iglesia", value: "1609" },
          { label: "Iglesia actual", value: "1760" },
          { label: "Campanario", value: "1757" },
          { label: "Ecce Homo", value: "1762" },
        ],
        timeline: [
          { year: "1609", title: "Iglesia de San Adalberto", text: "Fundación del obispo Andrzej Opaliński." },
          { year: "med. s. XVIII", title: "Demolición", text: "La antigua iglesia es derribada." },
          { year: "1757", title: "Campanario", text: "Un campanario de madera que se conserva hasta hoy." },
          { year: "1760", title: "Nueva iglesia", text: "Fundación de Wiktor Raczyński.", major: true },
          { year: "1762", title: "Ecce Homo", text: "Figura de Cristo doliente junto a la iglesia." },
          { year: "1806", title: "Refugio de la imagen", text: "Aquí llega la imagen milagrosa tras la catástrofe de la iglesia parroquial.", major: true },
        ],
        caption: "Interior de la iglesia de la Santa Cruz: bóveda de madera pintada y altar con crucifijo",
      },
    },
  },

  masses: {
    metaTitle: "Horario de misas",
    eyebrow: "Iglesia parroquial · calle Mury 30",
    title: "Horario de misas",
    lead: "Santas Misas en la iglesia parroquial, Santuario de Nuestra Señora de Buk.",
    sunday: "Domingos y festivos",
    weekdays: ["Lunes", "Martes", "Miércoles", "Jueves", "Viernes", "Sábado"],
    note: "Las misas se celebran en polaco. Los cambios y las misas adicionales se indican en los avisos parroquiales (en polaco).",
    sacramentsTitle: "Sacramentos",
    sacramentsText: "Bautismo, confirmación, confesión, unción de los enfermos, matrimonio",
  },

  sacraments: {
    metaTitle: "Sacramentos",
    eyebrow: "Parroquia de San Estanislao en Buk",
    title: "Sacramentos",
    lead: "Bautismo, confirmación, confesión, unción de los enfermos y matrimonio: qué preparar y a quién dirigirse.",
    intro: "El despacho parroquial le ayudará en cualquier asunto, en persona, por teléfono o por correo electrónico. Los sacramentos se celebran en polaco.",
    items: [
      {
        id: "chrzest",
        name: "Bautismo",
        lead: "Los bautizos se solicitan en el despacho parroquial. Durante las vacaciones de verano el sacramento se administra:",
        points: [
          "el segundo domingo del mes, en la misa de las 10:30,",
          "el cuarto sábado del mes, en la misa de las 18:30.",
          "Preparación para padres y padrinos: el viernes después de la misa vespertina.",
          "Las fechas pueden cambiar; la información actual se publica en los avisos.",
        ],
      },
      {
        id: "bierzmowanie",
        name: "Confirmación",
        lead: "El sacramento de la madurez cristiana, que se recibe tras la preparación en la parroquia.",
        points: ["Los encuentros y requisitos para los candidatos se anuncian en la parroquia (en polaco)."],
      },
      {
        id: "pojednanie",
        name: "Confesión",
        lead: "El sacramento de la penitencia y la reconciliación: volver a Dios y reconciliarse con la Iglesia.",
        points: [
          "El horario de confesiones, también antes de las grandes fiestas, se indica en los avisos.",
          "Se puede concertar una conversación con un sacerdote a través del despacho parroquial.",
        ],
      },
      {
        id: "namaszczenie",
        name: "Unción de los enfermos",
        lead: "Un sacramento de fortaleza para los enfermos, las personas mayores y quienes se preparan para una operación.",
        points: ["Las visitas a enfermos en casa se solicitan en el despacho parroquial."],
      },
      {
        id: "malzenstwo",
        name: "Matrimonio",
        lead: "Rogamos a los novios que acudan al despacho parroquial al menos tres meses antes de la boda prevista.",
        points: [
          "Traigan sus documentos de identidad y certificados recientes de bautismo y confirmación.",
          "También se necesita el certificado del cursillo prematrimonial.",
          "Las amonestaciones se publican en los avisos parroquiales.",
        ],
      },
    ],
    massesTitle: "Horario de misas",
    massesSummary: (sunday, weekday) => `Domingos y festivos: ${sunday} · días laborables: ${weekday}`,
    see: "Ver",
    callTitle: "Despacho parroquial",
    callText: "Llame en el horario del despacho",
  },

  contact: {
    metaTitle: "Contacto y despacho parroquial",
    title: "Contacto y despacho parroquial",
    call: "Llame en el horario del despacho",
    write: "Escríbanos",
    account: "Cuenta bancaria",
    mapTitle: "Mapa: Santuario en Buk",
  },

  saints,
  rafal,
};
