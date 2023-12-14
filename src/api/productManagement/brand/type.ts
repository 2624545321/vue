import type { ResponseData } from '@/types/config/request'

export type BaseTrademarkItem = {
  id: number
  createTime: string
  updateTime: string
  tmName: string
  logoUrl: string
}

export type BaseTrademarkList = BaseTrademarkItem[]

export type BaseTrademarkResponseData = ResponseData & {
  data: {
    records: BaseTrademarkList
    orders: []
    optimizeCountSql: boolean
    hitCount: boolean
    countId: number | null
    maxLimit: number | null
    searchCount: boolean
    total: number
    size: number
    current: number
    pages: number
  }
}
