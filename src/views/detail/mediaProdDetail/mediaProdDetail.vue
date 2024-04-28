<template>
  <div class="common-detail fs-14">
    <manuscript-detail-header-vue>
      媒体产品传播详情
    </manuscript-detail-header-vue>

    <div class="common-detail__main">
      <!-- <custom-btn-group
        v-model="btnVal"
        :list="btnList"
        :default-active-index="1"
        class="fs-14 mpd-btn-group"
      ></custom-btn-group> -->
      <!-- <div class="placeholder"></div> -->

      <div>
        <media-prod-info-vue
          :date-val.sync="btnVal"
          :card-data="cardData"
        ></media-prod-info-vue>
        <media-prod-card-vue :card-data="cardData"></media-prod-card-vue>
        <media-prod-spread-trend-vue
          :trend-data="mediaProdSpreadTrendData"
        ></media-prod-spread-trend-vue>
        <media-prod-area-and-channel-vue
          v-if="isShow"
          :pie-chart-data="reshipLevelDistrubutionData"
          :channel-data="reshipChannleDistributionData"
        ></media-prod-area-and-channel-vue>
        <media-prod-level-and-manu-rank-vue
          v-if="isShow"
          :area-data="reshipAreaDistributionData"
          :manuscript-data="manuscriptSpreadRankData"
        ></media-prod-level-and-manu-rank-vue>
        <media-prod-manuscript-list-vue
          :loading="manuscriptloading"
          :list="manuscriptList"
          :abstract="manuscriptAbstract"
          :date-range="btnVal && btnVal.value"
          :pagination="manuscriptListPagination"
          @manuscriptList_currentChange="manuscriptList_currentChange"
          @manuscriptList_sizeChange="manuscriptList_sizeChange"
        ></media-prod-manuscript-list-vue>
      </div>
    </div>
  </div>
</template>

<script>
// 组件
import ManuscriptDetailHeaderVue from '@/components/public/manuscriptDetailHeader/ManuscriptDetailHeader.vue'
import CustomBtnGroup from '@/components/CustomBtnGroup/Index.vue'
import MediaProdInfoVue from './components/MediaProdInfo.vue'
import MediaProdCardVue from './components/MediaProdCard.vue'
import MediaProdSpreadTrendVue from './components/MediaProdSpreadTrend.vue'
import MediaProdAreaAndChannelVue from './components/MediaProdAreaAndChannel.vue'
import MediaProdLevelAndManuRankVue from './components/MediaProdLevelAndManuRank.vue'
import MediaProdManuscriptListVue from './components/MediaProdManuscriptList.vue'

// // 工具函数
import { timeFormat } from '@/utils/timeFormat'
// 请求
import {
  // searchCeiToOutServiceModi,
  // getKeyIndex,
  // getUnitMediaReprints,
  // getAllLev,
  getReprintMediaArea,
  getDiffuseMediaType,
  getPropagationTendencyAnalysis,
  // getReprintMediaTop,
  // getExReprintMaualsByGUID,
} from '@/api/spreadDetail/index'
// api请求
import {
  // getOverviewTop,
  // getPropagateOverview,
  // getMediaProductTop,
  getManuscriptDiffuseTop,
  getImportantMediaTransmitTop,
  // getImportantMediaTransmitTopList,
} from '@/api/home'
import { getMediaOverviewTop, getMediaArticleList } from '@/api/mediaProdDetail'
import { getDiffuseTop } from '@/api/channelSpread/index'

