<template>
  <div class="brand-management">
    <el-button type="primary" icon="Plus">添加</el-button>

    <el-table
      :data="tableData"
      :border="true"
      stripe
      style="width: 100%; margin-top: 20px"
    >
      <el-table-column type="index" label="序号" width="120" align="center" />
      <el-table-column prop="date" label="品牌名称" />
      <el-table-column prop="name" label="品牌LOGO" />
      <el-table-column prop="address" label="品牌操作" />
    </el-table>

    <div class="pagination">
      <el-pagination
        v-model:current-page="currentPage"
        v-model:page-size="pageSize"
        :page-sizes="[100, 200, 300, 400]"
        :small="true"
        :background="true"
        layout="prev, pager, next, jumper, ->, total, sizes,"
        :total="total"
      />
      <!-- @size-change="handleSizeChange"
        @current-change="handleCurrentChange" -->
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ref, watch } from 'vue'

const tableData: string[] = ['1']
while (tableData.length < 10) {
  tableData.push(...tableData)
}

const currentPage = ref<number>(1)
const pageSize = ref<number>(5)
const total = ref<number>(200)

watch(currentPage, (v) => {
  console.log('currentPage', v)
})
watch(pageSize, (v) => {
  console.log('pageSize', v)
})

// const handleSizeChange = (value: number) => {
//   console.log('handleSizeChange', value)
// }
// const handleCurrentChange = (value: number) => {
//   console.log('handleCurrentChange', value)
// }
</script>

<style lang="scss" scoped>
.brand-management {
  position: relative;
  height: 100%;
  padding: 10px;
}
.pagination {
  position: absolute;
  left: 0;
  right: 0;
  bottom: 0;
  padding: 20px;
}
</style>
