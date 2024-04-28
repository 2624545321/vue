<template>
  <div class="app-container">
    <div class="manuscript-statistics list-height spread-shadow">
      <spread-title-vue :hide-vertical-line="true"></spread-title-vue>
      <filter-parameter-vue
        class="ms-filter-parameter"
        @formSearch="handleFormSearch"
      ></filter-parameter-vue>
      <div class="ms-table">
        <ms-custom-table-vue :receive-data="tableData"></ms-custom-table-vue>
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
import { getArticlePage } from '@/api/original/index'

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
        pageSize: 10,
        total: 0,
      },
      tableData: [],
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
      const params = {
        ...JSON.parse(JSON.stringify(p)),
        page: this.pagination.pageIndex,
        pageSize: this.pagination.pageSize,
      }
      return params
    },
    /**
     * @desc 列表请求
     * @param { object } params 表单参数
     *
     * @return void
     */
    async getArticlePage() {
      const res = await getArticlePage({ params: this.requestParams })
      if (res.Result !== 'OK') return (this.tableData = [])
      const records = res.Records || []
      this.tableData = Object.freeze(records)
      this.pagination.total = res.TotalRecordCount || 0
      // console.log('getArticlePage', res)
    },
  },
  mounted() {},
}
</script>

<style lang="scss" scoped>
.manuscript-statistics {
  position: relative;
  height: 94%;
  display: flex;
  flex-direction: column;
  padding-bottom: 1.25rem;

  .ms-filter-parameter {
    position: absolute;
    // top: .225rem;
    top: 0;
    left: 0;
    right: 0;
    height: 0.875rem;
    display: flex;
    align-items: center;
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
    position: absolute;
    left: 0;
    right: 0;
    bottom: 0.5rem;
  }

  .ms-table,
  .ms-filter-parameter,
  .ms-pagination {
    padding: 0 0.25rem;
  }
}
</style>
