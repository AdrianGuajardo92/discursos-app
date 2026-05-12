import { TESOROS_ISAIAS_60_LUZ } from "./tesorosDiscursos";

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
    numero: 20260505,
    fecha: "2026-05-05",
    fechaLabel: "Martes 5 de mayo de 2026",
    semana: "4-10 de mayo",
    lectura: "Isaías 58, 59",
    presidente: "Diego Serrano",
    cancionInicial: "21",
    cancionIntermedia: "100",
    cancionFinal: "42",
    oracion: "Miguel Silva",
    tesoros: [
      asignacion(1, "Disfrute al máximo de la bendición de Jehová", "10 mins", "Mauricio Chávez"),
      asignacion(2, "Busquemos Perlas Escondidas", "10 mins", "Joshua García"),
      asignacion(3, "Lectura de la Biblia", "4 mins", "Omar Gallardo"),
    ],
    maestros: [
      asignacion(4, "Empiece conversaciones", "3 mins", "Silvia Blas", "Marisol Isas"),
      asignacion(5, "Empiece conversaciones", "4 mins", "Verónica Martínez", "Gabriela Silva"),
      asignacion(6, "Discurso", "5 mins", "Jehonatán Chávez"),
    ],
    vida: [
      asignacion(7, "“Sean siempre hospitalarios”", "15 mins", "Carlos Ramos"),
      asignacion(8, "Estudio Bíblico de la Congregación", "30 mins", "Luis Hernández"),
    ],
  }),
  crearReunion({
    numero: 20260512,
    fecha: "2026-05-12",
    fechaLabel: "Martes 12 de mayo de 2026",
    semana: "11-17 de mayo",
    lectura: "Isaías 60, 61",
    presidente: "Adrián Guajardo",
    cancionInicial: "146",
    cancionIntermedia: "156",
    cancionFinal: "119",
    oracion: "Martín Martínez",
    tesoros: [
      asignacion(1, "“Levántate, oh, mujer, despide luz”", "10 mins", "Miguel Silva", null, {
        senas: "Discurso, tema, Jehová, mujer, ven, levántate, tú, luz resplandeciente.",
        bosquejo: TESOROS_ISAIAS_60_LUZ,
      }),
      asignacion(2, "Busquemos Perlas Escondidas", "10 mins", "Jose Armando"),
      asignacion(3, "Lectura de la Biblia", "4 mins", "Antonio Isas", null, {
        contexto: "Isaías 61:1-9.",
        preparacion: {
          referencia: "th lección 11",
          punto: "Hablar con entusiasmo.",
          idea: "La lectura debe transmitir que el mensaje tiene valor. Conviene preparar el corazón, pensar en el efecto que tendrá en los oyentes y leer con vida, pero sin exagerar gestos ni variar siempre de la misma manera.",
        },
      }),
    ],
    maestros: [
      asignacion(4, "Empiece conversaciones", "3 mins", "Marisela Murillo", "Nahomy Estrada", {
        senas: "Trabajo, escuela, lugares diferentes, empezar a platicar.",
        contexto: "Predicación informal. Enséñele a la persona el nombre de Dios.",
        preparacion: {
          referencia: "lmd lección 4 punto 3",
          punto: "No dé la impresión de sentirse superior.",
          idea: "La meta es empezar una plática natural en lugares cotidianos, como el trabajo, la escuela u otros espacios donde surge una conversación. Al explicar el nombre de Dios, conviene hablar con respeto y humildad, sin hacer sentir a la persona que no sabe nada.",
        },
      }),
      asignacion(5, "Haga revisitas", "4 mins", "Carolina Segura", "Gloria Romero", {
        senas: "Trabajo, escuela, lugares diferentes, revisita.",
        contexto: "Predicación informal. La vez pasada la persona mencionó que hacía poco se le había muerto un ser querido.",
        preparacion: {
          referencia: "lmd lección 4 punto 4",
          punto: "Deje claro que lo que usted enseña viene de la Biblia.",
          idea: "La ayuda real viene de la Palabra de Dios, no de nuestras opiniones personales. Como la persona mencionó una pérdida, lo importante es consolar con tacto y dejar que la Biblia sea la que dé esperanza.",
        },
      }),
      asignacion(6, "Haga discípulos", "5 mins", "Greta Hernández", "Cristina Ávila", {
        senas: "Estudio, sentados. Libro LFF, enseñar.",
        contexto: "lff lección 19 punto 5.",
        preparacion: {
          referencia: "lmd lección 11 punto 4",
          punto: "Use lo que su estudiante ya sabe para ayudarlo a entender ideas nuevas.",
          idea: "Conectar una enseñanza nueva con algo que la persona ya entiende hace más natural la explicación. Así el estudiante no siente que empieza desde cero, sino que avanza paso a paso usando lo que ya comprendió.",
        },
      }),
    ],
    vida: [
      asignacion(7, "Necesidades de la congregación", "15 mins", "Luis Hernández"),
      asignacion(8, "Estudio Bíblico de la Congregación", "30 mins", "Jehonatán Chávez"),
    ],
    conclusion: [
      {
        tipo: "palabras_conclusion",
        titulo: "Palabras de conclusión sugeridas",
        texto: "Antes de terminar, repasemos brevemente dos ideas de la reunión de hoy. En Tesoros de la Biblia, el discurso “Levántate, oh, mujer, despide luz” nos recordó que Jehová hace brillar a su pueblo y que nosotros podemos reflejar esa luz con nuestra conducta y nuestra predicación. Después, en Nuestra vida cristiana, vimos asuntos que nos ayudan como congregación y continuamos con el Estudio Bíblico de la Congregación. Que todo esto nos anime a seguir sirviendo a Jehová con alegría durante esta semana.",
        clavesTitulo: "Palabras y oraciones clave para repasar",
        claves: [
          {
            titulo: "Tesoros: “Levántate, oh, mujer, despide luz”",
            frases: [
              "Jehová hace brillar a su pueblo.",
              "Nosotros reflejamos esa luz con nuestra conducta y predicación.",
              "Cuando servimos con alegría, ayudamos a otros a ver la luz de Jehová.",
            ],
          },
          {
            titulo: "Nuestra vida cristiana",
            frases: [
              "La congregación se fortalece cuando aplicamos la dirección que recibimos.",
              "Cada recordatorio nos ayuda a cuidar mejor nuestra espiritualidad y nuestra unidad.",
              "Lo que aprendemos debe verse durante la semana, no solo escucharse en la reunión.",
            ],
          },
          {
            titulo: "Lección 84: Jesús camina sobre el agua",
            frases: [
              "Jesús puede controlar la naturaleza y también calmar nuestros temores.",
              "Si confiamos por completo en Jesús, no tenemos que dejarnos vencer por el miedo.",
              "Cuando empezamos a dudar, Jesús puede ayudarnos a recuperar la fe.",
            ],
          },
          {
            titulo: "Lección 85: Jesús cura en sábado",
            frases: [
              "Jesús ayudó al hombre ciego con bondad y también fortaleció su fe.",
              "Los fariseos estaban tan cerrados que no quisieron reconocer el poder de Dios.",
              "Para agradar a Jehová, necesitamos conocer las Escrituras y confiar en su poder.",
            ],
          },
        ],
      },
      {
        tipo: "tarjeta_asignaciones",
        titulo: "Asignaciones de la próxima semana",
        subtitulo: "18-24 de mayo · Isaías 62-64",
        presidente: "Mauricio Chávez",
        oracion: "Joshua García",
        canciones: "44, 115, 151",
        grupos: [
          {
            titulo: "Tesoros de la Biblia",
            items: [
              { numero: 1, titulo: "El Alfarero nos moldea con amor y compasión", tiempo: "10 mins", encargado: "Omar Gallardo", senas: "Alfarero, Jehová, amor. Quiere ayudar a moldearte." },
              { numero: 2, titulo: "Busquemos Perlas Escondidas", tiempo: "10 mins", encargado: "Antonio Isas" },
              { numero: 3, titulo: "Lectura de la Biblia", tiempo: "4 mins", encargado: "Jose Alberto" },
            ],
          },
          {
            titulo: "Seamos mejores maestros",
            items: [
              { numero: 4, titulo: "Empiece conversaciones", tiempo: "3 mins", encargado: "Eliseba Serrano", ayudante: "Zoe Silva" },
              { numero: 5, titulo: "Haga revisitas", tiempo: "4 mins", encargado: "Alicia Ramos", ayudante: "Monstserrat Ruiz" },
              { numero: 6, titulo: "Haga discípulos", tiempo: "5 mins", encargado: "Andrea Alcázar", ayudante: "Omega Gallardo" },
            ],
          },
          {
            titulo: "Nuestra vida cristiana",
            items: [
              { numero: 7, titulo: "Preparados para las situaciones de emergencia: Esté listo para lo imprevisto", tiempo: "15 mins", encargado: "Miguel Silva", senas: "Discurso, preguntas. Emergencia antes prepararse." },
              { numero: 9, titulo: "Estudio Bíblico de la Congregación", tiempo: "30 mins", encargado: "Adrián Guajardo", senas: "Libro LFB." },
            ],
          },
        ],
      },
    ],
  }),
  crearReunion({
    numero: 20260519,
    fecha: "2026-05-19",
    fechaLabel: "Martes 19 de mayo de 2026",
    semana: "18-24 de mayo",
    lectura: "Isaías 62-64",
    presidente: "Mauricio Chávez",
    cancionInicial: "44",
    cancionIntermedia: "115",
    cancionFinal: "151",
    oracion: "Joshua García",
    tesoros: [
      asignacion(1, "El Alfarero nos moldea con amor y compasión", "10 mins", "Omar Gallardo", null, {
        senas: "Alfarero, Jehová, amor. Quiere ayudar a moldearte.",
      }),
      asignacion(2, "Busquemos Perlas Escondidas", "10 mins", "Antonio Isas"),
      asignacion(3, "Lectura de la Biblia", "4 mins", "Jose Alberto"),
    ],
    maestros: [
      asignacion(4, "Empiece conversaciones", "3 mins", "Eliseba Serrano", "Zoe Silva"),
      asignacion(5, "Haga revisitas", "4 mins", "Alicia Ramos", "Monstserrat Ruiz"),
      asignacion(6, "Haga discípulos", "5 mins", "Andrea Alcázar", "Omega Gallardo"),
    ],
    vida: [
      asignacion(7, "Preparados para las situaciones de emergencia: Esté listo para lo imprevisto", "15 mins", "Miguel Silva", null, {
        senas: "Discurso, preguntas. Emergencia antes prepararse.",
      }),
      asignacion(9, "Estudio Bíblico de la Congregación", "30 mins", "Adrián Guajardo", null, {
        senas: "Libro LFB.",
      }),
    ],
  }),
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
      asignacion(1, "¡Cuánto amamos nuestro paraíso espiritual!", "10 mins", "Diego Serrano"),
      asignacion(2, "Busquemos Perlas Escondidas", "10 mins", "Martín Martínez"),
      asignacion(3, "Lectura de la Biblia", "4 mins", "Beker Alvizo"),
    ],
    maestros: [
      asignacion(4, "Empiece conversaciones", "3 mins", "Jessica Isas", "Griselda Ruiz"),
      asignacion(5, "Empiece conversaciones", "2 mins", "Valeria Alcázar", "Martha Martínez"),
      asignacion(6, "Empiece conversaciones", "3 mins", "Graciela Limones", "Fabiola Guajardo"),
      asignacion(7, "Explique sus creencias", "3 mins", "Aimee González", "Rosaura Chávez"),
    ],
    vida: [
      asignacion(8, "¿Tendrás tú una vida llena de cosas buenas?", "15 mins", "Mauricio Chávez"),
      asignacion(9, "Estudio Bíblico de la Congregación", "30 mins", "Carlos Ramos"),
    ],
  }),
];
