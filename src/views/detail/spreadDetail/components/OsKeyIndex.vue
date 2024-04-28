<template>
  <div class="key-index spread-shadow">
    <spread-title-vue title="关键指标"></spread-title-vue>
    <div class="key-index-con">
      <div class="ki-chart">
        <div ref="kiChart"></div>
      </div>
      <div class="ki-overview">
        <div
          v-for="(ol, i) of overviewList"
          :key="i"
          :class="ol.zh == activedChannletype && 'active'"
          class="ki-overview-item spread-shadow"
        >
          <div class="kio-icon">
            <img
              :src="
                require(`@/assets/imgs/originalSpread/keyIndex/${ol.icon}.png`)
              "
              :alt="ol.icon"
            />
            <img
              class="shover"
              :src="
                require(`@/assets/imgs/originalSpread/keyIndex/${
                  ol.icon
                }-hover.png`)
              "
              :alt="ol.icon"
            />
          </div>
          <div class="kio-count">
            <div>
              <p v-for="(c, _i) of ol.count" :key="_i" class="fs-16">
                <span>{{ c.text }}：</span>
                <span>{{ c.num }}</span>
              </p>
            </div>
          </div>
        </div>
        <div
          class="ki-overview-item ki-overview-item-media spread-shadow pointer-none"
        >
          <div class="kio-icon">
            <img
              :src="require(`@/assets/imgs/originalSpread/keyIndex/media.png`)"
              alt="media"
            />
          </div>
          <div class="kio-count">
            <div>
              <p v-for="(c, _i) of media.count" :key="_i" class="fs-16">
                <span>{{ c.text }}：</span>
                <span class="font-bold">{{ c.num }} 家</span>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { getEchartsInstance } from '@/utils/index'
import { channelCommentsMap } from './data'
/*
  axisLabel 的渲染条件
  不等于 0，并且不是false
*/
let labelRenderCondition = 0
let indicatorArr = []
let seriesData = []
let totalNum = 0
let echartsInstance = null
const option = {
  // backgroundColor: '#0A2E5D',
  normal: {
    top: 200,
    left: 300,
    width: 500,
    height: 400,
    zIndex: 6,
    backgroundColor: '',
  },
  color: ['rgba(205,62,46, 1)'],
  title: {
    show: true,
    text: '传播力指数：',
    left: 'center',
    bottom: '6%',
    textStyle: {
      fontSize: 18,
      color: '#CB3B2E',
      fontStyle: 'normal',
      fontWeight: 'normal',
    },
  },
  tooltip: {
    // show: false,
    trigger: 'item',
    // formatter: (a) => {
    //   console.log(a)
    //   // debugger
    // }
  },
  legend: {
    show: false,
    icon: 'circle',
    left: '35%',
    top: '90%',
    orient: 'horizontal',
    textStyle: {
      fontSize: 14,
      color: '#fff',
    },
    data: ['高一(1)班', '高一(2)班'],
  },
  radar: {
    center: ['50%', '50%'],
    radius: '60%',
    startAngle: 90,
    splitNumber: 6,
    shape: 'circle',
    triggerEvent: true,
    splitArea: {
      areaStyle: {
        color: [
          'rgba(255, 255, 255, 1)',
          'rgba(230,90,11, 1)',
          'rgba(235,136,106, 0.8)',
          'rgba(235,136,106, 0.4)',
          'rgba(235,136,106, 0.2)',
          'rgba(235,136,106, 0.08)',
          'rgba(235,136,106, 0.01)',
          // 'rgba(235,136,106, 0.04)',
        ],
      },
    },
    name: {
      textStyle: {
        color: '#1b1b1b',
        fontSize: 14,
      },
    },
    axisLabel: {
      show: true,
      fontSize: 12,
      color: 'rgba(235,136,106, 0.8)',
      fontStyle: 'normal',
      fontWeight: 'normal',
      lineStyle: {
        type: 'dashed',
        color: '#0ab3f0',
        width: 1.5, //
      },
      formatter: function(value, index) {
        // console.log('index >>> ', index)
        if (index === 1) {
          labelRenderCondition++
        }
        if (labelRenderCondition < 2) {
          // console.log('labelRenderCondition', labelRenderCondition, index)
          return value.toFixed(0)
        } else {
          return
        }
      },
    },
    axisLine: {
      show: true,
      lineStyle: {
        color: 'rgba(235,136,106, 1)', //
        type: 'dotted',
      },
    },
    splitLine: {
      show: true,
      lineStyle: {
        color: 'rgba(0, 0, 0, 0)', //
      },
    },
    indicator: indicatorArr,
  },
  series: [
    {
      name: '传播力指数',
      type: 'radar',
      symbol: 'circle',
      symbolSize: 10,
      areaStyle: {
        normal: {
          color: 'rgba(205,62,46, 0.3)',
        },
      },
      itemStyle: {
        color: '#fff',
        borderColor: 'rgba(205,62,46, 0.7)',
        borderWidth: 2,
      },
      lineStyle: {
        normal: {
          // type: 'dashed',
          color: 'rgba(205,62,46, 0.6)',
          width: 2,
        },
      },
      data: [seriesData],
      // data: [
      //   {
      //     name: '高一(1)班',
      //     value: [80, 40, 60]
      //   }
      // ]
    },
  ],
}

