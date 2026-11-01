import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import { defineConfig } from 'vite'
import { VitePWA } from 'vite-plugin-pwa'

// 같은 Wi-Fi의 iPhone에서 접속할 수 있도록 host를 열어둔다 (npm run dev)
export default defineConfig({
  server: { host: true },
  plugins: [
    react(),
    tailwindcss(),
    // iPhone 홈 화면에 추가해서 앱처럼 쓰기 위한 최소 PWA 설정
    VitePWA({
      registerType: 'autoUpdate',
      includeAssets: ['favicon.svg', 'apple-touch-icon.png'],
      manifest: {
        name: 'Untangle',
        short_name: 'Untangle',
        description: '생각을 풀어내는 Brain Dump 프로토타입',
        theme_color: '#fafaf9',
        background_color: '#fafaf9',
        display: 'standalone',
        icons: [
          { src: 'icon-192.png', sizes: '192x192', type: 'image/png' },
          { src: 'icon-512.png', sizes: '512x512', type: 'image/png' },
        ],
      },
    }),
  ],
})
