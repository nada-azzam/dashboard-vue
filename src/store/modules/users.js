import http from '../../config/http';
import endpoints from '../../services/endpoints';
const userApiUrl = endpoints.USER_ENDPOINT
export const user = {
    namespaced: true,
    state: {
        userList: null
    },
    mutations: {
        USER_LIST(state, userList) {
            state.userList = userList
        },
    },
    actions: {
        userList({ commit }, pageNumber) {
            http.get(`${userApiUrl}?page${pageNumber}`).then(res => {
                commit("USER_LIST", res.data);
                console.log(res)

            })
        }
    },
    getters: {
        getSearchList: state => state.userList
    },

};
export default loader;