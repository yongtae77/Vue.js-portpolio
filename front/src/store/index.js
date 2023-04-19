import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
    state: {
        // 사용자 상태
        user: null,
    },
    getters: {

    },
    mutations: {
        // 로그인 사용자
        setUser(state, user) {
            state.user = user
        },
        // 로그아웃
        logout(state) {
            state.user = null
        },
    },
    actions: {


    },
    modules: {
    }
})

