import { RouteRecordRaw } from 'vue-router'
export const constantRouer: RouteRecordRaw[] = [
  {
    path: '/login',
    component: () => import('@/views/login/Login.vue'),
  },
  {
    path: '/',
    // redirect: '/home',
    name: 'index',
    component: () => import('@/views/layout/Layout.vue'),
  },
  {
    path: '/home',
    name: 'home',
    component: () => import('@/views/home/Home.vue'),
  },
  {
    path: '/404',
    component: () => import('@/views/404/404.vue'),
  },
  {
    path: '/:path(.*)',
    redirect: '/404',
  },
]