export default {
  name: 'OsKeyIndex',
  props: {
    kiData: { type: Array },
    infoType: { type: [String, Number] },
  },
  data() {
    return {
      chartData: [
        { name: '转载量', value: '0', icon: 'reship', field: 'reprintCount' },
        { name: '阅读量', value: '0', field: 'reading' },
        { name: '互动量', value: '0', field: 'interaction' },
      ],
      overviewList: [
        {
          icon: 'reship',
          zh: '转载量',
          count: [
            { text: '转载量', num: '0', field: 'reprintCount' },
            { text: '外部转载', num: '0', field: 'externalReprintCount' },
            { text: '内部刊发', num: '0', field: 'unitMediaReprintCount' },
          ],
        },
        {
          icon: 'comment',
          zh: '互动量',
          count: [], // watch infoType 改变时设置对应的数据
          /*  [
            { text: '互动量', num: '0', field: 'interaction' },
            { text: '点赞量', num: '0', field: 'praise' },
            { text: '评论量', num: '0', field: 'comments' },
            { text: '转发量', num: '0', field: 'forward' },
          ], */
        },
        {
          icon: 'read',
          zh: '阅读量',
          count: [
            { text: '阅读量', num: '0', field: 'reading' },
            // { text: '全网阅读量', num: '0' },
            // { text: '内部平台与度量', num: '0' },
          ],
        },
      ],
      activedChannletype: '', // 激活的渠道类型
      media: {
        count: [
          { text: '转载媒体单位', num: '0', field: 'unitMedia' },
          { text: '核心头条单位', num: '0', field: 'topCount' },
          { text: '核心媒体单位', num: '0', field: 'coreCount' },
        ],
      },
    }
  },
  computed: {
    channelValue() {
      const channel = this.channelList.find(c => c.key === String(this.infoType)) || {}
      return channel.value === '微信' ? channel.value : '默认'
    }
  },
  watch: {
    kiData(v) {
      // console.log('kiData', v)
      if (!Array.isArray(v) || !v.length) return this.setOverviewListData({})
      const obj = v[0]
      // console.log('kiData', obj)
      this.$nextTick(() => {
        this.setOverviewListData(obj)
      })
    },
    infoType: {
      handler(v) {
        // console.log('infoType', v)
        // const channel = this.channelList.find(c => c.key === String(v))
        // if (!channel) return
        // const k = channel.value === '微信' ? channel.value : '默认'
        this.overviewList[1].count = channelCommentsMap.get(this.channelValue)
      },
      immediate: true,
    },
  },
  methods: {
    /**
     * @desc 卡片和图表的数据设置
     * @param { object } obj 数据
     */
    setOverviewListData(obj) {
      if (obj == undefined) return console.warn(`${obj} is invalid`)
      const _setVal = item => {
        let v = '0'
        if (Object.hasOwn(obj, item.field)) {
          v = obj[item.field]
        }
        if (Object.hasOwn(item, 'num')) {
          item.num = v
        } else if (Object.hasOwn(item, 'value')) {
          item.value = v
        }
      }

      this.overviewList.forEach(it => it.count.forEach(_setVal))
      this.media.count.forEach(_setVal)
      this.chartData.forEach(_setVal)
      totalNum = obj.ceiIndex || '0' // 传播力指数
      this.handleChartData()

      // 设置 overviewList[1] 的数据，总数需要自己计算
      this.overviewList[1].count[0].num = 0
      for(let i = 1; i < this.overviewList[1].count.length; i ++) {
        this.overviewList[1].count[0].num += this.overviewList[1].count[i].num >>> 0
      }
    },
    // 处理图表的数据
    handleChartData() {
      const d = this.chartData
      const maxValue = Math.max(...d.map(it => it.value >>> 0))
      for (let i = 0, len = d.length; i < len; i++) {
        const c = d[i]
        // totalNum += c.value >>> 0
        indicatorArr.push({
          name: c.name,
          max: maxValue,
        })
        seriesData.push(c.value)
      }
      this.$nextTick(() => this.renderChart())
    },
    renderChart() {
      echartsInstance = getEchartsInstance(this.$refs['kiChart'])
      option.title.text = '传播力指数：' + totalNum
      echartsInstance.clear()
      echartsInstance.setOption(option)
      this.handleChartClick()
      window.addEventListener('resize', this.handleResize)
    },
    handleResize() {
      echartsInstance.resize()
    },
    handleChartClick() {
      const chartCb = par => {
        // console.log(par)
        // debugger
        if (par.targetType !== 'axisName') return
        this.activedChannletype === par.name
          ? (this.activedChannletype = '')
          : (this.activedChannletype = par.name)
      }
      echartsInstance.on('click', chartCb)
    },
  },
  /* mounted() {
    this.$watch(
      function() {
        return this.overviewList[1].count
      },
      function(v) {
        console.log('overviewList[1].count', v)
      },
      { deep: true }
    )
  }, */
  beforeDestroy() {
    indicatorArr = []
    seriesData = []
    totalNum = 0
    echartsInstance.dispose()
    window.removeEventListener('resize', this.handleResize)
  },
}
</script>

