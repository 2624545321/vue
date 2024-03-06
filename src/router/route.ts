import type { RouteList } from '@/types/config'
export const constantRouer: RouteList = [
  {
    path: '/login',
    name: 'login',
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
      menuTitle: '',
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
    path: '/dataScreen',
    name: 'dataScreen',
    component: () => import('@/views/dataScreen/dataScreen.vue'),
    meta: {
      menuTitle: '数据大屏',
      show: true,
      menuIcon: 'Monitor',
    },
  },
  {
    path: '/authorityManagement',
    redirect: '/authorityManagement/user',
    name: 'authorityManagement',
    component: () => import('@/views/layout/Layout.vue'),
    meta: {
      menuTitle: '权限管理',
      show: true,
      menuIcon: 'Lock',
    },
    children: [
      {
        path: 'user',
        name: 'user',
        component: () =>
          import(
            '@/views/authorityManagement/userManagement/UserManagement.vue'
          ),
        meta: {
          menuTitle: '用户管理',
          show: true,
          menuIcon: 'User',
        },
      },
      {
        path: 'role',
        name: 'role',
        component: () =>
          import(
            '@/views/authorityManagement/roleManagement/RoleManagement.vue'
          ),
        meta: {
          menuTitle: '角色管理',
          show: true,
          menuIcon: 'Lock',
        },
      },
      {
        path: 'permission',
        name: 'permission',
        component: () =>
          import('@/views/authorityManagement/permission/Permission.vue'),
        meta: {
          menuTitle: '菜单管理',
          show: true,
          menuIcon: 'Document',
        },
      },
    ],
  },
  {
    path: '/productManagement',
    redirect: '/productManagement/brand',
    name: 'productManagement',
    component: () => import('@/views/layout/Layout.vue'),
    meta: {
      menuTitle: '产品管理',
      show: true,
      menuIcon: 'Goods',
    },
    children: [
      {
        path: 'brand',
        name: 'brand',
        component: () =>
          import(
            '@/views/productManagement/brandManagement/BrandManagement.vue'
          ),
        meta: {
          menuTitle: '品牌管理',
          show: true,
          menuIcon: 'Suitcase',
        },
      },
      {
        path: 'attr',
        name: 'attr',
        component: () =>
          import('@/views/productManagement/attrManagement/AttrManagement.vue'),
        meta: {
          menuTitle: '属性管理',
          show: true,
          menuIcon: 'ChromeFilled',
        },
      },
      {
        path: 'spu',
        name: 'spu',
        component: () =>
          import('@/views/productManagement/spuManagement/SpuManagement.vue'),
        meta: {
          menuTitle: 'spu管理',
          show: true,
          menuIcon: 'Coin',
        },
      },
      {
        path: 'sku',
        name: 'sku',
        component: () =>
          import('@/views/productManagement/skuManagement/SkuManagement.vue'),
        meta: {
          menuTitle: 'sku管理',
          show: true,
          menuIcon: 'PriceTag',
        },
      },
    ],
  },
  {
    path: '/themeSwitch',
    name: 'themeSwitch',
    component: () => import('@/views/themeSwitch/ThemeSwitch.vue'),
    meta: {
      permission: false,
    },
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
