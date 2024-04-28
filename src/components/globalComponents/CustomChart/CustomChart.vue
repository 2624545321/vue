<template>
  <div v-if="isShow" ref="chart" style="height: 100%"></div>
  <custom-no-data-vue v-else></custom-no-data-vue>
</template>

<script>
import { getEchartsInstance } from '@/utils/index'

export default {
  name: 'CustomChart',
  props: {
    isShow: {
      type: Boolean,
      default: true,
    },
  },
  data() {
    return {
      control: null,
      echartsInstance: null,
    }
  },
  methods: {
    renderChart(options) {
      this.echartsInstance = getEchartsInstance(this.$refs['chart'])
      this.echartsInstance.clear()
      this.echartsInstance.setOption(options)

      if (this.control) return
      this.control = new AbortController()
      window.addEventListener('resize', this.handleResize, {
        signal: this.control.signal,
      })
    },
    handleResize() {
      // console.log(123)
      this.echartsInstance && this.echartsInstance.resize()
    },
  },
  // mounted() {
  //   control.abort()
  //   window.addEventListener('resize', this.handleResize, {
  //     signal: control.signal,
  //   })
  // },
  beforeDestroy() {
    this.echartsInstance && this.echartsInstance.dispose()
    this.control && this.control.abort()
  },
}
</script>