<style lang="scss" scoped>
.key-index {
  margin-top: 0.125rem;
}

.key-index-con {
  display: flex;
  align-items: center;
  padding: 0 20px;
  .ki-chart {
    width: 7.5rem;
    height: 400px;
    // background-color: #bfa;
    & > div {
      height: 100%;
    }
  }
  .ki-overview {
    flex-grow: 1;
    display: flex;
    justify-content: space-between;
    // line-height: 0;
    // background-color: #bfa;
  }
}
.ki-overview-item {
  width: 2.75rem;
  // width: 22%;
  height: 280px;
  padding: 32px 0 0 0;
  color: #313131;
  // line-height: 0;
  // background: linear-gradient(
  //   to top,
  //   rgba(206, 62, 49, 0.08),
  //   rgba(255, 255, 255, 0),
  //   rgba(255, 255, 255, 0)
  // );
  // border: 1px solid rgba(206, 62, 49, 0.1);
  border-radius: var(--main-border-radius);
  .kio-icon {
    height: 90px;
    text-align: center;
    img {
      height: 100%;
      object-fit: scale-down;
    }
    img:is(.shover) {
      display: none;
    }
  }
  .kio-count {
    margin-top: 16px;
    display: flex;
    justify-content: center;

    p {
      margin: auto;
      margin-top: 10px;
      // text-align: left;
      &:first-of-type {
        font-weight: 700;
      }
      &:nth-of-type(n + 2) {
        // padding-left: 10px;
        text-indent: 1em;
      }
    }
  }

  &:nth-of-type(3) {
    .kio-count {
      height: 100px;
      align-items: center;
    }
  }
}

// .ki-overview-item:hover,
.ki-overview-item.active {
  border: none;
  color: #fff;
  background: var(--main-color);
  transition: background 0.5s;
  cursor: pointer;
  .kio-icon {
    img {
      display: none;
    }
    img:is(.shover) {
      display: inline-block;
    }
  }
}

.ki-overview-item-media {
  width: 3.75rem;
  // width: 30%;
  background-color: rgba(224, 194, 144, 1);
  color: #fff;
  .kio-count {
    p {
      overflow: hidden;
      & > span:nth-of-type(2) {
        float: right;
      }
    }
  }
}
</style>
