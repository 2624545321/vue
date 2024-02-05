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

    <custom-ele-table
      class="mt-4"
      v-loading="tableLoading"
      :data="attrTableData"
      :table-column="attrTableColumn"
    >
      <template #attrValueName="scope">
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
      <template #operation="{ row }">
        <el-button @click="handleTableRowEdit(row)" icon="Edit" type="primary">
          编辑
        </el-button>
        <el-popconfirm
          width="200"
          icon="InfoFilled"
          :title="`Are you sure to delete ${row.attrName}?`"
          @confirm="handleTableRowDelete(row)"
        >
          <template #reference>
            <el-button icon="Delete" type="danger">删除</el-button>
          </template>
        </el-popconfirm>
      </template>
    </custom-ele-table>
  </div>
</template>
<script lang="ts" setup>
import CustomEleTable from '@/components/customEleTable/CustomEleTable.vue'
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

const attrTableColumn = [
  {
    label: '序号',
    width: '80',
    type: 'index',
    align: 'center',
  },
  {
    prop: 'attrName',
    label: '属性名称',
    width: '120',
  },
  {
    label: '属性值名称',
    slot: 'attrValueName',
  },
  {
    label: '操作',
    width: '240',
    slot: 'operation',
  },
]

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
