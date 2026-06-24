import { PERLAS_ISAIAS_65_66, TESOROS_PRESUMIR_JEREMIAS } from "./tesorosDiscursos";

const asignacion = (numero, titulo, tiempo, encargado, ayudante = null, opciones = {}) => ({
  tipo: "asignacion",
  numero,
  titulo,
  tiempo,
  encargado,
  ayudante,
  ...opciones,
});

const crearReunion = ({
  numero,
  fecha,
  fechaLabel,
  semana,
  lectura,
  presidente,
  cancionInicial,
  cancionIntermedia,
  cancionFinal,
  oracion,
  tesoros,
  maestros,
  vida,
  conclusion = [],
}) => {
  const asignaciones = [...tesoros, ...maestros, ...vida];

  return {
    numero,
    tipo: "reunion",
    titulo: `Reunión entre semana - ${semana}`,
    fecha,
    fechaLabel,
    semana,
    lectura,
    presidente,
    oracion,
    canciones: {
      inicial: cancionInicial,
      intermedia: cancionIntermedia,
      final: cancionFinal,
    },
    duracion: "84 mins",
    totalAsignaciones: asignaciones.length,
    resumen: `Preside: ${presidente} · Oración: ${oracion}`,
    secciones: [
      {
        titulo: "Apertura",
        tiempo: "2 mins",
        sinNumero: true,
        contenido: [
          { tipo: "cancion", numero: cancionInicial },
          {
            tipo: "asignacion",
            etiqueta: "Presidente",
            titulo: "Palabras de Introducción",
            tiempo: "1 min",
            encargado: presidente,
            nota: "Abrir la reunión y presentar el programa de la semana.",
          },
        ],
      },
      {
        titulo: "Tesoros de la Biblia",
        tiempo: "24 mins",
        contenido: tesoros,
      },
      {
        titulo: "Seamos mejores maestros",
        tiempo: maestros.reduce((total, item) => total + (parseInt(item.tiempo, 10) || 0), 0) + " mins",
        contenido: maestros,
      },
      {
        titulo: "Nuestra vida cristiana",
        tiempo: "49 mins",
        contenido: [
          { tipo: "cancion", numero: cancionIntermedia },
          ...vida,
        ],
      },
      {
        titulo: "Conclusión",
        tiempo: "4 mins",
        sinNumero: true,
        contenido: [
          {
            tipo: "asignacion",
            etiqueta: "Presidente",
            titulo: "Palabras de Conclusión",
            tiempo: "3 mins",
            encargado: presidente,
            nota: "Cerrar la reunión y anunciar la oración final.",
          },
          ...conclusion,
          { tipo: "cancion", numero: cancionFinal },
          { tipo: "oracion", encargado: oracion },
        ],
      },
    ],
  };
};

