<template>
  <!-- 纸媒榜单 -->
  <div class="csd-newspaper-list">
    <div class="csd-table__wrap">
      <div class="btn-group">
        <custom-button-vue
          :btn-data="comBtnData.at(0)"
          :class="activeList === '报纸' && 'active'"
          @click.native="handleTableDataToggle('报纸')"
        ></custom-button-vue>
        <custom-button-vue
          :btn-data="comBtnData.at(1)"
          :class="activeList === '文章' && 'active'"
          @click.native="handleTableDataToggle('文章')"
        ></custom-button-vue>
        <span v-show="comDateShow" class="date-show fs-14">
          {{ comDateShow }}
        </span>
      </div>

      <div v-show="activeList === '报纸'" class="csd-table">
        <custom-eLe-table-vue
          class="customStyle-ele__table customStyle-ele__table-list customStyle-ele__table-sort no-border"
          stripe
          style="width: 100%; min-height: 60vh"
          :loading="tableLoading"
          :data="newspaperTableData"
          :columns="comTableColumn.mediaProd"
          :default-sort="{ prop: 'listCeiIndex', order: 'descending' }"
        >
          <template #index="{ $index }">
            {{ $index + 1 + (newspaperPagination.pageIndex - 1) * 10 }}
          </template>

          <template #siteName="scope">
            <custom-manuscript-title-vue
              :title="scope.row.siteName | strEscapeTags | strRemoveHtmlEntity"
              :custom-skip="goMediaProdDetail"
            ></custom-manuscript-title-vue>
          </template>
        </custom-eLe-table-vue>
      </div>
      <div v-show="activeList === '文章'" class="csd-table">
        <custom-eLe-table-vue
          class="customStyle-ele__table customStyle-ele__table-list customStyle-ele__table-sort no-border"
          stripe
          style="width: 100%; min-height: 60vh"
          :loading="tableLoading"
          :data="articleTableData"
          :columns="comTableColumn.article"
          :default-sort="{ prop: 'listCeiIndex', order: 'descending' }"
        >
          <template #index="{ $index }">
            {{ $index + 1 + (articlePagination.pageIndex - 1) * 10 }}
          </template>

          <template #title="scope">
            <custom-manuscript-title-vue
              :title="scope.row.title | strEscapeTags | strRemoveHtmlEntity"
              :query-param="{
                zbGuid: scope.row.zbGuid,
                mc: scope.row.siteName,
                channel
              }"
            ></custom-manuscript-title-vue>
          </template>

          <template #pubTime="{ row }">
            <p class="text-center">{{ row.pubTime.slice(0, 10) }}</p>
            <p class="text-center">{{ row.pubTime.slice(10) }}</p>
          </template>
        </custom-eLe-table-vue>
      </div>
    </div>
    <div class="ms-pagination">
      <custom-pagination-vue
        v-show="activeList === '报纸'"
        :page-no="newspaperPagination.pageIndex"
        :page-size="newspaperPagination.pageSize"
        :total="newspaperPagination.total"
        @handleCurrentChange="handleCurrentChange_newspaper"
        @handleSizeChange="handleSizeChange_newspaper"
      ></custom-pagination-vue>

      <custom-pagination-vue
        v-show="activeList === '文章'"
        :page-no="articlePagination.pageIndex"
        :page-size="articlePagination.pageSize"
        :total="articlePagination.total"
        @handleCurrentChange="handleCurrentChange_article"
        @handleSizeChange="handleSizeChange_article"
      ></custom-pagination-vue>
    </div>
  </div>
</template>

<script>
import CustomELeTableVue from '@/components/CustomELeTable/CustomELeTable.vue'
import {
  newspaperTableColumns,
  newspaperAacticleTableColumns as articleTableColumns,
  columnMap,
} from '../tableColumn/data'

