import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { VitePWA } from 'vite-plugin-pwa'

export default defineConfig({
  plugins: [
    react(),
    VitePWA({
      registerType: 'autoUpdate',
      manifest: {
        name: 'Bosquejos 30 min.',
        short_name: 'Bosquejos',
        description: 'Bosquejos de discursos de 30 minutos',
        theme_color: '#111110',
        background_color: '#111110',
        display: 'standalone',
        orientation: 'portrait',
        scope: '/',
        start_url: '/',
        icons: [
          {
            src: 'icon-192x192.png',
            sizes: '192x192',
            type: 'image/png'
          },
          {
            src: 'icon-512x512.png',
            sizes: '512x512',
            type: 'image/png'
          },
          {
            src: 'icon-512x512.png',
            sizes: '512x512',
            type: 'image/png',
            purpose: 'maskable'
          }
        ]
      },
      workbox: {
        globPatterns: ['**/*.{js,css,html,svg,png,ico,woff2}'],
        runtimeCaching: [{
          urlPattern: /^https:\/\/i\.imgur\.com\/.*/i,
          handler: 'CacheFirst',
          options: {
            cacheName: 'imgur-images',
            expiration: { maxEntries: 50, maxAgeSeconds: 60 * 60 * 24 * 30 }
          }
        }]
      }
    })
  ],
  base: '/',
  server: {
    port: 6001
  }
})
