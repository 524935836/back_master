<template>
  <div>
    <!-- 表单 -->
    <el-form label-width="80px">
      <el-form-item label="SPU名称">{{ spuInfo.spuName }}</el-form-item>
      <el-form-item label="SKU名称">
        <el-input v-model="spuInfo.skuName" placeholder="SKU名称"></el-input>
      </el-form-item>
      <el-form-item label="价格(元)">
        <el-input v-model="spuInfo.price" placeholder="价格(元)"></el-input>
      </el-form-item>
      <el-form-item label="重量(千克)">
        <el-input v-model="spuInfo.weight" placeholder="重量(千克)"></el-input>
      </el-form-item>
      <el-form-item label="规格描述">
        <el-input v-model="spuInfo.skuDesc" type="textarea" rows="4"></el-input>
      </el-form-item>
      <el-form-item label="平台属性">
        <!-- 行内表单 -->
        <el-form :inline="true" label-width="80px">
          <!-- 下拉框 -->
          <el-form-item v-for="attr in attrInfoList" :key="attr.id" :label="attr.attrName">
            <el-select v-model="attr.attrIdAndAttrValueId" placeholder="请选择">
              <el-option
                v-for="attrValue in attr.attrValueList"
                :key="attrValue.id"
                :label="attrValue.valueName"
                :value="`${attr.id}:${attrValue.id}`"
              ></el-option>
            </el-select>
          </el-form-item>
        </el-form>
      </el-form-item>
      <el-form-item label="销售属性">
        <!-- 行内表单 -->
        <el-form :inline="true" label-width="80px">
          <!-- 下拉框 -->
          <el-form-item
            v-for="saleAttr in spuSaleAttrList"
            :key="saleAttr.id"
            :label="saleAttr.saleAttrName"
          >
            <el-select
              v-model="saleAttr.saleAttrIdAndSaleAttrValueId"
              value=""
              placeholder="请选择"
            >
              <el-option
                v-for="saleAttrValue in saleAttr.spuSaleAttrValueList"
                :key="saleAttrValue.id"
                :label="saleAttrValue.saleAttrValueName"
                :value="`${saleAttr.id}:${saleAttrValue.id}`"
              ></el-option>
            </el-select>
          </el-form-item>
        </el-form>
      </el-form-item>
      <el-form-item label="图片列表">
        <!-- 表格 -->
        <el-table
          border
          style="width: 100%"
          :data="spuImageList"
          @selection-change="handleSelect"
        >
          <el-table-column type="selection" width="80"> </el-table-column>
          <el-table-column v-slot="{ row }" label="图片" width="width">
            <img :src="row.imgUrl" alt="" style="width: 100px; height: 100px" />
          </el-table-column>
          <el-table-column label="名称" width="width" prop="imgName"> </el-table-column>
          <el-table-column v-slot="{ row }" label="操作" width="width" align="center">
            <el-tag v-if="row.isDefault" type="success" disable-transitions>默认</el-tag>
            <el-button
              v-else
              type="primary"
              round
              @click="handleDefaultImage(row)"
            >设为默认</el-button>
          </el-table-column>
        </el-table>
      </el-form-item>
      <el-form-item>
        <el-button type="primary">保存</el-button>
        <el-button @click="cancel">取消</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
export default {
  name: 'SkuForm',
  data() {
    return {
      spuImageList: [],
      attrInfoList: [],
      spuSaleAttrList: [],
      skuInfo: {
        category3Id: 0,
        spuId: 0,
        tmId: 0,
        skuName: '',
        price: 0,
        weight: '',
        skuDesc: '',
        skuDefaultImg: '',
        skuAttrValueList: [
          // {
          //   attrId: 0,
          //   attrName: 'string',
          //   id: 0,
          //   skuId: 0,
          //   valueId: 0,
          //   valueName: 'string'
          // }
        ],
        skuImageList: [
          // {
          //   id: 0,
          //   imgName: 'string',
          //   imgUrl: 'string',
          //   isDefault: 'string',
          //   skuId: 0,
          //   spuImgId: 0
          // }
        ],
        skuSaleAttrValueList: [
          // {
          //   id: 0,
          //   saleAttrId: 0,
          //   saleAttrName: 'string',
          //   saleAttrValueId: 0,
          //   saleAttrValueName: 'string',
          //   skuId: 0,
          //   spuId: 0
          // }
        ]
      },
      spuInfo: {},
      imageList: []
    }
  },
  methods: {
    // 获取数据
    async getData(category1Id, category2Id, spu) {
      this.skuInfo.category3Id = spu.category3Id
      this.skuInfo.spuId = spu.id
      this.skuInfo.tmId = spu.tmId
      this.spuInfo = spu

      try {
        // 获取图片列表
        const spuImageRes = await this.$API.spu.reqSpuImageList(spu.id)
        // 添加默认图片属性
        spuImageRes.data.forEach((item) => {
          item.isDefault = 0
        })
        this.spuImageList = spuImageRes.data
        // 获取销售属性列表
        const spuSaleAttrRes = await this.$API.spu.reqSpuSaleAttrList(spu.id)
        this.spuSaleAttrList = spuSaleAttrRes.data
        // 获取平台属性
        const attrInfoRes = await this.$API.spu.reqAttrInfoList(
          category1Id,
          category2Id,
          spu.category3Id
        )
        this.attrInfoList = attrInfoRes.data
      } catch (err) {
        return
      }
    },
    // 取消
    cancel() {
      this.$emit('changeScene', { scene: 0, flag: '' })
    },
    // 选项发生变化的回调
    handleSelect(imageList) {
      this.imageList = imageList
    },
    // 点击设为默认图片回调
    handleDefaultImage(row) {
      this.spuImageList.forEach((item) => {
        item.isDefault = 0
      })
      row.isDefault = 1
      this.skuInfo.skuDefaultImg = row.imgUrl
    }
  }
}
</script>

<style lang="less" scoped></style>
