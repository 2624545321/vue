<template>
  <div class="media-prod-level-and-manu-rank mt-20">
    <div class="important-media spread-shadow">
      <spread-title-vue title="转载媒体地域分布"></spread-title-vue>
      <div class="chart-box" style="overflow: hidden">
        <!-- <custom-chart-vue
          ref="customChart"
          :is-show="show.area"
        ></custom-chart-vue> -->
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
      <spread-title-vue title="原创稿件传播排行"></spread-title-vue>
      <manuscript-spread-list
        style="padding: 0 0.25rem;"
        :list="manuscriptData"
        :icon-list="comIconList"
        :channel="channel"
        class="chart-box"
      ></manuscript-spread-list>
    </div>
  </div>
</template>

<script>
import ManuscriptSpreadList from '@/components/public/manuscriptSpreadList/Index'
// import DistributionList from '@/components/public/distributionList/DistributionList.vue'
import BarOfVerticalAutoScroll from '@/components/public/BarOfVerticalAutoScroll/BarOfVerticalAutoScroll.js'
// import { spreadChannelOptions } from '@/assets/js/echartsOptions'
import { manuscriptRankingIconMap } from '@/assets/js/spreadOverviewService.js'
// mock data
// import { manuscriptSpreadRank } from './mockData'
// const option = spreadChannelOptions()

export default {
  name: 'MediaProdLevelAndManuRank',
  components: { ManuscriptSpreadList, BarOfVerticalAutoScroll },
  props: {
    areaData: {
      default: () => {},
      type: [Array, Object],
    },
    manuscriptData: {
      type: Array,
      default: () => [],
    },
  },
  data() {
    return {
      init: false,
      MockAreaChartData: [
        { value: 878, name: '其他' },
        { value: 280, name: '北京' },
        { value: 302, name: '山西' },
      ],
      areaChartData: [],
      sourceDataOfPie: [],
      show: {
        area: true,
        manu: true,
      },
      // manuscriptSpreadRank: Object.freeze(manuscriptSpreadRank.slice(0, 7)),
    }
  },
  computed: {
    channel() {
      // return this.$store.getters.mediaProdDetailParameter.channel
      return this.$route.query.channel
    },
    comIconList() {
      const channel = this.channel
      const channel_zh =
        (this.channelType[channel] && this.channelType[channel].value) || ''
      return manuscriptRankingIconMap.get(channel_zh) || []
    },
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
      // this.renderAreaChart(this.areaChartData)
    },
    manuscriptData(v) {
      if (!Array.isArray(v) || !v.length) return (this.show.manu = false)
      this.show.manu = true
    },
  },
  methods: {
    renderAreaChart(data) {
      const innner_option = option
      innner_option.series[0].data = data
      this.$refs['customChart'].renderChart(innner_option)
    },
    computeStyle(index) {
      switch (index) {
        case 0:
          return {
            backgroundColor: '#ed5f84',
            color: '#fff',
          }
        case 1:
          return {
            backgroundColor: '#f58440',
            color: '#fff',
          }
        case 2:
          return {
            backgroundColor: '#f7bf5c',
            color: '#fff',
          }
      }
      return {}
    },
  },
  /* mounted() {
    setTimeout(async () => {
      this.show.area = true
      await this.$nextTick()
      this.areaChartData = this.MockAreaChartData
    }, 2000)
  }, */
}
</script>

<style lang="scss" scoped>
@import '~@/styles/mixin.scss';
.media-prod-level-and-manu-rank {
  display: flex;
  justify-content: space-between;
  & > div {
    width: 49%;
    // height: 500px;
    .chart-box {
      height: 500px;
      overflow: auto;
      @include scrollBar;
    }
  }

  ::v-deep .chuanboli-list-item {
    &:nth-of-type(n + 4) .ml-serial {
      color: #7e6b5a;
      background-color: transparent;
    }
  }
}
</style>
