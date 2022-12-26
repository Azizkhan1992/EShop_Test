import Vue from 'vue';
import axios from 'axios';
import TokenService from '../services/token-service';

const baseUrl = 'https://eshop-products.herokuapp.com/api/';
// const baseUrl = 'http://task3.loc/api/'

const instance = axios.create({
    baseURL: baseUrl,
    headers: {
        common: {
            'X-Requested-With': 'XMLHttpRequest'
        }
    }
});

instance.interceptors.request.use(config => {
    const TOKEN = TokenService.getToken();

    if (TOKEN) {
        config.headers.Authorization = 'Bearer ' + TOKEN;
    }

    return config;
}, error => Promise.reject(error));

instance.interceptors.response.use(response => response, error => {
    if (error.response && error.response.status === 401) {
        TokenService.removeAll();
        this.$router.push({ name: 'home' });
    }

    if (error?.response?.status) {
        Vue.prototype.$notify.error(error.response.statusText);
    }

    return Promise.reject(error);
})


Vue.prototype.$api = instance;