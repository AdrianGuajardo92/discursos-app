import { C as fallbackC, font } from "../theme";

export default function ThemeToggle({ theme, onChange, themeColors, compact = false }) {
  const C = themeColors || fallbackC;
  const options = [
    { id: "light", label: compact ? "☀" : "Claro", title: "Modo claro" },
    { id: "dark", label: compact ? "☾" : "Oscuro", title: "Modo oscuro" },
  ];

  return (
    <div
      aria-label="Cambiar tema"
      style={{
        display: "inline-flex",
        alignItems: "center",
        flexShrink: 0,
        padding: 2,
        borderRadius: 8,
        background: C.card2,
        border: `1px solid ${C.border}`,
        gap: 2,
      }}
    >
      {options.map(option => {
        const active = theme === option.id;
        return (
          <button
            key={option.id}
            type="button"
            title={option.title}
            aria-pressed={active}
            onClick={() => onChange?.(option.id)}
            style={{
              minWidth: compact ? 28 : 62,
              height: compact ? 26 : 28,
              border: "none",
              borderRadius: 6,
              background: active ? C.accent : "transparent",
              color: active ? C.onAccent : C.gray,
              cursor: "pointer",
              fontFamily: font,
              fontSize: compact ? 13 : 11,
              fontWeight: active ? 800 : 700,
              lineHeight: 1,
              padding: compact ? "0 7px" : "0 10px",
              transition: "background 0.15s, color 0.15s",
            }}
          >
            {option.label}
          </button>
        );
      })}
    </div>
  );
}
