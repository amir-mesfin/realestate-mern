import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  server: {
    proxy: {
      '/api': {
        target: 'http://localhost:5175', // dev backend
        changeOrigin: true,
        secure: false,
      },
    },
  },
  plugins: [react()],
})
