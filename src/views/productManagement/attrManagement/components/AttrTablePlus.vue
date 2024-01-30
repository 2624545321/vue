<template>
  <div>
    <el-form
      ref="attrNameForm"
      inline
      status-icon
      :model="attrNameFormData"
      :rules="attrNameFormRules"
      @submit.prevent="handleSubmit"
    >
      <el-form-item label="属性名称" prop="attrName">
        <el-input
          v-model="attrNameFormData.attrName"
          placeholder="请输入"
        ></el-input>
      </el-form-item>
      <el-form-item>
        <el-button
          :disabled="!attrNameFormData.attrName"
          icon="Plus"
          type="primary"
          native-type="submit"
        >
          添加
        </el-button>
        <!-- <el-button icon="Close" type="danger">取消</el-button> -->
      </el-form-item>
    </el-form>
    <!-- todo: 验证的原理是什么？搞不懂... -->
    <el-form
      ref="attrRowForm"
      :model="attrRowFormData"
      :rules="attrRowFormRules"
      @submit.prevent="handleAttrRowForm"
    >
      <el-table
        :data="attrRowFormData.attrTableRowData"
        border
        class="mt-4 mb-4"
      >
        <el-table-column label="序号" type="index" width="80"></el-table-column>
        <el-table-column label="名称">
          <template #default="{ row, $index }">
            <el-form-item
              v-show="row.isEdit"
              :prop="'attrTableRowData.' + $index + '.valueName'"
              :rules="attrRowFormRules.valueName"
              class="pt-4"
            >
              <el-input
                :ref="(vc: HTMLInputElement) => (iptRefList[$index] = vc)"
                v-model="row.valueName"
                type="text"
              ></el-input>
            </el-form-item>
            <span v-show="!row.isEdit">{{ row.valueName }}</span>
          </template>
        </el-table-column>
        <el-table-column label="操作">
          <template #default="{ $index }">
            <el-button
              @click="handleTableRowEdit($index, true)"
              icon="Edit"
              type="primary"
            >
              编辑
            </el-button>
            <el-button
              @click="handleTableRowDelete($index)"
              icon="Delete"
              type="danger"
            >
              删除
            </el-button>
          </template>
        </el-table-column>
      </el-table>
      <div>
        <el-button
          :disabled="!attrRowFormData.attrTableRowData.length"
          @click="handleTableRowAddSave(attrRowForm!)"
          type="primary"
          native-type="submit"
        >
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
import { ref, reactive, nextTick } from 'vue'
import type { AttrItem, AttrValueItem } from '@/api/productManagement/attr/type'
import type { FormInstance, FormRules } from 'element-plus'

interface AttrTablePlusProps {
  // attrTablePlusData: AttrItem[]
  tableRowAddId: number | string // 添加的属性的三级id
}
const props = defineProps<AttrTablePlusProps>()
props

// const attrName = ref<string>('')

// const attrTableRowData = reactive<AttrValueItem[]>([])

interface AttrTablePlusEmits {
  (e: 'tableRowAddSave', value: AttrItem): void
  (e: 'tableAttrPlusCancel'): void
}
const emits = defineEmits<AttrTablePlusEmits>()

// 属性添加表单
interface AttrNameForm {
  attrName: string
}
const attrNameForm = ref<FormInstance>()
const attrNameFormData = ref<AttrNameForm>({
  attrName: '',
})
const attrNameFormRules = reactive<FormRules<AttrNameForm>>({
  attrName: [{ required: true, trigger: 'blur', message: 'error!' }],
})
const handleSubmit = async () => {
  attrNameForm.value?.validate()
  // console.log('handleSubmit', res)
  handleTableRowAdd()
  await nextTick()
  iptRefList.at(-1)?.focus()
}

// 属性各项表单
interface AttrRowFrom {
  attrTableRowData: AttrValueItem[]
}

const reg = /\.(\d)\./
const attrRowForm = ref<FormInstance>()
const attrRowFormData = reactive<AttrRowFrom>({
  attrTableRowData: [],
})
const iptRefList = reactive<(HTMLInputElement | null)[]>([])
const validateValueName = (
  rule: any,
  value: AttrValueItem['valueName'],
  callback: any,
) => {
  // const res = rule.validate()
  // console.log(res)
  const { fullField } = rule
  // console.log(rule, value, callback)
  if (!value?.trim()) {
    callback(new Error(fullField + ' is required'))
    return
  }
  // 字段中的数字表示value在数组中的索引位置
  const m = fullField.match(reg)
  const i = m[1] >>> 0
  if (i == undefined) {
    callback(new Error(fullField + ' is error!'))
    return
  }
  if (
    /* 判断重复时，当前项已经在数据中，所以不参与判断 */
    attrRowFormData.attrTableRowData.some(
      (a, index) => index !== i && a.valueName === value,
    )
  ) {
    callback(new Error('duplicate items'))
    return
  }
  // 取消编辑状态
  handleTableRowEdit(i, false)
  callback() // 不写回车无法提交 => 表单无法验证
}
const attrRowFormRules = reactive<FormRules>({
  valueName: [{ trigger: 'blur', validator: validateValueName }],
})

const handleAttrRowForm = async () => {
  await attrRowForm.value?.validate()
  // console.log(res)
}

const handleTableRowAdd = () => {
  attrRowFormData.attrTableRowData.push({
    valueName: '',
    isEdit: true,
  })
}

const handleTableRowAddSave = async (form: FormInstance) => {
  await form.validate()
  // console.log('submit')
  const o: AttrItem = {
    attrName: attrNameFormData.value.attrName,
    categoryId: props.tableRowAddId,
    categoryLevel: 3,
    attrValueList: attrRowFormData.attrTableRowData,
  }
  emits('tableRowAddSave', o)
  await nextTick()
  attrRowFormData.attrTableRowData = []
}

const handleTablePlusAttrCancel = async () => {
  emits('tableAttrPlusCancel')
  await nextTick()
  attrRowFormData.attrTableRowData = []
}

const handleTableRowEdit = (i: number, status: boolean) => {
  attrRowFormData.attrTableRowData[i].isEdit = status
  iptRefList.at(i)?.focus()
}

const handleTableRowDelete = (i: number) => {
  attrRowFormData.attrTableRowData.splice(i, 1)
}
</script>
<style scoped lang="scss"></style>
