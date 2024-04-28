<template>
  <div class="os-area-and-channel mt-20">
    <div class="spread-shadow">
      <spread-title-vue title="转载媒体等级分布"></spread-title-vue>
      <div class="chart-box">
        <custom-chart-vue
          ref="customChart"
          :is-show="show.pie"
        ></custom-chart-vue>
      </div>
    </div>
    <div class="spread-shadow">
      <spread-title-vue title="转载渠道分布"></spread-title-vue>
      <div class="chart-box">
        <custom-chart-vue
          ref="customChart2"
          :is-show="show.channel"
        ></custom-chart-vue>
      </div>
    </div>
  </div>
</template>

<script>
// import { reshipMediaLevelData } from './mockData'
import { spreadChannelOptions } from '@/assets/js/echartsOptions'
import { importMediaReshipRankOptions } from '@/assets/js/echartsOptions'
const option = importMediaReshipRankOptions()
const option2 = spreadChannelOptions()

export default {
  name: 'MediaProdAreaAndChannel',
  props: {
    pieChartData: {
      type: Array,
      default: () => [],
    },
    channelData: {
      default: () => {},
      type: [Array, Object],
    },
  },
  data() {
    return {
      MockChannelChartData: [
        { value: 50, field: 'paperCount', name: '报纸' },
        { value: 20, field: 'webCount', name: '网站' },
        { value: 30, field: 'appCount', name: '客户端' },
        { value: 20, field: 'wxCount', name: '微信' },
        { value: 10, field: 'microblogCount', name: '微博' },
        { value: 60, field: 'thirdpartyCount', name: '订阅号' },
      ],
      chartData: {
        outerData: [],
        innerData: [],
      },
      channelChartData: [
        { value: 0, field: 'paperCount', name: '报纸' },
        { value: 0, field: 'webCount', name: '网站' },
        { value: 0, field: 'appCount', name: '客户端' },
        { value: 0, field: 'wxCount', name: '微信' },
        { value: 0, field: 'microblogCount', name: '微博' },
        { value: 0, field: 'thirdpartyCount', name: '订阅号' },
      ],
      show: {
        pie: true,
        channel: true,
      },
    }
  },
  watch: {
    pieChartData(v) {
      if (!Array.isArray(v) || !v.length) return (this.show.pie = false)
      this.show.pie = true
      this.formatPieData(v)
    },

    channelData(v) {
      /* 
      {
        "sumCount": 2366,
        "wxCount": 683,
        "appCount": 333,
        "microblogCount": 130,
        "paperCount": 2,
        "webCount": 1167,
        "thirdpartyCount": 51
      }
       */
      if (!Array.isArray(v) || !v.length) {
        this.channelChartData = []
        this.show.channel = false
        return
      }
      const obj = v.at(0) || {}
      const hasData = Object.values(obj).some(ov => ov > 0)
      if (!hasData) return (this.show.channel = false)
      this.show.channel = true
      this.channelChartData.forEach(it => {
        if (obj[it.field]) {
          it.value = obj[it.field]
        }
      })
      this.renderChannelChart(this.channelChartData)
    },
  },
  methods: {
    renderChart(data) {
      option.series[0].data = data.innerData
      option.series[1].data = data.outerData
      this.$refs['customChart'].renderChart(option)
    },
    formatPieData(v) {
      /* 外环数据 */
      const outerData = []
      const nameMap = {
        APP: '客户端',
        第三方公众平台: '订阅号',
      }
      const handleOuterData = item => {
        const fv = outerData.find(od => od.symbol === item.mediaName)
        if (fv) {
          fv.value += item.transmitCount >>> 0
        } else {
          const name = nameMap[item.mediaName] || item.mediaName
          outerData.push({
            name,
            value: item.transmitCount,
            symbol: item.mediaName,
          })
        }
      }
      v.forEach(it => {
        Array.isArray(it.levelTwoMedia) &&
          it.levelTwoMedia.forEach(handleOuterData)
      })
      // console.log(outerData)
      /* 内环数据 */
      const _r = o => {
        if (!o) return
        return {
          name: o.mediaName.replace('媒体', '') + '媒体',
          value: o.transmitCount,
          active: false,
          channel: o.levelTwoMedia.map(o => _r(o)),
        }
      }
      const a = v.map(it => _r(it))
      /* 排序，根据 order */
      const order = ['核心', '一级', '二级']
      for (let i = 0; i < a.length; i++) {
        if (a[i] === order[i]) {
          continue
        }
        const fIndex = a.findIndex(item => item.name.includes(order[i]))
        const temp = a[fIndex]
        a[fIndex] = a[i]
        a[i] = temp
      }

      this.sourceDataOfPie = Object.freeze(a)
      this.chartData.innerData = Object.freeze(this.sourceDataOfPie)
      this.chartData.outerData = Object.freeze(outerData)

      this.renderChart(this.chartData)
    },
    renderChannelChart(data) {
      const innner_option = option2
      const _option = {
        title: {
          text: data.reduce(
            (prev, curr) => ({
              value: Number(prev.value) + Number(curr.value),
            }),
            { value: 0 },
          ).value,
          subtext: '总计',
          x: 'center',
          y: 'center',
          textStyle: {
            fontWeight: 'normal',
            fontSize: 50,
            color: '#313131',
          },
          subtextStyle: {
            fontSize: 16,
            color: '#898989',
          },
        },
      }

      const o = Object.assign({}, innner_option, _option)
      o.series[0].data = data
      o.series[0].radius = ['55%', '75%']
      this.$refs['customChart2'].renderChart(o)
    },
  },
  mounted() {
    // setTimeout(async () => {
    //   this.show.pie = true
    //   this.show.channel = true
    //   await this.$nextTick()
    //   this.formatPieData(reshipMediaLevelData)
    //   this.renderChannelChart(this.MockChannelChartData)
    // }, 2000)
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
      //   background-color: #bfa;
    }
  }
}
</style>
