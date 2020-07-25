import Vue from 'vue';
import VueRouter from 'vue-router';
import Login from '../views/Login.vue';
import FormAddProduct from '../components/FormAddProduct.vue';
import FormEditProduct from '../components/FormEditProduct.vue';
import Products from '../views/Products.vue';

Vue.use(VueRouter);

const routes = [{
  path: '/login',
  name: 'Login',
  component: Login,
},
{
  path: '/add',
  name: 'FormAddProduct',
  component: FormAddProduct,
},
{
  path: '/update/:id',
  name: 'FormEditProduct',
  component: FormEditProduct,
},
{
  path: '/products',
  name: 'Products',
  component: Products,
},
];

// to itu mau ke mana, from itu dari mana
// to bukan halaman login dan access_token ga ada , akan di lempar ke login
// kalau mau akses ke halaman login dan akses tokennya ada, di lempar ke halaman dashboard

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes,
});

router.beforeEach((to, from, next) => {
  if (to.name !== 'Login' && !localStorage.access_token) next({ name: 'Login' });
  else if (to.name === 'Login' && localStorage.access_token) next({ name: 'Products' });
  else next();
});

export default router;
