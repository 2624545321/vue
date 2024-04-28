/*
 * @Description: 请求拦截
 * @Date: 2020-05-08 14:24:51
 */
import axios from 'axios'
import { Message } from 'element-ui'
import { Loading } from 'element-ui';
import { globalBaseUrl, toLoginPage } from '@/plugins/utils.js'

axios.defaults.headers.post['Content-Type'] =
  'application/x-www-form-urlencoded'
axios.defaults.headers.formdata = 1
axios.defaults.headers.Authorization =
  (window.SITE_CONFIG && window.SITE_CONFIG['Authorization']) || ''
axios.defaults.withCredentials = true

const config = {
  baseURL: globalBaseUrl(),
  // baseURL: process.env.baseURL || process.env.apiUrl || '',
  timeout: 60 * 1000, // Timeout
  isRetryRequest: false,
  isUserRequest: false,
  withCredentials: true,
  Authorization:
    (window.SITE_CONFIG && window.SITE_CONFIG['Authorization']) || '',
}

const _axios = axios.create(config)

/**
 * 进入ids登录页
 * @param {String} addr 地址
 * @param {String} surl 加上location地址
 * @param {Boolean} flag 是否加密
 */
function goToLoginPage(addr, surl) {
  let curUrl = window.top.location.href
  curUrl = Base64.encode(curUrl)
  curUrl = Base64.encode(surl + curUrl)
  window.top.location.href = addr + curUrl
}
/**
 * 获取ids地址
 */
function getIdsUrl() {
  return new Promise(resolve => {
    _axios.get('/wcm/mediacloud/queryTenantInfo/getIDSUrl').then(data => {
      resolve(data)
    })
  })
}

/** 
 * refreshToken 登录刷新token
 * @param {Object} config 路由参数
 */
async function refreshToken () {
  const tokenConfig = {
      withCredentials: true, // Check cross-site Access-Control
      headers: {
         Authorization: (window.SITE_CONFIG && window.SITE_CONFIG['GlobalAuthorization']) || '',
      },
  };
  const t_axios = axios.create(tokenConfig);
  // const reUrl = (window.SITE_CONFIG && window.SITE_CONFIG.apiUrl) ? window.SITE_CONFIG.apiUrl + '/api/rmrb-gcyw-foura-login/sso/refresh' : '/api/rmrb-gcyw-foura-login/sso/refresh';
  const reUrl = (window.SITE_CONFIG && window.SITE_CONFIG.refreshUrl) ? window.SITE_CONFIG.refreshUrl : '/api/rmrb-gcyw-idaas-sit-login/api/rmrb-gcyw-foura-login/thirdParty/refresh';
  const res = await t_axios.post(reUrl);
}

/**
 * 未登陆
 */
function notLogin() {
  getIdsUrl().then(data => {
    const surl = location.origin + '/wcm/verifyids.jsp?url='
    const addr = data.data.substring(
      0,
      data.data.indexOf('surl') + 'surl'.length + 1,
    )
    goToLoginPage(addr, surl)
  })
}


let loadingInstance, loadingInstanceCount = 0
/**
 * 加载loading
 */
function loadingService() {
  loadingInstance = Loading.service({
    // text: '玩命加载中...',
    // spinner: 'el-icon-loading',
    // background: 'rgba(0, 0, 0, 0.4)',
  });
  loadingInstanceCount ++
  // store.commit('CHANGE_LOADING_ARR', store.getters.loadingArr + 1); // 动画加载个数加1
}
/*
 * 移除 loading
 */

function removeLoading() {
  // store.commit('CHANGE_LOADING_ARR', store.getters.loadingArr - 1); // 动画加载个数减1
  loadingInstanceCount --
  if (loadingInstanceCount === 0) {
    setTimeout(() => {
      loadingInstance.close();
    }, 50);
  }
}

_axios.interceptors.request.use(
  config => {
    if (
      config.method.toUpperCase() === 'POST' &&
      config.headers['Content-Type'] !== 'multipart/form-data'
    ) {
      config.headers['Content-Type'] =
        'application/x-www-form-urlencoded;charset=UTF-8'
      config.data = JSON.stringify(config.data)
    }
    config.loading === true && loadingService()
    return config
  },
  function(error) {
    // Do something with request error
    return Promise.reject(error)
  },
)

const loginUrl = (window.SITE_CONFIG && window.SITE_CONFIG.loginUrl) || ''

_axios.interceptors.response.use(
  function(response) {
    if (response.config.loading === true) {
      removeLoading()
    }
    // 未登录
    if (response.headers.trsnotlogin === 'true' && loginUrl) {
      return notLogin()
    }
    if (loginUrl && response.data.code === 400) {
      // 条件需要code判断,code确定会该方法需在77行下对应code下调用，需要提出去为方法
      return toLoginPage()
    }
    if (loginUrl) {
      switch (response.data.code) {
        case '401':
          break
        case '500':
          break
      }
    }
    return response.data
  },
  async function(err) {
    // Do something with response error
    console.log('response err', err)
    if (err.config.loading === true) {
      removeLoading()
    }
    if (err && err.response) {
      switch (err.response.status) {
        case 400:
          if (loginUrl) {
            toLoginPage()
          } else {
            err.message = '错误请求'
          }
          break
        case 401:
          err.message = '未授权，请重新登录'
          break
        case 403:
          // err.message = '拒绝访问';
          await refreshToken();
          return _axios(err.response.config);
        case 404:
          err.message = '请求错误，未找到该资源'
          break
        case 405:
          err.message = '请求方法未允许'
          break
        case 408:
          err.message = '请求超时'
          break
        case 500:
          err.message = '服务端出错'
          break
        case 501:
          err.message = '网络未实现'
          break
        case 502:
          err.message = '网络错误'
          break
        case 503:
          err.message = '服务不可用'
          break
        case 504:
          err.message = '网络超时'
          break
        case 505:
          err.message = 'http版本不支持该请求'
          break
        default:
          err.message = `连接错误${err.response.status}`
      }
    } else {
      err.message = '连接服务器失败'
    }
    // Message.error(err.message)
    return Promise.reject(err)
  },
)

export default _axios
