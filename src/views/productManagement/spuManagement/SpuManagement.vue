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
        :btn-disabled="Boolean(!cateProps.cateValue.threeLevel)"
        @spuPlusOrEdit="handleSpuPlusOrEdit"
      ></spu-table-show>

      <spu-plus-or-edit
        v-show="scene === 'spuPlusOrEdit'"
        @cancel="handleSpuPlusOrEditCancel"
      ></spu-plus-or-edit>
      <sku-plus-or-edit v-show="scene === 'skuPlusOrEdit'"></sku-plus-or-edit>
    </el-card>
  </div>
</template>

<script lang="ts" setup>
import AttrCategory from '@/components/productManagement/TrademarkCategory.vue'
import SpuTableShow from './components/SpuTableShow.vue'
import SpuPlusOrEdit from './components/SpuPlusOrEdit.vue'
import SkuPlusOrEdit from './components/SkuPlusOrEdit.vue'
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

type Scene = 'tableShow' | 'spuPlusOrEdit' | 'skuPlusOrEdit'
const scene = ref<Scene>('tableShow')

const setScene = (s: Scene) => (scene.value = s)

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
  // console.log(res)
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
  [
    () => cateProps.cateValue.threeLevel,
    () => tableShowPagination.currentPage,
    () => tableShowPagination.pageSize,
  ],
  () => {
    getTableData(comTableShowParams.value, comTsPagination.value)
  },
)

// SpuPlusOrEditCancel
const handleSpuPlusOrEdit = (e) => {
  console.log('handleSpuPlusOrEdit', e)
  setScene('spuPlusOrEdit')
}

const handleSpuPlusOrEditCancel = () => {
  console.log('handleSpuPlusOrEditCancel')
  setScene('tableShow')
}
</script>

<style lang="scss" scoped></style>
