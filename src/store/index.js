import Vue from 'vue'
import Auth from './modules/auth'
import Users from './modules/users'
import Resourses from './modules/resources'
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
    Users,
    Resourses
  }
})
