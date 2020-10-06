import Vue from 'vue';
import Vuex from 'vuex';
import axios from 'axios';
import router from '../router';
import VueSweetalert2 from 'vue-sweetalert2';

const Swal = require('sweetalert2')
Vue.use(Vuex);
Vue.use(VueSweetalert2)
const url = `https://stormy-wave-88070.herokuapp.com`
// const url = `http://localhost:3000`
export default new Vuex.Store({
  state: {
    products: [],
  },
  mutations: {
    SET_PRODUCT(state, payload) {
      state.products = payload
    },
  },
  actions: {
    getProducts(context) {
      axios({
        method: 'get',
        url: url + '/products',
        headers: {
          access_token: localStorage.access_token
        }
      })
        .then((result) => {
          console.log(result);
          context.commit('SET_PRODUCT', result.data)
        }).catch((err) => {
          console.log(err);
        });
    },
    postLogin({ commit }, payload) {
      axios({
        method: 'post',
        url: `${url}/login`,
        data: {
          email: payload.email,
          password: payload.password
        }
      })
        .then(result => {
          localStorage.setItem('access_token', result.data.token)
          router.push({ name: 'Products' })
          Swal.fire(
            'Success Login!',
            ``,
            'success'
          )

        }).catch(err => {
          Swal.fire(
            'Login Error!',
            `${err.response.data.errors}`,
            'error'
          )
        })
    },
    deleteProduct({ dispatch }, productId) {
      axios({
        method: 'delete',
        url: `${url}/products/${productId}`,
        headers: {
          access_token: localStorage.access_token
        }
      })
        .then((destroy) => {
          if (destroy) {
            Swal.fire(
              'Success Delete Product',
              `${destroy.data.name}`,
              'success'
            )
            dispatch('getProducts')
          }
        }
        ).catch((err) => {
          console.log(err);
        });
    },
    addProduct({ commit }, newProduct) {
      axios({
        method: 'post',
        url: `${url}/products`,
        data: {
          name: newProduct.name,
          price: newProduct.price,
          stock: newProduct.stock,
          image_url: newProduct.image_url
        },
        headers: {
          access_token: localStorage.access_token
        }
      })
        .then((result) => {
          if (result) {
            Swal.fire(
              'Success Add Product',
              `${result.data.name}`,
              'success'
            )
            router.push({ name: 'Products' })
          }

        }).catch((err) => {
          console.log(err);
          if (err) {
            let allErrors = err.response.data.errors.reverse()
            allErrors.forEach(err => {
              Swal.fire(
                'please fill out this field',
                `${err}`,
                'error'
              )
            })
          }
        })
    },
    editProduct({ commit }, setProduct) {
      axios({
        method: 'put',
        url: `${url}/products/${setProduct.id}`,
        data: {
          name: setProduct.name,
          price: setProduct.price,
          stock: setProduct.stock,
          image_url: setProduct.image_url
        },
        headers: {
          access_token: localStorage.access_token
        }
      })
        .then((result) => {
          Swal.fire(
            'Success Update Product',
            `${result.data.name}`,
            'success'
          )
          router.push({ name: 'Products' })
        }).catch((err) => {
          err.response.data.errors.reverse().forEach(err => {
            Swal.fire(
              'please fill out this field',
              `${err}`,
              'error'
            )
          })
        });
    }
  },
  modules: {
  },
  created() {

  },
});
