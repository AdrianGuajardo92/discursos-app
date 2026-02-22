# 📖 Mis Discursos

Aplicación para gestionar y presentar discursos. Incluye un **Modo Discurso** que permite navegar sección por sección en tablet.

## Editar discursos con Claude Code

Los discursos están en `src/App.jsx` dentro del array `DISCURSOS` al inicio del archivo.

```
claude "Agrega el discurso #155 sobre [tema] al archivo src/App.jsx"
claude "En el discurso #100, cambia la sección 2 del archivo src/App.jsx"
```

## Desarrollo local

```bash
npm install
npm run dev
```

## Deploy

El deploy a GitHub Pages es automático al hacer push a `main`.
