<template>
  <div class="os-area-and-channel mt-20">
    <div class="spread-shadow">
      <spread-title-vue title="转载趋势分析"></spread-title-vue>
      <div class="chart-box">
        <div v-if="show.trend" ref="trendChart" style="height: 100%"></div>
        <custom-no-data-vue v-else></custom-no-data-vue>
      </div>
    </div>
    <div class="spread-shadow">
      <spread-title-vue title="转载媒体排行"></spread-title-vue>
      <div class="chart-box">
        <!-- <div v-if="show.media" ref="mediaRankChart" style="height: 100%"></div>
        <custom-no-data-vue v-else></custom-no-data-vue> -->
        <bar-of-vertical-auto-scroll
          :isShow="show.media"
          :list="mediaRankData"
          :fields="{ label: 'mediaName', value: 'count' }"
        ></bar-of-vertical-auto-scroll>
      </div>
    </div>
  </div>
</template>
<script>
import BarOfVerticalAutoScroll from '@/components/public/BarOfVerticalAutoScroll/BarOfVerticalAutoScroll.js'
// util
import { getEchartsInstance } from '@/utils/index'
import { cloneDeep } from '@/plugins/utils'

import { spreadTrendAnalyzeOptions } from '@/assets/js/echartsOptions'
let echartsInstanceTrend = null
let echartsInstanceMediaRank = null
const option = spreadTrendAnalyzeOptions(0)

const option2 = {
  tooltip: {
    trigger: 'axis',
    axisPointer: {
      lineStyle: {
        color: '#57617B',
      },
    },
    formatter(p) {
      const p0 = p[0]
      return `${p0.name}
              <br />
              ${p0.marker} 转载量: ${p0.value}
            `
    },
  },
  grid: {
    left: '4%',
    right: '6%',
    bottom: '8%',
    // top: ''
    containLabel: true,
  },
  legend: {
    show: false,
  },
  xAxis: [
    {
      type: 'category',
      //   boundaryGap: false,
      axisLine: {
        lineStyle: {
          color: '#57617B', // X 轴坐标颜色
        },
      },
      axisLabel: {
        interval: 0,
        margin: 10,
        formatter(text) {
          // console.log(text)
          if (text.length > 4) {
            return `${text.slice(0, 4)}\n${text.slice(4)}`
          }
          return text
        },
        textStyle: {
          fontSize: 14,
          color: '#707070',
        },
      },
      data: [],
    },
  ],
  yAxis: [
    {
      type: 'value',
      // name: '单位（辆）',
      axisTick: {
        show: false,
      },
      axisLine: {
        show: false,
        lineStyle: {
          color: '#57617B', // Y轴坐标颜色
        },
      },
      axisLabel: {
        margin: 10,
        textStyle: {
          fontSize: 14,
          color: '#707070',
        },
      },
      splitLine: {
        lineStyle: {
          type: 'dashed',
          color: 'rgba(200,200,200,1)', //里面横着的虚线
        },
      },
    },
  ],
  series: [
    {
      name: '转载媒体排行',
      type: 'bar',
      barWidth: 20,
      itemStyle: {
        color: 'rgba(200,66,57,1)',
        barBorderRadius: [3, 3, 0, 0], //（顺时针左上，右上，右下，左下）
      },
      data: [],
    },
  ],
}

