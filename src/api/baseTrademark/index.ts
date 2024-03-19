import request from '@/plugins/axios'
import type { TrademarkListResData } from '@/api/baseTrademark/type'

enum URL {
  // 品牌列表
  TRADEMARKLIST = '/admin/product/baseTrademark/getTrademarkList',
}

export const getBaseTrademarkList = () =>
  request.get<any, TrademarkListResData>(URL.TRADEMARKLIST)
