<template>
  <div class="important-media spread-shadow">
    <spread-title-vue title="重要媒体转载排行Top10"></spread-title-vue>
    <div class="im-wrapper">
      <div class="im-chart">
        <div v-show="show.pie" ref="important-media-chart__container"></div>
        <custom-no-data-vue v-show="!show.pie"></custom-no-data-vue>
      </div>
      <div class="im-table">
        <custom-btn-group
          v-model="btnVal"
          :list="btnListOfManuScriptData"
          :default-active-index="1"
        ></custom-btn-group>
        <el-table
          v-loading="loading"
          style="width: 100%"
          class="customStyle-ele__table"
          stripe
          :data="sourceDataOfTable"
        >
          <el-table-column
            type="index"
            width="80"
            label="排行"
            align="center"
          ></el-table-column>
          <el-table-column
            prop="mediaName"
            label="媒体名称"
            width="auto"
            align="left"
          ></el-table-column>
          <el-table-column
            prop="mediaLevel"
            label="媒体等级"
            width="auto"
            align="center"
          ></el-table-column>
          <el-table-column
            prop="count"
            label="转载数"
            width="auto"
            align="center"
          ></el-table-column>
          <!-- <el-table-column
            prop="coreHeadline"
            label="核心头条"
            width="auto"
            align="center"
          ></el-table-column> -->
        </el-table>
      </div>
    </div>
  </div>
</template>

<script>
import CustomBtnGroup from '@/components/CustomBtnGroup/Index.vue'
import { getEchartsInstance } from '@/utils/index'
import { importMediaReshipRankOptions } from '@/assets/js/echartsOptions'
// mock data
// import { mockImportantRankData } from './mockData'

let echartsInstance = null
const option = importMediaReshipRankOptions()

