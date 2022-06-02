import { createRouter, createWebHistory } from "vue-router";
import LoginView from "../views/LoginView.vue";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/login",
      name: "login",
      component: LoginView,
    },
    {
      path: "/auth",
      redirect: { path: "/auth/dashboard" },
      children: [
        {
          path: "/dashboard",
          component: () => import("../views/Auth/DashboardView.vue"),
        },
      ],
    },
  ],
});

export default router;