export const REUNIONES_MAYO_2026 = [
  crearReunion({
    numero: 20260526,
    fecha: "2026-05-26",
    fechaLabel: "Martes 26 de mayo de 2026",
    semana: "25-31 de mayo",
    lectura: "Isaías 65, 66",
    presidente: "Luis Hernández",
    cancionInicial: "24",
    cancionIntermedia: "80",
    cancionFinal: "55",
    oracion: "Jorge Perea",
    tesoros: [
      asignacion(1, "¡Cuánto amamos nuestro paraíso espiritual!", "10 mins", "Carlos Ramos"),
      asignacion(2, "Busquemos Perlas Escondidas", "10 mins", "Martín Martínez", null, {
        bosquejo: PERLAS_ISAIAS_65_66,
        bosquejoLabel: "Abrir perlas escondidas",
      }),
      asignacion(3, "Lectura de la Biblia", "4 mins", "Beker Alvizo"),
    ],
    maestros: [
      asignacion(4, "Empiece conversaciones", "3 mins", "Jessica Isas", "Griselda Ruiz"),
      asignacion(5, "Empiece conversaciones", "2 mins", "Valeria Alcázar", "Martha Martínez"),
      asignacion(6, "Empiece conversaciones", "3 mins", "Graciela Limones", "Fabiola Guajardo"),
      asignacion(7, "Asignación de streaming", "3 mins", "Joshua García", null, {
        contexto: "Cambio de hoy: sustituye la asignación de Aimé.",
      }),
    ],
    vida: [
      asignacion(8, "¿Tendrás tú una vida llena de cosas buenas?", "15 mins", "Mauricio Chávez"),
      asignacion(9, "Estudio Bíblico de la Congregación", "30 mins", "Adrián Guajardo", null, {
        senas: "Libro LFB. Getsemaní, arresto, Pedro, Caifás, juicio.",
        materiales: [
          {
            titulo: "Lección 88",
            descripcion: "Arrestan a Jesús",
            href: "/estudios-lfb/lfb-leccion-88.html?v=20260526-1#leccion-88",
          },
          {
            titulo: "Lección 89",
            descripcion: "Pedro niega a Jesús",
            href: "/estudios-lfb/lfb-leccion-89.html?v=20260526-1#leccion-89",
          },
        ],
        ocultarChecklist: true,
      }),
    ],
  }),
  crearReunion({
    numero: 20260602,
    fecha: "2026-06-02",
    fechaLabel: "Martes 2 de junio de 2026",
    semana: "1-7 de junio",
    lectura: "Jeremías 1-3",
    presidente: "Miguel Silva",
    cancionInicial: "84",
    cancionIntermedia: "76",
    cancionFinal: "18",
    oracion: "Diego Serrano",
    tesoros: [
      asignacion(1, "“No te dejes intimidar [...], porque ‘yo estoy contigo’”", "10 mins", "Adrián Merino"),
      asignacion(2, "Busquemos Perlas Escondidas", "10 mins", "Omar Gallardo"),
      asignacion(3, "Lectura de la Biblia", "4 mins", "Gabriel Segura", null, {
        contexto: "Jeremías 3:14-25.",
      }),
    ],
    maestros: [
      asignacion(4, "Empiece conversaciones", "3 mins", "Cristina Ávila", "Verónica Martínez"),
      asignacion(5, "Haga revisitas", "4 mins", "Margarita Alcázar", "Alicia Ramos"),
      asignacion(6, "Haga discípulos", "5 mins", "Nahomy Estrada", "Greta Hernández"),
    ],
    vida: [
      asignacion(7, "¡Sé valiente como Jeremías!", "6 mins", "Martín Martínez"),
      asignacion(8, "“Listos para presentar una defensa [...] con apacibilidad y profundo respeto”", "9 mins", "Adrián Guajardo", null, {
        estudioHtml: "/asignaciones/2026-06-02-defensa-apacibilidad-respeto.html?v=20260602-5",
        estudioHtmlLabel: "Abrir guía HTML",
      }),
      asignacion(9, "Estudio Bíblico de la Congregación", "30 mins", "Mauricio Chávez", null, {
        contexto: "lfb lecciones 90, 91.",
      }),
    ],
  }),
  crearReunion({
    numero: 20260609,
    fecha: "2026-06-09",
    fechaLabel: "Martes 9 de junio de 2026",
    semana: "8-14 de junio",
    lectura: "Jeremías 4-6",
    presidente: "Jehonatán Chávez",
    cancionInicial: "56",
    cancionIntermedia: "60",
    cancionFinal: "68",
    oracion: "Antonio Isas",
    tesoros: [
      asignacion(1, "No nos enfermemos espiritualmente como les pasó a los de Judá", "10 mins", "Luis Hernández"),
      asignacion(2, "Busquemos Perlas Escondidas", "10 mins", "José Armando"),
      asignacion(3, "Lectura de la Biblia", "4 mins", "Joshua García", null, {
        contexto: "Jeremías 5:1-11.",
      }),
    ],
    maestros: [
      asignacion(4, "Empiece conversaciones", "2 mins", "Gloria Romero", "Karina Guajardo"),
      asignacion(5, "Empiece conversaciones", "2 mins", "Maricela Murillo", "Silvia Blas"),
      asignacion(6, "Haga revisitas", "4 mins", "Gabriela Silva", "Carolina Segura"),
      asignacion(7, "Explique sus creencias", "3 mins", "Marisol Isas", "Omega Gallardo"),
    ],
    vida: [
      asignacion(8, "Proteja su corazón de la información falsa", "8 mins", "Mauricio Chávez"),
      asignacion(9, "Necesidades de la congregación", "7 mins", "Carlos Ramos"),
      asignacion(10, "Estudio Bíblico de la Congregación", "30 mins", "Miguel Silva", null, {
        contexto: "lfb lecciones 92, 93.",
      }),
    ],
  }),
  crearReunion({
    numero: 20260616,
    fecha: "2026-06-16",
    fechaLabel: "Martes 16 de junio de 2026",
    semana: "15-21 de junio",
    lectura: "Jeremías 7, 8",
    presidente: "Carlos Ramos",
    cancionInicial: "152",
    cancionIntermedia: "91",
    cancionFinal: "71",
    oracion: "Gabriel Segura",
    tesoros: [
      asignacion(1, "No respetaron el templo de Jehová", "10 mins", "Mauricio Chávez", null, {
        estudioHtml: "/asignaciones/2026-06-16-no-respetaron-templo.html?v=20260616-2",
        estudioHtmlLabel: "Abrir guía HTML",
      }),
      asignacion(2, "Busquemos Perlas Escondidas", "10 mins", "Joshua García", null, {
        estudioHtml: "/asignaciones/2026-06-16-perlas-jeremias-7-8.html?v=20260616-8",
        estudioHtmlLabel: "Abrir perlas HTML",
      }),
      asignacion(3, "Lectura de la Biblia", "4 mins", "Jorge Perea", null, {
        contexto: "Jeremías 8:4-13.",
      }),
    ],
    maestros: [
      asignacion(4, "Empiece conversaciones", "3 mins", "Eliseba Serrano", "Jessica Isas"),
      asignacion(5, "Haga revisitas", "4 mins", "Griselda Ruiz", "Andrea Alcázar"),
      asignacion(6, "Haga discípulos", "5 mins", "Rosaura Chávez", "Montse Ruiz"),
    ],
    vida: [
      asignacion(7, "¿Cómo podemos demostrar que respetamos el Salón del Reino?", "5 mins", "Adrián Guajardo", null, {
        estudioHtml: "/asignaciones/2026-06-16-respeto-salon-reino.html?v=20260616-7",
        estudioHtmlLabel: "Abrir guía HTML",
      }),
      asignacion(8, "Cómo usamos las donaciones: Mantenemos nuestros Salones del Reino en buen estado", "10 mins", "Luis Hernández"),
      asignacion(9, "Estudio Bíblico de la Congregación", "30 mins", "Diego Serrano", null, {
        materiales: [
          {
            titulo: "Lección 94",
            descripcion: "Los discípulos reciben espíritu santo",
            href: "/estudios-lfb/lfb-leccion-94.html?v=20260616-1#leccion-94",
          },
          {
            titulo: "Lección 95",
            descripcion: "Nada los detiene",
            href: "/estudios-lfb/lfb-leccion-95.html?v=20260616-1#leccion-95",
          },
        ],
        ocultarChecklist: true,
      }),
    ],
  }),
  crearReunion({
    numero: 20260623,
    fecha: "2026-06-23",
    fechaLabel: "Martes 23 de junio de 2026",
    semana: "22-28 de junio",
    lectura: "Jeremías 9, 10",
    presidente: "Adrián Guajardo",
    cancionInicial: "5",
    cancionIntermedia: "48",
    cancionFinal: "135",
    oracion: "Natanael Valenzuela",
    tesoros: [
      asignacion(1, "¿De qué presumirá usted?", "10 mins", "Jehonatán Chávez", null, {
        senas: "tu orgulloso, ¿qué significa?",
        bosquejo: TESOROS_PRESUMIR_JEREMIAS,
        bosquejoLabel: "Abrir guía del discurso",
      }),
      asignacion(2, "Busquemos Perlas Escondidas", "10 mins", "Antonio Isas", null, {
        senas: "Biblia, Extraer, Perla, dos preguntas",
        estudioHtml: "/asignaciones/2026-06-23-perlas-jeremias-9-10.html?v=20260623-1",
        estudioHtmlLabel: "Abrir perlas HTML",
      }),
      asignacion(3, "Lectura de la Biblia", "4 mins", "Omar Gallardo", null, {
        senas: "Biblia copiar",
        contexto: "Jeremías 9:13-24.",
        estudioHtml: "/asignaciones/2026-06-23-lectura-amabilidad-empatia.html?v=20260623-1",
        estudioHtmlLabel: "Abrir guía LMD 12",
        preparacion: {
          referencia: "lmd lección 12 · 1 Tesalonicenses 2:7, 8",
          punto: "Al leer un relato, refleje los sentimientos expresados sin llamar la atención sobre usted.",
        },
        feedbackPresidente: {
          titulo: "Cómo explicárselo a Omar",
          frases: [
            "Omar, gracias por la lectura. Se notó que preparaste el pasaje.",
            "En 9:17-21 el lamento pide un tono compasivo — la lección 12 nos recuerda reflejar el sentimiento sin sonar forzado.",
            "Si la voz suena fría o entrecortada, suele ayudar alargar un poco las vocales y no marcar demasiado las consonantes.",
            "Sigue practicando eso; ayuda a que la congregación siente el peso de lo que Jeremías describe.",
          ],
        },
      }),
    ],
    maestros: [
      asignacion(4, "Empiece conversaciones", "4 mins", "Fabiola Guajardo", "Valeria Alcázar", {
        senas: "trabajar, estudiar, pasear, lugares diferentes, aprovechar, empezar a platicar",
        contexto: "Predicación informal · lmd lección 3 punto 5.",
        estudioHtml: "/asignaciones/2026-06-23-empiece-conversaciones-lmd3.html?v=20260623-2",
        estudioHtmlLabel: "Abrir guía LMD 3",
        preparacion: {
          referencia: "lmd lección 3 punto 5",
          punto: "Ofrezca su ayuda.",
          descripcion: "Siempre que sea oportuno, ayude a la persona. Una muestra de bondad puede ser la llave que abra la puerta a una buena conversación.",
        },
        feedbackPresidente: {
          titulo: "Cómo explicárselo a Fabiola y Valeria",
          frases: [
            "Fabiola y Valeria, gracias. Se notó que prepararon el escenario informal.",
            "La lección 3, punto 5, nos recuerda que ofrecer ayuda con bondad puede abrir una buena conversación — y eso fue lo que mostraron.",
            "Lo importante es notar la oportunidad, ayudar con sinceridad y dejar que la plática siga con naturalidad, sin apresurar un sermón.",
            "Sigan practicando en los lugares donde ya están; ahí surgen muchas oportunidades reales.",
          ],
        },
      }),
      asignacion(5, "Empiece conversaciones", "4 mins", "Aimé González", "Margarita Alcázar", {
        senas: "casa en casa, tu ir, predicar, empezar a platicar",
        contexto: "De casa en casa · lmd lección 3 punto 4.",
        estudioHtml: "/asignaciones/2026-06-23-casa-en-casa-amabilidad-respeto.html?v=20260623-3",
        estudioHtmlLabel: "Abrir guía LMD 3",
        preparacion: {
          referencia: "lmd lección 3 punto 4",
          punto: "Hable con amabilidad y respeto.",
          descripcion: "Cuando sentimos compasión por alguien y de verdad queremos ayudarlo, eso se nota en la forma de hablar. Elija con cuidado lo que dirá y cómo lo dirá. No diga nada que pueda ofender a la persona.",
        },
        feedbackPresidente: {
          titulo: "Cómo explicárselo a Aimé y Margarita",
          frases: [
            "Aimé y Margarita, gracias. Se notó que prepararon la visita casa en casa.",
            "La lección 3, punto 4, recuerda hablar con amabilidad y respeto — cuando de verdad queremos ayudar, eso se nota en cómo hablamos.",
            "Lo clave es elegir bien las palabras: tono compasivo, sin decir nada que pueda ofender.",
            "Sigan practicando eso en casa en casa; ayuda a que la persona quiera seguir platicando.",
          ],
        },
      }),
      asignacion(6, "Haga revisitas", "4 mins", "Greta Hernández", "Martha Martínez", {
        senas: "trabajar, estudiar, esparcimiento, lugares diferentes, revisitas",
        contexto: "Predicación informal · lmd lección 7 punto 3.",
        estudioHtml: "/asignaciones/2026-06-23-haga-revisitas-lmd7.html?v=20260623-1",
        estudioHtmlLabel: "Abrir guía LMD 7",
        preparacion: {
          referencia: "lmd lección 7 punto 3",
          punto: "Adapte su horario al de la otra persona.",
          descripcion: "Pregúntese: «¿Cuándo está disponible para hablar conmigo? ¿Dónde le gustaría que nos encontráramos?». Esté dispuesto a volver a visitar a la persona aunque ese no sea el mejor momento para usted.",
        },
        feedbackPresidente: {
          titulo: "Cómo explicárselo a Greta y Martha",
          frases: [
            "Greta y Martha, gracias. Se notó que prepararon bien la revisita informal.",
            "La lección 7, punto 3, nos recuerda adaptar nuestro horario al de la otra persona — y eso fue lo que mostraron al preguntar cuándo y dónde conviene hablar.",
            "Lo importante es volver con constancia, aunque el momento o el lugar no sean los más cómodos para nosotros; eso demuestra interés sincero.",
            "Sigan practicando en los lugares donde ya están; ahí las revisitas informales surgen con naturalidad.",
          ],
        },
      }),
    ],
    vida: [
      asignacion(7, "No nos dejemos engañar, apoyemos el Reino de Dios", "15 mins", "Miguel Silva", null, {
        senas: "discurso, preguntas, tema. Explicar, engañar. Oponerse. Dios, Reino, enfocarse. Perdón. Dios, Reino, enfocarse.",
      }),
      asignacion(8, "Discurso de servicio: ¿Qué estás dispuesto a hacer por las buenas noticias?", "30 mins", "Sup. Cto. Natanael Valenzuela", null, {
        contexto: "Semana de la visita del superintendente de circuito.",
      }),
    ],
    conclusion: [
      {
        tipo: "destacado",
        texto: "Semana de la visita del superintendente de circuito.",
      },
    ],
  }),
];
