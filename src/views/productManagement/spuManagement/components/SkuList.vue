<template>
  <el-dialog
    v-model="dialogVisible"
    title="SKU列表"
    width="800"
    :before-close="handleClose"
  >
    <custom-ele-table
      class="mt-4"
      height="50vh"
      :data="tableData"
      :table-column="skuListColumn"
    >
      <template #skuDefaultImg="{ row }">
        <div class="flex justify-center">
          <el-image
            fit="contain"
            style="height: 100px"
            :src="row.skuDefaultImg"
            :preview-src-list="[row.skuDefaultImg]"
          />
        </div>
      </template>
    </custom-ele-table>
    <template #footer>
      <div class="dialog-footer">
        <el-button @click="handleClose">Cancel</el-button>
        <el-button type="primary" @click="handleClose">Confirm</el-button>
      </div>
    </template>
  </el-dialog>
</template>
<script lang="ts" setup>
import { computed } from 'vue'
import type { SkuData } from '@/types'
import { createSkuListColumn } from './../const'

interface Props {
  modelValue: boolean
  tableData: SkuData[]
}
interface Emits {
  (e: 'update:modelValue', v: boolean): void
}

const props = defineProps<Props>()
const emits = defineEmits<Emits>()

const dialogVisible = computed({
  get() {
    return props.modelValue
  },
  set(v) {
    emits('update:modelValue', v)
  },
})

const skuListColumn = createSkuListColumn()

const handleClose = () => {
  dialogVisible.value = false
}
</script>
<style scoped lang="scss"></style>
