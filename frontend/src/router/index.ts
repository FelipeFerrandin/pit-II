import { createRouter, createWebHistory } from "vue-router";
import HomeView from "../views/HomeView.vue";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      name: "home",
      component: HomeView
    },
    {
      path: "/info",
      name: "info",
      component: () => import("../views/DetailsProduct.vue")
    },
    {
      path: "/cart",
      name: "cart",
      component: () => import("../views/Cart.vue")
    }
  ]
});

export default router;
