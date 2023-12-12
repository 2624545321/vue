import request from '@/plugins/axios'

enum URL {
  BASETRADEMARK = '/admin/product/baseTrademark/',
}

/**
 * @desc 品牌列表
 * @param { UserLoginRequestParmeter } data 请求参数
 *
 * @return { Promise } 请求结果
 */
export const baseTrademark = (page: number, limit: number) =>
  request.get(URL.BASETRADEMARK + `${page}/${limit}`)
