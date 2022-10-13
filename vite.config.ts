import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    origin: 'http://localhost',
    port: 3000,
    watch: {
      // In cases where hot reload doesn't work
      usePolling: true
    }
  }
});
