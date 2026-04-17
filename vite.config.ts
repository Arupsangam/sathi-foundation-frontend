import { defineConfig } from 'vite'
import path from 'path'
import tailwindcss from '@tailwindcss/vite'
import react from '@vitejs/plugin-react'

function figmaAssetResolver() {
  return {
    name: 'figma-asset-resolver',
    resolveId(id) {
      if (id.startsWith('figma:asset/')) {
        const filename = id.replace('figma:asset/', '')
        return path.resolve(__dirname, 'src/assets', filename)
      }
    },
  }
}

export default defineConfig({
  plugins: [
    figmaAssetResolver(),
    react(),
    tailwindcss(),
  ],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },

  assetsInclude: ['**/*.svg', '**/*.csv'],

  // 🔥 Important: Proxy setup for backend (this will fix "Cannot connect to server")
  server: {
    host: true,           // Allow access from phone/hotspot
    port: 5173,
    proxy: {
      '/api': {
        target: 'http://10.21.21.59:4000',
        changeOrigin: true,
        secure: false,
      },
    },
  },
})