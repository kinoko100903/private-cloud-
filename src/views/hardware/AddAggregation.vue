<template>
  <!-- 添加聚合主机 -->
  <div class="AddAggregation">
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
        <el-select v-model="select" slot="prepend" placeholder="品牌" class="select">
          <el-option :label="item.brand" :value="item.code" v-for="item in agentData">{{item.brand}}</el-option>
        </el-select>
        <el-button slot="append" icon="el-icon-search"></el-button>
      </el-input>
    </div>
    <!-- 表格 -->
    <div class="tableCon">
      <div class="left"></div>
      <div class="right">
        <div class="btnCon"></div>
      </div>
    </div>
  </div>
</template>

<script>
// 人员管理
export default {
  name: 'Cluster',
  data () {
    return {
    }
  },
  created () {

  },
  mounted () {
  },
  methods: {
  },
  watch: {

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

.tableCon {
  height: 1000px;
  border-left: 1px dotted #dedede;
  border-top: 1px dotted #dedede;
  margin-left: 21px;
  margin-top: 20px;
  .left {
    width: 170px;
  }
  .right {
    width: 1529px;
    height: 1389px;
    background: rgba(255, 255, 255, 1);
    border: 1px solid rgba(222, 222, 222, 1);
    box-shadow: 0px 3px 5px 0px rgba(112, 112, 112, 0.19);
    float: right;
    .btnCon {
      width: 1258px;
      height: 40px;
      background: rgba(255, 255, 255, 1);
      border-bottom: 1px solid #dedede;
    }
  }
}
</style>
