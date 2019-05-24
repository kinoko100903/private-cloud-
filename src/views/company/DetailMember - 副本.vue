<template>
  <div class="company-detail-member">
    <el-breadcrumb separator="/">
      <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item v-for="(item, index) in $route.meta" :key="index">{{item}}</el-breadcrumb-item>
    </el-breadcrumb>
    <el-row>
      <el-col :span="24">
        <div class="grid-content">
          <el-tabs v-model="activeName">
            <el-tab-pane label="基本信息" name="baseInfo" class="pdt10">
              <el-row class="mgb10">
                <el-col :span="6">
                  <el-row class="mgb20">
                    <el-col :span="12">
                      <div class="grid-content">
                        <span class="text-99">账号：</span>
                      </div>
                    </el-col>
                    <el-col :span="12">
                      <div class="grid-content">zhang01</div>
                    </el-col>
                  </el-row>
                  <el-row class="mgb20">
                    <el-col :span="12">
                      <div class="grid-content">
                        <span class="text-99">状态：</span>
                      </div>
                    </el-col>
                    <el-col :span="12">
                      <div class="grid-content">已冻结</div>
                    </el-col>
                  </el-row>
                  <el-row class="mgb20">
                    <el-col :span="12">
                      <div class="grid-content">
                        <span class="text-99">部门路径：</span>
                      </div>
                    </el-col>
                    <el-col :span="12">
                      <div class="grid-content">研发部</div>
                    </el-col>
                  </el-row>
                  <el-row class="mgb20">
                    <el-col :span="12">
                      <div class="grid-content">
                        <span class="text-99">职务：</span>
                      </div>
                    </el-col>
                    <el-col :span="12">
                      <div class="grid-content">部门负责人</div>
                    </el-col>
                  </el-row>
                  <el-row class="mgb20">
                    <el-col :span="12">
                      <div class="grid-content">
                        <span class="text-99">手机号：</span>
                      </div>
                    </el-col>
                    <el-col :span="12">
                      <div class="grid-content">1390987653</div>
                    </el-col>
                  </el-row>
                  <el-row class="mgb20">
                    <el-col :span="12">
                      <div class="grid-content">
                        <span class="text-99">邮箱：</span>
                      </div>
                    </el-col>
                    <el-col :span="12">
                      <div class="grid-content">1390987653@qq.com</div>
                    </el-col>
                  </el-row>
                  <el-row class="mgb20">
                    <el-col :span="12">
                      <div class="grid-content">
                        <span class="text-99">描述：</span>
                      </div>
                    </el-col>
                    <el-col :span="12">
                      <div class="grid-content">我是描述</div>
                    </el-col>
                  </el-row>
                </el-col>
              </el-row>
            </el-tab-pane>
            <el-tab-pane label="基本操作" name="baseAction" class="pdt10">
              <el-row class="mgb10">
                <el-col :span="8">
                  <div class="grid-content">
                    <span class="text-99">名称：</span>研发部2
                  </div>
                </el-col>
                <el-col :span="8">
                  <div class="grid-content">
                    <span class="text-99">部门负责人：</span>刘德华2
                  </div>
                </el-col>
                <el-col :span="8">
                  <div class="grid-content">
                    <span class="text-99">上级部门：</span>网络部2
                  </div>
                </el-col>
              </el-row>
              <el-row>
                <el-col :span="24">
                  <div class="grid-content">
                    <span class="text-99">描述：</span>负责开发
                  </div>
                </el-col>
              </el-row>
            </el-tab-pane>

            <el-tab-pane label="相关项目" name="projectsRelated" class="pdt10">ss</el-tab-pane>
          </el-tabs>
          <div v-html="currentTabContent" style="width: 100%"></div>
        </div>
      </el-col>
    </el-row>
  </div>
</template>

<script>
// 部门人员详情
export default {
  name: 'CompanyDetailMember',
  props: {
    msg: String
  },
  data () {
    return {
      activeName: 'baseInfo',
      currentTabContent: ''
    }
  },
  created: function () {
    this.getPanelData(`/personalResources/queryUserByUserId/${this.$route.params.id}`)
  },
  watch: {
    // 如果路由有变化，会再次执行该方法
    // "$route": "getPanelData"
  },
  beforeRouteLeave (to, from, next) {
    // 导航离开该组件的对应路由时调用
    // 可以访问组件实例 `this`
  },
  methods: {
    getPanelData (url) {
      this.$axios.get(url, {
        params: {
        }
      }).then(res => {
        console.log('===', res.data)
        this.currentTabContent = res.data
      })
    }

  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style>
.company-detail-member {
  position: relative;
  overflow: hidden;
  transition: 0.2s;
}
.company-detail-member .grid-content .el-tabs__item {
  font-size: 16px;
}
.company-detail-member .grid-content .el-tabs__nav-wrap::after {
  height: 1px;
  background-color: #e4e7ed;
}
.company-detail-member .grid-content .grid-content {
  font-size: 14px;
}
.company-detail-member .grid-content .el-tabs__active-bar {
  background-color: #4a64d5;
}
.company-detail-member .grid-content .el-tabs__item.is-active {
  color: #333333;
}
.company-detail-member .grid-content .el-tabs__content {
  border: 0;
  border-top: 0;
  padding: 10px 20px 15px 10px;
}
/* .el-tabs--top.el-tabs--card .el-tabs__item {
  padding-left: 0 !important;
} */
</style>
