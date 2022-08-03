import { setSession, getSession } from '../Utils/index.js';
import { post } from '../Utils/request.js'
export default {
    namespaced: true,
    state: {
        //仓库数据作持久化的操作
        isLogin: getSession('isLogin') || '',
        token: getSession('token') || '',
        userID: getSession('id') || '',
        userName: getSession('name') || '',
        userPhone: getSession('phone') || '',
        password: getSession('password') || '',
        header_img: getSession('header_img') || '',
    },
    mutations: {
        changeIsLogin (state, payload) {
            state.isLogin = payload;
            setSession('isLogin', state.isLogin);
        },
        changeToken (state, payload) {
            state.token = payload
            setSession('token', state.token);
        },
        changeId (state, payload) {
            state.userID = payload;
            setSession('id', state.userID);
        },
        changeName (state, payload) {
            state.userName = payload
            setSession('name', state.userName);
        },
        changePhone (state, payload) {
            state.userPhone = payload
            setSession('phone', state.userPhone);
        },
        changePassword (state, payload) {
            state.password = payload
            setSession('password', state.password);
        },
        changeimg (state, payload) {
            state.header_img = payload
            setSession('header_img', state.header_img);
        },
    },
    actions: {
        //异步操作 vuex 上下文 指的是 vuex commit
        changeIsLogin ({ commit }, payload) {
            return new Promise((resolve, reject) => {
                post('/login', payload).then(res => {
                    resolve(res)
                    commit('changeIsLogin', true);
                    commit('changeToken', res.data.result.token);
                    commit('changeId', res.data.result.id);
                    commit('changeName', res.data.result.name);
                    commit('changePhone', res.data.result.phone);
                    commit('changePassword', res.data.result.password);
                    commit('changeimg', res.data.result.header_img);
                }, err => {
                    reject(err)
                })
            })
        }
    }
};
