import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    origin: 'http://localhost',
    port: 3000,
    watch: {
      // In cases where hot reload doesn't work
      usePolling: true,
    },
  },
  resolve: {
    alias: {
      '@components': path.resolve(__dirname, './src/components'),
      '@store': path.resolve(__dirname, './src/store'),
      '@types': path.resolve(__dirname, './src/types'),
      '@assets': path.resolve(__dirname, './public/assets'),
    },
  },
})
