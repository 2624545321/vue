import type { RouteList } from '@/types/config'
export const constantRouer: RouteList = [
  {
    path: '/login',
    component: () => import('@/views/login/Login.vue'),
    meta: {
      menuTitle: '登录',
      show: false,
      menuIcon: 'ElementPlus',
    },
  },
  {
    path: '/',
    redirect: '/home',
    name: 'index',
    component: () => import('@/views/layout/Layout.vue'),
    meta: {
      menuTitle: '根',
      show: true,
      menuIcon: 'House',
    },
    children: [
      {
        path: 'home',
        name: 'home',
        component: () => import('@/views/home/Home.vue'),
        meta: {
          menuTitle: '首页',
          show: true,
          menuIcon: 'House',
        },
      },
    ],
  },
  {
    path: '/authorityManagement',
    redirect: '/authorityManagement/role',
    name: 'authorityManagement',
    component: () => import('@/views/layout/Layout.vue'),
    meta: {
      menuTitle: '权限管理',
      show: true,
      menuIcon: 'House',
    },
    children: [
      {
        path: 'role',
        name: 'role',
        component: () => import('@/views/authorityManagement/roleManagement/RoleManagement.vue'),
        meta: {
          menuTitle: '角色管理',
          show: true,
          menuIcon: 'House',
        },
      },
      {
        path: 'user',
        name: 'user',
        component: () => import('@/views/authorityManagement/userManagement/UserManagement.vue'),
        meta: {
          menuTitle: '用户管理',
          show: true,
          menuIcon: 'House',
        },
      },
      {
        path: 'permission',
        name: 'permission',
        component: () => import('@/views/authorityManagement/permission/Permission.vue'),
        meta: {
          menuTitle: '菜单管理',
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
      show: false,
    },
  },
  {
    path: '/:path(.*)',
    redirect: '/404',
    meta: {
      menuTitle: 'any page',
      show: false,
      menuIcon: 'Link',
    },
  },
]
