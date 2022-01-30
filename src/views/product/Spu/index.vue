<template>
  <div>
    <el-card>
      <CategorySelect :show="!show" @getCategoryId="getCategoryId"></CategorySelect>
    </el-card>
    <el-card>
      <div>
        <el-button type="primary" icon="el-icon-plus">添加SPU</el-button>
        <!-- 表格 -->
        <el-table style="width: 100%" border>
          <el-table-column type="index" label="序号" width="80"> </el-table-column>
          <el-table-column prop="prop" label="SPU名称" width="width"> </el-table-column>
          <el-table-column prop="prop" label="SPU描述" width="width"> </el-table-column>
          <el-table-column prop="prop" label="操作" width="width">
            <el-button type="success" icon="el-icon-plus" size="mini"></el-button>
            <el-button type="warning" icon="el-icon-edit" size="mini"></el-button>
            <el-button type="info" icon="el-icon-info" size="mini"></el-button>
            <el-button type="danger" icon="el-icon-delete" size="mini"></el-button>
          </el-table-column>
        </el-table>
        <!-- 分页器 -->
        <!-- @size-change="handleSizeChange"
          @current-change="handleCurrentChange" -->
        <el-pagination
          style="text-align: center"
          :current-page="1"
          :page-sizes="[3, 5, 10]"
          :page-size="3"
          layout="prev, pager, next, jumper, ->, sizes, total"
          :total="100"
        >
        </el-pagination>
      </div>
    </el-card>
  </div>
</template>

<script>
export default {
  name: 'Spu',
  data() {
    return {
      show: true,
      category1Id: '',
      category2Id: '',
      category3Id: ''
    }
  },
  methods: {
    // 获取子组件的id
    getCategoryId({ categoryId, level }) {
      if (level === 1) {
        this.category1Id = categoryId
        this.category2Id = ''
        this.category3Id = ''
        this.spuList = []
      } else if (level === 2) {
        this.category2Id = categoryId
        this.category3Id = ''
        this.spuList = []
      } else {
        this.category3Id = categoryId
        this.spuList = []
        // 获取属性列表
        this.getSpuList()
      }
    },
    // 获取属性
    async getSpuList() {
      // try {
      //   const res = await this.$API.attr.reqAttrList(
      //     this.category1Id,
      //     this.category2Id,
      //     this.category3Id
      //   )
      //   this.attrList = res.data
      // } catch (err) {
      //   return
      // }
    }
  }
}
</script>

<style lang="less" scoped></style>
