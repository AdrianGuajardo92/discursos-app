import { useState } from "react";
import { C, font } from "../theme";
import ContentRenderer from "./ContentRenderer";

export default function VistaDiscurso({ discurso, onVolver, onModoDiscurso }) {
  const [exportando, setExportando] = useState(false);

  const exportarPDF = async () => {
    setExportando(true);
    try {
      const { default: generarPDF } = await import("../utils/generarPDF.js");
      generarPDF(discurso);
    } catch (e) {
      console.error("Error exportando PDF:", e);
    } finally {
      setExportando(false);
    }
  };

  return (
    <>
      <div style={{ background: C.card, borderBottom: `1px solid ${C.border}`, padding: "8px 14px", position: "sticky", top: 0, zIndex: 50, display: "flex", alignItems: "center", gap: 8 }}>
        <button onClick={onVolver} style={{ background: "none", border: `1px solid ${C.border}`, color: C.gray, padding: "5px 10px", borderRadius: 5, cursor: "pointer", fontSize: 12, fontFamily: font }}>← Atrás</button>
        <span style={{ flex: 1, fontSize: 11, color: C.dim, textAlign: "center" }}>Nº{discurso.numero}</span>
        <button onClick={exportarPDF} disabled={exportando} style={{ background: "none", border: `1px solid ${C.border}`, color: C.gray, padding: "5px 10px", borderRadius: 5, cursor: exportando ? "wait" : "pointer", fontSize: 12, fontFamily: font, opacity: exportando ? 0.5 : 1 }}>
          {exportando ? "Exportando..." : "📄 PDF"}
        </button>
        <button onClick={onModoDiscurso} style={{ background: C.accent, color: C.bg, border: "none", padding: "7px 14px", borderRadius: 6, cursor: "pointer", fontSize: 12, fontWeight: 700, fontFamily: font }}>
          ▶ Modo Discurso
        </button>
      </div>

      <div style={{ maxWidth: 660, margin: "0 auto", padding: "24px 18px 80px" }}>
        <div style={{ textAlign: "center", marginBottom: 32 }}>
          <span style={{ fontSize: 11, fontWeight: 700, color: C.dim, letterSpacing: 2.5 }}>DISCURSO Nº{discurso.numero}</span>
          <h1 style={{ fontSize: 23, fontWeight: 800, color: C.white, margin: "8px 0 6px", lineHeight: 1.3, fontFamily: font }}>{discurso.titulo}</h1>
          <span style={{ fontSize: 12, color: C.dim }}>{discurso.duracion} · {discurso.secciones.length} secciones</span>
          {discurso.tema && (
            <p style={{ fontSize: 13, color: C.gray, margin: "10px 0 0", lineHeight: 1.5, fontStyle: "italic", fontFamily: font }}>
              <span style={{ fontSize: 11, fontWeight: 700, color: C.accent, letterSpacing: 1, fontStyle: "normal" }}>🤟 EN SEÑAS: </span>
              {discurso.tema}
            </p>
          )}
          {discurso.cancion && <div style={{ marginTop: 10 }}><span style={{ background: C.accentDim, color: C.accent, padding: "4px 12px", borderRadius: 6, fontSize: 12, fontWeight: 700, fontFamily: font }}>🎵 Canción {discurso.cancion}</span></div>}
          <div style={{ height: 1, background: `linear-gradient(to right, transparent, ${C.accent}30, transparent)`, margin: "20px 0 0" }} />
        </div>

        {discurso.secciones.reduce((acc, sec) => {
          const num = sec.sinNumero ? null : (acc.counter += 1, acc.counter);
          acc.items.push({ sec, num });
          return acc;
        }, { counter: 0, items: [] }).items.map(({ sec, num }, i) => (
          <div key={i} style={{ marginBottom: 38 }}>
            <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 16 }}>
              {num ? (
                <span style={{ background: C.accent, color: C.bg, width: 28, height: 28, borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center", fontWeight: 800, fontSize: 13, flexShrink: 0, fontFamily: font }}>{num}</span>
              ) : (
                <span style={{
                  width: 28, height: 28, borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center",
                  fontSize: 13, flexShrink: 0,
                  background: `linear-gradient(135deg, ${C.accent}30, ${C.accent}12)`,
                  border: `1.5px solid ${C.accent}50`,
                  boxShadow: `0 0 8px ${C.accent}20`,
                }}>
                  {sec.titulo.toLowerCase().includes("intro") ? "🎤" : "🏁"}
                </span>
              )}
              <h2 style={{ fontSize: 18, fontWeight: 700, color: C.white, margin: 0, flex: 1, fontFamily: font }}>{sec.titulo}</h2>
              <span style={{ background: C.accentDim, color: C.accent, padding: "2px 8px", borderRadius: 10, fontSize: 11, fontWeight: 600, flexShrink: 0 }}>{sec.tiempo}</span>
            </div>
            {sec.lsm && (
              <div style={{ margin: "-8px 0 14px 38px", padding: "6px 12px", background: `linear-gradient(135deg, rgba(78,140,200,0.08), rgba(78,140,200,0.03))`, border: "1px solid rgba(78,140,200,0.15)", borderRadius: 8, display: "inline-flex", alignItems: "center", gap: 8 }}>
                <span style={{ fontSize: 11, fontWeight: 800, color: "rgba(120,170,220,0.9)", letterSpacing: 1, fontFamily: font }}>🤟 LSM</span>
                <span style={{ fontSize: 12, color: "rgba(180,200,220,0.8)", fontStyle: "italic", fontFamily: font }}>{sec.lsm}</span>
              </div>
            )}
            {sec.contenido.map((item, j) => <ContentRenderer key={j} item={item} />)}
            {i < discurso.secciones.length - 1 && <div style={{ height: 1, background: `linear-gradient(to right, transparent, ${C.border}, transparent)`, margin: "30px 0 0" }} />}
          </div>
        ))}
      </div>
    </>
  );
}
