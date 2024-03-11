<template>
  <div>
    <el-form label-width="100" label-position="left">
      <el-form-item label="SPU名称">
        <el-input placeholder="请输入" />
      </el-form-item>
      <el-form-item label="SPU品牌">
        <el-select>
          <el-option value="华为"></el-option>
          <el-option value="小米"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="SPU描述">
        <el-input placeholder="请输入" type="textarea" />
      </el-form-item>
      <el-form-item label="SPU照片">
        <custom-upload
          list-type="picture-card"
          action="api/admin/product/fileUpload"
          v-model:custom-file-list="pics"
          :show-file-list="true"
        ></custom-upload>
      </el-form-item>
      <el-form-item label="SPU销售属性">
        <el-select>
          <el-option value="华为"></el-option>
          <el-option value="小米"></el-option>
        </el-select>
        <el-button class="ml-5" icon="Plus">添加</el-button>
        <custom-ele-table
          :data="saleAttrTableData"
          :table-column="tableColumn"
          border
          class="mt-4 mb-4"
        >
          <template #operation>
            <el-button type="primary" size="small">保存</el-button>
            <el-button class="ml-5" size="small">取消</el-button>
          </template>
        </custom-ele-table>
      </el-form-item>
      <el-form-item>
        <el-button type="primary">保存</el-button>
        <el-button class="ml-5" @click="handleCancel">取消</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>
<script lang="ts" setup>
import { ref, reactive, nextTick, watch } from 'vue'
import CustomUpload from '@/components/customUpload/CustomUpload.vue'
import CustomEleTable from '@/components/customEleTable/CustomEleTable.vue'

interface Emits {
  (e: 'cancel', value: string): void
}
const emits = defineEmits<Emits>()

const pics = ref<string[]>([])
// const fileList = ref<string[]>([])
const tableColumn = reactive([
  {
    label: '序号',
    width: '80',
    type: 'index',
    align: 'center',
  },
  {
    label: '属性名',
    prop: 'rowName',
  },
  {
    label: '属性值',
    slot: 'rowName',
  },
  {
    label: '操作',
    slot: 'operation',
  },
])
const saleAttrTableData = reactive([{}])

const handleCancel = () => {
  emits('cancel', '123')
}
</script>
<style scoped lang="scss"></style>
