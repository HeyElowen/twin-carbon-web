import { createRouter, createWebHashHistory } from "vue-router";

const router = createRouter({
  history: createWebHashHistory("/sc-datav/"),
  routes: [
    {
      path: "/",
      redirect: "/demo1",
    },
    {
      path: "/demo1",
      component: () => import("@/vue/pages/Demo1/index.vue"),
    },
  ],
});

export default router;
