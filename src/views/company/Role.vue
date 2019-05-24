<template>
  <div class="role">
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
    <!-- 搜索 -->
    <div style="margin-top: 15px;">
      <el-input placeholder="请输入" v-model="search" class="input-with-select input-all">
        <el-select v-model="select" slot="prepend" placeholder="角色名称" class="select">
          <el-option
            :label="item.roleName"
            :value="item.roleName"
            v-for="item in list"
          >{{item.roleName}}</el-option>
        </el-select>
        <el-button slot="append" icon="el-icon-search" @click.native="handleChange"></el-button>
      </el-input>
    </div>
    <!-- 刷新 -->
    <div class="refresh">
      <i class="el-icon-refresh"></i>
    </div>
    <!-- 创建角色 -->
    <router-link class="createRole" tag="div" to="/company/CreateRole">
      <i class="el-icon-document"></i>
      <p>创建角色</p>
    </router-link>
    <!-- 表格 -->
    <div class="tableCon">
      <el-table
        :data="tableData"
        height="667"
        border
        style="width: 100%"
        @row-click="handleRowClickRole"
        ref="tableData"
      >
        <el-table-column fixed prop="roleName" label="角色名称"></el-table-column>
        <el-table-column prop="dictName" label="角色类型"></el-table-column>
        <el-table-column prop="description" label="描述"></el-table-column>
        <!-- <el-table-column prop="authorization" label="角色权限" value="已授权"></el-table-column> -->
        <el-table-column prop="createTime" label="创建时间"></el-table-column>
        <el-table-column fixed="right" label="操作">
          <template slot-scope="scope">
            <!-- 树状图 -->
            <!-- Form -->
            <el-button type="text" @click="handleClick(scope.row)">修改权限</el-button>
            <!-- <el-button @click="handleClick(scope.row)" type="text" size="small">修改权限</el-button> -->
            <el-button
              @click.native.prevent="deleteRow(scope.$index, tableData)"
              type="text"
              size="small"
              class="del"
            >删除</el-button>
          </template>
        </el-table-column>
      </el-table>
      <div class="paging">
        <div class="block">
          <el-pagination
            :page-sizes="[10, 20, 30, 40]"
            :pageSize="pageSize"
            background
            layout="total, sizes, prev, pager, next, jumper"
            :total="total"
            :current-page.sync="currentPage"
            @click.native="handleChange"
            @size-change="handleSizeChange"
          ></el-pagination>
        </div>
      </div>
    </div>
    <el-dialog title="修改权限" :visible.sync="dialogTableVisible" :modal="false" width="520px">
      <div class="text">
        <p>
          角色名称：
          <span>{{roleName0}}</span>
        </p>
        <p>
          角色类型：
          <span>{{dictName0}}</span>
        </p>
      </div>
      <p class="treeText">操作权限</p>
      <el-tree
        :data="datatree"
        show-checkbox
        node-key="permissionId"
        :default-expanded-keys="[2, 3]"
        :default-checked-keys="roleTypeId"
        :props="defaultProps"
        ref="tree"
        @check-change="handleCheckChange"
        class="tree"
      ></el-tree>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogTableVisible = false" class="cancel">取 消</el-button>
        <!-- <el-button type="primary" @click="handleEdit(scope.$index, scope.row)">确 定</el-button> -->
        <el-button
          type="primary"
          @click="dialogTableVisible = false"
          @click.native="handleSubmit"
          class="sure"
          v-no-more-click
        >确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
