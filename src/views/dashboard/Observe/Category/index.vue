<template>
  <div>
    <el-card>
      <!-- 头部 -->
      <div slot="header" class="header">
        <span>销售额类别对比</span>
        <!-- 单选框 -->
        <el-radio-group v-model="radio1" size="small">
          <el-radio-button label="全部渠道"></el-radio-button>
          <el-radio-button label="线上"></el-radio-button>
          <el-radio-button label="门店"></el-radio-button>
        </el-radio-group>
      </div>
      <!-- 内容 -->
      <div class="main">
        <div ref="charts" class="charts"></div>
      </div>
    </el-card>
  </div>
</template>

<script>
import * as echarts from 'echarts'

export default {
  name: 'Category',
  data() {
    return {
      radio1: '全部渠道'
    }
  },
  mounted() {
    const myChart = echarts.init(this.$refs.charts)
    myChart.setOption({
      title: {
        left: 'center',
        top: 'center'
      },
      tooltip: {
        trigger: 'item'
      },
      series: [
        {
          name: 'Access From',
          type: 'pie',
          radius: ['40%', '70%'],
          avoidLabelOverlap: false,
          itemStyle: {
            borderRadius: 10,
            borderColor: '#fff',
            borderWidth: 2
          },
          label: {
            show: true
          },
          labelLine: {
            show: true
          },
          data: [
            { value: 1048, name: 'Search Engine' },
            { value: 735, name: 'Direct' },
            { value: 580, name: 'Email' },
            { value: 484, name: 'Union Ads' },
            { value: 300, name: 'Video Ads' }
          ]
        }
      ]
    })
    // 绑定事件
    myChart.on('mouseover', (params) => {
      const { name, value } = params.data
      myChart.setOption({
        title: {
          text: name,
          subtext: value
        }
      })
    })
  }
}
</script>

<style lang="less" scoped>
.header {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.charts {
  width: 100%;
  height: 300px;
}
</style>
