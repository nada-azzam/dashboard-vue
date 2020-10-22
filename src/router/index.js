import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import store from '../store' // your vuex store

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home,
    meta: {
      title: 'Home'
    }
  },
  {
    path: '/users',
    name: 'Users',
    component: () => import('../views/Users.vue'),
    meta: {
      title: 'Users'
    }
  },
  {
    path: '/login',
    name: 'login',
    component: () => import('../views/Login.vue'),
    meta: {
      title: 'Login',
      notRequiresAuth: true

    }
  },
  {
    path: '/register',
    name: 'Register',
    component: () => import('../views/Register.vue'),
    meta: {
      title: 'Register'
    }
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})
router.afterEach((to, from, next) => {
  setTimeout(() => {
    const nearestWithTitle = to.matched.slice().reverse().find(r => r.meta && r.meta.title);
    if (nearestWithTitle) document.title = nearestWithTitle.meta.title;
  })
})
router.beforeEach((to, from, next) => {
  if (to.meta.notRequiresAuth) {
    if (store.getters.isLoggedIn) {
      next({ name: 'Home' })
      return
    }
    next()
  } else {
    if (store.getters.isLoggedIn) {
      next()
      return
    }
    next({ name: 'login' })
  }
  next()
})


export default router
