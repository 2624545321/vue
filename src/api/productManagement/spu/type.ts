import type { ResponseData } from '@/types/config/request'

export type SpuProductListReqestParams = {
  category3Id: number | string
}

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
