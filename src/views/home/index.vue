<template>
  <div class="app-container">
    <div class="cbl_bg">
      <!-- 搜索 -->
      <div class="result_search">
        <custom-btn-group
          v-model="data.btnVal"
          :list="data.btnList"
          :default-active-index="2"
          class="fl"
        ></custom-btn-group>
        <el-date-picker
          v-model="data.searchTime"
          @change="handleDatePicker"
          :picker-options="pickerBeginDateBefore"
          :clearable="false"
          type="daterange"
          align="right"
          unlink-panels
          range-separator="至"
          start-placeholder="开始日期"
          end-placeholder="结束日期"
          value-format="yyyy-MM-dd"
          :editable="false"
          class="fl customStyle__ele-data-pciker"
        ></el-date-picker>
      </div>
      <!-- 主体 -->
      <div class="cbl_container">
        <!-- 整体概览 -->
        <over-all-overview-vue :card-data="topCardData"></over-all-overview-vue>
        <!-- 传播概览 -->
        <rmrb-sperad-overview-vue
          :current-date="comRevealTime"
          :spread-overview-data="spreadOVerviewData"
        ></rmrb-sperad-overview-vue>
        <!-- 传播排行 -->
        <spread-ranking-vue
          :current-date="comRevealTime"
          :media-product-ranking-data="mediaProductRankingData"
          :manuscript-list="manuscriptRankingData"
          @btnToggle="handleManuscriptRankBtnToggle"
        ></spread-ranking-vue>
        <!-- 重要媒体转载排行Top10 改为所有渠道为表格展示 形式 -->
        <!-- <important-media-vue
          :pieChartData="ImportantMediaData.chartData"
          :tableData="ImportantMediaData.tableData"
          :loading="ImportantMediaData.loading"
          @btnToggle="handleImBtnToggle"
        ></important-media-vue> -->
        <important-media-table-vue
          :current-date="comRevealTime"
          :allChannelData="ImportantMediaData.allChannelData"
        ></important-media-table-vue>
      </div>
    </div>
  </div>
</template>

<script>
// 组件
import CustomBtnGroup from '@/components/CustomBtnGroup/Index.vue'
import OverAllOverviewVue from './components/OverAllOverview.vue'
import RmrbSperadOverviewVue from './components/RmrbSperadOverview.vue'
import SpreadRankingVue from './components/SpreadRanking.vue'
import ReshipRankingVue from './components/ReshipRanking.vue'
// import ImportantMediaVue from './components/ImportantMedia.vue'
import ImportantMediaTableVue from './components/ImportantMediaTable.vue'
// 工具函数
import { timeFormat } from '@/utils/timeFormat'
import { dateBtnValToTime } from '@/utils/shared'
// import { cacheData_importantReshipRank } from '@/utils/cacheData'
// api请求
import {
  getOverviewTop,
  getPropagateOverview,
  getMediaProductTop,
  getManuscriptDiffuseTop,
  getImportantMediaTransmitTop,
  getImportantMediaTransmitTopList,
} from '@/api/home'

