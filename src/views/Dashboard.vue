<template>
  <div class="home">
    <div class="block">
      <div class="btn-item">
        <div class="btn-icon">
          <i class="f f-kj"></i>
        </div>
        <div class="btn-text">开机</div>
      </div>
      <div class="btn-item">
        <div class="btn-icon">
          <i class="fa fa-power-off" aria-hidden="true"></i>
        </div>
        <div class="btn-text">关机</div>
      </div>

      <div class="btn-item">
        <div class="btn-icon">
          <i class="fa fa-refresh" aria-hidden="true"></i>
        </div>
        <div class="btn-text">重启</div>
      </div>

      <div class="btn-item">
        <div class="btn-icon icon-tachometer">
          <i class="fa fa-tachometer" aria-hidden="true"></i>
        </div>
        <div class="btn-text">挂机</div>
      </div>

      <div class="btn-item">
        <div class="btn-icon">
          <i class="fa fa-reply" aria-hidden="true"></i>
        </div>
        <div class="btn-text">恢复</div>
      </div>

      <div class="btn-item">
        <div class="btn-icon">
          <i class="fa fa-trash-o" aria-hidden="true"></i>
        </div>
        <div class="btn-text">删除</div>
      </div>

      <div class="btn-item">
        <div class="btn-icon">
          <i class="fa fa-navicon" aria-hidden="true"></i>
        </div>
        <div class="btn-text">更多</div>
      </div>
      <br style="clear: left;">
    </div>

    <div style="border: 2px solid #e3e3e3; padding: 15px;">
      <el-table :data="tableData" style="width: 100%">
        <el-table-column
          type="selection"
          width="55">
        </el-table-column>
        <el-table-column prop="date" label="日期" width="180"></el-table-column>
        <el-table-column prop="name" label="姓名" width="180"></el-table-column>
        <el-table-column prop="address" label="地址"></el-table-column>
      </el-table>
    </div>

  </div>
</template>

<script>
// @ is an alias to /src
// import HelloWorld from '@/components/HelloWorld.vue'

export default {
  name: 'home',
  components: {
  },
  data () {
    return {
      tableData: [{
        date: '2016-05-02',
        name: '王小虎',
        address: '上海市普陀区金沙江路 1518 弄'
      }, {
        date: '2016-05-04',
        name: '王小虎',
        address: '上海市普陀区金沙江路 1517 弄'
      }, {
        date: '2016-05-01',
        name: '王小虎',
        address: '上海市普陀区金沙江路 1519 弄'
      }, {
        date: '2016-05-03',
        name: '王小虎',
        address: '上海市普陀区金沙江路 1516 弄'
      }]
    }
  }
}
</script>

<style>
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
  color: #4965D3;
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
.el-checkbox__input.is-checked .el-checkbox__inner, .el-checkbox__input.is-indeterminate .el-checkbox__inner {
    background-color: #4965d3 !important;
    border-color: #4965d3 !important;
}
</style>
