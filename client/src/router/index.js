import Vue from "vue";
import VueRouter from "vue-router";
import Login from "../views/Login.vue";
import ProductPage from "../views/ProductPage.vue";
import FormAdd from "../views/FormAdd.vue";
import DetailPage from "../components/DetailPage.vue";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "Login",
    component: Login
  },
  {
    path: "/products",
    name: "ProductPage",
    component: ProductPage,
    children: [
      {
        path: ":id",
        name: "DetailPage",
        component: DetailPage,
        props: true
      }
    ]
  },
  {
    path: "/add-product",
    name: "FormAdd",
    component: FormAdd
  }
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes
});

router.beforeEach((to, from, next) => {
  if (to.name !== "Login" && !localStorage.getItem("access_token")) {
    next({ name: "Login" });
  } else if (to.name == "Login" && localStorage.getItem("access_token")) {
    next({ name: "ProductPage" });
  } else {
    next();
  }
});

export default router;
