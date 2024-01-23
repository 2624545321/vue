import request from '@/plugins/axios'

import type {
  AttrResponseData,
  AttrItem,
} from '@/api/productManagement/attr/type'

enum URL {
  ATTRINFOLIST = '/admin/product/attrInfoList/',
  ATTRADDORUPDATEATTRINFO = '/admin/product/saveAttrInfo',
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
/**
 * @desc 添加或者更新属性信息
 * @param { AttrItem } attr 添加或者修改的属性
 *
 * @return { Promise }
 */
export const attrAddOrUpdateAttrInfo = (attr: AttrItem) =>
  request.post<any, AttrResponseData>(URL.ATTRADDORUPDATEATTRINFO, attr)
