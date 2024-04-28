<template>
  <div class="media-prod-spread-trend spread-shadow mt-20">
    <spread-title-vue title="媒体产品传播趋势"></spread-title-vue>
    <div class="chart-box">
      <custom-chart-vue
        ref="customChart"
        :is-show="show.trend"
      ></custom-chart-vue>
    </div>
  </div>
</template>

<script>
// // 工具函数
import { timeFormat } from '@/utils/timeFormat'
import { spreadTrendAnalyzeOptions } from '@/assets/js/echartsOptions'

export default {
  name: 'MediaProdSpreadTrend',
  props: {
    trendData: {
      type: Array,
      default: () => [],
    },
  },
  data() {
    return {
      chart_trendData: {},
      mockChartTrendData: {
        xAxisData: [
          '2013-10-03',
          '2013-10-04',
          '2013-10-05',
          '2013-10-06',
          '2013-10-07',
          '2013-10-08',
          '2013-10-09',
        ],
        seriesData: [
          {
            name: '传播趋势分析',
            data: [20, 25, 30, 20, 25, 10, 26, 35, 12, 25],
          },
        ],
      },
      show: {
        trend: true,
      },
    }
  },
  watch: {
    trendData(v) {
      if (!Array.isArray(v) || !v.length) {
        this.show.trend = false
        this.chart_trendData = {}
        /* 暂无数据后再次渲染的话需要重新赋值,不然数据会叠加 */
        this.resetData()
        return
      }
      this.show.trend = true
      this.resetData()
      this.formatTrendData(v)
      this.$nextTick(() => this.renderTrendChart(this.chart_trendData))
    },
  },
  methods: {
    resetData(data = 'chart_trendData', name = '传播趋势分析') {
      this[data] = {
        xAxisData: [],
        seriesData: [{ name, data: [] }],
      }
    },
    formatTrendData(list, data = 'chart_trendData') {
      for (let i = 0, len = list.length; i < len; i++) {
        if (data === 'chart_mediaRankData') {
          this[data].xAxisData.push(list[i].mediaName)
        } else {
          this[data].xAxisData.push(list[i].day)
        }
        this[data].seriesData[0].data.push(list[i].count)
      }
    },
    renderTrendChart(chartData) {
      // console.log('chartData', chartData)
      const yesterday = timeFormat(
        new Date().getTime() - 1 * 24 * 60 * 60 * 1000,
      )
      // 如果值有为昨天，进行高亮
      const isHightLight = chartData.xAxisData.some(x => x === yesterday)
      // console.log('yesterday', yesterday)
      const option = spreadTrendAnalyzeOptions()
      option.xAxis[0].data = chartData.xAxisData
      option.series.some(s => {
        const findVal = chartData.seriesData.find(it => it.name === s.name)
        if (findVal) {
          s.data = findVal.data
          if (isHightLight) {
            const lastVal = s.data.at(-1)
            s.data[s.data.length - 1] = {
              value: lastVal,
              itemStyle: { color: 'orange' },
            }
          }
          return
        }
      })

      // console.log('option', option)
      this.$refs['customChart'].renderChart(option)
    },
  },
  mounted() {
    this.resetData()
    // this.$nextTick(() => {
    //   this.renderTrendChart(this.mockChartTrendData)
    // })
  },
}
</script>

<style lang="scss" scoped>
.media-prod-spread-trend {
  .chart-box {
    height: 400px;
  }
}
</style>
