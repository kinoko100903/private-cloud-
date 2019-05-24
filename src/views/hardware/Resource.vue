<template>
<!-- 硬件资源 -->
  <div class="Resource">
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
      <!-- 分页 -->
      <el-table ref="multipleTable" :data="tableData" tooltip-effect="dark" style="width: 100%">
        <el-table-column type="selection" width="55"></el-table-column>
        <el-table-column prop="brand" label="品牌" width="120"></el-table-column>
        <el-table-column prop="type" label="型号" width="120"></el-table-column>
        <el-table-column prop="colony" label="集群" show-overflow-tooltip></el-table-column>
        <el-table-column prop="SN" label="SN" show-overflow-tooltip></el-table-column>
        <el-table-column prop="ip" label="IP地址" show-overflow-tooltip></el-table-column>
        <el-table-column prop="status" label="状态" show-overflow-tooltip></el-table-column>
        <el-table-column prop="connStatus" label="连接状态" show-overflow-tooltip></el-table-column>
        <el-table-column prop="createTime" label="创建时间" show-overflow-tooltip></el-table-column>

        <el-table-column fixed="right" label="操作" width="100">
          <template slot-scope="scope">
            <el-button type="text" size="small" @click="handleClick(scope.row)">修改基本信息</el-button>
          </template>
        </el-table-column>
      </el-table>
      <div class="paging">
        <div class="block">
          <el-pagination
            :page-sizes="[10, 20, 30, 40]"
            :page-size="100"
            background
            layout="total, sizes, prev, pager, next, jumper"
            :total="50"
          ></el-pagination>
        </div>
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
      search: '',
      select: '',
      agentData: [{
        code: '2102311QGN10HB000891',
        time: '201905080921'
      }],
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
      ],
      multipleSelection: []
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
    height: 56px;
    width: 100%;
    .block {
     padding:14px 20px
    }
  }
}
.Resource /deep/ .el-pagination__sizes {
  margin: 0 960px 0 0;
}
</style>
