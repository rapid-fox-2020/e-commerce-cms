import Vue from 'vue';
import VueRouter from 'vue-router';
import Home from '../views/Home.vue';
import Dashboard from '../views/Dashboard.vue';
import Login from '../views/Login.vue';
import ProductForm from '../views/ProductForm.vue';
import editProduct from '../views/EditForm.vue';

Vue.use(VueRouter);

const routes = [
  
  {
    path: '/',
    name: 'Products',
    component: Dashboard,
  },
  {
    path: '/login',
    name: 'Login',
    component:Login,
  },
  {
    path: '/add',
    name: 'addProduct',
    component:ProductForm,
  },
  {
    path: '/edit/:id',
    name: 'editProduct',
    component:editProduct,
  },
  {
    path: '/about',
    name: 'About',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/About.vue'),
  },
];

const router = new VueRouter({
  mode: 'history',
  routes
})

export default router;
