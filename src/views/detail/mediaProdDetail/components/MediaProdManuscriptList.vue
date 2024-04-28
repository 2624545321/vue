<template>
  <div class="media-prod-manuscript-list mt-20 spread-shadow relative">
    <spread-title-vue title="发文列表">
      <span v-show="dateReveal" class="reveal-time fs-14">
        {{ dateReveal }}
      </span>

      <div v-if="revealModeToggleBtn" class="ml-title__btn">
        <el-checkbox v-model="original" class="only-reveal-original">
          仅显示原创
        </el-checkbox>

        <btn-table-and-abstract-mode
          v-model="mode"
        ></btn-table-and-abstract-mode>
        <btn-custom-columns-vue
          :style="{ visibility: showTable ? 'visible' : 'hidden' }"
          @confirm="handleCustomColumnsConfirm"
          :data="comTableCustomColumns"
        ></btn-custom-columns-vue>
      </div>
    </spread-title-vue>

    <div v-loading="loading" class="mpl-wrap">
      <manuscript-list-table-vue
        v-if="renderTable"
        v-show="showTable"
        :columns="tableColumns"
        :data="tableData"
      ></manuscript-list-table-vue>
      <manuscript-list-abstract-vue
        v-show="showAbstract"
        :reveal-image="abstractRevealImage"
        :data="abstract.data"
      ></manuscript-list-abstract-vue>
    </div>

    <custom-pagination-vue
      class="custom-pagination"
      :page-no="page.pageIndex"
      :page-size="page.pageSize"
      :total="page.total"
      @handleCurrentChange="handleCurrentChange"
      @handleSizeChange="handleSizeChange"
    ></custom-pagination-vue>
  </div>
</template>

<script>
import BtnTableAndAbstractMode from '@/components/public/btn_tableAndAbstractMode/BtnTableAndAbstractMode.vue'
import BtnCustomColumnsVue from '@/components/public/btn_customColumns/BtnCustomColumns.vue'

import ManuscriptListTableVue from './children/ManuscriptListTable.vue'
import ManuscriptListAbstractVue from './children/ManuscriptListAbstract.vue'

//  各个渠道对应的 表格自定义列数据
import { tableCustomColumnMap } from './children/data'

export default {
  name: 'MediaProdManuscriptList',
  props: {
    loading: Boolean,
    list: {
      type: Object,
      default: () => ({
        data: [],
      }),
    },
    abstract: {
      type: Object,
      default: () => ({
        data: [],
      }),
    },
    dateRange: {
      type: Array,
      default: () => [],
    },
    pagination: {
      type: Object,
      default: () => {},
    },
  },
  components: {
    BtnTableAndAbstractMode,
    BtnCustomColumnsVue,
    ManuscriptListTableVue,
    ManuscriptListAbstractVue,
  },
  data() {
    return {
      mode: 'table',
      original: false,
      mockTableData: [],
      tableColumns: [],
      page: {
        pageIndex: 1,
        pageSize: 10,
        total: 0,
      },
      // abstractData: [],
    }
  },
  computed: {
    channel() {
      return this.$route.query.channel
    },
    dateReveal() {
      const d = this.dateRange
      if (!d) return
      if (Array.isArray(d)) {
        return d.at(0) + ' 至 ' + d.at(1)
      }
      return d
    },
    revealModeToggleBtn() {
      return !['weibo'].includes(this.channel)
    },
    renderTable() {
      return !['weibo'].includes(this.channel)
    },
    abstractRevealImage() {
      return !['weibo'].includes(this.channel)
    },
    tableData() {
      const list = this.list.data || []
      return this.original ? list.filter(it => it.original === '是') : list
    },
    showTable() {
      return this.mode === 'table'
    },
    showAbstract() {
      return this.mode === 'abstract'
    },
    // 各渠道对应的表格
    comTableColumns() {
      return Reflect.get(tableCustomColumnMap, this.channel) || []
    },
    // 各渠道对应的表格自定义列
    comTableCustomColumns() {
      return this.comTableColumns.map(c => ({ label: c.label, checked: true }))
    },
  },
  watch: {
    pagination: {
      handler(v) {
        if (typeof v !== 'object' && v != null) {
          return
        }
        this.page.pageIndex = v.pageNo
        this.page.pageSize = v.pageSize
        this.page.total = v.total
      },
      deep: true,
    },
  },
  methods: {
    init() {
      if (this.renderTable) {
        this.setTableColumns()
      } else {
        this.mode = 'abstract'
      }
      // this.mockData()
    },
    mockData() {
      while (this.mockTableData.length < 20) {
        this.mockTableData.push({})
      }

      while (this.abstractData.length < 5) {
        this.abstractData.push({
          coverUrl:
            'https://picsum.photos/170/111?t=' + this.abstractData.length,
          title: '习近平：共建“一带一路”成果和机遇属于世界',
          desc:
            '今天的成就,来源于踔厉奋斗。明天的伟业,更需要赓续奋进。以“团结奋进新征程同心奋斗创伟业”为主题的2022中国正能量“五个一百”网络精品征集评选展播活动正在如火如荼进行,一幕幕中华儿女昂扬奋进的时代图景得以生动展现,建功新时代的磅礴伟力得以不断积蓄。五个一百”活动有力构筑网上网下同心圆,必将进一步激发14亿中华儿女勇毅前行的力量,成就更大的中国奇迹。',
          pubTime: '2023年06月16日 23:54:40',
          source: '新华社 人民日报客户端/热点',
        })
      }
    },
    setTableColumns(v) {
      const default_columns = this.comTableColumns
      if (!v) return (this.tableColumns = default_columns)
      const r = []
      default_columns.forEach(it => v.includes(it.label) && r.push(it))
      this.tableColumns = r
    },
    handleCustomColumnsConfirm(receive) {
      // console.log(receive)
      this.setTableColumns(receive)
    },
    handleCurrentChange(page) {
      this.$emit('manuscriptList_currentChange', page)
    },
    handleSizeChange(size) {
      this.$emit('manuscriptList_sizeChange', size)
    },
    // manuscriptList_currentChange(page) {
    //   this.$emit('manuscriptList_currentChange', page)
    // },
    // manuscriptList_sizeChange(size) {
    //   this.$emit('manuscriptList_sizeChange', size)
    // },
    // manuscriptAbstract_currentChange(page) {
    //   this.$emit('manuscriptAbstract_currentChange', page)
    // },
    // manuscriptAbstract_sizeChange(size) {
    //   this.$emit('manuscriptAbstract_sizeChange', size)
    // },
  },
  mounted() {
    this.init()
  },
}
</script>

<style lang="scss" scoped>
.media-prod-manuscript-list {
  // min-height: 20vh;
  padding-bottom: 0.625rem;
  .ml-title__btn {
    position: absolute;
    right: 20px;
    display: flex;
    align-items: center;

    .only-reveal-original {
      margin-right: 200px;
    }
  }
  .mpl-wrap {
    padding: 0 0.25rem 0.25rem;
  }
  .custom-pagination {
    bottom: 0.25rem;
  }
}
</style>
