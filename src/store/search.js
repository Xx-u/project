import { get } from "../Utils/request.js"
import { setSession, getSession } from '../Utils/index.js';
export default {
    namespaced: true,
    state: {
        oldList: getSession('oldSearch') || [],
    },
    mutations: {
        oldlist (state, payload) {
            state.oldList.unshift(payload)
            if (state.oldList.length > 10) {
                state.oldList.pop()
            }
            setSession('oldSearch', state.oldList);
        },
        dellist (state) {
            state.oldList = []
            setSession('oldSearch', state.oldList);
        }
    },
    actions: {
        changoldlist ({ commit }, data) {
            commit('oldlist', data);
        },
        delList ({ commit }) {
            commit('dellist')
        }
    }
}