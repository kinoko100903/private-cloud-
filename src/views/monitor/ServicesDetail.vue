<template>
<!-- 服务监控详情 -->
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
    <div class="tableCon">
      <el-table ref="multipleTable" :data="tableData" tooltip-effect="dark" style="width: 100%">
        <el-table-column prop="colony" label="集群" show-overflow-tooltip></el-table-column>
        <el-table-column prop="SN" label="SN" show-overflow-tooltip></el-table-column>
        <el-table-column prop="ip" label="IP地址" show-overflow-tooltip></el-table-column>
        <el-table-column prop="status" label="状态" show-overflow-tooltip width="1200"></el-table-column>
      </el-table>
    </div>
  </div>
</template>

<script>
// 服务监控
export default {
  name: 'Cluster',
  data () {
    return {
      tableData: [
        { 'pmID': 11,
          'code': '2102311EEY10H4000055',
          'ip': '172.27.126.201',
          'sshPort': 22,
          'loginName': 'root',
          'password': '******',
          'cpuSlot': 2,
          'cabinet': 'awd',
          'arena': 'tianjin',
          'brand': 'Huawei',
          'type': 'RH2288 V3',
          'hostname': 'controller1',
          'ethCount': 2,
          'createTime': '2019-05-15T04:16:55.000+0000',
          'usedCpu': 4.8,
          'totalCpuCore': 24,
          'totalMem': 255,
          'availMem': 183,
          'totalDisk': 2262,
          'availDisk': 2245,
          'connStatus': 'connected',
          'clusterName': '集群123'
        }
      ]
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
    width: 100%;
    li {
      width: 370px;
      height: 38px;
      border: 1px solid red;
      margin-left: 20px;
      margin-top: 20px;
    }
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
}
</style>
