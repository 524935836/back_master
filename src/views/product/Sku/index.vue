<template>
  <div>
    <!-- 表格 -->
    <el-table style="width: 100%" border :data="records">
      <el-table-column
        type="index"
        label="序号"
        width="80"
        align="center"
        :index="indexMethod"
      ></el-table-column>
      <el-table-column prop="skuName" label="名称" width="width"></el-table-column>
      <el-table-column prop="skuDesc" label="描述" width="width"></el-table-column>
      <el-table-column v-slot="{ row }" prop="prop" label="默认图片" width="110">
        <img :src="row.skuDefaultImg" alt="" style="width: 80px; height: 80px" />
      </el-table-column>
      <el-table-column prop="weight" label="重量" width="80"></el-table-column>
      <el-table-column prop="price" label="价格" width="80"></el-table-column>
      <el-table-column prop="prop" label="操作" width="width">
        <el-button type="success" icon="el-icon-bottom" size="mini"></el-button>
        <el-button type="success" icon="el-icon-top" size="mini"></el-button>
        <el-button type="primary" icon="el-icon-edit" size="mini"></el-button>
        <el-button type="info" icon="el-icon-info" size="mini"></el-button>
        <el-button type="danger" icon="el-icon-delete" size="mini"></el-button>
      </el-table-column>
    </el-table>
    <!-- 分页器 -->
    <!--@size-change="handleSizeChange"
        @current-change="handleCurrentChange" -->
    <el-pagination
      style="text-align: center"
      :current-page="pageNum"
      :page-sizes="[3, 5, 10]"
      :page-size="pageSize"
      layout="prev, pager, next, jumper,->,sizes,total"
      :total="totalCount"
      @size-change="handleSizeChange"
      @current-change="getSkuList"
    >
    </el-pagination>
  </div>
</template>

<script>
export default {
  name: 'Sku',
  data() {
    return {
      pageNum: 1,
      pageSize: 10,
      totalCount: 50,
      records: []
    }
  },
  mounted() {
    this.getSkuList()
  },
  methods: {
    // 获取数据
    async getSkuList(pageNum = 1) {
      this.pageNum = pageNum

      try {
        const res = await this.$API.sku.reqSkuList(this.pageNum, this.pageSize)
        this.records = res.data.records
        this.totalCount = res.data.total
      } catch (err) {
        return
      }
    },
    handleSizeChange(pageSize) {
      this.pageSize = pageSize
      this.getSkuList()
    },
    // 自定义索引
    indexMethod(index) {
      return (this.pageNum - 1) * this.pageSize + 1 + index
    }
  }
}
</script>

<style lang="less" scoped></style>
