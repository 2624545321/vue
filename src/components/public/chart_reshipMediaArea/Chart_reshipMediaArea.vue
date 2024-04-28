<template>
  <div v-if="show" ref="areaChart" style="height: 100%"></div>
  <custom-no-data-vue v-else></custom-no-data-vue>
</template>

<script>
import { getEchartsInstance } from '@/utils/index'
import { spreadChannelOptions } from '@/assets/js/echartsOptions'
let echartsInstanceArea = null

const option = spreadChannelOptions()
const control = new AbortController()

export default {
  name: 'Chart_reshipMediaArea',
  props: {
    chartData: {
      type: Array,
      required: true,
    },
  },
  data() {
    return {
      show: true,
    }
  },
  watch: {
    chartData(v) {
      if (!Array.isArray(v) || !v.length) {
        this.show = false
        return
      }
      this.show = true
      this.renderChart(v)
    },
  },
  methods: {
    renderChart(data) {
      echartsInstanceArea = getEchartsInstance(this.$refs['areaChart'])
      const innner_option = option
      innner_option.series[0].data = data
      echartsInstanceArea.setOption(innner_option)
    },
    handleResize() {
      echartsInstanceArea && echartsInstanceArea.resize()
    },
  },
  mounted() {
    window.addEventListener('resize', this.handleResize, {
      signal: control.signal,
    })
  },
  beforeDestroy() {
    echartsInstanceArea && echartsInstanceArea.dispose()
    control.abort()
  },
}
</script>
