<template>
  <el-table :height="height" :data="tableData" :border="true" :stripe="stripe">
    <el-table-column
      v-for="(column, i) of tableColumn"
      :key="i"
      v-bind="column"
    >
      <template v-if="column.slot" #default="scope">
        <slot
          :name="column.slot"
          :row="scope.row"
          :index="scope.$index"
          :column="scope.column"
        ></slot>
      </template>
    </el-table-column>
  </el-table>
</template>
<script lang="ts" setup>
import { useAttrs } from 'vue'
type T_data<T> = T[]
interface TableProps {
  loading?: boolean
  stripe?: boolean
  border?: boolean
  height?: string
  tableData: T_data
  tableColumn: T_data
}

// const props = defineProps<TableProps>()
const props = withDefaults(defineProps<TableProps>(), {
  loading: false,
  stripe: false,
  border: false,
  height: 'auto',
})
console.log('TableProps', props)
const $attrs = useAttrs()
console.log($attrs)

const handleEdit = () => {}
const handleDelete = () => {}
</script>
<style scoped lang="scss"></style>
