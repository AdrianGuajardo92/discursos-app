import VistaReunion from "./VistaReunion";
import VistaBosquejo from "./VistaBosquejo";

export default function VistaDiscurso({ discurso, onVolver, onModoDiscurso, theme, onThemeChange, themeColors }) {
  if (discurso.tipo === "reunion") {
    return (
      <VistaReunion
        reunion={discurso}
        onVolver={onVolver}
        onModoDiscurso={onModoDiscurso}
        theme={theme}
        onThemeChange={onThemeChange}
        themeColors={themeColors}
      />
    );
  }

  return (
    <VistaBosquejo
      discurso={discurso}
      onVolver={onVolver}
      onModoDiscurso={onModoDiscurso}
      theme={theme}
      onThemeChange={onThemeChange}
      themeColors={themeColors}
    />
  );
}
