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
      path: "/info/:id",
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
      meta: { requiresAuth: true },
      component: () => import("../views/Account.vue")
    },
    {
      path: "/orders",
      name: "orders",
      meta: { requiresAuth: true },
      component: () => import("../views/Orders.vue")
    },
    {
      path: "/info-account",
      name: "info-account",
      meta: { requiresAuth: true },
      component: () => import("../views/InfoAccount.vue")
    },
    {
      path: "/finishing-order",
      name: "finishing-order",
      component: () => import("../views/FinishingOrder.vue")
    },
    {
      path: "/login",
      name: "login",
      component: () => import("../views/Login.vue")
    }
  ]
});

router.beforeEach((to, from, next) => {
  if (to.matched.some(record => record.meta.requiresAuth)) {
    if (localStorage.getItem("token")) {
      next();
    } else {
      next({ path: "/login" });
    }
  } else {
    next();
  }
});

export default router;
