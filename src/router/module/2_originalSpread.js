import Layout from '@/layout'
export default {
  path: '/original',
  component: Layout,
  redirect: '/original/spread',
  children: [
    {
      path: 'spread',
      name: 'originalSpread',
      component: () => import('@/views/originalSpread/Spread'),
      meta: { title: '原创传播', image: 'yaunchuangchuanbo' },
    },
  ],
}
