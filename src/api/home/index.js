import _axios from '@/plugins/axios'
const prefix = '/cas/spread2v/analysis/main.do?method='

/**
 * @desc 概览页顶部统计
 * @url /cas/spread2v/analysis/main.do?method=getOverviewTop
 */
export const getOverviewTop = params =>
  _axios.get(prefix + 'getOverviewTop', { params })

/**
 * @desc 《人民日报》传播概览
 * @url /cas/spread2v/analysis/main.do?method=getPropagateOverview
 */
export const getPropagateOverview = params =>
  _axios.get(prefix + 'getPropagateOverview', { params })

/**
 * @desc 媒体产品传播排行
 * @url /cas/spread2v/analysis/main.do?method=getMediaProductTop
 */
export const getMediaProductTop = params =>
  _axios.get(prefix + 'getMediaProductTop', { params })

/**
 * @desc 稿件传播排行
 * @url /cas/spread2v/analysis/main.do?method=getManuscriptDiffuseTop
 * mediaType：媒体渠道：APP、电子报、网站、微信
 */
export const getManuscriptDiffuseTop = params =>
  _axios.get(prefix + 'getManuscriptDiffuseTop', { params })

/**
 * @desc 重要媒体转载排行双环图
 * @url /cas/spread2v/analysis/main.do?method=getImportantMediaTransmitTop
 */
export const getImportantMediaTransmitTop = params =>
  _axios.get(prefix + 'getImportantMediaTransmitTop', { params })

/**
 * @desc 重要媒体转载排行Top10
 * @url /cas/spread2v/analysis/main.do?method=getImportantMediaTransmitTopList
 * @param { string } mediaType 媒体渠道：APP、微信、微博、电子报、第三方公众平台、网站
 */
export const getImportantMediaTransmitTopList = params =>
  _axios.get(prefix + 'getImportantMediaTransmitTopList', { params })
