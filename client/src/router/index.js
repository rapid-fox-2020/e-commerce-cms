import Vue from 'vue';
import VueRouter from 'vue-router';
import Dashboard from '../views/Dashboard.vue';
import LoginPage from '../views/Login.vue';

Vue.use(VueRouter);

const routes = [
  {
    path: '/',
    name: 'Dashboard',
    component: Dashboard,
    meta: { requiresAuth: true }
  },
  {
    path: '/login',
    name: 'LoginPage',
    component: LoginPage,
  },
];

const router = new VueRouter({
  mode: 'history',
  routes,
});

router.beforeEach((to, from, next) => {
  if (to.matched.some(record => record.meta.requiresAuth) && localStorage.access_token) {
    next();
  } else if (to.name !== 'LoginPage' && !localStorage.access_token) {
    next({path: '/login'});
  } else if(to.name === 'LoginPage' && localStorage.access_token) {
    next({name: 'Dashboard'});
  } else {
    next();
  }
})

// router.beforeEach((to, from, next) => {
//   if (to.matched.some(record => record.meta.requiresAuth)) {
//     if (localStorage.access_token) next();
//     else next({name: 'LoginPage'});
//   } else {
//     if (localStorage.access_token) next({name: 'Dashboard'});
//     else next();
//   }
// })

export default router;
