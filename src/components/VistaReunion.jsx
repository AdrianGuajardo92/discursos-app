import { useState } from "react";
import { C as fallbackC, font } from "../theme";
import ContentRenderer from "./ContentRenderer";
import ThemeToggle from "./ThemeToggle";
import VistaBosquejo from "./VistaBosquejo";

const fechaHoyMX = () => {
  try {
    return new Intl.DateTimeFormat("en-CA", {
      timeZone: "America/Mexico_City",
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
    }).format(new Date());
  } catch {
    return new Date().toISOString().slice(0, 10);
  }
};

function InfoCard({ label, value, detail, themeColors }) {
  const C = themeColors || fallbackC;
  return (
    <div style={{ background: C.card2, border: `1px solid ${C.border}`, borderRadius: 8, padding: "14px 15px" }}>
      <p style={{ margin: "0 0 5px", color: C.dim, fontSize: 10, fontWeight: 900, letterSpacing: 1.4, fontFamily: font }}>{label}</p>
      <p style={{ margin: 0, color: C.white, fontSize: 16, lineHeight: 1.35, fontWeight: 800, fontFamily: font }}>{value}</p>
      {detail && <p style={{ margin: "5px 0 0", color: C.gray, fontSize: 12, lineHeight: 1.4, fontFamily: font }}>{detail}</p>}
    </div>
  );
}

export default function VistaReunion({ reunion, onVolver, onModoDiscurso, theme, onThemeChange, themeColors }) {
  const C = themeColors || fallbackC;
  const [bosquejoAbierto, setBosquejoAbierto] = useState(null);
  const esHoy = reunion.fecha === fechaHoyMX();
  const canciones = reunion.canciones
    ? [reunion.canciones.inicial, reunion.canciones.intermedia, reunion.canciones.final].filter(Boolean).join(", ")
    : "";

  if (bosquejoAbierto) {
    return (
      <VistaBosquejo
        discurso={bosquejoAbierto}
        onVolver={() => setBosquejoAbierto(null)}
        theme={theme}
        onThemeChange={onThemeChange}
        themeColors={C}
        topLabel={bosquejoAbierto.tipo === "perlas" ? "Perlas escondidas" : "Bosquejo de respaldo"}
      />
    );
  }

  return (
    <>
      <div style={{ background: C.card, borderBottom: `1px solid ${C.border}`, padding: "8px 14px", position: "sticky", top: 0, zIndex: 50, display: "flex", alignItems: "center", gap: 8 }}>
        <button onClick={onVolver} style={{ background: "none", border: `1px solid ${C.border}`, color: C.gray, padding: "5px 10px", borderRadius: 5, cursor: "pointer", fontSize: 12, fontFamily: font }}>← Atrás</button>
        <span style={{ flex: 1, fontSize: 11, color: C.dim, textAlign: "center" }}>Programa de reunión</span>
        <ThemeToggle theme={theme} onChange={onThemeChange} themeColors={C} compact />
        <button onClick={onModoDiscurso} style={{ background: C.accent, color: C.onAccent, border: "none", padding: "7px 14px", borderRadius: 6, cursor: "pointer", fontSize: 12, fontWeight: 700, fontFamily: font }}>
          ▶ Modo guía
        </button>
      </div>

      <div style={{ maxWidth: 760, margin: "0 auto", padding: "24px 18px 80px" }}>
        <div style={{ textAlign: "center", marginBottom: 24 }}>
          {esHoy && (
            <span style={{ display: "inline-flex", marginBottom: 9, background: C.accent, color: C.onAccent, borderRadius: 999, padding: "4px 11px", fontSize: 11, fontWeight: 900, letterSpacing: 1.2, fontFamily: font }}>
              HOY
            </span>
          )}
          <span style={{ display: "block", fontSize: 11, fontWeight: 800, color: C.dim, letterSpacing: 2.2, fontFamily: font }}>{reunion.fechaLabel}</span>
          <h1 style={{ fontSize: 24, fontWeight: 900, color: C.white, margin: "8px 0 6px", lineHeight: 1.25, fontFamily: font }}>{reunion.titulo}</h1>
          <p style={{ fontSize: 13, color: C.gray, margin: 0, lineHeight: 1.45, fontFamily: font }}>
            {reunion.semana} · {reunion.lectura} · {reunion.totalAsignaciones} asignaciones
          </p>
          <div style={{ height: 1, background: `linear-gradient(to right, transparent, ${C.accent}30, transparent)`, margin: "20px 0 0" }} />
        </div>

        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(170px, 1fr))", gap: 10, marginBottom: 26 }}>
          <InfoCard label="PRESIDENTE" value={reunion.presidente} detail="Introducción, transiciones y conclusión" themeColors={C} />
          <InfoCard label="ORACIÓN FINAL" value={reunion.oracion} themeColors={C} />
          <InfoCard label="CANCIONES" value={canciones} themeColors={C} />
        </div>

        {reunion.secciones.map((sec, i) => (
          <div key={sec.titulo} style={{ marginBottom: 32 }}>
            <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 13 }}>
              <span style={{ background: sec.sinNumero ? C.card2 : C.accent, color: sec.sinNumero ? C.accent : C.onAccent, width: 30, height: 30, borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center", fontWeight: 900, fontSize: 13, flexShrink: 0, fontFamily: font, border: sec.sinNumero ? `1px solid ${C.accentBorder}` : "none" }}>
                {sec.sinNumero ? "•" : i}
              </span>
              <h2 style={{ fontSize: 18, fontWeight: 800, color: C.white, margin: 0, flex: 1, fontFamily: font }}>{sec.titulo}</h2>
              <span style={{ background: C.accentDim, color: C.accent, padding: "2px 8px", borderRadius: 10, fontSize: 11, fontWeight: 700, flexShrink: 0, fontFamily: font }}>{sec.tiempo}</span>
            </div>
            {sec.contenido.map((item, j) => (
              <ContentRenderer
                key={j}
                item={item}
                reunion={reunion}
                seccion={sec}
                themeColors={C}
                onAbrirDiscurso={setBosquejoAbierto}
              />
            ))}
            {i < reunion.secciones.length - 1 && <div style={{ height: 1, background: `linear-gradient(to right, transparent, ${C.border}, transparent)`, margin: "26px 0 0" }} />}
          </div>
        ))}
      </div>
    </>
  );
}
