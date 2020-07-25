import Vue from 'vue';
import Vuex from 'vuex';
import axios from 'axios';
import Swal from 'sweetalert2';
import router from '../router/index';

Vue.use(Vuex);
const baseUrl = 'http://localhost:3000';

export default new Vuex.Store({
  state: {
    products: [],
    product: null,
    showModal: false,
    userName: '',
  },
  mutations: {
    SET_PRODUCTS(state, allProducts) {
      state.products = allProducts;
    },
    SET_NEW_PRODUCT(state, newProduct) {
      state.products.push(newProduct);
    },
    DESTROY_PRODUCT(state, deletedProduct) {
      const result = state.products.filter((product) => product.id !== deletedProduct);

      state.products = result;
    },
    GET_PRODUCT_BY_ID(state, productById) {
      state.product = productById;
    },
    UPDATE_PRODUCT(state, updatedProduct) {
      const result = state.products.filter((product) => product.id !== updatedProduct.id);
      result.push(updatedProduct);
      // state.products = result.sort((a, b) => (a.id > b.id ? 1 : b.id > a.id ? -1 : 0));
      state.products = result.sort((a, b) => {
        if (a.id > b.id) {
          return 1;
        } if (b.id > a.id) {
          return -1;
        }
        return 0;
      });
    },
    changeShowModal(state, status) {
      state.showModal = status;
    },
    SET_USERNAME(state, userName) {
      state.userName = userName;
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
          localStorage.setItem('userName', data.email);
          payload.toDashboard();
          context.commit('SET_USERNAME', data.email);
        })
        .catch(() => {
          Swal.fire({
            icon: 'error',
            title: 'Invalid Email or Password',
            text: 'Please fill your email correctly',
          });
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
          context.commit('SET_PRODUCTS', data);
        })
        .catch(() => {
          Swal.fire({
            icon: 'error',
            title: 'Something Wrong',
          });
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
          Swal.fire({
            icon: 'success',
            title: 'Success Adding New Product',
          });
          context.commit('SET_NEW_PRODUCT', data);
          payload.toDashboard();
        })
        .catch(() => {
          Swal.fire({
            icon: 'error',
            title: 'Please fill form correctly',
          });
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
          context.commit('DESTROY_PRODUCT', payload);
          Swal.fire({
            icon: 'success',
            title: 'your item has been deleted?',
          });
        })
        .catch(() => {
          Swal.fire({
            icon: 'error',
            title: 'Something Wrong',
          });
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
          context.commit('GET_PRODUCT_BY_ID', data);
          router.push({ name: 'DetailPage', params: { id: data.id } });
        })
        .catch(() => {
          Swal.fire({
            icon: 'error',
            title: 'Something Wrong',
          });
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
          // router.push({ name: "ProductPage" });
          context.commit('changeShowModal', false);

          Swal.fire({
            icon: 'success',
            title: 'Success Edit New Product',
          });
          context.commit('UPDATE_PRODUCT', data);
        })
        .catch(() => {
          Swal.fire({
            icon: 'error',
            title: 'Please fill form correctly',
          });
        });
    },
    logout(context, payload) {
      localStorage.clear();
      payload();
    },
  },
  modules: {},
});
