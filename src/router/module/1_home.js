import Layout from '@/layout'
export default {
  path: '/',
  component: Layout,
  redirect: '/home',
  // alwaysShow: false,
  // name: '主页',
  meta: { title: '主页', icon: 'dashboard' },
  children: [
    {
      path: 'home',
      name: 'home',
      component: () => import('@/views/home/index'),
      meta: {
        title: '传播概览',
        icon: 'dashboard',
        breadcrumb: false,
        image: 'chuanbogailan',
      },
    },
  ],
}
