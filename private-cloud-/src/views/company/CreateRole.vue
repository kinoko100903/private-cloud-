<template>
  <div class="role">
    <div class="createRole">
      <p>创建角色</p>
    </div>
    <div class="rolecon">
      <!-- 创建角色表单 -->
      <div class="roleTable">
        <el-form
          :model="ruleForm"
          :rules="rules"
          ref="ruleForm"
          label-width="100px"
          class="demo-ruleForm"
        >
          <el-form-item label="角色名称" prop="roleName" class="rolename">
            <el-input v-model.trim="ruleForm.roleName" class="rolename-input"></el-input>
          </el-form-item>
          <el-form-item label="隐藏" prop="permissionId" class="rolename" hidden>
            <el-input v-model="ruleForm.permissionId" class="rolename-input"></el-input>
          </el-form-item>
          <el-form-item label="角色类型" prop="roleType" class="roletype">
            <el-select v-model="ruleForm.roleType" placeholder="请选择" class="roletype-select">
              <el-option
                :label="item.dictName"
                :value="item.dictId"
                v-for="item in list"
                :key="item.dictId"
              ></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="描述" prop="description" class="roledesc">
            <el-input type="textarea" v-model="ruleForm.description" class="roledesc-input"></el-input>
          </el-form-item>
          <el-form-item>
            <el-button @click="resetForm('ruleForm')" class="reset">重置</el-button>
            <el-button type="primary" @click="submitForm('ruleForm')" class="submit">确定</el-button>
          </el-form-item>
        </el-form>
      </div>
      <!-- 角色树 -->
      <div class="roletree">
        <div class="jurisdiction">
          <i class="el-icon-edit"></i>
          <span>权限</span>
        </div>
        <div class="tree">
          <el-tree
            :data="roletree"
            show-checkbox
            node-key="permissionId"
            :default-expanded-keys="[2, 3]"
            :default-checked-keys="defaultId"
            :props="defaultProps"
            @check-change="handleCheckChange"
            ref="tree"
          ></el-tree>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
// 角色管理
export default {
  name: 'Cluster',
  data () {
    return {
      ruleForm: {
        roleName: '',
        roleType: '',
        description: '',
        permissionId: []
      },
      defaultId: [],
      list: [],
      rules: {
        roleName: [
          { required: true, message: '请输入角色名称', trigger: 'blur' }
        ],
        roleType: [
          { required: true, message: '请选择角色类型', trigger: 'change' }
        ]
      },
      roletree: [],
      defaultProps: {
        children: 'children',
        label: 'permissionName'
      }
    }
  },
  created () {
    this.getRoletype()
  },
  watch: {
    'ruleForm.roleType': function (val, oldval) {
      console.log(val, 'watch1')
      // 查询角色类型权限
      this.axios({
        // url: `http://172.27.124.145:8600/permission/getPermissionByRoleType?roleType=${val}`,
        url: this.$utils.api.company.getPermissionByRoleType + '?' + 'roleType' + '=' + val,
        method: 'get'
      }).then(res => {
        // console.log(res.data.data, '查询角色类型权限')
        this.roletree = res.data.data
        console.log(this.roletree, 'roletree')
      })
    }
  },
  methods: {
    // 按用户选中的传id
    submitForm (formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          let config = {
            headers: {
              'content-type': 'application/x-www-form-urlencoded'
            }
          }
          // 处理handleCheckChange方法中的数据
          console.log(this.ruleForm.permissionId, 'aaa')
          console.log(this.ruleForm.permissionId.join(','), 'kkk')
          // 深拷贝：
          let data = { ...this.ruleForm }
          data.permissionId = this.ruleForm.permissionId.join(',')
          console.log('data', data)
          // 创建角色
          this.axios({
            // url: 'http://172.27.124.145:8600/role/createRole',
            url: this.$utils.api.company.createRole,
            data: data,
            config,
            method: 'post'
          }).then(res => {
            // console.log(res, '创建角色')
            alert(res.data.errorMsg)
          }).catch(err => {
            alert(err)
          })
        } else {
          alert('error submit!!')
          return false
        }
      })
    },
    // 默认全选中：
    resetForm (formName) {
      this.$refs[formName].resetFields()
    },
    getRoletype () {
      // 查询角色类型
      this.axios({
        // url: 'http://172.27.124.145:8600/role/selectRoleType',
        url: this.$utils.api.company.selectRoleType,
        method: 'get'
      }).then(res => {
        // console.log(res.data.data, '查询角色类型')
        this.list = res.data.data
      })
    },
    handleCheckChange (data, checked, indeterminate) {
      console.log('data, checked, indeterminate:', data, checked, indeterminate)
      if (this.$refs.tree.getCheckedNodes().length !== 0) {
        // this.ruleForm.permissionId = this.$refs.tree.getCheckedNodes()   //子节点未全选中，父节点不选
        this.ruleForm.permissionId = this.$refs.tree.getCheckedKeys().concat(this.$refs.tree.getHalfCheckedKeys()) // 子节点未全选中，父节点选择
      }
      console.log('当前选中的节点==：', this.ruleForm.permissionId)
    }
  }
}

</script>

<style lang="scss" scoped>
.createRole {
  height: 60px;
  background: rgba(244, 248, 251, 1);
  box-sizing: border-box;
  p {
    height: 16px;
    font-size: 16px;
    font-family: FZLTZHK--GBK1-0;
    font-weight: 600;
    color: rgba(73, 100, 212, 1);
    padding-left: 20px;
    padding-top: 21px;
  }
}
.roleTable {
  width: 378px;
  height: 928px;
  background: rgba(247, 248, 253, 1);
  border: 1px solid rgba(222, 222, 222, 1);
}
.rolename {
  margin-top: 31px;
  .rolename-input {
    width: 244px;
    height: 36px;
  }
}
.roletype .roletype-select {
  width: 244px;
  height: 36px;
}
.roledesc .roledesc-input {
  width: 244px;
}
.reset {
  margin-left: 92px;
}
.rolecon {
  position: relative;
}
.roletree {
  position: absolute;
  width: 1342px;
  top: 0;
  right: 0;
}
.jurisdiction {
  height: 82px;
  width: 1301px;
  margin: 0 auto;
  border-bottom: 1px dotted #c0cfdb;
  line-height: 82px;
  i {
    color: #4964d4;
    margin-left: 22px;
  }
  span {
    font-size: 14px;
    color: #333333;
    margin-left: 11px;
  }
}
.tree {
  width: 1217px;
  margin: 0 auto;
  margin-top: 20px;
}
.role /deep/ .el-tree-node__expand-icon {
  color: #fdc22f;
}
</style>
