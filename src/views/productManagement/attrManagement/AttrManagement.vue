<template>
  <div>
    <AttrCategory
      v-model:cate-value="cateProps.cateValue"
      v-model:test="test"
      :disabled="cateProps.disabled"
    ></AttrCategory>
    <el-card class="mt-4 mb-4">
      <div v-show="scene === 'tableShow'">
        <div>
          <el-button
            :disabled="!Boolean(cateProps.cateValue.threeLevel)"
            @click="handlePlusTableAttr"
            icon="plus"
            type="primary"
          >
            添加属性
          </el-button>
        </div>
        <el-table
          :data="attrTableData"
          border
          class="mt-4"
          v-loading="tableLoading"
        >
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
      <div v-show="scene === 'tablePlus'">
        <el-form inline>
          <el-form-item label="属性名称">
            <el-input placeholder="请输入"></el-input>
          </el-form-item>
        </el-form>
        <div>
          <el-button icon="Plus" type="primary">添加</el-button>
          <el-button icon="Close" type="danger">取消</el-button>
        </div>
        <el-table border class="mt-4 mb-4">
          <el-table-column
            label="序号"
            type="index"
            width="80"
          ></el-table-column>
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
          <el-button @click="handlePlusTableAttrCancel" type="danger">
            取消
          </el-button>
        </div>
      </div>
    </el-card>
  </div>
</template>

<script lang="ts" setup>
import { ref, defineAsyncComponent, watch, reactive } from 'vue'
// async component
import { TrademarkCategoryProps } from '@/types/components/productManagement.ts'
const AttrCategory = defineAsyncComponent(
  () => import('@/components/productManagement/TrademarkCategory.vue'),
)
// requset api
import { attrInfoList } from '@/api/productManagement/attr'
// type
import type { AttrItem } from '@/api/productManagement/attr/type'

// 场景切换 tableShow tablePlus
const scene = ref<string>('tableShow')

// 选择框相关的数据
const test = ref('')
const cateProps = reactive<TrademarkCategoryProps>({
  cateValue: {
    firstLevel: '',
    secondLevel: '',
    threeLevel: '',
  },
  disabled: false,
})

// 表格相关的数据
const tableLoading = ref<boolean>(false)
let attrTableData = reactive<AttrItem[]>([])

const handlePlusTableAttr = () => {
  scene.value = 'tablePlus'
  cateProps.disabled = true
}

const handlePlusTableAttrCancel = () => {
  scene.value = 'tableShow'
  cateProps.disabled = false
}

const handleTableRowEdit = (row: AttrItem) => {
  console.log('handleTableRowEdit', row)
}

const handleTableRowDelete = (row: AttrItem) => {
  console.log('handleTableRowDelete', row)
}

/* 测试时注意，手机 -> 手机通讯 -> 手机 有数据 */
const getTableData = async () => {
  tableLoading.value = true
  const { firstLevel, secondLevel, threeLevel } = cateProps.cateValue
  if (!threeLevel) {
    return
  }
  const res = await attrInfoList(
    Number(firstLevel),
    Number(secondLevel),
    Number(threeLevel),
  )
  tableLoading.value = false
  // console.log('tableData', res)
  if (res.code !== 200 || !Array.isArray(res.data)) {
    return (attrTableData = [])
  }
  attrTableData = res.data
}

watch(
  () => cateProps.cateValue.threeLevel,
  () => {
    // console.log('v', v)
    getTableData()
  },
)

// optimize: 有 bug
// watchEffect(() => {
//   cateProps.cateValue.threeLevel
//   console.log('cateProps', cateProps.cateValue.threeLevel)
// })
</script>

<style lang="scss" scoped></style>
