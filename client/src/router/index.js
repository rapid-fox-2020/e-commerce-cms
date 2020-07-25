import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import Login from '../views/Login.vue'
import Dashboard from '../views/Dashboard.vue'
import AddProduct from '../views/AddProduct.vue'
import EditProduct from '../views/EditProduct.vue'
Vue.use(VueRouter)

const routes = [
  {
    path: '/edit-product/:id',
    name: 'EditProduct',
    component: EditProduct
  },
  {
    path: '/add-Product',
    name: "AddProduct",
    component: AddProduct
  },
  {
    path: '/dashboard',
    name: "Dashboard",
    component: Dashboard
  },
  {
    path: '/login',
    name: "Login",
    component: Login
  },
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/about',
    name: 'About',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/About.vue')
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
