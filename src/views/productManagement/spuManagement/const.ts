import type { TableColumn } from '@/types/components/customEleTable'
// type
import type { SpuPlusOrEditForm } from '@/types/module/productManagement/spuManagement'

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

export const createSkuTableColumn = (): TableColumn[] => {
  return [
    {
      width: '80',
      type: 'selection',
      align: 'center',
    },
    {
      label: '图片',
      prop: 'saleAttrName',
    },
    {
      label: '名称',
      slot: 'saleAttrName',
    },
    {
      label: '操作',
      slot: 'operation',
    },
  ]
}
