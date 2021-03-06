// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import '@/assets/css/base.css'
import HttpServer from './http'
import router from './router'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import CusBread from './components/cusBread.vue'
import moment from 'moment'
Vue.component('cusBread', CusBread)
Vue.use(HttpServer)
Vue.use(ElementUI)
Vue.config.productionTip = false
Vue.filter('time', (v) => {
  return moment(v).format('YYYY-MM-DD')
})
/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})
