import Vue from "vue";
import axios from "axios";
import EndPoints from '../services/endpoints'

const $domain_api = EndPoints.API_URL
const token = localStorage.getItem('token')

const base = axios.create({
        baseURL: $domain_api,
        headers: !token ? {} : {
            'Authorization': 'Bearer ' + token
        }
    })
    // before a request is made start the nprogress
base.interceptors.request.use(config => {
    
    return config
})
base.interceptors.response.use(function(response) {

        // code
        let code = response.data.code


        if (response.data.error == 'Unauthenticated.') {
            localStorage.removeItem('token')
           
            window.location.href = '/login';
        }

        // handel error code



        return response;
    },
    function(error) {
        // Any status codes that falls outside the range of 2xx cause this function to trigger
        // Do something with response error

        const status = error.response.status
        const errors = {
                500: 'Internal Server Error',
                429: 'many request',
            }
       
    }
);
Vue.prototype.$http = base
export default base