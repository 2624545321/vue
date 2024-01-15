import type { ResponseData } from '@/types/config/request'

type AttrValueItem = {
  attrId: number
  createTime: Date
  id: number
  updateTime: Date
  valueName: string
}

export type AttrItem = {
  attrName: string
  categoryId: number
  categoryLevel: number
  createTime: Date
  id: number
  updateTime: Date
  attrValueList: AttrValueItem[]
}

export type AttrResponseData = {
  data: AttrItem[]
} & ResponseData
