import Vue from 'vue';
import Vuex from 'vuex';
import axios from 'axios';
import router from '../router';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    count: 0,
    products: [],
    selectedProduct: {},
    showUpdateForm: false,
    errMsg: '',
    isLogin: false,
  },
  mutations: {
    SET_PRODUCTS(state, payload) {
      state.products = payload;
    },
    SET_SELECTED_PRODUCT(state, payload) {
      state.selectedProduct = payload;
      console.log(this.state.selectedProduct, 'this.state.selectedProduct');
    },
    SHOW_FORM_UPDATE(state, id) {
      state.showUpdateForm = true;
      console.log('masuk show form update');
      router.push({ path: `/list/ProductDetail/${id}` });
    },
    INCREMENT(state) {
      state.count += 1;
    },
    DELETE_PRODUCT(state, payload) {
      state.products = state.products.filter((product) => product.id !== payload.id);
    },
    BACK_HOME() {
      router.push({ path: '/list' });
    },
    SET_ERRMSG(state, err) {
      state.errMsg = err;
    },
    RESET_ERRMSG(state) {
      state.errMsg = '';
    },
    SET_ISLOGIN(state) {
      state.isLogin = true;
    },
    RESET_ISLOGIN(state) {
      state.isLogin = false;
    },
  },
  actions: {
    getProducts(context) {
      axios({
        method: 'get',
        url: 'http://localhost:3000/products',
        headers: {
          access_token: localStorage.access_token,
        },
      })
        .then((result) => {
          console.log(result.data, 'result');
          context.commit('SET_PRODUCTS', result.data);
          context.commit('RESET_ERRMSG');
        })
        .catch((err) => {
          console.log(err.response.data.message);
          context.commit('SET_ERRMSG', err.response.data.message);
        });
    },
    getProductByPk(context, data) {
      console.log('data.action', data.action);
      axios({
        method: 'get',
        url: `http://localhost:3000/products/${data.id}`,
        headers: {
          access_token: localStorage.access_token,
        },
      })
        .then((result) => {
          console.log(result.data, 'result.data nih');
          // context.commit('SHOW_FORM_UPDATE', result.data.id);
          context.commit('SET_SELECTED_PRODUCT', result.data);
          if (data.action === 'update') {
            console.log('masuk atas1');
            router.push({ path: `/list/ProductDetail/${data.id}` });
          } else {
            console.log('masuk bawah');
            router.push({ path: `/list/ProductDelete/${data.id}` });
          }
          context.commit('RESET_ERRMSG');
        })
        .catch((err) => {
          console.log(err.response.data.message);
          context.commit('SET_ERRMSG', err.response.data.message);
        });
    },
    processLogin(context, loginData) {
      console.log(context);
      return axios({
        method: 'POST',
        url: 'http://localhost:3000/login',
        data: {
          email: loginData.email,
          password: loginData.password,
        },
      })
        .then((result) => {
          console.log(result.data);
          localStorage.access_token = result.data.access_token;
          router.push({ name: 'List' });
          context.commit('SET_ISLOGIN');
          context.commit('RESET_ERRMSG');
        })
        .catch((err) => {
          console.log(err.response.data.message);
          context.commit('SET_ERRMSG', err.response.data.message);
        });
    },
    processAddProduct(context, newData) {
      console.log(context);
      return axios({
        method: 'POST',
        url: 'http://localhost:3000/products',
        data: {
          name: newData.name,
          image_url: newData.image_url,
          price: +newData.price,
          stock: +newData.stock,
        },
        headers: {
          access_token: localStorage.access_token,
        },
      })
        .then((result) => {
          console.log(result.data);
          router.push({ name: 'List' });
          context.commit('RESET_ERRMSG');
        })
        .catch((err) => {
          console.log(err.response.data.message);
          context.commit('SET_ERRMSG', err.response.data.message);
        });
    },
    processUpdateProduct(context, updatedData) {
      console.log('masukl');
      console.log(updatedData, 'updatedData');
      return axios({
        method: 'put',
        url: `http://localhost:3000/products/${updatedData.id}`,
        data: {
          name: updatedData.name,
          image_url: updatedData.image_url,
          price: +updatedData.price,
          stock: +updatedData.stock,
        },
        headers: {
          access_token: localStorage.access_token,
        },
      })
        .then((result) => {
          console.log(result, 'result.data');
          // context.commit('DELETE_PRODUCT', result.data.id);
          router.push({ name: 'List' });
          context.commit('RESET_ERRMSG');
        })
        .catch((err) => {
          console.log(err.response.data.message);
          context.commit('SET_ERRMSG', err.response.data.message);
        });
    },
    processDeleteProduct(context, id) {
      console.log(context);
      return axios({
        method: 'DELETE',
        url: `http://localhost:3000/products/${id}`,
        headers: {
          access_token: localStorage.access_token,
        },
      })
        .then((result) => {
          console.log(result.data);
          context.commit('DELETE_PRODUCT', result.data.id);
          router.push({ name: 'List' });
          context.commit('RESET_ERRMSG');
        })
        .catch((err) => {
          console.log(err.response.data.message);
          context.commit('SET_ERRMSG', err.response.data.message);
        });
    },
    moveToPage() {
      router.push({ name: 'AddProduct' });
    },
    processLogout(context) {
      context.commit('RESET_ISLOGIN');
    },
  },
  modules: {
  },
});
