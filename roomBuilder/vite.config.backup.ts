import { defineConfig } from 'vite'

// https://vitejs.dev/config/
export default defineConfig({
  base: process.env.NODE_ENV === 'production' ? '/RoomBuilder/' : '/',
  build: {
    outDir: 'dist',
    assetsDir: 'assets',
    sourcemap: false,
    rollupOptions: {
      output: {
        manualChunks: {
          'three': ['three'],
          'firebase': ['firebase'],
          'google-genai': ['@google/genai']
        }
      }
    }
  },
  server: {
    port: 3000,
    open: true
  }
})
