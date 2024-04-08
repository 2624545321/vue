import type { spuItem } from '@/api/productManagement/spu/type'
import type { UploadUserFile } from 'element-plus'

export type SpuPlusOrEditForm = spuItem

type Time = {
  createTime: string
  updateTime: string
}
export type ShowSpuImageList = UploadUserFile & Partial<Time>

const a = ['updateList', 'cancel'] as const
export type ClosedEditPageMsg = (typeof a)[number]

export interface Emits_Custom {
  (e: 'cancel', v: ClosedEditPageMsg): void
}
