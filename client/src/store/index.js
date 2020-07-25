import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'
import router from '../router'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    isLogin: false,
    products: []
  },
  mutations: {
    SET_LOGIN(state, payload) {
      state.isLogin = payload
    },
    GET_PRODUCT(state, payload) {
      state.products = payload
    },
    ADD_PRODUCT(state, payload) {

    },
    DELETE_PRODUCT(state, payload) {
      state.products = state.products.filter(product => product.id != payload)
    }
  },
  actions: {
    login(context, payload) {
      axios({
        method: `post`,
        url: `http://localhost:3000/login`,
        data: {
          email: payload.email,
          password: payload.password
        }
      })
        .then(result => {
          console.log(result)
          localStorage.setItem(`access_token`, result.data.access_token)
          context.commit(`SET_LOGIN`, true)
          router.push({ path: '/home' })
            .catch(err => {
              console.log(err)
            })
        })
        .catch(err => {
          console.log(err)
        })
      console.log(payload)
    },
    fetchProduct(context) {
      axios({
        method: `get`,
        url: `http://localhost:3000/products/`,
        headers: {
          access_token: localStorage.access_token
        }
      })
        .then(result => {
          console.log(`MASUK THEN FETCH PRODUCT`, result.data)
          context.commit(`GET_PRODUCT`, result.data)
        })
        .catch(err => {
          console.log(err)
        })
    },
    editProduct(context, payload) {
      console.log(payload)
      axios({
        method: `put`,
        url: `http://localhost:3000/products/${payload.id}`,
        data: {
          name: payload.name,
          image_url: payload.image_url,
          price: payload.price,
          stock: payload.stock
        },
        headers: {
          access_token: localStorage.access_token
        }
      })
        .then(result => {
          console.log(result)
          this.fetchProduct()
        })
        .catch(err => {
          console.log(err)
        })
    },
    deleteProduct(context, payload) {
      // console.log(`ini payload delete >>`, payload)
      axios({
        method: `delete`,
        url: `http://localhost:3000/products/${payload}`,
        headers: {
          access_token: localStorage.access_token
        }
      })
        .then(result => {
          console.log(`iniresult>>>`, result)
          context.commit(`DELETE_PRODUCT`, payload)
        })
        .catch(err => {
          console.log(err)
        })
    },
    addProduct(context, payload) {
      axios({
        method: `post`,
        url: `http://localhost:3000/products/`,
        data: {
          name: payload.name,
          image_url: payload.image_url,
          price: payload.price,
          stock: payload.stock
        },
        headers: {
          access_token: localStorage.access_token
        }
      })
        .then(result => {
          console.log(`add sukses`)
          router.push({ path: '/home' })
        })
        .catch(err => {
          console.log(err)
        })
    },
  },
  modules: {
  }
})
