import Vue from 'vue';
import Vuex from 'vuex';
import axios from 'axios';
import router from '../router';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    products: [],
    id: null,
    name: '',
    image_url: '',
    price: null,
    stock: null,
  },
  mutations: {
    SET_PRODUCT(state, dataProducts) {
      state.products = dataProducts;
    },
    GET_PRODUCTBYID(state, data) {
      state.id = data.id;
      state.name = data.name;
      state.image_url = data.image_url;
      state.price = data.price;
      state.stock = data.stock;
    },
    EDIT_NAME(state, data) {
      state.name = data
    },
    EDIT_IMAGE(state, data) {
      state.image_url = data
    },
    EDIT_PRICE(state, data) {
      state.price = data
    },
    EDIT_STOCK(state, data) {
      state.stock = data
    },
    DELETE_PRODUCT(state, id) {
      state.products = state.products.filter(product => product.id !== id);
    },
  },
  actions: {
    login(context, payload) {
      axios({
        method: 'POST',
        url: 'https://fast-ravine-20823.herokuapp.com/users/login',
        data: { 
          email: payload.email, 
          password: payload.password,
        },
      })
      .then((results) => {
        console.log(results);
        localStorage.setItem('token', results.data.access_token);
        router.push({ name: 'MainPage' });
      })
      .catch((err) => {
        router.push({ name: 'Login' });
        let validate = err.response.data.message
        swal({ title: "Warning!", text: validate, icon: "warning",});
      });
    },
    getProducts(context) {
      axios({
        method: 'GET',
        url: 'https://fast-ravine-20823.herokuapp.com/products',
        headers: {
          access_token: localStorage.token,
        },
      })
      .then((results) => {
        context.commit('SET_PRODUCT', results.data);
      })
      .catch((err) => {
        console.log(err);
        let validate = err.response.data.message
        swal({ title: "Warning!", text: validate, icon: "warning",});
      });
    },
    addProduct(context, payload) {
      axios({
        method: 'POST',
        url: 'https://fast-ravine-20823.herokuapp.com/products',
        headers: {
          access_token: localStorage.token,
        },
        data: {
          name: payload.name,
          image_url: payload.image_url,
          price: payload.price,
          stock: payload.stock,
        },
      })
      .then((results) => {
        console.log(results.data);
        router.push({ name: 'MainPage' });
      })
      .catch(err => {
        if (err === "Request failed with status code 403") {
          swal({ title: "Warning!", text: "No Access!", icon: "warning",});
        }
        let validate = err.response.data.errors
        for (let i = 0; i < validate.length; i++) {
          if (validate === "Price cannot be a negative value!") {
            swal({ title: "Warning!", text: "Price cannot be a negative value!", icon: "warning",});
          } else {
            swal({ title: "Warning!", text: validate[i], icon: "warning",});
          }
        }
      });
    },
    getData(context, payload) {
      axios({
        method: 'GET',
        url: `https://fast-ravine-20823.herokuapp.com/products/${payload}`,
        headers: {
          access_token: localStorage.token,
        },
      })
      .then((results) => {
        context.commit('GET_PRODUCTBYID', results.data);
      })
      .catch(err => {
        console.log(err);
      });
    },
    editProduct(context, payload) {
      axios({
        method: 'PUT',
        url: `https://fast-ravine-20823.herokuapp.com/products/${payload.id}`,
        headers: {
          access_token: localStorage.token,
        },
        data: {
          name: payload.name,
          image_url: payload.image_url,
          price: payload.price,
          stock: payload.stock,
        },
      })
      .then((results) => {
        console.log(results.data);
        router.push({ name: 'MainPage' });
      })
      .catch(err => {
        let validate = err.response.data.errors
        for (let i = 0; i < validate.length; i++) {
          if (validate === "Price cannot be a negative value!") {
            swal({ title: "Warning!", text: "Price cannot be a negative value!", icon: "warning",});
          } else {
            swal({ title: "Warning!", text: validate[i], icon: "warning",});
          }
        }
      });
    },
    deleteProds(context, payload) {
      axios({
        method: 'DELETE',
        url: `https://fast-ravine-20823.herokuapp.com/products/${payload}`,
        headers: {
          access_token: localStorage.token,
        },
      })
      .then((results) => {
        context.commit('DELETE_PRODUCT', payload);
      })
      .catch((err) => {
        console.log(err);
      });
    },
  },
  modules: {
  },
});
