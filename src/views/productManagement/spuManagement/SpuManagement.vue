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
        :loading="tableShowLoading"
        :data="tableShowData"
        :btn-disabled="Boolean(!cateProps.cateValue.threeLevel)"
        @spuPlusOrEdit="handleSpuPlusOrEdit"
      ></spu-table-show>

      <spu-plus-or-edit
        v-show="scene === 'spuPlusOrEdit'"
        :category3-id="cateProps.cateValue.threeLevel"
        :request-key="spuEditKey"
        :edit-item-id="spuEditId"
        @cancel="handleSpuPlusOrEditCancel"
      ></spu-plus-or-edit>

      <sku-plus-or-edit v-show="scene === 'skuPlusOrEdit'"></sku-plus-or-edit>
    </el-card>
  </div>
</template>

<script lang="ts" setup>
import { ref, reactive, watch, computed } from 'vue'
// public
import AttrCategory from '@/components/productManagement/TrademarkCategory.vue'
// 子组件
import SpuTableShow from './components/SpuTableShow.vue'
import SpuPlusOrEdit from './components/SpuPlusOrEdit.vue'
import SkuPlusOrEdit from './components/SkuPlusOrEdit.vue'
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

// const enum SCENE {
//   a = 'tableShow',
//   b = 'spuPlusOrEdit',
//   c = 'skuPlusOrEdit'
// }

type Scene = 'tableShow' | 'spuPlusOrEdit' | 'skuPlusOrEdit'
const scene = ref<Scene>('tableShow')
// const scene = ref<SCENE>(SCENE.a)

const setScene = (s: Scene) => (scene.value = s)

const spuEditKey = ref<number>(-1)
const spuEditId = ref<number | string>(-1)

/* *** tableShow 相关数据 | 逻辑 *** */
const tableShowLoading = ref(false)
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
  tableShowLoading.value = true
  const res = await getSpuProductList(params, pagination)
  // console.log(res)
  if (res.code !== 200) {
    tableShowData.value = []
    tableShowPagination.total = 0
    tableShowLoading.value = false
    return
  }
  const records = res.data.records || []
  tableShowData.value = records
  tableShowPagination.total = res.data.total
  tableShowLoading.value = false
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

/* spu详情 展示 | 编辑逻辑 */
const handleSpuPlusOrEdit = (_: string, row?: SpuProductItem) => {
  // console.log('handleSpuPlusOrEdit', action, row)
  spuEditKey.value = new Date().getTime()
  spuEditId.value = row?.id || ''
  setScene('spuPlusOrEdit')
}

const handleSpuPlusOrEditCancel = (msg: string) => {
  // console.log('handleSpuPlusOrEditCancel')
  if (msg === 'updateList') {
    getTableData(comTableShowParams.value, comTsPagination.value)
  }
  setScene('tableShow')
}
</script>

<style lang="scss" scoped></style>
