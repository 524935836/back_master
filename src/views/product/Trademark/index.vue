<template>
  <div>
    <el-button
      type="primary"
      icon="el-icon-plus"
      style="margin: 10px 0px"
      @click="showAddTradeMark"
    >添加</el-button>
    <!-- table表格 -->
    <el-table style="width: 100%" border :data="list">
      <el-table-column
        type="index"
        :index="indexMethod"
        label="序号"
        width="80px"
        align="center"
      ></el-table-column>
      <el-table-column label="品牌名称" width="width" prop="tmName"> </el-table-column>
      <el-table-column v-slot="{ row }" label="品牌LOGO" width="width">
        <img :src="row.logoUrl" alt="" style="width: 100px; height: 100px" />
      </el-table-column>
      <el-table-column label="操作" width="width">
        <el-button
          type="warning"
          icon="el-icon-edit"
          size="mini"
          @click="showUpdateTradeMark"
        >修改</el-button>
        <el-button type="danger" icon="el-icon-delete" size="mini">删除</el-button>
      </el-table-column>
    </el-table>
    <!-- 分页器 -->
    <el-pagination
      style="margin-top: 20px; text-align: center"
      :current-page="pageNum"
      :page-sizes="[3, 5, 7]"
      :page-size="pageSize"
      :total="totalCount"
      layout="prev, pager, next, jumper,->,sizes,total"
      @current-change="getTradeMarkList"
      @size-change="handleSizeChange"
    >
    </el-pagination>
    <!-- 对话框 -->
    <el-dialog title="添加品牌" :visible.sync="dialogFormVisible">
      <el-form style="width:80%">
        <el-form-item label="品牌名称" label-width="100px">
          <el-input v-model="tmForm.tmName" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="品牌LOGO" label-width="100px">
          <!-- Upload 上传 -->
          <el-upload
            class="avatar-uploader"
            action="/dev-api/admin/product/fileUpload"
            :show-file-list="false"
            :on-success="handleAvatarSuccess"
            :before-upload="beforeAvatarUpload"
          >
            <img v-if="tmForm.logoUrl" :src="tmForm.logoUrl" class="avatar" />
            <i v-else class="el-icon-plus avatar-uploader-icon"></i>
            <div slot="tip" class="el-upload__tip">只能上传jpg/png文件，且不超过500kb</div>
          </el-upload>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="addOrUpdateTradeMark">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
export default {
  name: 'Trademark',
  data() {
    return {
      pageNum: 1,
      pageSize: 3,
      totalCount: 0,
      list: [],
      dialogFormVisible: false,
      tmForm: {
        tmName: '',
        logoUrl: ''
      }
    }
  },
  mounted() {
    this.getTradeMarkList()
  },
  methods: {
    // 获取品牌管理的分页列表
    async getTradeMarkList(page = 1) {
      this.pageNum = page
      const { pageNum, pageSize } = this
      const res = await this.$API.tradeMark.reqTradeMarkList(pageNum, pageSize)
      if (res.code === 200) {
        this.totalCount = res.data.total
        this.list = res.data.records
      }
    },
    // 每页数量变化的回调
    handleSizeChange(pageSize) {
      this.pageSize = pageSize
      this.getTradeMarkList()
    },
    // 自定义索引
    indexMethod(index) {
      return (this.pageNum - 1) * this.pageSize + 1 + index
    },
    // 添加品牌回调
    showAddTradeMark() {
      this.dialogFormVisible = true
      this.tmForm = { tmName: '', logoUrl: '' }
    },
    // 修改品牌
    showUpdateTradeMark() {
      this.dialogFormVisible = true
    },
    // 上传图片成功之后的回调
    handleAvatarSuccess(res, file) {
      this.tmForm.logoUrl = res.data
    },
    // 上传之前的1回调
    beforeAvatarUpload(file) {
      const isJPG = file.type === 'image/jpeg'
      const isLt2M = file.size / 1024 / 1024 < 2

      if (!isJPG) {
        this.$message.error('上传头像图片只能是 JPG 格式!')
      }
      if (!isLt2M) {
        this.$message.error('上传头像图片大小不能超过 2MB!')
      }
      return isJPG && isLt2M
    },
    // 添加或更新品牌
    async addOrUpdateTradeMark() {
      this.dialogFormVisible = false
      const res = await this.$API.tradeMark.reqAddOrUpdateTradeMark(this.tmForm)
      if (res.code === 200) {
        this.$message.success(this.tmForm.id ? '修改品牌成功' : '添加商品成功')
        this.getTradeMarkList()
      }
    }
  }
}
</script>

<style lang="less">
.avatar-uploader .el-upload {
    border: 1px dashed #d9d9d9;
    border-radius: 6px;
    cursor: pointer;
    position: relative;
    overflow: hidden;
  }
  .avatar-uploader .el-upload:hover {
    border-color: #409EFF;
  }
  .avatar-uploader-icon {
    font-size: 28px;
    color: #8c939d;
    width: 178px;
    height: 178px;
    line-height: 178px;
    text-align: center;
  }
  .avatar {
    width: 178px;
    height: 178px;
    display: block;
  }
</style>
