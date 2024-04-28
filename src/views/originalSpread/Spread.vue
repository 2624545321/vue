<template>
  <div class="app-container">
    <div class="manuscript-statistics list-height spread-shadow">
      <!-- <spread-title-vue :hide-vertical-line="true"></spread-title-vue> -->
      <filter-parameter-vue
        class="ms-filter-parameter"
        @formSearch="handleFormSearch"
      ></filter-parameter-vue>
      <div class="ms-table">
        <ms-custom-table-vue
          v-loading="tableLoading"
          :receive-data="tableData"
        ></ms-custom-table-vue>
      </div>
      <div class="ms-pagination">
        <custom-pagination-vue
          :page-no="pagination.pageIndex"
          :page-size="pagination.pageSize"
          :total="pagination.total"
          @handleCurrentChange="handleCurrentChange"
          @handleSizeChange="handleSizeChange"
        ></custom-pagination-vue>
      </div>
    </div>
  </div>
</template>

<script>
import FilterParameterVue from './components/FilterParameter.vue'
import msCustomTableVue from './components/MsCustomTable.vue'
import { getArticlePage } from '@/api/originalSpread/index'

export default {
  name: 'OriginalSpread',
  components: { FilterParameterVue, msCustomTableVue },
  data() {
    return {
      filterParamateData: {
        mediaProdList: [],
      },
      pagination: {
        pageIndex: 1,
        pageSize: 20,
        total: 0,
      },
      tableData: [],
      tableLoading: false,
      requestParams: {},
    }
  },
  methods: {
    handleCurrentChange(a) {
      // console.log('handleCurrentChange', a)
      this.pagination.pageIndex = a
      this.handleFormSearch(this.requestParams)
    },
    handleSizeChange(a) {
      // console.log('handleSizeChange', a)
      this.pagination.pageSize = a
      this.handleFormSearch(this.requestParams)
    },
    handleFormSearch(pam) {
      const params = this.listRequestParams(pam)
      this.requestParams = Object.freeze(params)
      this.getArticlePage()
    },
    /**
     * @desc 处理列表请求参数
     * @param { object } params 表单参数
     *
     * @return { object } 请求参数
     */
    listRequestParams(p) {
      const _p = JSON.parse(JSON.stringify(p))
      _p.params.page = this.pagination.pageIndex
      _p.params.pageSize = this.pagination.pageSize
      return _p
    },
    /**
     * @desc 列表请求
     * @param { object } params 表单参数
     *
     * @return void
     */
    async getArticlePage() {
      this.tableLoading = true
      const res = await getArticlePage(this.requestParams)
      if (res.Result !== 'OK') {
        this.tableData = []
        this.tableLoading = false
        return
      }
      const records = res.Records || []
      this.tableData = Object.freeze(records)
      this.pagination.total = res.TotalRecordCount || 0
      this.tableLoading = false
    },
  },
  mounted() {},
}
</script>

<style lang="scss" scoped>
@import '@/styles/mixin.scss';
.manuscript-statistics {
  position: relative;
  @include scrollBar;
  // display: flex;
  // flex-direction: column;
  // padding-bottom: 1.25rem;

  .ms-filter-parameter {
    display: flex;
    align-items: center;
    padding: 0 0.25rem 18px;
    ::v-deep .el-form-item {
      margin-top: 18px;
    }
  }
  ::v-deep {
    .spread-title {
      height: 0.875rem;
    }
  }

  .ms-table {
    flex-grow: 1;
    overflow: auto;
  }

  .ms-pagination {
    padding: 0.25rem;
    // position: absolute;
    // left: 0;
    // right: 0;
    // bottom: 0.5rem;
  }

  // .ms-pagination
  .ms-table {
    padding: 0 0.25rem;
  }
}
</style>
