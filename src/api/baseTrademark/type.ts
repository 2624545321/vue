import type { ResponseData } from '@/types/config/request'

export type TrademarkItem = {
  id: number
  createTime: string
  updateTime: string
  tmName: string
  logoUrl: string
}

export interface TrademarkListResData extends ResponseData {
  data: TrademarkItem[]
}
