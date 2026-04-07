import { useState, useEffect, useRef, useCallback } from "react";
import { C, font } from "../theme";
import ContentRenderer from "./ContentRenderer";

export default function ModoDiscurso({ discurso, onSalir, duracionTotal = 30 }) {
  const [sec, setSec] = useState(() => {
    const saved = localStorage.getItem("discurso_seccion");
    return saved ? Number(saved) : 0;
  });
  const touchRef = useRef({ startX: 0, startY: 0 });
  const scrollRef = useRef(null);
  const total = discurso.secciones.length;

  // Timer cuenta regresiva (global)
  const [timeLeft, setTimeLeft] = useState(duracionTotal * 60);
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
  const timerReset = () => { setTimeLeft(duracionTotal * 60); setTimerRunning(false); setTimerStopped(false); };
  const secTimerToggle = () => { secTimerRunning ? setSecTimerRunning(false) : (secTimeLeft > 0 && setSecTimerRunning(true)); };
  const secTimerReset = () => { setSecTimeLeft(parseTiempo(discurso.secciones[sec]?.tiempo)); setSecTimerRunning(false); };

  const s = discurso.secciones[sec];

  return (
    <div
      style={{ position: "fixed", inset: 0, background: C.bg, zIndex: 1000, display: "flex", flexDirection: "column", fontFamily: font }}
    >
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
      <div style={{ padding: "14px 18px 6px", flexShrink: 0, display: "flex", alignItems: "center", gap: 10 }}>
        {s.sinNumero ? (
          <span style={{
            width: 28, height: 28, borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center",
            fontSize: 13, flexShrink: 0,
            background: `linear-gradient(135deg, ${C.accent}30, ${C.accent}12)`,
            border: `1.5px solid ${C.accent}50`,
            boxShadow: `0 0 8px ${C.accent}20`,
          }}>
            {s.titulo.toLowerCase().includes("intro") ? "🎤" : "🏁"}
          </span>
        ) : (
          <span style={{ background: C.accent, color: C.bg, width: 28, height: 28, borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center", fontWeight: 800, fontSize: 13, flexShrink: 0, fontFamily: font }}>
            {discurso.secciones.slice(0, sec + 1).filter(x => !x.sinNumero).length}
          </span>
        )}
        <h2 style={{ fontSize: 19, fontWeight: 700, color: C.white, margin: 0, lineHeight: 1.35, flex: 1, fontFamily: font }}>{s.titulo}</h2>
      </div>

      {s.lsm && (
        <div style={{ margin: "2px 18px 8px", padding: "6px 12px", background: "linear-gradient(135deg, rgba(78,140,200,0.08), rgba(78,140,200,0.03))", border: "1px solid rgba(78,140,200,0.15)", borderRadius: 8, display: "inline-flex", alignItems: "center", gap: 8 }}>
          <span style={{ fontSize: 11, fontWeight: 800, color: "rgba(120,170,220,0.9)", letterSpacing: 1, fontFamily: font }}>🤟 LSM</span>
          <span style={{ fontSize: 12, color: "rgba(180,200,220,0.8)", fontStyle: "italic", fontFamily: font }}>{s.lsm}</span>
        </div>
      )}

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
            flex: 1, padding: "10px 13px", borderRadius: 8, border: `1px solid ${C.border}`,
            background: sec === 0 ? C.bg : C.card2, color: sec === 0 ? C.dim : C.gray,
            fontSize: 15, fontWeight: 600, fontFamily: font, cursor: sec === 0 ? "default" : "pointer",
            opacity: sec === 0 ? 0.35 : 1, transition: "all 0.2s", textAlign: "center"
          }}
        >
          <div>← Anterior</div>
          {sec > 0 && <div style={{ fontSize: 10, color: C.dim, marginTop: 3, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>{discurso.secciones[sec - 1].titulo}</div>}
        </button>
        <button
          onClick={() => sec === total - 1 ? onSalir() : ir(1)}
          style={{
            flex: 1, padding: "10px 13px", borderRadius: 8, border: "none",
            background: sec === total - 1 ? C.dim : C.accent,
            color: sec === total - 1 ? C.white : C.bg,
            fontSize: 15, fontWeight: 700, fontFamily: font, cursor: "pointer", transition: "all 0.2s", textAlign: "center"
          }}
        >
          <div>{sec === total - 1 ? "Finalizar ✓" : "Siguiente →"}</div>
          {sec < total - 1 && <div style={{ fontSize: 10, opacity: 0.7, marginTop: 3, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>{discurso.secciones[sec + 1].titulo}</div>}
        </button>
      </div>
    </div>
  );
}
