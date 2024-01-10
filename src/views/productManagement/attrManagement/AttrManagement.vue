<template>
  <div>
    <AttrCategory
      v-model:cate-value="cateProps.cateValue"
      v-model:test="test"
    ></AttrCategory>
    <el-card class="mt-4 mb-4">
      <div>
        <el-button icon="plus" type="primary">添加属性</el-button>
      </div>
      <el-table border class="mt-4" v-loading="true">
        <el-table-column label="序号" width="80"></el-table-column>
        <el-table-column label="属性名称" width="120"></el-table-column>
        <el-table-column label="属性值名称" width="auto"></el-table-column>
        <el-table-column label="操作" width="120"></el-table-column>
      </el-table>
    </el-card>
  </div>
</template>

<script lang="ts" setup>
import { ref, defineAsyncComponent } from 'vue'
import { TrademarkCategoryProps } from '@/types/components/productManagement.ts'
const AttrCategory = defineAsyncComponent(
  () => import('@/components/productManagement/TrademarkCategory.vue'),
)

const test = ref('')

const cateProps = ref<TrademarkCategoryProps>({
  cateValue: {
    firstLevel: '',
    secondLevel: '',
    threeLevel: '',
  },
})
</script>

<style lang="scss" scoped></style>
