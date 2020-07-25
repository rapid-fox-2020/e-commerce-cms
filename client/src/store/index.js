import Vue from 'vue';
import Vuex from 'vuex';
import Axios from 'axios';
import router from '../router';

Vue.use(Vuex);
const BaseUrl = 'http://localhost:3001/'
const WebUrl = ''

export default new Vuex.Store({
    state: {
        products: [],
        email: localStorage.getItem('emailName'),
        isLogin: false,
    },
    mutations: {
        SET_LOGIN(state, payload) {
            state.isLogin = payload;
            state.email = localStorage.getItem('emailName');
        },
        SET_LOGOUT() {
            this.isLogin = false;
            localStorage.clear();
        },
        GET_PRODUCTS(state, payload) {
            state.products = payload;
        },
        SET_DELETE(state, payload) {
            state.products = state.products.filter((product) => product.id !== payload);
        },
    },
    actions: {
        login(context, payload) {
            Axios({
                    method: 'POST',
                    url: 'http://localhost:3001/login',
                    data: {
                        email: payload.email,
                        password: payload.password,
                    },
                })
                .then((result) => {
                    console.log(result);
                    localStorage.setItem('access_token', result.data.access_token);
                    localStorage.setItem('emailName', result.data.email);
                    context.commit('SET_LOGIN', true);
                    router.push({ path: '/Products' });
                }).catch((err) => {
                    console.log(err);
                });
        },
        fetchProduct(context) {
            Axios({
                    method: 'GET',
                    url: 'http://localhost:3001/products',
                    headers: { access_token: localStorage.access_token },
                })
                .then((result) => {
                    context.commit('GET_PRODUCTS', result.data);
                }).catch((err) => {
                    console.log(err);
                });
        },
        addProduct(context, payload) {
            Axios({
                    method: 'POST',
                    url: 'http://localhost:3001/products',
                    headers: { access_token: localStorage.access_token },
                    data: {
                        name: payload.name,
                        image_url: payload.image_url,
                        price: payload.price,
                        stock: payload.stock,
                    },
                })
                .then(() => {
                    router.push({ name: 'Products' });
                    swal({
                        title: "Good job!",
                        text: "You clicked the button!",
                        icon: "success",
                        button: "Aww yiss!",
                    });
                }).catch((err) => {
                    swal({
                        title: `${err.response.data.message}`,
                        text: "You clicked the button!",
                        icon: "error",
                        button: "Aww yiss!",
                    });
                });
        },
        updateProduct(context, payload) {
            console.log(payload);
            Axios({
                    method: 'PUT',
                    url: `http://localhost:3001/products/${payload.id}`,
                    headers: { access_token: localStorage.access_token },
                    data: {
                        name: payload.name,
                        image_url: payload.image_url,
                        price: payload.price,
                        stock: payload.stock,
                    },
                })
                .then(() => {
                    router.push({ path: '/Products' });
                }).catch((err) => {
                    console.log(err);
                });
        },
        deleteProduct(context, payload) {
            Axios({
                    method: 'DELETE',
                    url: `http://localhost:3001/products/${payload}`,
                    headers: { access_token: localStorage.access_token },
                })
                .then(() => {
                    context.commit('SET_DELETE', payload);
                }).catch((err) => {
                    console.log(err);
                });
        },
    },
    modules: {},
});