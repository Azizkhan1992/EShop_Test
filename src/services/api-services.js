import Vue from "vue";

export default {
    api: Vue.prototype.$api,

    // products API
    getProducts(params) {
        return this.api.get(`products${params}`);
    },

    getProduct(slug) {
        return this.api.get(`products/${slug}`);
    },

    // Auth API

    login(form) {
        return this.api.post(`login`, form);
    },

    logout() {
        return this.api.post('logout');
    },

    register(form) {
        return this.api.post('register', form);
    },

    // comments API
    getComments(productId, params) {
        return this.api.get(`comments/${productId}${params}`);
    },

    writeComment(form) {
        return this.api.post(`comments`, form);
    },

    vote(form) {
        return this.api.post(`comments/rate`, form)
    }
}