// 角色管理
export default {
  name: 'Cluster',
  data () {
    return {
      // 角色表格
      tableData: [
        {
          roleName: '',
          roleType: '',
          description: '',
          createTime: '',
          permissionId: '',
          dictName: ''
        }],
      inject: ['reload'],
      select: '',
      dialogTableVisible: false,
      // 修改权限
      datatree: [],
      defaultProps: {
        children: 'children',
        label: 'permissionName'
      },
      // 查询角色的参数
      dictName: '',
      dictId: '',
      list: [], // 存放查询角色数据
      search: '',
      roleType: '',
      roleTypeId: [],
      total: 0,
      currentPage: 1,
      pageSize: 10,
      pagedata: {
        area: '', // 擅长领域
        total: 0, // 总页数
        pageNum: 1, // 第几页
        pageSize: 10, // 每页显示的数量
        currentPage: 1,
        roleName: ''
      },
      tablePrevData: {},
      updataData: {
        roleId: '',
        roleName: '',
        description: '',
        permissionId: ''
      },
      roleName0: '',
      dictName0: '',
      // 角色权限：
      objItem: '',
      user: [],
      userId: '',
      permissionId: ''
    }
  },
  created () {
    console.log(this.$utils.sessionStorage.getItem('user') || {}, 'user')
    this.user = this.$utils.sessionStorage.getItem('user') || {}
    this.userId = this.user.userID
    console.log(this.userId, 'this.userId ')
    console.log(this.user.roles[0].roleTypeId, 'user')
    console.log(this.permissionId, 'id')
    console.log(this.tableData, 'id1')
    // 查询用户子级权限
    this.axios({
      url: this.$utils.api.company.getlevelPrivilege,
      method: 'get',
      params: {
        userId: this.userId,
        permissionId: this.user.roles[0].roleTypeId
      }
    }).then(res => {
      console.log(res, '查询用户子级权限')
    })
  },
  mounted () {
    this.handleChange()
  },
  watch: {
    currentPage (oldV, newV) {
      // console.log(oldV, newV, 'watch')
      this.exchangeCurrentPage()
    }
  },
  methods: {
    // 查询角色/分页
    handleChange () {
      console.log(this.pageSize, 'kkk')
      this.axios({
        // url: 'http://172.27.124.145:8600/role/selectRole',
        url: this.$utils.api.company.selectRole,
        method: 'GET',
        params: {
          roleName: this.search,
          pageNum: this.currentPage,
          pageSize: this.pageSize
        }
      }).then((res) => {
        // console.log(res, '查询角色')
        this.list = res.data.data.list

        this.tableData = this.list
        this.pagedata = res.data.data.list
        this.total = res.data.data.total // 总页数

        // console.log(this.total, 'kkk')
      })
    },
    // 获取pageSize：
    handleSizeChange (val) {
      console.log(`每页 ${val} 条`)
      this.pageSize = val
    },
    exchangeCurrentPage () {
      this.pagedata = []
      this.handleChange()
    },
    // 删除角色
    deleteRow (index, rows) {
      // console.log(index, rows[index].id)
      this.axios({
        // url: 'http://172.27.124.145:8600/role/deleteRole',
        url: this.$utils.api.company.deleteRole,
        method: 'POST',
        data: {
          'id': rows[index].id
        }
      }).then(res => {
        alert(res.data.errorMsg, '删除角色')
        this.handleChange()
      })
    },

    handleClick (row) {
      // 获取当前行函数：
      this.dialogTableVisible = true
      // console.log(row.roleType, 'roleType')
      // console.log(row.id, 'id')
      this.id = row.id
      this.roleName0 = row.roleName
      this.dictName0 = row.dictName
      // 查询角色类型权限
      this.axios({
        // url: `http://172.27.124.145:8600/permission/getPermissionByRoleType?roleType=${row.roleType}`,
        url: this.$utils.api.company.getPermissionByRoleType + '?' + 'roleType' + '=' + row.roleType,
        method: 'get'
      }).then(res => {
        console.log(res.data.data, '查询角色类型权限')
        this.datatree = res.data.data
      })
      // 查询角色权限：
      this.axios({
        // url: `http://172.27.124.145:8600/permission/getAllPermission?roleId=${row.id}`,
        url: this.$utils.api.company.getAllPermission + '?' + 'roleId' + '=' + row.id,
        method: 'get'
      }).then(res => {
        console.log(res.data.data, '查询角色权限')
        // 不包含父节点，只有子节点
        this.roleTypeId = res.data.data

        // 角色权限
        // this.authorization = res.data.data
        // console.log(this.tableData, 'nnn')
        // var objList = []
        // this.tableData.map(item => {
        //   // console.log(item)
        //   let obj = { ...item }
        //   obj.authorization = this.authorization
        //   // console.log(obj)
        //   this.objItem = obj
        //   console.log(this.objItem, 'mmm')
        //   objList.push(this.objItem)
        //   console.log(objList, 'qqq')
        //   this.tableData = objList
        // })
        // 角色权限
      })
    },
    handleRowClickRole (row) {
      console.log(row, 'row')
      this.tablePrevData = row
      console.log(this.tablePrevData)
    },

    handleSubmit () {
      console.log(this.tablePrevData, 'iii')
      this.updataData.roleId = this.tablePrevData.id
      this.updataData.roleName = this.tablePrevData.roleName
      this.updataData.description = this.tablePrevData.description
      console.log(typeof this.updataData.roleName)
      let data = { ...this.updataData }
      // console.log(data, "data")
      data.permissionId = this.tableData.permissionId.join(',')
      console.log('data', data)

      // console.log('mmm')
      // 修改角色
      this.axios({
        url: this.$utils.api.company.updateRole,
        method: 'post',
        data: data
        // data: this.$utils.qs.stringify(data)

      }).then(res => {
        alert(res.data.errorMsg)
      }).catch(err => {
        alert(err)
      })
    },
    handleCheckChange (data, checked, indeterminate) {
      console.log('data, checked, indeterminate:', data, checked, indeterminate)
      if (this.$refs.tree.getCheckedNodes().length !== 0) {
        // this.ruleForm.permissionId = this.$refs.tree.getCheckedNodes()   //子节点未全选中，父节点不选
        this.tableData.permissionId = this.$refs.tree.getCheckedKeys().concat(this.$refs.tree.getHalfCheckedKeys()) // 子节点未全选中，父节点选择
      }
      console.log('当前选中的节点==：', this.tableData.permissionId)
    }

  }
}
</script>

