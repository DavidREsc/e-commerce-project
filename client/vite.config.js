import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue()],
  server :{
      proxy: {
        '/api': {
          target: "http://localhost:7000",
          changeOrigin: true,
          rewrite: (path) => { console.log(path); return path.replace('/^\/api/', '') }
        }
      }
  },
  optimizeDeps: {
    exclude: ["oh-vue-icons/icons"]
  }
})
