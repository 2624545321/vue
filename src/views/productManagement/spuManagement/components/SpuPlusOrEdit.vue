<template>
  <div v-loading="loading">
    <el-form
      label-width="100"
      label-position="left"
      :model="form"
      @submit.prevent="handleFormSubmit"
    >
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
        <el-select
          v-model="model_attr"
          :placeholder="`未选择${unSelectSaleAttrList.length}个`"
          clearable
        >
          <el-option
            v-for="(sa, i) of unSelectSaleAttrList"
            :key="i"
            :label="sa.name"
            :value="sa.id"
          ></el-option>
        </el-select>
        <el-button
          class="ml-5"
          icon="Plus"
          :disabled="!model_attr"
          @click="handleAddSaleAttr"
        >
          添加属性
        </el-button>
        <custom-ele-table
          :data="form.spuSaleAttrList"
          :table-column="tableColumn"
          border
          class="mt-4 mb-4"
        >
          <template #saleAttrName="{ row }">
            <el-tag
              v-for="(tag, i) of row.spuSaleAttrValueList"
              @close="row.spuSaleAttrValueList.splice(i, 1)"
              type="success"
              :key="i"
              class="mr-2"
              closable
            >
              {{ tag.saleAttrValueName }}
            </el-tag>

            <el-input
              @blur="handleSaleAttrValueNameIptAdd(row)"
              @keydown.prevent.enter="handleSaleAttrValueNameIptAdd(row)"
              v-show="row.isAdd"
              v-model.trim="saleAttrValueName_model"
              type="small"
              style="width: 100px"
            />

            <el-button
              v-show="!row.isAdd"
              type="primary"
              size="small"
              icon="Plus"
              @click="handleSaleAttrValueNamePlusBtnClick(row)"
            ></el-button>
          </template>

          <template #operation="{ index }">
            <el-button
              type="danger"
              size="small"
              icon="Delete"
              @click="handleSpuAttrValueDelete(form.spuSaleAttrList, index)"
            ></el-button>
            <!-- <el-button class="ml-5" size="small">取消</el-button> -->
          </template>
        </custom-ele-table>
      </el-form-item>

      <el-form-item>
        <el-button
          type="primary"
          native-type="submit"
          :disabled="!form.spuSaleAttrList.length"
        >
          保存
        </el-button>
        <el-button class="ml-5" @click="handleCancel">取消</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>
<script lang="ts" setup>
import {
  ref,
  reactive,
  watchEffect,
  computed,
  onMounted,
  unref,
  toRaw,
} from 'vue'
import { ElMessage } from 'element-plus'
import CustomUpload from '@/components/customUpload/CustomUpload.vue'
import CustomEleTable from '@/components/customEleTable/CustomEleTable.vue'
// request
import {
  getSpuInfoById,
  baseSaleAttrList,
  addOrUpdateSpuInfo,
} from '@/api/productManagement/spu'
import { getBaseTrademarkList } from '@/api/baseTrademark'
// type
import type {
  SpuPlusOrEditForm,
  ShowSpuImageList,
  ClosedEditPageMsg,
  Custom_Emits,
  Custom_Props,
} from '@/types/module/productManagement/spuManagement'
import type {
  BaseSaleAttrItem,
  SpuImageItem,
} from '@/api/productManagement/spu/type'
import type { TrademarkItem } from '@/api/baseTrademark/type'
import type { UnionOfArray } from '@/types/util'
// util
import { cloneDeep } from '@/utils'
// const
import { createSpuForm } from './../const'

const props = withDefaults(defineProps<Custom_Props>(), {
  requestKey: -1,
  editItemId: -1,
})

const emits = defineEmits<Custom_Emits>()

const loading = ref<boolean>(false)

const createForm = createSpuForm
// form 表单
const form = ref<SpuPlusOrEditForm>(createForm())
// 全部的品牌
const trademarkList = ref<TrademarkItem[]>([])
// 图片列表
const spuImageList = ref<ShowSpuImageList[]>([])

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
    prop: 'saleAttrName',
  },
  {
    label: '属性值',
    slot: 'saleAttrName',
  },
  {
    label: '操作',
    slot: 'operation',
  },
])
// const saleAttrTableData = reactive([{}])

const setImageList = (list: SpuImageItem[]) => {
  const _list = cloneDeep(list)
  spuImageList.value = _list.map((it) => {
    return {
      name: it.imgName,
      url: it.imgUrl,
    }
  })
}

/**
 * @desc 获取对应基本的信息（添加或者编辑都需要：品牌、销售属性）
 */
const getBaseInfo = async () => {
  const res_sale = await baseSaleAttrList()
  const res_trademark = await getBaseTrademarkList()

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
}

