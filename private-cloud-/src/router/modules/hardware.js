// 硬件设施路由配置
export default [
  {
    path: '/hardware/overview',
    name: 'HardwareOverview',
    component: () =>
      import(/* webpackChunkName: "hardware" */ '@/views/hardware/Overview'),
    meta: {
      title: '硬件概览',
      authority: []
    }
  },
  {
    path: '/hardware/cluster',
    name: 'HardwareCluster',
    component: () =>
      import(/* webpackChunkName: "hardware" */ '@/views/hardware/Cluster'),
    meta: {
      title: '集群资源',
      authority: []
    }
  },
  {
    path: '/hardware/resource',
    name: 'HardwareResource',
    component: () =>
      import(/* webpackChunkName: "hardware" */ '@/views/hardware/Resource'),
    meta: {
      title: '硬件资源',
      authority: []
    }
  },
  {
    path: '/hardware/district',
    name: 'HardwareDistrict',
    component: () =>
      import(/* webpackChunkName: "hardware" */ '@/views/hardware/District'),
    meta: {
      title: '可用域',
      authority: []
    }
  }
]
