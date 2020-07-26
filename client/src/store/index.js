import Vue from 'vue';
import Vuex from 'vuex';
import axios from 'axios';
import router from '../router';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    products: [],
  },
  mutations: {
    fetchProduct(state, products) {
      state.products = products;
    },
    removeProduct(state, productId) {
      state.products = state.products.filter(product => product.id !== productId);
    },
    addProduct(state, newProduct) {
      state.products.push(newProduct);
    },
    updateProduct(state, newData) {
      for(let i = 0; i < state.products.length; i++) {
        if (state.products[i].id === newData.id) {
          state.products[i] = newData;
        }
      }
    }
  },
  actions: {
    async fetchProduct(context) {
      try {
        const products = await axios({
          method: 'GET',
          url: 'https://e-commerce-c.herokuapp.com/products',
          headers: {
            access_token: localStorage.access_token,
          }
        })
        context.commit('fetchProduct', products.data);
      } catch (e) {
        console.log(e);
      }
    },
    async login(context, payload) {
      try {
        const user = await axios({
          method: "POST",
          url: "https://e-commerce-c.herokuapp.com/login",
          data: {
            email: payload.email,
            password: payload.password,
          }
        });
        localStorage.name = user.data.name;
        localStorage.access_token = user.data.access_token;
        router.push({path: '/'});
      } catch (e) {
        console.log(e);
      }
    },
    async destroyProduct(context, payload) {
      try {
        const res = await axios({
          method: "DELETE",
          url: `https://e-commerce-c.herokuapp.com/products/${payload}`,
          headers: {
            access_token: localStorage.access_token,
          }
        });
        context.commit('removeProduct', res.data.id);
        return res.status;
      } catch (e) {
        console.log(e);
      }
    },
    async addProduct(context, payload) {
      try {
        const newProduct = await axios({
          method: "POST",
          url: `https://e-commerce-c.herokuapp.com/products`,
          headers: {
            access_token: localStorage.access_token,
          },
          data: {
            name: payload.name,
            image_url: payload.image_url,
            price: +payload.price,
            stock: payload.stock,
          }
        });
        context.commit('addProduct', newProduct.data.id);
        return newProduct.status;
      } catch (e) {
        return e.message;
      }
    },
    async updateProduct(context, payload) {
      try {
        const newData = await axios({
          method: "PATCH",
          url: `https://e-commerce-c.herokuapp.com/products/${payload.id}`,
          headers: {
            access_token: localStorage.access_token,
          },
          data: {
            name: payload.name,
            image_url: payload.image_url,
            price: +payload.price,
            stock: payload.stock,
          }
        });
        context.commit('updateProduct', newData.data);
        return newData.status;
      } catch (e) {
        return e.message;
      }
    }
  },
  modules: {
  },
});
