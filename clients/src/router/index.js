import Vue from 'vue';
import VueRouter from 'vue-router';
import MainPage from '../views/MainPage.vue';
import Home from '../views/Home.vue';
import Products from '../components/Product.vue';
import Login from '../views/Login.vue';
import AddForm from '../views/AddForm.vue';
import EditForm from '../views/EditForm.vue';
import NotFound from '../views/NotFound.vue';

Vue.use(VueRouter);

const routes = [
  {
    path: '/',
    name: 'Login',
    component: Login,
  },
  {
    path: '/home',
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
    path: '/main',
    name: 'MainPage',
    component: MainPage,
  },
  {
    path: '/products',
    name: 'Products',
    component: Products,
  },
  {
    path: '/add',
    name: 'AddForm',
    component: AddForm,
  },
  {
    path: '/edit/:id',
    name: 'EditForm',
    component: EditForm,
    props: true,
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
  if (to.name !== 'Login' && !localStorage.token) next({name: 'Login'})
  else next()
})

router.beforeEach((to, from, next) => {
  if (to.name == 'Login' && localStorage.token) next({name: 'MainPage'})
  else next()
})

export default router;
