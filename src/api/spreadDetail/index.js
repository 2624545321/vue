import _axios from '@/plugins/axios'
const prefix = '/cas/spread2v/homepage/main.do?method='

/**
 * @desc 稿件标题
 *
 * @url /cas/xhs/articleDetail/main.do?method=searchCeiToOutServiceModi
 *
 */
export const searchCeiToOutServiceModi = params =>
  _axios.get('/cas/xhs/bigScreen/main.do', { params })


/**
 * @desc 关键指标
 *
 * @url /cas/spread2v/homepage/main.do?method=getKeyIndex
 *
 */
export const getKeyIndex = params =>
  _axios.get(prefix + 'getKeyIndex', { params })


/**
 * @desc 内部媒体刊发
 *
 * @url /cas/xhs/articleDetail/main.do?method=getUnitMediaReprints
 */
export const getUnitMediaReprints = params =>
  _axios.get('/cas/xhs/articleDetail/main.do?method=getUnitMediaReprints', {
    params,
  })

/**
 * @desc 外部媒体转载
 *
 * @url /cas/xhs/articleDetail/main.do?method=getAllLev
 */
export const getAllLev = params =>
  _axios.get('/cas/xhs/articleDetail/main.do?method=getAllLev', { params })

/**
 * @desc 转载媒体地域分布
 *
 * @url /cas/spread2v/homepage/main.do?method=getReprintMediaArea
 */
export const getReprintMediaArea = params =>
  _axios.get(prefix + 'getReprintMediaArea', { params })

/**
 * @desc 传播渠道分布
 *
 * @url /cas/spread2v/homepage/main.do?method=getDiffuseMediaType
 *
 * params={"zbGuid":"4d1e4cfef58f1fd5"}
 */
export const getDiffuseMediaType = params =>
  _axios.get(prefix + 'getDiffuseMediaType', { params })

/**
 * @desc 转载趋势分析
 *
 * @url /cas/spread2v/homepage/main.do?method=getPropagationTendencyAnalysis
 */
export const getPropagationTendencyAnalysis = params =>
  _axios.get(prefix + 'getPropagationTendencyAnalysis', { params })

/**
 * @desc 转载趋势分析 -> 文章详情用的
 * 
 * @url /cas/spread2v/homepage/main.do?method=getPropagationTendencyAnalysis
 */
export const getPropagationTendencyAnalysisDoc = params =>
  _axios.get(prefix + 'getPropagationTendencyAnalysisDoc', { params })

/**
 * @desc 转载媒体排行
 *
 * @url /cas/spread2v/homepage/main.do?method=getReprintMediaTop
 */
export const getReprintMediaTop = params =>
  _axios.get(prefix + 'getReprintMediaTop', { params })

/**
 * @desc 传播路径分析
 *
 * @url http://124.127.249.216/cas/xhs/bigScreen/main.do?method=getExReprintMaualsByGUID
 *  method: getExReprintMaualsByGUID
    zbGuid: 5065151
    mc: 证券日报
 */
export const getExReprintMaualsByGUID = params =>
  _axios.get('/cas/xhs/bigScreen/main.do?method=getExReprintMaualsByGUID', {
    params,
  })
