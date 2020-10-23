import http from '../../config/http';
import endpoints from '../../services/endpoints';
const userApiUrl = endpoints.USER_ENDPOINT
 const users = {
    state: {
        userList: null
    },
    mutations: {
        USER_LIST(state, userList) {
            state.userList = userList
        },
    },
    actions: {
        getUserList({ commit }, pageNumber) {
            http.get(`${userApiUrl}?page=${pageNumber}`).then(res => {
                commit("USER_LIST", res.data);
                // console.log(res.data)
                return res

            })
        }
    },
    getters: {
        users: state => state.userList
    },

};
export default users;