export default {
  name: 'OsTrendAndMediaRank',
  components: { BarOfVerticalAutoScroll },
  props: {
    trendData: {
      type: Array,
      default: () => [],
    },
    mediaRankData: {
      type: Array,
      default: () => [],
    },
    timeList: {
      type: Array,
      default: () => [],
    },
  },
  data() {
    return {
      chart_trendData: {},
      // MOckChartTrendData: {
      //   xAxisData: [
      //     '2013-10-03',
      //     '2013-10-04',
      //     '2013-10-05',
      //     '2013-10-06',
      //     '2013-10-07',
      //     '2013-10-08',
      //     '2013-10-09',
      //   ],
      //   seriesData: [
      //     {
      //       name: '传播趋势分析',
      //       data: [20, 25, 30, 20, 25, 10, 26, 35, 12, 25],
      //     },
      //   ],
      // },
      chart_mediaRankData: {},
      // MOckChartMediaRankData: {
      //   xAxisData: [
      //     '2013-10-03',
      //     '2013-10-04',
      //     '2013-10-05',
      //     '2013-10-06',
      //     '2013-10-07',
      //     '2013-10-08',
      //     '2013-10-09',
      //   ],
      //   seriesData: [
      //     {
      //       name: '转载媒体排行',
      //       data: [20, 25, 30, 20, 25, 10, 26, 35, 12, 25],
      //     },
      //   ],
      // },
      show: {
        trend: true,
        media: true,
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
      this.formatTrendData(v)
      this.$nextTick(() => this.renderTrendChart(this.chart_trendData))
    },
    mediaRankData(v) {
      if (!Array.isArray(v) || !v.length) {
        this.show.media = false
        /* 之前柱形图的逻辑 */
        // this.chart_mediaRankData = {}
        // this.resetData('chart_mediaRankData', '转载媒体排行')
        return
      }
      this.show.media = true
      /* 之前柱形图的逻辑 */
      // this.formatTrendData(v, 'chart_mediaRankData')
      // this.$nextTick(() => this.renderMediaRankChart(this.chart_mediaRankData))
    },
  },
  methods: {
    resetData(data = 'chart_trendData', name = '传播趋势分析') {
      this[data] = {
        xAxisData: [],
        seriesData: [{ name, data: [] }],
      }
    },
    /* 数据添加缺少的时间，使时间参数连续 */
    addDefaultItem(records) {
      for (let i = 0; i < this.timeList.length; i++) {
        const c = this.timeList[i]
        if (!records[i] || c !== records[i].day) {
          records.splice(i, 0, { day: c, count: 0 })
        }
        records[i].day = this.$moment(records[i].day).format('YYYY-MM-DD')
      }
      return records
    },
    formatTrendData(list, data = 'chart_trendData') {
      list = this.addDefaultItem(cloneDeep(list))
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
      // if (!Array.isArray(chartData.xAxisData) || !chartData.xAxisData.length) {
      //   this.hasData = false
      //   return
      // }
      // this.hasData = true
      option.xAxis[0].data = chartData.xAxisData
      const series = option.series
      series.some(s => {
        const findVal = chartData.seriesData.find(it => it.name === s.name)
        if (findVal) {
          s.data = findVal.data
          return
        }
      })

      echartsInstanceTrend = getEchartsInstance(this.$refs['trendChart'])
      echartsInstanceTrend.setOption(option)
    },
    renderMediaRankChart(chartData) {
      option2.xAxis[0].data = chartData.xAxisData
      const series = option2.series
      series.some(s => {
        const findVal = chartData.seriesData.find(it => it.name === s.name)
        if (findVal) {
          s.data = findVal.data
          return
        }
      })

      echartsInstanceMediaRank = getEchartsInstance(
        this.$refs['mediaRankChart'],
      )
      echartsInstanceMediaRank.setOption(option2)
    },
    handleResize() {
      echartsInstanceTrend && echartsInstanceTrend.resize()
      echartsInstanceMediaRank && echartsInstanceMediaRank.resize()
    },
  },
  mounted() {
    this.resetData()
    this.resetData('chart_mediaRankData', '转载媒体排行')
    window.addEventListener('resize', this.handleResize)
  },
  beforeDestroy() {
    echartsInstanceTrend && echartsInstanceTrend.dispose()
    echartsInstanceMediaRank && echartsInstanceMediaRank.dispose()
    window.removeEventListener('resize', this.handleResize)
  },
}
</script>

<style lang="scss" scoped>
.os-area-and-channel {
  display: flex;
  justify-content: space-between;
  & > div {
    width: 49%;
    .chart-box {
      height: 400px;
      overflow: hidden;
      //   background-color: #bfa;
    }
  }

  .seamless-warp {
    padding: 0 0.25rem;
  }
}
</style>
