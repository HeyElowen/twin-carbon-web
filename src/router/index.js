import { createRouter, createWebHistory } from 'vue-router'

import Home from '../views/home.vue'      // 你原有的首页
import CesiumMap from '../views/CesiumMap.vue'  // 新加的

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/cesium',
    name: 'CesiumMap',
    component: CesiumMap
  }
]

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [],
})

export default router
