<template>
  <div class="brand-management">
    <el-button type="primary" icon="Plus">添加</el-button>

    <el-table
      height="70vh"
      :data="tableData"
      :border="true"
      stripe
      style="width: 100%; margin-top: 20px"
    >
      <el-table-column type="index" label="序号" width="120" align="center" />
      <el-table-column prop="tmName" label="品牌名称" />
      <el-table-column prop="name" label="品牌LOGO">
        <template #default="scope">
          <div class="brand-logo">
            <el-image
              :src="scope.row.logoUrl"
              fit="contain"
              :preview-src-list="[scope.row.logoUrl]"
            />
          </div>
        </template>
      </el-table-column>
      <el-table-column prop="address" label="品牌操作">
        <template #default="scope">
          <el-button @click="handleEdit(scope.row)" icon="Edit"></el-button>
          <el-button
            @click="handleDelete(scope.row)"
            icon="Delete"
            type="danger"
          ></el-button>
        </template>
      </el-table-column>
    </el-table>

    <div class="pagination">
      <el-pagination
        v-model:current-page="currentPage"
        v-model:page-size="pageSize"
        :page-sizes="[10, 20, 30, 40]"
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
import { ref, watchEffect } from 'vue'
import { baseTrademark } from '@/api/productManagement/brand'
import type { BaseTrademarkItem } from '@/api/productManagement/brand/type'

let tableData = ref<BaseTrademarkItem[]>([])
const currentPage = ref<number>(1)
const pageSize = ref<number>(5)
const total = ref<number>(0)

const getTableList = async () => {
  const res = await baseTrademark(currentPage.value, pageSize.value)
  if (res.code !== 200) return (tableData.value = [])
  const data = res.data || {}
  // console.log(res)
  tableData.value = data.records || []
  total.value = data.total || 0
}

watchEffect(() => {
  getTableList()
})

const handleEdit = (row: BaseTrademarkItem) => {
  console.log(row)
}

const handleDelete = (row: BaseTrademarkItem) => {
  console.log(row)
}

// watch(currentPage, (v) => {
//   console.log('currentPage', v)
// })
// watch(pageSize, (v) => {
//   console.log('pageSize', v)
// })

// onMounted(() => {
//   getTableList()
// })
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
  z-index: 1;
}

.brand-logo {
  // max-width: 200px;
  width: 100px;
  height: 100px;
  display: flex;
  justify-content: center;
  align-items: center;
}
</style>
