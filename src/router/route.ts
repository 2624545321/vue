import { RouteRecordRaw } from 'vue-router'
export const constantRouer: RouteRecordRaw[] = [
  {
    path: '/login',
    component: () => import('@/views/login/Login.vue'),
    meta: {
      menuTitle: '登录',
      show: true,
    },
  },
  {
    path: '/',
    // redirect: '/home',
    name: 'index',
    component: () => import('@/views/layout/Layout.vue'),
    meta: {
      menuTitle: '首页',
      show: false,
    },
    children: [
      {
        path: '/home',
        name: 'home',
        component: () => import('@/views/home/Home.vue'),
        meta: {
          menuTitle: '首页',
          show: false,
        },
      },
      {
        path: '/测试',
        name: '测试',
        component: () => import('@/views/home/Home.vue'),
        meta: {
          menuTitle: '测试',
          show: true,
        },
      },
    ],
  },
  {
    path: '/404',
    component: () => import('@/views/404/404.vue'),
    meta: {
      menuTitle: '404',
      show: false,
    },
  },
  {
    path: '/:path(.*)',
    redirect: '/404',
    meta: {
      menuTitle: 'any page',
      show: false,
    },
  },
]
