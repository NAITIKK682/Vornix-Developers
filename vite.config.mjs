// vite.config.mjs
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  build: {
    outDir: 'dist',
    chunkSizeWarningLimit: 600,
    rollupOptions: {
      output: {
        manualChunks: {
          // Split large libraries into separate chunks
          vendor: ['react', 'react-dom'],
          router: ['react-router-dom'], // if you use it
          ui: ['framer-motion', 'lucide-react'], // add other UI libs if used
        },
      },
    },
  },
});