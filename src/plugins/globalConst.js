import { deepFreeze } from './utils'

/**
 * @desc 渠道类型
 * @warn 不要改字段值，新加需求的话可以给新增字段
 */
const channelType = [
  { label: '报纸', value: '电子报', key: '5' },
  { label: '网站', value: '网站', key: '1' },
  { label: 'APP', value: 'APP', key: '7' },
  { label: '微信', value: '微信', key: '8' },
  { label: '微博', value: '微博', key: '4' },
  { label: '订阅号', value: '第三方公众平台', key: '18' },
  { label: '视频号', value: '视频号', key: '19' },
  { label: '海外媒体', value: '海外媒体', key: '' },
]

export default {
  install(Vue) {
    Vue.prototype.channelType = deepFreeze({
      newspaper: channelType.at(0),
      website: channelType.at(1),
      client: channelType.at(2),
      weixin: channelType.at(3),
      weibo: channelType.at(4),
      dingyuehao: channelType.at(5),
      tiktok: channelType.at(6),
      haiwaimeiti: channelType.at(7),
    })
    Vue.prototype.channelList = Object.freeze(channelType)
  },
}
