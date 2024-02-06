<template>
  <div class="h-full relative">
    <AttrCategory
      v-model:cate-value="cateProps.cateValue"
      :disabled="cateProps.disabled"
    ></AttrCategory>

    <el-card class="mt-4 mb-4">
      <spu-table-show v-show="scene === 'tableShow'"></spu-table-show>

      <spu-table-plus v-show="scene === 'tablePlus'"></spu-table-plus>
    </el-card>
  </div>
</template>

<script lang="ts" setup>
import AttrCategory from '@/components/productManagement/TrademarkCategory.vue'
import SpuTableShow from './components/SpuTableShow.vue'
import SpuTablePlus from './components/SpuTablePlus.vue'
import { ref, reactive } from 'vue'
import type { TrademarkCategoryProps } from '@/types/components/productManagement.ts'

const cateProps = reactive<TrademarkCategoryProps>({
  cateValue: {
    firstLevel: '',
    secondLevel: '',
    threeLevel: '',
  },
  disabled: false,
})

const scene = ref<'tableShow' | 'tablePlus'>('tableShow')
</script>

<style lang="scss" scoped></style>
