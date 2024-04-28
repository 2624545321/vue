import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

/* Layout */
import Layout from '@/layout'

const requireRoute = require.context(
  // 其组件目录的相对路径
  './module',
  // 是否查询其子目录
  false,
  // 匹配基础组件文件名的正则表达式
  /.js$/,
)
/* 
  默认文件的顺序就是菜单的顺序，更换菜单的位置就是更换菜单的前缀
*/
const routesModule = []
requireRoute.keys().forEach(key => {
  // console.log(requireRoute(key))
  routesModule.push(requireRoute(key).default || requireRoute(key))
})

/**
 * Note: sub-menu only appear when route children.length >= 1
 * Detail see: https://panjiachen.github.io/vue-element-admin-site/guide/essentials/router-and-nav.html
 *
 * hidden: true                   if set true, item will not show in the sidebar(default is false)
 * alwaysShow: true               if set true, will always show the root menu
 *                                if not set alwaysShow, when item has more than one children route,
 *                                it will becomes nested mode, otherwise not show the root menu
 * redirect: noRedirect           if set noRedirect will no redirect in the breadcrumb
 * name:'router-name'             the name is used by <keep-alive> (must set!!!)
 * meta : {
    roles: ['admin','editor']    control the page roles (you can set multiple roles)
    title: 'title'               the name show in sidebar and breadcrumb (recommend set)
    icon: 'svg-name'             the icon show in the sidebar
    breadcrumb: false            if set false, the item will hidden in breadcrumb(default is true)
    activeMenu: '/example/list'  if set path, the sidebar will highlight the path you set
  }
 */

/**
 * constantRoutes
 * a base page that does not have permission requirements
 * all roles can be accessed
 */

export const constantRoutes = [
  ...routesModule.flat(Infinity),
  // {
  //   path: '/original',
  //   component: Layout,
  //   redirect: '/original/index',
  //   children: [
  //     {
  //       path: 'index',
  //       name: 'original',
  //       // name: '原创列表',
  //       component: () => import('@/views/original/index'),
  //       meta: { title: '原创列表', icon: 'dashboard' },
  //     },
  //   ],
  // },
  // {
  //   path: '/spread',
  //   component: Layout,
  //   redirect: '/spread/index',
  //   children: [
  //     {
  //       path: 'index',
  //       name: 'spread',
  //       component: () => import('@/views/spread/index'),
  //       meta: { title: '传播榜单', icon: 'dashboard' },
  //     },
  //   ],
  // },

  {
    path: '/subject',
    component: Layout,
    hidden: true,
    redirect: '/subject/spread',
    children: [
      {
        path: 'spread',
        name: 'subjectSpread',
        component: () => import('@/views/subject/Index'),
        meta: { title: '专题传播', image: 'zhuantichuanbo' },
      },
    ],
  },
  {
    path: '/meidia',
    component: Layout,
    redirect: '/meidia/spread',
    hidden: true,
    children: [
      {
        path: 'spread',
        name: 'meidiaSpread',
        component: () => import('@/views/spread/index'),
        meta: {
          title: '媒体单位传播',
          image: 'chuanbodanwei',
          class: 'chuanbodanwei',
        },
      },
    ],
  },
  {
    path: '/login',
    component: () => import('@/views/login/index'),
    hidden: true,
  },
  {
    path: '/404',
    component: () => import('@/views/404'),
    hidden: true,
  },
  // 404 page must be placed at the end !!!
  { path: '*', redirect: '/404', hidden: true },
]

const createRouter = () =>
  new Router({
    //   mode: 'history', // require service support
    scrollBehavior(to, from, savedPosition) {
      // console.log('to', to)
      // console.log('from', from)
      // console.log('savedPosition', savedPosition)
      if (savedPosition) {
        return savedPosition
      }
      return { top: 0, behavior: 'smooth' }
    },
    routes: constantRoutes,
  })

const router = createRouter()

// Detail see: https://github.com/vuejs/vue-router/issues/1234#issuecomment-357941465
export function resetRouter() {
  const newRouter = createRouter()
  router.matcher = newRouter.matcher // reset router
}

export default router
