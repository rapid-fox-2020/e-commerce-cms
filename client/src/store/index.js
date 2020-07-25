import Vue from 'vue';
import Vuex from 'vuex';
import axios from 'axios';
import router from '../router';
import VueSweetalert2 from 'vue-sweetalert2';

const Swal = require('sweetalert2')
Vue.use(Vuex);
Vue.use(VueSweetalert2)
// const url = `https://stormy-wave-88070.herokuapp.com`
const url = `http://localhost:3000`
export default new Vuex.Store({
  state: {
    products: [],
  },
  mutations: {
    SET_PRODUCT(state, payload) {
      state.products = payload
    },
    // SET_LOGIN(state,token){
    //   localStorage
    // }
  },
  actions: {
    getProducts(context) {
      axios({
        method: 'get',
        url: url + '/products',
        headers:{
          access_token:localStorage.access_token
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
      // console.log(payload);
      axios({
        method: 'post',
        url: `${url}/login`,
        data: {
          email: payload.email,
          password: payload.password
        }
      })
        .then(result => {
          // console.log(result.data);
          localStorage.setItem('access_token', result.data.token)
          router.push({ name: 'Products' })

        }).catch(err => {
          console.log(err);
        })
    },
    deleteProduct({ dispatch }, productId) {
      // console.log(productId);
      axios({
        method: 'delete',
        url: `${url}/products/${productId}`,
        headers:{
          access_token:localStorage.access_token
        }
      })
        .then((destroy) => {
          // console.log(destroy, 'result deltet');
          if (destroy) {
            Swal.fire(
              'Deleted!',
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

        },headers:{
          access_token:localStorage.access_token
        }
        
      })

        .then((result) => {
          console.log(result);
          router.push({ name: 'Products' })

        }).catch((err) => {
          console.log(err);
        });
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
        }
      })
        .then((result) => {
          console.log(result);
          router.push({ name: 'Products' })

        }).catch((err) => {
          console.log(err);
        });
    }



  },
  modules: {
  },
  created() {

  },
});