export default {
  name: 'CsdNewspapeList',
  components: { CustomELeTableVue },
  props: {
    // 渠道
    channel: {
      type: String,
      required: true,
    },
    // 二级渠道
    subChannel: {
      type: String,
      required: true,
    },
    // 过滤参数
    filterParams: {
      type: Object,
      required: true,
    },
    // 表格数据 => 报纸
    newspaperTableData: {
      type: Array,
      default: () => [],
    },
    // 表格数据 => 文章
    articleTableData: {
      type: Array,
      default: () => [],
    },
    // 表格是否加载
    tableLoading: {
      type: Boolean,
      default: false,
    },
    paginationNewspaper: {
      type: Object,
    },
    paginationArticle: {
      type: Object,
    },
  },
  data() {
    return {
      /* 报纸为 第一个按钮 文章为 第二个按钮 */
      activeList: '报纸',
      mockTableData: [],

      newspaperTableDataLoading: false,
      newspaperTableColumns,
      newspaperPagination: {
        pageIndex: 1,
        pageSize: 10,
        total: 0,
      },

      articleTableColumns,
      articleTableDataLoading: false,
      articlePagination: {
        pageIndex: 1,
        pageSize: 10,
        total: 0,
      },
    }
  },
  computed: {
    comBtnData() {
      return [this.channelType[this.channel], { label: '文章' }]
    },
    comDateShow() {
      if (!this.filterParams.date) return false
      return this.filterParams.date + ' 榜单'
    },
    comTableColumn() {
      // this.newspaperTableDataLoading = true
      if (!this.channel) return { mediaProd: [], article: [] }
      const { mediaProd, article } = columnMap.get(this.channel)
      /*两种情况
        数组：默认只有一级
        对象，有二级 tab
      */
      if (Array.isArray(mediaProd)) {
        return { mediaProd, article }
      } else if (typeof mediaProd === 'object' && mediaProd != null) {
        const subChannel = this.subChannel
        return { mediaProd: mediaProd[subChannel], article }
      } else {
        throw Error(
          'expect to get data from custom cloumn, but got ' + mediaProd,
        )
      }
      // setTimeout(() => this.newspaperTableDataLoading = false, 500)
    },
    /* 报纸的请求参数 */
    comNewspaperParameter() {
      return {
        reqType: '报纸',
        page: this.newspaperPagination.pageIndex,
        pageSize: this.newspaperPagination.pageSize,
      }
    },
    /* 文章的请求参数 */
    comArticleParameter() {
      return {
        reqType: '文章',
        page: this.articlePagination.pageIndex,
        pageSize: this.articlePagination.pageSize,
      }
    },
  },
  watch: {
    paginationNewspaper: {
      handler(v) {
        // console.log('paginationNewspaper', v)
        // console.log('this.newspaperPagination', this.newspaperPagination)
        if (this.newspaperPagination.total !== v.total) {
          this.newspaperPagination.total = v.total
        }
        if (this.newspaperPagination.pageIndex !== v.pageIndex) {
          this.newspaperPagination.pageIndex = v.pageIndex
        }
      },
      deep: true,
    },
    paginationArticle: {
      handler(v) {
        if (this.articlePagination.total !== v.total) {
          this.articlePagination.total = v.total
        }
        if (this.articlePagination.pageIndex !== v.pageIndex) {
          this.articlePagination.pageIndex = v.pageIndex
        }
      },
      deep: true,
    },
  },
  methods: {
    init() {
      // this.mockData()
    },
    mockData() {
      const n = 10
      while (this.mockTableData.length < n) {
        this.mockTableData.push({
          title: '我国正式邀请',
          siteName: '人民日报',
          channel: '要闻',
          publishDate: '2023-11-12',
          newsPaper: parseInt(Math.random() * 100 + 500),
          webSite: parseInt(Math.random() * 100 + 500),
          APP: parseInt(Math.random() * 100 + 500),
          weiXin: parseInt(Math.random() * 100 + 500),
          weiBo: parseInt(Math.random() * 100 + 500),
          dingyuehao: parseInt(Math.random() * 100 + 500),
          coreHeadline: parseInt(Math.random() * 100 + 500),
          reprintCount: parseInt(Math.random() * 100 + 500), // 总转载
          influence: parseInt(Math.random() * 100 + 500), // 影响力指数
        })
      }
      this.mockTableData = this.mockTableData.slice(0, n)
    },

    handleTableDataToggle(k) {
      if (this.activeList === k) return
      this.activeList = k
      this.newspaperPagination.pageIndex = 1
      this.articlePagination.pageIndex = 1
      this.emitRequest()
    },
    goMediaProdDetail(title) {
      const params = { channel: this.channel, title }
      this.$store.commit('globalParameter/SET_mediaProdParameter', params)
      const path = this.$router.resolve({
        name: 'mediaProdDetail',
        params,
        query: params,
      })
      window.open(path.href, '_blank')
    },
    /* 报纸的分页 */
    handleCurrentChange_newspaper(page) {
      this.newspaperPagination.pageIndex = page
      this.emitRequest()
    },
    handleSizeChange_newspaper(size) {
      this.newspaperPagination.pageSize = size
      this.emitRequest()
    },
    /* 文章的分页 */
    handleCurrentChange_article(page) {
      this.articlePagination.pageIndex = page
      this.emitRequest()
    },
    handleSizeChange_article(size) {
      this.articlePagination.pageSize = size
      this.emitRequest()
    },

    /* ---- 数据请求 ----  */
    emitRequest() {
      let params = null
      switch (this.activeList) {
        case '报纸':
          params = this.comNewspaperParameter
          break
        case '文章':
          params = this.comArticleParameter
          break
      }
      this.$emit('request-table-data', params)
    },
  },
  mounted() {
    this.init()
  },
}
</script>

<style lang="scss" scoped>
// .csd-table__wrap {
//   .date-show {
//     color: #898989;
//   }
// }

// .ms-pagination {
//   position: absolute;
//   left: 0;
//   right: 0;
//   bottom: 0.5rem;
// }

// .ms-table,
// .ms-pagination {
//   padding: 0 0.25rem;
// }
</style>
