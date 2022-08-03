import { get } from "../Utils/request.js"
import { setSession, getSession } from '../Utils/index.js';
export default {
    namespaced: true,
    state: {
        cradList: [],
        orderpageChecked: 1,
    },
    mutations: {
        listThe (state, payload) {
            state.waterList = payload;
        },
    },
    actions: {

    }
}