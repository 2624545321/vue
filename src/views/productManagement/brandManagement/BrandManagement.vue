<template>
  <div class="brand-management box-shadow">
    <el-button type="primary" icon="Plus" @click="handlePlusBrand">
      添加
    </el-button>

    <custom-ele-table
      style="width: 100%; margin-top: 20px"
      height="70vh"
      :border="true"
      :stripe="true"
      :table-data="tableData"
      :table-column="tableColumn"
    >
      <template #brandLogo="scope">
        <div class="brand-logo">
          <el-image
            fit="contain"
            :preview-teleported="true"
            :src="scope.row.logoUrl"
            :preview-src-list="[scope.row.logoUrl]"
          />
        </div>
      </template>
      <template #address="scope">
        <el-button @click="handleEdit(scope.row)" icon="Edit"></el-button>
        <el-button
          @click="handleDelete(scope.row)"
          icon="Delete"
          type="danger"
        ></el-button>
      </template>
    </custom-ele-table>

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

    <bm-dialog
      v-model:visible="dialogStatus.visible"
      v-model:form-data="dialogStatus.formData"
      :title="dialogTitlePrefix + dialogStatus.title"
      @form-submit="handleFormSubmit"
    ></bm-dialog>
  </div>
</template>

<script lang="ts" setup>
import BmDialog from './components/BmDialog.vue'
import CustomEleTable from '@/components/customEleTable/CustomEleTable.vue'
import { ref, watchEffect, computed, nextTick, reactive } from 'vue'
import { ElMessage, ElMessageBox } from 'element-plus'
import {
  baseTrademark,
  addOrUpdateTrademark,
  deleteTradeMark,
} from '@/api/productManagement/brand'
import type {
  BaseTrademarkItem,
  BaseTrademarkResponseData,
} from '@/api/productManagement/brand/type'
import type { DialogStatus } from '@/types/module/productManagement/brandManagement'

/* 表格相关数据、逻辑 */
let tableData = ref<BaseTrademarkItem[]>([])
const tableColumn = reactive([
  {
    type: 'index',
    label: '序号',
    width: '120',
    align: 'center',
  },
  {
    prop: 'name',
    label: '品牌LOGO',
    slot: 'brandLogo',
  },
  {
    prop: 'tmName',
    label: '品牌名称',
  },
  {
    prop: 'address',
    label: '品牌操作',
    slot: 'address',
  },
])
const currentPage = ref<number>(1)
const pageSize = ref<number>(2)
const total = ref<number>(0)

const getTableList = async () => {
  const res: BaseTrademarkResponseData = await baseTrademark(
    currentPage.value,
    pageSize.value,
  )
  if (res.code !== 200) return (tableData.value = [])
  const data = res.data || {}
  // console.log(res)
  tableData.value = data.records || []
  total.value = data.total || 0
}

watchEffect(() => {
  getTableList()
})

/* 对话框相关数据、逻辑 */
const dialogStatus = ref<DialogStatus>({
  visible: false,
  title: '品牌',
  formData: {
    logoUrl: '',
    tmName: '',
  },
})

const dialogTitlePrefix = computed(() => {
  const d = dialogStatus.value.formData
  return d?.id ? '编辑' : '添加'
})

const handleEdit = (row: BaseTrademarkItem) => {
  // console.log(row)
  // dialogStatus.value.formData = null
  dialogStatus.value.visible = true
  nextTick(() => (dialogStatus.value.formData = row))
}

const handlePlusBrand = () => {
  // dialogStatus.value.formData = null
  dialogStatus.value.visible = true
}

const handleFormSubmit = async () => {
  // console.log('form', form)
  // 直接赋值会导致数据得引用改变，引发问题
  // Object.assign(dialogStatus.value.formData, form)
  // ElMessage.success(dialogTitlePrefix.value + '成功0_0')
  // return
  const res = await addOrUpdateTrademark(dialogStatus.value.formData)
  // console.log('handleFormSubmit', res)
  if (res.code === 200) {
    ElMessage.success(dialogTitlePrefix.value + '成功0_0')
    getTableList()
  } else {
    ElMessage.error(dialogTitlePrefix.value + '失败@_@' + res.data)
  }
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

const handleDelete = (row: BaseTrademarkItem) => {
  // console.log(row)
  openEditBox(row)
}
// todo 优化 elmessage 方法，放入全局组件中
const openEditBox = (trademardmark: BaseTrademarkItem) => {
  ElMessageBox.confirm(
    `will permanently delete ${trademardmark.tmName}。`,
    'Delete',
    {
      confirmButtonText: 'OK',
      cancelButtonText: 'Cancel',
      type: 'error',
      icon: 'Delete',
    },
  )
    .then(async () => {
      const res = await deleteTradeMark(trademardmark.id as number)
      console.log('delete', res)
      if (res.code !== 200) {
        ElMessage({
          type: 'info',
          message: res.message,
        })
        return
      }
      // currentPage.value - 1 触发 watchEffect 进行数据请求
      tableData.value.length > 1
        ? getTableList()
        : (currentPage.value = currentPage.value - 1)
      ElMessage({
        type: 'success',
        message: res.message,
      })
    })
    .catch(() => {
      // ElMessage({
      //   type: 'info',
      //   message: 'Delete canceled',
      // })
    })
}
</script>

<style lang="scss" scoped>
.brand-management {
  position: relative;
  height: 100%;
  // margin: 4px;
  // padding: 6px;
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
