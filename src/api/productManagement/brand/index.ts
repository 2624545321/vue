import request from '@/plugins/axios'
import type {
  BaseTrademarkResponseData,
  BaseTrademarkItem,
} from '@/api/productManagement/brand/type'

enum URL {
  BASETRADEMARK = '/admin/product/baseTrademark/',
  ADDTRADEMARK = '/admin/product/baseTrademark/save',
  UPDATETRADEMARK = '/admin/product/baseTrademark/update',
}

/**
 * @desc 品牌列表
 * @param {number} page 请求参数
 * @param {number} limit 请求参数
 *
 * @return {Promise} 请求结果
 */
export const baseTrademark = (page: number, limit: number): Promise<any> =>
  request.get<any, BaseTrademarkResponseData>(
    URL.BASETRADEMARK + `${page}/${limit}`,
  )

/**
 * @desc 删除或者修改品牌
 * @param {BaseTrademarkItem} param 请求参数
 *
 * @return {Promise} 请求结果
 */
export const addOrUpdateTrademark = (param: BaseTrademarkItem) => {
  if (param.id) {
    return request.put<any, BaseTrademarkResponseData>(
      URL.UPDATETRADEMARK,
      param,
    )
  } else {
    return request.post<any, BaseTrademarkResponseData>(URL.ADDTRADEMARK, param)
  }
}
