<template>
  <div>
    <el-form label-width="100" label-position="left" :model="form">
      <el-form-item label="SPU名称">
        <el-input v-model="form.spuName" placeholder="请输入" />
      </el-form-item>
      <el-form-item label="SPU品牌">
        <el-select v-model="form.tmId">
          <el-option
            v-for="(tm, i) of trademarkList"
            :key="i"
            :label="tm.tmName"
            :value="tm.id"
          ></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="SPU描述">
        <el-input
          v-model="form.description"
          placeholder="请输入"
          type="textarea"
        />
      </el-form-item>
      <el-form-item label="SPU照片">
        <custom-upload
          list-type="picture-card"
          action="api/admin/product/fileUpload"
          v-model:custom-file-list="spuImageList"
          :show-file-list="true"
        ></custom-upload>
      </el-form-item>
      <el-form-item label="SPU销售属性">
        <el-select>
          <el-option
            v-for="(sa, i) of saleAttrList"
            :key="i"
            :label="sa.name"
            :value="sa.name"
          ></el-option>
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
import { ref, reactive, watchEffect } from 'vue'
import CustomUpload from '@/components/customUpload/CustomUpload.vue'
import CustomEleTable from '@/components/customEleTable/CustomEleTable.vue'
// request
import { getSpuInfoById, baseSaleAttrList } from '@/api/productManagement/spu'
import { getBaseTrademarkList } from '@/api/baseTrademark'
// type
import type { SpuPlusOrEditForm } from '@/types/module/productManagement/spuManagement'
import type {
  BaseSaleAttrItem,
  SpuImageItem,
} from '@/api/productManagement/spu/type'
import type { TrademarkItem } from '@/api/baseTrademark/type'
import type { UploadUserFile } from 'element-plus'
// util
import { cloneDeep } from '@/utils'

interface Props {
  requestKey: number // 监听变化，变化时说明点击了编辑，请求数据
  editItemId: number // 点击编辑的数据项的 id
}

const props = withDefaults(defineProps<Props>(), {
  requestKey: -1,
  editItemId: -1,
})

interface Emits {
  (e: 'cancel', value: string): void
}
const emits = defineEmits<Emits>()

const createForm = (): SpuPlusOrEditForm => ({
  id: -1,
  createTime: '',
  updateTime: '',
  spuName: '',
  description: '',
  tmId: -1,
  spuSaleAttrValueList: [],
  spuImageList: [],
  spuPosterList: [],
})
// form 表单
const form = ref<SpuPlusOrEditForm>(createForm())
// 当前品牌的全部的销售属性
const saleAttrList = ref<BaseSaleAttrItem[]>([])
// 全部的品牌
const trademarkList = ref<TrademarkItem[]>([])
// 图片列表
const spuImageList = ref<UploadUserFile[]>([])

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

const setImageList = (list: SpuImageItem[]) => {
  const _list = cloneDeep(list)
  spuImageList.value = _list.map((it) => {
    return {
      name: it.imgName,
      url: it.imgUrl,
    }
  })
}

// todo: 看一下老师怎么回显图片列表
const getSpuItemDetail = async (id: number) => {
  const res_info = await getSpuInfoById(id)
  const res_sale = await baseSaleAttrList()
  const res_trademark = await getBaseTrademarkList()

  if (res_info.code === 200) {
    form.value = res_info.data || createForm()
    setImageList(form.value.spuImageList)
  } else {
    form.value = createForm()
  }

  if (res_sale.code === 200) {
    saleAttrList.value = res_sale.data || []
  } else {
    saleAttrList.value = []
  }

  if (res_trademark.code === 200) {
    trademarkList.value = res_trademark.data || []
  } else {
    trademarkList.value = []
  }
  // console.log('info', res_info)
  // console.log('res_sale', res_sale)
  // console.log('res_trademark', res_trademark)
}

watchEffect(() => {
  if (props.editItemId < 1 || props.requestKey < 1) return
  getSpuItemDetail(props.editItemId)
})

const handleCancel = () => {
  emits('cancel', '123')
}
</script>
<style scoped lang="scss"></style>
