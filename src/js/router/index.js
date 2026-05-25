import { createRouter, createWebHashHistory } from "vue-router";
import { useAuthStore } from "@/js/stores/useAuthStore";

const router = createRouter({
  history: createWebHashHistory("/sc-datav/"),
  routes: [
    {
      path: "/login",
      name: "Login",
      component: () => import("@/vue/pages/Login/index.vue"),
      meta: { public: true },
    },
    {
      path: "/",
      redirect: "/demo1",
    },
    {
      path: "/demo1",
      name: "Demo1",
      component: () => import("@/vue/pages/Demo1/index.vue"),
    },
  ],
});

// 路由守卫：未登录跳转到登录页
router.beforeEach((to, from, next) => {
  const authStore = useAuthStore();

  // 公开页面直接放行
  if (to.meta?.public) {
    // 已登录用户访问登录页，重定向到首页
    if (authStore.isLoggedIn && to.path === "/login") {
      next("/demo1");
      return;
    }
    next();
    return;
  }

  // 需要登录的页面
  if (!authStore.isLoggedIn) {
    next("/login");
    return;
  }

  next();
});

export default router;
