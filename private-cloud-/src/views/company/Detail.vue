<template>
  <div class="company-detail">
    <el-header class="thumbnail">
      <el-row>
        <el-col :span="12" class style="padding-top:20px;">
          <el-link type="primary" class="f16 text-bold mgr15">{{$route.meta.title}}</el-link>
          <el-link type="primary" class="f18">|</el-link>
          <el-link type="primary" class="f16 text-bold mgl15" @click.native="$router.back(-1)">
            <i class="el-icon-back"></i> 返回
          </el-link>
          <!-- <el-breadcrumb separator="/">
            <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
            <el-breadcrumb-item v-for="(item, index) in $route.meta" :key="index">{{item}}</el-breadcrumb-item>
          </el-breadcrumb>-->
        </el-col>
        <el-col :span="12">
          <div class="grid-content bg-purple-light" style="float: right; padding-top:10px;"></div>
        </el-col>
      </el-row>
    </el-header>

    <el-main>
      <div class="panel">
        <el-tabs v-model="activeName">
          <el-tab-pane label="基本信息" name="panel">
            <el-row class="mgb15">
              <el-col :span="8">
                <div class="grid-content">
                  <span class="text-99">名称：</span>
                  {{deptInfo.dpName?deptInfo.dpName:"-"}}
                </div>
              </el-col>
              <el-col :span="8">
                <div class="grid-content">
                  <span class="text-99">部门负责人：</span>
                  {{deptInfo.userRealName?deptInfo.userRealName:"-"}}
                </div>
              </el-col>
              <el-col :span="8">
                <div class="grid-content">
                  <span class="text-99">上级部门：</span>
                  {{deptInfo.parentName?deptInfo.parentName: "-"}}
                </div>
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="24">
                <div class="grid-content">
                  <span class="text-99">描述：</span>
                  {{deptInfo.dpDescription? deptInfo.dpDescription: "-"}}
                </div>
              </el-col>
            </el-row>
          </el-tab-pane>
        </el-tabs>
      </div>

      <div class="tab-panel f14">
        <el-tabs v-model="tabPanelActiveName" type="card" @tab-click="handleClick">
          <el-tab-pane label="成员" name="member">
            <el-row class="mgb20">
              <el-col :span="24">
                <div class="grid-content pdt10 tablepaging" style="min-height: 550px;">
                  <el-row class="mgb15 actionBar">
                    <el-col :span="10">
                      <el-row :gutter="20">
                        <el-col :span="16">
                          <div class="grid-content">
                            <el-input
                              placeholder="请输入内容"
                              v-model="selectValue"
                              class="input-with-select"
                            >
                              <el-select
                                v-model="selectValue"
                                slot="prepend"
                                placeholder="请选择"
                                class="tableSearchSelect"
                              >
                                <el-option
                                  v-for="item in selectOptions"
                                  :key="item.value"
                                  :label="item.label"
                                  :value="item.value"
                                ></el-option>
                              </el-select>
                              <el-button slot="append" icon="el-icon-search"></el-button>
                            </el-input>
                          </div>
                        </el-col>
                        <el-col :span="8">
                          <div class="grid-content batchAction">
                            <el-dropdown trigger="click" v-if="batchActionVisable">
                              <span class="el-dropdown-link">
                                批量操作
                                <i class="el-icon-arrow-down el-icon--right"></i>
                              </span>
                              <el-dropdown-menu slot="dropdown">
                                <!-- <el-dropdown-item icon="el-icon-plus">密码重置</el-dropdown-item> -->
                                <el-dropdown-item>密码重置</el-dropdown-item>
                                <el-dropdown-item>账号删除</el-dropdown-item>
                                <el-dropdown-item>账号冻结</el-dropdown-item>
                                <el-dropdown-item>部门任命</el-dropdown-item>
                              </el-dropdown-menu>
                            </el-dropdown>
                          </div>
                        </el-col>
                      </el-row>
                    </el-col>
                    <el-col :span="14">
                      <div class="grid-content"></div>
                    </el-col>
                  </el-row>
                  <div class="tabcontent" v-if="tabShow">
                    <div class="mainbox">
                      <div style="positon: relative">
                        <el-button
                          type="default"
                          icon="el-icon-close"
                          size="mini"
                          @click="panelHidden()"
                          class="table-panel-btn-close"
                        ></el-button>
                        <!-- <span v-html="currentTabContent"></span> -->
                        <router-view :key="activeViewKey"></router-view>
                      </div>
                    </div>
                  </div>
                  <el-table
                    :data="tableData"
                    highlight-current-row
                    :cell-style="setCellStyle"
                    @selection-change="handleSelectionChange"
                    @row-click="handleCurrentRowClick"
                    border
                    height="480"
                    style="width: 100%"
                  >
                    <el-table-column type="selection" width="42"></el-table-column>
                    <el-table-column
                      v-for="(item, index) in tableHeader"
                      :key="index"
                      :prop="item.prop"
                      :label="item.label"
                      :width="item.width"
                    >
                      <template slot-scope="scope">
                        <div v-if="item.prop=='realName'">
                          <div class="fld-caption" v-if="tabShow">
                            <!-- <i class="el-icon-time"></i> -->
                            <span class="cut-text">{{ scope.row[item.prop] }}</span>
                          </div>
                          <div v-else>
                            <!-- <i class="el-icon-time"></i> -->
                            <span class="cut-text">{{ scope.row[item.prop] }}</span>
                          </div>
                        </div>

                        <div @click="openjQuery()" v-else>
                          <span>{{ scope.row[item.prop] }}</span>
                        </div>
                      </template>
                    </el-table-column>
                  </el-table>
                </div>
              </el-col>
            </el-row>
          </el-tab-pane>
          <el-tab-pane label="子部门" name="subDep">子部门</el-tab-pane>
        </el-tabs>
      </div>
    </el-main>
  </div>