const defaultMediaType = '电子报'
export default {
  name: 'Home',
  components: {
    CustomBtnGroup,
    OverAllOverviewVue,
    RmrbSperadOverviewVue,
    SpreadRankingVue,
    ReshipRankingVue,
    // ImportantMediaVue,
    ImportantMediaTableVue,
  },
  data() {
    return {
      pickerBeginDateBefore: {
        disabledDate(time) {
          return time.getTime() > Date.now()
        },
      },
      data: {
        searchTime: [
          timeFormat(new Date().getTime() - 7 * 24 * 60 * 60 * 1000, true),
          timeFormat(new Date(), true),
        ],
        btnList: [
          { label: '今日', value: 0 },
          { label: '昨日', value: [1, 1] },
          { label: '近7日', value: 6 },
          { label: '近30日', value: 30 },
        ],
        btnVal: null,
      },
      params: {
        // method: 'post',
        // url: '/cas/spread2v/homepage/main.do',
        data: {
          startDate: '',
          endDate: '',
        },
      },
      revealTime: '', // 在各个模块显示得时间
      topCardData: [], // 顶部卡片数据
      spreadOVerviewData: [], // 人民日报传播概览
      mediaProductRankingData: [], // 媒体产品传播排行数据
      manuscriptRankingData: [], // 稿件传播排行数据
      // 重要媒体转载排行Top10数据
      ImportantMediaData: {
        chartData: [],
        tableData: [],
        allChannelData: [
          { label: '报纸', value: '电子报', data: [], loading: false },
          { label: '网站', value: '网站', data: [], loading: false },
          { label: '客户端', value: 'APP', data: [], loading: false },
          { label: '微博', value: '微博', data: [], loading: false },
          { label: '微信', value: '微信', data: [], loading: false },
          // { label: '短视频', value: 'tiktok' },
          {
            label: '订阅号',
            value: '第三方公众平台',
            data: [],
            loading: false,
          },
          // { label: '海外媒体', value: 'haiwaimeiti' },
        ],
        loading: false,
      },
    }
  },
  watch: {
    'data.btnVal'(v) {
      if (!v) return
      // console.log('data.btnVal', v)
      const value = v.value
      // this.data.searchTime = [
      //   value[0].replaceAll('-', ''),
      //   value[1].replaceAll('-', ''),
      // ]
      this.data.searchTime = [value[0], value[1]]
      this.handleDatePicker(v.value)
    },
  },
  computed: {
    comRevealTime() {
      const t = this.revealTime || []
      if (t[0] === t[1]) return t[0]
      return t[0] + ' 至 ' + t[1]
    },
  },
  created() {
    this.data.btnList.forEach(dateBtnValToTime)
  },
  methods: {
    /* 按钮和日期筛选都会调用 */
    handleDatePicker(value) {
      // console.log('handleDatePicker', value)
      // this.data.btnVal = {}
      const timeRang = this.data.searchTime || []
      const btnTime = (this.data.btnVal && this.data.btnVal.value) || []
      /* 按钮时间 和 日期范围时间不相同的 情况只能是 时间范围在改变
      因为每次按钮赋值都要给 日期范围赋值
      */
      if (timeRang[0] !== btnTime[0] || timeRang[1] !== btnTime[1]) {
        this.data.btnVal = null
      }
      this.revealTime = value
      this.params.data.startDate = value[0].replaceAll('-', '')
      this.params.data.endDate = value[1].replaceAll('-', '')
      this.requestInvoke()
    },
    /* **** 请求 ****  */
    /**
     * @desc 请求调用
     */
    requestInvoke() {
      this.getOverviewTop()
      this.getPropagateOverview()
      this.getMediaProductTop()
      this.getManuscriptDiffuseTop()
      // this.getImportantMediaTransmitTop()
      this.getImportantMediaTransmitTopListAll()
    },
    /**
     * @desc 顶部卡片数据
     */
    async getOverviewTop() {
      const p = {
        ...this.params.data,
        params: {
          infoType: '',
          mediaUnitName: '',
          siteName: '',
        },
      }
      const res = await getOverviewTop(p)
      // console.log('顶部卡片数据', res)
      if (res.Result !== 'OK') return (this.topCardData = [])
      const records = res.Records || []
      this.topCardData = Object.freeze(records)
    },
    /**
     * @desc 人民日报传播概览
     */
    async getPropagateOverview() {
      const res = await getPropagateOverview(this.params.data)
      // console.log('人民日报传播概览', res)
      if (res.Result !== 'OK') return (this.spreadOVerviewData = [])
      const records = res.Records || []
      this.spreadOVerviewData = Object.freeze(records)
    },
    /**
     * @desc 媒体产品传播排行
     */
    async getMediaProductTop() {
      const res = await getMediaProductTop(this.params.data)
      // console.log('媒体产品传播排行', res.Result)
      if (res.Result !== 'OK') return (this.mediaProductRankingData = [])
      const records = res.Records || []
      this.mediaProductRankingData = Object.freeze(records)
    },
    /**
     * @desc 稿件传播排行
     */
    async getManuscriptDiffuseTop(mediaType) {
      // {	"infoType":"1",	"sortField":"LIST_CEI_INDEX",	"siteName":"",	"pageSize":"10",	"page":"1",	"sort":"DESC"}
      mediaType = mediaType || defaultMediaType
      const infoType = this.channelList.find(it => it.value === mediaType).key
      const siteName = infoType === '5' ? '人民日报' : ''
      const param = {
        ...this.params.data,
        // params: { mediaType: mediaType || defaultMediaType },
        params: {
          infoType,
          siteName,
          pageSize: 10,
          page: 1,
          sortField: 'LIST_CEI_INDEX',
          sort: 'DESC',
        },
      }
      const res = await getManuscriptDiffuseTop(param)
      // console.log('稿件传播排行', res)
      if (res.Result !== 'OK') return (this.manuscriptRankingData = [])
      const records = res.Records || []
      this.manuscriptRankingData = Object.freeze(records)
      // this.manuscriptRankingData = records
    },
    /**
     * @desc 重要媒体转载排行top10双环图
     */
    async getImportantMediaTransmitTop() {
      const res = await getImportantMediaTransmitTop(this.params.data)
      // console.log('重要媒体转载排行双环图', res)
      if (res.Result !== 'OK') return (this.ImportantMediaData.chartData = [])
      const records = res.Records || []
      this.ImportantMediaData.chartData = Object.freeze(records)
    },
    /**
     * @desc 重要媒体转载排行top10表格 各个渠道全部获取
     */
    getImportantMediaTransmitTopListAll() {
      // const _getTableData = async (mediaType, item) => {}
      const list = this.ImportantMediaData.allChannelData
      for (let i = 0, len = list.length; i < len; i++) {
        this.getTableData(list[i].value, list[i])
      }
    },
    async getTableData(mediaType, item) {
      item.loading = true
      const param = {
        ...this.params.data,
        params: { mediaType },
      }
      const res = await getImportantMediaTransmitTopList(param)
      if (res.Result !== 'OK') return (item.data = [])
      const records = res.Records || []
      // const cd = { mediaType, data: records }
      // console.log(cd)
      // const cdRes = cacheData('importantReshipRankTable', [cd], (d) => d.find(it => it.mediaType === mediaType))
      // console.log(cdRes)
      item.data = records
      item.loading = false
    },
    /**
     * @desc 重要媒体转载排行top10表格
     */
    async getImportantMediaTransmitTopList(mediaType) {
      this.ImportantMediaData.loading = true
      const param = {
        ...this.params.data,
        // params: { mediaType: mediaType || defaultMediaType },
        params: { mediaType: mediaType || '网站' },
      }
      const res = await getImportantMediaTransmitTopList(param)
      if (res.Result !== 'OK') return (this.ImportantMediaData.tableData = [])
      const records = res.Records || []
      this.ImportantMediaData.tableData = records
      this.ImportantMediaData.loading = false
      // console.log('重要媒体转载排行top10表格', res)
    },
    /* **** 请求结束 ****  */
    /**
     * @desc 稿件传播排行按钮切换
     */
    handleManuscriptRankBtnToggle(d) {
      this.getManuscriptDiffuseTop(d)
    },
    /**
     * @desc 重要媒体转载排行top10表格按钮切换
     */
    handleImBtnToggle(d) {
      // console.log(d)
      this.getImportantMediaTransmitTopList(d)
    },
  },
}
</script>
<style lang="scss" scoped>
@import '@/styles/mixin.scss';
.app-container {
  padding-right: 0;
}
.cbl_bg {
  height: 100%;
  overflow: hidden;
  .cbl_container {
    height: calc(100% - 56px);
    padding: 0 20px 4px 4px;
    overflow-y: auto;
    @include scrollBar;
  }
}

.group_item {
  .underline_num {
    color: #000;
    text-decoration: underline;
  }
}

.result_search {
  .btn-group-time-item + .btn-group-time-item {
    margin-left: 16px;
  }
  .el-date-editor {
    margin-left: 60px;
    // /deep/ .time-range {
    //   width: 250px;
    // }
  }
}
</style>
