import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { VitePWA } from 'vite-plugin-pwa'
import svgr from 'vite-plugin-svgr'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react(),
    svgr(),
    VitePWA({
      manifest: {
        name: 'Transfo Zwevegem',
        short_name: 'Transfo',
        description:
          'PWA voor het energie-educatie parcour van Transfo Zwevegem',
        display: 'fullscreen',
        orientation: 'landscape',
        theme_color: '#ffffff',
        icons: [
          {
            src: '/src/assets/android-chrome-192x192.png',
            sizes: '192x192',
            type: 'image/png',
          },
          {
            src: '/src/assets/android-chrome-512x512.png',
            sizes: '512x512',
            type: 'image/png',
          },
          {
            src: '/src/assets/android-chrome-512x512.png',
            sizes: '512x512',
            type: 'image/png',
            purpose: 'any maskable',
          },
        ],
      },
    }),
  ],
  server: {
    https: false,
    port: 3000,
  },
})
