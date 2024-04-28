/** 
 * @注意 此请求在本项目已不再使用，查看请求逻辑在以下目录
 * @dir /plugins/axios.js
*/


import axios from 'axios'
import qs from 'qs'
// import store from '../store'
import { getToken, removeToken } from './auth'
import router from '@/router'

const http = options => {
  const that = this
  return new Promise((resolve, reject) => {
    const defaultOptions = {
      'timeout': 10000
    }
    const newOptions = {
      ...defaultOptions,
      ...options
    }
    // headers默认传递json格式数据，这里也可以设置token，每次调用都会携带
    newOptions.headers = {
      'Accept': 'application/json, text/plain',
      'content-Type': 'application/x-www-form-urlencoded',
      // 'Access-Control-Allow-Origin': true,
      // 'content-Type': 'application/json',
      // authorization: store.getters.authorization,
      // authorization: getToken(),
      ...newOptions.headers
    }
    // 这里可以在调用的时候看到你的method、url、data、headers等参数
    // console.log(newOptions);
    axios({
      method: newOptions.method,
      url: newOptions.url,
      data: qs.stringify(newOptions.data),
      // data: newOptions.data,
      headers: newOptions.headers,
      responseType: newOptions.responseType || 'json',
      params: newOptions.params
    }).then(res => {
      console.log(' res.status=  ' + res.status)
      resolve(res.data)
      //   根据返回的状态码判断，注意res返回的并不一定都是status，比如小程序就是statusCode
      // if (res.status === 200) {
      //   //   这里我们只需要获取返回的data中的数据即可
      //   resolve(res.data)
      // } else if (res.status === 401) {
      // removeToken()
      //   router.push(`/login`)
      // } else {
      //   console.log(" res.status=  " + res.status)
      // }
    }).catch(err => {
      // window.location.href = 'http://cloud.cannews.com.cn/'
      console.log('http catch:  ' + err)
    })
  })
}

export default http
