import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  server: {
    host: '127.0.0.1', // force IPv4
    port: 4000,         // try a different port just in case
    strictPort: true    // prevent fallback to ::1
  }
})
