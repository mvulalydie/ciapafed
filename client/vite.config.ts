import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  base: '/ciapafed/',
  plugins: [react()],
  server: {
    port: 4173,
    proxy: {
      '/api': 'http://localhost:5000'
    }
  }
});
