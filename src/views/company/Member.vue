<template>
  <el-container class="member">
    <el-header
      style="background-color: #f4f8fb;
    color: #4b62d2;
    font-weight: 600;
    font-size: 17px;
    border-bottom: 1px solid #C9C9C9;
    line-height: 60px;"
    >
      <el-row>
        <el-col :span="12">
          <el-link type="primary" style="font-size: 16px; font-weight: 700">{{$route.meta.title}}</el-link>
        </el-col>
        <el-col :span="12">
          <div class="grid-content bg-purple-light"></div>
        </el-col>
      </el-row>

    </el-header>
    <el-main style="background-color: #F7F8FD; padding:0">
      <el-container>
        <el-aside
          width="388px"
          style="border-right: 1px solid #DEDEDE; padding: 20px 20px 20px 10px"
        >
          <el-form
            label-position="right"
            label-width="80px"
            :model="formAdd"
            :rules="formAddrules"
            ref="formAdd"
          >
            <el-form-item label="姓名">
              <el-input v-model="formAdd.realName"></el-input>
            </el-form-item>
            <el-form-item label="部门">
              <el-input v-model="formAdd.dpId"></el-input>
            </el-form-item>
            <el-form-item label="联系电话">
              <el-input v-model="formAdd.phone"></el-input>
            </el-form-item>
            <el-form-item label="邮箱地址">
              <el-input v-model="formAdd.email"></el-input>
            </el-form-item>
          </el-form>
        </el-aside>
        <el-container>
          <el-main style="background-color: #fff; padding: 20px">
            <el-row class="actionBar">
              <el-col :span="9">
                <div class>
                  <el-input
                    placeholder="请输入内容"
                    v-model="searchSelectInput"
                    class="input-with-select"
                  >
                    <el-select v-model="searchSelectOption" slot="prepend" placeholder="请选择">
                      <el-option label="部门名称" value="1"></el-option>
                    </el-select>
                    <el-button slot="append" icon="el-icon-search"></el-button>
                  </el-input>
                </div>
              </el-col>
              <el-col :span="15">
                <div class="grid-content bg-purple" style="float: right">
                  <el-button type="primary" icon="el-icon-refresh" circle plain></el-button>
                  <el-button type="primary" plain>创建用户</el-button>
                  <el-button type="primary" plain>批量创建</el-button>
                </div>
              </el-col>
            </el-row>
            <div
              class="el-table el-table--fit el-table--border el-table--enable-row-hover el-table--enable-row-transition"
              style="width: 100%"
            >
              <div class="el-table__header-wrapper">
                <table
                  cellspacing="0"
                  cellpadding="0"
                  border="0"
                  class="el-table__header"
                  style="width: 100%"
                >
                  <thead>
                    <tr>
                      <th class>
                        <div class="cell">部门名称</div>
                      </th>
                      <th class style="width: 160px">
                        <div class="cell">部门负责人</div>
                      </th>
                      <th class style="width: 160px">
                        <div class="cell">总人数</div>
                      </th>
                      <th class style="width: 160px">
                        <div class="cell">上级部门</div>
                      </th>
                      <th class style="width: 160px">
                        <div class="cell">创建日期</div>
                      </th>
                    </tr>
                  </thead>
                </table>
              </div>
              <el-tree
                ref="treeForm"
                :data="data"
                show-checkbox
                node-key="id"
                :expand-on-click-node="false"
                check-strictly
                @check-change="handleClick"
                @node-click="nodeClicked"
                highlight-current
                check-on-click-node
              >
                <div class="custom-tree-node" slot-scope="{ node }">
                  <div style="display: inline-block">{{ node.label }}</div>
                  <div style="position:absolute; top: 13px; right:0; width: 640px;">
                    <el-row>
                      <el-col :span="6">
                        <div class="grid-content bg-purple" style="padding-left: 10px;">张经理</div>
                      </el-col>
                      <el-col :span="6">
                        <div class="grid-content bg-purple" style="padding-left: 10px;">42人</div>
                      </el-col>
                      <el-col :span="6">
                        <div class="grid-content bg-purple" style="padding-left: 10px;">私有云</div>
                      </el-col>
                      <el-col :span="6">
                        <div
                          class="grid-content bg-purple"
                          style="padding-left: 10px;"
                        >2019-05-01:09:01</div>
                      </el-col>
                    </el-row>
                  </div>
                </div>
              </el-tree>
            </div>
          </el-main>
        </el-container>
      </el-container>
    </el-main>
  </el-container>
</template>

<script>
// 人员管理

