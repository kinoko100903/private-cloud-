<template>
  <div>
    <el-header class="thumbnail">
      <el-row>
        <el-col :span="12" class="pdt20 f22">
          <el-breadcrumb separator="/">
            <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
            <el-breadcrumb-item v-for="(item, index) in $route.meta" :key="index">{{item}}</el-breadcrumb-item>
          </el-breadcrumb>
        </el-col>
        <el-col :span="12">
          <div class="grid-content bg-purple-light" style="float: right; padding-top:10px;"></div>
        </el-col>
      </el-row>
    </el-header>
    <el-main>
      <div
        class="el-table el-table--fit el-table--border el-table--enable-row-hover el-table--enable-row-transition"
        style="width: 100%;height: 100%;"
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
                <th class>
                  <div class="cell">部门负责人</div>
                </th>
                <th class>
                  <div class="cell">总人数</div>
                </th>
                <th class>
                  <div class="cell">上级部门</div>
                </th>
                <th class>
                  <div class="cell">操作</div>
                </th>
              </tr>
            </thead>
          </table>
        </div>
        <el-tree
          :data="data"
          show-checkbox
          node-key="id"
          :default-expanded-keys="[2, 3]"
          :default-checked-keys="[5]"
          :props="defaultProps"
        ></el-tree>
      </div>
    </el-main>
    <!-- <el-profile-footer>profile-footer</el-profile-footer> -->
  </div>
</template>

<script>
// 组织管理
import { mapState, mapGetters, mapMutations, mapActions } from 'vuex'
export default {
  name: 'Cluster',
  data () {
    return {
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
        label: '一级 3'
        // children: [{
        //   id: 7,
        //   label: '二级 3-1'
        // }, {
        //   id: 8,
        //   label: '二级 3-2'
        // }]
      }],
      defaultProps: {
        children: 'children',
        label: 'label'
      }
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
  created () {
    // this.$store.dispatch('register', { user: '宋江', token: 'songjiang' }).then(res => console.log(res))
  },
  mounted () {

  },
  methods: {
    ...mapActions([
      'foo' // -> this.foo()
    ]),
    ...mapActions('monitor', [
      'monitorFoo' // -> this.bar()
    ]),
    ...mapActions({
      'increment': 'namespace/actionMethod'
    })
  },
  watch: {

  }
}
</script>

<style>
.el-tree {
  margin-left: -1px;
}
.el-tree-node .el-tree-node__content {
  display: flex;
  align-items: center;
  height: 46px !important;
  cursor: pointer;
  border-bottom: 1px solid #ebeef5;
  padding: 0 0;
  position: relative;
}
/* 竖条 */
.el-tree-node .el-tree-node__content:before {
  content: "";
  position: absolute;
  width: 0;
  border-left: 1px solid #ebeef5;
  top:-22px;
  height: 46px;
}
.el-tree-node .el-tree-node__content:after {
  content: "";
  position: absolute;
  left: 0;
  top: 23px;
  width: 13px;
  height: 1px;
  background-color: #fff;
}
.el-tree-node .el-tree-node__content:hover:after {
  background-color: #F5F7FA;
}
.el-tree-node.is-focusable .el-tree-node__content:hover:after {
  background-color: #F5F7FA;
}
.el-tree-node .el-tree-node__content .el-checkbox {
  position: relative;
}
.el-tree-node .el-tree-node__content .el-checkbox:before {
  content: "";
  position: absolute;
  width: 12px;
  border-top: 1px solid #ebeef5;
  height: 0;
  left: -30px;
  top: 10px;
}
.el-tree-node .el-tree-node__content .el-tree-node__expand-icon {
  margin-left: 6px;
}
.el-tree-node__expand-icon.is-leaf ~ .el-checkbox:before {
  content: "";
  position: absolute;
  width: 25px;
  border-top: 1px solid #ebeef5;
  height: 0;
  left: -30px;
  top: 10px;
}
.el-tree-node__expand-icon.expanded ~ .el-checkbox:after {
  content: "";
  position: absolute;
  width: 0;
  border-left: 1px solid #ebeef5;
  height: 17px;
  left: -12px;
  top: 15px;
}
.el-tree-node__expand-icon.is-leaf ~ .el-checkbox:after {
  content: "";
  position: absolute;
  width: 0;
  border-left: 1px solid #ebeef5;
  height: 0;
  left: -12px;
  top: 15px;
}
</style>
