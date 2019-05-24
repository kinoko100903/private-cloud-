<template>
<!-- 硬件资源概览 -->
  <div class="overView">
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
    <div class="top">
      <div class="top-small"></div>
      <div class="top-small"></div>
    </div>
    <div class="bottom">
      <div class="page">
        <div class="block">
          <el-pagination
            @size-change="handleSizeChange"
            @current-change="handleCurrentChange"
            :current-page="currentPage"
            :page-sizes="[100, 200, 300, 400]"
            :page-size="100"
            layout="total, sizes, prev, pager, next, jumper"
            :total="400"
          ></el-pagination>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
// 硬件概览
export default {
  name: 'Cluster',
  data () {
    return {
      currentPage: 5
    }
  },
  created () {

  },
  mounted () {

  },
  methods: {
    handleSizeChange (val) {
      console.log(`每页 ${val} 条`)
    },
    handleCurrentChange (val) {
      console.log(`当前页: ${val}`)
    }
  },
  watch: {

  }
}
</script>

<style lang="scss" scoped>
.top {
  width: 1679px;
  height: 215px;
  background: rgba(255, 255, 255, 1);
  border: 1px solid rgba(208, 208, 208, 1);
  border-radius: 4px;
  margin-top: 20px;
  margin-left: 20px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  .top-small {
    width: 50%;
    height: 144px;
    border-right: 1px dotted #c0c0c0;
  }
  .top-small:nth-of-type(2) {
    border-right: none;
  }
}
.bottom {
  width: 1680px;
  height: 563px;
  background: rgba(255, 255, 255, 1);
  border: 1px solid rgba(208, 208, 208, 1);
  border-radius: 4px;
  margin-top: 20px;
  margin-left: 20px;
  position: relative;
  .page {
    width: 100%;
    height: 54px;
    position: absolute;
    border-top: 1px dotted #d0d0d0;
    bottom: 0;
    .block{
      padding:14px 20px;
    }
  }
}
.overView /deep/ .el-pagination__sizes {
  margin: 0 1107px 0 0;
}
</style>
