<template>
  <div id="index">
    <el-container>
      <el-aside width="200px" style="background-color: #121524;">
        <div class="aside-header">
          <div class="profile">
            <el-row class="profile-body">
              <el-col :span="8">
                <div class="profile-avatar">
                  <img src="http://placekitten.com/g/40/40" alt>
                </div>
              </el-col>
              <el-col :span="16">
                <div class="profile-text">
                  <p>{{userName}}</p>
                  <p>
                    <el-select
                      v-model="roleSelectedvalue"
                      @change="roleChange"
                      placeholder="请选择"
                      class="roleSwitch"
                      size="medium"
                    >
                      <el-option
                        v-for="item in roleOptions"
                        :key="item.value"
                        :label="item.label"
                        :value="item.value"
                      ></el-option>
                    </el-select>
                  </p>
                </div>
              </el-col>
            </el-row>
            <el-row class="profile-footer">
              <el-col :span="12">
                <div class="profile-footer-cell1">修改密码</div>
              </el-col>
              <el-col :span="12">
                <div class="profile-footer-cell2">退出登录</div>
              </el-col>
            </el-row>
          </div>
        </div>
        <el-scrollbar
          class="aside-body"
          wrap-class="scrollbar-wraper"
          wrap-style="color: red;"
          view-style="font-weight: normal;"
          view-class="view-box"
          :native="false"
        >
          <el-menu
            :default-openeds="defaultOpeneds"
            class="el-left-menu"
            text-color="#eee"
            active-text-color="#fff"
            router
            :default-active="defaultIndex"
            @select="handleSelect"
            unique-opened
          >
            <template v-for="item in items">
              <el-submenu v-if="item.children" :index="item.path" :key="item.path">
                <template slot="title">
                  <i :class="'fa fa-margin '+item.icon"></i>
                  <span slot="title">{{item.name}}</span>
                </template>
                <el-menu-item
                  v-for="(citem,cindex) in item.children"
                  :index="citem.path"
                  :key="cindex"
                >
                  <span slot="title">{{citem.name}}</span>
                </el-menu-item>
              </el-submenu>
            </template>
          </el-menu>
        </el-scrollbar>
      </el-aside>
      <el-container>
        <el-header>
          <el-row>
            <el-col :span="12">
              <div class="header-logo" style="height: 60px; line-height: 60px;">
                <img
                  src="../assets/logo.png"
                  alt
                  style="margin-top:10px;float:left;margin-right:10px;"
                > 卓朗私有云
              </div>
            </el-col>
            <el-col :span="12">
              <div class="grid-content bg-purple-light" style="float: right; padding-top:12px;">
                <el-dropdown class="projectSwitch">
                  <el-button type="primary" size="medium">
                    项目切换
                    <i class="el-icon-arrow-down el-icon--right"></i>
                  </el-button>
                  <el-dropdown-menu slot="dropdown">
                    <el-dropdown-item>我的项目一</el-dropdown-item>
                    <el-dropdown-item>我的项目二</el-dropdown-item>
                  </el-dropdown-menu>
                </el-dropdown>
              </div>
            </el-col>
          </el-row>
        </el-header>
        <el-main>
          <router-view></router-view>
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>

