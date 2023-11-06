import axios from 'axios'
import { RequestConfig } from '@/types/config/request'
import { ElMessage } from 'element-plus'
// progress
import NProgress from 'nprogress'
import 'nprogress/nprogress.css'

// NProgress.configure({
//   easing: 'ease', // 动画方式，和css动画属性一样（默认：ease）
//   speed: 500, // 递增进度条的速度，单位ms（默认： 200）
//   showSpinner: false, // 是否显示加载ico
//   trickle: true, //是否自动递增
//   trickleSpeed: 200, // 自动递增间隔
//   minimum: 0.3, // 初始化时的最小百分比，0-1（默认：0.08）
//   parent: '#container', //指定此选项以更改父容器（默认：body）
// })

const requestConfig: RequestConfig = {
  baseURL: import.meta.env.VITE_APP_BASE_API,
  timeout: 8000,
}

const requestInstance = axios.create(requestConfig)

requestInstance.interceptors.request.use((config) => {
  NProgress.start()
  return config
})

requestInstance.interceptors.response.use(
  (response) => {
    NProgress.done()
    return response.data
  },
  (error) => {
    let message = ''
    const status = error.response.status
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
      default:
        message = 'unkown err'
    }
    ElMessage.error(message)
    NProgress.done()
  },
)

export default requestInstance
