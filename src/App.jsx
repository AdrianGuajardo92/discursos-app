import { useState, useEffect, useRef, useCallback } from "react";

// ============================================================
// 📋 BASE DE DATOS DE DISCURSOS
// ============================================================
const DISCURSOS = [
  {
    numero: 100,
    titulo: "Haga amistades que duren para siempre",
    duracion: "30 mins",
    fechaUltimaVez: "2026-02-22",
    secciones: [
      {
        titulo: "¿Por qué todos necesitamos amigos?",
        tiempo: "3 mins",
        contenido: [
          { tipo: "pregunta", texto: "¿Alguna vez ha pasado por un momento difícil y un amigo lo llamó o le escribió justo cuando más lo necesitaba? ¿Recuerda cómo se sintió?" },
          { tipo: "punto", texto: "Jehová nos creó con la necesidad de tener amigos. Cuando tenemos buenos amigos, nos sentimos más felices y nuestra vida tiene más sentido." },
          { tipo: "punto", texto: "No es saludable aislarse de los demás. Proverbios 18:1 advierte que quien se aísla busca sus propios deseos egoístas y se opone a toda sabiduría práctica." },
          { tipo: "punto", texto: "Un buen amigo se convierte en un verdadero hermano cuando más lo necesitamos, especialmente en momentos de angustia." },
          { tipo: "lectura", cita: "Proverbios 17:17", texto: "El verdadero amigo ama en todo momento y es un hermano en tiempos de angustia." },
          { tipo: "subpunto", texto: "Fíjese: no dice \"en algunos momentos\", dice \"en todo momento\". Eso es lo que distingue a un verdadero amigo." },
        ]
      },
      {
        titulo: "¿Cómo encontrar amigos que valgan la pena?",
        tiempo: "6 mins",
        contenido: [
          { tipo: "punto", texto: "Los amigos tienen un gran efecto en la clase de personas que somos y en lo que nos pasa. Por eso es tan importante saber elegir bien." },
          { tipo: "lectura", cita: "Proverbios 13:20", texto: "El que anda con sabios se hará sabio, pero al que se junta con necios le irá mal." },
          { tipo: "subtitulo", texto: "¿En qué debemos fijarnos cuando buscamos amigos?" },
          { tipo: "punto", texto: "Busquemos amigos que nos hagan mejores personas y que tengan cualidades que valga la pena imitar." },
          { tipo: "ejemplo", texto: "Es como cuando vamos al mercado a elegir fruta. No agarramos la primera que vemos, ¿verdad? La observamos, la tocamos, nos fijamos en que esté en buen estado. Con las amistades pasa algo parecido: antes de abrir nuestro corazón, vale la pena fijarnos bien en las cualidades de esa persona.", img: "https://i.imgur.com/ahzMF4T.png" },
          {
            tipo: "cualidades",
            items: [
              {
                nombre: "LEALTAD",
                detalle: "Un amigo leal no nos abandona cuando las cosas se ponen difíciles. Nos defiende cuando no estamos presentes y cumple su palabra.",
                reflexion: "Piense: ¿esta persona es leal a Jehová por encima de todo? Si es leal a Dios, también será leal con usted."
              },
              {
                nombre: "HONESTIDAD",
                detalle: "Un amigo honesto nos dice la verdad, aunque a veces no sea lo que queremos escuchar. No aparenta ser algo que no es.",
                reflexion: "Proverbios 27:6 dice que \"las heridas que hace un amigo son fieles\". Un verdadero amigo nos corrige con amor."
              },
              {
                nombre: "EMPATÍA Y ÁNIMO",
                detalle: "Un buen amigo escucha de verdad, presta total atención cuando compartimos nuestros problemas y nos anima con la Biblia.",
                reflexion: "No se trata solo de escuchar, sino de hacernos sentir que no estamos solos."
              }
            ]
          },
          { tipo: "punto", texto: "Sus amigos no siempre tienen que ser de su misma edad o tener el mismo origen que usted. ¡Algunas de las amistades más enriquecedoras nacen de la diversidad!" },
          { tipo: "video", texto: "Reproducir video", img: "https://i.imgur.com/MRLHaCN.png" },
        ]
      },
      {
        titulo: "¿Qué hace falta para tener amistades duraderas?",
        tiempo: "9 mins",
        contenido: [
          { tipo: "punto", texto: "Para tener amistades duraderas debemos demostrar amor desinteresado." },
          { tipo: "definicion", termino: "Amor desinteresado", texto: "Es querer a alguien por quien es, sin esperar recibir algo a cambio. No hay un \"interés\" oculto." },
          { tipo: "ejemplo", texto: "Imagínese esto: usted tiene que mudarse de casa. Es un día pesado, hace calor y tiene montañas de cajas por cargar. No le ha pedido ayuda a nadie. Pero de pronto, temprano por la mañana, suena el timbre. Es su amigo, que llegó con ropa cómoda, listo para trabajar. Carga cajas, sube escaleras, acomoda muebles, y cuando usted le dice \"no tenías que venir\", él le responde con una sonrisa: \"Para eso estamos\". Se queda hasta la última caja sin pedir nada a cambio. Eso es amor desinteresado. No lo hace porque le deba algo, sino porque genuinamente le importa usted.", img: "https://i.imgur.com/MANQZnA.png" },
          { tipo: "punto", texto: "La Biblia nos da ejemplos sobresalientes de amistades que se mantuvieron fuertes gracias al amor desinteresado:" },
          {
            tipo: "ejemplo_biblico",
            nombre: "Rut y Noemí",
            img: "https://i.imgur.com/UTryqlp.png",
            narrativa: "Rut era moabita y Noemí era israelita. Diferente edad, diferente origen, diferente cultura. Cuando el esposo de Rut murió, ella no tenía ninguna obligación de quedarse con su suegra. Noemí misma le dijo que se fuera. Pero Rut le respondió con palabras que hasta hoy nos conmueven: \"Tu pueblo será mi pueblo, y tu Dios será mi Dios\" (Rut 1:16, 17). Dejó su tierra, su familia y toda su comodidad. Sacrificó lo que conocía por alguien que amaba. Eso es amor desinteresado: dar sin esperar nada a cambio."
          },
          {
            tipo: "ejemplo_biblico",
            nombre: "Jonatán y David",
            img: "https://i.imgur.com/b3gwAUp.png",
            narrativa: "Piense en lo que hizo Jonatán. Él era el heredero al trono de Israel. Tenía todo para ser el próximo rey. Pero cuando supo que Jehová había elegido a David, no se llenó de envidia ni lo vio como rival. Al contrario, lo protegió de su propio padre Saúl, que quería matarlo. Incluso arriesgó su vida por él (1 Samuel 18:1; 23:16-18). Jonatán sacrificó su posición, su futuro y su seguridad por un amigo. Eso es poner al otro por encima de uno mismo."
          },
          {
            tipo: "ejemplo_biblico",
            nombre: "Pablo y Timoteo",
            img: "https://i.imgur.com/8FT1u2i.png",
            narrativa: "Pablo era un apóstol experimentado y Timoteo un joven tímido. Pero Pablo no lo menospreció por su edad. Lo tomó bajo su cuidado, lo entrenó y le confió misiones muy difíciles porque creía en él. Y cuando Pablo estaba preso en Roma, solo y encadenado, ¿sabe quién fue a verlo? Timoteo. Pablo lo llamó \"hijo amado\" (2 Timoteo 1:2) y dijo que no tenía a nadie como él, alguien que se preocupara genuinamente por los demás (Filipenses 2:19-22). Se fortalecieron mutuamente en los momentos más difíciles."
          },
          { tipo: "subtitulo", texto: "¿Cómo fortalecer nuestras amistades?" },
          { tipo: "punto", texto: "Si ponemos en práctica los principios bíblicos, nuestras amistades serán cada vez más fuertes. Veamos cuatro cosas prácticas que podemos hacer:" },
          {
            tipo: "cualidades",
            items: [
              {
                nombre: "ESCUCHAR CON ATENCIÓN",
                detalle: "Un buen amigo no solo oye, escucha de verdad. Presta atención, no interrumpe y se interesa sinceramente por lo que el otro siente.",
                reflexion: "Santiago 1:19 dice: \"Todos deben estar listos para escuchar, no apresurarse a hablar\". A veces lo que más necesita un amigo es que alguien lo escuche."
              },
              {
                nombre: "NO ESPARCIR CHISMES",
                detalle: "Una amistad se rompe fácilmente cuando se revelan conversaciones privadas o se habla a espaldas del otro.",
                reflexion: "Proverbios 16:28 advierte que \"el chismoso separa a los mejores amigos\". Guardemos las confidencias de nuestros amigos."
              },
              {
                nombre: "PERDONAR LOS ERRORES",
                detalle: "Nadie es perfecto. Nuestros amigos van a cometer errores, y nosotros también. Lo importante es estar dispuestos a perdonar.",
                reflexion: "Colosenses 3:13 nos anima a \"seguir soportándose unos a otros y perdonándose generosamente\"."
              },
              {
                nombre: "RESPETAR SU PRIVACIDAD",
                detalle: "Un buen amigo respeta los límites. No se mete donde no lo llaman ni presiona al otro a compartir lo que no quiere.",
                reflexion: "Romanos 12:10 dice: \"Tómense la delantera en honrarse unos a otros\". Respetar la privacidad es una forma de honrar a nuestros amigos."
              }
            ]
          },
        ]
      },
      {
        titulo: "¿Cuáles son las amistades más importantes?",
        tiempo: "8 mins",
        contenido: [
          { tipo: "pregunta", texto: "Hemos visto que los buenos amigos nos hacen mejores personas. Pero ¿quién puede ayudarnos más que nadie a ser la mejor versión de nosotros mismos?" },
          { tipo: "punto", texto: "Los mejores amigos que podemos tener son Jehová y Jesús." },
          { tipo: "subtitulo", texto: "Jehová: un amigo que siempre está ahí" },
          { tipo: "punto", texto: "Piense en esto: Jehová, el Creador del universo, quiere ser nuestro amigo. Y no es un amigo distante. Santiago 4:8 nos da una promesa muy hermosa:" },
          { tipo: "lectura", cita: "Santiago 4:8", texto: "Acérquense a Dios, y él se acercará a ustedes." },
          { tipo: "subpunto", texto: "¿Se da cuenta? Jehová no espera a que seamos perfectos. Él nos promete que si damos un paso hacia él, él dará un paso hacia nosotros. ¿Qué amigo humano puede prometer algo así?" },
          { tipo: "punto", texto: "¿Y cómo le demostramos que queremos ser sus amigos? Amándolo con todo nuestro corazón (Mateo 22:37). Cada vez que oramos, que leemos su Palabra o que obedecemos sus normas, le estamos diciendo a Jehová: \"Quiero ser tu amigo\". Y él lo nota." },
          { tipo: "subtitulo", texto: "Jesús: el camino hacia Jehová" },
          { tipo: "punto", texto: "Ahora bien, para acercarnos a Jehová necesitamos a Jesucristo. No hay otro camino." },
          { tipo: "cita_biblica", contexto: "En Juan 14:6, Tomás le pregunta a Jesús a dónde va, y él responde:", texto: "\"Yo soy el camino, la verdad y la vida. Nadie puede llegar al Padre si no es por medio de mí.\"" },
          { tipo: "subpunto", texto: "Querer ser amigo de Jehová sin ser un buen amigo de Jesús es como querer entrar en un edificio sin pasar por la puerta." },
          { tipo: "imagen", img: "https://i.imgur.com/Cbi7RyR.png", alt: "Jesús es la puerta" },
          { tipo: "punto", texto: "¿Y cómo nos hacemos amigos de Jesús? Imitando su forma de vivir. Veamos tres aspectos clave:" },
          {
            tipo: "lista_enseñanza",
            titulo: "Cómo imitar a Jesús",
            items: [
              { punto: "Demostrar amor con acciones", detalle: "Jesús no solo decía que amaba a las personas, lo demostraba: sanaba enfermos, alimentaba a las multitudes, dedicaba tiempo a cada persona. El amor verdadero siempre se ve en lo que hacemos." },
              { punto: "Perdonar de corazón", detalle: "Incluso clavado en un madero, Jesús pidió a su Padre que perdonara a quienes lo maltrataban (Lucas 23:34). Si él pudo perdonar en esas circunstancias, nosotros también podemos perdonar a nuestros amigos." },
              { punto: "Ser humildes", detalle: "A pesar de ser el Hijo de Dios, Jesús se arrodilló y lavó los pies de sus apóstoles (Juan 13:5). No se consideraba superior a nadie. Un amigo humilde nunca te hará sentir menos." },
            ]
          },
          { tipo: "destacado", texto: "Jehová y Jesús son los amigos más fieles que podemos tener. Jehová promete acercarse a nosotros, y Jesús nos abrió el camino para llegar a él. Si cultivamos esas dos amistades, todas las demás se fortalecerán también." },
        ]
      },
      {
        titulo: "¿Cómo lograr que una amistad dure para siempre?",
        tiempo: "4 mins",
        contenido: [
          { tipo: "punto", texto: "Para que una amistad dure, es necesario fortalecerla continuamente." },
          { tipo: "subpunto", texto: "Para fortalecer su amistad con Jehová, órele constantemente y escuche lo que él le dice leyendo su Palabra, la Biblia (Sl 1:2, 3; 1Te 5:17)." },
          { tipo: "punto", texto: "Hágase amigo de los que aman a Jehová como usted." },
          { tipo: "subpunto", texto: "Ayude a sus amigos a amar más a Jehová y adórenlo juntos (1Te 5:11; Heb 10:24, 25)." },
          { tipo: "cierre", texto: "Si sigue estos consejos, tendrá amigos ahora y para siempre." },
        ]
      }
    ]
  },
  {
    numero: 130,
    titulo: "Ejemplo: Título del discurso 130",
    duracion: "30 mins",
    fechaUltimaVez: null,
    secciones: [
      {
        titulo: "Primera sección de ejemplo",
        tiempo: "5 mins",
        contenido: [
          { tipo: "punto", texto: "Este es un discurso de ejemplo para mostrar la estructura." },
          { tipo: "punto", texto: "Con Claude Code puedes decir: \"Reemplaza el contenido del discurso 130 con este tema...\" y se actualizará automáticamente." },
          { tipo: "lectura", cita: "Salmo 119:105", texto: "Tu palabra es una lámpara para mi pie y una luz para mi camino." },
        ]
      }
    ]
  }
];


