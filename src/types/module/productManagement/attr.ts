import type { Ref } from 'vue'
import type { AttrItem } from '@/api/productManagement/attr/type'

export type AttrInfoList = {
  data: Ref<AttrItem[]>
  error?: Ref<string | null>
}
