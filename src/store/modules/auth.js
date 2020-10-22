import Vue from 'vue'
import axios from 'axios'
import endpoints from '../../services/endpoints'

const signinApiUrl = endpoints.SIGN_IN_ENDPOINT
const signupApiUrl = endpoints.SIGN_UP_ENDPOINT

export const auth = {
    namespaced: true,
    state: {
        isLoggining: false,
        status: '',
        token: localStorage.getItem('token') || '',
        admin: localStorage.getItem('user_id') || {},

    },
    mutations: {
        auth_request(state) {
            state.status = 'loading'
        },
        auth_success(state, token) {
            state.status = 'success'
            state.token = token
        },
        auth_user(state, admin) {
            state.admin = admin
        },
        auth_error(state) {
            state.status = 'error'
        },
        logout(state) {
            state.status = ''
            state.token = ''
        }
    },
    actions: {
        signIn({ commit }, userData) {
            return new Promise((resolve, reject) => {
                commit('auth_request')
                axios({ url: signinApiUrl, data: userData, method: 'POST' })
                    .then(resp => {


                        const token = resp.data.token
                        const bearerToken = 'Bearer ' + token
                        localStorage.setItem('token', token)
                        Vue.prototype.$http.defaults.headers.common['Authorization'] = bearerToken
                        commit('auth_success', bearerToken)
                        resolve(resp)
                    })
                    .catch(err => {

                        commit('auth_error')
                        localStorage.removeItem('token')
                        reject(err)
                    })
            })
        },
        signUp({ commit }, userData) {
            return new Promise((resolve, reject) => {
                commit('auth_request')
                axios({ url: signupApiUrl, data: userData, method: 'POST' })
                    .then(resp => {
                        if (resp.status == 400) {
                            console.log(commit)
                            commit('auth_error')
                            reject(400)

                        }

                        if (resp.status == 200) {
                            const token = resp.data.token
                            const bearerToken = 'Bearer ' + token
                            const loginUser = resp.data.user
                            localStorage.setItem('token', token)
                            localStorage.setItem('user_id', loginUser)
                            Vue.prototype.$http.defaults.headers.common['Authorization'] = bearerToken
                            commit('auth_success', bearerToken)
                            commit('auth_user', loginUser)
                            resolve(resp)
                        }
                    })
                    .catch(err => {
                        commit('auth_error')
                        localStorage.removeItem('token')
                        reject(err)
                    })
            })
        },


        logout({ commit }) {
            return new Promise((resolve) => {
                commit('logout')
                localStorage.removeItem('token')
                delete Vue.prototype.$http.defaults.headers.common['Authorization']
                resolve()
            })
        },


    },
    getters: {
        isLoggedIn: state => !!state.token,
        authStatus: state => state.status,
        userData: state => state.admin
    }

}
export default auth;