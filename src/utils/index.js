import Vue from 'vue'
import { ext } from './register'

Vue.utils = Vue.prototype.$utils = window.utils = {}

Vue.utils.install = function (Vue, options) {
  Object.keys(ext).forEach(key => {
    Vue.utils[key] = ext[key]
    window.utils[key] = ext[key]
    Object.defineProperties(Vue.prototype.$utils, {
      [key]: {
        get () {
          return ext[key]
        }
      }
    })
  })
}

Vue.use(Vue.utils)

export default Vue.utils
