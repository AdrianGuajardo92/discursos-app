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
  ├── reunionesMayo2026.js → programas de reunión entre semana + presidencia
  ├── bosquejos30.js  → discursos de 30 min
  └── congregacion.js → discursos de congregación (5, 8, 15 min)
        ↓
App.jsx (orchestrator: categoriaId, vista, actual, modo)
  ├── Sidebar         → selecciona categoría
  ├── ListaDiscursos  → muestra cards + gestión playlist (.jwlplaylist)
  ├── VistaDiscurso   → detalle con secciones + ContentRenderer
  ├── VistaReunion    → detalle del programa + asignaciones de reunión
  └── ModoDiscurso    → presentación fullscreen con timers
```

### Key State (all persisted to localStorage)

- `categoriaId` — active category ("reuniones" | "bosquejos30" | "congregacion")
- `vista` — "lista" | "ver"
- `actual` — selected discourse object (by numero)
- `modo` — presentation mode boolean

### Discourse Structure

Each discourse has: `numero`, `titulo`, `duracion`, `cancion?`, `secciones[]`. Each section has `titulo`, `tiempo`, `contenido[]` where each item has a `tipo` (punto, pregunta, lectura, referencia, etc.) rendered by `ContentRenderer` via switch.

### Meeting / Presidency Structure

Meeting programs use `tipo: "reunion"` and live in files such as `src/data/reunionesMayo2026.js`. They keep the same `secciones[]` shape so `ContentRenderer` can render reusable content items, but meeting cards also use fields like `fecha`, `fechaLabel`, `semana`, `lectura`, `presidente`, `oracion`, `canciones`, and `totalAsignaciones`.

Common meeting item types:

- `asignacion` — numbered program item with `encargado`, optional `ayudante`, optional `contexto`, and optional `preparacion`.
- `palabras_conclusion` — suggested closing words for the president.
- `tarjeta_asignaciones` — visual card for next week's assignments.
- `cancion` / `oracion` — compact meeting elements.

When adding preparation notes for an assignment, prefer the `preparacion` shape:

```js
preparacion: {
  referencia: "lmd lección 4 punto 3",
  punto: "No dé la impresión de sentirse superior.",
  idea: "Short practical explanation of what the participant worked on."
}
```

Do not add a separate "para decirlo" block. The user prefers only `PUNTO EXACTO` and `IDEA`, with the idea expanded enough to help him review what the participant worked on.

## Conventions

- **Styling**: Inline React style objects using `C` (colors) and `font` from `src/theme.js`. Palette is black + amber.
- **Navigator.share()**: The share button in `ListaDiscursos` uses a native `onclick` handler (not React onClick) via ref callback to preserve user gesture for the Web Share API. Chrome on Windows blocks `.jwlplaylist`/`application/zip` file sharing — falls back to download.
- **IndexedDB**: `src/db/indexedDB.js` stores `.jwlplaylist` files (large blobs) by discourse `numero`. Functions: `savePlaylist`, `getPlaylist`, `deletePlaylist`, `getAllPlaylistMeta`.
- **Responsive**: Desktop (≥769px) shows fixed sidebar 220px. Mobile (<769px) hides sidebar behind hamburger toggle.
- **ModoDiscurso**: Accepts `duracionTotal` prop for the global timer. Keyboard nav (arrows, Escape). Section timers parsed from `tiempo` field.

## Presidency Prep Format

Use this format only when the user explicitly says he will preside (`me toca presidir`) or asks to prepare the meeting for his own presidency. A monthly meeting assignment PDF by itself is only a data source; it should not trigger this special presidency format unless the user connects it to his turn presiding.

Do not apply this format to every meeting, to normal program imports, or to meetings where another brother presides unless the user specifically asks for the same prep style.

Ask for or extract these inputs:

- The meeting program for the current week.
- Who presides, final prayer, songs, weekly Bible reading, and each assignment.
- The exact teaching points being worked on (`lmd`, `th`, `lff`, etc.) when the user provides JW Library screenshots or references.
- Next week's assignment list for the closing announcement card.

For the current meeting view:

- Show the meeting as a `tipo: "reunion"` entry in `src/data/reunionesMayo2026.js` or the relevant month file.
- Mark today's meeting naturally via the date logic already in `ListaDiscursos` / `VistaReunion`.
- In `Seamos mejores maestros` and similar assignments, keep the assignment cards collapsed by default.
- Each collapsible assignment note should show only `PUNTO EXACTO` and `IDEA`.
- The `IDEA` should be written as a practical after-the-assignment observation, explaining what the participant worked on. Do not write it as "veremos ahora..." or an introduction before the demonstration.

For `PALABRAS DE CONCLUSIÓN SUGERIDAS`:

- Mention only what the user asks to review. In the established format, mention the 10-minute Tesoros talk and the relevant Nuestra Vida Cristiana / Estudio Bíblico material.
- Add a `PALABRAS Y ORACIONES CLAVE PARA REPASAR` section covering all the material mentioned in the conclusion, not only the LFB / book-study material.
- Key phrases should be short, memorable, and useful for rehearsal. Prefer several compact bullets grouped by meeting part.
- Avoid long paragraphs inside the key-phrase area.

For the next-week assignment card:

- Use `tarjeta_asignaciones`.
- Include the title `Asignaciones de la próxima semana`, week/date range, and Bible reading.
- Make the presiding brother visually prominent in the header.
- Do not include separate boxes for main/final prayer or songs unless the user explicitly asks.
- Group assignments by `Tesoros de la Biblia`, `Seamos mejores maestros`, and `Nuestra vida cristiana`.
- Show each assignment number, title, assigned brother/sister, optional helper, and time.
- Do not include a "Descargar imagen" button unless the user asks for export/download.

## Adding a New Discourse

Edit `src/data/bosquejos30.js` or `src/data/congregacion.js`. Follow the existing object structure. Use `numero` values 100+ for bosquejos, 1-99 for congregación (IndexedDB keyPath is `numero`).

## PWA

Configured via `vite-plugin-pwa` in `vite.config.js`. Service worker auto-updates. Imgur images cached with CacheFirst (30 days, 50 max). Deploy is on Vercel (`discursos-app.vercel.app`).
