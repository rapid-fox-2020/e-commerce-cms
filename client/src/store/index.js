import Vue from 'vue';
import Vuex from 'vuex';
import axios from 'axios';
import router from '../router/index.js';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    logged: false,
    openAdd: false,
    openEdit: false,
    products: [],
    editProduct: {},
  },
  mutations: {
    SET_LOGGED(state, payload) {
      state.logged = payload;
    },
    SET_OPENADD(state, payload) {
      state.openAdd = payload;
    },
    SET_OPENEDIT(state, payload) {
      state.openEdit = payload;
    },
    SET_PRODUCTS(state, payload) {
      state.products = payload;
    },
    SET_EDITPRODUCT(state, payload) {
      state.editProduct = payload;
    },
    updateName(state, payload) {
      state.editProduct.name = payload;
    }
  },
  actions: {
    Logged(context, payload) {
      context.commit('SET_LOGGED', true);
    },
    LoggedOut(context, payload) {
      context.commit('SET_LOGGED', false);
    },
    openAddpage(context, payload) {
      context.commit('SET_OPENADD', true);
    },
    openEditpage(context, payload) {
      console.log(payload, '<>>><');
      context.commit('SET_OPENEDIT', true);
      axios({
        method: 'GET',
        url: `http://localhost:3000/products/${payload}`,
      })
        .then((data) => {
          context.commit('SET_EDITPRODUCT', data.data);
        })
        .catch((err) => {
          console.log(err);
        });
    },
    closeEditpage(context, payload) {
      context.commit('SET_OPENEDIT', false);
    },
    closeAddpage(context, payload) {
      context.commit('SET_OPENADD', false);
    },
    login(context, payload) {
      console.log(payload, 'Masuk juga login <<<');
      return axios({
        method: 'post',
        url: 'http://localhost:3000/login',
        data: {
          email: payload.email,
          password: payload.password,
        },
      })
        .then((data) => {
          localStorage.setItem('access_token', data.data.access_token);
          context.commit('SET_LOGGED', true);
          router.push({name: "Home"});
        })
        .catch((err) => {
          console.log(err);
        });
    },
    getProducts(context, payload) {
      return axios({
        method: 'get',
        url: 'http://localhost:3000/products/',
        headers: {
          access_token: localStorage.access_token,
        },
      })
        .then((data) => {
          context.commit('SET_PRODUCTS', data.data);
        })
        .catch((err) => {
          console.log(err);
        });
    },
    addStock(context, payload) {
      console.log(payload.id, 'masuk addstock');
        return axios({
          method: 'PUT',
          url: `http://localhost:3000/products/${payload.id}`,
          headers: {
            access_token: localStorage.access_token,
          },
          data: {
            stock: payload.stock,
          },
        })
          .then((data) => {
          })
          .catch((err) => {
            console.log(err);
          });
    },
    edit(context, payload) {
      console.log(payload, '<<<<');
        return axios({
          method: 'PUT',
          url: `http://localhost:3000/products/${payload.id}`,
          headers: {
            access_token: localStorage.access_token,
          },
          data: {
            id: payload.id,
            name: payload.name,
            image_url: payload.image_url,
            description: payload.description,
            stock: payload.stock,
            price: payload.price,
            genre: payload.genre,
          },
        })
          .then((data) => {
            context.commit('SET_EDITPRODUCT', data.data);
          })
          .catch((err) => {
            console.log(err)
          });
    },
    addProduct(context, payload) {
        return axios({
          method: 'POST',
          url: 'http://localhost:3000/products/',
          headers: {
            access_token: localStorage.access_token,
          },
          data: {
            name: payload.name,
            image_url: payload.image_url,
            description: payload.description,
            stock: payload.stock,
            price: payload.price,
            genre: payload.genre,
          },
        })
          .then((data) => {
            console.log(data.data.name);
            if (!data.data.name || data.data.image_url || data.data.description || data.data.stock || data.data.price || data.data.genre) {
              context.commit('SET_PRODUCTS', data.data);
            } else {
              context.commit('SET_PRODUCTS', 'sadasdas');
            }
          })
          .catch((err) => {
            console.log(err);
          });
    },
    deleteProduct(context, payload) {
        return axios({
          method: 'DELETE',
          url: `http://localhost:3000/products/${payload}`,
          headers: {
            access_token: localStorage.access_token,
          },
        })
          .then((data) => {
            context.commit('SET_PRODUCTS', data.data);
          })
          .catch((err) => {
            console.log(err);
          });
    },
  },
  modules: {
  },
});
