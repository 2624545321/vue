import request from '@/plugins/axios'

import type { AttrResponseData } from '@/api/productManagement/attr/type'

enum URL {
  ATTRINFOLIST = '/admin/product/attrInfoList/',
}

/**
 * @desc 获取属性列表
 * @param { number } c1Id
 * @param { number } c2Id
 * @param { number } c3Id
 *
 * @return { Promise }
 */
export const attrInfoList = (c1Id: number, c2Id: number, c3Id: number) =>
  request.get<any, AttrResponseData>(
    URL.ATTRINFOLIST + `${c1Id}/${c2Id}/${c3Id}`,
  )