</template>

<script>
// @ is an alias to /src
// import HelloWorld from '@/components/HelloWorld.vue'
// 部门详情
export default {
  name: 'CompanyDetail',
  components: {
  },
  data () {
    return {
      batchActionVisable: false,
      deptInfo: {},
      activeName: 'panel',
      tabPanelActiveName: 'member',
      selectOptions: [{
        value: '选项1',
        label: '黄金糕'
      }, {
        value: '选项4',
        label: '龙须面'
      }, {
        value: '选项5',
        label: '北京烤鸭'
      }],
      selectValue: '',
      activeViewKey: 'a',
      tabShow: false,
      currentRow: null,
      currentTabContent: '',
      tableHeader: [
        { prop: 'realName', label: '姓名', width: 160 },
        { prop: 'username', label: '账号', width: 260 },
        { prop: 'post', label: '职位', width: 120 },
        { prop: 'id', label: 'UUID', width: '' }
      ],
      tableData: [],
      multipleSelection: []

    }
  },
  created () {
    this.getDeptInfo()
    this.getDeptPeople()
  },
  methods: {
    handleClick (tab, event) {
      console.log(tab, event)
      // this.tableHeader[0].width = 300
    },
    openjQuery () {
      // alert($('.el-main').html())
      // console.log($('.el-main').html())
    },
    setCellStyle ({ row, column, rowIndex, columnIndex }) {
      // console.log(row)
      // console.log(column)
      // console.log(rowIndex)
      // console.log(columnIndex)
    },
    getDeptInfo () {
      this.$axios.get(`/personalResources/getDeptByDeptId/${this.$route.query.dept}`, {
        params: {
        }
      }).then(res => {
        console.log('=部门基本信息=', res.data.data)
        this.deptInfo = res.data.data
      })
    },
    getDeptPeople () {
      this.$axios.get(`/personalResources/getUserListByDeptId/${this.$route.query.dept}`, {
        params: {
        }
      }).then(res => {
        console.log('=部门人员列表=', res.data.data)
        this.tableData = res.data.data
      })
    },
    getPanelData (url) {
      this.$axios.get(url, {
        params: {
        }
      }).then(res => {
        console.log('=面板数据=', res.data.data)
        this.currentTabContent = res.data.data
      })
    },
    handleSelectionChange (val) {
      this.multipleSelection = val
      if (this.multipleSelection.length > 1) {
        this.batchActionVisable = true
      } else {
        this.batchActionVisable = false
      }
    },
    handleCurrentRowClick (row, col, event) {
      // console.log(val.date)
      console.log('当前用户ID：', row.id)
      console.log('当前行数据：', col)
      console.log('event数据：', event)
      // this.currentRow = val;
      if (col.property === 'realName') {
        if (!this.tabShow) this.tabShow = true
        this.getPanelData(`/personalResources/queryUserByUserId/${row.id}`)
        this.activeViewKey = 'key' + row.id
        this.$router.replace({ path: `/company/detail/member/${row.id}` })
      }
      // this.currentTabContent = row.date + '<br>' + row.name + '<br>' + row.address
    },
    panelHidden () {
      this.tabShow = false
    }
  }
}
</script>

