<template>
  <el-container class="department">
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
          <div class="grid-content-light"></div>
        </el-col>
      </el-row>
    </el-header>

    <el-main style="padding: 20px">
      <el-row class="actionBar">
        <el-col :span="7">
          <div class>
            <el-input placeholder="请输入内容" v-model="searchSelectInput" class="input-with-select">
              <el-select v-model="searchSelectOption" slot="prepend" placeholder="请选择">
                <el-option label="部门名称" value="1"></el-option>
              </el-select>
              <el-button slot="append" icon="el-icon-search"></el-button>
            </el-input>
          </div>
        </el-col>
        <el-col :span="17">
          <div class="grid-content" style="float: right">
            <el-button type="primary" icon="el-icon-refresh" circle plain></el-button>
            <el-button type="primary" plain @click.stop="addDept()">创建顶级部门</el-button>
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
                <th class style="width: 700px">
                  <el-row>
                    <el-col :span="5">
                      <div class="grid-content" style="padding-left: 10px;">部门负责人</div>
                    </el-col>
                    <el-col :span="5">
                      <div class="grid-content" style="padding-left: 10px;">总人数</div>
                    </el-col>
                    <el-col :span="5">
                      <div class="grid-content" style="padding-left: 10px;">上级部门</div>
                    </el-col>
                    <el-col :span="9">
                      <div class="grid-content" style="padding-left: 10px;">操作</div>
                    </el-col>
                  </el-row>
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
          :expand-on-click-node="true"
          check-strictly
          @check-change="handleClick"
          highlight-current
          @node-click="nodeClicked"
        >
          <div class="custom-tree-node" slot-scope="{ node, data }">
            <div style="display: inline-block" @click.stop="openDetail(data)">
              <el-link>{{ data.dpName }}</el-link>
              <!-- <i class="el-icon-top-right pdl5"></i> -->
            </div>
            <div style="position:absolute; top: 13px; right:0; width: 700px;">
              <el-row>
                <el-col :span="5">
                  <div class="grid-content cut-text" style="padding-left: 10px;">
                    <a :title="data.userRealName">{{data.userRealName? data.userRealName: "-"}}</a>
                  </div>
                </el-col>
                <el-col :span="5">
                  <div
                    class="grid-content cut-text"
                    style="padding-left: 10px;"
                  >{{data.totalMembers === null? data.totalMembers: "-"}}</div>
                </el-col>
                <el-col :span="5">
                  <div class="grid-content cut-text" style="padding-left: 10px;">
                    <a :title="data.parentName">{{data.parentName? data.parentName: "-"}}</a>
                  </div>
                </el-col>
                <el-col :span="9">
                  <div class="grid-content cut-text" style="padding-left: 10px;">
                    <el-row>
                      <el-col :span="9">
                        <div class="grid-content cut-text" style>
                          <!-- <a class="el-link el-link--primary" >
                            <span class="el-link--inner">添加子部门</span>
                          </a>-->
                          <el-button type="text" @click.stop="() => addSub(data)">添加子部门</el-button>
                        </div>
                      </el-col>
                      <el-col :span="9">
                        <div class="grid-content cut-text" style>
                          <el-button type="text" @click.stop="() => addMaster(data)">添加负责人</el-button>
                        </div>
                      </el-col>
                      <el-col :span="6">
                        <div class="grid-content cut-text" style>
                          <el-button type="text" @click.stop="() => delDept(data)">删除</el-button>
                        </div>
                      </el-col>
                    </el-row>
                  </div>
                </el-col>
              </el-row>
            </div>
          </div>
        </el-tree>
      </div>
    </el-main>
    <!-- <el-profile-footer>profile-footer</el-profile-footer> -->
    <el-dialog title="添加顶级部门" :visible.sync="addDeptDialogVisible">
      <el-form :model="addDeptForm">
        <el-form-item label="部门名称" :label-width="addFormLabelWidth">
          <el-input v-model="addDeptForm.dpName" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="部门描述" :label-width="addFormLabelWidth">
          <el-input v-model="addDeptForm.dpDescription" autocomplete="off"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="addDeptDialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="addDeptDialogVisible = false">确 定</el-button>
      </div>
    </el-dialog>
    <el-dialog title="添加子部门" :visible.sync="addSubDialogVisible">
      <el-form :model="addSubForm">
        <el-form-item label="部门名称" :label-width="addFormLabelWidth">
          <el-input v-model="addSubForm.dpName" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="部门描述" :label-width="addFormLabelWidth">
          <el-input v-model="addSubForm.dpDescription" autocomplete="off"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="addSubDialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="addSubDialogVisible = false">确 定</el-button>
      </div>
    </el-dialog>
    <el-dialog title="添加负责人" :visible.sync="addMasterDialogVisible">
      <el-form :model="addMasterForm">
        <el-form-item label="部门名称" :label-width="addFormLabelWidth">
          <el-input v-model="addMasterForm.deptId" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="用户名称" :label-width="addFormLabelWidth">
          <el-input v-model="addMasterForm.userId" autocomplete="off"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="addMasterDialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="addMasterDialogVisible = false">确 定</el-button>
      </div>
    </el-dialog>
  </el-container>
