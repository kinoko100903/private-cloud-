import Vue from 'vue'
import './utils'
import App from './App.vue'
import router from './router'
import store from './store'
import './plugins/element.js'
import './plugins/axios'

Vue.config.productionTip = false
console.log('Vue.utils:', Vue.utils)
console.log('window.utils:', window.utils)

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
