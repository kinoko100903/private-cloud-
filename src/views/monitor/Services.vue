<template>
<!-- 服务监控 -->
  <div class="serve">
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
    <div class="ServiceMonitored">
      <ul>
        <li></li>
        <li></li>
        <li></li>
        <li></li>
        <li></li>
        <li></li>
        <li></li>
        <li></li>
      </ul>
    </div>
  </div>
</template>

<script>
// 服务监控
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
.ServiceMonitored {
  ul {
    list-style: none;
    display: flex;
    flex-wrap: wrap;
    width:100%;
    li {
      width: 370px;
      height: 38px;
      border: 1px solid red;
      margin-left: 20px;
      margin-top: 20px;
    }
  }
}
</style>
