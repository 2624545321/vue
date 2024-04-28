import _axios from '@/plugins/axios'
const prefix = '/cas/spread2v/analysis/main.do?method='

/**
 * @desc 发文列表
 * /cas/spread2v/analysis/main.do?method=getMediaArticleList
 *  pageNo：页码
    pageSize：分页大小
    mediaName：媒体名称
    startDate：开始时间
    endDate：结束时间
    infoType：媒体渠道（7=APP，19=视频号，18=订阅号，4=微博，8=微信，5=报纸，1=网站）
 */
export const getMediaArticleList = params => {
  return _axios.get(prefix + 'getMediaArticleList', { params })
}
/**
 * @desc 榜单媒体详情顶部统计
 * /cas/spread2v/analysis/main.do?method=getMediaOverviewTop
 */
export const getMediaOverviewTop = params => {
  return _axios.get(prefix + 'getMediaOverviewTop', { params })
}
