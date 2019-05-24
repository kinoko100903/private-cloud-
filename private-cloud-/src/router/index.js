import Vue from 'vue'
import Router from 'vue-router'
import store from '../store'
import modules from './modules'

Vue.use(Router)
const router = new Router({
  routes: [...modules]
})

// 添加路由守卫
router.beforeEach((to, from, next) => {
  // const isLogin = !!sessionStorage.token
  console.log('store里的内容：', store)
  const isLogin = store.getters.isLoggedIn
  if (to.path === '/login') {
    next()
  } else {
    isLogin ? next() : next('/login')
  }
})

export default router
