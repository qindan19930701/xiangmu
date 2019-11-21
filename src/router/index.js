import Vue from 'vue'
import Router from 'vue-router'
import {Message} from 'element-ui'
import Login from '@/components/login.vue'
import Home from '../components/home.vue'
import Users from '../components/users.vue'
import Rigths from '../components/rights.vue'
import Roles from '../components/roles.vue'
import Goods from '../components/goodslist.vue'
import Goodsadd from '../components/goodsadd.vue'
import Params from '../components/params.vue'
import Categories from '../components/goodscate.vue'
Vue.use(Router)

const router= new Router({
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
      }, {
        name: 'roles',
        path: '/roles',
        component: Roles
      },{
        name:'goods',
        path:'/goods',
        component:Goods
      },{
        name:'goodsadd',
        path:'/goodsadd',
        component:Goodsadd
      },{
        name:'params',
        path:'/params',
        component:Params
      },{
        name:'categories',
        path:'/categories',
        component:Categories
      }]
    }, {
      name: 'login',
      path: '/login',
      component: Login
    }
  ]
})
// 表示改变--路由配置--配置生效前--守卫--next（）--配置生效
// to--要去的
// from--当前的
// next（）继续执行当前的
// 注意： router/index.js中的this不是Vue实例
//  this.$router---router
//  提示框需要单独引入 import {Message} from 'element-ui' 在使用Message.warning('请先登录----')
router.beforeEach((to,from,next)=>{
  if (to.name==='login'){
    next()
  }else {
    const token = localStorage.getItem('token')
    if (!token) {
     Message.warning('请先登录----')
      router.push({
        name:'login'
      })
      return
    }
    next()
  }
})
export default router