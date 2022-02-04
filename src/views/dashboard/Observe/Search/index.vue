<template>
  <div>
    <!-- 卡片 -->
    <el-card>
      <!-- 头部 -->
      <div slot="header" class="header">
        <span>线上热门搜索</span>
        <!-- 下拉菜单 -->
        <el-dropdown>
          <span>
            <i class="el-icon-more"></i>
          </span>
          <el-dropdown-menu slot="dropdown">
            <el-dropdown-item>黄金糕</el-dropdown-item>
            <el-dropdown-item>狮子头</el-dropdown-item>
            <el-dropdown-item>螺蛳粉</el-dropdown-item>
            <el-dropdown-item>双皮奶</el-dropdown-item>
            <el-dropdown-item>蚵仔煎</el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>
      </div>
      <!-- 内容 -->
      <div>
        <!-- 折线图 -->
        <el-row :gutter="10">
          <el-col :span="12">
            <LineChart></LineChart>
          </el-col>
          <el-col :span="12">
            <LineChart></LineChart>
          </el-col>
        </el-row>
        <!-- 表格 -->
        <el-table :data="tableData" style="width: 100%;margin: 20px 0" border>
          <el-table-column label="排名" width="80" type="index" align="center"> </el-table-column>
          <el-table-column label="搜索关键字" width="180"> </el-table-column>
          <el-table-column label="用户数" sortable></el-table-column>
          <el-table-column label="周涨幅" sortable></el-table-column>
        </el-table>
        <!-- 分页 @size-change="handleSizeChange"
          @current-change="handleCurrentChange"-->
        <el-pagination
          :current-page="pageNum"
          layout="prev, pager, next"
          :total="totalCount"
          style="text-align: right"
        >
        </el-pagination>
      </div>
    </el-card>
  </div>
</template>

<script>
import LineChart from './LineChart'

export default {
  name: 'Search',
  components: {
    LineChart
  },
  data() {
    return {
      tableData: [{}],
      pageNum: 1,
      totalCount: 100
    }
  }
}
</script>

<style lang="less" scoped>
.header {
  display: flex;
  justify-content: space-between;
  align-items: center;
}
</style>
