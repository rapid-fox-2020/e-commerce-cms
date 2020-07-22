import Vue from 'vue';
import VueRouter from 'vue-router';
import Home from '../views/Home.vue';
import Admin from '../views/Admin.vue';
import ProductAdd from '../views/ProductAdd.vue';
import ProductEdit from '../views/ProductEdit.vue';
import NotFound from '../views/NotFound.vue';

Vue.use(VueRouter);

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home,
  },
  {
    path: '/about',
    name: 'About',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/About.vue'),
  },
  {
    path: '/dashboard',
    name: 'Admin',
    component: Admin,
  },
  {
    path: '/productAdd',
    name: 'ProductAdd',
    component: ProductAdd,
  },
  {
    path: '/product/:id',
    name: 'ProductEdit',
    component: ProductEdit,
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
