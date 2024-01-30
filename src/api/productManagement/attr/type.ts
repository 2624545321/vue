import type { ResponseData } from '@/types/config/request'

/* 创建时间和更新时间是后端坐，前端添加时不需要 */
export type AttrValueItem = {
  attrId?: number
  createTime?: Date | string
  id?: number
  updateTime?: Date | string
  valueName: string
  isEdit?: boolean
}

export type AttrItem = {
  attrName: string
  categoryId: number | string
  categoryLevel: number
  createTime?: Date | string
  id?: number
  updateTime?: Date | string
  attrValueList: AttrValueItem[]
}

export type AttrResponseData = {
  data: AttrItem[]
} & ResponseData
