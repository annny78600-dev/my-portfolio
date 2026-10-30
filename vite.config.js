import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react';
import tailwindcss from '@tailwindcss/vite'

// https://vite.dev/config/
export default defineConfig({
  plugins: [ tailwindcss(),react()],
  build: {
    rollupOptions: {
      output: {
        // Split large, rarely-changing libraries into their own cacheable chunks.
        manualChunks: {
          react: ['react', 'react-dom', 'react-dom/client', 'react-router-dom'],
          motion: ['framer-motion', 'lenis'],
          gsap: ['gsap', '@gsap/react'],
        },
      },
    },
  },
})
