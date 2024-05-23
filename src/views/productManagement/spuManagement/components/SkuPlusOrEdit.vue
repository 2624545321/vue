<template>
  <el-form
    label-width="80"
    label-position="left"
    @submit.prevent="handleSkuFormSubmit"
  >
    <el-form-item label="SKU名称">
      <el-input v-model="form.skuName" placeholder="请输入" />
    </el-form-item>

    <el-form-item label="价格(元)">
      <el-input v-model="form.price" placeholder="请输入" type="number" />
    </el-form-item>

    <el-form-item label="重量(g)">
      <el-input v-model="form.weight" placeholder="请输入" />
    </el-form-item>

    <el-form-item label="SKU描述">
      <el-input v-model="form.skuDesc" placeholder="请输入" type="textarea" />
    </el-form-item>

    <el-form-item label="销售属性">
      <el-form inline>
        <el-form-item
          v-for="(it, i) of spuInfo.spuSaleAttrList"
          :key="i"
          :label="it.saleAttrName"
        >
          <el-select v-model="form.skuSaleAttrValueList[i]" value-key="id">
            <el-option
              v-for="av of it.spuSaleAttrValueList"
              :key="av.id"
              :label="av.saleAttrValueName"
              :value="av"
            ></el-option>
          </el-select>
        </el-form-item>
      </el-form>
    </el-form-item>

    <el-form-item label="平台属性">
      <el-form inline>
        <el-form-item
          v-for="(it, i) of platformAttr"
          :key="i"
          :label="it.attrName"
        >
          <el-select v-model="form.skuAttrValueList[i]" value-key="attrId">
            <el-option
              v-for="av of it.attrValueList"
              :key="av.attrId"
              :label="av.valueName"
              :value="av"
            ></el-option>
          </el-select>
        </el-form-item>
      </el-form>
    </el-form-item>

    <el-form-item label="图片名称">
      <custom-ele-table
        ref="imageTableRef"
        :table-column="tableColumn"
        :data="spuInfo.spuImageList"
        border
        class="mt-4 mb-4"
      >
        <template #imgUrl="scope">
          <el-image
            fit="contain"
            :preview-teleported="true"
            :src="scope.row.imgUrl"
            :preview-src-list="[scope.row.imgUrl]"
          />
        </template>

        <template #operation="{ row }">
          <el-button
            size="small"
            type="primary"
            text
            bg
            :disabled="form.skuDefaultImg === row.imgUrl"
            @click="handleTableImageDefault(row)"
          >
            设为默认
          </el-button>
        </template>
      </custom-ele-table>
    </el-form-item>

    <el-form-item>
      <el-button type="primary" native-type="submit">保存</el-button>
      <el-button class="ml-5" @click="handleCancel('cancel')">取消</el-button>
    </el-form-item>
  </el-form>
</template>
<script lang="ts" setup>
import { ref, watchEffect } from 'vue'
// const
import { createSkuTableColumn, createSkuForm, createSpuForm } from './../const'
// type
import type {
  ClosedEditPageMsg,
  Custom_Emits,
  Custom_Props,
} from '@/types/module/productManagement/spuManagement'
import type { AttrItem } from '@/api/productManagement/attr/type'
import type { SpuImageItem } from '@/api/productManagement/spu/type'
import type { CustomEleTableInstance } from '@/types/components/customEleTable'
// request
import { getSpuInfoById } from '@/api/productManagement/spu'
import { saveSkuInfo } from '@/api/productManagement/sku'
// hooks
import { useAttrInfoList } from '@/hooks/modue/useProductManagement'
// utils
import { cloneDeep } from '@/utils'
import { ElMessage } from 'element-plus'

const props = withDefaults(defineProps<Custom_Props>(), {
  requestKey: -1,
  editItemId: -1,
})

const emits = defineEmits<Custom_Emits>()

const loading = ref<boolean>(false)
// form 表单
const spuInfo = ref(createSpuForm())
const form = ref(createSkuForm())

// 平台 属性
let platformAttr = ref<AttrItem[]>([])

// 图片
// const imageTable = ref<TableInstance>()
let imageTableRef = ref<CustomEleTableInstance>()
const tableColumn = createSkuTableColumn()
const handleTableImageDefault = (row: SpuImageItem) => {
  form.value.skuDefaultImg = row.imgUrl
  imageTableRef.value?.$table?.clearSelection()
  imageTableRef.value?.$table?.toggleRowSelection(row, true)
}

/**
 * @desc 页面显示时 获取对应 sku 相关数据
 */
const getSpuItemDetail = async (
  spuId: number | string,
  cateValue: Custom_Props['cateValue'],
) => {
  loading.value = true
  // 对应的详情，用于图片、销售属性展示
  const res_info = await getSpuInfoById(spuId as number)
  if (res_info.code === 200) {
    spuInfo.value = res_info.data || createSpuForm()
  } else {
    spuInfo.value = createSpuForm()
  }

  // 平台属性的展示
  // const res_attr = await useAttrInfoList(cateValue, (res) => {
  //   loading.value = false
  //   platformAttr.value = res.data.value
  // })
  const res_attr = await useAttrInfoList(cateValue)
  platformAttr.value = res_attr!.data.value
}

watchEffect(() => {
  // 都大于 1 才会 获取详情
  if (Number(props.editItemId) < 1 || props.requestKey < 1) return
  getSpuItemDetail(props.editItemId, props.cateValue)
})

const handleCancel = (msg: ClosedEditPageMsg) => {
  // console.log('msg', msg)
  form.value = createSkuForm()
  emits('cancel', msg)
}

const handleSkuFormSubmit = async () => {
  const _formData = cloneDeep(form.value)
  _formData.skuAttrValueList = _formData.skuAttrValueList.filter(
    (it) => it != undefined,
  )
  _formData.skuAttrValueList = _formData.skuAttrValueList.filter(
    (it) => it != undefined,
  )
  _formData.category3Id = spuInfo.value.category3Id as number
  _formData.spuId = spuInfo.value.id as number
  _formData.tmId = spuInfo.value.tmId

  try {
    const res = await saveSkuInfo(_formData)
    if (res.code === 200) {
      ElMessage.success(res.message)
    } else ElMessage.error(res.message)
  } catch (error: any) {
    ElMessage.error(error)
  }
}
</script>
<style scoped lang="scss"></style>
