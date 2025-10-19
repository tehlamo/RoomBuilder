import { defineConfig } from 'vite'

// https://vitejs.dev/config/
export default defineConfig({
  base: '/RoomBuilder/', // Replace 'RoomBuilder' with your actual repository name
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
