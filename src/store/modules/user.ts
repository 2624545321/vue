import { defineStore } from 'pinia'
import { reqUserLogin, reqUserInfo, reqLogout } from '@/api/user'
import type { UserLoginRequestParmeter } from '@/api/user/type'
import type { userState } from '../types/userState'
import type { loginSubmitOfCallback } from '@/types/module/login'
import { GET_TOKEN, SET_TOKEN, REMOVE_TOKEN } from '@/utils/token'

const storeId = 'user'
const useUserStore = defineStore(storeId, {
  state: (): userState => {
    return {
      userInfo: null,
      token: GET_TOKEN(),
    }
  },
  getters: {
    avatar(): string {
      return (
        this.userInfo?.avatar ||
        'https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png'
      )
    },
    userName(): string {
      return this.userInfo?.name || ''
    },
  },
  actions: {
    /**
     * @desc 用户登录
     * @param { UserLoginRequestParmeter } userInfo 用户的账号和密码
     * @param { loginSubmitOfCallback } cb 登录请求后的回调函数
     *
     * @return void
     */
    userLogin(userInfo: UserLoginRequestParmeter, cb: loginSubmitOfCallback) {
      // console.log(userInfo)
      // console.log(this.token)
      reqUserLogin(userInfo)
        .then((res) => {
          if (res.code === 200) {
            const token = res.data as string
            this.token = token
          } else {
            this.token = ''
          }
          SET_TOKEN(this.token)
          cb && cb(res)
        })
        .catch((err) => {
          console.warn('login err', err)
        })
    },
    /**
     * @desc 获取用户信息
     *
     * @return { Promise<string> } ok: 请求成功 err: 请求失败
     */
    async getUserInfo(): Promise<string> {
      const res = await reqUserInfo()
      if (res.code !== 200) return 'err'
      this.userInfo = res.data || {}
      return 'ok'
    },
    /**
     * @desc 退出登录
     *
     * @return void
     */
    async logout() {
      /* 有接口的话请求退出 */
      const res = await reqLogout()
      // console.log('有接口的话请求退出', res)
      if (res.code !== 200) return 'err'
      this.userInfo = null
      this.token = ''
      REMOVE_TOKEN()
      return 'ok'
    },
  },
})
export default useUserStore
