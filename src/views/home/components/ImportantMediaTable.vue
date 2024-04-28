<template>
  <div class="important-media spread-shadow">
    <spread-title-vue title="转载媒体统计">
      <span class="reveal-time">{{ currentDate }}</span>
    </spread-title-vue>
    <div class="im-wrapper">
      <div v-for="(cd, i) of allChannelData" :key="i" class="im-table">
        <!-- <custom-btn-group
          class="pointer-none"
          :list="[cd]"
          :default-active-index="0"
        ></custom-btn-group> -->
        <custom-eLe-table-vue
          v-loading="cd.loading"
          style="width: 100%"
          class="customStyle-ele__table statistics__table"
          stripe
          height="530"
          :data="cd.data"
          :columns="customColumns(cd)"
        ></custom-eLe-table-vue>
      </div>
    </div>
  </div>
</template>

<script>
import CustomBtnGroup from '@/components/CustomBtnGroup/Index.vue'
import CustomELeTableVue from '@/components/CustomELeTable/CustomELeTable.vue'

import { importantMediaTableColumns } from './data'
// mock data
// import { mockImportantRankData } from './mockData'

export default {
  name: 'ImportantMediaTable',
  components: { CustomBtnGroup, CustomELeTableVue },
  props: {
    currentDate: {
      type: String,
      default: ''
    },
    allChannelData: {
      type: Array,
      default: () => [],
    },
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
      acitvatedChartName: '',
      sourceDataOfTable: [],
      // columns,
      show: {
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
  },
  methods: {
    /* 媒体渠道对应的表格自定义列 */
    customColumns(item) {
      const columns = importantMediaTableColumns()
      columns[1].label = item.label + '名称'
      return columns
    }
  },
  mounted() {
    // this.mockData()
    this.$nextTick(() => (this.init = true))
  },
}
</script>

<style lang="scss" scoped>
.important-media {
  margin-top: 0.25rem;
}
.im-wrapper {
  display: flex;
  flex-wrap: wrap;
  // min-height: 9.2rem;
  // height: 10rem;
  padding: 0.25rem;
  // justify-content: space-between;
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
    // width: 40%;
    width: 49.2%;
    margin-bottom: 30px;
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
  .im-table:nth-of-type(2n + 1) {
    // margin-right: 18%;
    margin-right: 1.2%;
  }
}
</style>
