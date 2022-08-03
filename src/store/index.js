import { createStore } from 'vuex'
import { setSession, getSession } from '../Utils/index.js';
//Vuex--管理数据（共享）
import user from './user.js'
import search from './search.js'
import shoporder from './shoporder.js'
import edit from './edit.js'

// 操作一次保存数据
const myPlugin = (store) => {
    store.subscribe((mutation, state) => {
        if (mutation.type.startsWith("user/")) {

        }
    })
}

export default createStore({
    state: {
        routerType: 'push',
        show: true,
        index: 0
    },
    mutations: {
        changeRouterType (state, newRoterType) {
            state.routerType = newRoterType
        }
    },
    getters: {
        routerType: (state) => state.routerType
    },
    modules: {
        user,
        search,
        shoporder,
        edit,
    },
    plugins: [myPlugin]
})
