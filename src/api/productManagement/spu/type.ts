import type { ResponseData } from '@/types/config/request'

export type SpuProductListReqestParams = {
  category3Id: number | string
}

/* 列表相关 */
export type SpuProductItem = {
  id: number
  createTime: string
  updateTime: string
  spuName: string
  description: string
  category3Id: string | number
  tmId: number
  spuSaleAttrList: null
  spuImageList: null
  spuPosterList: null
}

export interface SpuProductListResponseData extends ResponseData {
  data: {
    records: SpuProductItem[]
    total: number
    size: number
    current: number
    orders: any[]
    optimizeCountSql: boolean
    hitCount: boolean
    countId: null
    maxLimit: null
    searchCount: boolean
    pages: boolean
  }
}

/* spu info */
type BaseItem = {
  id?: number
  createTime: string
  updateTime: string
  spuId: number
}

// 销售属性
export type SpuSaleAttrItem = BaseItem & {
  baseSaleAttrId: number
  saleAttrValueName?: string
  saleAttrName: string
  isChecked: null
  spuSaleAttrValueList: Omit<SpuSaleAttrItem, 'spuSaleAttrValueList'>[]
}

// type Sp = Omit<SpuSaleAttrItem, 'spuSaleAttrValueList'>

// 图片数据
export type SpuImageItem = BaseItem & {
  imgName: string
  imgUrl: string
}

/* 某个spu的信息 */
type b = Omit<BaseItem, 'spuId'>
export type spuItem = b & {
  spuName: string
  description: string
  category3Id?: number
  tmId: number
  spuSaleAttrList: SpuSaleAttrItem[]
  spuImageList: SpuImageItem[]
  spuPosterList: SpuImageItem[]
}

export interface SpuInfoResData extends ResponseData {
  data: spuItem
}

/* 销售属性 */
export type BaseSaleAttrItem = b & {
  name: string
}
export interface BaseSaleAttrListResData extends ResponseData {
  data: BaseSaleAttrItem[]
}
