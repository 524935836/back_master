<template>
  <div ref="charts" class="charts"></div>
</template>

<script>
import * as echarts from 'echarts'

export default {
  name: 'ProgressChart',
  data() {
    return {

    }
  },
  mounted() {
    const lineChart = echarts.init(this.$refs.charts)
    lineChart.setOption({
      xAxis: {
        show: false,
        min: 0,
        max: 100
      },
      yAxis: {
        type: 'category',
        show: false
      },
      grid: {
        left: 0,
        top: 0,
        right: 0,
        bottom: 0
      },
      series: [
        {
          type: 'bar',
          data: [70],
          barWidth: 10,
          itemStyle: {
            color: 'yellowgreen'
          },
          label: {
            show: true,
            formatter: '|',
            position: 'right',
            color: 'yellowgreen'
          },
          showBackground: true,
          backgroundStyle: {
            color: '#eee'
          }
        }
      ]
    })
  }
}
</script>

<style lang='less' scoped>
.charts {
  width: 100%;
  height: 100%;
}
</style>
