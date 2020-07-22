import Vue from 'vue';
import VueRouter from 'vue-router';
import Home from '../views/Home.vue';
import Login from '../views/Login.vue';
import ProductPage from '../views/ProductPage.vue';
import FormAdd from '../views/FormAdd.vue';
import DetailPage from '../views/DetailPage.vue';

Vue.use(VueRouter);

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home,
  },
  {
    path: '/login',
    name: 'Login',
    component: Login,
  },
  {
    path: '/products',
    name: 'ProductPage',
    component: ProductPage,
    children: [
      {
        path: ':id',
        name: 'DetailPage',
        component: DetailPage,
        props: true,
      },
    ],
  },
  {
    path: '/add-product',
    name: 'FormAdd',
    component: FormAdd,
  },
];

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes,
});

export default router;
