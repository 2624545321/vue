import Layout from '@/layout'

const component_detail = () =>
  import('@/views/channelSpread/channelSpreadDetail/ChannelSpreadDetail')

export default {
  path: '/channel',
  component: Layout,
  redirect: '/channel/spread',
  meta: { noRevealInMenu: false, title: '渠道传播', image: 'qudaochuanbo' },
  children: [
    {
      path: 'spread',
      name: 'channelSpread',
      component: () => import('@/views/channelSpread/Index'),
      meta: { title: '数据统计' },
    },
    {
      path: 'detail_newspaper',
      name: 'channelSpreadDetail_newspaper',
      // redirect: '/channel/detail',
      query: { symbol: 'newspaper' },
      component: component_detail,
      meta: { title: '报纸榜单' },
    },
    {
      path: 'detail_website',
      name: 'channelSpreadDetail_website',
      query: { symbol: 'website' },
      component: component_detail,
      meta: { title: '网站榜单' },
    },
    {
      path: 'detail_client',
      name: 'channelSpreadDetail_client',
      query: { symbol: 'client' },
      component: component_detail,
      meta: { title: '客户端榜单' },
    },
    {
      path: 'detail_weixin',
      name: 'channelSpreadDetail_weixin',
      query: { symbol: 'weixin' },
      component: component_detail,
      meta: { title: '微信榜单' },
    },
    {
      path: 'detail_weibo',
      name: 'channelSpreadDetail_weibo',
      query: { symbol: 'weibo' },
      component: component_detail,
      meta: { title: '微博榜单' },
    },
    {
      path: 'detail_tiktok',
      name: 'channelSpreadDetail_tiktok',
      query: { symbol: 'tiktok' },
      component: component_detail,
      meta: { title: '短视频榜单' },
    },
    {
      path: 'detail_dingyuehao',
      name: 'channelSpreadDetail_dingyuehao',
      query: { symbol: 'dingyuehao' },
      component: component_detail,
      meta: { title: '订阅号榜单' },
    },
    // {
    //   path: 'detail_haiwaimeiti',
    //   name: 'channelSpreadDetail_haiwaimeiti',
    //   query: { symbol: 'haiwaimeiti' },
    //   component: component_detail,
    //   meta: { title: '海外媒体' },
    // },
    // {
    //   path: 'detail',
    //   name: 'channelSpreadDetail',
    //   hidden: true,
    //   component: () =>
    //     import('@/views/channelSpread/channelSpreadDetail/ChannelSpreadDetail'),
    //   meta: { title: '渠道传播详情', noRevealInMenu: true },
    // },
  ],
}
