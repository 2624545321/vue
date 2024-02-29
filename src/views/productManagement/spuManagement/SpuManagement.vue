<template>
  <div class="h-full relative">
    <AttrCategory
      v-model:cate-value="cateProps.cateValue"
      :disabled="cateProps.disabled"
    ></AttrCategory>

    <el-card class="mt-4 mb-4">
      <spu-table-show
        v-show="scene === 'tableShow'"
        v-model:pagination="tableShowPagination"
        :data="tableShowData"
        :btn-disabled="Boolean(cateProps.cateValue.threeLevel)"
      ></spu-table-show>

      <spu-table-plus v-show="scene === 'tablePlus'"></spu-table-plus>
    </el-card>
  </div>
</template>

<script lang="ts" setup>
import AttrCategory from '@/components/productManagement/TrademarkCategory.vue'
import SpuTableShow from './components/SpuTableShow.vue'
import SpuTablePlus from './components/SpuTablePlus.vue'
import { ref, reactive, watch, computed } from 'vue'
// type
import type { TrademarkCategoryProps } from '@/types/components/productManagement'
import type {
  SpuProductListReqestParams,
  SpuProductItem,
} from '@/api/productManagement/spu/type'
// request
import { getSpuProductList } from '@/api/productManagement/spu'

const cateProps = reactive<TrademarkCategoryProps>({
  cateValue: {
    firstLevel: '',
    secondLevel: '',
    threeLevel: '',
  },
  disabled: false,
})

const scene = ref<'tableShow' | 'tablePlus'>('tableShow')

// tableShow 相关数据 | 逻辑
const tableShowData = ref<SpuProductItem[]>([])
const comTableShowParams = computed(() => {
  return {
    category3Id: cateProps.cateValue.threeLevel,
  }
})

const tableShowPagination = reactive<Pagination>({
  currentPage: 1,
  pageSize: 10,
  total: 0,
})
const comTsPagination = computed(() => {
  return {
    page: tableShowPagination.currentPage,
    limit: tableShowPagination.pageSize,
  }
})

const getTableData = async (
  params: SpuProductListReqestParams,
  pagination: ReqPagination,
) => {
  const res = await getSpuProductList(params, pagination)
  console.log(res)
  if (res.code !== 200) {
    tableShowData.value = []
    tableShowPagination.total = 0
    return
  }
  const records = res.data.records || []
  tableShowData.value = records
  tableShowPagination.total = res.data.total
}

watch(
  () => cateProps.cateValue.threeLevel,
  () => {
    getTableData(comTableShowParams.value, comTsPagination.value)
  },
)
watch(
  () => tableShowPagination,
  () => {
    getTableData(comTableShowParams.value, comTsPagination.value)
  },
  { deep: true },
)
</script>

<style lang="scss" scoped></style>