</template>

<script>
// 组织管理
import { mapState, mapGetters, mapMutations, mapActions } from 'vuex'
export default {
  name: 'Cluster',
  data () {
    return {
      addDeptDialogVisible: false,
      addDeptForm: {
        dpName: '',
        dpDescription: '',
        parent: '',
        parentName: ''
      },
      addSubDialogVisible: false,
      addSubForm: {
        dpName: '',
        dpDescription: '',
        parent: '',
        parentName: ''
      },
      addMasterDialogVisible: false,
      addMasterForm: {
        deptId: '',
        userId: '',
        dpName: '',
        realName: ''
      },
      addFormLabelWidth: '120px',
      i: 0,
      searchSelectOption: '1',
      searchSelectInput: '',
      tableData: [{
        date: '2016-05-02',
        name: '王小虎',
        address: '上海市普陀区金沙江路 1518 弄'
      }],
      data: [],
      dataBak: [],
      dataFlat: [],
      defaultProps: {
        children: 'children',
        label: 'dpName'
      },
      treeCurrentSelected: []
    }
  },
  computed: {
    products () {
      return this.$store.state.products
    },
    ...mapState({
      user: state => state.user,
      token: state => state.token
    }),
    ...mapState('monitor', {
      monitorCount: state => state.count
    })
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
        this.data = this.dataFlat.filter(item => item.dpName.indexOf(val) !== -1)
        console.log('this.data', this.data)
      } else {
        this.data = this.dataBak
      }
      console.log('this.dataBak')
    }
  },
  created () {
    // this.$store.dispatch('register', { user: '宋江', token: 'songjiang' }).then(res => console.log(res))
    this.loadTree()
  },
  mounted () {

  },
  methods: {
    loadTree () {
      let vm = this
      this.axios.get('/personalResources/queryDeptList', {
        params: {
          // deptId: 0
        }
      })
        .then(function (response) {
          console.log(response.data.data)
          vm.data = response.data.data
          vm.dataBak = response.data.data
          console.log('vm.data:', vm.data)
        })
        .catch(function (error) {
          console.log(error)
        })
        .then(function () {
          // always executed
        })
    },
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
          // console.log('data', data)
          // console.log('data.id', data.id)
          // console.log('data.label', data.label)
          // 交叉点击节点
        } else {
          this.$refs.treeForm.setCheckedNodes([])
          // 点击已经选中的节点，置空
        }
      }

      // if (this.$refs.treeForm.getCheckedNodes().length !== 0) {
      //   this.treeCurrentSelected = this.$refs.treeForm.getCheckedNodes()
      // }
      // console.log('当前选中的节点：', this.treeCurrentSelected)
    },
    nodeClicked (data, node, tree) {
      console.log('data:', data)
      console.log('当前节点数据:', data.id, data.label)
      // console.log('node:', node)
      // console.log('tree:', tree)
      // console.log('当前选中的节点：', node.getCurrentNode())
    },
    openDetail (data) {
      console.log('打开详情页携带数据:', data)
      this.$router.push({ path: '/company/detail/', query: { dept: data.id } })
    },
    addDept () {
      console.log('添加顶级部门')
      this.addDeptDialogVisible = true
      // const newChild = { id: id++, label: 'testtest', children: [] }
      // if (!data.children) {
      //   this.$set(data, 'children', [])
      // }
      // data.children.push(newChild)
    },
    addSub (data) {
      console.log('添加子部门获取的数据：', data)
      this.addSubDialogVisible = true
      // const newChild = { id: id++, label: 'testtest', children: [] }
      // if (!data.children) {
      //   this.$set(data, 'children', [])
      // }
      // data.children.push(newChild)
    },
    addMaster (data) {
      console.log('添加负责人得到的数据：', data)
      this.addMasterDialogVisible = true
      // const newChild = { id: id++, label: 'testtest', children: [] }
      // if (!data.children) {
      //   this.$set(data, 'children', [])
      // }
      // data.children.push(newChild)
    },
    delDept (data) {
      console.log('删除部门得到的数据：', data)
      // this.delDeptDialogVisible = true
      let info = '确认删除吗？'
      if (data.children && data.children.length > 0) {
        info = '该部门包含子部门，确定后将一并删除，' + info
      }
      this.$confirm(info)
        .then(_ => {
          // request api delete data
          console.log('已经删除')
        })
        .catch(_ => { })
      // const newChild = { id: id++, label: 'testtest', children: [] }
      // if (!data.children) {
      //   this.$set(data, 'children', [])
      // }
      // data.children.push(newChild)
    },
    handleClose (done) {
      this.$confirm('确认关闭？')
        .then(_ => {
          done()
        })
        .catch(_ => { })
    },

    ...mapActions([
      'foo' // -> this.foo()
    ]),
    ...mapActions('monitor', [
      'monitorFoo' // -> this.bar()
    ]),
    ...mapActions({
      'increment': 'namespace/actionMethod'
    })
  }
}
</script>

