import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import { resolve } from "node:path";

export default defineConfig({
  plugins: [vue()],
  base: "/twin-carbon/",
  resolve: {
    alias: {
      "@": resolve("src"),
    },
  },
  server: {
    port: 5173,
    proxy: {
      // 登录接口
      "/login": {
        target: "http://localhost:8080",
        changeOrigin: true,
      },
      // 监测数据相关接口
      "/monitoring": {
        target: "http://localhost:8080",
        changeOrigin: true,
      },
      // iServer 服务（三维场景等）
      "/iserver": {
        target: "http://localhost:8090",
        changeOrigin: true,
      },
    },
  },
});
