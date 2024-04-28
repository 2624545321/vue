<template>
  <div class="os-area-and-channel mt-20">
    <div class="spread-shadow">
      <spread-title-vue title="转载媒体地域分布"></spread-title-vue>
      <div class="chart-box">
        <!-- <div v-show="show.area" ref="areaChart" style="height: 100%"></div>
        <custom-no-data-vue v-show="!show.area"></custom-no-data-vue> -->
        <!-- <distribution-list
          :is-show="show.area"
          :list-data="areaChartData"
        ></distribution-list> -->
        <bar-of-vertical-auto-scroll
          style="padding: 0 0.25rem"
          :is-show="show.area"
          :seamless="false"
          :list="areaChartData"
          :fields="{ label: 'name', value: 'value' }"
        >
          <template #label="{ l, i }">
            <i :class="['ml-serial', 'ml-serial-0' + (i + 1)]">
                {{ i + 1 }}
            </i>
            <span>{{ l.name }}</span>
          </template>
        </bar-of-vertical-auto-scroll>
      </div>
    </div>
    <div class="spread-shadow">
      <spread-title-vue title="传播渠道分布"></spread-title-vue>
      <div class="chart-box">
        <div
          v-show="show.channel"
          ref="channelChart"
          style="height: 100%"
        ></div>
        <custom-no-data-vue v-show="!show.channel"></custom-no-data-vue>
      </div>
    </div>
  </div>
</template>

<script>
// import DistributionList from '@/components/public/distributionList/DistributionList.vue'
import BarOfVerticalAutoScroll from '@/components/public/BarOfVerticalAutoScroll/BarOfVerticalAutoScroll.js'
import { getEchartsInstance } from '@/utils/index'
import { spreadChannelOptions } from '@/assets/js/echartsOptions'
let echartsInstanceArea = null
let echartsInstanceChannel = null
const option = spreadChannelOptions()

export default {
  name: 'OsAreaAndChannel',
  components: { BarOfVerticalAutoScroll },
  props: {
    areaData: {
      required: true,
    },
    channelData: {
      required: true,
    },
  },
  data() {
    return {
      // MockAreaChartData: [
      //   { value: 878, name: '其他' },
      // ],
      areaChartData: [],
      channelChartData: [
        { value: 0, field: 'paperCount', name: '报纸' },
        { value: 0, field: 'webCount', name: '网站' },
        { value: 0, field: 'appCount', name: '客户端' },
        { value: 0, field: 'wxCount', name: '微信' },
        { value: 0, field: 'microblogCount', name: '微博' },
        { value: 0, field: 'thirdpartyCount', name: '订阅号' },
      ],
      show: {
        area: true,
        channel: true,
      },
    }
  },
  watch: {
    areaData(v) {
      /* 
        [
          {
            "area": "上海",
            "proportion": 1.16,
            "count": 82
          }
        ]
      */
      if (!Array.isArray(v) || !v.length) {
        this.areaChartData = []
        this.show.area = false
        return
      }
      this.show.area = true
      this.areaChartData = v.map(it => ({
        name: it.area,
        value: it.count,
      }))
      // this.renderAreaChart()
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
      this.channelChartData.sort((a, b) => b.value - a.value)
      this.renderChannelChart(this.channelChartData.slice(0, 5))
    },
  },
  methods: {
    renderAreaChart() {
      echartsInstanceArea = getEchartsInstance(this.$refs['areaChart'])
      // option.series[0].data = this.MockAreaChartData
      const innner_option = window.structuredClone(option)
      innner_option.series[0].data = this.areaChartData
      echartsInstanceArea.setOption(innner_option)
    },
    renderChannelChart(data) {
      echartsInstanceChannel = getEchartsInstance(this.$refs['channelChart'])
      const innner_option = window.structuredClone(option)
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
      echartsInstanceChannel.setOption(o)
    },
    handleResize() {
      // console.log('handleResize')
      echartsInstanceArea && echartsInstanceArea.resize()
      echartsInstanceChannel && echartsInstanceChannel.resize()
    },
  },
  mounted() {
    // this.$nextTick(() => {
    // this.renderAreaChart()
    // this.renderChannelChart()
    // })
    window.addEventListener('resize', this.handleResize)
  },
  beforeDestroy() {
    echartsInstanceArea && echartsInstanceArea.dispose()
    echartsInstanceChannel && echartsInstanceChannel.dispose()
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
      height: 480px;
      overflow: hidden;
      //   background-color: #bfa;
    }
  }
}
</style>
