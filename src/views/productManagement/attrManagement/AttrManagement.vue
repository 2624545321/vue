<template>
  <div>
    <AttrCategory
      v-model:cate-value="cateProps.cateValue"
      v-model:test="test"
    ></AttrCategory>
    <el-card class="mt-4 mb-4">
      <div>
        <el-button
          :disabled="!Boolean(cateProps.cateValue.threeLevel)"
          icon="plus"
          type="primary"
        >
          添加属性
        </el-button>
      </div>
      <el-table :data="attrTableData" border class="mt-4" v-loading="true">
        <el-table-column label="序号" width="80" type="index"></el-table-column>
        <el-table-column
          label="属性名称"
          width="120"
          prop="attrName"
        ></el-table-column>
        <el-table-column label="属性值名称" width="auto"></el-table-column>
        <el-table-column label="操作" width="120"></el-table-column>
      </el-table>
    </el-card>
  </div>
</template>

<script lang="ts" setup>
import { ref, defineAsyncComponent, watch, reactive } from 'vue'
// async component
import { TrademarkCategoryProps } from '@/types/components/productManagement.ts'
const AttrCategory = defineAsyncComponent(
  () => import('@/components/productManagement/TrademarkCategory.vue'),
)
// requset api
import { attrInfoList } from '@/api/productManagement/attr'
// type
import type { AttrItem } from '@/api/productManagement/attr/type'

const test = ref('')

const cateProps = reactive<TrademarkCategoryProps>({
  cateValue: {
    firstLevel: '',
    secondLevel: '',
    threeLevel: '',
  },
})

const attrTableData = reactive<AttrItem[]>([])

/* 测试时注意，手机 -> 手机通讯 -> 手机 有数据 */
const getTableData = async () => {
  const { firstLevel, secondLevel, threeLevel } = cateProps.cateValue
  if (!threeLevel) {
    return
  }
  const res = await attrInfoList(
    Number(firstLevel),
    Number(secondLevel),
    Number(threeLevel),
  )
  console.log('tableData', res)
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
