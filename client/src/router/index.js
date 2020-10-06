import Vue from 'vue';
import VueRouter from 'vue-router';
import Dashboard from '../views/Dashboard.vue';
import Login from '../views/Login.vue';
import ProductForm from '../views/ProductForm.vue';
import EditProduct from '../views/EditForm.vue';
import NotFound from '../views/NotFound';

Vue.use(VueRouter);

const routes = [

  {
    path: '/products',
    name: 'Products',
    component: Dashboard,
  },
  {
    path: '/',
    name: 'Login',
    component: Login,
  },
  {
    path: '/add',
    name: 'addProduct',
    component: ProductForm,
  },
  {
    path: '/edit/:id',
    name: 'editProduct',
    component: EditProduct,
  },
  {
    path: '*',
    name: '404',
    component: NotFound
  }
];

const router = new VueRouter({
  mode: 'history',
  routes
})
router.beforeEach((to, from, next) => {
  let path = ['Products', 'addProduct', 'editProduct']
  if (path.includes(to.name) && !localStorage.access_token) {
    next({ name: 'Login' });
  } else if (to.name === 'Login' && localStorage.access_token) {
    next({ name: 'Products' })
  } else next()
});

export default router;
