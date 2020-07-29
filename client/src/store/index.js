import Vue from 'vue';
import Vuex from 'vuex';
import axios from 'axios';
import swal from 'sweetalert';
import router from '../router';

Vue.use(Vuex);
const baseUrl = 'http://localhost:3000';
// const baseUrl = 'https://salty-woodland-64680.herokuapp.com';
export default new Vuex.Store({
  state: {
    flagLogin: false,
    products: [],
    newProduct: [],
    updateProduct: [],
  },
  mutations: {
    SET_LOGIN(state, payload) {
      state.flagLogin = payload;
    },
    SET_LOGOUT() {
      localStorage.clear();
      router.push('/login');
    },
    SET_PRODUCTS(state, payload) {
      state.products = payload;
    },
    SET_ADD_PRODUCT(state, payload) {
      state.newProduct.push(payload);
    },
    SET_DELETE_PRODUCT(state, payload) {
      const result = state.products.filter((product) => product.id !== payload);
      state.products = result;
    },
  },
  actions: {
    login(context, payload) {
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
          context.commit('SET_LOGIN', true);
          payload.cb();
        })
        .catch((err) => {
          const { message } = err.response.data;
          swal('Error', message, 'error');
        });
    },
    fetchProduct(context) {
      axios({
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
          console.log(err.response.data.message);
        });
    },
    addProduct(context, payload) {
      const newData = payload;
      axios({
        method: 'POST',
        url: `${baseUrl}/products`,
        headers: {
          access_token: localStorage.access_token,
        },
        data: {
          name: newData.addName,
          img_url: newData.addImage,
          price: newData.addPrice,
          stock: newData.addStock,
        },
      })
        .then(({ data }) => {
          console.log(data);
          // context.commit('SET_ADD_PRODUCT', data);
          swal({
            title: 'Success!',
            text: `Product ${newData.addName} has been saved`,
            icon: 'success',
            button: 'OK!',
          });
          // show dashboard
          router.push('/dashboard');
        })
        .catch((err) => {
          const errors = err.response.data.message;
          errors.forEach((item) => {
            swal('Error', `${item.slice(' ')}`, 'error');
          });
        });
    },

    editProduct(context, payload) {
      axios({
        method: 'PUT',
        url: `${baseUrl}/products/${payload.id}`,
        headers: {
          access_token: localStorage.access_token,
        },
        data: {
          name: payload.name,
          img_url: payload.img_url,
          price: payload.price,
          stock: payload.stock,
        },
      })
        .then(({ data }) => {
          console.log(data);
          router.push('/dashboard');
          swal({
            title: 'Success!',
            text: `Product ${payload.name} has been updated`,
            icon: 'success',
            button: 'OK!',
          });
        })
        .catch((err) => {
          const errors = err.response.data.message;
          errors.forEach((item) => {
            swal('Error', `${item}`, 'error');
          });
        });
    },

    deleteProduct(context, id) {
      axios({
        method: 'DELETE',
        url: `${baseUrl}/products/${id}`,
        headers: {
          access_token: localStorage.access_token,
        },
      })
        .then(({ data }) => {
          console.log(data, 'data has been deleted');
          context.commit('SET_DELETE_PRODUCT', id);
          swal('Success!', `${data.name} has benn deleted`, 'success');
        })
        .catch((err) => {
          const errors = err.response.data.message;
          swal({
            title: 'Error!',
            text: `${errors}`,
            icon: 'success',
            button: 'OK!',
          });
        });
    },
  },
  modules: {
  },
});
