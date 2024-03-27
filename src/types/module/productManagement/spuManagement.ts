import type { spuItem } from '@/api/productManagement/spu/type'
import type { UploadUserFile } from 'element-plus'

export type SpuPlusOrEditForm = spuItem

type Time = {
  createTime: string
  updateTime: string
}
export type ShowSpuImageList = UploadUserFile & Partial<Time>

export type ClosedEditPageMsg = 'updateList'
