import http from "../../config/http";
import endpoints from "../endpoints";
const resourcesApiUrl=endpoints.UNKNOWN_ENDPOINT
export default {
    getResourcesList() {
        return http.get(resourcesApiUrl).then(res => {
            return res;
        });
    },
    showResources(id){
        return http.get(`${resourcesApiUrl}/${id}`).then(res => {
            return res;
        });
    },
   


}