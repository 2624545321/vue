import type { RouteList } from '@/types/config'
export const constantRouer: RouteList = [
  {
    path: '/login',
    component: () => import('@/views/login/Login.vue'),
    meta: {
      menuTitle: '登录',
      show: true,
      menuIcon: 'ElementPlus',
    },
  },
  {
    path: '/',
    // redirect: '/home',
    name: 'index',
    component: () => import('@/views/layout/Layout.vue'),
    meta: {
      menuTitle: '根',
      show: true,
      menuIcon: 'House',
    },
    children: [
      {
        path: '/home',
        name: 'home',
        component: () => import('@/views/home/Home.vue'),
        meta: {
          menuTitle: '首页',
          show: true,
          menuIcon: 'House',
        },
      },
      {
        path: '/测试',
        name: '测试',
        component: () => import('@/views/home/Home.vue'),
        meta: {
          menuTitle: '测试',
          show: true,
          menuIcon: 'House',
        },
      },
    ],
  },
  {
    path: '/404',
    component: () => import('@/views/404/404.vue'),
    meta: {
      menuTitle: '404',
      show: true,
    },
  },
  {
    path: '/:path(.*)',
    redirect: '/404',
    meta: {
      menuTitle: 'any page',
      show: true,
      menuIcon: 'Link',
    },
  },
]
