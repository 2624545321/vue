import request from '@/plugins/axios'
import type { BaseTrademarkResponseData } from '@/api/productManagement/brand/type'

enum URL {
  BASETRADEMARK = '/admin/product/baseTrademark/',
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
