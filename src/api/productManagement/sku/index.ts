import request from '@/plugins/axios'

import type { SkuData, SaveSkuInfoResponse, FindBySpuIdResponse } from '@/types'

enum Url {
  saveSkuInfo = '/admin/product/saveSkuInfo',
  // GET /admin/product/findBySpuId/{spuId}
  findBySpuId = '/admin/product/findBySpuId/',
}

export const saveSkuInfo = (data: SkuData) =>
  request.post<any, SaveSkuInfoResponse>(Url.saveSkuInfo, data)

export const findBySpuId = (spuId: number) =>
  request.get<any, FindBySpuIdResponse>(Url.findBySpuId + spuId)
