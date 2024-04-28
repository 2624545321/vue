<template>
  <div class="common-detail fs-14">
    <manuscript-detail-header-vue></manuscript-detail-header-vue>

    <div class="common-detail__main">
      <!-- 稿件标题 -->
      <os-title-vue :detail="articleDetail"></os-title-vue>
      <!-- 关键指标 -->
      <os-key-index-vue :ki-data="keyIndex" :info-type="infoType"></os-key-index-vue>
      <!-- 内部媒体刊发 -->
      <os-inside-media-publish-vue
        :im-data="insideMediaPublishData"
      ></os-inside-media-publish-vue>
      <!-- 外部媒体转载 -->
      <os-out-media-reship-vue
        :om-data="outsideMediaReshipData"
      ></os-out-media-reship-vue>
      <!-- 转载地域分布 传播渠道分布 -->
      <os-area-and-channel-vue
        :area-data="areaData"
        :channel-data="spreadChannelData"
      ></os-area-and-channel-vue>
      <!-- 转载趋势分析 转载媒体排行 -->
      <os-trend-and-media-rank-vue
        :trend-data="reshipTrendData"
        :media-rank-data="reshipMediaRankData"
        :time-list="timeList"
      ></os-trend-and-media-rank-vue>
      <!-- 传播路径分析 -->
      <os-spread-path-vue :sp-data="spreadPathData"></os-spread-path-vue>
    </div>
  </div>
</template>

<script>
import ManuscriptDetailHeaderVue from '@/components/public/manuscriptDetailHeader/ManuscriptDetailHeader.vue'
import OsTitleVue from './components/OsTitle.vue'
import OsKeyIndexVue from './components/OsKeyIndex.vue'
import OsOutMediaReshipVue from './components/OsOutMediaReship.vue'
import OsInsideMediaPublishVue from './components/OsInsideMediaPublish.vue'
import OsAreaAndChannelVue from './components/OsAreaAndChannel.vue'
import OsTrendAndMediaRankVue from './components/OsTrendAndMediaRank.vue'
import OsSpreadPathVue from './components/OsSpreadPath.vue'
import { timeFormat } from '@/utils/timeFormat'
// 请求
import {
  // searchCeiToOutServiceModi,
  getKeyIndex,
  getUnitMediaReprints,
  getAllLev,
  getReprintMediaArea,
  getDiffuseMediaType,
  getPropagationTendencyAnalysisDoc,
  getReprintMediaTop,
  getExReprintMaualsByGUID,
} from '@/api/spreadDetail/index'

