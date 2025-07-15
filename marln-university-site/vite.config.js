import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  base: '/Marln-University/', // Correct base for GitHub Pages deployment
  plugins: [react()],
})
