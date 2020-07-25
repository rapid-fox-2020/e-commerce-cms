import Vue from 'vue';
import Vuex from 'vuex';
import axios from 'axios';
import swal from 'sweetalert';
import router from '../router';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    isLoggedIn: false,
    products: [],
    closeLoginForm: '',
    productsById: {},
  },
  mutations: {
    LOGIN_ADMIN() {},
    READ_PRODUCT(state, payload) {
      state.products = payload;
      console.log(state.products, 'ini state');
    },
    DELETE_PRODUCT(state, payload) {
      console.log('delete products commit');
      const newProducts = [];
      console.log(state.products, 'ini products');
      for (let i = 0; i < state.products.length; i += 1) {
        console.log(Number(payload), 'ini number');
        if (state.products[i].id !== Number(payload)) {
          newProducts.push(state.products[i]);
        } else {
          console.log(state.products[i].id, 'ini id delete', Number(payload));
        }
      }
      state.products = newProducts;
    },
    ADD_PRODUCT(state, payload) {
      console.log(state.closeLoginForm);
      state.products.push(payload);
      swal('successfully Add!', '', 'success');
      router.push({ name: 'Products' });
    },
    GET_PRODUCT_BY_ID(state, payload) {
      state.productsById = payload;

      router.push({ name: 'EditProducts', params: { id: state.productsById.id } });
    },
    UPDATE_PRODUCT(state, payload) {
      for (let i = 0; i < state.products.length; i += 1) {
        if (state.products[i].id === payload[1].id) {
          state.products[i] = payload[1];
        }
      }
      swal('successfully Update!', '', 'success');
      router.push({ name: 'Products' });
    },
  },
  actions: {
    loginAdmin(context, payload) {
      console.log(payload);
      const getData = {
        email: payload.email,
        password: payload.password,
      };
      axios({
        method: 'POST',
        url: 'https://safe-anchorage-60319.herokuapp.com/login',
        data: getData,
      })
        .then((result) => {
          localStorage.access_token = result.data.access_token;
          console.log(result, 'ini result', payload.email, payload.password);
          context.commit('LOGIN_ADMIN');
          swal('You are successfully login!', '', 'success');
          router.push({ name: 'Products' });
        })
        .catch((err) => {
          swal(`${err.response.data.message}`, '', 'error');
        });
    },
    readProducts(context) {
      axios({
        method: 'GET',
        url: 'https://safe-anchorage-60319.herokuapp.com/products',
        headers: { access_token: localStorage.access_token },
      })
        .then((result) => {
          console.log(result, 'ini result dari read product');
          context.commit('READ_PRODUCT', result.data.message);
        })
        .catch((err) => {
          console.log(err.response);
        });
    },
    addProducts(context, payload) {
      console.log(payload);
      const addProducts = {
        name: payload.name,
        image_url: payload.image,
        price: payload.price,
        stock: payload.stock,
        category: payload.category,
      };
      axios({
        method: 'POST',
        url: 'https://safe-anchorage-60319.herokuapp.com/products',
        data: addProducts,
        headers: { access_token: localStorage.access_token },
      })
        .then((result) => {
          console.log(result.data, 'success add');
          context.commit('ADD_PRODUCT', result.data.message);
        })
        .catch((err) => {
          swal(`${err.response.data.message[0]}`, '', 'error');
          console.log(err.response.data);
        });
    },
    deleteProducts(context, payload) {
      axios({
        method: 'DELETE',
        url: `https://safe-anchorage-60319.herokuapp.com/products/${payload}`,
        headers: { access_token: localStorage.access_token },
      })
        .then(() => {
          console.log('delete axios');
          context.commit('DELETE_PRODUCT', payload);
        })
        .catch((err) => {
          console.log(err.response);
        });
    },
    getProductsById(context, payload) {
      axios({
        method: 'GET',
        url: `https://safe-anchorage-60319.herokuapp.com/products/${payload}`,
        headers: { access_token: localStorage.access_token },
      })
        .then((result) => {
          context.commit('GET_PRODUCT_BY_ID', result.data.message);
        })
        .catch((err) => {
          console.log(err.response, 'ini error reaad');
        });
    },
    updateProduct(context, payload) {
      console.log('kijang satu');
      const updateProduct = {
        name: payload.name,
        image_url: payload.image,
        price: payload.price,
        stock: payload.stock,
        category: payload.category,
      };
      axios({
        method: 'PUT',
        url: `https://safe-anchorage-60319.herokuapp.com/products/${payload.id}`,
        data: updateProduct,
        headers: { access_token: localStorage.access_token },
      })
        .then((result) => {
          console.log(result.data, 'success update');
          context.commit('UPDATE_PRODUCT', result.data.message);
        })
        .catch((err) => {
          swal(`${err.response.data.message[0]}`, '', 'error');
          console.log(err.response.data);
        });
    },
    logout() {
      localStorage.clear();
      swal('You are successfully logout!', '', 'success');
      router.push({ name: 'Login' });
    },
  },
  modules: {},
});
