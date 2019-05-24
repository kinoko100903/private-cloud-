// 企业管理路由配置
export default [
  {
    path: '/company/department',
    name: 'CompanyDepartment',
    component: () =>
      import(/* webpackChunkName: "company" */ '@/views/company/Department'),
    meta: {
      title: '部门管理',
      authority: []
    }
    // children: [
    //   {
    //     path: '/company/detail',
    //     name: 'CompanyDetail',
    //     component: () =>
    //       import(/* webpackChunkName: "company" */ '@/views/company/Detail'),
    //     meta: {
    //       title: '部门详情',
    //       authority: []
    //     }
    //   },
    //   {
    //     path: '/company/detail/member/:id',
    //     // name: 'CompanyDetailMember',
    //     component: () =>
    //       import(/* webpackChunkName: "company" */ '@/views/company/Detail'),
    //     meta: {
    //       title: '部门人员详情',
    //       authority: []
    //     },
    //     children: [
    //       {
    //         path: '',
    //         component: () =>
    //           import(
    //             /* webpackChunkName: "company" */ '@/views/company/DetailMember'
    //           )
    //       }
    //     ]
    //   }
    // ]
  },
  {
    path: '/company/member',
    name: 'CompanyMember',
    component: () =>
      import(/* webpackChunkName: "company" */ '@/views/company/Member'),
    meta: {
      title: '人员管理',
      authority: []
    }
  },
  {
    path: '/company/role',
    name: 'CompanyRole',
    component: () =>
      import(/* webpackChunkName: "company" */ '@/views/company/Role'),
    meta: {
      title: '角色管理',
      authority: []
    }
  },
  {
    path: '/company/detail',
    name: 'CompanyDetail',
    component: () =>
      import(/* webpackChunkName: "company" */ '@/views/company/Detail'),
    meta: {
      title: '部门详情',
      authority: []
    }
  },
  {
    path: '/company/CreateRole',
    name: 'CreateRole',
    component: () =>
      import(/* webpackChunkName: "company" */ '@/views/company/CreateRole'),
    meta: {
      title: '创建角色',
      authority: []
    }
  },

  {
    path: '/company/detail/member/:id',
    // name: 'CompanyDetailMember',
    component: () =>
      import(/* webpackChunkName: "company" */ '@/views/company/Detail'),
    meta: {
      title: '部门人员详情',
      authority: []
    },
    children: [
      {
        path: '',
        component: () =>
          import(
            /* webpackChunkName: "company" */ '@/views/company/DetailMember'
          )
      }
    ]
  }
]
