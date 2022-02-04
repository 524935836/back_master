<template>
  <div>
    <!-- 卡片 -->
    <el-card class="box-card" style="margin: 10px 0px">
      <!-- 头部 -->
      <div slot="header" class="clearfix">
        <!-- v-model="activeName" @tab-click="handleClick" -->
        <!-- 标签页 -->
        <el-tabs v-model="activeName" class="tab" @tab-click="handleClick">
          <el-tab-pane label="销售额" name="sale"></el-tab-pane>
          <el-tab-pane label="访问量" name="visite"></el-tab-pane>
        </el-tabs>
        <div class="right">
          <span @click="setDay">今日</span>
          <span @click="setWeek">本周</span>
          <span @click="setMonth">本月</span>
          <span @click="setYear">本年</span>
          <!-- 日期选择器 -->
          <el-date-picker
            v-model="value1"
            style="width: 250px"
            type="daterange"
            range-separator="-"
            start-placeholder="开始日期"
            end-placeholder="结束日期"
            size="mini"
            value-format="yyyy-MM-dd"
          >
          </el-date-picker>
        </div>
      </div>
      <!-- 内容 -->
      <el-row :gutter="10">
        <el-col :span="18">
          <!-- 图标 -->
          <div ref="charts" class="charts"></div>
        </el-col>
        <el-col :span="6">
          <div class="title">门店{{ title }}额排行</div>
          <ul>
            <li>
              <span class="rindex">1</span>
              <span>肯德基</span>
              <span>123456</span>
            </li>
            <li>
              <span class="rindex">2</span>
              <span>肯德基</span>
              <span>123456</span>
            </li>
            <li>
              <span class="rindex">3</span>
              <span>肯德基</span>
              <span>123456</span>
            </li>
            <li>
              <span>4</span>
              <span>肯德基</span>
              <span>123456</span>
            </li>
            <li>
              <span>5</span>
              <span>肯德基</span>
              <span>123456</span>
            </li>
            <li>
              <span>6</span>
              <span>肯德基</span>
              <span>123456</span>
            </li>
            <li>
              <span>7</span>
              <span>肯德基</span>
              <span>123456</span>
            </li>
          </ul>
        </el-col>
      </el-row>
    </el-card>
  </div>
</template>

<script>
import * as echarts from 'echarts'
import dayjs from 'dayjs'
import { mapState } from 'vuex'

export default {
  name: 'Sale',
  data() {
    return {
      activeName: 'sale',
      value1: [],
      myChart: null
    }
  },
  computed: {
    ...mapState('home', ['list']),
    title() {
      return this.activeName === 'sale' ? '销售额' : '访问量'
    }
  },
  watch: {
    // 监听list
    list() {
      // 初始化数据
      this.myChart.setOption({
        xAxis: {
          data: this.list.userFullYearAxis
        },
        series: [
          {
            data: this.list.userFullYear
          }
        ]
      })
    }
  },
  mounted() {
    this.myChart = echarts.init(this.$refs.charts)
    this.myChart.setOption({
      title: {
        text: '销售额趋势'
      },
      tooltip: {
        trigger: 'axis',
        axisPointer: {
          type: 'shadow'
        }
      },
      grid: {
        left: '3%',
        right: '4%',
        bottom: '3%',
        containLabel: true
      },
      xAxis: [
        {
          type: 'category',
          axisTick: {
            alignWithLabel: true
          }
        }
      ],
      yAxis: [
        {
          type: 'value'
        }
      ],
      series: [
        {
          name: 'Direct',
          type: 'bar',
          barWidth: '60%'
        }
      ]
    })
  },
  methods: {
    // 点击标签页的回调
    handleClick() {
      this.myChart.setOption({
        title: {
          text: this.title + '趋势'
        },
        // 更新数据
        xAxis: {
          data:
            this.title === '销售额' ? this.list.userFullYearAxis : this.list.orderFullYearAxis
        },
        series: [
          {
            data: this.title === '销售额' ? this.list.userFullYear : this.list.orderFullYear
          }
        ]
      })
    },
    setDay() {
      const day = dayjs().format('YYYY-MM-DD')
      this.value1 = [day, day]
    },
    setWeek() {
      const start = dayjs().day(1).format('YYYY-MM-DD')
      const end = dayjs().day(7).format('YYYY-MM-DD')
      this.value1 = [start, end]
    },
    setMonth() {
      const start = dayjs().startOf('month').format('YYYY-MM-DD')
      const end = dayjs().endOf('month').format('YYYY-MM-DD')
      this.value1 = [start, end]
    },
    setYear() {
      const start = dayjs().startOf('year').format('YYYY-MM-DD')
      const end = dayjs().endOf('year').format('YYYY-MM-DD')
      this.value1 = [start, end]
    }
  }
}
</script>

<style lang="less" scoped>
.clearfix {
  position: relative;
  display: flex;
  justify-content: space-between;
}
// 头部
.tab {
  width: 100%;
}

.right {
  position: absolute;
  right: 0;

  span {
    margin-right: 20px;
    cursor: pointer;
  }
}
// 内容
.charts {
  width: 100%;
  height: 400px;
}

.title {
  font-size: 18px;
  font-weight: bold;
}

ul {
  list-style: none;
  width: 100%;
  padding: 0;

  li {
    display: flex;
    height: (400px / 7);
    line-height: (400px / 7);
    align-items: center;

    & span:nth-child(1) {
      width: 20px;
      height: 20px;
      text-align: center;
      line-height: 20px;
    }

    & span:nth-child(2) {
      margin-left: 50px;
      flex: 1;
    }

    .rindex {
      border-radius: 50%;
      background: black;
      color: #fff;
    }
  }
}
// 标签页字体大小
/deep/ .el-tabs__item {
  font-size: 18px;
  font-weight: bold;
}
// 清除默认下划线
/deep/ .el-card__header {
  border-bottom: none;
}
</style>
