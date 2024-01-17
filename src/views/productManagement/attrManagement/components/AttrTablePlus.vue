<template>
  <div>
    <el-form inline>
      <el-form-item label="属性名称">
        <el-input placeholder="请输入"></el-input>
      </el-form-item>
    </el-form>
    <div>
      <el-button icon="Plus" type="primary">添加</el-button>
      <el-button icon="Close" type="danger">取消</el-button>
    </div>
    <el-table :data="attrTablePlusData" border class="mt-4 mb-4">
      <el-table-column label="序号" type="index" width="80"></el-table-column>
      <el-table-column label="名称"></el-table-column>
      <el-table-column label="操作">
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
    <div>
      <el-button type="primary">保存</el-button>
      <el-button @click="handleTablePlusAttrCancel" type="danger">
        取消
      </el-button>
    </div>
  </div>
</template>
<script lang="ts" setup>
import { ref } from 'vue'
import type { AttrItem } from '@/api/productManagement/attr/type'

interface AttrTablePlusProps {
  attrTablePlusData: AttrItem[]
}
const props = defineProps<AttrTablePlusProps>()

interface AttrTablePlusEmits {
  (e: 'tableAttrPlus'): void
  (e: 'tableAttrPlusCancel'): void
  (event: 'tableRowEdit', value: AttrItem): void
  (event: 'tableRowDelete', value: AttrItem): void
}
const emits = defineEmits<AttrTablePlusEmits>()

const handleTablePlusAttrCancel = () => {
  emits('tableAttrPlusCancel')
}

const handleTableRowEdit = (row: AttrItem) => {
  emits('tableRowEdit', row)
}

const handleTableRowDelete = (row: AttrItem) => {
  emits('tableRowDelete', row)
}
</script>
<style scoped lang="scss"></style>
