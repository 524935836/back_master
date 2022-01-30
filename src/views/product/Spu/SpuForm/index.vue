<template>
  <div>
    <!-- 表单 -->
    <el-form label-width="80px" :model="spuInfo">
      <el-form-item label="SPU名称">
        <el-input v-model="spuInfo.spuName" placeholder="SPU名称"></el-input>
      </el-form-item>
      <el-form-item label="品牌">
        <!-- 下拉框 -->
        <el-select v-model="spuInfo.tmId" value="" placeholder="请选择品牌">
          <el-option
            v-for="tradeMark in tradeMarkList"
            :key="tradeMark.id"
            :label="tradeMark.tmName"
            :value="tradeMark.id"
          ></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="SPU描述">
        <el-input
          v-model="spuInfo.description"
          type="textarea"
          rows="4"
          placeholder="SPU描述"
        ></el-input>
      </el-form-item>
      <el-form-item label="SPU图片">
        <!-- 上传 -->
        <el-upload
          action="/dev-api/admin/product/fileUpload"
          list-type="picture-card"
          :on-preview="handlePictureCardPreview"
          :on-remove="handleRemove"
          :file-list="spuImageList"
        >
          <i class="el-icon-plus"></i>
        </el-upload>
        <el-dialog :visible.sync="dialogVisible">
          <img width="100%" :src="dialogImageUrl" alt="" />
        </el-dialog>
      </el-form-item>
      <el-form-item label="销售属性">
        <!-- 下拉框 -->
        <el-select
          v-model="unSelectId"
          value=""
          :placeholder="`还有${unSelectSaleAttr.length}种属性未选择`"
        >
          <el-option
            v-for="unSelect in unSelectSaleAttr"
            :key="unSelect.id"
            :label="unSelect.name"
            :value="unSelect.id"
          ></el-option>
        </el-select>
        <el-button
          type="primary"
          icon="el-icon-plus"
          :disabled="!unSelectId"
        >添加销售属性</el-button>
        <!-- 表格 -->
        <el-table style="width: 100%" border :data="spuInfo.spuSaleAttrList">
          <el-table-column type="index" label="序号" width="80" align="center">
          </el-table-column>
          <el-table-column label="属性名" width="width" prop="saleAttrName"></el-table-column>
          <el-table-column v-slot="{ row }" label="属性值名称列表" width="width">
            <!-- @close="handleClose(tag)" -->
            <el-tag
              v-for="tag in row.spuSaleAttrValueList"
              :key="tag.id"
              closable
              :disable-transitions="false"
            >
              {{ tag.saleAttrValueName }}
            </el-tag>
            <!--  @keyup.enter.native="handleInputConfirm"
              @blur="handleInputConfirm" -->
            <el-input
              v-if="row.inputVisible"
              ref="saveTagInput"
              v-model="row.inputValue"
              class="input-new-tag"
              size="small"
            >
            </el-input>
            <!-- @click="showInput" -->
            <el-button v-else class="button-new-tag" size="small">添加</el-button>
          </el-table-column>
          <el-table-column label="操作" width="width">
            <el-button type="danger" icon="el-icon-delete" size="mini"></el-button>
          </el-table-column>
        </el-table>
      </el-form-item>
      <el-form-item>
        <el-button type="primary">保存</el-button>
        <el-button @click="$emit('changeScene', 0)">取消</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
export default {
  name: 'SpuForm',
  data() {
    return {
      dialogImageUrl: '',
      dialogVisible: false,
      spuInfo: {
        category3Id: 0,
        description: '',
        tmId: 0,
        spuName: '',
        spuImageList: [
          // {
          //   id: 0,
          //   imgName: 'string',
          //   imgUrl: 'string',
          //   spuId: 0
          // }
        ],

        spuSaleAttrList: [
          // {
          //   baseSaleAttrId: 0,
          //   id: 0,
          //   saleAttrName: 'string',
          //   spuId: 0,
          //   spuSaleAttrValueList: [
          //     {
          //       baseSaleAttrId: 0,
          //       id: 0,
          //       isChecked: 'string',
          //       saleAttrName: 'string',
          //       saleAttrValueName: 'string',
          //       spuId: 0
          //     }
          //   ]
          // }
        ]
      },
      tradeMarkList: [],
      spuImageList: [],
      saleAttrList: [],
      // 销售属性的id
      unSelectId: ''
    }
  },
  computed: {
    // 未选择的属性
    unSelectSaleAttr() {
      // 过滤
      return this.saleAttrList.filter((item) => {
        return this.spuInfo.spuSaleAttrList.every((item1) => {
          return item.name !== item1.saleAttrName
        })
      })
    }
  },
  methods: {
    handleRemove(file, fileList) {
      console.log(file, fileList)
    },
    handlePictureCardPreview(file) {
      this.dialogImageUrl = file.url
      this.dialogVisible = true
    },
    // 初始化数据
    async initSpuData(row) {
      try {
        // 获取spu信息
        const spuRes = await this.$API.spu.reqSpuInfo(row.id)
        this.spuInfo = spuRes.data
        // 获取品牌列表
        const tradeMarkRes = await this.$API.spu.reqTradeMarkList()
        this.tradeMarkList = tradeMarkRes.data
        // 获取spu图片
        const spuImageRes = await this.$API.spu.reqSpuImageList(row.id)
        const res = spuImageRes.data
        res.forEach((item) => {
          item.name = item.imgName
          item.url = item.imgUrl
        })
        this.spuImageList = res
        // 获取销售属性
        const saleAttrRes = await this.$API.spu.reqBaseSaleAttrList()
        this.saleAttrList = saleAttrRes.data
      } catch (err) {
        return
      }
    }
  }
}
</script>

<style>
.el-tag + .el-tag {
  margin-left: 10px;
}
.button-new-tag {
  margin-left: 10px;
  height: 32px;
  line-height: 30px;
  padding-top: 0;
  padding-bottom: 0;
}
.input-new-tag {
  width: 90px;
  margin-left: 10px;
  vertical-align: bottom;
}
</style>
