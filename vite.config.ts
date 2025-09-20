import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import laravel from 'laravel-vite-plugin';

export default defineConfig({
  plugins: [
    laravel({
      input: ['resources/css/app.css', 'resources/js/app.tsx'],
      refresh: true,
    }),
    react(),
  ],
  server: {
    host: '0.0.0.0',
    port: 5173,
    hmr: {
      host: 'localhost',
      port: 5173,
    },
    watch: {
      usePolling: true,
      interval: 100,
    },
  },
  build: {
    outDir: 'public/build',
    rollupOptions: {
      output: {
        manualChunks: undefined,
      },
    },
  },
  optimizeDeps: {
    include: ['react', 'react-dom', 'react-dom/client'],
  },
});
