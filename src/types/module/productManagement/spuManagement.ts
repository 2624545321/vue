import type { spuItem } from '@/api/productManagement/spu/type'
import type { UploadUserFile } from 'element-plus'
import { TrademarkCategoryProps } from '@/types/components/productManagement.ts'

export type SpuPlusOrEditForm = spuItem

/* 场景展示 */
const sceneArr = ['tableShow', 'spuPlusOrEdit', 'skuPlusOrEdit'] as const
export type Scene = (typeof sceneArr)[number]

/* spu 展示图片 */
type Time = {
  createTime: string
  updateTime: string
}
export type ShowSpuImageList = UploadUserFile & Partial<Time>

/* 取消按钮 */
const a = ['updateList', 'cancel'] as const
export type ClosedEditPageMsg = (typeof a)[number]

/* props | emits */
export interface Custom_Emits {
  (e: 'cancel', v: ClosedEditPageMsg): void
}

// type CateValue = Pick<TrademarkCategoryProps, 'cateValue'>
type CateValue = TrademarkCategoryProps['cateValue']
export interface Custom_Props {
  category3Id?: number | string
  requestKey: number // 监听变化，变化时说明点击了编辑，请求数据
  editItemId: number | string // 点击编辑的数据项的 id
  cateValue?: CateValue
}
