import { defineConfig } from 'vite'

// Configuration for root deployment (no subdirectory)
export default defineConfig({
  base: "/", // Root deployment
  build: {
    outDir: "../dist",
    assetsDir: "assets",
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
