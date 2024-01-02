import type { BaseTrademarkItem } from '@/api/productManagement/brand/type'

export interface DialogStatus {
  visible: boolean
  title: string
  formData: BaseTrademarkItem
}
