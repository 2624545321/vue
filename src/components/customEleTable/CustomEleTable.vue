<template>
  <el-table v-bind="$attrs">
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
// import type { PropType } from 'vue'
// import { useAttrs } from 'vue'
// todo : add generic
// type T_data<T> = T[]
type Ta = any[]
interface TableProps {
  // loading?: boolean
  // stripe?: boolean
  // border?: boolean
  // height?: string
  // tableData: T_data<T>
  // tableColumn: T_data<T>
  // tableData: any
  tableColumn: Ta
}

// const props = defineProps<TableProps>()
const props = withDefaults(defineProps<TableProps>(), {
  // loading: false,
  // stripe: false,
  // border: false,
  // height: 'auto',
})
props
// console.log('TableProps', props)
// const $attrs = useAttrs()
// $attrs
// console.log($attrs)
</script>
<style scoped lang="scss"></style>