<style>
.company-detail .panel {
  padding: 10px 24px 24px;
  border: 1px solid #cccecd;
  /* border-radius: 3px; */
  margin-bottom: 20px;
  transition: 0.2s;
}
.company-detail .panel .el-tabs__item {
  font-size: 16px;
}
.company-detail .panel .el-tabs__nav-wrap::after {
  height: 1px;
  background-color: #e4e7ed;
}
.company-detail .panel .grid-content {
  font-size: 14px;
}
.company-detail .panel .el-tabs__active-bar {
  background-color: #4a64d5;
}
.company-detail .panel .el-tabs__item.is-active {
  color: #333333;
}
.company-detail .tab-panel {
  margin-bottom: 20px;
}
.company-detail .tab-panel .el-tabs__item {
  color: #333333;
  position: relative;
  /* width: 110px; */
  text-align: center;
}
/* .company-detail .tab-panel .el-tabs__item:last-child {
  padding: 0 36px !important;
} */
.company-detail .tab-panel .el-tabs__item.is-active {
  color: #4a64d5;
  border-top-color: #4965d3;
}
.company-detail .tab-panel .el-tabs__item.is-active:after {
  content: "";
  position: absolute;
  top: -1px;
  left: 0;
  right: 0;
  display: block;
  border-top: 1px solid #4965d3;
  width: 100%;
  z-index: 999;
}
.company-detail .tab-panel .el-tabs__header {
  margin: 0 0 0;
}
.company-detail .tab-panel .el-tabs__header .el-tabs__item {
  font-size: 16px;
}
.company-detail .tab-panel .el-tabs--card > .el-tabs__header .el-tabs__item {
  border-left: 1px solid #cccecd;
}
.company-detail
  .tab-panel
  .el-tabs--card
  > .el-tabs__header
  .el-tabs__item:first-child {
  border-left: none;
  padding-left: 20px;
}
.company-detail .tab-panel .el-tabs--card > .el-tabs__header {
  border-bottom: 1px solid #cccecd;
}
.company-detail .tab-panel .el-tabs--card > .el-tabs__header .el-tabs__nav {
  border: 1px solid #cccecd;
  border-bottom: none;
  border-radius: 0 0 0 0;
}
.company-detail＞.tab-panel＞.el-tabs--card.el-tabs .el-tabs__content {
  border: 1px solid #cccecd;
  border-top: 0;
  padding: 10px 20px 15px 18px;
}
.company-detail .el-select .el-input {
  width: 120px;
}
.company-detail .el-input-group__append,
.el-input-group__prepend {
  background-color: #fff !important;
  color: #909399;
}

.block {
  padding: 5px 0;
  margin-bottom: 20px;
  /* background-color: #ececec; */
  /* overflow: hidden; */
}

.btn-item {
  width: 120px;
  float: left;
  color: #999;
}
.btn-item:hover {
  color: #4965d3;
  cursor: pointer;
}
.btn-icon {
  position: relative;
  width: 38px;
  height: 38px;
  background-color: #fff;
  transform: rotate(45deg);
  margin-left: 25px;
  border-radius: 8px;
  box-shadow: 0 1px 10px 0 #dfe4ff;
  border-color: #dfe4ff;
  float: left;
}
.btn-icon:first-child {
  margin-left: 5px;
}
.btn-icon .f {
  position: absolute;
  top: 10px;
  left: 10px;
  transform: rotate(-45deg);
  font-size: 20px;
}

.btn-icon.icon-tachometer .fa {
  top: 8x;
  left: 9px;
}
.btn-text {
  display: inline-block;
  line-height: 42px;
  padding-left: 10px;
  font-size: 16px;
}

.el-checkbox__inner {
  width: 16px !important;
  height: 16px !important;
}
.el-checkbox__inner:hover {
  border-color: #4965d3 !important;
}
.el-checkbox__input.is-checked .el-checkbox__inner {
  background-color: #4965d3 !important;
  border-color: #4965d3 !important;
}
.el-checkbox__inner::after {
  left: 5px !important;
}
.el-checkbox__input.is-checked .el-checkbox__inner,
.el-checkbox__input.is-indeterminate .el-checkbox__inner {
  background-color: #4965d3 !important;
  border-color: #4965d3 !important;
}

