import { defineStore } from 'pinia'
import { reqUserLogin, reqUserInfo } from '@/api/user'
import type { UserLoginRequestParmeter } from '@/api/user/type'
import type { userState } from '../types/userState'
import type { loginSubmitOfCallback } from '@/types/module/login'
import { GET_TOKEN, SET_TOKEN } from '@/utils/token'

const storeId = 'user'
const useUserStore = defineStore(storeId, {
  state: (): userState => {
    return {
      userInfo: {},
      token: GET_TOKEN(),
    }
  },
  getters: {},
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
            const token = res.data.token as string
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
    getUserInfo() {
      reqUserInfo()
        .then((res) => {
          console.log(res)
        })
        .catch((err) => console.warn(err))
    },
  },
})
export default useUserStore
