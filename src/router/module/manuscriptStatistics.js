import Layout from '@/layout'
export default {
  path: '/manuscript',
  component: Layout,
  hidden: true,
  redirect: '/manuscript/statistics',
  children: [
    {
      path: 'statistics',
      name: 'manuStatistics',
      component: () => import('@/views/manuscriptStatistics/Statistics'),
      meta: { title: '稿件统计', image: 'gaojiantongji' },
    },
  ],
}
