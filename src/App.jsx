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
          { tipo: "punto", texto: "¿Qué es un amigo verdadero y cómo encontrar un amigo verdadero?" },
          { tipo: "video", texto: "Reproducir video", img: "https://i.imgur.com/3nqB4wG.png" },
          { tipo: "subtitulo", texto: "¿En qué debemos fijarnos cuando buscamos amigos?" },
          { tipo: "punto", texto: "Busquemos amigos que nos hagan mejores personas y que tengan cualidades que valga la pena imitar." },
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
        ]
      },
      {
        titulo: "¿Qué hace falta para tener amistades duraderas?",
        tiempo: "9 mins",
        contenido: [
          { tipo: "punto", texto: "Para tener amistades duraderas debemos demostrar amor desinteresado." },
          { tipo: "definicion", termino: "Amor desinteresado", texto: "Es querer a alguien por quien es, sin esperar recibir algo a cambio. No hay un \"interés\" oculto." },
          { tipo: "ejemplo", texto: "Es como el jardinero que cuida una flor. No la cuida para que le dé las gracias, sino por el simple placer de verla crecer y florecer. Es una de las formas más libres y genuinas de amar.", img: "https://i.imgur.com/4fgzur6.png" },
          { tipo: "punto", texto: "La Biblia nos da ejemplos sobresalientes de amistades que se mantuvieron fuertes gracias al amor desinteresado:" },
          {
            tipo: "ejemplo_biblico",
            nombre: "Rut y Noemí",
            img: "https://i.imgur.com/UTryqlp.png",
            narrativa: "Rut era moabita y no tenía ninguna obligación de quedarse con su suegra Noemí después de que su esposo muriera. Pero su amor desinteresado la llevó a decir: \"Tu pueblo será mi pueblo, y tu Dios será mi Dios\" (Rut 1:16). Dejó su tierra, su familia y su comodidad por amor a Noemí."
          },
          {
            tipo: "ejemplo_biblico",
            nombre: "Jonatán y David",
            img: "https://i.imgur.com/b3gwAUp.png",
            narrativa: "Jonatán era el heredero al trono de Israel, pero cuando supo que Jehová había elegido a David como futuro rey, no se llenó de envidia. Al contrario, lo apoyó, lo protegió de su propio padre Saúl e incluso arriesgó su vida por él (1 Samuel 20:30-34). ¡Qué ejemplo tan extraordinario de amor desinteresado!"
          },
          {
            tipo: "ejemplo_biblico",
            nombre: "Pablo y Timoteo",
            img: "https://i.imgur.com/8FT1u2i.png",
            narrativa: "A pesar de la diferencia de edad, Pablo y Timoteo formaron una amistad profunda basada en su amor por Jehová. Pablo llamó a Timoteo \"hijo amado\" (2 Timoteo 1:2) y ambos se fortalecieron mutuamente en la fe."
          },
          { tipo: "destacado", texto: "¿Qué tenían en común estas tres amistades? Amor desinteresado, lealtad y servicio a Jehová. Si imitamos su ejemplo, nuestras amistades también serán cada vez más fuertes." },
        ]
      },
      {
        titulo: "¿Cuáles son las amistades más importantes?",
        tiempo: "8 mins",
        contenido: [
          { tipo: "pregunta", texto: "Hemos visto que los buenos amigos nos hacen mejores personas. Pero ¿quién puede ayudarnos más que nadie a ser la mejor versión de nosotros mismos?" },
          { tipo: "punto", texto: "Los mejores amigos que podemos tener son Jehová y Jesús." },
          { tipo: "punto", texto: "A Jehová le encanta acercarse a las personas que quieren ser sus amigos (Santiago 4:8)." },
          { tipo: "subpunto", texto: "Para ser amigos de Jehová tenemos que amarlo con todo nuestro corazón." },
          { tipo: "lectura", cita: "Mateo 22:37, 38", texto: "Él le contestó: \"'Ama a Jehová tu Dios con todo tu corazón, con toda tu alma y con toda tu mente'. Este es el primero y el más importante de los mandamientos.\"" },
          { tipo: "subpunto", texto: "Cuando obedecemos a Jehová, le demostramos que lo amamos por encima de todo." },
          { tipo: "punto", texto: "Nos acercamos a Jehová a través de Jesucristo." },
          { tipo: "cita_biblica", contexto: "En Juan 14:6, Tomás le pregunta a Jesús que a dónde va, y él responde:", texto: "\"Yo soy el camino, la verdad y la vida. Nadie puede llegar al Padre si no es por medio de mí.\"" },
          { tipo: "subpunto", texto: "Querer ser amigo de Jehová sin ser un buen amigo de Jesús es como querer entrar en un edificio sin pasar por la puerta." },
          { tipo: "imagen", img: "https://i.imgur.com/Cbi7RyR.png", alt: "Jesús es la puerta" },
          { tipo: "subpunto", texto: "Logramos ser amigos de Jesús imitando su manera de pensar y de actuar, y obedeciendo sus mandamientos." },
          {
            tipo: "lista_enseñanza",
            titulo: "Cómo imitar a Jesús",
            items: [
              { punto: "Demostrar amor con acciones", detalle: "Jesús no solo sentía amor, lo demostraba con acciones." },
              { punto: "Ser perdonadores", detalle: "Jesús perdonó a quienes lo maltrataron, incluso pidiendo a su Padre que los perdonara." },
              { punto: "Mostrar humildad", detalle: "A pesar de ser el Hijo de Dios, Jesús lavó los pies de sus apóstoles." },
              { punto: "Poner la voluntad de Jehová primero", detalle: "Su oración más importante: \"que se haga tu voluntad, y no la mía\"." },
              { punto: "Ser un maestro paciente", detalle: "Jesús usaba parábolas para que todo tipo de personas pudieran entender verdades profundas." },
            ]
          }
        ]
      },
      {
        titulo: "¿Cómo lograr que una amistad dure para siempre?",
        tiempo: "4 mins",
        contenido: [
          { tipo: "punto", texto: "Hemos visto por qué necesitamos amigos, cómo encontrarlos, qué los mantiene unidos y quiénes son los amigos más importantes. Pero ¿cómo logramos que esas amistades duren para siempre?" },
          { tipo: "lectura", cita: "Proverbios 27:17", texto: "El hierro se afila con hierro, y un hombre afila a otro." },
          { tipo: "subpunto", texto: "Una amistad duradera es como dos piezas de hierro que se afilan mutuamente: ambas se hacen más fuertes con el tiempo." },
          {
            tipo: "pilares",
            items: [
              { icono: "💬", nombre: "Comunicación", detalle: "Hablar con sinceridad y escuchar con atención. No espere a que su amigo lo busque; tome la iniciativa." },
              { icono: "🤝", nombre: "Servir juntos", detalle: "Las amistades más fuertes se forjan sirviendo a Jehová hombro a hombro." },
              { icono: "❤️", nombre: "Perdonar", detalle: "Pasar por alto los errores y no guardar rencor. Nadie es perfecto." },
            ]
          },
          { tipo: "subpunto", texto: "Para fortalecer su amistad con Jehová, órele constantemente y escuche lo que él le dice leyendo su Palabra." },
          { tipo: "punto", texto: "Hágase amigo de los que aman a Jehová como usted. Ayúdelos a amarlo más y adoren a Jehová juntos." },
          { tipo: "llamado_accion", texto: "Esta semana, ¿por qué no invita a un hermano de la congregación a predicar juntos o a tomar un café? Las amistades eternas empiezan con pequeños gestos de amor desinteresado." },
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
  const txt = { fontSize: 17, lineHeight: 1.8, color: C.white, margin: 0, fontFamily: font };
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
      return <h3 style={{ color: C.white, fontSize: 19, fontWeight: 700, margin: "28px 0 10px", fontFamily: font }}>{item.texto}</h3>;

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
          {item.img && <img src={item.img} alt="" style={{ marginTop: 12, width: "100%", maxWidth: 220, borderRadius: 6, display: "block" }} />}
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

  const ir = useCallback((dir) => {
    setSec(p => Math.max(0, Math.min(total - 1, p + dir)));
  }, [total]);

  useEffect(() => {
    if (scrollRef.current) scrollRef.current.scrollTop = 0;
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

  const s = discurso.secciones[sec];

  return (
    <div
      style={{ position: "fixed", inset: 0, background: C.bg, zIndex: 1000, display: "flex", flexDirection: "column", fontFamily: font }}
      onTouchStart={onTS} onTouchEnd={onTE}
    >
      <link href="https://fonts.googleapis.com/css2?family=Outfit:wght@400;500;600;700;800&display=swap" rel="stylesheet" />

      {/* Barra superior mínima */}
      <div style={{ display: "flex", alignItems: "center", padding: "8px 14px", borderBottom: `1px solid ${C.border}`, flexShrink: 0 }}>
        <button onClick={onSalir} style={{ background: "none", border: "none", color: C.gray, padding: "6px 10px", cursor: "pointer", fontSize: 13, fontFamily: font }}>✕</button>
        <div style={{ flex: 1, textAlign: "center" }}>
          <span style={{ fontSize: 11, color: C.dim, fontWeight: 700, letterSpacing: 1.5 }}>{sec + 1} / {total}</span>
        </div>
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
