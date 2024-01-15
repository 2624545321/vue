import request from '@/plugins/axios'

import type { categoryResponseData } from '@/api/productManagement/category/type'

enum URL {
  getCategory1 = '/admin/product/getCategory1/',
  getCategory2 = '/admin/product/getCategory2/',
  getCategory3 = '/admin/product/getCategory3/',
}

/**
 * @desc 获取一级分类
 *
 * @return { Promise }
 */
export const getCategory1 = () =>
  request.get<any, categoryResponseData>(URL.getCategory1)

/**
 * @desc 获取二级分类
 * @param { number } cate2Id
 *
 * @return { Promise }
 */
export const getCategory2 = (cate2Id: number) =>
  request.get<any, categoryResponseData>(URL.getCategory2 + cate2Id)

/**
 * @desc 获取二级分类
 * @param { number } cate3Id
 *
 * @return { Promise }
 */
export const getCategory3 = (cate3Id: number) =>
  request.get<any, categoryResponseData>(URL.getCategory3 + cate3Id)