var validPhone = (rule, value, callback) => {
  if (!value) {
    callback(new Error('请输入手机号码'))
  } else if (!window.utils.formValidate.isValidPhone(value)) {
    callback(new Error('请输入正确的11位手机号码'))
  } else {
    callback()
  }
}
export default {
  name: 'Cluster',
  data () {
    return {
      formAdd: {
        realName: '',
        dpId: '',
        phone: '',
        email: ''
      },
      formAddrules: {
        realName: [
          { required: true, message: '请输入活动名称', trigger: 'blur' },
          { min: 3, max: 5, message: '长度在 3 到 5 个字符', trigger: 'blur' }
        ],
        dpId: [
          { required: true, message: '部门ID', trigger: 'change' }
        ],
        phone: [
          { required: true, message: '请输入手机号', validator: validPhone, trigger: 'blur' }
        ],
        email: [
          { type: 'email', required: false, message: '请选择时间', trigger: 'change' }
        ]
      },
      searchSelectOption: '1',
      searchSelectInput: '',
      tableData: [{
        date: '2016-05-02',
        name: '王小虎',
        address: '上海市普陀区金沙江路 1518 弄'
      }],
      data: [{
        id: 1,
        label: '一级 1',
        children: [{
          id: 4,
          label: '二级 1-1',
          children: [{
            id: 9,
            label: '三级 1-1-1'
          }, {
            id: 10,
            label: '三级 1-1-2'
          }]
        }]
      }, {
        id: 2,
        label: '一级 2',
        children: [{
          id: 5,
          label: '二级 2-1'
        }, {
          id: 6,
          label: '二级 2-2'
        }]
      }, {
        id: 3,
        label: '一级 3',
        children: [{
          id: 7,
          label: '二级 3-1'
        }, {
          id: 8,
          label: '二级 3-2'
        }]
      }],
      dataBak: [{
        id: 1,
        label: '一级 1',
        children: [{
          id: 4,
          label: '二级 1-1',
          children: [{
            id: 9,
            label: '三级 1-1-1'
          }, {
            id: 10,
            label: '三级 1-1-2'
          }]
        }]
      }, {
        id: 2,
        label: '一级 2',
        children: [{
          id: 5,
          label: '二级 2-1'
        }, {
          id: 6,
          label: '二级 2-2'
        }]
      }, {
        id: 3,
        label: '一级 3',
        children: [{
          id: 7,
          label: '二级 3-1'
        }, {
          id: 8,
          label: '二级 3-2'
        }]
      }],
      dataFlat: [],
      defaultProps: {
        children: 'children',
        label: 'label'
      }
    }
  },
  watch: {
    searchSelectInput (val) {
      // this.$refs.treeForm.filter(val)
      console.log('输入的数据:', val)
      this.dataFlat = []
      this.tree2flat(this.dataBak, 'children')
      console.log('this.dataFlat', this.dataFlat)
      let n = this.dataFlat.filter(val => val.id === val)
      console.log(n)
      if (val !== '') {
        this.data = this.dataFlat.filter(item => item.label.indexOf(val) !== -1)
        console.log('this.data', this.data)
      } else {
        this.data = this.dataBak
      }
      console.log('this.dataBak')
    }
  },
  created () {

  },
  mounted () {

  },
  methods: {
    tree2flat (treeArr, childrenField) {
      if (treeArr.length > 0) {
        treeArr.forEach(obj => {
          let tempObj = {}
          let newTree = []
          Object.entries(obj).forEach(arr => {
            if (arr[0] !== childrenField) {
              tempObj[arr[0]] = arr[1]
            } else {
              newTree = arr[1]
            }
          })
          console.log(tempObj)
          this.dataFlat.push(tempObj)
          if (newTree.length !== 0) {
            this.tree2flat(newTree, childrenField)
          }
        })
      }
    },
    handleClick (data, checked, node) {
      this.i++
      if (this.i % 2 === 0) {
        if (checked) {
          this.$refs.treeForm.setCheckedNodes([])
          this.$refs.treeForm.setCheckedNodes([data])
          // 轮换点击节点，仅选中当前节点
        } else {
          this.$refs.treeForm.setCheckedNodes([])
          // 如果点击了已经选中的节点，则清空节点
        }
      }
    },
    filterNode (value, data) {
      if (!value) return true
      return data.label.indexOf(value) !== -1
    },
    nodeClicked (data, node, tree) {
      // console.log('data:', data)
      // console.log('当前节点数据:', data.id, data.label)
    }
  }
}
</script>

<style>
.member {
  height: 100%;
}
.member > .el-header,
.member > .el-main {
  height: calc(100% - 60px);
}
.member .el-tree-node .el-tree-node__content .el-checkbox > .el-checkbox__input,
.member
  .el-tree-node
  .el-tree-node__content
  .el-checkbox
  > .el-checkbox__input
  > .el-checkbox__inner {
  width: 0;
  border: 0;
  background-color: transparent;
  overflow: hidden;
}
</style>
<style scoped>
</style>
