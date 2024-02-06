<template>
  <div>
    <el-button
      :disabled="btnDisabled"
      @click="handleTableSpuPlus"
      icon="plus"
      type="primary"
    >
      添加SPU
    </el-button>
    <custom-ele-table
      class="mt-4"
      :data="spuData"
      :table-column="spuTableColumn"
    >
      <template #operation>
        <el-button icon="Plus" size="small" type="primary"></el-button>
        <el-button icon="Edit" size="small" type="warning"></el-button>
        <el-button icon="InfoFilled" size="small" type="info"></el-button>
        <el-button icon="Delete" size="small" type="danger"></el-button>
      </template>
    </custom-ele-table>

    <div class="pagination">
      <el-pagination
        v-model:current-page="pagination.currentPage"
        v-model:page-size="pagination.pageSize"
        :page-sizes="[10, 20, 30, 40]"
        :small="true"
        :background="true"
        layout="prev, pager, next, jumper, ->, total, sizes,"
        :total="pagination.total"
      />
      <!-- @size-change="handleSizeChange"
        @current-change="handleCurrentChange" -->
    </div>
  </div>
</template>
<script lang="ts" setup>
import { ref } from 'vue'
import type { TableColumn } from '@/types/components/customEleTable'

const btnDisabled = ref(false)
const handleTableSpuPlus = () => {}

const spuTableColumn: TableColumn[] = [
  {
    label: '序号',
    width: '80',
    type: 'index',
    align: 'center',
  },
  {
    prop: 'attrName',
    label: 'SPU名称',
    // width: '120',
  },
  {
    label: 'SPU描述',
    slot: 'attrValueName',
  },
  {
    label: '操作',
    // width: '240',
    slot: 'operation',
  },
]

const spuData = []
spuData.push({})

const pagination = ref({
  currentPage: 1,
  pageSize: 5,
  total: 0,
})
</script>
<style scoped lang="scss">
.pagination {
  position: absolute;
  left: 0;
  right: 0;
  bottom: 0;
  padding: 20px;
  z-index: 1;
}
</style>
