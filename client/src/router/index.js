import Vue from 'vue';
import VueRouter from 'vue-router';
import { BootstrapVue, IconsPlugin } from 'bootstrap-vue';
// import Home from '../views/Home.vue';
import Login from '../views/Login.vue';
import HomeProducts from '../views/HomeProducts.vue';
import FormEditProducts from '../views/FormEditProducts.vue';
import BannerProducts from '../views/BannerProducts.vue';
import FormAddProducts from '../views/FormAddProducts.vue';
import NotFound from '../views/NotFound.vue';
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap-vue/dist/bootstrap-vue.css';

Vue.use(VueRouter);
Vue.use(BootstrapVue);
Vue.use(IconsPlugin);

const routes = [
  {
    path: '/',
    name: 'Login',
    component: Login,
  },
  {
    path: '/login',
    name: 'Login',
    component: Login,
  },
  {
    path: '/products',
    name: 'Products',
    component: HomeProducts,
  },
  {
    path: '/products/add',
    name: 'AddProducts',
    component: FormAddProducts,
  },
  {
    path: '/products/:id',
    name: 'EditProducts',
    component: FormEditProducts,
  },

  {
    path: '/products/banner',
    name: 'BannerProducts',
    component: BannerProducts,
  },
  {
    path: '*',
    name: 'NotFound',
    component: NotFound,
  },
];

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes,
});

router.beforeEach((to, from, next) => {
  if (to.name !== 'Login' && !localStorage.access_token) {
    next({ name: 'Login' });
  } else {
    next();
  }
  if (to.name === 'Login' && localStorage.access_token) {
    next({ name: 'Products' });
  } else {
    next();
  }
});

export default router;
