import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
    state: {
        isAuth: false,
        rate: '',
        comments: ''
    },
    mutations: {
        getComments(state, comment){
            state.comments = comment
        },
        changeRate(state, rate){
            state.rate = rate.rate
            state.comments.forEach(element => {
                if(element.id == rate.id){
                    element.rate = rate.rate
                }
                // console.log(element, rate)
            });
            // console.log(state.comments, rate)
        },
        changeAuth(state, auth) {
            state.isAuth = auth;
        },
    },
    actions: {
        setAuth({ commit }, auth) {
            commit('changeAuth', auth);
        }
    }
})