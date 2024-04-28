<template>
  <div class="app-container">
    稿件统计
  </div>
</template>

<script>
// import FilterParameterVue from './components/FilterParameter.vue'
// import msCustomTableVue from './components/MsCustomTable.vue'
// import { getArticlePage } from '@/api/manuscriptStatistics/index'

// export default {
//   name: 'manuscriptStatistics',
//   components: { FilterParameterVue, msCustomTableVue },
//   mounted() {},
// }
</script>

<style lang="scss" scoped>
.manuscript-statistics {
  position: relative;
  display: flex;
  flex-direction: column;
  padding-bottom: 1.25rem;

  .ms-filter-parameter {
    position: absolute;
    top: 0.25rem;
    left: 0;
    right: 0;
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
