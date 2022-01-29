<template>
  <div>
    <el-card style="margin: 20px 0">
      <CategorySelect :show="!isShowTable" @getCategoryId="getCategoryId"></CategorySelect>
    </el-card>
    <el-card>
      <!-- 展示属性 -->
      <div v-show="isShowTable">
        <el-button
          type="primary"
          icon="el-icon-plus"
          :disabled="!category3Id"
          @click="addAttr"
        >添加属性</el-button>
        <!-- 表格 -->
        <el-table style="width: 100%" :data="attrList" border>
          <el-table-column label="序号" width="80px" type="index" align="center">
          </el-table-column>
          <el-table-column label="属性名称" width="150px" prop="attrName"> </el-table-column>
          <el-table-column v-slot="{ row }" label="属性值列表" width="width">
            <el-tag
              v-for="attrValue in row.attrValueList"
              :key="attrValue.id"
              style="margin: 0 20px"
            >{{ attrValue.valueName }}</el-tag>
          </el-table-column>
          <el-table-column v-slot="{ row }" label="操作" width="150px">
            <el-button
              type="warning"
              icon="el-icon-edit"
              size="mini"
              @click="updateAttr(row)"
            ></el-button>
            <el-button type="danger" icon="el-icon-delete" size="mini" @click="deleteAttr(row.id)"></el-button>
          </el-table-column>
        </el-table>
      </div>
      <!-- 添加或修改属性 -->
      <div v-show="!isShowTable">
        <!-- 表单 -->
        <el-form :inline="true" class="demo-form-inline" :model="attrInfo">
          <el-form-item label="属性名">
            <el-input v-model="attrInfo.attrName" placeholder="请输入属性名"></el-input>
          </el-form-item>
        </el-form>
        <el-button
          type="primary"
          icon="el-icon-plus"
          :disabled="!attrInfo.attrName"
          @click="addAttrValue"
        >添加属性值</el-button>
        <el-button @click="isShowTable = true">取消</el-button>
        <!-- 表格 -->
        <el-table border style="width: 100%; margin: 20px 0" :data="attrInfo.attrValueList">
          <el-table-column type="index" align="center" label="序号" width="80px">
          </el-table-column>
          <el-table-column v-slot="{ row, $index }" label="属性值名称" width="width">
            <el-input
              v-if="row.flag"
              :ref="$index"
              v-model.trim="row.valueName"
              size="mini"
              @blur="toLook(row, $index)"
              @keyup.native.enter="toLook(row, $index)"
            ></el-input>
            <span v-else style="display: block" @click="toEdit(row, $index)">{{
              row.valueName
            }}</span>
          </el-table-column>
          <el-table-column v-slot="{ row, $index }" label="操作" width="width">
            <el-popconfirm
              :title="`确定删除${row.valueName}？`"
              @onConfirm="deleteAttrValue($index)"
            >
              <el-button
                slot="reference"
                type="danger"
                icon="el-icon-delete"
                size="mini"
              >删除</el-button>
            </el-popconfirm>
          </el-table-column>
        </el-table>
        <el-button
          type="primary"
          :disabled="!attrInfo.attrValueList.length"
          @click="addOrUpdateAttr"
        >保存</el-button>
        <el-button @click="isShowTable = true">取消</el-button>
      </div>
    </el-card>
  </div>
</template>

<script>
import cloneDeep from 'lodash/cloneDeep'

export default {
  name: 'Attr',
  data() {
    return {
      category1Id: '',
      category2Id: '',
      category3Id: '',
      attrList: [],
      isShowTable: true,
      attrInfo: {
        attrName: '',
        attrValueList: [
          // {
          //   attrId: 0,
          //   valueName: ''
          // }
        ],
        categoryId: 0,
        categoryLevel: 3
      }
    }
  },
  methods: {
    // 获取子组件的id
    getCategoryId({ categoryId, level }) {
      if (level === 1) {
        this.category1Id = categoryId
        this.category2Id = ''
        this.category3Id = ''
        this.attrList = []
      } else if (level === 2) {
        this.category2Id = categoryId
        this.category3Id = ''
        this.attrList = []
      } else {
        this.category3Id = categoryId
        this.attrList = []
        // 获取属性列表
        this.getAttrList()
      }
    },
    // 获取属性
    async getAttrList() {
      try {
        const res = await this.$API.attr.reqAttrList(
          this.category1Id,
          this.category2Id,
          this.category3Id
        )
        this.attrList = res.data
      } catch (err) {
        return
      }
    },
    // 添加属性值按钮的回调
    addAttrValue() {
      this.attrInfo.attrValueList.push({
        attrId: this.attrInfo.id,
        valueName: '',
        flag: true
      })
      this.$nextTick(() => {
        this.$refs[this.attrInfo.attrValueList.length - 1].focus()
      })
    },
    // 添加属性按钮的回调
    addAttr() {
      this.isShowTable = false
      // 清空
      this.attrInfo = {
        attrName: '',
        attrValueList: [],
        categoryId: this.category3Id,
        categoryLevel: 3
      }
    },
    // 修改属性按钮的回调
    updateAttr(row) {
      this.isShowTable = false
      this.attrInfo = cloneDeep(row)
      this.attrInfo.attrValueList.forEach((item) => {
        // 响应式
        this.$set(item, 'flag', false)
      })
    },
    // 切换查看模式(失焦，按回车)
    toLook(row, index) {
      if (!row.valueName) {
        this.$message('请输入属性值')
        // this.$nextTick(() => {
        //   this.$refs[index].focus()
        // })
        return
      }
      const isRepeat = this.attrInfo.attrValueList.some((item) => {
        if (row !== item) {
          return row.valueName === item.valueName
        }
      })
      if (isRepeat) {
        this.$message('重复输入')
        this.$nextTick(() => {
          this.$refs[index].focus()
        })
        return
      }
      row.flag = false
    },
    // 点击span聚焦
    toEdit(row, index) {
      row.flag = true
      this.$nextTick(() => {
        this.$refs[index].focus()
      })
    },
    // 确定删除属性值
    deleteAttrValue(index) {
      this.attrInfo.attrValueList.splice(index, 1)
    },
    // 保存
    async addOrUpdateAttr() {
      this.attrInfo.attrValueList = this.attrInfo.attrValueList.filter((item) => {
        if (item.valueName) {
          delete item.flag
          return true
        }
      })
      try {
        await this.$API.attr.reqAddOrUpdateAttr(this.attrInfo)
        this.getAttrList()
        this.isShowTable = true
        this.$message.success('保存成功')
      } catch (err) {
        return
      }
    },
    // 删除属性
    async deleteAttr(id) {
      try {
        await this.$API.attr.reqDeleteAttr(id)
        this.getAttrList()
        this.$message.success('删除属性成功')
      } catch (err) {
        return
      }
    }
  }
}
</script>

<style lang="less" scoped></style>
