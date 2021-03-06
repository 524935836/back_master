<template>
  <div>
    <el-card style="margin: 20px 0px">
      <CategorySelect :show="scene !== 0" @getCategoryId="getCategoryId"></CategorySelect>
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
              @click="addSku(row)"
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
              @click="showSkuList(row)"
            ></hint-button>
            <el-popconfirm title="这是一段内容确定删除吗？" @onConfirm="deleteSpu(row)">
              <hint-button
                slot="reference"
                type="danger"
                icon="el-icon-delete"
                size="mini"
                title="删除spu"
              ></hint-button>
            </el-popconfirm>
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
      <SkuForm v-show="scene === 2" ref="sku" @changeScene="changeScene"></SkuForm>
      <!-- 对话框 -->
      <el-dialog :title="spu.spuName" :visible.sync="dialogTableVisible" :before-close="closeDialog">
        <!-- 表格 -->
        <el-table v-loading="loading" :data="skuList" style="width: 100%" border>
          <el-table-column prop="skuName" label="名称" width="width"> </el-table-column>
          <el-table-column prop="price" label="价格" width="width"> </el-table-column>
          <el-table-column prop="weight" label="重量" width="width"> </el-table-column>
          <el-table-column v-slot="{ row }" label="默认图片" width="width">
            <img :src="row.skuDefaultImg" alt="" style="width: 100px; height: 100px" />
          </el-table-column>
        </el-table>
      </el-dialog>
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
      category1Id: '',
      category2Id: '',
      category3Id: '',
      pageNum: 0,
      pageSize: 3,
      total: 0,
      records: [],
      scene: 0,
      dialogTableVisible: false,
      spu: {},
      skuList: [],
      loading: true
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
      this.$refs.spu.addSpuData(this.category3Id)
    },
    // 修改spu按钮的回调
    updateSpu(row) {
      this.scene = 1
      this.$refs.spu.initSpuData(row)
    },
    // 修改scene的自定义事件
    changeScene({ scene, flag }) {
      this.scene = scene
      if (flag === '修改') {
        this.getSpuList(this.pageNum)
      } else if (flag === '添加') {
        this.getSpuList()
      }
    },
    // 删除spu
    async deleteSpu(row) {
      try {
        await this.$API.spu.reqDeleteSpu(row.id)
        this.getSpuList(this.records.length > 1 ? this.pageNum : this.pageNum - 1)
        this.$message.success('删除成功')
      } catch (err) {
        return
      }
    },
    // 添加sku
    addSku(row) {
      this.scene = 2
      this.$refs.sku.getData(this.category1Id, this.category2Id, row)
    },
    // 展示sku列表
    async showSkuList(spu) {
      this.spu = spu
      this.dialogTableVisible = true
      try {
        const res = await this.$API.spu.reqSkuList(spu.id)
        this.skuList = res.data
        this.loading = false
      } catch (err) {
        return
      }
    },
    // 关闭对话框前的回调
    closeDialog(done) {
      this.loading = true
      this.skuList = []
      done()
    }
  }
}
</script>

<style lang="less" scoped></style>
