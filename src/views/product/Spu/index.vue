<template>
  <div>
    <el-card style="margin: 20px 0px">
      <CategorySelect :show="!show" @getCategoryId="getCategoryId"></CategorySelect>
    </el-card>
    <el-card>
      <div v-show="scene === 0">
        <el-button
          type="primary"
          icon="el-icon-plus"
          :disabled="!category3Id"
          @click="addSpu"
        >添加SPU</el-button>
        <!-- 表格 -->
        <el-table style="width: 100%" border :data="records">
          <el-table-column
            type="index"
            label="序号"
            width="80"
            align="center"
            :index="indexMethod"
          ></el-table-column>
          <el-table-column prop="spuName" label="SPU名称" width="width"> </el-table-column>
          <el-table-column prop="description" label="SPU描述" width="width"> </el-table-column>
          <el-table-column v-slot="{ row }" prop="prop" label="操作" width="width">
            <hint-button
              type="success"
              icon="el-icon-plus"
              size="mini"
              title="添加sku"
            ></hint-button>
            <hint-button
              type="warning"
              icon="el-icon-edit"
              size="mini"
              title="修改spu"
              @click="updateSpu(row)"
            ></hint-button>
            <hint-button
              type="info"
              icon="el-icon-info"
              size="mini"
              title="查看当前spu全部sku列表"
            ></hint-button>
            <hint-button
              type="danger"
              icon="el-icon-delete"
              size="mini"
              title="删除spu"
            ></hint-button>
          </el-table-column>
        </el-table>
        <el-pagination
          style="text-align: center"
          :current-page="pageNum"
          :page-sizes="[3, 5, 10]"
          :page-size="pageSize"
          layout="prev, pager, next, jumper, ->, sizes, total"
          :total="total"
          @current-change="getSpuList"
          @size-change="handleSizeChange"
        >
        </el-pagination>
      </div>
      <SpuForm v-show="scene === 1" ref="spu" @changeScene="changeScene"></SpuForm>
      <SkuForm v-show="scene === 2"></SkuForm>
    </el-card>
  </div>
</template>

<script>
import SpuForm from './SpuForm'
import SkuForm from './SkuForm'

export default {
  name: 'Spu',
  components: {
    SpuForm,
    SkuForm
  },
  data() {
    return {
      show: true,
      category1Id: '',
      category2Id: '',
      category3Id: '',
      pageNum: 0,
      pageSize: 3,
      total: 0,
      records: [],
      scene: 1
    }
  },
  methods: {
    // 获取子组件的id
    getCategoryId({ categoryId, level }) {
      if (level === 1) {
        this.category1Id = categoryId
        this.category2Id = ''
        this.category3Id = ''
        this.records = []
      } else if (level === 2) {
        this.category2Id = categoryId
        this.category3Id = ''
        this.records = []
      } else {
        this.category3Id = categoryId
        this.records = []
        // 获取属性列表
        this.getSpuList()
      }
    },
    // 获取属性
    async getSpuList(page = 1) {
      this.pageNum = page
      try {
        const res = await this.$API.spu.reqSpuList(
          this.pageNum,
          this.pageSize,
          this.category3Id
        )
        this.records = res.data.records
        this.total = res.data.total
      } catch (err) {
        return
      }
    },
    // 改变当前页item数量的回调
    handleSizeChange(limit) {
      this.pageSize = limit
      this.getSpuList()
    },
    // 自定义索引
    indexMethod(index) {
      return (this.pageNum - 1) * this.pageSize + 1 + index
    },
    // 添加spu按钮的回调
    addSpu() {
      this.scene = 1
    },
    // 修改spu按钮的回调
    updateSpu(row) {
      this.scene = 1
      this.$refs.spu.initSpuData(row)
    },
    // 修改scene的自定义事件
    changeScene(scene) {
      this.scene = scene
    }
  }
}
</script>

<style lang="less" scoped></style>
