'use strict'

import Vue from 'vue'
import axios from 'axios'

let loading
function startLoading () {
  // 使用Element loading-start 方法
  loading = Vue.utils.Loading.service({
    lock: false,
    text: '加载中...',
    background: 'rgba(0, 0, 0, 0.00)'
  })
}
function endLoading () {
  // 使用Element loading-close 方法
  loading.close()
}
// http错误状态码
const httpError = {
  404: '找不到请求的资源，请稍后重试！',
  500: '服务器发生错误，请稍后重试！',
  502: '网关错误，请稍后重试！',
  503: '服务不可用，服务器暂时过载或维护，请稍后重试！',
  504: '网关超时，请稍后重试！'
}
// http错误处理函数
function httpErrorDeal (errorCode = 0) {
  if (errorCode !== 0 && httpError[errorCode]) {
    Vue.utils.Message.error(httpError[errorCode])
    endLoading()
  } else {
    Vue.utils.Message.error('服务器发生异常，请稍后重试！')
    endLoading()
  }
}

// Full config:  https://github.com/axios/axios#request-config
// axios.defaults.baseURL = process.env.baseURL || process.env.apiUrl || '';
// axios.defaults.headers.common['Authorization'] = AUTH_TOKEN;
// axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded';

let config = {
  // baseURL: process.env.baseURL || process.env.apiUrl || ""
  // timeout: 60 * 1000, // Timeout
  // withCredentials: true // Check cross-site Access-Control
}

const _axios = axios.create(config)

_axios.interceptors.request.use(
  function (config) {
    // Do something before request is sent
    startLoading()
    return config
  },
  function (error) {
    // Do something with request error
    Vue.utils.Message.error('发生了请求错误！')
    endLoading()
    return Promise.reject(error)
  }
)

// Add a response interceptor
_axios.interceptors.response.use(
  function (response) {
    // Do something with response data
    // response.data.data = JSON.parse(response.data.data)
    console.log('response: ', response)
    switch (response.data.data.status) {
      case 'fail':
        Vue.utils.Message.error(response.data.data.errorMsg)
        break
      case 'warning':
        Vue.utils.Message.error(response.data.data.otherData)
        break
    }
    endLoading()
    return response
  },
  function (error) {
    // 发生http响应错误
    console.log('error', error)
    console.log(error.response.data)
    console.log(error.response.status)
    console.log(error.response.headers)

    switch (error.response.status) {
      case 404:
        httpErrorDeal(404)
        break
      case 500:
        httpErrorDeal(500)
        break
      case 502:
        httpErrorDeal(502)
        break
      case 503:
        httpErrorDeal(503)
        break
      case 504:
        httpErrorDeal(504)
        break
      default:
        httpErrorDeal()
    }

    return Promise.reject(error)
  }
)

Plugin.install = function (Vue, options) {
  Vue.axios = _axios
  window.axios = _axios
  Object.defineProperties(Vue.prototype, {
    axios: {
      get () {
        return _axios
      }
    },
    $axios: {
      get () {
        return _axios
      }
    }
  })
}

Vue.use(Plugin)

export default Plugin
