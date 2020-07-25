import Vue from 'vue';
import VueRouter from 'vue-router';
import Home from '../views/Home.vue';
import Login from '../views/Login.vue';
import List from '../views/List.vue';
import Product from '../components/Product.vue';
import AddProduct from '../views/AddProduct.vue';
import DeleteProduct from '../components/DeleteProduct.vue';
import DetailProduct from '../components/ProductDetail.vue';

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
    path: '/addProduct',
    name: 'AddProduct',
    component: AddProduct,
  },
  {
    path: '/list/ProductDelete/:id',
    name: 'DeleteProduct',
    component: DeleteProduct,
  },
  {
    path: '/list/ProductDetail/:id',
    name: 'DetailProduct',
    component: DetailProduct,
  },
  {
    path: '/list',
    name: 'List',
    component: List,
  },
  {
    path: '/product',
    name: 'Product',
    component: Product,
  },
  {
    path: '/about',
    name: 'About',
    component: () => import(/* webpackChunkName: "about" */ '../views/About.vue'),
  },
];

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes,
});

router.beforeEach((to, from, next) => {
  if (to.name !== 'Login' && !localStorage.access_token) next({ name: 'Login' });
  else next();
});
router.beforeEach((to, from, next) => {
  if (to.name === 'Login' && localStorage.access_token) next({ name: 'List' });
  else next();
});

export default router;