<style>
.department {
  height: 100%;
}
/* 面包屑导航 */
.thumbnail {
  border-bottom: 1px solid #c9c9c9;
}

.el-tree {
  margin-left: -1px;
}
.el-tree-node .el-tree-node__content {
  display: flex;
  align-items: center;
  height: 46px !important;
  cursor: pointer;
  border-bottom: 1px dashed #f6f6f6;
  padding: 0 0;
  position: relative;
}
.el-tree-node .el-tree-node__content:before {
  content: "";
  position: absolute;
  width: 0;
  border-left: 1px dashed #e3e3e3;
  top: -22px;
  height: 46px;
}
.el-tree-node .el-tree-node__content:after {
  content: "";
  position: absolute;
  left: 0;
  top: 22px;
  width: 13px;
  height: 1px;
  background-color: #fff;
}
.el-tree-node .el-tree-node__content:hover:after {
  background-color: #f5f7fa;
}
.el-tree-node.is-focusable .el-tree-node__content:hover:after {
  background-color: #f5f7fa;
}
.el-tree-node .el-tree-node__content .el-checkbox {
  position: relative;
}
.el-tree-node .el-tree-node__content .el-checkbox:before {
  content: "";
  position: absolute;
  width: 12px;
  border-top: 1px dashed #e3e3e3;
  height: 0;
  left: -30px;
  top: 8px;
}
.el-tree-node .el-tree-node__content .el-tree-node__expand-icon {
  margin-left: 6px;
}
.el-tree-node__expand-icon.is-leaf ~ .el-checkbox:before {
  content: "";
  position: absolute;
  width: 25px;
  border-top: 1px dashed #e3e3e3;
  height: 0;
  left: -30px;
  top: 10px;
}
.el-tree-node__expand-icon.expanded ~ .el-checkbox:after {
  content: "";
  position: absolute;
  width: 0;
  border-left: 1px dashed #e3e3e3;
  height: 17px;
  left: -12px;
  top: 15px;
}
.el-tree-node__expand-icon.is-leaf ~ .el-checkbox:after {
  content: "";
  position: absolute;
  width: 0;
  border-left: 1px dashed #e3e3e3;
  height: 0;
  left: -12px;
  top: 15px;
}
.el-tree-node__children,
.treeitem {
  position: relative;
}
.el-tree-node.is-expanded .el-tree-node__children:before {
  content: "";
  display: block;
  position: absolute;
  width: 0;
  border-left: 1px dashed #ececec;
  height: 100%;
  left: 18px;
  top: 15px;
  z-index: 1;
}
.el-tree-node.is-expanded
  .el-tree-node__children
  .el-tree-node.is-expanded
  .el-tree-node__children:before {
  left: 36px;
}
.el-tree-node.is-expanded
  .el-tree-node__children
  .el-tree-node.is-expanded
  .el-tree-node__children
  .el-tree-node.is-expanded
  .el-tree-node__children:before {
  left: 54px;
}
.el-tree-node.is-expanded
  .el-tree-node__children
  .el-tree-node.is-expanded
  .el-tree-node__children
  .el-tree-node.is-expanded
  .el-tree-node__children
  .el-tree-node.is-expanded
  .el-tree-node__children:before {
  left: 72px;
}
.el-tree-node.is-expanded
  .el-tree-node__children
  .el-tree-node.is-expanded
  .el-tree-node__children
  .el-tree-node.is-expanded
  .el-tree-node__children
  .el-tree-node.is-expanded
  .el-tree-node__children
  .el-tree-node.is-expanded
  .el-tree-node__children:before {
  left: 90px;
}
.el-tree-node.is-expanded
  .el-tree-node__children
  .el-tree-node.is-expanded
  .el-tree-node__children
  .el-tree-node.is-expanded
  .el-tree-node__children
  .el-tree-node.is-expanded
  .el-tree-node__children
  .el-tree-node.is-expanded
  .el-tree-node__children
  .el-tree-node.is-expanded
  .el-tree-node__children:before {
  left: 108px;
}
.el-tree-node.is-expanded
  .el-tree-node__children
  .el-tree-node.is-expanded
  .el-tree-node__children
  .el-tree-node.is-expanded
  .el-tree-node__children
  .el-tree-node.is-expanded
  .el-tree-node__children
  .el-tree-node.is-expanded
  .el-tree-node__children
  .el-tree-node.is-expanded
  .el-tree-node__children
  .el-tree-node.is-expanded
  .el-tree-node__children:before {
  left: 126px;
}
.el-tree-node.is-expanded
  .el-tree-node__children
  .el-tree-node.is-expanded
  .el-tree-node__children
  .el-tree-node.is-expanded
  .el-tree-node__children
  .el-tree-node.is-expanded
  .el-tree-node__children
  .el-tree-node.is-expanded
  .el-tree-node__children
  .el-tree-node.is-expanded
  .el-tree-node__children
  .el-tree-node.is-expanded
  .el-tree-node__children
  .el-tree-node.is-expanded
  .el-tree-node__children:before {
  left: 144px;
}

