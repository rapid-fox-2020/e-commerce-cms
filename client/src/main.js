import Vue from 'vue';
import App from './App.vue';
import router from './router';
import store from './store';
import '../public/css/main.css';
import '../public/css/util.css';
import '../public/fonts/font-awesome-4.7.0/css/font-awesome.min.css';


Vue.config.productionTip = false;

new Vue({
  router,
  store,
  render: (h) => h(App),
}).$mount('#app');
