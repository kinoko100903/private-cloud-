import Vue from 'vue'
import Vuex from 'vuex'

import monitor from './modules/monitor.js'

Vue.use(Vuex)
console.log('store/index.js:', Vue.utils)
export default new Vuex.Store({
  state: {
    token: Vue.utils.sessionStorage.getItem('token') || '',
    user: Vue.utils.sessionStorage.getItem('user') || {},
    authStatus: ''
  },

  getters: {
    isLoggedIn: state => !!state.token,
    authStatus: state => state.authStatus,
    userID: state => state.user.userID,
    userName: state => state.user.userName,
    user: state => state.user,
    currentRole: (state, getters) => {
      if (getters.user !== {} && 'roles' in getters.user) {
        console.log('this.getters:', getters)
        return getters.user.roles[1]
      }
    }
  },

  mutations: {
    // setCurrentProjectthis.user.roles[0].projectscurrentProject: {},
    authRequest (state) {
      state.authStatus = 'loading'
    },

    authSuccess (state, user) {
      state.authStatus = 'success'
      state.token = user.token
      state.user = user
    },

    authError (state) {
      state.authStatus = 'error'
    },

    logout (state) {
      state.authStatus = ''
      state.token = ''
    }
  },

  actions: {
    login ({ commit }, payload) {
      return new Promise((resolve, reject) => {
        commit('authRequest')
        let config = {
          headers: {
            'content-type': 'application/x-www-form-urlencoded'
          }
        }
        Vue.axios({
          url: Vue.utils.api.common.login,
          data: Vue.utils.qs.stringify(payload),
          config,
          method: 'POST'
        })
          .then(res => {
            const token = res.data.data.token
            const user = res.data.data
            console.log('token:', token)
            console.log('user:', user)
            console.log('======', Vue.utils.sessionStorage.getItem('aaa'))
            Vue.utils.sessionStorage.setItem('token', token)
            Vue.utils.sessionStorage.setItem('user', user)
            console.log(
              'sessionStorage-user:',
              Vue.utils.sessionStorage.getItem('user')
            )
            Vue.axios.defaults.headers.common['Authorization'] = token
            commit('authSuccess', user)
            resolve(res)
          })
          .catch(err => {
            commit('authError')
            console.log(err.response)
            Vue.utils.sessionStorage.removeItem('token')
            Vue.utils.sessionStorage.removeItem('user')
            reject(err)
          })
      })
    },
    logout ({ commit }) {
      return new Promise((resolve, reject) => {
        commit('logout')
        Vue.utils.sessionStorage.removeItem('token')
        Vue.utils.sessionStorage.removeItem('user')
        delete Vue.axios.defaults.headers.common['Authorization']
        resolve()
      })
    }
  },
  modules: {
    monitor
  }
})