.el-tree--highlight-current .el-tree-node.is-current > .el-tree-node__content {
  background-color: #f5f7fa !important;
}

.el-tree-node__expand-icon {
  color: #fdc22f !important;
}
.el-tree-node__expand-icon.is-leaf {
  color: transparent !important;
  cursor: default;
}
.el-table--group,
.el-table--border {
  border-color: #dedede !important;
}
.el-tree .el-link.el-link--primary {
  color: #4965d3;
}
.el-table th {
  background-color: #f3f7f9 !important;
  color: #333;
}
.el-table__footer-wrapper,
.el-table__header-wrapper {
  border-top: 0 !important;
}
.el-table__body,
.el-table__footer,
.el-table__header {
  table-layout: fixed;
  border-collapse: separate;
}
.actionBar {
  margin-bottom: 20px;
}
.actionBar .el-select .el-input {
  width: 130px;
}

.actionBar .el-input-group__append {
  background-color: #fff;
  color: #bfbfbf;
  vertical-align: middle;
  display: table-cell;
  position: absolute;
  border: 0;
  font-size: 24px;
  padding: 0 10px 0;
  width: 1px;
  white-space: nowrap;
  top: 5px;
  right: 28px;
}
.actionBar .el-input-group--append .el-input__inner {
  border-top-right-radius: 4px;
  border-bottom-right-radius: 4px;
}
.actionBar .el-button--primary.is-plain {
  color: #4964d4;
  background: #fff;
  border-color: #4964d4;
}

.department .el-table th div {
  display: block;
  padding-left: 0;
  padding-right: 0;
  line-height: inherit;
  -webkit-box-sizing: border-box;
  box-sizing: border-box;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
}
.department .el-table--border th {
  border-right-color: transparent;
}
.department .el-table--border th .el-col {
  position: relative;
}
.department .el-table--border th .el-col:before {
  content: "";
  display: block;
  position: absolute;
  top: -5px;
  left: 0;
  height: 50px;
  width: 0;
  border-left: 1px solid #d9d9d9;
  z-index: 1222;
}
.department .custom-tree-node .el-button {
  padding: 2px;
}

.department
  .el-tree-node
  .el-tree-node__content
  .el-checkbox
  > .el-checkbox__input,
.department
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
