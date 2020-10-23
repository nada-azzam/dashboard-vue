import http from "../../config/http";
import endpoints from "../endpoints";
const userApiUrl=endpoints.USER_ENDPOINT
export default {
    getUserList() {
        return http.get(userApiUrl).then(res => {
            return res;
        });
    },
    showUser(id){
        return http.get(`${userApiUrl}/${id}`).then(res => {
            return res;
        });
    },
    createUser(user){
        return http.post(userApiUrl,user).then(res => {
            return res;
        });
    },
    updateUser(id,user){
         return http.put(`${userApiUrl}/${id}`,user).then(res => {
            return res;
        });
    },
    deleteUser(id){
         return http.delete(`${userApiUrl}/${id}`).then(res => {
            return res;
        });
    },


}