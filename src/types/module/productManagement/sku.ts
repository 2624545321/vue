import type { ResponseData } from '@/types'

export interface SkuAttrValueItem {
  attrId: number | string //平台属性的ID
  valueId: number | string //属性值的ID
}

export interface SkuSaleAttrValueItem {
  saleAttrId: number | string //属性ID
  saleAttrValueId: number | string //属性值的ID
}
export interface SkuData {
  category3Id: string | number //三级分类的ID
  spuId: string | number //已有的SPU的ID
  tmId: string | number //SPU品牌的ID
  skuName: string //sku名字
  price: string | number //sku价格
  weight: string | number //sku重量
  skuDesc: string //sku的描述
  skuAttrValueList: SkuAttrValueItem[]
  skuSaleAttrValueList: SkuSaleAttrValueItem[]
  skuDefaultImg: string //sku图片地址
}

export interface SaveSkuInfoResponse extends ResponseData {
  // data: SkuData
}
