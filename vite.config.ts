import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  base: '/DnDTracker/', // <--- this fixes the blank page issue
  plugins: [react()],
})