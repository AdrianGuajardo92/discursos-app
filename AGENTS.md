# AGENTS.md

This file provides guidance to Codex (Codex.ai/code) when working with code in this repository.

## Commands

```bash
npm run dev       # Dev server on http://localhost:6001
npm run build     # Production build (outputs to dist/)
npm run preview   # Preview production build locally
```

## Architecture

React 18 SPA + Vite + PWA. No router — state-driven navigation persisted to localStorage. All UI is inline styles using the theme palette. No external CSS or UI libraries.

### Data Flow

```
CATEGORIAS (src/data/categorias.js)
  ├── bosquejos30.js  → discursos de 30 min
  └── congregacion.js → discursos de congregación (5, 8, 15 min)
        ↓
App.jsx (orchestrator: categoriaId, vista, actual, modo)
  ├── Sidebar         → selecciona categoría
  ├── ListaDiscursos  → muestra cards + gestión playlist (.jwlplaylist)
  ├── VistaDiscurso   → detalle con secciones + ContentRenderer
  └── ModoDiscurso    → presentación fullscreen con timers
```

### Key State (all persisted to localStorage)

- `categoriaId` — active category ("bosquejos30" | "congregacion")
- `vista` — "lista" | "ver"
- `actual` — selected discourse object (by numero)
- `modo` — presentation mode boolean

### Discourse Structure

Each discourse has: `numero`, `titulo`, `duracion`, `cancion?`, `secciones[]`. Each section has `titulo`, `tiempo`, `contenido[]` where each item has a `tipo` (punto, pregunta, lectura, referencia, etc.) rendered by `ContentRenderer` via switch.

## Conventions

- **Styling**: Inline React style objects using `C` (colors) and `font` from `src/theme.js`. Palette is black + amber.
- **Navigator.share()**: The share button in `ListaDiscursos` uses a native `onclick` handler (not React onClick) via ref callback to preserve user gesture for the Web Share API. Chrome on Windows blocks `.jwlplaylist`/`application/zip` file sharing — falls back to download.
- **IndexedDB**: `src/db/indexedDB.js` stores `.jwlplaylist` files (large blobs) by discourse `numero`. Functions: `savePlaylist`, `getPlaylist`, `deletePlaylist`, `getAllPlaylistMeta`.
- **Responsive**: Desktop (≥769px) shows fixed sidebar 220px. Mobile (<769px) hides sidebar behind hamburger toggle.
- **ModoDiscurso**: Accepts `duracionTotal` prop for the global timer. Keyboard nav (arrows, Escape). Section timers parsed from `tiempo` field.

## Adding a New Discourse

Edit `src/data/bosquejos30.js` or `src/data/congregacion.js`. Follow the existing object structure. Use `numero` values 100+ for bosquejos, 1-99 for congregación (IndexedDB keyPath is `numero`).

## PWA

Configured via `vite-plugin-pwa` in `vite.config.js`. Service worker auto-updates. Imgur images cached with CacheFirst (30 days, 50 max). Deploy is on Vercel (`discursos-app.vercel.app`).
