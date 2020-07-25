import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'




Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    isLogin: false,
    products: []
  },
  //tugas mutation untuk mengubah state variable
  mutations: {
    SET_LOGIN(state,payload){
      state.isLogin = payload
    },
    SET_PRODUCTS(state,payload){
      state.products = payload
      console.log(state.products, "ini console.log mutation product")
    },
    ADD_PRODUCT(state,payload){
      state.products.push({payload})
    },
    DELETE_PRODUCT(state, payload){
      state.products = state.products.filter(product => product.id !== payload)
    },
    EDIT_PRODUCT(state,payload){
      state.products.push({payload})
    }
  },
  actions: {
    login(context, payload){
      axios({
        method: "post",
        url: "https://mycmspt2.herokuapp.com/login",
        data: {email: payload.email, password: payload.password}
      })
      .then(result => {
        console.log(result)
        localStorage.setItem("token",result.data.token)
        context.commit("SET_LOGIN", true)
        payload.cb()
      })
      .catch(err => {
        console.log(err)
      })

    },

    fetchProduct(context){
      console.log('MASUK')
      axios({
        method: "get",
        url: "https://mycmspt2.herokuapp.com/products/",
        headers: {
          token: localStorage.token
        }
      })
      .then(result => {
        console.log("INI THEN FETCH",result) 
        //commit untuk memanggil mutation
        context.commit("SET_PRODUCTS", result.data)
      })
      .catch(err => {
        console.log(err)
      })
    },

    addProduct(context,payload){
      console.log(payload)
      axios({
        method: "post",
        url: "https://mycmspt2.herokuapp.com/products/",
        data: {
            name: payload.product.name,
            price: payload.product.price,
            stock: payload.product.stock,
            img_url: payload.product.img_url,
        },
        headers: {
          token: localStorage.token
        }
      })
      .then(result => {
        context.commit("ADD_PRODUCT",result.data)
        payload.cb()
      })
      .catch(err => {
        console.log(err)
      })
    },

    deleteProduct(context,payload){
      // console.log(payload,"ini payload delete")
      Swal.fire({
        title: 'Are you sure?',
        text: "You won't be able to revert this!",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Yes, delete it!'
      }).then((result) => {
        if (result.value) {
          axios({
            method: "delete",
            url: `https://mycmspt2.herokuapp.com/products/${payload}`,
            headers: {
              token: localStorage.token
            }
          })
          .then(result => {
            Swal.fire(
              'Deleted!',
              'Your file has been deleted.',
              'success'
          )
            context.commit('DELETE_PRODUCT', payload)
            
          })
          .catch(err =>{
            console.log(err)
          })  
        }
      })
    },

    getDataById(context,payload){
      console.log(payload, "ini payload getdata")
      axios({
        method: "get",
        url: `https://mycmspt2.herokuapp.com/products/${payload.id}`,
        headers: {
          token: localStorage.token
        }
      })
      .then(result => {
        payload.cb(result.data) 
      })
      .catch(err => {
        console.log(err)
      })
    },

    editProduct(context,payload){
      console.log(payload)
      axios({
        method: "put",
        url: `https://mycmspt2.herokuapp.com/products/${payload.id}`,
        data: {
          name: payload.name,
          price: payload.price,
          stock: payload.stock,
          img_url: payload.img_url,
      },
        headers: {
          token: localStorage.token
        }
      })
      .then(result => {
        context.commit("EDIT_PRODUCT",result.data)
      })
      .catch(err => {
        console.log(err)
      })
    }

  },
  modules: {
  }
})
