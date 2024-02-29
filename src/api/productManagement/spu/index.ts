import request from '@/plugins/axios'
import type {
  SpuProductListResponseData,
  SpuProductListReqestParams,
} from '@/api/productManagement/spu/type'

enum URL {
  SPU_PRODUCTLIST = '/admin/product/',
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
