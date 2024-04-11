import type { TableColumn } from '@/types/components/customEleTable'
// type
import type { SpuPlusOrEditForm } from '@/types/module/productManagement/spuManagement'
import type { SkuData } from '@/types'
/* spu related */
export const createSpuForm = (): SpuPlusOrEditForm => {
  return {
    createTime: '',
    id: 0,
    updateTime: '',
    spuName: '',
    description: '',
    tmId: '',
    spuSaleAttrList: [],
    spuImageList: [],
    spuPosterList: [],
  }
}

/* sku relate */
export const createSkuForm = (): SkuData => {
  return {
    category3Id: '',
    spuId: '', //已有的SPU的ID
    tmId: '', //SPU品牌的ID
    skuName: '', //sku名字
    price: '', //sku价格
    weight: '', //sku重量
    skuDesc: '', //sku的描述
    skuAttrValueList: [],
    skuSaleAttrValueList: [],
    skuDefaultImg: '', //sku图片地址
  }
}

export const createSkuTableColumn = (): TableColumn[] => {
  return [
    {
      width: '80',
      type: 'selection',
      align: 'center',
    },
    {
      label: '图片',
      // prop: 'imgUrl',
      slot: 'imgUrl',
    },
    {
      label: '名称',
      prop: 'imgName',
    },
    {
      label: '操作',
      slot: 'operation',
    },
  ]
}
