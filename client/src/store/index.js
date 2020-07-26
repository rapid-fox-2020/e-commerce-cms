import Vue from 'vue';
import Vuex from 'vuex';
import Axios from 'axios';
import router from '../router';

Vue.use(Vuex);
const baseUrl = 'http://localhost:3000';

export default new Vuex.Store({
  state: {
    products: [],
  },
  mutations: {
    SET_PRODUCTS(state, products) {
      state.products = products;
    },
    SET_DELETE_PRODUCT(state, productId) {
      state.products = state.products.filter((product) => product.id !== productId);
    },
    SET_ADD_PRODUCT(state, newProduct) {
      state.products.push(newProduct);
    },
    SET_UPDATE_PRODUCT(state, newData) {
      for (let i = 0; i < state.products.length; i++) {
        console.log(state.products[i]);
        if (state.products[i].id === newData.id) {
          state.products[i] = newData;
        }
      }
    },
  },
  actions: {

    login(context, payload) {
      Axios({
        method: 'POST',
        url: `${baseUrl}/login`,
        data: {
          email: payload.email,
          password: payload.password,
        },
      })
        .then((result) => {
          localStorage.setItem('access_token', result.data.access_token);
        })
        .catch((err) => {
          console.log(err);
        });
    },

    fetchProduct(context) {
      Axios({
        method: 'GET',
        url: `${baseUrl}/products`,
        headers: {
          access_token: localStorage.access_token,
        },
      })
        .then(({ data }) => {
          context.commit('SET_PRODUCTS', data);
        })
        .catch((err) => {
          console.log(err);
        });
    },

    addProduct(context, payload) {
      const newData = payload;
      Axios({
        method: 'POST',
        url: `${baseUrl}/products`,
        headers: {
          access_token: localStorage.access_token,
        },
        data: {
          name: newData.name,
          image_url: newData.image_url,
          price: +newData.price,
          stock: newData.stock,
        },
      })
        .then((data) => {
          context.commit('SET_ADD_PRODUCT', data);
        })
        .catch((err) => {
          console.log(err);
        });
    },

    updateProduct(context, payload) {
      const newData = payload;
      Axios({
        method: 'PUT',
        url: `${baseUrl}/products/${payload.id}`,
        headers: {
          access_token: localStorage.access_token,
        },
        data: {
          name: newData.name,
          image_url: newData.image_url,
          price: +newData.price,
          stock: newData.stock,
        },
      })
        .then((data) => {
          context.commit('SET_UPDATE_PRODUCT', data);
          router.push('/');
        })
        .catch((err) => {
          console.log(err);
        });
    },

    destroyProduct(context, payload) {
      Axios({
        method: 'DELETE',
        url: `${baseUrl}/products/${payload}`,
        headers: {
          access_token: localStorage.access_token,
        },
      })
        .then((data) => {
          context.commit('SET_DELETE_PRODUCT', data);
        })
        .catch((err) => {
          console.log(err);
        });
    },

  },
  modules: {
  },
});
