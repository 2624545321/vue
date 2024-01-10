<template>
  <el-card>
    <el-form inline>
      <el-form-item label="一级分类">
        <!-- v-model="comCateValue.firstLevel" -->
        <el-select
          v-model="comCateValue.firstLevel"
          placeholder="请选择"
          clearable
        >
          <el-option
            v-for="item in options"
            :key="item.id"
            :label="item.name"
            :value="item.id"
          />
        </el-select>
      </el-form-item>
      <el-form-item label="二级分类">
        <el-select
          v-model="comCateValue.secondLevel"
          placeholder="请选择"
          clearable
        >
          <el-option
            v-for="item in options2"
            :label="item.label"
            :value="item.id"
          />
        </el-select>
      </el-form-item>
      <el-form-item label="三级分类">
        <el-select
          v-model="comCateValue.threeLevel"
          placeholder="请选择"
          clearable
        >
          <el-option
            v-for="item in options"
            :key="item.id"
            :label="item.label"
            :value="item"
          />
        </el-select>
      </el-form-item>
    </el-form>
  </el-card>
</template>
<script lang="ts" setup>
import { ref, computed, onMounted, shallowRef } from 'vue'
import { TrademarkCategoryProps } from '@/types/components/productManagement.ts'
import useVModel from '@/utils/useVModel'
import { getCategory1 } from '@/api/productManagement/category/index'
import type { categoryItem } from '@/api/category/attr/type'

const props = defineProps<TrademarkCategoryProps>()
// console.log(props)

interface Emits {
  (e: 'update:cateValue', value: any): void
  (e: 'update:test', value: any): void
}
const emits = defineEmits<Emits>()

const comCateValue = useVModel(props, 'cateValue', emits)
// const comtest = useVModel(props, 'test', emits)
const comTest = computed({
  get() {
    return props.test
  },
  set(v) {
    console.log(v)
    emits('update:test', v)
  },
})
comTest

onMounted(async () => {
  const res = await getCategory1()
  console.log('res', res)
  if (res.code !== 200) return
  options.value = res.data
})

const options = shallowRef<categoryItem[]>([])

const options2 = ref<categoryItem[]>([
  { id: 10, label: 'Option A', desc: 'Option A - 230506' },
  { id: 20, label: 'Option B', desc: 'Option B - 230506' },
  { id: 30, label: 'Option C', desc: 'Option C - 230506' },
  { id: 40, label: 'Option A', desc: 'Option A - 230507' },
])
</script>
<style scoped lang="scss"></style>
