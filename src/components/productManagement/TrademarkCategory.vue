<template>
  <el-card>
    <el-form inline :disabled="disabled" class="demo-form-inline">
      <el-form-item label="一级分类">
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
          ></el-option>
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
            :label="item.name"
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
            v-for="item in options3"
            :label="item.name"
            :value="item.id"
          />
        </el-select>
      </el-form-item>
    </el-form>
  </el-card>
</template>
<script lang="ts" setup>
import { ref, computed, onMounted, shallowRef, watch } from 'vue'
import { TrademarkCategoryProps } from '@/types/components/productManagement.ts'
import useVModel from '@/utils/useVModel'
import {
  getCategory1,
  getCategory2,
  getCategory3,
} from '@/api/productManagement/category/index'
import type { categoryItem } from '@/api/productManagement/category/type'

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

onMounted(() => {
  getC1()
})

const options = shallowRef<categoryItem[]>([])

const options2 = ref<categoryItem[]>([])

const options3 = ref<categoryItem[]>([])

const getC1 = async () => {
  const res = await getCategory1()
  // console.log('res', res)
  if (res.code !== 200) return
  options.value = res.data
}

/* 依赖一级id获取二级分类 */
const getC2 = async () => {
  const id = comCateValue.value.firstLevel
  // console.log('getC2', id)
  if (!id) return // 一级清空了
  const res = await getCategory2(id)
  // console.log('getC2', res)
  if (res.code !== 200) return
  options2.value = res.data
}

/* 依赖二级id，获取三级分类 */
const getC3 = async () => {
  // return
  const id = comCateValue.value.secondLevel
  if (!id) return // 二级清空了
  const res = await getCategory3(id)
  // console.log('getC3', res)
  if (res.code !== 200) return
  options3.value = res.data
}

// watchEffect(() => getC2())
// watchEffect(() => getC3())

// tood optimize clearable variable
watch(
  () => comCateValue.value.firstLevel,
  () => {
    // console.log(val)
    // if (!val) {
    // 数据改变时就要清空子下拉菜单
    emits('update:cateValue', {
      ...comCateValue.value,
      secondLevel: '',
      threeLevel: '',
    })
    options2.value = []
    options3.value = []
    // return
    // }
    getC2()
  },
)

watch(
  () => comCateValue.value.secondLevel,
  () => {
    // if (!val) {
    emits('update:cateValue', {
      ...comCateValue.value,
      threeLevel: '',
    })
    options3.value = []
    // return
    // }
    getC3()
  },
)
</script>
<style scoped lang="scss"></style>
