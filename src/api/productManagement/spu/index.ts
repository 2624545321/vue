import request from '@/plugins/axios'
import type {
  SpuProductListResponseData,
  SpuProductListReqestParams,
  SpuInfoResData,
  BaseSaleAttrListResData,
} from '@/api/productManagement/spu/type'

enum URL {
  SPU_PRODUCTLIST = '/admin/product/',
  // 根据 id 获取商品详情
  SPUINFOBYID = '/admin/product/getSpuInfo/',
  // 全部的销售属性
  baseSaleAttrList = '/admin/product/baseSaleAttrList',
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