// ============================================================
// 🎨 PALETA — Solo negro + ámbar. Nada más.
// ============================================================
const C = {
  bg: "#111110",
  card: "#1b1b19",
  card2: "#222220",
  border: "#2c2c28",
  accent: "#c8a24e",
  accentDim: "rgba(200,162,78,0.08)",
  accentBorder: "rgba(200,162,78,0.18)",
  white: "#eae6dc",
  gray: "#918d84",
  dim: "#585550",
  // Único color extra: azul tenue solo para LEA
  lea: "#4a8ab5",
  leaBg: "#141e28",
  leaText: "#a8cfe4",
};

const font = "'Outfit', 'Segoe UI', system-ui, sans-serif";


// ============================================================
// 📐 RENDERIZADOR DE CONTENIDO
// ============================================================
function ContentRenderer({ item }) {
  const txt = { fontSize: 17, lineHeight: 1.8, color: C.white, marginTop: 0, marginBottom: 0, marginLeft: 0, marginRight: 0, fontFamily: font };
  const sub = { ...txt, color: C.gray, fontSize: 15.5 };

  switch (item.tipo) {
    case "punto":
      return (
        <div style={{ display: "flex", gap: 12, alignItems: "baseline", margin: "14px 0" }}>
          <span style={{ color: C.accent, fontSize: 15, flexShrink: 0 }}>▸</span>
          <p style={txt}>{item.texto}</p>
        </div>
      );

    case "pregunta":
      return (
        <div style={{ borderLeft: `2px solid ${C.accent}`, padding: "14px 18px", margin: "16px 0", background: C.accentDim, borderRadius: "0 8px 8px 0" }}>
          <p style={{ ...txt, color: C.accent, fontStyle: "italic" }}>{item.texto}</p>
        </div>
      );

    case "subpunto":
      return (
        <div style={{ margin: "10px 0 10px 28px", display: "flex", gap: 8, alignItems: "baseline" }}>
          <span style={{ color: C.dim, fontSize: 12 }}>↳</span>
          <p style={{ ...sub, fontStyle: "italic" }}>{item.texto}</p>
        </div>
      );

    case "lectura":
      return (
        <div style={{ background: C.leaBg, borderRadius: 8, padding: "16px 18px 16px 72px", margin: "18px 0", position: "relative", border: `1px solid rgba(74,138,181,0.15)` }}>
          <div style={{ position: "absolute", left: 12, top: "50%", transform: "translateY(-50%)", background: C.lea, color: "#fff", padding: "4px 10px", borderRadius: 4, fontWeight: 800, fontSize: 10, letterSpacing: 1.5, fontFamily: font }}>LEA</div>
          <p style={{ margin: "0 0 3px", fontWeight: 700, color: C.lea, fontSize: 13, fontFamily: font }}>{item.cita}</p>
          <p style={{ margin: 0, fontSize: 17, lineHeight: 1.75, color: C.leaText, fontFamily: font }}>{item.texto}</p>
        </div>
      );

    case "cita_biblica":
      return (
        <div style={{ background: C.card2, borderLeft: `2px solid ${C.accent}`, borderRadius: "0 8px 8px 0", padding: "14px 18px", margin: "16px 0" }}>
          {item.contexto && <p style={{ ...sub, fontStyle: "italic", marginBottom: 6 }}>{item.contexto}</p>}
          <p style={{ ...txt, fontWeight: 600, color: C.accent }}>{item.texto}</p>
        </div>
      );

    case "subtitulo":
      return (
        <div style={{ marginTop: 32, marginBottom: 10 }}>
          <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 12 }}>
            <div style={{ flex: 1, height: 1, background: `linear-gradient(to right, ${C.accent}40, transparent)` }} />
            <div style={{ width: 5, height: 5, borderRadius: "50%", background: C.accent, opacity: 0.5 }} />
            <div style={{ flex: 1, height: 1, background: `linear-gradient(to left, ${C.accent}40, transparent)` }} />
          </div>
          <h3 style={{ color: C.white, fontSize: 19, fontWeight: 700, margin: 0, fontFamily: font }}>{item.texto}</h3>
        </div>
      );

    case "cualidades":
      return (
        <div style={{ display: "flex", flexDirection: "column", gap: 8, margin: "18px 0" }}>
          {item.items.map((q, i) => (
            <div key={i} style={{ background: C.card2, borderRadius: 8, padding: "14px 16px", borderLeft: `2px solid ${C.accent}` }}>
              <h4 style={{ color: C.accent, fontSize: 12, fontWeight: 800, margin: "0 0 6px", letterSpacing: 1.5, fontFamily: font }}>{q.nombre}</h4>
              <p style={{ ...txt, fontSize: 15.5, marginBottom: q.reflexion ? 6 : 0 }}>{q.detalle}</p>
              {q.reflexion && <p style={{ ...sub, fontSize: 14.5, fontStyle: "italic", paddingLeft: 12, borderLeft: `1px solid ${C.dim}` }}>{q.reflexion}</p>}
            </div>
          ))}
        </div>
      );

    case "definicion":
      return (
        <div style={{ background: C.accentDim, borderRadius: 8, padding: "14px 18px", margin: "16px 0", border: `1px solid ${C.accentBorder}` }}>
          <h4 style={{ color: C.accent, fontSize: 14, fontWeight: 700, margin: "0 0 4px", fontFamily: font }}>{item.termino}</h4>
          <p style={txt}>{item.texto}</p>
        </div>
      );

    case "ejemplo":
      return (
        <div style={{ background: C.card2, borderRadius: 8, padding: 18, margin: "16px 0", borderLeft: `2px solid ${C.accent}` }}>
          <p style={{ fontSize: 11, fontWeight: 800, color: C.accent, letterSpacing: 2, margin: "0 0 6px", fontFamily: font }}>EJEMPLO</p>
          <p style={{ ...txt, fontSize: 16, fontStyle: "italic" }}>{item.texto}</p>
          {item.img && <img src={item.img} alt="" style={{ marginTop: 12, width: "100%", borderRadius: 6, display: "block" }} />}
        </div>
      );

    case "ejemplo_biblico":
      return (
        <div style={{ margin: "22px 0" }}>
          <h4 style={{ textAlign: "center", color: C.accent, fontSize: 13, fontWeight: 700, letterSpacing: 2.5, margin: "0 0 10px", fontFamily: font }}>{item.nombre.toUpperCase()}</h4>
          {item.img && <div style={{ textAlign: "center", marginBottom: 10 }}><img src={item.img} alt={item.nombre} style={{ maxWidth: "100%", maxHeight: 200, borderRadius: 8 }} /></div>}
          <div style={{ background: C.card2, padding: "12px 16px", borderRadius: 6, borderLeft: `2px solid ${C.accent}` }}>
            <p style={{ ...txt, fontSize: 15.5 }}>{item.narrativa}</p>
          </div>
        </div>
      );

    case "destacado":
      return (
        <div style={{ background: C.accentDim, borderRadius: 8, padding: "16px 20px", margin: "20px 0", borderLeft: `2px solid ${C.accent}`, textAlign: "center" }}>
          <p style={{ ...txt, color: C.accent, fontWeight: 600 }}>{item.texto}</p>
        </div>
      );

    case "pilares":
      return (
        <div style={{ display: "flex", gap: 8, margin: "18px 0", flexWrap: "wrap" }}>
          {item.items.map((p, i) => (
            <div key={i} style={{ flex: 1, minWidth: 140, background: C.card2, borderRadius: 8, padding: "16px 14px", textAlign: "center", border: `1px solid ${C.border}` }}>
              <div style={{ fontSize: 26, marginBottom: 6 }}>{p.icono}</div>
              <h4 style={{ color: C.accent, fontSize: 12, fontWeight: 800, margin: "0 0 6px", letterSpacing: 1, fontFamily: font }}>{p.nombre.toUpperCase()}</h4>
              <p style={{ ...sub, fontSize: 13.5 }}>{p.detalle}</p>
            </div>
          ))}
        </div>
      );

    case "lista_enseñanza":
      return (
        <div style={{ background: C.card2, borderRadius: 8, padding: "18px 18px", margin: "18px 0", border: `1px solid ${C.border}` }}>
          <h4 style={{ color: C.accent, fontSize: 13, fontWeight: 700, textAlign: "center", margin: "0 0 14px", letterSpacing: 1, fontFamily: font }}>{item.titulo.toUpperCase()}</h4>
          <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
            {item.items.map((li, i) => (
              <div key={i} style={{ background: C.card, padding: "10px 14px", borderRadius: 5, borderLeft: `2px solid ${C.accentBorder}` }}>
                <p style={{ fontWeight: 700, color: C.white, fontSize: 14.5, margin: "0 0 2px", fontFamily: font }}>{li.punto}</p>
                <p style={{ ...sub, fontSize: 13.5 }}>{li.detalle}</p>
              </div>
            ))}
          </div>
        </div>
      );

    case "llamado_accion":
      return (
        <div style={{ background: C.accentDim, borderRadius: 8, padding: "18px 20px", margin: "20px 0", border: `1px solid ${C.accentBorder}`, textAlign: "center" }}>
          <p style={{ fontSize: 11, fontWeight: 800, color: C.accent, letterSpacing: 2.5, margin: "0 0 8px", fontFamily: font }}>LLAMADO A LA ACCIÓN</p>
          <p style={{ ...txt, fontSize: 16 }}>{item.texto}</p>
        </div>
      );

    case "cierre":
      return (
        <div style={{ textAlign: "center", margin: "32px 0 8px" }}>
          <p style={{ fontSize: 20, fontWeight: 700, color: C.accent, fontFamily: font }}>{item.texto}</p>
        </div>
      );

    case "video":
      return (
        <div style={{ textAlign: "center", margin: "16px 0" }}>
          <div style={{ display: "inline-block", position: "relative" }}>
            <img src={item.img} alt="" style={{ maxWidth: "100%", maxHeight: 200, borderRadius: 8 }} />
            <span style={{ position: "absolute", top: 8, left: 8, background: "#b33", color: "#fff", padding: "3px 10px", borderRadius: 12, fontWeight: 700, fontSize: 11, fontFamily: font }}>▶ Video</span>
          </div>
        </div>
      );

    case "imagen":
      return (
        <div style={{ textAlign: "center", margin: "16px 0" }}>
          <img src={item.img} alt={item.alt || ""} style={{ maxWidth: "100%", maxHeight: 220, borderRadius: 8 }} />
        </div>
      );

    default:
      return null;
  }
}


