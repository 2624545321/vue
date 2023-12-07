/**
 * @desc 路由鉴权
 * 未登录状态下
 *  只能访问登录、404页面，其他页面重定向到登录
 * 登录后
 *  不可访问登录页，访问重定向到首页
 *  访问其他页面时，请求用户信息，
 *    如果用户信息不存在，说明token失效，退出登录（清空存储的信息）重定向到登录页，
 *    存在正常执行
 * 使用 token 判断登录状态
 */

import router from './index'
import useUserStore from '@/store/modules/user'
import { CustomProgress } from '@/plugins/nprogress'
import { RouteLocationNormalized, RouteLocationRaw } from 'vue-router'
const cp = new CustomProgress()

/**
 * @desc 判断用户是否登录成功
 * @param { RouteLocationNormalized } to
 *
 * @return { RouteLocationRaw }
 */
const checkUserloginSuccess = async (to: RouteLocationNormalized) => {
  const userStore = useUserStore()
  let path: RouteLocationRaw = {}
  if (to.name === 'login') {
    path.name = 'home'
  } else {
    if (userStore.userName) return path // 用户存在直接返回
    const res = await userStore.getUserInfo() // 用户不存在获取数据
    if (res === 'ok') {
      path.name = to.name as 'string'
    } else {
      userStore.logout()
      path.name = 'login'
    }
  }
  return path
}

router.beforeEach(async (to, _from, next) => {
  // debugger
  cp.start()
  // next()
  // return
  const userStore = useUserStore()
  const token = userStore.token
  let path: RouteLocationRaw = {}
  /* 判断登录状态 */
  if (token) {
    path = await checkUserloginSuccess(to)
  } else {
    if (to.name !== 'login') path.name = 'login'
  }
  const p = path.name ? path : undefined
  // debugger
  next(p as RouteLocationRaw)
})

router.afterEach(() => {
  cp.done()
})
