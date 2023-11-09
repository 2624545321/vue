import { defineStore } from 'pinia'
import { reqUserLogin } from '@/api/user'
import type { UserLoginRequestParmeter } from '@/api/user/type'

const storeId = 'user'
const storeConfig = {
  state: () => {
    return {
      userInfo: {},
      token: localStorage.getItem('token') || '',
    }
  },
  getters: {},
  actions: {
    userLogin(userInfo: UserLoginRequestParmeter, cb: any) {
      // console.log(userInfo)
      // console.log(this.token)
      reqUserLogin(userInfo)
        .then((res) => {
          if (res.code === 200) {
            const token = res.data.token as string
            // @ts-ignore
            this.token = token
            localStorage.setItem('token', token)
          } else {
            // @ts-ignore
            this.token = ''
            localStorage.setItem('token', '')
          }
          cb && cb(res)
        })
        .catch((err) => {
          console.log('login err', err)
        })
    },
  },
}
const useUserStore = defineStore(storeId, storeConfig)
export default useUserStore
