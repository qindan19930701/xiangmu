import Vue from 'vue'
import Router from 'vue-router'
import Login from '@/components/login.vue'
import Home from '../components/home.vue'
import Users from '../components/users.vue'
import Rigths from '../components/rights.vue'
Vue.use(Router)

export default new Router({
  routes: [
    {
      name: 'home',
      path: '/',
      component: Home,
      children: [{
        name: 'users',
        path: '/users',
        component: Users
      }, {
        name: 'rights',
        path: '/rights',
        component: Rigths
      }]
    }, {
      name: 'login',
      path: '/login',
      component: Login
    }
  ]
})
