import http from '../../config/http';
import endpoints from '../../services/endpoints';
const resourcesApiUrl = endpoints.UNKNOWN_ENDPOINT
 const resources = {
    state: {
        resourcesList: null
    },
    mutations: {
        RESOURCES_LIST(state, resourcesList) {
            state.resourcesList = resourcesList
        },
    },
    actions: {
        getResourcesList({ commit }, pageNumber) {
            http.get(`${resourcesApiUrl}?page=${pageNumber}`).then(res => {
                commit("RESOURCES_LIST", res.data);
                // console.log(res.data)
                return res

            })
        }
    },
    getters: {
        resources: state => state.resourcesList
    },

};
export default resources;