import request from '@/plugins/axios'

import type { SkuData, SaveSkuInfoResponse } from '@/types'

enum Url {
  saveSkuInfo = '/admin/product/saveSkuInfo',
}

export const saveSkuInfo = (data: SkuData) =>
  request.post<any, SaveSkuInfoResponse>(Url.saveSkuInfo, data)
