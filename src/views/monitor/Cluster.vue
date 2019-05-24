<template>
<!-- 集群监控 -->
  <div class="cluster">
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
      <div class="top-left">
        <h2>集群物理机</h2>
      </div>
      <div class="top-center">
        <h2>已连接物理机</h2>
      </div>
      <div class="top-right">
        <h2>物理机存储</h2>
      </div>
    </div>
    <div class="center">
      <div class="container">
        <h2>集群物理机CPU负载</h2>
      </div>
      <div class="container">
        <h2>集群物理机内存负载</h2>
      </div>
      <div class="container">
        <h2>集群物理机磁盘写入（I）</h2>
      </div>
    </div>
    <div class="center">
      <div class="container">
        <h2>集群物理机CPU负载</h2>
      </div>
      <div class="container">
        <h2>集群物理机内存负载</h2>
      </div>
      <div class="container">
        <h2>集群物理机磁盘写入（I）</h2>
      </div>
    </div>
  </div>
</template>
<script>
// 集群监控
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
.top {
  height: 182px;
  padding: 20px 20px;
  display: flex;
  width: 100%;
  .top-left {
    width: 400px;
    height: 162px;
    background: rgba(86, 118, 230, 1);
    box-shadow: 0px 3px 15px 0px rgba(53, 152, 219, 0.5);
    border-radius: 4px;
  }
  .top-center {
    width: 400px;
    height: 162px;
    background: rgba(64, 194, 206, 1);
    box-shadow: 0px 3px 15px 0px rgba(53, 152, 219, 0.5);
    border-radius: 4px;
    margin-left: 20px;
  }
  .top-right {
    width: 840px;
    height: 162px;
    background: rgba(255, 255, 255, 1);
    border: 1px solid rgba(208, 208, 208, 1);
    border-radius: 4px;
    margin-left: 20px;
  }
}
.center {
  width: 1680px;
  height: 268px;
  background: rgba(255, 255, 255, 1);
  border: 1px solid rgba(208, 208, 208, 1);
  border-radius: 4px;
  margin-left: 20px;
  margin-top: 20px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  .container {
    height: 239px;
    width: 33.3%;
    border-right: 1px dotted #c0c0c0;
  }
  .container:nth-last-of-type() {
    border-right: none;
  }
}
</style>
