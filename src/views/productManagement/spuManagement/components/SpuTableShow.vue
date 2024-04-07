<template>
  <div>
    <el-button
      :disabled="btnDisabled"
      @click="handleTableSpuPlusOrEdit('puls')"
      icon="plus"
      type="primary"
    >
      添加SPU
    </el-button>
    <custom-ele-table
      class="mt-4"
      height="55vh"
      v-loading="loading"
      :data="data"
      :table-column="spuTableColumn"
    >
      <template #operation="{ row }">
        <el-tooltip content="添加SKU">
          <el-button icon="Plus" size="small" type="primary"></el-button>
        </el-tooltip>
        <el-tooltip content="编辑SPU">
          <el-button
            icon="Edit"
            size="small"
            type="warning"
            @click="handleTableSpuPlusOrEdit('edit', row)"
          ></el-button>
        </el-tooltip>
        <el-tooltip content="查看列表">
          <el-button icon="View" size="small" type="default"></el-button>
        </el-tooltip>
        <el-tooltip content="删除SPU">
          <el-button icon="Delete" size="small" type="danger"></el-button>
        </el-tooltip>
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
import type { TableColumn } from '@/types/components/customEleTable'
import type { SpuProductItem } from '@/api/productManagement/spu/type'
import useVModel from '@/utils/useVModel'
// import { watch } from 'vue';

interface TableProps {
  pagination: Pagination
  data: SpuProductItem[]
  btnDisabled?: boolean
  loading?: boolean
}
const props = defineProps<TableProps>()

interface Emits {
  (e: 'update:pagination', value: any): void
  (e: 'spuPlusOrEdit', action: string, info?: SpuProductItem): void
}
const emits = defineEmits<Emits>()

const handleTableSpuPlusOrEdit = (action: string, row?: SpuProductItem) => {
  emits('spuPlusOrEdit', action, row)
}

const spuTableColumn: TableColumn[] = [
  {
    label: '序号',
    width: '80',
    type: 'index',
    align: 'center',
  },
  {
    prop: 'spuName',
    label: 'SPU名称',
    // width: '120',
  },
  {
    label: 'SPU描述',
    // slot: 'description',
    prop: 'description',
  },
  {
    label: '操作',
    // width: '240',
    slot: 'operation',
  },
]

useVModel(props, 'pagination', emits)
// watch(vModelPagination, (v) => {
//   console.log('vModelPagination', v)
// }, { deep: true })

// const spuData: TableColumn[] = []
// spuData.push({} as TableColumn)
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
