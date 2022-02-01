<template>
  <div>
    <!-- 表单 -->
    <el-form label-width="80px">
      <el-form-item label="SPU名称"> 海绵宝宝 </el-form-item>
      <el-form-item label="SKU名称">
        <el-input placeholder="SKU名称"></el-input>
      </el-form-item>
      <el-form-item label="价格(元)">
        <el-input placeholder="价格(元)"></el-input>
      </el-form-item>
      <el-form-item label="重量(千克)">
        <el-input placeholder="重量(千克)"></el-input>
      </el-form-item>
      <el-form-item label="规格描述">
        <el-input type="textarea" rows="4"></el-input>
      </el-form-item>
      <el-form-item label="平台属性">
        <!-- 行内表单 -->
        <el-form :inline="true" label-width="80px">
          <!-- 下拉框 -->
          <el-form-item label="屏幕尺寸">
            <el-select value="" placeholder="请选择">
              <el-option label="label" value="value"></el-option>
            </el-select>
          </el-form-item>
        </el-form>
      </el-form-item>
      <el-form-item label="销售属性">
        <!-- 行内表单 -->
        <el-form :inline="true" label-width="80px">
          <!-- 下拉框 -->
          <el-form-item label="屏幕尺寸">
            <el-select value="" placeholder="请选择">
              <el-option label="label" value="value"></el-option>
            </el-select>
          </el-form-item>
        </el-form>
      </el-form-item>
      <el-form-item label="图片列表">
        <!-- 表格 -->
        <el-table border style="width: 100%">
          <el-table-column type="selection" width="80"> </el-table-column>
          <el-table-column label="图片" width="width"> </el-table-column>
          <el-table-column label="名称" width="width"> </el-table-column>
          <el-table-column label="操作" width="width"> </el-table-column>
        </el-table>
      </el-form-item>
      <el-form-item>
        <el-button type="primary">保存</el-button>
        <el-button>取消</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
export default {
  name: 'SkuForm',
  data() {
    return {}
  }
}
</script>

<style lang="less" scoped></style>
