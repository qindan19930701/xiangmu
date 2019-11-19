import axios from 'axios'
const HttpServer = {}
HttpServer.install = function (Vue) {
  axios.defaults.baseURL = 'http://localhost:8888/api/private/v1/'
  const token = localStorage.getItem('token')
  axios.defaults.headers.common['Authorization'] = token

  Vue.prototype.$http = axios
}
export default HttpServer
