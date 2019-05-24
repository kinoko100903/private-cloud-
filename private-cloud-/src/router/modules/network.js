// 网络路由配置
export default [
  {
    path: '/network/topology',
    name: 'NetworkTopology',
    component: () =>
      import(/* webpackChunkName: "network" */ '@/views/network/Topology'),
    meta: {
      title: '网络拓扑',
      authority: []
    }
  },
  {
    path: '/network/private',
    name: 'NetworkPrivate',
    component: () =>
      import(/* webpackChunkName: "network" */ '@/views/network/Private'),
    meta: {
      title: '私有网络',
      authority: []
    }
  },
  {
    path: '/network/public',
    name: 'NetworkPublic',
    component: () =>
      import(/* webpackChunkName: "network" */ '@/views/network/Public'),
    meta: {
      title: '公网',
      authority: []
    }
  },
  {
    path: '/network/router',
    name: 'NetworkRouter',
    component: () =>
      import(/* webpackChunkName: "network" */ '@/views/network/Router'),
    meta: {
      title: '云路由',
      authority: []
    }
  },
  {
    path: '/network/security',
    name: 'NetworkSecurity',
    component: () =>
      import(/* webpackChunkName: "network" */ '@/views/network/Security'),
    meta: {
      title: '安全组',
      authority: []
    }
  }
]
