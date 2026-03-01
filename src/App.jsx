import { useState, useEffect, useRef, useCallback } from "react";

// ============================================================
// 💾 INDEXEDDB — Almacén de archivos grandes (.jwlplaylist)
// ============================================================
const DB_NAME = "discursos_playlists";
const DB_VERSION = 1;
const STORE_NAME = "playlists";

function openDB() {
  return new Promise((resolve, reject) => {
    const req = indexedDB.open(DB_NAME, DB_VERSION);
    req.onupgradeneeded = () => {
      const db = req.result;
      if (!db.objectStoreNames.contains(STORE_NAME)) {
        db.createObjectStore(STORE_NAME, { keyPath: "numero" });
      }
    };
    req.onsuccess = () => resolve(req.result);
    req.onerror = () => reject(req.error);
  });
}

async function savePlaylist(numero, file) {
  const db = await openDB();
  const arrayBuffer = await file.arrayBuffer();
  const record = {
    numero,
    name: file.name,
    size: file.size,
    type: file.type || "application/octet-stream",
    date: new Date().toISOString(),
    data: arrayBuffer,
  };
  return new Promise((resolve, reject) => {
    const tx = db.transaction(STORE_NAME, "readwrite");
    tx.objectStore(STORE_NAME).put(record);
    tx.oncomplete = () => resolve(record);
    tx.onerror = () => reject(tx.error);
  });
}

async function getPlaylist(numero) {
  const db = await openDB();
  return new Promise((resolve, reject) => {
    const tx = db.transaction(STORE_NAME, "readonly");
    const req = tx.objectStore(STORE_NAME).get(numero);
    req.onsuccess = () => resolve(req.result || null);
    req.onerror = () => reject(req.error);
  });
}

async function deletePlaylist(numero) {
  const db = await openDB();
  return new Promise((resolve, reject) => {
    const tx = db.transaction(STORE_NAME, "readwrite");
    tx.objectStore(STORE_NAME).delete(numero);
    tx.oncomplete = () => resolve();
    tx.onerror = () => reject(tx.error);
  });
}

async function getAllPlaylistMeta() {
  const db = await openDB();
  return new Promise((resolve, reject) => {
    const tx = db.transaction(STORE_NAME, "readonly");
    const req = tx.objectStore(STORE_NAME).getAll();
    req.onsuccess = () => {
      const map = {};
      (req.result || []).forEach(r => {
        map[r.numero] = { name: r.name, size: r.size, date: r.date };
      });
      resolve(map);
    };
    req.onerror = () => reject(req.error);
  });
}

