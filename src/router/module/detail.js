export default [
  {
    path: '/spreadDatail', // 原创传播传播详情
    name: 'spreadDatail',
    component: () => import('@/views/detail/spreadDetail/Index'),
  },
  {
    path: '/mediaProdDetail', // 媒体产品详情
    name: 'mediaProdDetail',
    component: () => import('@/views/detail/mediaProdDetail/mediaProdDetail.vue'),
  },
]
