// 运维监控路由配置
export default [
  {
    path: '/monitor/cluster',
    name: 'MonitorCluster',
    component: () =>
      import(/* webpackChunkName: "monitor" */ '@/views/monitor/Cluster'),
    meta: {
      title: '集群监控',
      authority: []
    }
  },
  {
    path: '/monitor/pm',
    name: 'MonitorPm',
    component: () =>
      import(/* webpackChunkName: "monitor" */ '@/views/monitor/Pm'),
    meta: {
      title: '物理机监控',
      authority: []
    }
  },
  {
    path: '/monitor/cvm',
    name: 'MonitorCvm',
    component: () =>
      import(/* webpackChunkName: "monitor" */ '@/views/monitor/Cvm'),
    meta: {
      title: '云主机监控',
      authority: []
    }
  },
  {
    path: '/monitor/services',
    name: 'MonitorServices',
    component: () =>
      import(/* webpackChunkName: "monitor" */ '@/views/monitor/Services'),
    meta: {
      title: '服务监控',
      authority: []
    }
  },
  {
    path: '/monitor/rules',
    name: 'MonitorRules',
    component: () =>
      import(/* webpackChunkName: "monitor" */ '@/views/monitor/Rules'),
    meta: {
      title: '监控规则',
      authority: []
    }
  }
]
