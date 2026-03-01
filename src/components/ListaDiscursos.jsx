import { useState, useEffect, useRef } from "react";
import { C, font } from "../theme";
import { savePlaylist, getPlaylist, deletePlaylist, getAllPlaylistMeta } from "../db/indexedDB";
import { downloadBlob, fmtFileSize } from "../utils/download";
import ModalConfirm from "./ModalConfirm";

export default function ListaDiscursos({ discursos, categoriaLabel, categoriaIcono, onSelectDiscurso, onMenuToggle }) {
  const [playlistMap, setPlaylistMap] = useState({});
  const [playlistLoading, setPlaylistLoading] = useState(null);
  const [deleteConfirm, setDeleteConfirm] = useState(null);
  const fileInputRef = useRef(null);
  const uploadTargetRef = useRef(null);
  const fileCacheRef = useRef({});

  // Cargar metadatos de playlists al inicio
  useEffect(() => {
    getAllPlaylistMeta().then(setPlaylistMap).catch(() => {});
  }, []);

  // Adjunta onclick NATIVO directo al botón para preservar user gesture (navigator.share).
  // Cada botón recibe su propio ref callback con el numero correcto.
  const attachShareHandler = (btnEl, numero) => {
    if (!btnEl) return;
    btnEl.onclick = function (e) {
      e.stopPropagation();
      e.preventDefault();
      const cachedFile = fileCacheRef.current[numero];

      if (cachedFile && navigator.share) {
        navigator.share({ title: cachedFile.name, files: [cachedFile] }).catch(err => {
          if (err.name !== "AbortError") downloadBlob(cachedFile, cachedFile.name);
        });
      } else if (cachedFile) {
        downloadBlob(cachedFile, cachedFile.name);
      } else {
        (async () => {
          try {
            const record = await getPlaylist(numero);
            if (!record) return;
            const file = new File([record.data], record.name, { type: "application/zip" });
            fileCacheRef.current[numero] = file;
            if (navigator.share) {
              try { await navigator.share({ title: file.name, files: [file] }); return; }
              catch (e) { if (e.name === "AbortError") return; }
            }
            downloadBlob(file, file.name);
          } catch (err) { console.error(err); }
        })();
      }
    };
  };

  const triggerUpload = (numero) => {
    uploadTargetRef.current = numero;
    fileInputRef.current?.click();
  };

  const handlePlaylistUpload = async (e) => {
    const file = e.target.files?.[0];
    const numero = uploadTargetRef.current;
    if (!file || !numero) return;
    setPlaylistLoading(numero);
    try {
      const record = await savePlaylist(numero, file);
      setPlaylistMap(prev => ({ ...prev, [numero]: { name: record.name, size: record.size, date: record.date } }));
      fileCacheRef.current[numero] = new File([file], file.name, { type: "application/zip" });
    } catch (err) {
      alert("Error al guardar: " + err.message);
    }
    setPlaylistLoading(null);
    if (fileInputRef.current) fileInputRef.current.value = "";
  };

  const handlePlaylistDownload = async (numero) => {
    try {
      const cachedFile = fileCacheRef.current[numero];
      if (cachedFile) { downloadBlob(cachedFile, cachedFile.name); return; }
      const record = await getPlaylist(numero);
      if (!record) return;
      const file = new File([record.data], record.name, { type: "application/zip" });
      fileCacheRef.current[numero] = file;
      downloadBlob(file, record.name);
    } catch (err) {
      alert("Error: " + err.message);
    }
  };

  const handlePlaylistDelete = (numero) => setDeleteConfirm(numero);

  const confirmPlaylistDelete = async () => {
    const numero = deleteConfirm;
    setDeleteConfirm(null);
    try {
      await deletePlaylist(numero);
      delete fileCacheRef.current[numero];
      setPlaylistMap(prev => {
        const next = { ...prev };
        delete next[numero];
        return next;
      });
    } catch (err) {
      alert("Error: " + err.message);
    }
  };

  return (
    <>
      <div style={{ background: C.card, borderBottom: `1px solid ${C.border}`, padding: "22px 18px", position: "sticky", top: 0, zIndex: 50 }}>
        <div style={{ maxWidth: 720, margin: "0 auto", display: "flex", alignItems: "center", gap: 12 }}>
          {onMenuToggle && (
            <button onClick={onMenuToggle} style={{ background: "none", border: "none", color: C.gray, fontSize: 20, cursor: "pointer", padding: "4px 8px", lineHeight: 1 }}>☰</button>
          )}
          <div style={{ width: 36, height: 36, borderRadius: 7, background: C.accentBorder, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 18 }}>{categoriaIcono}</div>
          <div>
            <h1 style={{ fontSize: 18, fontWeight: 800, color: C.white, margin: 0, fontFamily: font }}>{categoriaLabel}</h1>
            <p style={{ fontSize: 11, color: C.dim, margin: 0 }}>{discursos.length} guardados</p>
          </div>
        </div>
      </div>

      <div style={{ maxWidth: 720, margin: "0 auto", padding: "18px 14px" }}>
        {discursos.length === 0 && (
          <div style={{ textAlign: "center", padding: "60px 20px", color: C.dim }}>
            <p style={{ fontSize: 14, fontFamily: font }}>No hay discursos en esta categoría todavía.</p>
          </div>
        )}

        {discursos.map(d => (
          <div key={d.numero} style={{ background: C.card, borderRadius: 10, marginBottom: 10, border: `1px solid ${C.border}`, display: "flex", alignItems: "stretch", overflow: "hidden" }}>
            <div
              onClick={() => onSelectDiscurso(d)}
              style={{ flex: 1, padding: "16px 18px", cursor: "pointer", display: "flex", alignItems: "center", gap: 14, minWidth: 0 }}
            >
              <div style={{ width: 46, height: 46, borderRadius: 8, flexShrink: 0, background: C.accentDim, border: `1px solid ${C.accentBorder}`, display: "flex", alignItems: "center", justifyContent: "center" }}>
                <span style={{ fontSize: 20, fontWeight: 800, color: C.accent }}>{d.numero}</span>
              </div>
              <div style={{ flex: 1, minWidth: 0 }}>
                <h3 style={{ fontSize: 15, fontWeight: 700, color: C.white, margin: "0 0 3px", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap", fontFamily: font }}>{d.titulo}</h3>
                <span style={{ fontSize: 11, color: C.dim }}>{d.secciones.length} secciones · {d.duracion}{d.cancion ? ` · 🎵 Canción ${d.cancion}` : ""}</span>
              </div>
              <span style={{ color: C.dim, fontSize: 16, flexShrink: 0 }}>›</span>
            </div>

            <div style={{ flexShrink: 0, borderLeft: `1px solid ${C.border}`, display: "flex", alignItems: "center", padding: "8px 10px", gap: 10 }}>
              {playlistMap[d.numero] ? (
                <>
                  <div style={{ flexShrink: 0, display: "flex", flexDirection: "column", alignItems: "center", gap: 3 }}>
                    <svg width="30" height="36" viewBox="0 0 30 36" fill="none">
                      <rect x="1" y="1" width="28" height="34" rx="3" fill="rgba(200,162,78,0.08)" stroke="rgba(200,162,78,0.25)" strokeWidth="1"/>
                      <path d="M18 1v7a2 2 0 002 2h7" stroke="rgba(200,162,78,0.25)" strokeWidth="1" fill="none"/>
                      <line x1="7" y1="16" x2="23" y2="16" stroke="rgba(200,162,78,0.2)" strokeWidth="1"/>
                      <line x1="7" y1="20" x2="20" y2="20" stroke="rgba(200,162,78,0.15)" strokeWidth="1"/>
                      <line x1="7" y1="24" x2="17" y2="24" stroke="rgba(200,162,78,0.1)" strokeWidth="1"/>
                    </svg>
                    <span style={{ fontSize: 8, color: C.dim, fontFamily: font }}>{fmtFileSize(playlistMap[d.numero].size)}</span>
                  </div>
                  <div style={{ display: "flex", flexDirection: "column", gap: 3 }}>
                    <button
                      ref={(el) => attachShareHandler(el, d.numero)}
                      style={{ background: "rgba(200,162,78,0.06)", border: `1px solid rgba(200,162,78,0.12)`, borderRadius: 6, padding: "5px 12px 5px 8px", cursor: "pointer", display: "flex", alignItems: "center", gap: 6, width: "100%" }}
                    >
                      <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="#c8a24e" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"><path d="M4 12v8a2 2 0 002 2h12a2 2 0 002-2v-8"/><polyline points="16 6 12 2 8 6"/><line x1="12" y1="2" x2="12" y2="15"/></svg>
                      <span style={{ fontSize: 10, color: C.gray, fontWeight: 600, fontFamily: font, letterSpacing: 0.3 }}>Compartir</span>
                    </button>
                    {[
                      { label: "Descargar", action: handlePlaylistDownload, icon: <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="#c8a24e" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 15v4a2 2 0 01-2 2H5a2 2 0 01-2-2v-4"/><polyline points="7 10 12 15 17 10"/><line x1="12" y1="15" x2="12" y2="3"/></svg> },
                      { label: "Eliminar", action: handlePlaylistDelete, icon: <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="#c8a24e" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"><polyline points="3 6 5 6 21 6"/><path d="M19 6v14a2 2 0 01-2 2H7a2 2 0 01-2-2V6m3 0V4a2 2 0 012-2h4a2 2 0 012 2v2"/></svg> },
                    ].map((btn) => (
                      <button
                        key={btn.label}
                        onClick={(e) => { e.stopPropagation(); btn.action(d.numero); }}
                        style={{ background: "rgba(200,162,78,0.06)", border: `1px solid rgba(200,162,78,0.12)`, borderRadius: 6, padding: "5px 12px 5px 8px", cursor: "pointer", display: "flex", alignItems: "center", gap: 6, width: "100%" }}
                      >
                        {btn.icon}
                        <span style={{ fontSize: 10, color: C.gray, fontWeight: 600, fontFamily: font, letterSpacing: 0.3 }}>{btn.label}</span>
                      </button>
                    ))}
                  </div>
                </>
              ) : (
                <button
                  onClick={(e) => { e.stopPropagation(); triggerUpload(d.numero); }}
                  disabled={playlistLoading === d.numero}
                  style={{ background: "none", border: `1.5px dashed ${C.accentBorder}`, borderRadius: 8, padding: "12px 16px", cursor: playlistLoading === d.numero ? "wait" : "pointer", display: "flex", flexDirection: "column", alignItems: "center", gap: 4 }}
                >
                  <svg width="22" height="26" viewBox="0 0 30 36" fill="none" opacity="0.5">
                    <rect x="1" y="1" width="28" height="34" rx="3" stroke="rgba(200,162,78,0.4)" strokeWidth="1.5" strokeDasharray="4 3" fill="none"/>
                    <line x1="15" y1="12" x2="15" y2="24" stroke="rgba(200,162,78,0.4)" strokeWidth="1.5"/>
                    <line x1="9" y1="18" x2="21" y2="18" stroke="rgba(200,162,78,0.4)" strokeWidth="1.5"/>
                  </svg>
                  <span style={{ fontSize: 10, color: C.accent, fontWeight: 700, fontFamily: font }}>{playlistLoading === d.numero ? "Guardando..." : "Adjuntar"}</span>
                </button>
              )}
            </div>
          </div>
        ))}

        <input
          ref={fileInputRef}
          type="file"
          accept=".jwlplaylist"
          onChange={handlePlaylistUpload}
          style={{ display: "none" }}
        />
      </div>

      <ModalConfirm
        visible={deleteConfirm !== null}
        titulo="Eliminar archivo"
        mensaje={playlistMap[deleteConfirm]
          ? <>Se eliminará <strong style={{ color: C.white }}>{playlistMap[deleteConfirm].name}</strong> de este discurso.</>
          : "Se eliminará el archivo de este discurso."}
        onConfirmar={confirmPlaylistDelete}
        onCancelar={() => setDeleteConfirm(null)}
      />
    </>
  );
}
