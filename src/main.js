import { createApp } from 'vue'
import { createPinia } from 'pinia'
import piniaPluginPersistedstate from 'pinia-plugin-persistedstate'

import App from './App.vue'
import router from './router'

// 完整引入 Element Plus
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'

// 完整引入图标库
import * as ElementPlusIconsVue from '@element-plus/icons-vue'

const app = createApp(App)
// 注册 Element Plus
app.use(ElementPlus)

// 注册所有图标组件
for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
  app.component(key, component)
}

// Pinia 必须先于 router 注册
const pinia = createPinia()
pinia.use(piniaPluginPersistedstate)
app.use(pinia)
app.use(router)

app.mount('#app')
