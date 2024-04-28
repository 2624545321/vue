<template>
  <el-table
    class="customELeTable"
    ref="tableRef"
    v-loading="loading"
    v-bind="$attrs"
    v-on="$listeners"
  >
    <template v-for="item in columns">
      <!-- 注意：
      table-column 组件判断是否需要插槽时，分成两个组件写
      否则显示不出来 
      由于 el-table 组件中需要由 table-column 子组件进行包裹
      else 内容所以不能直接写 slot
       -->
      <template v-if="!item.slot">
        <el-table-column :key="item.prop" v-bind="item"></el-table-column>
      </template>
      <template v-else>
        <el-table-column
          :key="item.prop"
          :label="item.label"
          :prop="item.prop"
          :minWidth="item.minWidth"
          :align="item.align"
          :headerAlign="item.headerAlign"
        >
          <template #default="{row, column, $index }">
            <slot :name="item.slot" v-bind="{ row, column, $index }"></slot>
          </template>
        </el-table-column>
      </template>

      <!-- 
        err!
        <el-table-column :key="item.prop" v-bind="item">
          <template v-if="!item.slot" #default>
            <slot :name="item.slot" v-bind="item"></slot>
          </template>
        </el-table-column> -->
    </template>

    <template #append v-if="$slots.append">
      <slot name="append" />
    </template>

    <template #empty v-if="$slots.empty">
      <slot name="empty" />
    </template>
  </el-table>
</template>

<script>
export default {
  name: 'CustomELeTable',
  props: {
    // 表头数据 Table-column Attributes
    // { slot: 'xxx', header: 'xxx' }[]
    // slot：自定义列的slot-name；header：自定义表头的slot-name
    columns: Array,
    // 表格加载动画
    loading: {
      default: false,
      type: Boolean,
    },
    // ...其余属性同 ElementUI 表格 Attributes 直接传入即可
  },
  // methods: {
  //	 // 点击单元格
  //	 cellClick(row, column, cell, event) {
  //	 	 this.$emit('cell-click', {row, column, cell, event})
  //	 }
  // },
}
</script>

<style></style>
