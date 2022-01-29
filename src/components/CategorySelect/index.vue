<template>
  <div>
    <!-- 行内表单 -->
    <el-form :inline="true" class="demo-form-inline" :model="cForm">
      <el-form-item label="一级分类">
        <el-select v-model="cForm.category1Id" placeholder="请选择" @change="handle1">
          <el-option v-for="c1 in list1" :key="c1.id" :label="c1.name" :value="c1.id"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="二级分类">
        <el-select v-model="cForm.category2Id" placeholder="请选择" @change="handle2">
          <el-option v-for="c2 in list2" :key="c2.id" :label="c2.name" :value="c2.id"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="三级分类">
        <el-select v-model="cForm.category3Id" placeholder="请选择" @change="handle3">
          <el-option v-for="c3 in list3" :key="c3.id" :label="c3.name" :value="c3.id"></el-option>
        </el-select>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
export default {
  name: 'CategorySelect',
  data() {
    return {
      list1: [],
      list2: [],
      list3: [],
      cForm: {
        category1Id: '',
        category2Id: '',
        category3Id: ''
      }
    }
  },
  mounted() {
    this.getCategory1List()
  },
  methods: {
    // 获取一级分类
    async getCategory1List() {
      try {
        const res = await this.$API.attr.reqCategory1List()
        this.list1 = res.data
      } catch (err) {
        return
      }
    },
    // 点击一级分类获取二级分类
    async handle1() {
      this.cForm.category2Id = ''
      this.cForm.category3Id = ''
      this.list2 = []
      this.list3 = []
      this.$emit('getCategoryId', { categoryId: this.cForm.category1Id, level: 1 })
      try {
        const res = await this.$API.attr.reqCategory2List(this.cForm.category1Id)
        this.list2 = res.data
      } catch (err) {
        return
      }
    },
    // 点击二级分类获取三级分类
    async handle2() {
      this.cForm.category3Id = ''
      this.list3 = []
      this.$emit('getCategoryId', { categoryId: this.cForm.category2Id, level: 2 })
      try {
        const res = await this.$API.attr.reqCategory3List(this.cForm.category2Id)
        this.list3 = res.data
      } catch (err) {
        return
      }
    },
    // 点击三级分类回调
    handle3() {
      this.$emit('getCategoryId', { categoryId: this.cForm.category3Id, level: 3 })
    }
  }
}
</script>

<style lang='less' scoped>

</style>
