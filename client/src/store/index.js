import Vue from 'vue';
import Vuex from 'vuex';
import axios from 'axios';

Vue.use(Vuex);
const baseUrl = 'http://localhost:3000';

export default new Vuex.Store({
  state: {
    products: [],
    product: null,
    showModal: false,
  },
  mutations: {
    fetchProducts(state, payload) {
      state.products = payload;
    },
    addNewProduct(state, payload) {
      state.products.push(payload);
    },
    deleteProduct(state, payload) {
      const result = state.products.filter((product) => product.id !== payload);

      state.products = result;
    },
    productById(state, payload) {
      state.product = payload;
    },
    updateProduct() {
      this.dispatch('fetchProducts');
    },
    changeShowModal(state) {
      state.showModal = !state.showModal;
    },
  },
  actions: {
    login(_, payload) {
      axios({
        method: 'POST',
        url: `${baseUrl}/login`,
        data: {
          email: payload.email,
          password: payload.password,
        },
      })
        .then(({ data }) => {
          localStorage.setItem('access_token', data.access_token);
          payload.toDashboard();
        })
        .catch((err) => {
          console.log(err);
        });
    },
    fetchProducts(context) {
      axios({
        method: 'GET',
        url: `${baseUrl}/products`,
        headers: {
          access_token: localStorage.getItem('access_token'),
        },
      })
        .then(({ data }) => {
          context.commit('fetchProducts', data);
        })
        .catch((err) => {
          console.log(err);
        });
    },
    addNewProduct(context, payload) {
      axios({
        method: 'POST',
        url: `${baseUrl}/products`,
        headers: {
          access_token: localStorage.getItem('access_token'),
        },
        data: {
          name: payload.name,
          stock: payload.stock,
          price: payload.price,
          imageUrl: payload.imageUrl,
        },
      })
        .then(({ data }) => {
          context.commit('addNewProduct', data);
          payload.toDashboard();
        })
        .catch((err) => {
          console.log(err);
        });
    },
    deleteProduct(context, payload) {
      axios({
        method: 'DELETE',
        url: `${baseUrl}/products/${payload}`,
        headers: {
          access_token: localStorage.getItem('access_token'),
        },
      })
        .then(() => {
          context.commit('deleteProduct', payload);
        })
        .catch((err) => {
          console.log(err);
        });
    },
    detailPage(context, payload) {
      axios({
        method: 'GET',
        url: `${baseUrl}/products/${payload.id}`,
        headers: {
          access_token: localStorage.getItem('access_token'),
        },
      })
        .then(({ data }) => {
          context.commit('productById', data);
          payload.toDetailPage();
        })
        .catch((err) => {
          console.log(err);
        });
    },

    updateProduct(context, payload) {
      axios({
        method: 'PUT',
        url: `${baseUrl}/products/${payload.id}`,
        headers: {
          access_token: localStorage.getItem('access_token'),
        },
        data: {
          name: payload.name,
          stock: payload.stock,
          price: payload.price,
          imageUrl: payload.imageUrl,
        },
      })
        .then(({ data }) => {
          context.commit('updateProduct', data);
        })
        .catch((err) => {
          console.log(err);
        });
    },
    changeShowModal(context) {
      context.commit('changeShowModal');
    },

    logout(context, payload) {
      localStorage.clear();
      payload();
    },
  },
  modules: {},
});
