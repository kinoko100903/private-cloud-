// 路由配置索引
import monitor from './monitor'
import company from './company'
import resource from './resource'
import network from './network'
import hardware from './hardware'
import quota from './quota'

export default [
  {
    path: '/login',
    name: 'Login',
    component: () => import(/* webpackChunkName: "login" */ '@/views/Login'),
    meta: {
      title: '用户登录'
    }
  },
  {
    path: '/',
    name: 'Index',
    component: () => import(/* webpackChunkName: "layout" */ '@/views/Index'),
    meta: {
      title: '首页',
      authority: []
    },
    redirect: '/dashboard',
    children: [
      {
        path: '/dashboard',
        name: 'Dashboard',
        component: () =>
          import(/* webpackChunkName: "home" */ '@/views/Dashboard.vue'),
        meta: {
          title: '首页',
          authority: []
        }
      },
      ...monitor,
      ...company,
      ...resource,
      ...network,
      ...hardware,
      ...quota
    ]
  }
  // {
  //   path: "/about",
  //   name: "About",
  //   // route level code-splitting
  //   // this generates a separate chunk (about.[hash].js) for this route
  //   // which is lazy-loaded when the route is visited.
  //   component: () =>
  //     import(/* webpackChunkName: "about" */ "@/views/About.vue")
  // }
]
