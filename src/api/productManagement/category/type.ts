import type { ResponseData } from '@/types/config/request'

export type categoryItem = {
  id: number
  category1Id?: number
  category2Id?: number
  name: string
  createTime: string
  updateTime: string
}

export type categoryResponseData = ResponseData & {
  data: categoryItem[]
}
