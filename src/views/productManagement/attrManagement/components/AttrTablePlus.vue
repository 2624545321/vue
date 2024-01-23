<template>
  <div>
    <el-form inline>
      <el-form-item label="属性名称">
        <el-input v-model="attrName" placeholder="请输入"></el-input>
      </el-form-item>
    </el-form>
    <div>
      <el-button
        @click="handleTableRowAdd"
        :disabled="!attrName"
        icon="Plus"
        type="primary"
      >
        添加
      </el-button>
      <el-button icon="Close" type="danger">取消</el-button>
    </div>
    <el-form>
      <el-table :data="attrTableRowData" border class="mt-4 mb-4">
        <el-table-column label="序号" type="index" width="80"></el-table-column>
        <el-table-column label="名称">
          <template #default="{ row }">
            <el-input v-model="row.valueName" type="text"></el-input>
          </template>
        </el-table-column>
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
        <el-button @click="handleTableRowAddSave" type="primary">
          保存
        </el-button>
        <el-button @click="handleTablePlusAttrCancel" type="danger">
          取消
        </el-button>
      </div>
    </el-form>
  </div>
</template>
<script lang="ts" setup>
import { ref } from 'vue'
import type { AttrItem, AttrValueItem } from '@/api/productManagement/attr/type'

interface AttrTablePlusProps {
  // attrTablePlusData: AttrItem[]
  tableRowAddId: number | string // 添加的属性的三级id
}
const props = defineProps<AttrTablePlusProps>()
props

const attrName = ref<string>('')

const attrTableRowData = ref<AttrValueItem[]>([])

interface AttrTablePlusEmits {
  (e: 'tableRowAddSave', value: AttrItem): void
  (e: 'tableAttrPlusCancel'): void
}
const emits = defineEmits<AttrTablePlusEmits>()

const handleTableRowAdd = () => {
  attrTableRowData.value.push({
    // createTime: new Date().toLocaleDateString() + new Date().toTimeString(),
    // updateTime: new Date().toLocaleDateString() + new Date().toTimeString(),
    valueName: '',
  })
}

const handleTableRowAddSave = () => {
  const o: AttrItem = {
    attrName: attrName.value,
    categoryId: props.tableRowAddId,
    categoryLevel: 3,
    // createTime: new Date().toLocaleDateString() + new Date().toTimeString(),
    // updateTime: new Date().toLocaleDateString() + new Date().toTimeString(),
    attrValueList: attrTableRowData.value,
  }
  emits('tableRowAddSave', o)
}

const handleTablePlusAttrCancel = () => {
  emits('tableAttrPlusCancel')
}

const handleTableRowEdit = (row: AttrValueItem) => {
  console.log(row)
}
const handleTableRowDelete = (row: AttrValueItem) => {
  console.log(row)
}
</script>
<style scoped lang="scss"></style>