export default {
  name: 'ImportantMedia',
  components: { CustomBtnGroup },
  props: {
    pieChartData: {
      type: Array,
      default: () => [],
    },
    tableData: {
      type: Array,
      default: () => [],
    },
    loading: {
      default: false,
      type: Boolean
    }
  },
  data() {
    return {
      init: false,
      btnVal: '',
      // APP、微信、微博、电子报、第三方公众平台、网站
      btnList: [
        { label: '报纸', value: '电子报' },
        { label: '网站', value: '网站' },
        { label: '客户端', value: 'APP' },
        { label: '微博', value: '微博' },
        { label: '微信', value: '微信' },
        // { label: '短视频', value: 'tiktok' },
        { label: '订阅号', value: '第三方公众平台' },
        // { label: '海外媒体', value: 'haiwaimeiti' },
      ],
      // mockTableData: [
      // {
      //   mediaName: '报纸-解放军报',
      //   mediaLevel: '核心媒体',
      //   count: 2000, // 转载数
      //   coreHeadline: 1323,
      // },
      // ],
      chartData: {
        outerData: [],
        innerData: [],
      },
      acitvatedChartName: '',
      sourceDataOfPie: [],
      sourceDataOfTable: [],
      show: {
        pie: true,
        table: true,
      },
    }
  },
  computed: {
    btnListOfManuScriptData() {
      // this.btnList.forEach(b => {
      //   const icon = b.icon
      //   b.icon = require(`@/assets/imgs/spreadOverview/ManuscriptSpreadRanking/${icon}.png`)
      //   b.activeIcon = require(`@/assets/imgs/spreadOverview/ManuscriptSpreadRanking/${icon}-active.png`)
      // })
      return this.btnList
    },
  },
  watch: {
    btnVal(bv) {
      // console.log('init', this.init)
      /* 触发事件，第一次不需要，初始化会发送请求 */
      if (!this.init) return
      // console.log('bv', bv)
      this.$emit('btnToggle', bv.value)
    },
    pieChartData(v) {
      if (!Array.isArray(v) || !v.length) return (this.show.pie = false)
      this.show.pie = true
      this.formatPieData(v)
    },
    tableData(v) {
      if (!Array.isArray(v) || !v.length) {
        this.show.table = false
        this.sourceDataOfTable = []
        return
      }
      this.show.table = true
      this.sourceDataOfTable = Object.freeze(v)
      // console.log('tableData', v)
      // this.formatTableData()
    },
    acitvatedChartName(n) {
      let d = null
      if (!n) {
        d = this.tableData
      } else {
        d = this.tableData.filter(t => n.includes(t.mediaLevel))
      }
      this.sourceDataOfTable = Object.freeze(d)
      // console.log('sourceDataOfTable', this.sourceDataOfTable, this.tableData)
    },
  },
  methods: {
    renderChart() {
      echartsInstance = getEchartsInstance(
        this.$refs['important-media-chart__container'],
      )
      option.series[0].data = this.chartData.innerData
      option.series[1].data = this.chartData.outerData
      // debugger
      echartsInstance.clear()
      echartsInstance.setOption(option)
      this.handleChartClick()
      window.addEventListener('resize', this.handleResize)
    },
    renderOuterChart() {
      option.series[1].data = this.chartData.outerData
      echartsInstance.setOption(option)
    },
    handleResize() {
      echartsInstance.resize()
    },
    /**
     * @desc pie 图表点击处理
     */
    handleChartClick() {
      // const d = mockImportantRankData
      const d = this.sourceDataOfPie
      echartsInstance.off('click')
      /* modify：饼图不再进行对应等级下的渠道数据渲染，变为渲染全部。保留与右侧表格的联动 */
      const chartClickCb = par => {
        const { name } = par
        // 找到点击的名称
        const findVal = d.find(d => d.name === name)
        const otherData = d.filter(d => d !== findVal)
        if (!findVal) return

        // 选中，如果点击的名字和上次点击的一样 则取消选中
        if (findVal.active && this.acitvatedChartName === name) {
          otherData.forEach(o => (o.active = false))
          this.acitvatedChartName = ''
          findVal.active = false
          // this.chartData.outerData = []
        } else {
          // 没选中，选中，其他项设置为false
          this.acitvatedChartName = name
          otherData.forEach(o => (o.active = false))
          findVal.active = true
          /* 选中的子项颜色自动，其他项为透明色 */
          // const resArr = []
          // d.forEach(d => {
          //   d.channel.forEach(it => {
          //     if (d.active) {
          //       it.itemStyle = { color: '' }
          //     } else {
          //       it.itemStyle = { color: 'rgba(0, 0, 0, 0)' }
          //     }
          //     resArr.push(it)
          //   })
          // })
          // this.chartData.outerData = Object.freeze(resArr)
        }

        // this.renderOuterChart()
      }
      echartsInstance.on('click', chartClickCb)
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

      this.renderChart()
    },
    // formatTableData() {

    // },
    // mockData() {
    // while (this.mockTableData.length < 10) {
    //   this.mockTableData.push(...this.mockTableData)
    // }
    // this.mockTableData = this.mockTableData.slice(0, 10)
    // mock 数据
    // this.chartData.innerData = Object.freeze(mockImportantRankData)
    // },
  },
  mounted() {
    // this.mockData()
    this.$nextTick(() => (this.init = true))
  },
  beforeDestroy() {
    echartsInstance && echartsInstance.dispose()
    window.removeEventListener('resize', this.handleResize)
  },
}
</script>

<style lang="scss" scoped>
.important-media {
  margin-top: 0.25rem;
}
.im-wrapper {
  display: flex;
  // min-height: 9.2rem;
  height: 10rem;
  padding: 0.25rem;
  justify-content: space-between;
  .im-chart {
    height: 100%;
    & > div {
      height: 100%;
    }
  }

  .im-chart {
    width: 61%;
  }

  .im-table {
    width: 39%;
    // background-color: orange;
    & > div {
      height: auto;
    }
    ::v-deep {
      // .tsa-date-group {
      //   justify-content: space-between;
      // }
      // .tsa-date-btn-item + .tsa-date-btn-item {
      //   margin-left: 0;
      // }
      // .tsa-date-btn-item {
      //   button {
      //     padding: 0.1rem .2rem;
      //   }
      // }
      .customStyle-ele__table.el-table .el-table__row td:nth-of-type(2) {
        padding-left: 0.25rem;
      }
    }
  }
}
</style>
