<template>
  <div class="mt-20 os-spread-path spread-shadow">
    <spread-title-vue title="传播路径分析">
      <custom-button-vue
        class="fullscreen-view"
        :btn-data="{ label: '全屏查看', value: '' }"
        @click.native="handleFullScreenView"
      ></custom-button-vue>
    </spread-title-vue>
    <div class="os-spread-path-chart">
      <div ref="graph"></div>
    </div>

    <el-dialog
      title="传播路径图"
      fullscreen
      :visible.sync="dialogVisible"
    >
      <div id="spread-path"></div>
    </el-dialog>
  </div>
</template>

<script>
import { getEchartsInstance } from '@/utils/index'
// import { mockSpreadPath } from './mockData'
// const result = mockSpreadPath
let graphChartInstance = null
const chartAbort = new AbortController()
export default {
  name: 'OsSpreadPath',
  props: { spData: { required: true } },
  data() {
    return {
      data: {
        graphOptions: {},
      },
      graph: {
        series_categories: [],
        treeListData: [],
        treeListlink: [],
      },
      result: {},
      dialogVisible: false,
    }
  },
  watch: {
    spData(v) {
      // console.log('spData', v)
      this.result = v
      this.renderChart()
      // console.log(this.result)
    },
  },
  methods: {
    renderChart() {
      //   this.graph.treeListlink = Object.freeze(result.links)
      this.graph.treeListlink = this.result.links
      this.getTreeSymbol()
      this.setNodeData(this.result.nodes)
      this.getTreeChart(this.$refs['graph'])
    },
    getColor(group) {
      // var colorArr = ['#c23531','#2f4554', '#61a0a8', '#d48265', '#91c7ae','#749f83',  '#ca8622', '#bda29a','#6e7074', '#546570', '#c4ccd3']
      var colorArr = [
        '#ff6254',
        '#32e3ec',
        '#6df2c5',
        '#3da0ff',
        '#c1f488',
        '#f38c2a',
        '#ff6254',
        '#edc552',
      ]

      if (group == 1) {
        return colorArr[0]
      } else if (group == 3) {
        return colorArr[1]
      } else if (group == 5) {
        return colorArr[2]
      } else if (group == 7) {
        return colorArr[3]
      } else if (group == 8) {
        return colorArr[4]
      } else if (group == 18) {
        return colorArr[5]
      }
    },
    /** 处理数图 series_categories */
    getTreeSymbol() {
      let levels = 2
      let temp = ['一', '二', '三']
      for (var i = 0; i <= levels; i++) {
        this.graph.series_categories.push({
          name: i === 0 ? '父节点' : '层级' + temp[i],
          // symbol : i===0?'image://./img/file_one.png': (i===1?'image://./img/file_second.png':'circle'),
          // symbol : i===0?'image://./img/file_one.png': 'circle',
          // symbolSize: i===0?[405,388]:(i===1?[154,154]:[42,42])
        })
      }
    },
    /** 处理数图数据 listdata */
    setNodeData(nodes) {
      var listdata = []
      var size = 33
      // var colorArr = ["#253afb","#fb2222","#fabf48","#75fbf8"];

      //生成不同的颜色代码
      function createColorCode(code, colorArr) {
        if ($.inArray(code, colorArr) == -1 && code.length > 6) {
          colorArr[0] = code
        } else {
          code = '#' + Math.floor(Math.random() * 16777215).toString(16)
          createColorCode(code, colorArr)
        }
        return colorArr
      }

      for (var i = 0; i < nodes.length; i++) {
        const that = this
        const sourceValue =
          this.graph.treeListlink[0] && this.graph.treeListlink[0].source
        var category = nodes[i].name == sourceValue ? 0 : 1
        // var category = nodes[i].target == $scope.data.treeListlink[0].source ? 0 : 1
        if (category == 0) {
          size = 50
        } else if (category == 1) {
          size = 30
        } else {
          size = 10
        }
        // var color=createColorCode('#'+Math.floor(Math.random()*16777215).toString(16),colorArr);
        var color = that.getColor(nodes[i].group)
        listdata.push({
          category: category,
          name: nodes[i].name,
          symbolSize: size,
          value: nodes[i].value,
          itemStyle: {
            color: color,
          },
          draggable: 'true',
        })
      }

      this.graph.treeListData = Object.freeze(listdata)
    },
    getTreeChart(ele) {
      graphChartInstance = getEchartsInstance(ele)
      var graphOptions = {
        animationDuration: 3000,
        animationEasingUpdate: 'quinticInOut',
        series: [
          {
            name: '路径传播图',
            type: 'graph',
            layout: 'force',
            force: {
              repulsion: 3000,
              gravity: 0.6,
              // edgeLength: [10,50],
              layoutAnimation: true,
            },
            data: this.graph.treeListData,
            links: this.graph.treeListlink,
            categories: this.graph.series_categories,
            focusNodeAdjacency: false,
            roam: true,
            label: {
              normal: {
                show: true,
                position: 'bottom',
                formatter: '{b}',
              },
            },
          },
        ],
      }
      //   this.data.graphOptions = graphOptions
      graphChartInstance.setOption(graphOptions)
      // console.log('this.graphChartInstance', graphChartInstance)
    },

    async handleFullScreenView() {
      this.dialogVisible = true
      await this.$nextTick()
      this.getTreeChart(document.getElementById('spread-path'))
    }
  },
  mounted() {
    window.addEventListener('resize', () => {
      graphChartInstance && graphChartInstance.resize()
    }, { signal: chartAbort.signal })
  },
  beforeDestroy() {
    chartAbort.abort()
  }
}
</script>

<style lang="scss" scoped>
.os-spread-path {
  .fullscreen-view {
    position: absolute;
    right: 20px;
    top: 14px;
  }

  .os-spread-path-chart {
    height: 470px;
    // background-color: #bfa;
    & > div {
      height: 100%;
      // background-color: red;
    }
  }

  #spread-path {
    height: calc(100vh - 100px);
  }
}
</style>
