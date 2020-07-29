import Vue from 'vue';
import VueRouter from 'vue-router';
// import Home from '../views/Home.vue';
import Login from '../views/Login.vue';
import Dasboard from '../views/Dashboard.vue';
import AddProduct from '../components/AddData.vue';
import EditProduct from '../components/EditData.vue';

Vue.use(VueRouter);

const routes = [
  // {
  //   path: '/',
  //   name: 'Home',
  //   component: Home,
  // },
  // {
  //   path: '/about',
  //   name: 'About',
  //   // route level code-splitting
  //   // this generates a separate chunk (about.[hash].js) for this route
  //   // which is lazy-loaded when the route is visited.
  //   component: () => import(/* webpackChunkName: "about" */ '../views/About.vue'),
  // },
  {
    path: '/',
    name: 'Login',
    component: Login,
  },
  {
    path: '/dashboard',
    name: 'Dashboard',
    component: Dasboard,
  },
  {
    path: '/add',
    name: 'AddProduct',
    component: AddProduct,
  },
  {
    path: '/edit/:id',
    name: 'EditProduct',
    component: EditProduct,
    props: true,
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
  } else if (to.name === 'Login' && localStorage.access_token) {
    next({ name: 'Dashboard' });
  } else {
    next();
  }
});

export default router;
