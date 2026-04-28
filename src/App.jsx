import { useState, useEffect, useCallback } from "react";
import { getTheme, font } from "./theme";
import { CATEGORIAS } from "./data/categorias";
import Sidebar from "./components/Sidebar";
import ListaDiscursos from "./components/ListaDiscursos";
import VistaDiscurso from "./components/VistaDiscurso";
import ModoDiscurso from "./components/ModoDiscurso";

const getDiscursosOcultos = () => {
  try { return JSON.parse(localStorage.getItem("discursos_ocultos") || "[]"); }
  catch { return []; }
};

const THEME_STORAGE_KEY = "discurso_tema";

const getTemaGuardado = () => {
  return localStorage.getItem(THEME_STORAGE_KEY) === "light" ? "light" : "dark";
};

export default function App() {
  const [categoriaId, setCategoriaId] = useState(() => {
    return localStorage.getItem("discurso_categoria") || "bosquejos30";
  });
  const [discursosOcultos, setDiscursosOcultos] = useState(getDiscursosOcultos);
  const [vista, setVista] = useState(() => {
    return localStorage.getItem("discurso_vista") || "lista";
  });
  const [actual, setActual] = useState(() => {
    const savedNum = localStorage.getItem("discurso_actual");
    if (!savedNum) return null;
    const cat = CATEGORIAS.find(c => c.id === (localStorage.getItem("discurso_categoria") || "bosquejos30"));
    return cat?.discursos.find(d => d.numero === Number(savedNum)) || null;
  });
  const [modo, setModo] = useState(() => localStorage.getItem("discurso_modo") === "true");
  const [tema, setTema] = useState(getTemaGuardado);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(window.innerWidth < 769);
  const C = getTheme(tema);

  useEffect(() => {
    const handler = () => setIsMobile(window.innerWidth < 769);
    window.addEventListener("resize", handler);
    return () => window.removeEventListener("resize", handler);
  }, []);

  useEffect(() => {
    localStorage.setItem("discurso_categoria", categoriaId);
    localStorage.setItem("discurso_vista", vista);
    localStorage.setItem("discurso_actual", actual ? actual.numero : "");
    localStorage.setItem("discurso_modo", modo);
  }, [categoriaId, vista, actual, modo]);

  useEffect(() => {
    localStorage.setItem(THEME_STORAGE_KEY, tema);
    document.documentElement.style.colorScheme = tema;
    document.body.style.background = C.bg;
  }, [tema, C.bg]);

  const categoriaActiva = CATEGORIAS.find(c => c.id === categoriaId) || CATEGORIAS[0];

  const discursosFiltrados = categoriaActiva.discursos.filter(
    d => !discursosOcultos.some(o => o.categoriaId === categoriaId && o.numero === d.numero)
  );

  const categoriasSidebar = CATEGORIAS.map(cat => ({
    ...cat,
    discursos: cat.discursos.filter(
      d => !discursosOcultos.some(o => o.categoriaId === cat.id && o.numero === d.numero)
    )
  }));

  const handleDeleteDiscurso = (numero) => {
    const updated = [...discursosOcultos, { categoriaId, numero }];
    setDiscursosOcultos(updated);
    localStorage.setItem("discursos_ocultos", JSON.stringify(updated));
    if (actual && actual.numero === numero) {
      setVista("lista");
      setActual(null);
    }
  };

  const handleCategoriaChange = (id) => {
    setCategoriaId(id);
    setVista("lista");
    setActual(null);
    setModo(false);
    setSidebarOpen(false);
  };

  const handleSelectDiscurso = (d) => {
    setActual(d);
    setVista("ver");
  };

  const duracionTotal = categoriaActiva.duracionDefault
    || (actual ? parseInt(actual.duracion) : 30)
    || 30;

  const handleSalirModo = useCallback(() => {
    setModo(false);
    localStorage.removeItem("discurso_seccion");
  }, []);

  const handleThemeChange = useCallback((nextTema) => {
    const safeTema = nextTema === "light" ? "light" : "dark";
    localStorage.setItem(THEME_STORAGE_KEY, safeTema);
    setTema(safeTema);
  }, []);

  return (
    <div style={{ minHeight: "100vh", background: C.bg, fontFamily: font }}>
      {modo && actual && (
        <ModoDiscurso
          discurso={actual}
          duracionTotal={duracionTotal}
          onSalir={handleSalirModo}
          theme={tema}
          onThemeChange={handleThemeChange}
          themeColors={C}
        />
      )}

      <Sidebar
        categorias={categoriasSidebar}
        categoriaActiva={categoriaId}
        onSelect={handleCategoriaChange}
        isOpen={sidebarOpen}
        onClose={() => setSidebarOpen(false)}
        isMobile={isMobile}
        themeColors={C}
      />

      <div style={{ marginLeft: isMobile ? 0 : 220 }}>
        {vista === "lista" && (
          <ListaDiscursos
            discursos={discursosFiltrados}
            categoriaLabel={categoriaActiva.label}
            categoriaIcono={categoriaActiva.icono}
            onSelectDiscurso={handleSelectDiscurso}
            onDeleteDiscurso={handleDeleteDiscurso}
            onMenuToggle={isMobile ? () => setSidebarOpen(true) : null}
            theme={tema}
            onThemeChange={handleThemeChange}
            themeColors={C}
          />
        )}

        {vista === "ver" && actual && !modo && (
          <VistaDiscurso
            discurso={actual}
            onVolver={() => { setVista("lista"); setActual(null); }}
            onModoDiscurso={() => setModo(true)}
            theme={tema}
            onThemeChange={handleThemeChange}
            themeColors={C}
          />
        )}
      </div>
    </div>
  );
}
