<template>
  <div class="app-container">
    <div class="spread-shadow channel-spread-detail list-height">
      <!-- 渠道切换 -->
      <div class="csd-tabs">
        <custom-tabs-vue
          v-model="tabActiveName"
          :tabs="comTabList"
        ></custom-tabs-vue>
      </div>

      <div class="csd-content">
        <!-- 过滤参数 -->
        <csd-filter-parameter-vue
          v-model="filterParams"
          :channel="tabActiveName"
          @form-submit="handleFormSubmit"
          @request-table-export="handleRequestTableExport"
        ></csd-filter-parameter-vue>

        <!-- 渠道二级切换 -->
        <div
          v-if="comTabSubList && comTabSubList.length"
          class="channel-sub-platform"
        >
          <div class="csp-box">
            <div
              v-for="(subTab, i) of comTabSubList"
              :key="i"
              @click="handleSubTabClick(subTab)"
              :class="[subTab.symbol === tabSubActiveName && 'active']"
              class="csp-item fs-14 pointer"
            >
              {{ subTab.zh }}
            </div>
          </div>
        </div>

        <!-- 列表展示 -->
        <div class="list-wrappper">
          <csd-channel-list-vue
            v-if="showChannelList"
            :channel="tabActiveName"
            :sub-channel="tabSubActiveName"
            :filter-params="filterParams"
            :table-loading="tableLoading"
            :newspaper-table-data="newspaperTableData"
            :article-table-data="articleTableData"
            :pagination-newspaper="newspaperPagination"
            :pagination-article="articlePagination"
            @request-table-data="handleRequestTableData"
          ></csd-channel-list-vue>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import CsdFilterParameterVue from './components/CsdFilterParameter.vue'
import CsdChannelListVue from './components/CsdChannelList.vue'
import { timeFormat } from '@/utils/timeFormat'
import { exportToExcel } from '@/utils/index'
import { tabList, tabSubList } from './data'
// qpi
import {
  getDiffuseTop,
  exportDiffuseTop,
  getDiffuseDocTop,
  exportDiffuseDocTop,
} from '@/api/channelSpread/index'