// ============================================================
// 🎤 MODO DISCURSO — Sección por sección, swipe + botones
// ============================================================
function ModoDiscurso({ discurso, onSalir }) {
  const [sec, setSec] = useState(0);
  const touchRef = useRef({ startX: 0, startY: 0 });
  const scrollRef = useRef(null);
  const total = discurso.secciones.length;

  // Timer cuenta regresiva (global)
  const [timeLeft, setTimeLeft] = useState(30 * 60);
  const [timerRunning, setTimerRunning] = useState(true);
  const [timerStopped, setTimerStopped] = useState(false);
  const timerRef = useRef(null);

  // Timer por sección
  const parseTiempo = (t) => { const m = t?.match(/(\d+)/); return m ? parseInt(m[1]) * 60 : 0; };
  const [secTimeLeft, setSecTimeLeft] = useState(() => parseTiempo(discurso.secciones[0]?.tiempo));
  const [secTimerRunning, setSecTimerRunning] = useState(false);
  const secTimerRef = useRef(null);

  const ir = useCallback((dir) => {
    setSec(p => Math.max(0, Math.min(total - 1, p + dir)));
  }, [total]);

  useEffect(() => {
    if (scrollRef.current) scrollRef.current.scrollTop = 0;
    // Reset section timer on section change
    setSecTimeLeft(parseTiempo(discurso.secciones[sec]?.tiempo));
    setSecTimerRunning(false);
  }, [sec]);

  // Swipe horizontal (ignora si es vertical para no interferir con scroll)
  const onTS = (e) => {
    touchRef.current = { startX: e.touches[0].clientX, startY: e.touches[0].clientY };
  };
  const onTE = (e) => {
    const dx = touchRef.current.startX - e.changedTouches[0].clientX;
    const dy = touchRef.current.startY - e.changedTouches[0].clientY;
    if (Math.abs(dx) > 70 && Math.abs(dx) > Math.abs(dy) * 1.5) {
      ir(dx > 0 ? 1 : -1);
    }
  };

  // Teclado
  useEffect(() => {
    const h = (e) => {
      if (e.key === "ArrowRight") { e.preventDefault(); ir(1); }
      if (e.key === "ArrowLeft") { e.preventDefault(); ir(-1); }
      if (e.key === "Escape") onSalir();
    };
    window.addEventListener("keydown", h);
    return () => window.removeEventListener("keydown", h);
  }, [ir, onSalir]);

  // Countdown timer
  useEffect(() => {
    if (timerRef.current) { clearInterval(timerRef.current); timerRef.current = null; }
    if (timerRunning && !timerStopped && timeLeft > 0) {
      timerRef.current = setInterval(() => {
        setTimeLeft(prev => {
          if (prev <= 1) { clearInterval(timerRef.current); timerRef.current = null; setTimerRunning(false); return 0; }
          return prev - 1;
        });
      }, 1000);
    }
    return () => { if (timerRef.current) clearInterval(timerRef.current); };
  }, [timerRunning, timerStopped]);

  // Countdown timer por sección
  useEffect(() => {
    if (secTimerRef.current) { clearInterval(secTimerRef.current); secTimerRef.current = null; }
    if (secTimerRunning && secTimeLeft > 0) {
      secTimerRef.current = setInterval(() => {
        setSecTimeLeft(prev => {
          if (prev <= 1) { clearInterval(secTimerRef.current); secTimerRef.current = null; setSecTimerRunning(false); return 0; }
          return prev - 1;
        });
      }, 1000);
    }
    return () => { if (secTimerRef.current) clearInterval(secTimerRef.current); };
  }, [secTimerRunning]);

  const fmtTime = (s) => `${String(Math.floor(s / 60)).padStart(2, "0")}:${String(s % 60).padStart(2, "0")}`;
  const timerPause = () => setTimerRunning(false);
  const timerResume = () => { if (timeLeft > 0) setTimerRunning(true); };
  const timerReset = () => { setTimeLeft(30 * 60); setTimerRunning(false); setTimerStopped(false); };
  const secTimerToggle = () => { secTimerRunning ? setSecTimerRunning(false) : (secTimeLeft > 0 && setSecTimerRunning(true)); };
  const secTimerReset = () => { setSecTimeLeft(parseTiempo(discurso.secciones[sec]?.tiempo)); setSecTimerRunning(false); };

  const s = discurso.secciones[sec];

  return (
    <div
      style={{ position: "fixed", inset: 0, background: C.bg, zIndex: 1000, display: "flex", flexDirection: "column", fontFamily: font }}
      onTouchStart={onTS} onTouchEnd={onTE}
    >
      <link href="https://fonts.googleapis.com/css2?family=Outfit:wght@400;500;600;700;800&display=swap" rel="stylesheet" />

      {/* Barra superior */}
      <div style={{ display: "flex", alignItems: "center", padding: "8px 14px", borderBottom: `1px solid ${C.border}`, flexShrink: 0 }}>
        <button onClick={onSalir} style={{ background: "none", border: "none", color: C.gray, padding: "6px 10px", cursor: "pointer", fontSize: 13, fontFamily: font }}>✕</button>

        {/* Timer siempre visible */}
        <div style={{
          display: "inline-flex", alignItems: "center", gap: 4, marginLeft: 6,
          padding: "3px 8px", borderRadius: 6, transition: "all 0.3s ease",
          background: timerStopped ? C.card2 : timeLeft <= 120 ? "rgba(200,80,80,0.12)" : C.accentDim,
          border: `1px solid ${timerStopped ? C.border : timeLeft <= 120 ? "rgba(200,80,80,0.25)" : C.accentBorder}`,
        }}>
          <span style={{
            fontSize: 12, fontWeight: 700, fontFamily: font, letterSpacing: 1, transition: "color 0.5s ease", minWidth: 42,
            color: timerStopped ? C.dim : timeLeft <= 120 ? "#e07070" : timeLeft <= 300 ? C.accent : C.gray,
          }}>
            {fmtTime(timeLeft)}
          </span>
          {timerRunning ? (
            <button onClick={timerPause} title="Pausar" style={{ background: "none", border: "none", color: C.gray, cursor: "pointer", padding: "2px 5px", fontSize: 11, lineHeight: 1 }}>⏸</button>
          ) : (
            <button onClick={timerResume} title="Reanudar" disabled={timerStopped || timeLeft === 0} style={{ background: "none", border: "none", color: timerStopped || timeLeft === 0 ? C.dim : C.accent, cursor: timerStopped || timeLeft === 0 ? "default" : "pointer", padding: "2px 5px", fontSize: 11, lineHeight: 1 }}>▶</button>
          )}
          <button onClick={timerReset} title="Reiniciar" style={{ background: "none", border: "none", color: C.dim, cursor: "pointer", padding: "2px 5px", fontSize: 11, lineHeight: 1 }}>↺</button>
        </div>

        <div style={{ flex: 1, textAlign: "center" }}>
          <span style={{ fontSize: 11, color: C.dim, fontWeight: 700, letterSpacing: 1.5 }}>{sec + 1} / {total}</span>
        </div>

        {/* Timer por sección */}
        {(
          <div style={{
            display: "inline-flex", alignItems: "center", gap: 4, marginRight: 6,
            padding: "3px 8px", borderRadius: 6, transition: "all 0.3s ease",
            background: secTimeLeft === 0 ? "rgba(200,80,80,0.12)" : secTimerRunning ? "rgba(78,162,200,0.10)" : C.card2,
            border: `1px solid ${secTimeLeft === 0 ? "rgba(200,80,80,0.25)" : secTimerRunning ? "rgba(78,162,200,0.25)" : C.border}`,
          }}>
            <span style={{ fontSize: 9, fontWeight: 700, color: C.dim, letterSpacing: 1 }}>SEC</span>
            <span style={{
              fontSize: 12, fontWeight: 700, fontFamily: font, letterSpacing: 1, minWidth: 42, transition: "color 0.5s ease",
              color: secTimeLeft === 0 ? "#e07070" : secTimeLeft <= 30 ? "#e07070" : secTimerRunning ? "#70b8e0" : C.gray,
            }}>
              {fmtTime(secTimeLeft)}
            </span>
            <button onClick={secTimerToggle} title={secTimerRunning ? "Pausar" : "Iniciar"} style={{ background: "none", border: "none", color: secTimerRunning ? "#70b8e0" : C.accent, cursor: "pointer", padding: "2px 5px", fontSize: 11, lineHeight: 1 }}>
              {secTimerRunning ? "⏸" : "▶"}
            </button>
            <button onClick={secTimerReset} title="Reiniciar sección" style={{ background: "none", border: "none", color: C.dim, cursor: "pointer", padding: "2px 5px", fontSize: 11, lineHeight: 1 }}>↺</button>
          </div>
        )}

        <span style={{ fontSize: 11, color: C.dim }}>{s.tiempo}</span>
      </div>

      {/* Progreso */}
      <div style={{ display: "flex", gap: 2, padding: "6px 14px 0", flexShrink: 0 }}>
        {discurso.secciones.map((_, i) => (
          <div key={i} style={{ flex: 1, height: 2.5, borderRadius: 2, background: i <= sec ? C.accent : C.border, transition: "background 0.25s" }} />
        ))}
      </div>

      {/* Título sección */}
      <div style={{ padding: "14px 18px 6px", flexShrink: 0 }}>
        <h2 style={{ fontSize: 19, fontWeight: 700, color: C.white, margin: 0, lineHeight: 1.35, fontFamily: font }}>{s.titulo}</h2>
      </div>

      {/* Contenido scrolleable */}
      <div ref={scrollRef} style={{ flex: 1, overflowY: "auto", padding: "2px 18px 100px", WebkitOverflowScrolling: "touch" }}>
        {s.contenido.map((item, i) => <ContentRenderer key={i} item={item} />)}
      </div>

      {/* Navegación inferior */}
      <div style={{ display: "flex", gap: 8, padding: "10px 14px", borderTop: `1px solid ${C.border}`, background: C.card, flexShrink: 0 }}>
        <button
          onClick={() => ir(-1)}
          disabled={sec === 0}
          style={{
            flex: 1, padding: 13, borderRadius: 8, border: `1px solid ${C.border}`,
            background: sec === 0 ? C.bg : C.card2, color: sec === 0 ? C.dim : C.gray,
            fontSize: 15, fontWeight: 600, fontFamily: font, cursor: sec === 0 ? "default" : "pointer",
            opacity: sec === 0 ? 0.35 : 1, transition: "all 0.2s"
          }}
        >
          ← Anterior
        </button>
        <button
          onClick={() => sec === total - 1 ? onSalir() : ir(1)}
          style={{
            flex: 1, padding: 13, borderRadius: 8, border: "none",
            background: sec === total - 1 ? C.dim : C.accent,
            color: sec === total - 1 ? C.white : C.bg,
            fontSize: 15, fontWeight: 700, fontFamily: font, cursor: "pointer", transition: "all 0.2s"
          }}
        >
          {sec === total - 1 ? "Finalizar ✓" : "Siguiente →"}
        </button>
      </div>
    </div>
  );
}