export default {
  name: 'SpreadDetail',
  components: {
    ManuscriptDetailHeaderVue,
    OsTitleVue,
    OsKeyIndexVue,
    OsInsideMediaPublishVue,
    OsOutMediaReshipVue,
    OsAreaAndChannelVue,
    OsTrendAndMediaRankVue,
    OsSpreadPathVue,
  },
  data: () => ({
    /* 请求参数 */
    params: {
      // startDate: timeFormat(new Date().getTime() - 7 * 24 * 60 * 60 * 1000),
      // endDate: timeFormat(new Date()),
      startDate: '',
      endDate: '',
      params: {
        zbGuid: '', // 稿件id
      },
    },
    timeList: [], // 时间列表，发布时间开始到后6天
    articleDetail: {}, // 文章详情
    keyIndex: [], // 关键指标
    insideMediaPublishData: [], // 内部媒体刊发
    outsideMediaReshipData: [], // 外部媒体转载
    areaData: [], // 转载媒体地域分布
    spreadChannelData: [], // 传播渠道分布
    reshipTrendData: [], // 转载趋势分析
    reshipMediaRankData: [], // 转载媒体排行
    spreadPathData: [], // 传播路径分析
  }),
  computed: {
    // 只有id的参数（有的接口不需要时间参数）
    params_onlyId() {
      return { params: this.params.params }
    },
    channel() {
      return this.$route.query.channel
    },
    infoType() {
      const infoType = this.articleDetail && this.articleDetail.infoType
      const currentChannel = this.channelType[this.channel] || {}
      return currentChannel.key || infoType
    },
  },
  watch: {
    articleDetail(v) {
      if (!v) return
      this.setTimeList(v.pubTime)
      this.params.startDate = this.timeList[0]
      this.params.endDate = this.timeList[this.timeList.length - 1]
      this.requestInvokeWithTime()
    },
  },
  methods: {
    setTimeList(time) {
      if (!time) return
      const today = this.$moment(new Date())

      for (let index = 0; index < 7; index++) {
        const _cTime = this.$moment(time).add(index, 'days')
        this.timeList.push(_cTime.format('YYYYMMDD'))
        if (today.isSame(_cTime, 'day')) return
      }
    },

    /* *** 请求逻辑开始 先请求发布时间，根据发布时间后七天去请求数据 *** */
    requestInvoke() {
      // this.searchCeiToOutServiceModi()
      this.getKeyIndex()
      this.getUnitMediaReprints()
      this.getAllLev()
      this.getReprintMediaArea()
      this.getDiffuseMediaType()
      this.getExReprintMaualsByGUID()
    },

    // 需要时间参数的请求
    requestInvokeWithTime() {
      this.getPropagationTendencyAnalysisDoc()
      this.getReprintMediaTop()
    },

    /**
     * @desc 稿件标题信息
     */
    /* async searchCeiToOutServiceModi() {
      const p = {
        method: 'getArticleDetail',
        zbGuid: this.params_onlyId.params.zbGuid,
      }
      const res = await searchCeiToOutServiceModi(p)
      // console.log('searchCeiToOutServiceModi', res)
      const records = res.detail && res.detail.Records
      if (!records) return
      const detail = records.at(0).data.at(0)
      // this.articleDetail = Object.freeze(detail)
    }, */
    /**
     * @desc 关键指标
     */
    async getKeyIndex() {
      const p = {
        params: { zbGuid: this.params_onlyId.params.zbGuid },
      }
      const res = await getKeyIndex(p)
      // console.log('getKeyIndex', res)
      if (res.Result !== 'OK') return (this.keyIndex = [])
      const records = res.Records || []
      this.keyIndex = Object.freeze(records)
      this.articleDetail = Object.freeze(records[0] || {})
    },
    /**
     * @desc 内部媒体刊发
     */
    async getUnitMediaReprints() {
      const p = {
        pageNo: 1,
        pageSize: 50,
        zbGuid: this.params_onlyId.params.zbGuid,
        // zbGuid: '1327809209509099730',
      }
      const res = await getUnitMediaReprints(p)
      // console.log('内部媒体刊发', res)
      // window.open(res)
      if (res.Result !== 'OK') return (this.insideMediaPublishData = [])
      const records = res.Records || []
      this.insideMediaPublishData = Object.freeze(records)
    },
    /**
     * @desc 外部媒体转载
     */
    async getAllLev() {
      const p = {
        zbGuid: this.params_onlyId.params.zbGuid,
        // zbGuid: '1327809209509099730',
      }
      const res = await getAllLev(p)
      // console.log('外部媒体转载', res)
      if (!res.data) return (this.outsideMediaReshipData = [])
      this.outsideMediaReshipData = Object.freeze(res.data)
    },

    /**
     * @desc 转载媒体地域分布
     */
    async getReprintMediaArea() {
      const p = {
        params: { zbGuid: this.params_onlyId.params.zbGuid },
      }
      const res = await getReprintMediaArea(p)
      // console.log('转载媒体地域分布', res)
      if (res.Result !== 'OK') return (this.areaData = [])
      const records = (res.Records || []).filter(it => it.area !== '其他')
      this.areaData = Object.freeze(records.slice(0, 10))
    },
    /**
     * @desc 转载趋势分析
     */
    async getPropagationTendencyAnalysisDoc() {
      const p = {
        ...this.params,
      }
      // p.params.infoType = this.infoType
      const res = await getPropagationTendencyAnalysisDoc(p)
      // console.log('转载趋势分析', res)
      if (res.Result !== 'OK') return (this.reshipTrendData = [])
      const records = res.Records || []
      this.reshipTrendData = records
      // this.reshipTrendData = Object.freeze(records.map(t => {
      //   t.count = parseInt(Math.random()*100 + 20)
      //   return t
      // }))
    },
    /**
     * @desc 转载媒体排行
     */
    async getReprintMediaTop() {
      const par = window.structuredClone(this.params)
      const p = {
        zbGuid: this.params_onlyId.params.zbGuid,
      }
      par.params = p
      const res = await getReprintMediaTop(par)
      // console.log('转载媒体排行', res)
      if (res.Result !== 'OK') return (this.reshipMediaRankData = [])
      const records = res.Records || []
      this.reshipMediaRankData = Object.freeze(records)
      // this.reshipMediaRankData = Object.freeze(records.map(t => {
      //   t.count = parseInt(Math.random()*100 + 20)
      //   return t
      // }))
    },
    /**
     * @desc 传播渠道分析
     */
    async getDiffuseMediaType() {
      const res = await getDiffuseMediaType(this.params_onlyId)
      // console.log('传播渠道分析', res)
      if (res.Result !== 'OK') return (this.spreadChannelData = [])
      const records = res.Records || []
      this.spreadChannelData = Object.freeze(records)
    },
    /**
     * @desc 传播路径分析
     */
    async getExReprintMaualsByGUID() {
      const p = {
        zbGuid: this.params_onlyId.params.zbGuid,
        mc: this.$route.query.mc,
      }
      const res = await getExReprintMaualsByGUID(p)
      // console.log('传播路径分析', res)
      this.spreadPathData = Object.freeze(res)
    },
    /* *** 请求逻辑结束 *** */
  },
  created() {
    this.params.params.zbGuid = this.$route.query.zbGuid || 'unknow'
  },
  mounted() {
    this.requestInvoke()
    // setTimeout(() => {
    //   this.reshipTrendData = []
    // }, 1000 * 3)
  },
}
</script>
<style></style>