/* 以下为表格行内tab面板样式 */
.el-popover.popperRow {
  position: relative;
  top: 128px;
  right: 0;
  bottom: 10px;
}
.tablepaging {
  position: relative;
  box-sizing: border-box;
  -moz-box-sizing: border-box; /* Firefox */
  -webkit-box-sizing: border-box; /* Safari */
  height: 100%;
}
.tablepaging .tabcontent {
  position: relative;
}
.tablepaging .tabcontent .mainbox {
  position: absolute;
  left: 202px;
  top: 1px;
  right: 1px;
  background: #fff;
  height: 530px;
  /** height: calc(100vh - 128px); **/
  /* height: calc(100vh - 230px); */
  border: 0;
  /* padding: 24px; */
  z-index: 2;
  color: #606266;
  line-height: 1.4;
  text-align: left;
  font-size: 14px;
  -webkit-box-shadow: -12px -8px 7px -16px rgba(0, 0, 0, 0.48);
  -moz-box-shadow: -12px -8px 7px -16px rgba(0, 0, 0, 0.48);
  box-shadow: -12px -8px 7px -16px rgba(0, 0, 0, 0.48);

  word-break: break-all;
}

.tablepaging
  .el-table--striped
  .el-table__body
  tr.el-table__row--striped.current-row
  td,
.tablepaging .el-table__body tr.current-row > td,
.tablepaging .el-table__body tr.hover-row.current-row > td,
.tablepaging
  .el-table__body
  tr.hover-row.el-table__row--striped.current-row
  > td,
.tablepaging .el-table__body tr.hover-row.el-table__row--striped > td,
.tablepaging .el-table__body tr.hover-row > td {
  background-color: #fff;
  -webkit-box-shadow: inset 0px -12px 10px -16px rgba(0, 0, 0, 0.36);
  -moz-box-shadow: inset 0px -12px 10px -16px rgba(0, 0, 0, 0.36);
  box-shadow: inset 0px -12px 10px -16px rgba(0, 0, 0, 0.36);
}
.fld-caption {
  position: absolute;
  top: 0;
  left: 0;
  width: 202px;
  bottom: 0;
  padding: 12px 10px 12px;
  -webkit-box-sizing: border-box;
  box-sizing: border-box;
  white-space: normal;
  word-break: break-all;
  line-height: 23px;
  z-index: 3;
}

.el-table__row.current-row .fld-caption {
  position: absolute;
  background-color: #fff;
  -webkit-box-shadow: inset 0px -12px 10px -16px rgba(0, 0, 0, 0.36);
  -moz-box-shadow: inset 0px -12px 10px -16px rgba(0, 0, 0, 0.36);
  box-shadow: inset 0px -12px 10px -16px rgba(0, 0, 0, 0.36);
  width: 160px;
  z-index: 3;
}
.company-detail .el-table__footer-wrapper,
.el-table__header-wrapper {
  overflow: hidden;
  border-top: 1px solid #ebeef5;
}
.company-detail .el-button.table-panel-btn-close {
  position: absolute;
  top: -1px;
  left: -1px;
  z-index: 1;
  padding: 2px;
  font-size: 25px;
  border-radius: 0;
}

.company-detail .el-table--border th:first-child,
.company-detail .el-table--border td:first-child {
  border-right: 0;
}

.company-detail .el-table--enable-row-hover .el-table__body tr:hover > td {
  background-color: #fff;
}
.company-detail
  .el-table--enable-row-hover
  .el-table__body
  tr.current-row:hover
  > td {
  background-color: #fff;
}
.company-detail .el-table__row.current-row td:first-child {
  position: relative;
}
.company-detail .el-table__row.current-row td:first-child:before {
  position: absolute;
  content: "";
  width: 0;
  height: 100%;
  border-left: 2px solid #4965d3;
  top: 0;
  left: 0;
}
.company-detail .el-checkbox:last-child {
  margin-left: 10px;
}
.company-detail .el-select-dropdown.el-popper {
  position: absolute;
  min-width: 120px;
  transform-origin: center top;
  z-index: 3200 !important;
  position: absolute;
  top: 394px;
  left: 221px;
}

.el-select-dropdown .el-popper {
  z-index: 9999 !important;
}

.batchAction {
  padding-top: 10px;
}
</style>
