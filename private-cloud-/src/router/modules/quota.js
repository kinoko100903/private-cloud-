// 资源配额路由配置
export default [
  {
    path: '/quota/overview',
    name: 'QuotaOverview',
    component: () =>
      import(/* webpackChunkName: "quota" */ '@/views/quota/Overview'),
    meta: {
      title: '资源概览',
      authority: []
    }
  },
  {
    path: '/quota/projects',
    name: 'QuotaProjects',
    component: () =>
      import(/* webpackChunkName: "quota" */ '@/views/quota/Projects'),
    meta: {
      title: '项目管理',
      authority: []
    }
  },
  {
    path: '/quota/approval',
    name: 'QuotaApproval',
    component: () =>
      import(/* webpackChunkName: "quota" */ '@/views/quota/Approval'),
    meta: {
      title: '审批管理',
      authority: []
    }
  }
]
