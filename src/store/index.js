import Vue from 'vue'
import Auth from './modules/auth'
import Users from './modules/auth'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
  },
  mutations: {
  },
  actions: {
  },
  modules: {
    Auth,
    Users
  }
})