/* 组件 mounted 的数据请求在  CsdFilterParameterVue 组件中*/
export default {
  name: 'ChannelSpreadDetail',
  components: {
    CsdFilterParameterVue,
    CsdChannelListVue,
  },
  data() {
    return {
      isinit: false,
      tabActiveName: '',
      tabSubActiveName: '',
      tabList: Object.freeze(tabList),
      tabSubList,
      dateRank: '',
      filterParams: {
        cycle: 0, // 周期（day=按天排行，week=按周排行，month=按月排行，quarter=按季排行，year=按年排行）
        date: '',
        productType: '', // 产品分类
        searchWord: '', // 媒体名称
      },
      /*
        startDate：发布开始时间
        endDate：发布结束时间
        productType：产品分类
        searchWord：媒体名称
        infoType：媒体渠道（7=APP，19=视频号，18=订阅号，4=微博，8=微信，5=报纸，1=网站）
        channel：渠道（(抖音，快手，B站 (对应视频号))，强国号，头条号、百家号(对应订阅号)等）
        cycle：周期（day=按天排行，week=按周排行，month=按月排行，quarter=按季排行，year=按年排行）
        unitName：媒体单位名称
        sortField：排序字段
        sort：desc=倒序，asc=正序
      */
      params: {
        startDate: '',
        endDate: '',
        // productType: '',
        searchWord: '',
        siteName: '',
        infoType: '',
        // channel: '',
        docChannel: '',
        cycle: '',
        // unitName: '',
        sortField: '',
        sort: '',
        page: 1,
        pageSize: 10,
      },
      showChannelList: true,
      tableLoading: false,

      newspaperTableData: [],
      newspaperPagination: {
        pageIndex: 1,
        pageSize: 10,
        total: 0,
      },

      articleTableData: [],
      articlePagination: {
        pageIndex: 1,
        pageSize: 10,
        total: 0,
      },
    }
  },
  computed: {
    comTabList() {
      const arr = []
      this.tabList.forEach(it => {
        arr.push({
          label: it.zh,
          value: it.symbol,
        })
      })
      return arr
    },
    comTabSubList() {
      const n = this.tabActiveName
      const v = this.tabSubList.find(t => t.symbol === n)
      if (v == undefined) return []
      const d = v.children
      return d
    },
  },
  watch: {
    /* 二级渠道改变时，默认选中第一项 */
    comTabSubList(v) {
      if (Array.isArray(v) && v.length) {
        this.handleSubTabClick(v.at(0))
      }
    },
    async tabActiveName(symbol) {
      this.$router.push({
        name: `channelSpreadDetail_${symbol}`,
        query: { symbol },
      })
      // 阻止重复请求
      // if (!this.isinit) return
      // 有二级菜单不进行请求，定位到二级菜单时，监听的二级会进行请求
      // if (['tiktok', 'dingyuhao'].includes(v)) {
      //   return
      // }
      // this.showChannelList = false
      // await this.$nextTick()
      // this.showChannelList = true
      // this.resetPaination()
      // this.setRequestParameter({ reqType: '报纸' })
      // this.requestInovke()
    },
    async tabSubActiveName(v) {
      if (!this.isinit) return
      this.showChannelList = false
      this.resetPaination()
      await this.$nextTick()
      this.showChannelList = true
      this.setRequestParameter({ reqType: '报纸' })
      this.requestInovke()
    },
  },
  methods: {
    init() {
      // console.log(this.$route)
      this.tabActiveName = this.$route.query.symbol
    },
    /* 渠道二级切换点击 */
    handleSubTabClick(subTab) {
      // console.log('handleSubTabClick', subTab)
      if (this.tabSubActiveName === subTab.symbol) return
      this.tabSubActiveName = subTab.symbol
    },
    /**
     * @desc 设置请求参数 => 媒体产品和文章两个表格是同样的入参
     * @param { object } p 传递的参数
     */
    setRequestParameter(p = {}) {
      // console.log('p', p, { ...this.params })
      const currSubTab = this.comTabSubList.find(
        t => t.symbol === this.tabSubActiveName,
      )
      const channel = currSubTab != undefined ? currSubTab.zh : ''

      const infoType = this.tabActiveName
        ? this.channelType[this.tabActiveName].key
        : ''

      this.params.channel = channel
      this.params.infoType = infoType
      this.params = Object.assign({}, this.params, p)
    },
    /**
     * @desc 分页重置
     *
     */
    resetPaination() {
      this.params.page = this.newspaperPagination.pageIndex = this.articlePagination.pageIndex = 1
    },

    /**
     * @desc 表单提交：过滤参数更改触发
     */
    async handleFormSubmit(p) {
      this.resetPaination()
      await this.$nextTick()
      this.setRequestParameter(p)
      this.requestInovke()
    },
    /**
     * @desc 监听列表的请求事件
     */
    handleRequestTableData(p) {
      this.setRequestParameter(p)
      this.requestInovke()
    },
    /**
     * @desc 监听列表的导出事件
     */
    handleRequestTableExport() {
      this.handleExport()
    },

    paramsConvert() {
      const p = JSON.parse(JSON.stringify(this.params))
      const _p = {
        startDate: p.startDate,
        endDate: p.endDate,
        params: p,
        searchWord: p.searchWord,
      }
      delete _p.params.startDate
      delete _p.params.endDate
      delete _p.params.searchWord
      delete _p.params.reqType
      delete _p.reqType
      return _p
    },

    /* ***  请求开始 *** */
    requestInovke() {
      const reqType = this.params.reqType
      switch (reqType) {
        case '报纸':
          this.getDiffuseTop()
          break
        case '文章':
          this.getDiffuseDocTop()
          break
        default:
          this.getDiffuseTop()
      }
    },

    handleExport() {
      const reqType = this.params.reqType
      switch (reqType) {
        case '报纸':
          this.exportDiffuseTop()
          break
        case '文章':
          this.exportDiffuseDocTop()
          break
        default:
          this.exportDiffuseTop()
      }
    },

    /* 报纸表格数据 */
    async getDiffuseTop() {
      this.tableLoading = true
      this.newspaperTableData = []
      const params = this.paramsConvert()
      const res = await getDiffuseTop(params)
      if (res.Result !== 'OK') {
        this.newspaperTableData = []
        this.newspaperPagination.total = 0
        this.tableLoading = false
        return
      }
      // console.log('报纸表格数据', res)
      const records = res.Records || []
      this.newspaperTableData = Object.freeze(records)
      this.newspaperPagination.total = res.TotalRecordCount || 0
      this.tableLoading = false
    },
    /* 报纸导出 */
    async exportDiffuseTop() {
      const p = this.paramsConvert()
      delete p.params.page
      delete p.params.pageSize
      const res = await exportDiffuseTop(p)
      exportToExcel(res)
    },

    /* 文章表格数据 */
    async getDiffuseDocTop() {
      this.tableLoading = true
      this.articleTableData = []

      const res = await getDiffuseDocTop(this.paramsConvert())
      if (res.Result !== 'OK') {
        this.articleTableData = []
        this.articlePagination.total = 0
        this.tableLoading = false
        return
      }
      // console.log('文章表格数据', res)
      const records = res.Records || []
      this.articleTableData = Object.freeze(
        records.map(r => {
          /* 所有稿件列表，除了报纸渠道之外，稿件发布时间都要显示到时分秒，两行显示 */
          if (this.tabActiveName === 'newspaper') {
            r.pubTime = timeFormat(r.pubTime, 'yy-mm-dd')
          } else {
            r.pubTime = r.pubTime.replace(/\//g, '-')
          }
          return r
        }),
      )
      this.articlePagination.total = res.TotalRecordCount || 0
      this.tableLoading = false
    },
    /* 文章表格导出 */
    async exportDiffuseDocTop() {
      const p = this.paramsConvert()
      delete p.params.page
      delete p.params.pageSize
      const res = await exportDiffuseDocTop(p)
      exportToExcel(res)
    },
  },
  created() {
    this.init()
  },
  mounted() {
    this.$nextTick(() => (this.isinit = true))
  },
}
</script>

<style lang="scss" scoped>
@import '@/styles/mixin.scss';
.channel-spread-detail {
  // height: 94%;
  display: flex;
  flex-direction: column;
  // padding-bottom: 1.25rem;
  .csd-tabs {
    flex-shrink: 0;
  }

  .csd-content {
    flex-grow: 1;
    overflow: auto;
    @include scrollBar;
  }

  .channel-sub-platform {
    padding: 0.1rem 0.3rem 0;
    // line-height: 0;
    background-color: #f5f5f5;
    border-bottom: 1px solid var(--main-border-color);
    .csp-box {
      display: flex;
      align-items: center;
    }
    .csp-item {
      width: 1.175rem;
      height: 0.4rem;
      padding-left: 0.2rem;
      line-height: 0.4rem;
    }
    .csp-item.active {
      color: #fff;
      background: url('~@/assets/imgs/channelSpread/list/rounded_rect.png') no-repeat center/100%;
    }
  }

  .list-wrappper {
    position: relative;
    // flex-grow: 1;
    // overflow: auto;
    /* ::v-deep .csd-newspaper-list {
      display: flex;
      flex-direction: column;
      height: 100%;
      padding-bottom: 1rem;
    } */
    ::v-deep .csd-table__wrap {
      // flex-grow: 1;
      line-height: 0;
      padding: 0.2rem 0.3rem;
      overflow: hidden;
      /* .csd-table {
        height: calc(100% - 50px);
      } */
      .date-show {
        color: #898989;
      }
    }
    ::v-deep.ms-pagination {
      // position: absolute;
      // left: 0;
      // right: 0;
      // bottom: 0.5rem;
      padding: 0.25rem;
    }
    ::v-deep.ms-table {
      padding: 0 0.25rem;
    }
  }
}
</style>
