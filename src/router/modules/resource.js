// 云资源路由配置
export default [
  {
    path: '/resource/cvm',
    name: 'ResourceCvm',
    component: () =>
      import(/* webpackChunkName: "resource" */ '@/views/resource/Cvm'),
    meta: {
      title: '云主机',
      authority: []
    }
  },
  {
    path: '/resource/disks',
    name: 'ResourceDisks',
    component: () =>
      import(/* webpackChunkName: "resource" */ '@/views/resource/Disks'),
    meta: {
      title: '云盘',
      authority: []
    }
  },
  {
    path: '/resource/images',
    name: 'ResourceImages',
    component: () =>
      import(/* webpackChunkName: "resource" */ '@/views/resource/Images'),
    meta: {
      title: '云镜像',
      authority: []
    }
  },
  {
    path: '/resource/spec',
    name: 'ResourceSpec',
    component: () =>
      import(/* webpackChunkName: "resource" */ '@/views/resource/Spec'),
    meta: {
      title: '计算规格',
      authority: []
    }
  },
  {
    path: '/resource/ssh',
    name: 'ResourceSsh',
    component: () =>
      import(/* webpackChunkName: "resource" */ '@/views/resource/Ssh'),
    meta: {
      title: 'SSH',
      authority: []
    }
  },
  {
    path: '/resource/tags',
    name: 'ResourceTags',
    component: () =>
      import(/* webpackChunkName: "resource" */ '@/views/resource/Tags'),
    meta: {
      title: '标签管理',
      authority: []
    }
  }
]
