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
    },
    {
      path: "/account",
      name: "account",
      component: () => import("../views/Account.vue")
    },
    {
      path: "/orders",
      name: "orders",
      component: () => import("../views/Orders.vue")
    },
    {
      path: "/info-account",
      name: "info-account",
      component: () => import("../views/InfoAccount.vue")
    },
    {
      path: "/finishing-order",
      name: "finishing-order",
      component: () => import("../views/FinishingOrder.vue")
    }
  ]
});

export default router;
