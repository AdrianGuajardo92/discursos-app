import { C, font } from "../theme";

export default function Sidebar({ categorias, categoriaActiva, onSelect, isOpen, onClose, isMobile }) {
  const sidebarStyle = {
    width: isMobile ? 260 : 220,
    background: C.card,
    borderRight: `1px solid ${C.border}`,
    height: "100vh",
    position: "fixed",
    top: 0,
    left: 0,
    zIndex: isMobile ? 200 : 100,
    overflowY: "auto",
    transform: isMobile && !isOpen ? "translateX(-100%)" : "translateX(0)",
    transition: "transform 0.2s ease",
  };

  return (
    <>
      {/* Backdrop en mobile */}
      {isMobile && isOpen && (
        <div
          onClick={onClose}
          style={{
            position: "fixed", inset: 0, background: "rgba(0,0,0,0.5)",
            zIndex: 199, backdropFilter: "blur(2px)", WebkitBackdropFilter: "blur(2px)",
          }}
        />
      )}

      <div style={sidebarStyle}>
        <div style={{ padding: "24px 16px 16px" }}>
          <h2 style={{ fontSize: 15, fontWeight: 800, color: C.white, margin: "0 0 4px", fontFamily: font }}>Discursos</h2>
          <p style={{ fontSize: 11, color: C.dim, margin: 0 }}>Selecciona una categoría</p>
        </div>

        <div style={{ padding: "0 8px 24px" }}>
          {categorias.map(cat => {
            const isActive = cat.id === categoriaActiva;
            return (
              <button
                key={cat.id}
                onClick={() => onSelect(cat.id)}
                style={{
                  width: "100%",
                  display: "flex",
                  alignItems: "center",
                  gap: 10,
                  padding: "12px 12px",
                  borderRadius: 8,
                  cursor: "pointer",
                  border: "none",
                  background: isActive ? C.accentDim : "transparent",
                  borderLeft: isActive ? `3px solid ${C.accent}` : "3px solid transparent",
                  marginBottom: 2,
                  transition: "background 0.15s",
                }}
              >
                <span style={{ fontSize: 18 }}>{cat.icono}</span>
                <div style={{ flex: 1, textAlign: "left" }}>
                  <span style={{ fontSize: 13, fontWeight: isActive ? 700 : 500, color: isActive ? C.white : C.gray, fontFamily: font, display: "block" }}>{cat.label}</span>
                  <span style={{ fontSize: 10, color: C.dim }}>{cat.discursos.length} discursos</span>
                </div>
              </button>
            );
          })}
        </div>
      </div>
    </>
  );
}
