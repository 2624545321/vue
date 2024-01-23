<template>
  <div>
    <div>
      <el-button
        :disabled="btnDisabled"
        @click="handleTableAttrPlus"
        icon="plus"
        type="primary"
      >
        添加属性
      </el-button>
    </div>
    <el-table :data="attrTableData" v-loading="tableLoading" class="mt-4">
      <el-table-column
        label="序号"
        width="80"
        type="index"
        align="center"
      ></el-table-column>
      <el-table-column
        label="属性名称"
        width="120"
        prop="attrName"
      ></el-table-column>
      <el-table-column label="属性值名称">
        <template #default="scope">
          <div v-if="scope.row.attrValueList?.length">
            <el-tag
              v-for="(vl, i) of scope.row.attrValueList"
              :key="i"
              class="mr-2"
            >
              {{ vl.valueName }}
            </el-tag>
          </div>
        </template>
      </el-table-column>
      <el-table-column label="操作" width="240">
        <template #default="{ row }">
          <el-button
            @click="handleTableRowEdit(row)"
            icon="Edit"
            type="primary"
          >
            编辑
          </el-button>
          <el-button
            @click="handleTableRowDelete(row)"
            icon="Delete"
            type="danger"
          >
            删除
          </el-button>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>
<script lang="ts" setup>
import type { AttrItem } from '@/api/productManagement/attr/type'

interface AttrTableShowProps {
  btnDisabled: boolean
  tableLoading: boolean
  attrTableData: AttrItem[]
}
const props = withDefaults(defineProps<AttrTableShowProps>(), {})
props

interface AttrTableShowEmits {
  (event: 'tableAttrPlus'): void
  (event: 'tableRowEdit', value: AttrItem): void
  (event: 'tableRowDelete', value: AttrItem): void
}
const emits = defineEmits<AttrTableShowEmits>()

const handleTableAttrPlus = () => {
  emits('tableAttrPlus')
}

const handleTableRowEdit = (row: AttrItem) => {
  emits('tableRowEdit', row)
}

const handleTableRowDelete = (row: AttrItem) => {
  emits('tableRowDelete', row)
}
</script>
<style scoped lang="scss"></style>
