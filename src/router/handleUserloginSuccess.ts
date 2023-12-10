import useUserStore from '@/store/modules/user'
import { RouteLocationNormalized, RouteLocationRaw } from 'vue-router'

export const handleUserloginSuccess = async (to: RouteLocationNormalized) => {
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
