import { createApp } from "vue";
import { createPinia } from "pinia";
import ElementPlus from "element-plus";
import "element-plus/dist/index.css";
import App from "@/vue/App.vue";
import router from "@/js/router";
import "@/style.css";
import { useAuthStore } from "@/js/stores/useAuthStore";

const app = createApp(App);
app.use(createPinia());

// 初始化认证状态（从 localStorage 恢复 token）
const authStore = useAuthStore();
authStore.init();

app.use(router);
app.use(ElementPlus);
app.mount("#app");
