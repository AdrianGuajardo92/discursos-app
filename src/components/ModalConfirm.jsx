import { C, font } from "../theme";

export default function ModalConfirm({ visible, titulo, mensaje, onConfirmar, onCancelar, textoConfirmar = "Eliminar", colorConfirmar = "#e05050" }) {
  if (!visible) return null;

  return (
    <div onClick={onCancelar} style={{
      position: "fixed", inset: 0, background: "rgba(0,0,0,0.65)", zIndex: 9999,
      display: "flex", alignItems: "center", justifyContent: "center", padding: 24,
      backdropFilter: "blur(4px)", WebkitBackdropFilter: "blur(4px)",
    }}>
      <div onClick={e => e.stopPropagation()} style={{
        background: C.card, border: `1px solid ${C.border}`, borderRadius: 14,
        padding: "28px 24px 20px", maxWidth: 320, width: "100%",
        display: "flex", flexDirection: "column", alignItems: "center", gap: 16,
      }}>
        <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke={colorConfirmar} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
          <circle cx="12" cy="12" r="10" fill={`${colorConfirmar}14`} />
          <line x1="12" y1="8" x2="12" y2="13" />
          <circle cx="12" cy="16" r="0.5" fill={colorConfirmar} />
        </svg>
        <div style={{ textAlign: "center" }}>
          <p style={{ fontSize: 15, fontWeight: 700, color: C.white, fontFamily: font, margin: "0 0 6px" }}>
            {titulo}
          </p>
          <p style={{ fontSize: 13, color: C.gray, fontFamily: font, margin: 0, lineHeight: 1.5 }}>
            {mensaje}
          </p>
        </div>
        <div style={{ display: "flex", gap: 10, width: "100%", marginTop: 4 }}>
          <button onClick={onCancelar} style={{
            flex: 1, padding: "10px 0", borderRadius: 8, cursor: "pointer", fontSize: 13, fontWeight: 600, fontFamily: font,
            background: "none", border: `1px solid ${C.border}`, color: C.gray,
          }}>Cancelar</button>
          <button onClick={onConfirmar} style={{
            flex: 1, padding: "10px 0", borderRadius: 8, cursor: "pointer", fontSize: 13, fontWeight: 600, fontFamily: font,
            background: `${colorConfirmar}1f`, border: `1px solid ${colorConfirmar}40`, color: colorConfirmar,
          }}>{textoConfirmar}</button>
        </div>
      </div>
    </div>
  );
}
