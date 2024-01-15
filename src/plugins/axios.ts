import axios from 'axios'
import type { RequestConfig } from '@/types/config/request'
import { ElMessage } from 'element-plus'
import { CustomProgress } from '@/plugins/nprogress'

import useUserStore from '@/store/modules/user'
let userStore: any = null
// const userStore = useUserStore()
// console.log(userStore)
const cp = new CustomProgress()

const requestConfig: RequestConfig = {
  baseURL: import.meta.env.VITE_APP_BASE_API,
  timeout: 8000,
}

const requestInstance = axios.create(requestConfig)

requestInstance.interceptors.request.use((config) => {
  cp.start()
  !userStore && (userStore = useUserStore())
  const token = userStore.token
  if (token) {
    config.headers.token = token
  }
  return config
})

requestInstance.interceptors.response.use(
  (response) => {
    cp.done()
    return response.data
  },
  (error) => {
    console.log('response err', error)
    let message = ''
    let status = null
    if (error.response) {
      status = error.response.status || 0
    } else if (error.message) {
      message = error.message
    }
    switch (status) {
      case 401:
        message = 'token out of date'
        break
      case 403:
        message = 'no access'
        break
      case 404:
        message = 'request address err'
        break
      case 500:
        message = 'server err'
        break
    }
    ElMessage.error(message)
    cp.done()
  },
)

export default requestInstance
