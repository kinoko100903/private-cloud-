<template>
  <div class="company-detail-member">
    <el-container>
      <el-aside width="390px">
        <div class="panel panel-default">
          <div class="panel-heading">
            <div class="panel-title">基本信息</div>
          </div>
          <div class="panel-body">
            <el-row>
              <el-col :span="10">
                <div class="grid-content bg-purple">账号：</div>
              </el-col>
              <el-col :span="14">
                <div
                  class="grid-content bg-purple"
                >{{currentTabContent.username?currentTabContent.username:"-"}}</div>
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="10">
                <div class="grid-content bg-purple">职务：</div>
              </el-col>
              <el-col :span="14">
                <div
                  class="grid-content bg-purple"
                >{{currentTabContent.post?currentTabContent.post:"-"}}</div>
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="10">
                <div class="grid-content bg-purple">启用状态：</div>
              </el-col>
              <el-col :span="14">
                <div class="grid-content bg-purple">{{currentTabContent.deleted?"已禁用":"已启用"}}</div>
              </el-col>
            </el-row>
            <div class="panel-body-focus">
              <el-row>
                <el-col :span="10">
                  <div class="grid-content bg-purple">手机号：</div>
                </el-col>
                <el-col :span="14">
                  <div
                    class="grid-content bg-purple"
                  >{{currentTabContent.phone?currentTabContent.phone:"-"}}</div>
                </el-col>
              </el-row>
              <el-row>
                <el-col :span="10">
                  <div class="grid-content bg-purple">邮箱：</div>
                </el-col>
                <el-col :span="14">
                  <div
                    class="grid-content bg-purple"
                  >{{currentTabContent.email?currentTabContent.email:"-"}}</div>
                </el-col>
              </el-row>
              <el-row>
                <el-col :span="10">
                  <div class="grid-content bg-purple">描述：</div>
                </el-col>
                <el-col :span="14">
                  <div
                    class="grid-content bg-purple"
                  >{{currentTabContent.description?currentTabContent.description:"-"}}</div>
                </el-col>
              </el-row>
            </div>
          </div>
        </div>
        <div class="panel panel-default">
          <div class="panel-heading">
            <div class="panel-title">基本操作</div>
          </div>
          <div class="panel-body">
            <el-row class="mgt5">
              <el-col :span="24">
                <div class="grid-content bg-purple">
                  <el-button plain>密码重置</el-button>
                  <el-button plain>密码修改</el-button>
                  <el-button plain>账号删除</el-button>
                  <el-button plain>账号冻结</el-button>
                  <el-button plain>更换部门</el-button>
                  <el-button plain>部门任命</el-button>
                </div>
              </el-col>
            </el-row>
          </div>
        </div>
      </el-aside>
      <el-main>
        <div class="panel panel-default">
          <div class="panel-heading">
            <div class="panel-title">我的项目</div>
          </div>
          <div class="panel-body">
            <el-table :data="tableData" style="width: 100%">
              <el-table-column prop="projectName" label="名称" width="180"></el-table-column>
              <el-table-column prop="head" label="负责人" width="180"></el-table-column>
              <el-table-column prop="total" label="成员数量"></el-table-column>
              <el-table-column prop="createTime" label="创建日期"></el-table-column>
            </el-table>
          </div>
        </div>
      </el-main>
    </el-container>
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
      currentTabContent: [],
      tableData: []
    }
  },
  created: function () {
    this.getPanelData(`/personalResources/queryUserByUserId/${this.$route.params.id}`)
    this.getPanelTable(`/project/queryProjectListByUserId`)
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
        console.log('===userData', res.data.data)
        this.currentTabContent = res.data.data
      })
    },
    getPanelTable (url) {
      this.$axios.post(url, {
        userId: this.$route.params.id,
        post: ''
      }).then(res => {
        console.log('===tableData===', res.data.data)
        this.tableData = res.data.data
      })
    }

  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style>
.company-detail-member {
  position: absolute;
  overflow: hidden;
  transition: 0.2s;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
}
.company-detail-member .el-container {
  height: 100%;
}
.company-detail-member .el-container .el-aside {
  padding: 20px 30px 20px 40px;
  border-right: 1px solid #dedede;
}
.company-detail-member .panel {
  padding: 0;
  border: 0;
  margin-bottom: 5px;
  -webkit-transition: 0.2s;
  transition: 0.2s;
  color: #333;
  font-size: 14px;
}
.company-detail-member .panel .panel-heading {
  padding-bottom: 10px;
  border-bottom: 1px dashed #c0cfdb;
  font-size: 16px;
  font-weight: 700;
}
.company-detail-member .panel .panel-body {
  padding: 15px 0;
  line-height: 30px;
}
.company-detail-member .panel .panel-body .panel-body-focus {
  margin-top: 15px;
  padding: 15px 0;
  border-top: 1px dashed #c0cfdb;
  border-bottom: 1px dashed #c0cfdb;
}
.company-detail-member .el-button {
  margin-left: 0;
  margin-right: 10px;
  padding: 10px 15px;
  font-size: 14px;
  margin-bottom: 10px;
}
.company-detail-member .el-button + .el-button {
  margin-left: 0;
}
.company-detail-member .el-table th {
  padding: 8px 10px;
}
.company-detail-member .el-table {
  border: 1px solid #dedede;
  border-bottom-color: transparent
}
.company-detail-member .el-table th.is-leaf {
  color: #666666;
}
.company-detail-member .el-table th.is-leaf, .company-detail-member .el-table td {
    border-bottom: 1px solid #F6F6F6;
}
</style>