export default {
  name: 'mediaProdDetail',
  components: {
    ManuscriptDetailHeaderVue,
    CustomBtnGroup,
    MediaProdInfoVue,
    MediaProdCardVue,
    MediaProdSpreadTrendVue,
    MediaProdAreaAndChannelVue,
    MediaProdLevelAndManuRankVue,
    MediaProdManuscriptListVue,
  },
  data() {
    return {
      // btnList: [
      //   { label: '今天', value: 0 },
      //   { label: '7天', value: 6 },
      //   { label: '30天', value: 30 },
      // ],
      btnVal: null,
      cardData: [], // 卡片数据
      mediaProdSpreadTrendData: [], // 媒体产品传播趋势
      reshipAreaDistributionData: [], // 转载媒体地域分布
      reshipChannleDistributionData: [], // 转载渠道分布
      reshipLevelDistrubutionData: [], // 转载媒体等级分布
      manuscriptSpreadRankData: [], // 稿件传播排行
      /* 发文列表 表格数据 */
      manuscriptloading: false,
      manuscriptListPagination: {
        pageNo: 1,
        pageSize: 10,
        total: 0,
      },
      manuscriptList: {
        data: [],
      },
      /* 发文列表 摘要数据 */
      manuscriptAbstract: {
        data: [],
      },
    }
  },
  computed: {
    channel() {
      // return this.$store.getters.mediaProdDetailParameter.channel
      return this.$route.query.channel
    },
    title() {
      // return this.$store.getters.mediaProdDetailParameter.title
      return this.$route.query.title
    },
    /*
      海外媒体 微博 短视频 只有
      媒体产品传播趋势  发文列表
    */
    isShow() {
      return !['weibo', 'tiktok', 'haiwaimeiti'].includes(this.channel)
    },
    comParamsDate() {
      const val = this.btnVal && this.btnVal.value
      if (Array.isArray(val)) {
        return {
          startDate: val.at(0).replace(/-|\\/g, ''),
          endDate: val.at(1).replace(/-|\\/g, ''),
        }
      } else {
        return { startDate: '', endDate: '' }
      }
    },
    comParams() {
      return {
        ...this.comParamsDate,
        // startDate: '20231201',
        // endDate: '20231231',
        params: {
          mediaName: this.title,
          mediaType: this.channelType[this.channel].value,
        },
      }
    },
    comParams_innerDate() {
      return {
        params: {
          startDate: this.comParams.startDate,
          endDate: this.comParams.endDate,
          ...this.comParams.params,
        },
      }
    },
    // 发文列表的请求参数
    /* comParams_manuscript() {
      return {
        params: {
          pageNo: this.manuscriptListPagination.pageNo,
          pageSize: this.manuscriptListPagination.pageSize,
          startDate: this.comParams.startDate,
          endDate: this.comParams.endDate,
          mediaName: this.title,
          infoType: Reflect.get(this.channelType, this.channel).key,
        },
      }
    }, */
  },
  watch: {
    btnVal(v) {
      // console.log('btnVal', v)
      this.requestInvoke()
    },
  },
  methods: {
    init() {
      // this.btnList.forEach(btn => {
      //   const t1 = timeFormat(
      //     new Date().getTime() - Number(btn.value) * 24 * 60 * 60 * 1000,
      //     true,
      //   )
      //   const t2 = timeFormat(new Date(), true)
      //   btn.value = [t1, t2]
      // })
    },
    /**
     * @desc 获取参数
     * @param { array } specificParams 指定参数
     * 
     * @return { array } 参数
     */
    getParams(specificParams) {
       const params = {
        ...this.comParamsDate,
        params: {
          siteName: this.title, // 指定站点名称，传入此参数查询指定的站点，siteName 为模糊查询
          infoType: this.channelType[this.channel].key,
          // channel: '',
          docChannel: '',
          cycle: this.btnVal.cycle,
          sortField: '',
          sort: '',
          page: 1,
          pageSize: 10,
        },
      }
      specificParams = specificParams || []
      if (!specificParams.length) return params
      const p = {
        ...this.comParamsDate,
        params: {}
      }
      specificParams.forEach(k => {
        p.params[k] = params.params[k] || ''
      })
      return p
    },
    manuscriptList_currentChange(page) {
      // console.log('manuscriptList_currentChange', page)
      this.manuscriptListPagination.pageNo = page
      this.getMediaArticleList()
    },
    manuscriptList_sizeChange(size) {
      // console.log('manuscriptList_sizeChange', size)
      this.manuscriptListPagination.pageSize = size
      this.getMediaArticleList()
    },
    /*manuscriptAbstract_currentChange(page) {
      this.manuscriptListPagination.pageNo = page
      this.getMediaArticleList()
    },
    manuscriptAbstract_sizeChange(size) {
      this.manuscriptListPagination.pageSize = size
      this.getMediaArticleList()
    }, */
    requestInvoke() {
      // this.getMediaOverviewTop()
      this.getDiffuseTop()
      this.getPropagationTendencyAnalysis()
      this.getReprintMediaArea()
      this.getDiffuseMediaType()
      this.getImportantMediaTransmitTop()
      this.getManuscriptDiffuseTop()
      this.getMediaArticleList()
    },
    /* 卡片数据 (deprecated) 弃用*/
    async getMediaOverviewTop() {
      const res = await getMediaOverviewTop(this.comParams_innerDate)
      // console.log('卡片数据', res)
      if (res.Result !== 'OK') return (this.cardData = [])
      const records = res.Records || []
      this.cardData = Object.freeze(records)
    },
    /* 卡片数据  */
    async getDiffuseTop() {
      const res = await getDiffuseTop(this.getParams())
      // console.log('getDiffuseTop', res)
      if (res.Result !== 'OK') return (this.cardData = [])
      const records = res.Records || []
      this.cardData = Object.freeze(records)
    },
    /* 媒体产品传播趋势 */
    async getPropagationTendencyAnalysis() {
      const params = this.getParams(['siteName', 'infoType', 'zbGuid'])
      if (this.btnVal.cycle === 'day') {
        params.startDate = timeFormat(new Date().getTime() - 7 * 24 * 60 * 60 * 1000)
      }
      const res = await getPropagationTendencyAnalysis(params)
      // console.log('媒体产品传播趋势', res)
      if (res.Result !== 'OK') return (this.mediaProdSpreadTrendData = [])
      const records = res.Records || []
      this.mediaProdSpreadTrendData = Object.freeze(records)
    },
    /* 转载媒体地域分布 */
    async getReprintMediaArea() {
      const res = await getReprintMediaArea(this.comParams_innerDate)
      // console.log('转载媒体地域分布', res)
      if (res.Result !== 'OK') return (this.reshipAreaDistributionData = [])
      const records = (res.Records || []).filter(it => it.area !== '其他')
      this.reshipAreaDistributionData = Object.freeze(records.slice(0, 10))
    },
    /* 转载渠道分布 */
    async getDiffuseMediaType() {
      const res = await getDiffuseMediaType(this.comParams_innerDate)
      // console.log('转载渠道分布', res)
      if (res.Result !== 'OK') return (this.reshipChannleDistributionData = [])
      const records = res.Records || []
      this.reshipChannleDistributionData = Object.freeze(records)
    },
    /* 转载媒体等级分布 */
    async getImportantMediaTransmitTop() {
      const res = await getImportantMediaTransmitTop(this.comParams)
      // console.log('转载媒体等级分布', res)
      if (res.Result !== 'OK') return (this.reshipLevelDistrubutionData = [])
      const records = res.Records || []
      this.reshipLevelDistrubutionData = Object.freeze(records)
    },
    /* 稿件传播排行 */
    async getManuscriptDiffuseTop() {
      // const res = await getManuscriptDiffuseTop(this.comParams)
      const params = this.getParams(['siteName', 'infoType', 'pageSize', 'page'])
      params.params.sort = 'DESC'
      params.params.sortField = 'LIST_CEI_INDEX'
      const res = await getManuscriptDiffuseTop(params)
      // console.log('稿件传播排行', res)
      if (res.Result !== 'OK') return (this.manuscriptSpreadRankData = [])
      const records = res.Records || []
      this.manuscriptSpreadRankData = Object.freeze(records)
    },
    /* 发文列表 */
    async getMediaArticleList() {
      this.manuscriptloading = true
      const params = this.getParams(['siteName', 'infoType', 'pageSize', 'page', 'sort', 'sortField'])
      params.params.page = this.manuscriptListPagination.pageNo
      params.params.pageSize = this.manuscriptListPagination.pageSize
      // params.params.sort = 'DESC'
      // params.params.sortField = 'LIST_CEI_INDEX'
      const res = await getMediaArticleList(params)
      // console.log('发文列表', res)
      if (res.Result !== 'OK') {
        this.manuscriptAbstract.data = []
        this.manuscriptList.data = []
        this.manuscriptListPagination.total = 0
        return
      }
      const records = res.Records || []
      // records[3].pictures += ',' + records[3].pictures
      // records[3].pictures += ',' + records[3].pictures
      this.manuscriptAbstract.data = Object.freeze(records)
      this.manuscriptList.data = Object.freeze(records)
      this.manuscriptListPagination.total = res.TotalRecordCount || 0
      this.manuscriptloading = false
    },
  },
  mounted() {
    this.init()
  },
}
</script>

<style lang="scss" scoped>
.common-detail {
  // .placeholder {
  //   height: 60px;
  // }

  .mpd-btn-group {
    // position: fixed;
    left: 0;
    right: 0;
    margin: 20px;
    background-color: #fff;
    // border-bottom: 2px solid #dcdcdc;
  }
}
</style>
