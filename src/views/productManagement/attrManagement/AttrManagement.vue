<template>
  <div>
    <AttrCategory
      v-model:cate-value="cateProps.cateValue"
      v-model:test="test"
      :disabled="cateProps.disabled"
    ></AttrCategory>
    <el-card class="mt-4 mb-4">
      <div v-show="scene === 'tableShow'">
        <div>
          <attr-table-show
            :btn-disabled="!Boolean(cateProps.cateValue.threeLevel)"
            :table-loading="tableLoading"
            :attr-table-data="attrTableData"
            @tableAttrPlus="handlePlusTableAttr"
            @tableRowEdit="handleTableRowEdit"
            @tableRowDelete="handleTableRowDelete"
          ></attr-table-show>
        </div>
      </div>
      <div v-show="scene === 'tablePlus'">
        <attr-table-plus
          :table-row-add-id="cateProps.cateValue.threeLevel"
          @table-row-add-save="handleTableRowAddSave"
          @table-attr-plus-cancel="handleTableRowAddCanael"
        ></attr-table-plus>
      </div>
    </el-card>
  </div>
</template>

<script lang="ts" setup>
/**
 * @description  一般来说，容器只负责逻辑处理，不管数据如何渲染
 * 把数据展示、处理的逻辑发送给子组件，自己只负责收集数据，进行状态分发
 */
import { ref, defineAsyncComponent, watch, reactive } from 'vue'
import { TrademarkCategoryProps } from '@/types/components/productManagement.ts'
// async component
const AttrCategory = defineAsyncComponent(
  () => import('@/components/productManagement/TrademarkCategory.vue'),
)
const AttrTableShow = defineAsyncComponent(
  () =>
    import(
      '@/views/productManagement/attrManagement/components/AttrTableShow.vue'
    ),
)
const AttrTablePlus = defineAsyncComponent(
  () =>
    import(
      '@/views/productManagement/attrManagement/components/AttrTablePlus.vue'
    ),
)

// const n = ref(1)
// const arr = reactive([1, 2, 3])
// console.log(n)
// console.log(arr)

// requset api
import {
  attrInfoList,
  attrAddOrUpdateAttrInfo,
} from '@/api/productManagement/attr'
// type
import type { AttrItem } from '@/api/productManagement/attr/type'
import { ElMessage } from 'element-plus'

// 场景切换 tableShow tablePlus
const scene = ref<'tableShow' | 'tablePlus'>('tablePlus')

// 选择框相关的数据
const test = ref('')
const cateProps = reactive<TrademarkCategoryProps>({
  cateValue: {
    firstLevel: '',
    secondLevel: '',
    threeLevel: '',
  },
  disabled: false,
})

// 表格相关的数据
const tableLoading = ref<boolean>(false)
let attrTableData = reactive<AttrItem[]>([])

const handlePlusTableAttr = () => {
  scene.value = 'tablePlus'
  cateProps.disabled = true
}

// const handlePlusTableAttrCancel = () => {
//   scene.value = 'tableShow'
//   cateProps.disabled = false
// }

const handleTableRowEdit = (row: AttrItem) => {
  console.log('handleTableRowEdit', row)
}

const handleTableRowDelete = (row: AttrItem) => {
  console.log('handleTableRowDelete', row)
}

const handleTableRowAddSave = async (row: AttrItem) => {
  // console.log('handleTableRowAddSave', row)
  const res = await attrAddOrUpdateAttrInfo(row)
  if (res.code === 200) {
    ElMessage.success('添加成功')
  } else {
    ElMessage.error('添加失败')
  }
  handleTableRowAddCanael()
  getTableData()
}

const handleTableRowAddCanael = () => {
  scene.value = 'tableShow'
}

/* 测试时注意，手机 -> 手机通讯 -> 手机 有数据 */
const getTableData = async () => {
  tableLoading.value = true
  const { firstLevel, secondLevel, threeLevel } = cateProps.cateValue
  if (!threeLevel) {
    return
  }
  const res = await attrInfoList(
    Number(firstLevel),
    Number(secondLevel),
    Number(threeLevel),
  )
  tableLoading.value = false
  // console.log('tableData', res)
  if (res.code !== 200 || !Array.isArray(res.data)) {
    return (attrTableData = [])
  }
  attrTableData = res.data
}

watch(
  () => cateProps.cateValue.threeLevel,
  () => {
    // console.log('v', v)
    getTableData()
  },
)

// optimize: 有 bug
// watchEffect(() => {
//   cateProps.cateValue.threeLevel
//   console.log('cateProps', cateProps.cateValue.threeLevel)
// })
</script>

<style lang="scss" scoped></style>
