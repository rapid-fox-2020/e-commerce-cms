import Vue from 'vue';
import VueRouter from 'vue-router';
import Home from '../views/Home.vue';
import Admin from '../views/Admin.vue';
import ProductAdd from '../views/ProductAdd.vue';
import BannerAdd from '../views/BannerAdd.vue';
import ProductEdit from '../views/ProductEdit.vue';
import BannerEdit from '../views/BannerEdit.vue';
import ProductByCategory from '../views/ProductByCategory.vue'
import Banner from '../views/Banner.vue';
import NotFound from '../views/NotFound.vue';

Vue.use(VueRouter);

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home,
  },
  {
    path: '/dashboard',
    name: 'Admin',
    component: Admin,
  },
  {
    path: '/banners',
    name: 'Banner',
    component: Banner,
  },
  {
    path: '/productAdd',
    name: 'ProductAdd',
    component: ProductAdd,
  },
  {
    path: '/bannerAdd',
    name: 'BannerAdd',
    component: BannerAdd,
  },
  {
    path: '/product/:id',
    name: 'ProductEdit',
    component: ProductEdit,
    props: true,
  },
  {
    path: '/banners/:id',
    name: 'BannerEdit',
    component: BannerEdit,
    props: true,
  },
  {
    path: '/products/:category',
    name: 'ProductByCategory',
    component: ProductByCategory,
    props: true,
  },
  {
    path: '/*',
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
  if ((to.name === 'Admin' || to.name === 'ProductAdd') && !localStorage.accessToken) next({ name: 'Home' });
  else if (to.name === 'Home' && localStorage.accessToken) next({ name: 'Admin' });
  else next();
});

export default router;
