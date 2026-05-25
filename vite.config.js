import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import { resolve } from "node:path";

export default defineConfig({
  plugins: [vue()],
  base: "/sc-datav/",
  resolve: {
    alias: {
      "@": resolve("src"),
    },
  },
});
