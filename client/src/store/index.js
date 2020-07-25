import Vue from 'vue';
import Vuex from 'vuex';
import axios from 'axios';
import swal from 'sweetalert';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    products: [],
    banners: [],
    ProductByCategory: [],
    categories:[],
    isLoggedIn: '',
    emailLogin: '',
    passwordLogin: '',
    id: '',
    name: '',
    image_url: '',
    price: '',
    stock: '',
    category: '',
    banner_id: '',
    banner_image_url: '',
    banner_status: '',
  },
  mutations: {
    SET_LOGIN(state, payload) {
      localStorage.accessToken = payload;
      state.isLoggedIn = true;
      state.emailLogin = '';
      state.passwordLogin = '';
    },
    SET_ISLOGIN(state){
      state.isLoggedIn = true;
    },
    SET_PRODUCTS(state, payload) {
      state.products = payload;
    },
    SET_BANNERS(state, payload) {
      state.banners = payload;
    },
    SET_CATEGORIES(state, payload) {
      state.categories = payload;
    },
    SET_PRODUCTBYCATEGORY(state, payload) {
      state.ProductByCategory = payload
    },
    SET_ADDPRODUCT(state) {
      state.name = '';
      state.url = '';
      state.price = '';
      state.stock = '';
      state.category = '';
    },
    SET_ADDBANNER(state) {
      state.banner_image_url = '';
      state.banner_status = '';
      state.banner_id = '';
    },
    SET_PRODUCTBYID(state, payload) {
      state.id = payload.id;
      state.name = payload.name;
      state.url = payload.image_url;
      state.price = payload.price;
      state.stock = payload.stock;
      state.category = payload.category;
    },
    SET_BANNERBYID(state, payload) {
      state.banner_id = payload.id;
      state.banner_image_url = payload.image_url;
      state.banner_status = payload.status;
    },
    SET_EDITPRODUCT(state) {
      state.id = '';
      state.name = '';
      state.url = '';
      state.price = '';
      state.stock = '';
      state.category = '';
    },
    SET_EDITBANNER(state) {
      state.banner_image_url = '';
      state.banner_status = '';
      state.banner_id = '';
    },
    SET_IDPRODUCT(state, payload) {
      state.id = payload;
    },
    SET_IDBANNER(state, payload) {
      state.banner_id = payload;
    },
    SET_DELETEPRODUCT(state) {
      state.id = '';
    },
    SET_DELETEBANNER(state) {
      state.banner_id = '';
    },
    SET_LOGOUT(state) {
      localStorage.clear();
      state.isLoggedIn = false;
    },
    SET_EMPTYDATA(state) {
      state.id = '';
      state.name = '';
      state.url = '';
      state.price = '';
      state.stock = '';
      state.category = '';
    },
    SET_EMPTYDATABANNER(state) {
      state.banner_image_url = '';
      state.banner_status = '';
      state.banner_id = '';
    },
  },
  actions: {
    login(context) {
      return new Promise((resolve, reject) => {
        axios({
          method: 'post',
          url: 'https://nameless-ocean-59312.herokuapp.com/login',
          data: {
            email: this.state.emailLogin,
            password: this.state.passwordLogin,
          },
        })
          .then((results) => {
            context.commit('SET_LOGIN', results.data.accessToken);
            resolve();
          })
          .catch((err) => {
            console.log(err)
            reject(err);
            swal('Failed!', 'Email/ Password Incorrect', 'error');
          });
      });
    },
    getProducts(context) {
      axios({
        method: 'get',
        url: 'https://nameless-ocean-59312.herokuapp.com/products',
        headers: {
          token: localStorage.accessToken,
        },
      })
        .then((results) => {
          context.commit('SET_PRODUCTS', results.data);
        })
        .catch((err) => {
          console.log(err);
        // swal("Failed!", "Please Try Again", "error");
        });
    },
    getBanners(context) {
      axios({
        method: 'get',
        url: 'https://nameless-ocean-59312.herokuapp.com/banners',
        headers: {
          token: localStorage.accessToken,
        },
      })
        .then((results) => {
          context.commit('SET_BANNERS', results.data);
        })
        .catch((err) => {
          console.log(err);
        // swal("Failed!", "Please Try Again", "error");
        });
    },
    addProduct(context) {
      return new Promise((resolve, reject) => {
        axios({
          method: 'post',
          url: 'https://nameless-ocean-59312.herokuapp.com/products',
          data: {
            name: this.state.name,
            image_url: this.state.url,
            price: this.state.price,
            stock: this.state.stock,
            category: this.state.category,
          },
          headers: {
            token: localStorage.accessToken,
          },
        })
          .then(() => {
            context.commit('SET_ADDPRODUCT');
            swal('Success!', 'You have added a product', 'success');
            resolve();
          })
          .catch((err) => {
            reject(err);
            swal('Failed!', 'Please Try Again', 'error');
          });
      });
    },
    addBanner(context) {
      return new Promise((resolve, reject) => {
        axios({
          method: 'post',
          url: 'https://nameless-ocean-59312.herokuapp.com/banners',
          data: {
            image_url: this.state.banner_image_url,
            status: this.state.banner_status,
          },
          headers: {
            token: localStorage.accessToken,
          },
        })
          .then(() => {
            context.commit('SET_ADDBANNER');
            swal('Success!', 'You have added a banner', 'success');
            resolve();
          })
          .catch((err) => {
            reject(err);
            swal('Failed!', 'Please Try Again', 'error');
          });
      });
    },
    getProductById(context, payload) {
      axios({
        method: 'get',
        url: `https://nameless-ocean-59312.herokuapp.com/products/${payload}`,
        headers: {
          token: localStorage.accessToken,
        },
      })
        .then((results) => {
          context.commit('SET_PRODUCTBYID', results.data);
        })
        .catch((err) => {
          console.log(err);
          // swal("Failed!", "Please Try Again", "error");
        });
    },
    getBannerById(context, payload) {
      axios({
        method: 'get',
        url: `https://nameless-ocean-59312.herokuapp.com/banners/${payload}`,
        headers: {
          token: localStorage.accessToken,
        },
      })
        .then((results) => {
          context.commit('SET_BANNERBYID', results.data);
        })
        .catch((err) => {
          console.log(err);
          // swal("Failed!", "Please Try Again", "error");
        });
    },
    editProduct(context) {
      return new Promise((resolve, reject) => {
        axios({
          method: 'put',
          url: `https://nameless-ocean-59312.herokuapp.com/products/${this.state.id}`,
          headers: {
            token: localStorage.accessToken,
          },
          data: {
            name: this.state.name,
            image_url: this.state.url,
            image: this.state.image,
            price: this.state.price,
            stock: this.state.stock,
            category: this.state.category,
          },
        })
          .then(() => {
            context.commit('SET_EDITPRODUCT');
            swal('Success!', 'You have edited the product', 'success');
            resolve();
          })
          .catch((err) => {
            reject(err);
            swal('Failed!', 'Please Try Again', 'error');
          });
      });
    },
    editBanner(context) {
      return new Promise((resolve, reject) => {
        axios({
          method: 'put',
          url: `https://nameless-ocean-59312.herokuapp.com/banners/${this.state.banner_id}`,
          headers: {
            token: localStorage.accessToken,
          },
          data: {
            image_url: this.state.banner_image_url,
            status: this.state.banner_status,
          },
        })
          .then(() => {
            context.commit('SET_EDITBANNER');
            swal('Success!', 'You have edited the banner', 'success');
            resolve();
          })
          .catch((err) => {
            reject(err);
            swal('Failed!', 'Please Try Again', 'error');
          });
      });
    },
    deleteProduct(context) {
      return new Promise((resolve, reject) => {
        axios({
          method: 'delete',
          url: `https://nameless-ocean-59312.herokuapp.com/products/${this.state.id}`,
          headers: {
            token: localStorage.accessToken,
          },
        })
          .then(() => {
            context.commit('SET_DELETEPRODUCT');
            swal('Success!', 'You have deleted the product', 'success');
            resolve();
          })
          .catch((err) => {
            reject(err);
            swal('Failed!', 'Please Try Again', 'error');
          });
      });
    },
    deleteBanner(context) {
      return new Promise((resolve, reject) => {
        axios({
          method: 'delete',
          url: `https://nameless-ocean-59312.herokuapp.com/banners/${this.state.banner_id}`,
          headers: {
            token: localStorage.accessToken,
          },
        })
          .then(() => {
            context.commit('SET_DELETEBANNER');
            swal('Success!', 'You have deleted the banner', 'success');
            resolve();
          })
          .catch((err) => {
            reject(err);
            swal('Failed!', 'Please Try Again', 'error');
          });
      });
    },
    getCategories(context) {
      axios({
        method: 'get',
        url: 'https://nameless-ocean-59312.herokuapp.com/products',
        headers: {
          token: localStorage.accessToken,
        },
      })
        .then((results) => {
          let categories = []
          for(let i = 0 ;i < results.data.length; i++){
            if(categories.includes(results.data[i].category) === false){
              categories.push(results.data[i].category)
            }
          }
          context.commit('SET_CATEGORIES', categories);
        })
        .catch((err) => {
          console.log(err);
        // swal("Failed!", "Please Try Again", "error");
        });
    },
    getByCategory(context,payload) {
      axios({
        method: 'get',
        url: 'https://nameless-ocean-59312.herokuapp.com/products',
        headers: {
          token: localStorage.accessToken,
        },
      })
        .then((results) => {
          let data = []
          for(let i = 0; i < results.data.length; i++){
            if(results.data[i].category == payload){
              data.push(results.data[i])
            }
          }
          context.commit('SET_PRODUCTBYCATEGORY', data);
        })
        .catch((err) => {
          console.log(err);
        // swal("Failed!", "Please Try Again", "error");
        });
    },
  },
  getters: {

  },
  modules: {
  },
});
