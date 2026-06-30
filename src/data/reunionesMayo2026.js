const asignacion = (numero, titulo, tiempo, encargado, ayudante = null, opciones = {}) => ({
  tipo: "asignacion",
  numero,
  titulo,
  tiempo,
  encargado,
  ayudante,
  ...opciones,
});

const minutos = (tiempo) => parseInt(tiempo, 10) || 0;

const sumarMinutos = (items) =>
  items.reduce((total, item) => total + minutos(item.tiempo), 0);

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
  aviso = null,
}) => {
  const asignaciones = [...tesoros, ...maestros, ...vida];
  const tiempoTesoros = sumarMinutos(tesoros);
  const tiempoMaestros = sumarMinutos(maestros);
  const tiempoVida = 4 + sumarMinutos(vida);
  const duracionTotal = 2 + tiempoTesoros + tiempoMaestros + tiempoVida + 4;

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
    duracion: `${duracionTotal} mins`,
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
          ...(aviso ? [{ tipo: "destacado", texto: aviso }] : []),
        ],
      },
      {
        titulo: "Tesoros de la Biblia",
        tiempo: `${tiempoTesoros} mins`,
        contenido: tesoros,
      },
      {
        titulo: "Seamos mejores maestros",
        tiempo: `${tiempoMaestros} mins`,
        contenido: maestros,
      },
      {
        titulo: "Nuestra vida cristiana",
        tiempo: `${tiempoVida} mins`,
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

const crearAvisoAsamblea = () => ({
  numero: 20260728,
  tipo: "reunion",
  titulo: "Asamblea regional - 27 de julio a 2 de agosto",
  fecha: "2026-07-28",
  fechaLabel: "Martes 28 de julio de 2026",
  semana: "27 de julio a 2 de agosto",
  lectura: "Asamblea regional",
  presidente: "Asamblea regional",
  oracion: "No aplica",
  canciones: {
    inicial: "No aplica",
    intermedia: null,
    final: null,
  },
  duracion: "0 mins",
  totalAsignaciones: 0,
  resumen: "Semana de asamblea regional; no hay programa local de reunión.",
  secciones: [
    {
      titulo: "Aviso",
      tiempo: "Sin programa local",
      sinNumero: true,
      contenido: [
        {
          tipo: "destacado",
          texto: "Asamblea regional. Esta semana no tiene detalle de reunión entre semana en la tabla local.",
        },
      ],
    },
  ],
});

export const REUNIONES_MAYO_2026 = [
  crearReunion({
    numero: 20260630,
    fecha: "2026-06-30",
    fechaLabel: "Martes 30 de junio de 2026",
    semana: "29 de junio a 5 de julio",
    lectura: "Jeremías 11, 12",
    presidente: "Adrián Merino",
    cancionInicial: "106",
    cancionIntermedia: "109",
    cancionFinal: "69",
    oracion: "Adrián Guajardo",
    tesoros: [
      asignacion(1, "Cómo “competir en una carrera contra caballos”", "10 mins", "Carlos Ramos", null, {
        contexto: "Jeremías 11:21; 12:5. Cultivar amor por nuestros hermanos ahora nos ayudará a encarar dificultades.",
        estudioHtml: "/asignaciones/2026-06-30-competir-carrera-caballos.html?v=20260630-1",
        estudioHtmlLabel: "Abrir guía del discurso",
      }),
      asignacion(2, "Busquemos perlas escondidas", "10 mins", "Martín Martínez", null, {
        contexto: "Jeremías 12:1, 3. Qué revela sobre la relación de Jeremías con Jehová.",
        estudioHtml: "/asignaciones/2026-06-30-perlas-jeremias-11-12.html?v=20260630-1",
        estudioHtmlLabel: "Abrir perlas HTML",
      }),
      asignacion(3, "Lectura de la Biblia", "4 mins", "José Armando", null, {
        contexto: "Jeremías 12:1-11. th lección 2.",
      }),
    ],
    maestros: [
      asignacion(4, "Empiece conversaciones", "3 mins", "Zoe S.", "Graciela Limones", {
        contexto: "Predicación informal. Empiece una conversación después de que alguien haga o diga algo amable (lmd lección 1 punto 4).",
      }),
      asignacion(5, "Haga revisitas", "4 mins", "Alicia Ramos", "Sophie M.", {
        contexto: "De casa en casa. La persona tiene hijos (lmd lección 3 punto 3).",
      }),
      asignacion(6, "Discurso", "5 mins", "Diego Serrano", null, {
        contexto: "lmd apéndice A punto 17. Título: Jesús fue un gran maestro y sus consejos siempre funcionan (th lección 14).",
      }),
    ],
    vida: [
      asignacion(7, "Necesidades de la congregación", "15 mins", "Mauricio Chávez"),
      asignacion(8, "Estudio bíblico de la congregación", "30 mins", "Luis Hernández", null, {
        contexto: "lfb lecciones 98, 99.",
        materiales: [
          {
            titulo: "Lección 98",
            descripcion: "Los cristianos llegan a muchas naciones",
            href: "/estudios-lfb/lfb-leccion-98.html?v=20260630-1#leccion-98",
          },
          {
            titulo: "Lección 99",
            descripcion: "Un carcelero aprende la verdad",
            href: "/estudios-lfb/lfb-leccion-99.html?v=20260630-1#leccion-99",
          },
        ],
        ocultarChecklist: true,
      }),
    ],
  }),
  crearReunion({
    numero: 20260707,
    fecha: "2026-07-07",
    fechaLabel: "Martes 7 de julio de 2026",
    semana: "6-12 de julio",
    lectura: "Jeremías 13-15",
    presidente: "Luis Hernández",
    cancionInicial: "123",
    cancionIntermedia: "49",
    cancionFinal: "61",
    oracion: "Martín Martínez",
    tesoros: [
      asignacion(1, "Jehová merece que le obedezcamos", "10 mins", "Omar Gallardo", null, {
        contexto: "Jeremías 13:1-11. Aunque no entendamos por qué recibimos ciertas instrucciones, nos esforzamos por obedecer.",
      }),
      asignacion(2, "Busquemos perlas escondidas", "10 mins", "Jorge Perea", null, {
        contexto: "Jeremías 15:16, 17. Cómo imitar a Jeremías y luchar contra el desánimo.",
      }),
      asignacion(3, "Lectura de la Biblia", "4 mins", "Beker Alvizo", null, {
        contexto: "Jeremías 13:1-14. th lección 2.",
      }),
    ],
    maestros: [
      asignacion(4, "Empiece conversaciones", "3 mins", "Carolina Segura", "Maricela Murillo", {
        contexto: "De casa en casa. Use un tratado para empezar una conversación (lmd lección 1 punto 5).",
      }),
      asignacion(5, "Haga revisitas", "4 mins", "Omega Gallardo", "Verónica Martínez", {
        contexto: "Predicación informal. Muéstrele a la persona un artículo de jw.org relacionado con el tema de la conversación anterior (lmd lección 9 punto 4).",
      }),
      asignacion(6, "Discurso", "5 mins", "Joshua García", null, {
        contexto: "lmd apéndice A punto 18. Título: Jesús predijo los acontecimientos que vemos hoy (th lección 7).",
      }),
    ],
    vida: [
      asignacion(7, "“Obedecer es mejor que ofrecer un sacrificio”", "15 mins", "Miguel Silva"),
      asignacion(8, "Campaña y recordatorios para la asamblea regional", "10 mins", "Mauricio Chávez"),
      asignacion(9, "Estudio bíblico de la congregación", "30 mins", "Adrián Merino", null, {
        contexto: "lfb lecciones 100, 101.",
      }),
    ],
  }),
  crearReunion({
    numero: 20260714,
    fecha: "2026-07-14",
    fechaLabel: "Martes 14 de julio de 2026",
    semana: "13-19 de julio",
    lectura: "Jeremías 16, 17",
    presidente: "Diego Serrano",
    cancionInicial: "34",
    cancionIntermedia: "54",
    cancionFinal: "22",
    oracion: "Luis Hernández",
    tesoros: [
      asignacion(1, "¿Estamos confiando en la persona correcta?", "10 mins", "Adrián Guajardo", null, {
        contexto: "Jeremías 17:5-8. Quienes confían en Jehová florecerán.",
      }),
      asignacion(2, "Busquemos perlas escondidas", "10 mins", "José Armando", null, {
        contexto: "Jeremías 17:7. Confiar en Jehová implica confiar en sus representantes en la Tierra.",
      }),
      asignacion(3, "Lectura de la Biblia", "4 mins", "José Alberto", null, {
        contexto: "Jeremías 17:5-18. th lección 5.",
      }),
    ],
    maestros: [
      asignacion(4, "Empiece conversaciones", "3 mins", "Montserrat Ruiz", "Gloria Romero", {
        contexto: "De casa en casa. Presente y analice un video del kit de enseñanza, pero no lo ponga (lmd lección 5 punto 5).",
      }),
      asignacion(5, "Haga revisitas", "4 mins", "Silvia Blas", "Cristina Ávila", {
        contexto: "De casa en casa. Ofrezca un curso de la Biblia (lmd lección 7 punto 4).",
      }),
      asignacion(6, "Haga discípulos", "5 mins", "Karina Guajardo", "Gabriela Silva", {
        contexto: "lff lección 19: resumen, repaso y “Propóngase esto” (lmd lección 11 punto 3).",
      }),
    ],
    vida: [
      asignacion(7, "Joven, confía en los consejos de la Biblia", "15 mins", "Jehonatán Chávez"),
      asignacion(8, "Estudio bíblico de la congregación", "30 mins", "Carlos Ramos", null, {
        contexto: "lfb lecciones 102, 103.",
      }),
    ],
  }),
  crearReunion({
    numero: 20260721,
    fecha: "2026-07-21",
    fechaLabel: "Martes 21 de julio de 2026",
    semana: "20-26 de julio",
    lectura: "Jeremías 18, 19",
    presidente: "Mauricio Chávez",
    cancionInicial: "44",
    cancionIntermedia: "38",
    cancionFinal: "153",
    oracion: "Jehonatán Chávez",
    tesoros: [
      asignacion(1, "Recuperarnos en sentido espiritual es posible", "10 mins", "Miguel Silva", null, {
        contexto: "Jeremías 18:11, 12. Jehová rogó a Judá que corrigiera su conducta.",
      }),
      asignacion(2, "Busquemos perlas escondidas", "10 mins", "Joshua García", null, {
        contexto: "Jeremías 18:6; 19:10, 11. Jehová es el Gran Alfarero.",
      }),
      asignacion(3, "Lectura de la Biblia", "4 mins", "Antonio Isas", null, {
        contexto: "Jeremías 19:1-11. th lección 5.",
      }),
    ],
    maestros: [
      asignacion(4, "Empiece conversaciones", "4 mins", "Andrea Alcázar", "Nahomy Estrada", {
        contexto: "De casa en casa. Ofrezca un curso de la Biblia y muestre cómo son las clases (lmd lección 4 punto 3).",
      }),
      asignacion(5, "Haga revisitas", "4 mins", "Griselda Ruiz", "Marisol Isas", {
        contexto: "De casa en casa. Siga analizando con la persona el tratado que le dejó en la visita anterior (lmd lección 9 punto 3).",
      }),
      asignacion(6, "Explique sus creencias. Discurso", "4 mins", "Gabriel Segura", null, {
        contexto: "Discurso. ijwbq artículo 44. Título: ¿Qué dice la Biblia sobre el libre albedrío? (th lección 20).",
      }),
    ],
    vida: [
      asignacion(7, "Pasos para recuperarnos en sentido espiritual", "15 mins", "Adrián Merino"),
      asignacion(8, "Estudio bíblico de la congregación", "30 mins", "Adrián Guajardo", null, {
        contexto: "wcg “Carta del Cuerpo Gobernante” e introducción.",
      }),
    ],
  }),
  crearAvisoAsamblea(),
];