/**
 * @desc 获取对应spu的详情（编辑时）
 */
const getSpuItemDetail = async (id: number | string) => {
  loading.value = true
  const res_info = await getSpuInfoById(id as number)

  if (res_info.code === 200) {
    form.value = res_info.data || createForm()
    setImageList(form.value.spuImageList)
  } else {
    form.value = createForm()
  }

  // console.log('info', res_info)
  // console.log('res_sale', res_sale)
  // console.log('res_trademark', res_trademark)
  loading.value = false
}

onMounted(() => {
  getBaseInfo()
})

watchEffect(() => {
  // 都大于 1 才会 获取详情
  if (Number(props.editItemId) < 1 || props.requestKey < 1) return
  getSpuItemDetail(props.editItemId)
})

/*  SPU销售属性 相关逻辑 */
// 当前品牌的全部的销售属性
const model_attr = ref<number | undefined>()
const saleAttrList = ref<BaseSaleAttrItem[]>([])
const saleAttrValueName_model = ref('')
const saleAttrValueName_adding = ref(false)

const handleSpuAttrValueDelete = (
  list: SpuPlusOrEditForm['spuSaleAttrList'],
  index: number,
) => {
  list.splice(index, 1)
}

const unSelectSaleAttrList = computed<BaseSaleAttrItem[]>(() => {
  return saleAttrList.value.filter((attr) => {
    return !form.value.spuSaleAttrList.some(
      (it) => it.saleAttrName === attr.name,
    )
  })
})

type SaleAttrItem = UnionOfArray<SpuPlusOrEditForm['spuSaleAttrList']>
const handleAddSaleAttr = () => {
  const select_attr = saleAttrList.value.find((s) => s.id === model_attr.value)
  const add_attr: Pick<
    SaleAttrItem,
    'baseSaleAttrId' | 'saleAttrName' | 'spuSaleAttrValueList'
  > = {
    baseSaleAttrId: select_attr?.id as number,
    saleAttrName: select_attr?.name as string,
    spuSaleAttrValueList: [],
  }
  form.value.spuSaleAttrList.push(add_attr as SaleAttrItem)
  model_attr.value = void 0
}

type SaleAttrValueNamePlus = SaleAttrItem & { isAdd: boolean }
const handleSaleAttrValueNamePlusBtnClick = (row: SaleAttrValueNamePlus) => {
  // console.log('handleAddSaleAttrValueName', row)
  row.isAdd = true
}

const handleSaleAttrValueNameIptAdd = (row: SaleAttrValueNamePlus) => {
  if (saleAttrValueName_adding.value) return
  saleAttrValueName_adding.value = true
  if (!saleAttrValueName_model.value) {
    ElMessage.error('value can not be empty')
    return
  }

  if (
    row.spuSaleAttrValueList.some(
      (it) => it.saleAttrValueName === saleAttrValueName_model.value,
    )
  ) {
    ElMessage.error('value can not be repeat')
    return
  }

  const { saleAttrName, baseSaleAttrId, spuId } = row
  const item: Omit<SaleAttrItem, 'spuSaleAttrValueList'> = {
    createTime: '',
    updateTime: '',
    isChecked: null,
    saleAttrName,
    baseSaleAttrId,
    spuId,
    saleAttrValueName: saleAttrValueName_model.value,
  }
  row.spuSaleAttrValueList.push(item)

  saleAttrValueName_model.value = ''
  Reflect.deleteProperty(row, 'isAdd')
  setTimeout(() => (saleAttrValueName_adding.value = false), 50)
}

const handleFormSubmit = async () => {
  /* 展示的图片列表与接收|保存时的图片字段类型不一致，需要做一下兼容 */
  form.value.spuImageList = spuImageList.value.map(
    (it: ShowSpuImageList): SpuImageItem => {
      return {
        createTime: it.createTime || '',
        updateTime: it.updateTime || '',
        spuId: form.value.id as number,
        imgName: it.name,
        imgUrl: it!.url || '',
      }
    },
  )

  /* 添加时的逻辑
  添加时缺少 category3Id
  把 id 去掉
  */
  const params = toRaw(unref(form))
  if (!params.category3Id) {
    params.category3Id = props.category3Id
  }
  if (!params.id) {
    Reflect.deleteProperty(params, 'id')
  }

  const res = await addOrUpdateSpuInfo(params)
  // console.log('save', res)
  if (res.code === 200) {
    ElMessage.success(res.message)
  } else {
    ElMessage.error(res.message)
  }
  handleCancel('updateList')
}

const handleCancel = (msg: ClosedEditPageMsg) => {
  form.value = createForm()
  setImageList([])
  emits('cancel', msg)
}
</script>
<style scoped lang="scss"></style>
