import { fileURLToPath, URL } from 'node:url'

import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import vueDevTools from 'vite-plugin-vue-devtools'
import cesium from 'vite-plugin-cesium'

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    vueDevTools(),
    cesium(),
  ],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url))
    },
  },

define: {
    CESIUM_BASE_URL: JSON.stringify('/cesium') // 可选但推荐：指定 Cesium 静态资源基础路径
  },

  server: {
    proxy: {
      '/iserver': {
        target: 'http://localhost:8090', //  iServer 实际地址
        changeOrigin: true
      },
      '/api': {
        target: 'http://localhost:8080', // 后端 API 实际地址
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api/, '')
      }
    }
  }
})
