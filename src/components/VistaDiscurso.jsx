import { C, font } from "../theme";
import ContentRenderer from "./ContentRenderer";

export default function VistaDiscurso({ discurso, onVolver, onModoDiscurso }) {
  return (
    <>
      <div style={{ background: C.card, borderBottom: `1px solid ${C.border}`, padding: "8px 14px", position: "sticky", top: 0, zIndex: 50, display: "flex", alignItems: "center", gap: 8 }}>
        <button onClick={onVolver} style={{ background: "none", border: `1px solid ${C.border}`, color: C.gray, padding: "5px 10px", borderRadius: 5, cursor: "pointer", fontSize: 12, fontFamily: font }}>← Atrás</button>
        <span style={{ flex: 1, fontSize: 11, color: C.dim, textAlign: "center" }}>Nº{discurso.numero}</span>
        <button onClick={onModoDiscurso} style={{ background: C.accent, color: C.bg, border: "none", padding: "7px 14px", borderRadius: 6, cursor: "pointer", fontSize: 12, fontWeight: 700, fontFamily: font }}>
          ▶ Modo Discurso
        </button>
      </div>

      <div style={{ maxWidth: 660, margin: "0 auto", padding: "24px 18px 80px" }}>
        <div style={{ textAlign: "center", marginBottom: 32 }}>
          <span style={{ fontSize: 11, fontWeight: 700, color: C.dim, letterSpacing: 2.5 }}>DISCURSO Nº{discurso.numero}</span>
          <h1 style={{ fontSize: 23, fontWeight: 800, color: C.white, margin: "8px 0 6px", lineHeight: 1.3, fontFamily: font }}>{discurso.titulo}</h1>
          <span style={{ fontSize: 12, color: C.dim }}>{discurso.duracion} · {discurso.secciones.length} secciones</span>
          {discurso.cancion && <div style={{ marginTop: 10 }}><span style={{ background: C.accentDim, color: C.accent, padding: "4px 12px", borderRadius: 6, fontSize: 12, fontWeight: 700, fontFamily: font }}>🎵 Canción {discurso.cancion}</span></div>}
          <div style={{ height: 1, background: `linear-gradient(to right, transparent, ${C.accent}30, transparent)`, margin: "20px 0 0" }} />
        </div>

        {discurso.secciones.map((sec, i) => (
          <div key={i} style={{ marginBottom: 38 }}>
            <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 16 }}>
              <span style={{ background: C.accent, color: C.bg, width: 28, height: 28, borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center", fontWeight: 800, fontSize: 13, flexShrink: 0, fontFamily: font }}>{i + 1}</span>
              <h2 style={{ fontSize: 18, fontWeight: 700, color: C.white, margin: 0, flex: 1, fontFamily: font }}>{sec.titulo}</h2>
              <span style={{ background: C.accentDim, color: C.accent, padding: "2px 8px", borderRadius: 10, fontSize: 11, fontWeight: 600, flexShrink: 0 }}>{sec.tiempo}</span>
            </div>
            {sec.contenido.map((item, j) => <ContentRenderer key={j} item={item} />)}
            {i < discurso.secciones.length - 1 && <div style={{ height: 1, background: `linear-gradient(to right, transparent, ${C.border}, transparent)`, margin: "30px 0 0" }} />}
          </div>
        ))}
      </div>
    </>
  );
}
