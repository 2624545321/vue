import moment from 'moment'
import { getDateRang } from '@/utils/timeFormat'
import { deepFreeze } from '@/plugins/utils'

const createForm = () => ({
  
})

/**
 * @desc 详情页的tab
 */
export const tabList = deepFreeze([
  { symbol: 'newspaper', zh: '报纸榜单', reveal: true },
  { symbol: 'website', zh: '网站榜单', reveal: false },
  { symbol: 'client', zh: '客户端榜单', reveal: false },
  { symbol: 'weixin', zh: '微信榜单', reveal: false },
  { symbol: 'weibo', zh: '微博榜单', reveal: false },
  { symbol: 'dingyuehao', zh: '订阅号榜单', reveal: false },
  { symbol: 'tiktok', zh: '短视频榜单', reveal: false },
  // { symbol: 'haiwaimeiti', zh: '海外媒体榜单', reveal: true },
])

/**
 * @desc 详情页的二级tab
 */
export const tabSubList = deepFreeze([
  {
    symbol: 'dingyuehao',
    zh: '订阅号榜单',
    children: [
      { zh: '头条号', symbol: 'touTiaoHao' },
      { zh: '百家号', symbol: 'baiJiaHao' },
      { zh: '强国号', symbol: 'qiangGuoHao' },
    ],
  },
  {
    symbol: 'tiktok',
    zh: '短视频榜单',
    children: [
      { zh: '抖音', symbol: 'tiktok' },
      { zh: '快手', symbol: 'kuaiShou' },
      { zh: 'b站', symbol: 'biliBili' },
    ],
  },
])

/**
 * @desc 日期榜单
 */
export const dateRank = deepFreeze([
  { label: '日榜', value: getDateRang('yesterday'), field: 'day' },
  { label: '周榜', value: getDateRang('week'), field: 'week' },
  { label: '月榜', value: getDateRang('month'), field: 'month' },
  { label: '季榜', value: getDateRang('quarter'), field: 'quarter' },
  { label: '年榜', value: getDateRang('year'), field: 'year' },
])

const _format = 'YYYY-MM-DD'
const _getWeekRange = () => {
  const _res = []

  const currentDate = moment()
  for (let i = 1; i <= 20; i++) {
    const startOfWeek = currentDate
      .startOf('week')
      .subtract(2, 'weeks')
      .add(1, 'd')
      .format(_format)
    const _d = currentDate.clone()
    const endOfWeek = _d
      .endOf('week')
      .add(1, 'd')
      .format(_format)
    
    _res.push({ label: startOfWeek + ' - ' + endOfWeek })
  }
  return _res
}

const _getMonthRange = () => {
  const _res = []

  const currentDate = moment()
  for (let i = 1; i <= 10; i++) {
    let startOfMonth = currentDate
      .startOf('month')
      .subtract(1, 'month')
      .format(_format)
    let endOfMonth = currentDate.endOf('month').format(_format)
    _res.push({ label: startOfMonth + ' - ' + endOfMonth })
  }
  return _res
}

const _getQuarterRange = () => {
  const _res = []
  const currentDate = moment()
  for (let i = 1; i <= 8; i++) {
    let startOfQuarter = currentDate
      .startOf('quarter')
      .subtract(1, 'quarter')
      .format(_format)
    let endOfQuarter = currentDate.endOf('quarter').format(_format)
    _res.push({ label: startOfQuarter + ' - ' + endOfQuarter })
  }
  return _res
}

const _getYearRange = () => {
  const _res = []

  const moment = require('moment') // 导入 Moment.js
  // 获取当前日期
  const currentDate = moment()

  for (let i = 1; i <= 4; i++) {
    // 设置为本年第一天（1月1号）
    const startOfYear = currentDate
      .startOf('year')
      .subtract(1, 'year')
      .format(_format)
    // 设置为下一年最后一天（12月31号）
    const endOfYear = currentDate.endOf('year').format(_format)
    _res.push({ label: startOfYear + ' - ' + endOfYear })
  }

  return _res
}

/**
 * @desc 日期榜单 对应的时间区间
 */
export const dateRank_timeRange = deepFreeze({
  week: _getWeekRange(),
  month: _getMonthRange(),
  quarter: _getQuarterRange(),
  year: _getYearRange(),
})
