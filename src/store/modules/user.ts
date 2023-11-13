import { defineStore } from 'pinia'
import { reqUserLogin } from '@/api/user'
import type { UserLoginRequestParmeter } from '@/api/user/type'
import type { userState } from './types/userState'
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
          console.log('login err', err)
        })
    },
  },
})
export default useUserStore
