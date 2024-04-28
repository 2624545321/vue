<template>
  <div class="ml-table relative">
    <custom-eLe-table-vue
      class="customStyle-ele__table customStyle-ele__table-list"
      stripe
      style="width: 100%"
      height="100%"
      :columns="columns"
      :data="data"
      :default-sort="{ prop: 'pubTime', order: 'descending' }"
    >
      <template #title="scope">
        <custom-manuscript-title-vue
          :title="scope.row.title | strEscapeTags | strRemoveHtmlEntity"
          :row="scope.row"
          :custom-skip="handleTitleSkip"
          class="f-oh2"
        ></custom-manuscript-title-vue>
        <!-- :query-param="{ zbGuid: scope.row.zbGuid, mc: scope.row.mediaName }" -->
      </template>

      <template #docChannel="scope">
        <custom-manuscript-title-vue
          :title="scope.row.docChannel"
          :custom-skip="() => {}"
          class="f-oh2 text-centet default"
        ></custom-manuscript-title-vue>
      </template>

      <template #view>
        <el-link href="javascript:;">原文</el-link>
      </template>
    </custom-eLe-table-vue>

    <!-- <custom-pagination-vue
      class="custom-pagination"
      :page-no="page.pageIndex"
      :page-size="page.pageSize"
      :total="page.total"
      @handleCurrentChange="handleCurrentChange"
      @handleSizeChange="handleSizeChange"
    ></custom-pagination-vue> -->
  </div>
</template>

<script>
import CustomELeTableVue from '@/components/CustomELeTable/CustomELeTable.vue'
export default {
  name: 'ManuscriptListTable',
  props: {
    columns: {
      type: Array,
      default: () => [],
    },
    data: {
      type: Array,
      default: () => [],
    },
    // pagination: {
    //   type: Object,
    //   default: () => {},
    // },
  },
  components: { CustomELeTableVue },
  // data() {
  //   return {
  //     page: {
  //       pageIndex: 1,
  //       pageSize: 10,
  //       total: 100,
  //     },
  //   }
  // },
  // watch: {
  //   pagination: {
  //     handler(v) {
  //       if (typeof v !== 'object' && v != null) {
  //         return
  //       }
  //       this.page.pageIndex = v.pageNo
  //       this.page.pageSize = v.pageSize
  //       this.page.total = v.total
  //     },
  //     deep: true,
  //   },
  // },
  methods: {
    /* 点击原创稿件列表，能进入稿件的传播详情页分析页面；非原创稿件进入全媒体数据库的详情页 */
    handleTitleSkip(title, { row }) {
      const { original, zbGuid, mediaName } = row
      // console.log('original', original, row)
      if (original === '是') {
        if (!zbGuid) return
        const path = this.$router.resolve({
          name: 'spreadDatail',
          query: { zbGuid, mc: mediaName },
        })
        window.open(path.href)
      } else {
        const qp = `rl_HKEY=${row.rlHkey}&categoryId=${row.rlMark}`
        const url =
          window.SITE_CONFIG && window.SITE_CONFIG['Authorization']
            ? window.location.origin +
              '/central-database#/centralDataDetail?' +
              qp
            : 'http://localhost:8091/#/centralDataDetail?' + qp

        // https://pdgc.peopledaily.cn/central-database#/centralDataDetail?rl_HKEY=1784472239433977856&categoryId=cpsjk_00010001
        window.open(url)
      }
    },
    /*  handleCurrentChange(page) {
      this.$emit('manuscriptList_currentChange', page)
    },
    handleSizeChange(size) {
      this.$emit('manuscriptList_sizeChange', size)
    }, */
  },
}
</script>

<style lang="scss" scoped>
.ml-table {
  padding-bottom: 0.625rem;
  height: 640px;
}
.customStyle-ele__table {
  ::v-deep .manuscript-title {
    line-height: 0.3rem;
    white-space: wrap;
  }
}
</style>
