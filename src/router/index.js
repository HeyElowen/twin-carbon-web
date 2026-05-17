import { createRouter, createWebHistory } from 'vue-router'
import { useAuthStore } from '@/stores/auth.js'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/login',
      name: 'Login',
      component: () => import('@/views/login.vue'),
      meta: { public: true }
    },
    {
      path: '/home',
      name: 'Home',
      component: () => import('@/views/home.vue')
    },
    {
      path: '/',
      redirect: '/home'
    }
  ],
})

// 路由守卫
router.beforeEach((to, from, next) => {
  const authStore = useAuthStore()
  const isAuthenticated = authStore.isLoggedIn

  // 已登录用户访问登录页，重定向到首页
  if (to.path === '/login' && isAuthenticated) {
    next('/home')
    return
  }

  // 未登录用户访问非公开页面，重定向到登录页
  if (!to.meta?.public && !isAuthenticated) {
    next('/login')
    return
  }

  next()
})

export default router
