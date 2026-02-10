import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  base: '/CP3_APP/', // ⭐ your repo name EXACTLY
  plugins: [react()],
  server: {
    port: 5173
  }
})