<style lang="scss" scoped>
.input-all {
  width: 398px;
  height: 36px;
  margin-left: 20px;
  .select {
    width: 130px;
    height: 14px;
    font-size: 14px;
    font-family: MicrosoftYaHei;
    font-weight: 400;
    color: rgba(153, 153, 153, 1);
  }
}
.el-input__inner {
  color: #999;
}
.refresh {
  width: 36px;
  height: 36px;
  border: 1px solid rgba(73, 100, 212, 1);
  border-radius: 4px;
  float: right;
  margin-right: 225px;
  margin-top: -36px;
  line-height: 36px;
  text-align: center;
  i {
    font-size: 20px;
    color: #4964d4;
  }
}
.createRole {
  width: 126px;
  height: 36px;
  background: rgba(255, 255, 255, 1);
  border: 1px solid rgba(73, 100, 212, 1);
  border-radius: 4px;
  float: right;
  margin-right: 84px;
  margin-top: -36px;
  display: flex;
  align-items: center;
  i {
    font-size: 18px;
    color: #4964d4;
    margin-left: 25px;
  }
  p {
    height: 14px;
    font-size: 14px;
    font-family: Adobe Heiti Std R;
    font-weight: normal;
    color: rgba(73, 100, 212, 1);
    margin-left: 5px;
    margin-top: -4px;
  }
}
.tableCon {
  width: 94%;
  margin: 0 auto;
  height: 740px;
  background: rgba(255, 255, 255, 1);
  border: 1px solid rgba(222, 222, 222, 1);
  margin-bottom: 22px;
  margin-left: 21px;
  margin-top: 20px;
  position: relative;
  .paging {
    border-top: 1px solid #efefef;
    position: absolute;
    bottom: 0;
    height: 72px;
    width: 100%;
    .block {
      margin-top: 18px;
      margin-left: 40px;
    }
  }
}
.role /deep/ .el-pagination__sizes {
  margin: 0 970px 0 0;
}
.role /deep/ .is-leaf {
  background: rgba(243, 247, 249, 1);
  color: #333333;
  font-size: 14px;
}
.role /deep/ .is-leaf .cell {
  height: 30px;
  border-left: 1px solid #d9d9d9;
  line-height: 30px;
}
.role /deep/ .is-leaf:nth-of-type(1) .cell {
  border-left: 0;
}
.role /deep/ .el-table__row {
  color: #333333;
}
.labeltext {
  color: #4964d4;
  font-size: 14px;
  margin-left: 10px;
}
.role /deep/ .el-tree-node__expand-icon {
  color: #fdc22f;
}
.role /deep/ .el-table td {
  padding: 10px 0;
}
.del {
  margin-left: 10px;
}
.role /deep/ .el-table--border th,
.role /deep/ .el-table--border td {
  border-right: 0;
}
.role /deep/ .el-dialog__header {
  width: 100%;
  height: 50px;
  border-bottom: 1px dotted rgba(186, 186, 186, 1);
  span {
    font-size: 16px;
    margin-left: 55px;
  }
}
.text {
  display: flex;
  width: 85%;
  margin: 0 auto;
  justify-content: space-between;
  margin-top: -15px;
  p {
    font-size: 14px;
    color: #666;
    span {
      color: #333;
    }
  }
}
.treeText {
  color: #333;
  margin-left: 37px;
  margin-top: 20px;
}
.tree {
  width: 70%;
  padding: 10px 10px;
  border: 1px dotted rgba(186, 186, 186, 1);
  margin-left: 110px;
  margin-top: -20px;
}
.role /deep/.el-dialog__footer {
  width: 485px;
}
</style>
