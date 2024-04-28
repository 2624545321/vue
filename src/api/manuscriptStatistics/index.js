import _axios from '@/plugins/axios'
const prefix = '/cas/spread2v/homepage/main.do?method='

/**
 * @desc 原创传播-稿件列表分页
 *
 * @url /cas/spread2v/homepage/main.do?method=getArticlePage
 *
params {
        title：标题，
        author：作者，
        docChannel：频道
        mediaType：渠道，（微信，微博，APP,电子报，第三方公众平台，网站）
        mediaName：媒体产品，
        startDate：发布开始时间，
        endDate：发布结束时间，
        page:页码，
        pageSize:每页大小，
    }
*/
export const getArticlePage = params =>
  _axios.get(prefix + 'getArticlePage', { params })

/**
 * @desc 原创传播-全部媒体下拉列表
 *
 * @url /cas/spread2v/homepage/main.do?method=getAllMediaList
 *
 */
export const getAllMediaList = params =>
  _axios.get(prefix + 'getAllMediaList', { params })

/**
 * @desc 原创传播-稿件列表导出
 * 
 * @url /cas/spread2v/homfepage/main.do?method=exportArticle
 *  startDate：发布开始时间，
    endDate：发布结束时间，
    title：标题，
    mediaType：渠道，（微信，微博，APP,电子报，第三方公众平台，网站）
    mediaName：媒体产品，
    author：作者，
    docChannel：频道
 */
export const exportArticle = params =>
  _axios.get(prefix + 'exportArticle', {
    params,
    responseType: 'blob',
    loading: true,
  })