// ============================================================
// 🏠 APP
// ============================================================
export default function App() {
  const [vista, setVista] = useState("lista");
  const [actual, setActual] = useState(null);
  const [modo, setModo] = useState(false);

  return (
    <div style={{ minHeight: "100vh", background: C.bg, fontFamily: font }}>
      <link href="https://fonts.googleapis.com/css2?family=Outfit:wght@400;500;600;700;800&display=swap" rel="stylesheet" />

      {modo && actual && <ModoDiscurso discurso={actual} onSalir={() => setModo(false)} />}

      {/* ===== LISTA ===== */}
      {vista === "lista" && (
        <>
          <div style={{ background: C.card, borderBottom: `1px solid ${C.border}`, padding: "22px 18px", position: "sticky", top: 0, zIndex: 50 }}>
            <div style={{ maxWidth: 640, margin: "0 auto", display: "flex", alignItems: "center", gap: 12 }}>
              <div style={{ width: 36, height: 36, borderRadius: 7, background: C.accentBorder, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 18 }}>📖</div>
              <div>
                <h1 style={{ fontSize: 18, fontWeight: 800, color: C.white, margin: 0, fontFamily: font }}>Mis Discursos</h1>
                <p style={{ fontSize: 11, color: C.dim, margin: 0 }}>{DISCURSOS.length} guardados</p>
              </div>
            </div>
          </div>

          <div style={{ maxWidth: 640, margin: "0 auto", padding: "18px 14px" }}>
            {DISCURSOS.sort((a, b) => a.numero - b.numero).map(d => (
              <div
                key={d.numero}
                onClick={() => { setActual(d); setVista("ver"); }}
                style={{ background: C.card, borderRadius: 10, padding: "16px 18px", marginBottom: 8, cursor: "pointer", border: `1px solid ${C.border}`, display: "flex", alignItems: "center", gap: 14 }}
              >
                <div style={{ width: 46, height: 46, borderRadius: 8, flexShrink: 0, background: C.accentDim, border: `1px solid ${C.accentBorder}`, display: "flex", alignItems: "center", justifyContent: "center", flexDirection: "column" }}>
                  <span style={{ fontSize: 9, color: C.dim, fontWeight: 700 }}>Nº</span>
                  <span style={{ fontSize: 18, fontWeight: 800, color: C.accent }}>{d.numero}</span>
                </div>
                <div style={{ flex: 1, minWidth: 0 }}>
                  <h3 style={{ fontSize: 15, fontWeight: 700, color: C.white, margin: "0 0 3px", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap", fontFamily: font }}>{d.titulo}</h3>
                  <span style={{ fontSize: 11, color: C.dim }}>{d.secciones.length} secciones · {d.duracion}</span>
                </div>
                <span style={{ color: C.dim, fontSize: 16 }}>›</span>
              </div>
            ))}

            <div style={{ marginTop: 28, background: C.card2, borderRadius: 8, padding: "14px 16px", border: `1px dashed ${C.dim}35` }}>
              <p style={{ fontSize: 12, color: C.gray, margin: 0, lineHeight: 1.6, fontFamily: font }}>
                <span style={{ color: C.accent, fontWeight: 700 }}>Claude Code:</span> "Agrega el discurso #155..." o "Cambia la sección 2 del discurso #100..."
              </p>
            </div>
          </div>
        </>
      )}

      {/* ===== VER DISCURSO ===== */}
      {vista === "ver" && actual && !modo && (
        <>
          <div style={{ background: C.card, borderBottom: `1px solid ${C.border}`, padding: "8px 14px", position: "sticky", top: 0, zIndex: 50, display: "flex", alignItems: "center", gap: 8 }}>
            <button onClick={() => { setVista("lista"); setActual(null); }} style={{ background: "none", border: `1px solid ${C.border}`, color: C.gray, padding: "5px 10px", borderRadius: 5, cursor: "pointer", fontSize: 12, fontFamily: font }}>← Atrás</button>
            <span style={{ flex: 1, fontSize: 11, color: C.dim, textAlign: "center" }}>Nº{actual.numero}</span>
            <button onClick={() => setModo(true)} style={{ background: C.accent, color: C.bg, border: "none", padding: "7px 14px", borderRadius: 6, cursor: "pointer", fontSize: 12, fontWeight: 700, fontFamily: font }}>
              ▶ Modo Discurso
            </button>
          </div>

          <div style={{ maxWidth: 660, margin: "0 auto", padding: "24px 18px 80px" }}>
            <div style={{ textAlign: "center", marginBottom: 32 }}>
              <span style={{ fontSize: 11, fontWeight: 700, color: C.dim, letterSpacing: 2.5 }}>DISCURSO Nº{actual.numero}</span>
              <h1 style={{ fontSize: 23, fontWeight: 800, color: C.white, margin: "8px 0 6px", lineHeight: 1.3, fontFamily: font }}>{actual.titulo}</h1>
              <span style={{ fontSize: 12, color: C.dim }}>{actual.duracion} · {actual.secciones.length} secciones</span>
              <div style={{ height: 1, background: `linear-gradient(to right, transparent, ${C.accent}30, transparent)`, margin: "20px 0 0" }} />
            </div>

            {actual.secciones.map((sec, i) => (
              <div key={i} style={{ marginBottom: 38 }}>
                <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 16 }}>
                  <span style={{ background: C.accent, color: C.bg, width: 28, height: 28, borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center", fontWeight: 800, fontSize: 13, flexShrink: 0, fontFamily: font }}>{i + 1}</span>
                  <h2 style={{ fontSize: 18, fontWeight: 700, color: C.white, margin: 0, flex: 1, fontFamily: font }}>{sec.titulo}</h2>
                  <span style={{ background: C.accentDim, color: C.accent, padding: "2px 8px", borderRadius: 10, fontSize: 11, fontWeight: 600, flexShrink: 0 }}>{sec.tiempo}</span>
                </div>
                {sec.contenido.map((item, j) => <ContentRenderer key={j} item={item} />)}
                {i < actual.secciones.length - 1 && <div style={{ height: 1, background: `linear-gradient(to right, transparent, ${C.border}, transparent)`, margin: "30px 0 0" }} />}
              </div>
            ))}
          </div>
        </>
      )}
    </div>
  );
}
