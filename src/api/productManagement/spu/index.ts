import request from '@/plugins/axios'
import type { ResponseData } from '@/types/config/request'
import type {
  SpuProductListResponseData,
  SpuProductListReqestParams,
  SpuInfoResData,
  BaseSaleAttrListResData,
  spuItem,
} from '@/api/productManagement/spu/type'

enum URL {
  SPU_PRODUCTLIST = '/admin/product/',
  // 根据 id 获取商品详情
  SPUINFOBYID = '/admin/product/getSpuInfo/',
  // 全部的销售属性
  baseSaleAttrList = '/admin/product/baseSaleAttrList',
  // POST /admin/product/saveSpuInfo
  saveSpuInfo = '/admin/product/saveSpuInfo',
  // POST /admin/product/updateSpuInfo
  updateSpuInfo = '/admin/product/updateSpuInfo',
}

export const getSpuProductList = (
  params: SpuProductListReqestParams,
  pagination: ReqPagination,
) => {
  return request.get<any, SpuProductListResponseData>(
    URL.SPU_PRODUCTLIST + `${pagination.page}/${pagination.limit}`,
    { params },
  )
}

export const getSpuInfoById = (spuId: number) =>
  request.get<any, SpuInfoResData>(URL.SPUINFOBYID + spuId)

export const baseSaleAttrList = () =>
  request.get<any, BaseSaleAttrListResData>(URL.baseSaleAttrList)

export const addOrUpdateSpuInfo = (data: spuItem) => {
  if (data.id) {
    return request.post<any, ResponseData>(URL.saveSpuInfo, data)
  } else {
    return request.post<any, ResponseData>(URL.updateSpuInfo, data)
  }
}