<script>
// @ is an alias to /src
// import HelloWorld from "@/components/HelloWorld.vue";
import { mapState, mapGetters } from 'vuex'
export default {
  name: 'Index',
  components: {
    // HelloWorld
  },
  data () {
    return {
      defaultOpeneds: [],
      defaultIndex: this.$route.path,
      hello: 'hello',
      roleOptions: [],
      roleSelectedvalue: '',
      items: [
        {
          icon: 'f-monitor',
          id: '1',
          name: '运维监控',
          path: '/monitor',
          children: [
            {
              path: '/monitor/cluster',
              id: '11',
              name: '集群监控'
            },
            {
              path: '/monitor/pm',
              id: '12',
              name: '物理机监控'
            },
            {
              path: '/monitor/cvm',
              id: '13',
              name: '云主机监控'
            },
            {
              path: '/monitor/services',
              id: '14',
              name: '服务监控'
            },
            {
              path: '/monitor/rules',
              id: '15',
              name: '报警规则'
            }
          ]
        },
        {
          icon: 'f-company',
          id: '2',
          name: '企业管理',
          path: '/company',
          children: [
            {
              path: '/company/department',
              id: '22',
              name: '组织管理'
            },
            {
              path: '/company/member',
              id: '21',
              name: '人员管理'
            },
            {
              path: '/company/role',
              id: '23',
              name: '角色管理'
            }
          ]
        },
        {
          icon: 'f-company',
          id: '22',
          name: '企业管理2',
          path: '/company222'
        },
        {
          icon: 'f-resource',
          id: '3',
          name: '云资源',
          path: '/resource',
          children: [
            {
              path: '/resource/cvm',
              id: '31',
              name: '云主机'
            },
            {
              path: '/resource/disks',
              id: '32',
              name: '云盘'
            },
            {
              path: '/resource/images',
              id: '33',
              name: '云镜像'
            },
            {
              path: '/resource/spec',
              id: '34',
              name: '计算规格'
            },
            {
              path: '/resource/ssh',
              id: '35',
              name: 'SSH'
            },
            {
              path: '/resource/tags',
              id: '36',
              name: '标签管理'
            }
          ]
        },
        {
          icon: 'f-network',
          id: '4',
          name: '网络',
          path: '/network',
          children: [
            {
              path: '/network/topology',
              id: '41',
              name: '网络拓扑'
            },
            {
              path: '/network/private',
              id: '42',
              name: '私有网络'
            },
            {
              path: '/network/public',
              id: '43',
              name: '公网'
            },
            {
              path: '/network/router',
              id: '45',
              name: '云路由'
            },
            {
              path: '/network/security',
              id: '44',
              name: '安全组'
            }
          ]
        },
        {
          icon: 'f-hardware',
          id: '5',
          name: '硬件设施',
          path: '/hardware',
          children: [
            {
              path: '/hardware/overview',
              id: '51',
              name: '硬件概览'
            },
            {
              path: '/hardware/cluster',
              id: '53',
              name: '集群资源'
            },
            {
              path: '/hardware/resource',
              id: '52',
              name: '硬件资源'
            },
            {
              path: '/hardware/district',
              id: '54',
              name: '可用域'
            }
          ]
        },
        {
          icon: 'f-quota',
          id: '6',
          name: '资源配额',
          path: '/quota',
          children: [
            {
              path: '/quota/overview',
              id: '61',
              name: '资源概览'
            },
            {
              path: '/quota/projects',
              id: '62',
              name: '项目管理'
            },
            {
              path: '/quota/approval',
              id: '63',
              name: '审批管理'
            }
          ]
        }
      ]

    }
  },
  computed: {
    ...mapState({
      user: state => state.user,
      token: state => state.token
    }),
    ...mapGetters([
      'userID',
      'userName',
      'user',
      'currentRole'
    ])
  },
  created () {
    this.items = this.currentRole.menus
    this.getRoleOptions()
  },
  methods: {
    getRoleOptions: function () {
      console.log('getRoleOptions:', this.user.roles)
      if (this.user.roles.length > 0) {
        this.user.roles.forEach(item => {
          let obj = {}
          if (item.roleID) {
            obj.itemType = 'role'
            obj.value = item.roleID
            obj.label = item.roleName
          } else {
            obj.itemType = 'roleType'
            obj.value = item.roleTypeId
            obj.label = item.roleType
          }
          this.roleOptions.push(obj)
        })
        this.roleSelectedvalue = this.roleOptions[0].value
      }
    },
    roleChange: function (val) {
      console.log('当前选中项的ID值：', val)
      let idx = this.roleOptions.findIndex(item => item.value === val)
      console.log('当前选中项对应的类型：', this.roleOptions[idx].itemType)
      console.log('当前选中项对应的标签：', this.roleOptions[idx].label)
    },
    activedMenu: function (val) {
      if (val.indexOf('/home') === 0) {
        return '/home'
      } else {
        return val
      }
    },
    handleSelect (key, keyPath) {
      console.log(key, keyPath)
      this.defaultOpeneds = []
      this.defaultOpeneds.push(keyPath[0])
    }
  }
}
</script>