// ============================================================
// 📋 BASE DE DATOS DE DISCURSOS
// ============================================================
const DISCURSOS = [
  {
    numero: 100,
    titulo: "Haga amistades que duren para siempre",
    cancion: 109,
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
          { tipo: "lectura", cita: "Proverbios 17:17", texto: "El verdadero amigo ama en todo momento y es un hermano en tiempos de angustia.", seg: "0:16" },
        ]
      },
      {
        titulo: "¿Cómo encontrar amigos que valgan la pena?",
        tiempo: "6 mins",
        contenido: [
          { tipo: "punto", texto: "Los amigos tienen un gran efecto en la clase de personas que somos y en lo que nos pasa. Por eso es tan importante saber elegir bien." },
          { tipo: "lectura", cita: "Proverbios 13:20", texto: "El que anda con sabios se hará sabio, pero al que se junta con necios le irá mal.", seg: "0:14" },
          { tipo: "destacado", texto: "¿En qué debemos fijarnos cuando buscamos amigos? Busquemos amigos que nos hagan mejores personas y que tengan cualidades que valga la pena imitar." },
          {
            tipo: "ejemplo_biblico",
            nombre: "Ejemplo: El mercado",
            img: "https://i.imgur.com/ahzMF4T.png",
            claves: [
              "Es como elegir fruta en el mercado",
              "No agarramos la primera que vemos → la observamos, la tocamos",
              "Con las amistades es igual → fijarnos en las cualidades de la persona",
              "Antes de abrir nuestro corazón, vale la pena mirar bien"
            ]
          },
          {
            tipo: "cualidades",
            items: [
              {
                nombre: "LEALTAD",
                detalle: "Un amigo leal no nos abandona cuando las cosas se ponen difíciles. Nos defiende cuando no estamos presentes y cumple su palabra."
              },
              {
                nombre: "HONESTIDAD",
                detalle: "Un amigo honesto nos dice la verdad, aunque a veces no sea lo que queremos escuchar. No aparenta ser algo que no es."
              },
              {
                nombre: "EMPATÍA Y ÁNIMO",
                detalle: "Un buen amigo escucha de verdad, presta total atención cuando compartimos nuestros problemas y nos anima con la Biblia."
              }
            ]
          },
          { tipo: "destacado", texto: "¿Y los amigos de edades diferentes?" },
          { tipo: "punto", texto: "Sus amigos no siempre tienen que ser de su misma edad o tener el mismo origen que usted. ¡Algunas de las amistades más enriquecedoras nacen de la diversidad!" },
          { tipo: "video", texto: "Reproducir video", img: "https://i.imgur.com/MRLHaCN.png" },
        ]
      },
      {
        titulo: "¿Qué hace falta para tener amistades duraderas?",
        tiempo: "9 mins",
        contenido: [
          { tipo: "punto", texto: "Para tener amistades duraderas debemos demostrar amor desinteresado." },
          { tipo: "definicion", termino: "Amor desinteresado", texto: "Es querer a alguien por quien es, sin esperar recibir algo a cambio. No hay un \"interés\" oculto.", lsm: "amor-honestidad", img: "https://i.imgur.com/yVlXRUZ.png" },
          {
            tipo: "lista_enseñanza",
            titulo: "¿Qué NO es amor desinteresado?",
            items: [
              { punto: "❌ \"Soy tu amigo porque tienes dinero\"", detalle: "Si solo busco a alguien por lo que tiene, no es amistad → es interés." },
              { punto: "❌ \"Soy tu amigo porque tienes carro y me das ride\"", detalle: "Si solo lo busco cuando me conviene, lo estoy usando, no lo estoy queriendo." },
              { punto: "❌ \"Soy tu amigo porque conoces gente importante\"", detalle: "Si me acerco por sus contactos o su posición, es conveniencia, no amor." },
            ]
          },
          {
            tipo: "ejemplo_biblico",
            nombre: "Ejemplo: La mudanza",
            img: "https://i.imgur.com/MANQZnA.png",
            claves: [
              "Usted se muda → día pesado, calor, montañas de cajas",
              "No pidió ayuda → pero suena el timbre temprano",
              "Su amigo llegó listo para trabajar → carga cajas, sube escaleras",
              "\"No tenías que venir\" → \"Para eso estamos\"",
              "Se queda hasta la última caja sin pedir nada a cambio",
              "Eso es amor desinteresado"
            ]
          },
          { tipo: "destacado", texto: "La Biblia nos da ejemplos sobresalientes de amistades que se mantuvieron fuertes gracias al amor desinteresado:" },
          {
            tipo: "ejemplo_biblico",
            nombre: "Rut y Noemí",
            img: "https://i.imgur.com/UTryqlp.png",
            claves: [
              "Rut era moabita → no era israelita, tenía otra religión, otra cultura",
              "Noemí le dijo que se fuera, que no tenía obligación de quedarse",
              "Pero Rut decidió quedarse por amor → \"Tu pueblo será mi pueblo, y tu Dios será mi Dios\" (Rut 1:16, 17)",
              "Dejó su tierra, su familia y su comodidad por alguien que amaba",
              "🔑 Lección: el amor verdadero da sin esperar nada a cambio"
            ]
          },
          {
            tipo: "ejemplo_biblico",
            nombre: "Jonatán y David",
            img: "https://i.imgur.com/b3gwAUp.png",
            claves: [
              "Jonatán era hijo de Saúl → él debía ser el próximo rey",
              "Pero Jehová eligió a David, y Jonatán lo aceptó sin envidia",
              "Cuando Saúl quiso matar a David, Jonatán lo protegió arriesgando su propia vida (1 Samuel 18:1; 23:16-18)",
              "Prefirió la amistad con David antes que su propio trono",
              "🔑 Lección: un verdadero amigo pone al otro por encima de sí mismo"
            ]
          },
          {
            tipo: "ejemplo_biblico",
            nombre: "Pablo y Timoteo",
            img: "https://i.imgur.com/8FT1u2i.png",
            claves: [
              "Pablo era experimentado, Timoteo era joven y tímido",
              "En vez de menospreciarlo, Pablo lo entrenó y le confió misiones importantes",
              "Cuando Pablo estuvo preso en Roma, ¿quién fue a verlo? Timoteo → no lo abandonó",
              "Pablo lo llamó \"hijo amado\" (2 Timoteo 1:2)",
              "🔑 Lección: un buen amigo te ayuda a crecer y está contigo en los momentos difíciles"
            ]
          },
          { tipo: "destacado", texto: "¿Cómo fortalecer nuestras amistades?" },
          {
            tipo: "lista_enseñanza",
            items: [
              { punto: "Escuchar con atención", detalle: "No solo oír → escuchar de verdad. No interrumpir. Interesarse sinceramente. \"Todos deben estar listos para escuchar\" (Santiago 1:19)." },
              { punto: "No esparcir chismes", detalle: "No revelar conversaciones privadas ni hablar a espaldas. \"El chismoso separa a los mejores amigos\" (Proverbios 16:28)." },
              { punto: "Perdonar los errores", detalle: "Nadie es perfecto. Estar dispuestos a perdonar. \"Seguir soportándose unos a otros y perdonándose generosamente\" (Colosenses 3:13)." },
              { punto: "Respetar su privacidad", detalle: "Si un hermano se ve triste → \"¿Estás bien? Aquí estoy\". Si dice que sí → no insistir, no averiguar con otros. \"Tómense la delantera en honrarse unos a otros\" (Romanos 12:10)." },
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

          { tipo: "destacado", texto: "Jehová: un amigo que siempre está ahí" },
          { tipo: "punto", texto: "A Jehová le encanta acercarse a las personas que quieren ser sus amigos. A Abrahán se le llamó \"amigo de Jehová\" (Santiago 2:23). ¡El Creador del universo quiere tener amigos!" },
          { tipo: "lectura", cita: "Santiago 4:8", texto: "Acérquense a Dios, y él se acercará a ustedes.", seg: "0:13" },

          { tipo: "punto", texto: "Para ser amigos de Jehová tenemos que amarlo con todo nuestro corazón:" },
          { tipo: "lectura", cita: "Mateo 22:37, 38", texto: "\"Tienes que amar a Jehová tu Dios con todo tu corazón, con toda tu alma y con toda tu mente\". Este es el mandamiento más importante y el primero." },

          { tipo: "punto", texto: "Pensemos primero: cuando un amigo nuestro está enfermo o deja de ir a las reuniones, ¿qué hacemos?" },
          {
            tipo: "lista_enseñanza",
            titulo: "¿Cómo le demostramos amor a un amigo?",
            items: [
              { punto: "Lo buscamos", detalle: "Le mandamos un WhatsApp, lo llamamos, le hacemos una videollamada. No esperamos a que él nos busque." },
              { punto: "Nos interesamos de verdad", detalle: "No solo un \"¿cómo estás?\" por compromiso → preguntamos, escuchamos, lo visitamos si hace falta." },
              { punto: "Estamos ahí cuando más lo necesita", detalle: "Si está enfermo, desanimado o deja de venir a las reuniones → no lo dejamos solo." },
            ]
          },
          { tipo: "punto", texto: "Y ahora la pregunta importante: si así tratamos a un amigo, ¿cómo le demostramos ese mismo amor a Jehová?" },
          {
            tipo: "lista_enseñanza",
            titulo: "¿Cómo le demostramos amor a Jehová?",
            items: [
              { punto: "Orar", detalle: "Es como llamarlo por teléfono. Le compartimos lo que sentimos y lo que nos preocupa." },
              { punto: "Leer la Biblia", detalle: "Es escucharlo a él. La oración es hablarle, la lectura bíblica es dejarlo que nos hable." },
              { punto: "Obedecer sus mandamientos", detalle: "Es decirle con hechos: \"Te amo\". Obedecer no es una carga, es la forma más bonita de demostrarle amor (1 Juan 5:3)." },
            ]
          },

          { tipo: "destacado", texto: "Jesús: el camino hacia Jehová" },
          { tipo: "punto", texto: "Para acercarnos a Jehová necesitamos a Jesucristo. Es como querer entrar en un edificio: Jesús es la puerta." },
          { tipo: "referencia", cita: "Juan 14:6", texto: "\"Yo soy el camino, la verdad y la vida. Nadie puede llegar al Padre si no es por medio de mí.\"" },
          { tipo: "imagen", img: "https://i.imgur.com/Cbi7RyR.png", alt: "Jesús es la puerta" },

          { tipo: "punto", texto: "¿Cómo nos hacemos amigos de Jesús? Imitando su manera de pensar y actuar, y obedeciendo sus mandamientos (Juan 14:15)." },
          {
            tipo: "lista_enseñanza",
            titulo: "Cómo imitar a Jesús",
            items: [
              { punto: "Demostrar amor con acciones", detalle: "Jesús sanaba enfermos, alimentaba a las multitudes, dedicaba tiempo a cada persona. El amor verdadero se ve en lo que hacemos." },
              { punto: "Perdonar de corazón", detalle: "Clavado en un madero, pidió a su Padre que perdonara a quienes lo maltrataban (Lucas 23:34). Si él pudo, nosotros también." },
              { punto: "Ser humildes", detalle: "Siendo el Hijo de Dios, se arrodilló y lavó los pies de sus apóstoles (Juan 13:5). Un amigo humilde nunca te hará sentir menos." },
            ]
          },
          { tipo: "destacado", texto: "Jehová y Jesús son los amigos más fieles que podemos tener. Si cultivamos esas dos amistades, todas las demás se fortalecerán también." },
        ]
      },
      {
        titulo: "¿Cómo lograr que una amistad dure para siempre?",
        tiempo: "4 mins",
        contenido: [
          { tipo: "punto", texto: "Para que una amistad dure, es necesario fortalecerla continuamente. Igual que una planta necesita agua y luz, nuestras amistades necesitan atención y esfuerzo constante." },
          {
            tipo: "lista_enseñanza",
            titulo: "Fortalezca su amistad con Jehová",
            items: [
              { punto: "Ore constantemente", detalle: "No solo cuando tenga problemas, sino en todo momento. Comparta sus pensamientos con Jehová como lo haría con su mejor amigo (1 Tesalonicenses 5:17)." },
              { punto: "Lea la Biblia", detalle: "La oración es hablar con Jehová; la lectura bíblica es escucharlo a él. Salmo 1:2, 3 compara a quien lee la Palabra con un árbol plantado junto a corrientes de agua." },
            ]
          },
          {
            tipo: "lista_enseñanza",
            titulo: "Hágase amigo de los que aman a Jehová",
            items: [
              { punto: "Rodéese de personas que compartan su fe", detalle: "Busque amigos que amen a Jehová como usted. Juntos se fortalecerán espiritualmente." },
              { punto: "Edifíquense unos a otros", detalle: "No basta con pasar tiempo juntos: ayúdense a amar más a Jehová y adórenlo juntos (1 Tesalonicenses 5:11)." },
              { punto: "No deje de reunirse", detalle: "Hebreos 10:24, 25 nos anima a motivarnos al amor y a las buenas obras sin dejar de reunirnos." },
            ]
          },
          { tipo: "destacado", texto: "¿Qué aprendimos hoy?" },
          {
            tipo: "lista_enseñanza",
            items: [
              { punto: "1. Los buenos amigos nos hacen mejores", detalle: "No cualquiera es un buen amigo → buscamos personas leales, honestas y que nos acerquen a Jehová (Proverbios 13:20)." },
              { punto: "2. El amor desinteresado es la base", detalle: "No buscamos amigos por lo que nos dan → los queremos por quienes son. Rut, Jonatán y Pablo lo demostraron." },
              { punto: "3. Fortalecer nuestras amistades requiere esfuerzo", detalle: "Escuchar, perdonar, no chismear, respetar la privacidad → son cosas que hay que practicar cada día." },
              { punto: "4. Jehová y Jesús son nuestros mejores amigos", detalle: "Si fortalecemos esas dos amistades con oración, lectura bíblica y obediencia, todas las demás se fortalecerán." },
            ]
          },

          { tipo: "destacado", texto: "¿Qué podemos hacer esta semana?" },
          {
            tipo: "lista_enseñanza",
            items: [
              { punto: "📞 Llame o escriba a un hermano", detalle: "Alguien que no ha visto en las reuniones, alguien que esté pasando por un momento difícil. Un simple mensaje puede hacer mucho." },
              { punto: "🙏 Ore por sus amigos", detalle: "Pida a Jehová que lo ayude a ser un mejor amigo y a fortalecer las amistades que ya tiene." },
            ]
          },

          { tipo: "cierre", texto: "Si ponemos en práctica lo que aprendimos hoy, no solo tendremos buenos amigos... tendremos amigos para siempre." },
        ]
      }
    ]
  }
];


