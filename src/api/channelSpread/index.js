import _axios from '@/plugins/axios'
const prefix = '/cas/spread2v/homepage/main.do?method='

/**
 * @desc 渠道传播类型列表
 * @url /cas/spread2v/homepage/main.do?method=getChannelPropagate
 */
export const getChannelPropagate = params =>
  _axios.get(prefix + 'getChannelPropagate', { params })

/**
 * @desc 媒体产品分类下拉
 * @url /cas/spread2v/homepage/main.do?method=getMediaProductTypeList
 * @param
 *  channelCode	媒体渠道（7=APP，19=视频号，18=订阅号，4=微博，8=微信，5=报纸，1=网站）
 *  unitId	单位id
 */
export const getMediaProductTypeList = params =>
  _axios.get(prefix + 'getMediaProductTypeList', { params })

/**
 * @desc 渠道传播-传播力榜单列表（媒体单位传播共用）
 * @url   /cas/spread2v/homepage/main.do?method=getDiffuseTop
 * @param
 *  page:页码
    pageSize:每页大小，
    startDate：发布开始时间
    endDate：发布结束时间
    productType：产品分类
    siteName：媒体名称
    infoType：媒体渠道（7=APP，19=视频号，18=订阅号，4=微博，8=微信，5=报纸，1=网站）
    channel：渠道（抖音，快手，B站，强国号，头条号、百家号等）
    cycle：周期（day=按天排行，week=按周排行，month=按月排行，quarter=按季排行，year=按年排行）
    unitName：媒体单位名称
    sortField：排序字段
    sort：desc=倒序，asc=正序
 */
export const getDiffuseTop = params =>
  _axios.get(prefix + 'getDiffuseTop', { params })

/**
 * @desc  渠道传播-传播力榜单列表导出（媒体单位传播共用）
 * @url /cas/spread2v/homepage/main.do?method=exportDiffuseTop
 * @param
 *  page:页码
    pageSize:每页大小
    startDate：发布开始时间
    endDate：发布结束时间
    productType：产品分类
    siteName：媒体名称
    infoType：媒体渠道（7=APP，19=视频号，18=订阅号，4=微博，8=微信，5=报纸，1=网站）
    channel：渠道（抖音，快手，B站，强国号，头条号、百家号等）
    cycle：周期（day=按天排行，week=按周排行，month=按月排行，quarter=按季排行，year=按年排行）
    unitName：媒体单位名称
    sortField：排序字段
    sort：desc=倒序，asc=正序
 */
export const exportDiffuseTop = params =>
  _axios.get(prefix + 'exportDiffuseTop', {
    params,
    responseType: 'blob',
    loading: true,
  })

/**
 * @desc  渠道传播-传播力榜单文章列表（媒体单位传播共用）
 * @url /cas/spread2v/homepage/main.do?method=getDiffuseDocTop
 * @param 
 *  page:页码，
    pageSize:每页大小，
    startDate：发布开始时间，
    endDate：发布结束时间，
    productType：产品分类，
    siteName：媒体名称，
    infoType：媒体渠道（7=APP，19=视频号，18=订阅号，4=微博，8=微信，5=报纸，1=网站）
    channel：渠道（抖音，快手，B站，强国号，头条号、百家号等）
    cycle：周期（day=按天排行，week=按周排行，month=按月排行，quarter=按季排行，year=按年排行）
    unitName：媒体单位名称
    sortField：排序字段
    sort：desc=倒序，asc=正序
 */
export const getDiffuseDocTop = params =>
  _axios.get(prefix + 'getDiffuseDocTop', { params })

/**
 * @desc  渠道传播-传播力榜单列表导出（媒体单位传播共用）
 * @url /cas/spread2v/homepage/main.do?method=exportDiffuseDocTop
 * @param
 *  page:页码
    pageSize:每页大小
    startDate：发布开始时间
    endDate：发布结束时间
    productType：产品分类
    siteName：媒体名称
    infoType：媒体渠道（7=APP，19=视频号，18=订阅号，4=微博，8=微信，5=报纸，1=网站）
    channel：渠道（抖音，快手，B站，强国号，头条号、百家号等）
    cycle：周期（day=按天排行，week=按周排行，month=按月排行，quarter=按季排行，year=按年排行）
    unitName：媒体单位名称
    sortField：排序字段
    sort：desc=倒序，asc=正序
 */
export const exportDiffuseDocTop = params =>
  _axios.get(prefix + 'exportDiffuseDocTop', {
    params,
    responseType: 'blob',
    loading: true,
  })
