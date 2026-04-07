import { C, font } from "../theme";

export default function ContentRenderer({ item }) {
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
          <p style={{ fontSize: 11, fontWeight: 800, color: C.accent, letterSpacing: 2.5, margin: "0 0 8px", fontFamily: font }}>LLAMADO A LA ACCION</p>
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

    case "imagen_lista":
      return (
        <div style={{ display: "flex", gap: 16, alignItems: "center", background: C.card2, borderRadius: 10, overflow: "hidden", margin: "18px 0", border: `1px solid ${C.border}` }}>
          <div style={{ flexShrink: 0, width: 160, alignSelf: "stretch" }}>
            <img src={item.img} alt="" style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }} />
          </div>
          <div style={{ flex: 1, padding: "14px 16px 14px 0", display: "flex", flexDirection: "column", gap: 10 }}>
            {item.items.map((li, i) => (
              <div key={i} style={{ display: "flex", gap: 10, alignItems: "center" }}>
                <span style={{ fontSize: 18, flexShrink: 0 }}>{li.icono}</span>
                <div>
                  <p style={{ margin: 0, fontWeight: 700, color: C.accent, fontSize: 13, fontFamily: font }}>{li.nombre}</p>
                  <p style={{ margin: 0, fontSize: 13.5, color: C.gray, fontFamily: font }}>{li.detalle}</p>
                </div>
              </div>
            ))}
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