<style>
#index .el-container {
  height: 100%;
}
#index .el-container .el-main {
  padding: 0;
}
#index,
#index > .el-container,
#index > .el-container > .el-aside,
#index > .el-container > .el-container {
  height: 100%;
}
#index > .el-container > .el-container > .el-header {
  background-color: #4965d3;
  color: #fff;
}
#index > .el-container > .el-container > .el-main {
  padding: 0;
}
.aside-header {
  padding: 10px;
}

.el-menu {
  border-right: 0 !important;
  background-color: #121524 !important;
}
.el-submenu {
  background-color: #121524;
}
.el-submenu:hover {
  background-color: #121524;
}
.el-submenu__title:focus,
.el-submenu__title:hover {
  outline: 0;
  background-color: #121524 !important;
}

.el-menu-item:focus,
.el-menu-item:hover {
  outline: 0;
  background-color: #121524 !important;
}

.el-submenu.is-opened {
  background-color: #1d2339 !important;
}
.el-submenu.is-opened > .el-submenu__title,
.el-submenu.is-opened > .el-menu {
  background-color: transparent !important;
}
.el-menu-item.is-active {
  background-color: #4964d5 !important;
}
.el-submenu .el-menu-item {
  position: relative;
}

.el-submenu .el-menu-item.is-active::after {
  content: "";
  position: absolute;
  left: 0;
  top: 0;
  width: 4px;
  height: 50px;
  display: block;
  background-color: #fdbd47;
}

.profile {
  box-sizing: border-box;
  padding: 20px 15px;
  width: 180px;
  height: 120px;
  background-color: #1d2339;
  color: #fff;
  font-size: 14px;
}
.profile-avatar {
  height: 40px;
  width: 40px;
  border-radius: 40px;
  background-color: #4964d5;
  overflow: hidden;
}
.profile .profile-text {
  line-height: 22px;
  padding-left: 3px;
}
.profile .profile-footer {
  padding-top: 10px;
}
.profile .profile-footer .profile-footer-cell2 {
  border-left: 1px dashed rgba(255, 255, 255, 0.4);
  padding-left: 10px;
}

.el-menu.el-left-menu {
  height: 100%;
  overflow-x: hidden;
  overflow-y: auto;
  word-break: break-all;
  border-right: solid 0 #121524 !important;
}

.el-scrollbar.aside-body {
  /* height: calc(100vh - 120px); */
  height: calc(100% - 140px);
}
.scrollbar-wraper {
  overflow-x: hidden !important;
  border-right: 0;
}
.el-scrollbar__view {
  height: 100%;
}

.thumbnail {
  background-color: #f4f8fb;
  color: #4b62d2;
  font-weight: 600;
  font-size: 17px;
}

.el-dropdown.projectSwitch > .el-button--primary {
  color: #fff;
  background-color: transparent;
  border-color: #fff;
  border-radius: 20px;
}
.el-dropdown.projectSwitch > .el-button--primary:focus,
.el-dropdown.projectSwitch > .el-button--primary:hover {
  background: transparent;
  border-color: #66b1ff;
  color: #fff;
}

.el-select.el-select--medium.roleSwitch .el-input__inner {
  color: #fff;
  border: 0;
  background-color: transparent;
  border-color: transparent;
  padding-left: 0;
  padding-right: 0;
}
.el-select.el-select--medium.roleSwitch .el-input__suffix {
  right: -5px;
}

.el-select.el-select--medium.roleSwitch .el-input__inner:focus,
.el-select.el-select--medium.roleSwitch .el-input__inner:active,
.el-select.el-select--medium.roleSwitch .el-input__inner:visited,
.el-select.el-select--medium.roleSwitch .el-input__inner:hover {
  background: transparent;
  border-color: transparent;
  color: #fff;
}
/* .el-select.el-select--medium.roleSwitch .el-input__inner,
.el-select.el-select--medium.roleSwitch .el-input__inner {
  padding: 7px 0;
} */
</style>
