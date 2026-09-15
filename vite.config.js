import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

export default defineConfig({
  plugins: [vue()],
  resolve: {
    alias: {
      '@': '/src'
    }
  },
  server: {
    host: true,
    port: 5173,
    // Allow Cloudflare quick-tunnel hostnames for live draft previews from private workers.
    allowedHosts: ['.trycloudflare.com', 'localhost']
  }
})