// Helper para descargar blob/file
function downloadBlob(blobOrFile, name) {
  const url = URL.createObjectURL(blobOrFile);
  const a = document.createElement("a");
  a.href = url; a.download = name;
  document.body.appendChild(a); a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
}

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
          <div style={{ display: "flex", alignItems: "baseline", justifyContent: "space-between", margin: "0 0 3px" }}>
            <p style={{ margin: 0, fontWeight: 700, color: C.lea, fontSize: 13, fontFamily: font }}>{item.cita}</p>
            {item.seg && <span style={{ color: C.dim, fontSize: 12, fontFamily: font, flexShrink: 0, marginLeft: 8 }}>⏱ {item.seg}</span>}
          </div>
          <p style={{ margin: 0, fontSize: 17, lineHeight: 1.75, color: C.leaText, fontFamily: font }}>{item.texto}</p>
        </div>
      );

    case "referencia":
      return (
        <div style={{ background: "rgba(120,180,120,0.07)", borderRadius: 8, padding: "14px 18px", margin: "18px 0 18px 28px", border: `1px solid rgba(120,180,120,0.15)` }}>
          <div style={{ display: "flex", alignItems: "baseline", gap: 8, margin: "0 0 3px" }}>
            <span style={{ background: "rgba(120,180,120,0.25)", color: "#a8d4a8", padding: "2px 8px", borderRadius: 3, fontWeight: 800, fontSize: 9, letterSpacing: 1.2, fontFamily: font }}>PARAFRASEAR</span>
            <p style={{ margin: 0, fontWeight: 700, color: "#a8d4a8", fontSize: 13, fontFamily: font }}>{item.cita}</p>
          </div>
          <p style={{ margin: 0, fontSize: 15.5, lineHeight: 1.65, color: "#c8dcc8", fontFamily: font, fontStyle: "italic" }}>{item.texto}</p>
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
        <div style={{ display: "flex", gap: 14, alignItems: "stretch", background: C.accentDim, borderRadius: 8, overflow: "hidden", margin: "16px 0", border: `1px solid ${C.accentBorder}` }}>
          {item.img && (
            <div style={{ flexShrink: 0, width: 140 }}>
              <img src={item.img} alt={item.termino} style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }} />
            </div>
          )}
          <div style={{ flex: 1, padding: "14px 18px 14px 0", display: "flex", flexDirection: "column", justifyContent: "center", paddingLeft: item.img ? 0 : 18 }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline", margin: "0 0 4px" }}>
              <h4 style={{ color: C.accent, fontSize: 14, fontWeight: 700, margin: 0, fontFamily: font }}>{item.termino}</h4>
              {item.lsm && <span style={{ background: "rgba(200,162,78,0.2)", color: C.accent, padding: "3px 10px", borderRadius: 4, fontSize: 12, fontWeight: 800, letterSpacing: 1.5, fontFamily: font }}>🤟 {item.lsm.toUpperCase()}</span>}
            </div>
            <p style={txt}>{item.texto}</p>
          </div>
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
          <div style={{ display: "flex", gap: 14, alignItems: "stretch", background: C.card2, borderRadius: 8, overflow: "hidden", borderLeft: `2px solid ${C.accent}` }}>
            {item.img && (
              <div style={{ flexShrink: 0, width: 140 }}>
                <img src={item.img} alt={item.nombre} style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }} />
              </div>
            )}
            <div style={{ flex: 1, padding: "12px 14px 12px 0", display: "flex", flexDirection: "column", justifyContent: "center" }}>
              {item.narrativa && <p style={{ ...txt, fontSize: 15.5 }}>{item.narrativa}</p>}
              {item.claves && item.claves.map((c, i) => (
                <div key={i} style={{ display: "flex", gap: 8, alignItems: "baseline", margin: i === 0 ? 0 : "6px 0 0" }}>
                  <span style={{ color: C.accent, fontSize: 11, flexShrink: 0 }}>▸</span>
                  <p style={{ ...txt, fontSize: 14.5, margin: 0 }}>{c}</p>
                </div>
              ))}
            </div>
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
          {item.titulo && <h4 style={{ color: C.accent, fontSize: 13, fontWeight: 700, textAlign: "center", margin: "0 0 14px", letterSpacing: 1, fontFamily: font }}>{item.titulo.toUpperCase()}</h4>}
          <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
            {item.items.map((li, i) => (
              <div key={i} style={{ background: C.card, padding: "10px 14px", borderRadius: 5, borderLeft: `2px solid ${C.accentBorder}` }}>
                <p style={{ fontWeight: 700, color: C.accent, fontSize: 14.5, margin: "0 0 4px", fontFamily: font }}>{li.punto}</p>
                <p style={{ ...txt, fontSize: 14, color: "#c5c1b8" }}>{li.detalle}</p>
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
  const [sec, setSec] = useState(() => {
    const saved = localStorage.getItem("discurso_seccion");
    return saved ? Number(saved) : 0;
  });
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
    localStorage.setItem("discurso_seccion", sec);
    // Reset section timer on section change
    setSecTimeLeft(parseTiempo(discurso.secciones[sec]?.tiempo));
    setSecTimerRunning(false);
  }, [sec]);

  // Swipe deshabilitado — navegación solo con botones
  const onTS = () => {};
  const onTE = () => {};

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




// 🏠 APP
// ============================================================
export default function App() {
  const [vista, setVista] = useState(() => {
    const saved = localStorage.getItem("discurso_vista");
    return saved || "lista";
  });
  const [actual, setActual] = useState(() => {
    const savedNum = localStorage.getItem("discurso_actual");
    if (savedNum) return DISCURSOS.find(d => d.numero === Number(savedNum)) || null;
    return null;
  });
  const [modo, setModo] = useState(() => localStorage.getItem("discurso_modo") === "true");
  const [playlistMap, setPlaylistMap] = useState({});
  const [playlistLoading, setPlaylistLoading] = useState(null); // numero del discurso que se está cargando
  const [deleteConfirm, setDeleteConfirm] = useState(null); // numero del discurso a confirmar eliminación
  const fileInputRef = useRef(null);
  const uploadTargetRef = useRef(null); // numero del discurso al que se sube
  const fileCacheRef = useRef({}); // cache de File objects para share instantáneo

  // Cargar metadatos de playlists al inicio (solo metadata ligera, no archivos completos)
  useEffect(() => {
    getAllPlaylistMeta().then(setPlaylistMap).catch(() => {});
  }, []);

  // Ref callback: adjunta onclick NATIVO directo al botón para preservar user gesture.
  // NO agregar onClick en JSX a este botón — el handler nativo es necesario para navigator.share().
  const shareRefCallback = useCallback((btnEl) => {
    if (!btnEl) return;
    const numero = parseInt(btnEl.dataset.shareNumero);
    btnEl.onclick = function (e) {
      e.stopPropagation();
      e.preventDefault();
      const cachedFile = fileCacheRef.current[numero];

      if (cachedFile && navigator.share) {
        navigator.share({ title: cachedFile.name, files: [cachedFile] }).catch(err => {
          if (err.name !== "AbortError") downloadBlob(cachedFile, cachedFile.name);
        });
      } else if (cachedFile) {
        downloadBlob(cachedFile, cachedFile.name);
      } else {
        // Sin cache — cargar de IndexedDB, cachear, e intentar share (funciona en Android)
        (async () => {
          try {
            const record = await getPlaylist(numero);
            if (!record) return;
            const file = new File([record.data], record.name, { type: "application/zip" });
            fileCacheRef.current[numero] = file;
            if (navigator.share) {
              try { await navigator.share({ title: file.name, files: [file] }); return; }
              catch (e) { if (e.name === "AbortError") return; }
            }
            downloadBlob(file, file.name);
          } catch (err) { console.error(err); }
        })();
      }
    };
  }, []);

  const triggerUpload = (numero) => {
    uploadTargetRef.current = numero;
    fileInputRef.current?.click();
  };

  const handlePlaylistUpload = async (e) => {
    const file = e.target.files?.[0];
    const numero = uploadTargetRef.current;
    if (!file || !numero) return;
    setPlaylistLoading(numero);
    try {
      const record = await savePlaylist(numero, file);
      setPlaylistMap(prev => ({ ...prev, [numero]: { name: record.name, size: record.size, date: record.date } }));
      // Cache con tipo ZIP para que navigator.share lo acepte
      fileCacheRef.current[numero] = new File([file], file.name, { type: "application/zip" });
    } catch (err) {
      alert("Error al guardar: " + err.message);
    }
    setPlaylistLoading(null);
    if (fileInputRef.current) fileInputRef.current.value = "";
  };

  const handlePlaylistDownload = async (numero) => {
    try {
      const cachedFile = fileCacheRef.current[numero];
      if (cachedFile) {
        downloadBlob(cachedFile, cachedFile.name);
        return;
      }
      const record = await getPlaylist(numero);
      if (!record) return;
      const file = new File([record.data], record.name, { type: "application/zip" });
      fileCacheRef.current[numero] = file;
      downloadBlob(file, record.name);
    } catch (err) {
      alert("Error: " + err.message);
    }
  };

  const handlePlaylistDelete = (numero) => {
    setDeleteConfirm(numero);
  };

  const confirmPlaylistDelete = async () => {
    const numero = deleteConfirm;
    setDeleteConfirm(null);
    try {
      await deletePlaylist(numero);
      delete fileCacheRef.current[numero];
      setPlaylistMap(prev => {
        const next = { ...prev };
        delete next[numero];
        return next;
      });
    } catch (err) {
      alert("Error: " + err.message);
    }
  };

  const fmtFileSize = (bytes) => {
    if (bytes < 1024) return bytes + " B";
    if (bytes < 1048576) return (bytes / 1024).toFixed(1) + " KB";
    return (bytes / 1048576).toFixed(1) + " MB";
  };

  useEffect(() => {
    localStorage.setItem("discurso_vista", vista);
    localStorage.setItem("discurso_actual", actual ? actual.numero : "");
    localStorage.setItem("discurso_modo", modo);
  }, [vista, actual, modo]);

  return (
    <div style={{ minHeight: "100vh", background: C.bg, fontFamily: font }}>
      <link href="https://fonts.googleapis.com/css2?family=Outfit:wght@400;500;600;700;800&display=swap" rel="stylesheet" />
      <style>{`
        /* Scrollbar elegante para desktop */
        ::-webkit-scrollbar { width: 8px; height: 8px; }
        ::-webkit-scrollbar-track { background: rgba(17,17,16,0.5); border-radius: 8px; }
        ::-webkit-scrollbar-thumb { background: rgba(200,162,78,0.25); border-radius: 8px; border: 2px solid transparent; background-clip: padding-box; }
        ::-webkit-scrollbar-thumb:hover { background: rgba(200,162,78,0.45); border: 2px solid transparent; background-clip: padding-box; }
        ::-webkit-scrollbar-thumb:active { background: rgba(200,162,78,0.6); border: 2px solid transparent; background-clip: padding-box; }
        ::-webkit-scrollbar-corner { background: transparent; }
        /* Firefox */
        * { scrollbar-width: thin; scrollbar-color: rgba(200,162,78,0.25) rgba(17,17,16,0.5); }
      `}</style>

      {modo && actual && <ModoDiscurso discurso={actual} onSalir={() => { setModo(false); localStorage.removeItem("discurso_seccion"); }} />}

      {/* ===== LISTA ===== */}
      {vista === "lista" && (
        <>
          <div style={{ background: C.card, borderBottom: `1px solid ${C.border}`, padding: "22px 18px", position: "sticky", top: 0, zIndex: 50 }}>
            <div style={{ maxWidth: 720, margin: "0 auto", display: "flex", alignItems: "center", gap: 12 }}>
              <div style={{ width: 36, height: 36, borderRadius: 7, background: C.accentBorder, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 18 }}>📖</div>
              <div>
                <h1 style={{ fontSize: 18, fontWeight: 800, color: C.white, margin: 0, fontFamily: font }}>Bosquejos 30 min.</h1>
                <p style={{ fontSize: 11, color: C.dim, margin: 0 }}>{DISCURSOS.length} guardados</p>
              </div>
            </div>
          </div>

          <div style={{ maxWidth: 720, margin: "0 auto", padding: "18px 14px" }}>
            {DISCURSOS.map(d => (
              <div key={d.numero} style={{ background: C.card, borderRadius: 10, marginBottom: 10, border: `1px solid ${C.border}`, display: "flex", alignItems: "stretch", overflow: "hidden" }}>
                {/* Columna izquierda — info del discurso */}
                <div
                  onClick={() => { setActual(d); setVista("ver"); }}
                  style={{ flex: 1, padding: "16px 18px", cursor: "pointer", display: "flex", alignItems: "center", gap: 14, minWidth: 0 }}
                >
                  <div style={{ width: 46, height: 46, borderRadius: 8, flexShrink: 0, background: C.accentDim, border: `1px solid ${C.accentBorder}`, display: "flex", alignItems: "center", justifyContent: "center" }}>
                    <span style={{ fontSize: 20, fontWeight: 800, color: C.accent }}>{d.numero}</span>
                  </div>
                  <div style={{ flex: 1, minWidth: 0 }}>
                    <h3 style={{ fontSize: 15, fontWeight: 700, color: C.white, margin: "0 0 3px", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap", fontFamily: font }}>{d.titulo}</h3>
                    <span style={{ fontSize: 11, color: C.dim }}>{d.secciones.length} secciones · {d.duracion}{d.cancion ? ` · 🎵 Canción ${d.cancion}` : ""}</span>
                  </div>
                  <span style={{ color: C.dim, fontSize: 16, flexShrink: 0 }}>›</span>
                </div>

                {/* Columna derecha — playlist */}
                <div style={{ flexShrink: 0, borderLeft: `1px solid ${C.border}`, display: "flex", alignItems: "center", padding: "8px 10px", gap: 10 }}>
                  {playlistMap[d.numero] ? (
                    <>
                      {/* Icono de archivo a la izquierda */}
                      <div style={{ flexShrink: 0, display: "flex", flexDirection: "column", alignItems: "center", gap: 3 }}>
                        <svg width="30" height="36" viewBox="0 0 30 36" fill="none">
                          <rect x="1" y="1" width="28" height="34" rx="3" fill="rgba(200,162,78,0.08)" stroke="rgba(200,162,78,0.25)" strokeWidth="1"/>
                          <path d="M18 1v7a2 2 0 002 2h7" stroke="rgba(200,162,78,0.25)" strokeWidth="1" fill="none"/>
                          <line x1="7" y1="16" x2="23" y2="16" stroke="rgba(200,162,78,0.2)" strokeWidth="1"/>
                          <line x1="7" y1="20" x2="20" y2="20" stroke="rgba(200,162,78,0.15)" strokeWidth="1"/>
                          <line x1="7" y1="24" x2="17" y2="24" stroke="rgba(200,162,78,0.1)" strokeWidth="1"/>
                        </svg>
                        <span style={{ fontSize: 8, color: C.dim, fontFamily: font }}>{fmtFileSize(playlistMap[d.numero].size)}</span>
                      </div>

                      {/* Banners de acción a la derecha — lista vertical */}
                      <div style={{ display: "flex", flexDirection: "column", gap: 3 }}>
                        {/* Compartir — ref callback adjunta onclick NATIVO directo al botón */}
                        <button
                          ref={shareRefCallback}
                          data-share-numero={d.numero}
                          style={{ background: "rgba(200,162,78,0.06)", border: `1px solid rgba(200,162,78,0.12)`, borderRadius: 6, padding: "5px 12px 5px 8px", cursor: "pointer", display: "flex", alignItems: "center", gap: 6, width: "100%" }}
                        >
                          <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="#c8a24e" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"><path d="M4 12v8a2 2 0 002 2h12a2 2 0 002-2v-8"/><polyline points="16 6 12 2 8 6"/><line x1="12" y1="2" x2="12" y2="15"/></svg>
                          <span style={{ fontSize: 10, color: C.gray, fontWeight: 600, fontFamily: font, letterSpacing: 0.3 }}>Compartir</span>
                        </button>
                        {[
                          { label: "Descargar", action: handlePlaylistDownload, icon: <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="#c8a24e" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 15v4a2 2 0 01-2 2H5a2 2 0 01-2-2v-4"/><polyline points="7 10 12 15 17 10"/><line x1="12" y1="15" x2="12" y2="3"/></svg> },
                          { label: "Eliminar", action: handlePlaylistDelete, icon: <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="#c8a24e" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"><polyline points="3 6 5 6 21 6"/><path d="M19 6v14a2 2 0 01-2 2H7a2 2 0 01-2-2V6m3 0V4a2 2 0 012-2h4a2 2 0 012 2v2"/></svg> },
                        ].map((btn) => (
                          <button
                            key={btn.label}
                            onClick={(e) => { e.stopPropagation(); btn.action(d.numero); }}
                            style={{ background: "rgba(200,162,78,0.06)", border: `1px solid rgba(200,162,78,0.12)`, borderRadius: 6, padding: "5px 12px 5px 8px", cursor: "pointer", display: "flex", alignItems: "center", gap: 6, width: "100%" }}
                          >
                            {btn.icon}
                            <span style={{ fontSize: 10, color: C.gray, fontWeight: 600, fontFamily: font, letterSpacing: 0.3 }}>{btn.label}</span>
                          </button>
                        ))}
                      </div>
                    </>
                  ) : (
                    <button
                      onClick={(e) => { e.stopPropagation(); triggerUpload(d.numero); }}
                      disabled={playlistLoading === d.numero}
                      style={{ background: "none", border: `1.5px dashed ${C.accentBorder}`, borderRadius: 8, padding: "12px 16px", cursor: playlistLoading === d.numero ? "wait" : "pointer", display: "flex", flexDirection: "column", alignItems: "center", gap: 4 }}
                    >
                      <svg width="22" height="26" viewBox="0 0 30 36" fill="none" opacity="0.5">
                        <rect x="1" y="1" width="28" height="34" rx="3" stroke="rgba(200,162,78,0.4)" strokeWidth="1.5" strokeDasharray="4 3" fill="none"/>
                        <line x1="15" y1="12" x2="15" y2="24" stroke="rgba(200,162,78,0.4)" strokeWidth="1.5"/>
                        <line x1="9" y1="18" x2="21" y2="18" stroke="rgba(200,162,78,0.4)" strokeWidth="1.5"/>
                      </svg>
                      <span style={{ fontSize: 10, color: C.accent, fontWeight: 700, fontFamily: font }}>{playlistLoading === d.numero ? "Guardando..." : "Adjuntar"}</span>
                    </button>
                  )}
                </div>
              </div>
            ))}

            {/* Input oculto global para subir playlists */}
            <input
              ref={fileInputRef}
              type="file"
              accept=".jwlplaylist"
              onChange={handlePlaylistUpload}
              style={{ display: "none" }}
            />
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
              {actual.cancion && <div style={{ marginTop: 10 }}><span style={{ background: C.accentDim, color: C.accent, padding: "4px 12px", borderRadius: 6, fontSize: 12, fontWeight: 700, fontFamily: font }}>🎵 Canción {actual.cancion}</span></div>}
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

      {/* Modal de confirmación para eliminar playlist */}
      {deleteConfirm !== null && (
        <div onClick={() => setDeleteConfirm(null)} style={{
          position: "fixed", inset: 0, background: "rgba(0,0,0,0.65)", zIndex: 9999,
          display: "flex", alignItems: "center", justifyContent: "center", padding: 24,
          backdropFilter: "blur(4px)", WebkitBackdropFilter: "blur(4px)",
        }}>
          <div onClick={e => e.stopPropagation()} style={{
            background: C.card, border: `1px solid ${C.border}`, borderRadius: 14,
            padding: "28px 24px 20px", maxWidth: 320, width: "100%",
            display: "flex", flexDirection: "column", alignItems: "center", gap: 16,
          }}>
            <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="#e05050" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
              <circle cx="12" cy="12" r="10" fill="rgba(224,80,80,0.08)" />
              <line x1="12" y1="8" x2="12" y2="13" />
              <circle cx="12" cy="16" r="0.5" fill="#e05050" />
            </svg>
            <div style={{ textAlign: "center" }}>
              <p style={{ fontSize: 15, fontWeight: 700, color: C.white, fontFamily: font, margin: "0 0 6px" }}>
                Eliminar archivo
              </p>
              <p style={{ fontSize: 13, color: C.gray, fontFamily: font, margin: 0, lineHeight: 1.5 }}>
                {playlistMap[deleteConfirm]
                  ? <>Se eliminará <strong style={{ color: C.white }}>{playlistMap[deleteConfirm].name}</strong> de este discurso.</>
                  : "Se eliminará el archivo de este discurso."}
              </p>
            </div>
            <div style={{ display: "flex", gap: 10, width: "100%", marginTop: 4 }}>
              <button onClick={() => setDeleteConfirm(null)} style={{
                flex: 1, padding: "10px 0", borderRadius: 8, cursor: "pointer", fontSize: 13, fontWeight: 600, fontFamily: font,
                background: "none", border: `1px solid ${C.border}`, color: C.gray,
              }}>Cancelar</button>
              <button onClick={confirmPlaylistDelete} style={{
                flex: 1, padding: "10px 0", borderRadius: 8, cursor: "pointer", fontSize: 13, fontWeight: 600, fontFamily: font,
                background: "rgba(224,80,80,0.12)", border: "1px solid rgba(224,80,80,0.25)", color: "#e05050",
              }}>Eliminar</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
