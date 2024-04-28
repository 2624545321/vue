/*
 * @Description: 公共工具库
 * @Date: 2020-05-08 14:24:51
 */
import { MessageBox } from 'element-ui'
import qs from 'qs'

/**
 * 修改字段名为小写
 */
function keyToLowerCase(data) {
  return Object.keys(data).reduce((obj, item) => {
    obj[item.toLowerCase()] = data[item]
    return obj
  }, {})
}

/**
 * 修改字段名为大写
 */
function keyToUpperCase(data) {
  return Object.keys(data).reduce((obj, item) => {
    obj[item.toUpperCase()] = data[item]
    return obj
  }, {})
}

/**
 * 深复制
 */
function deepCopy(data) {
  return JSON.parse(JSON.stringify(data))
}

/**
 * 处理列表数据用于存入localstorage中
 */
function dealStorage(list, attr, location) {
  if (!list || list.length == 0) {
    return
  }
  list = deepCopy(list)
  var attrArray = attr.split(',')
  localStorage.removeItem(location)
  for (var i = 0; i < list.length; i++) {
    var item = list[i]
    for (var j in item) {
      if (attrArray.indexOf(j) < 0) {
        delete item[j]
      }
    }
  }
  list = list.map(item => {
    return keyToUpperCase(item)
  })
  localStorage.setItem(location, JSON.stringify(list))
}
// 判断请求是否成功(任务指令模块)
export function checkResponse(data) {
  return new Promise((resolve, reject) => {
    let result = true
    let msg = ''
    const res = keyToLowerCase(data)
    if (res.issuccess === 'false') result = false
    if (res.detail) msg = res.detail
    if (res.message) {
      msg = res.message
      result = false
    }
    if (res.issuccess === 'false' && Array.isArray(res.reports)) {
      msg = res.reports
        .map((v, index) => {
          const item = keyToLowerCase(v)
          return res.reports.length > 1
            ? `${index + 1}, ${item.detail}`
            : item.detail
        })
        .join('<p style="margin: 6px 0;"></p>')
      result = false
    }
    if (res.status === '-1' && res.detail !== undefined) {
      msg = res.detail
      if (res.detail !== res.message) {
        msg += res.message
      }
      result = false
    }
    !result &&
      MessageBox.alert(msg, '', {
        type: 'error',
        dangerouslyUseHTMLString: true,
        customClass: 'message-html-box',
      }).finally(reject)
    result && resolve()
  })
}

// 列表跳转到稿件详情
export function articleDetailUrl(params, list) {
  if (list) {
    dealStorage(list, 'guid', 'ls.resourceDetail')
  }
  let url =
    window.SITE_CONFIG && window.SITE_CONFIG.routerUrl
      ? window.SITE_CONFIG.routerUrl +
        `#/resourcedetail?${qs.stringify(params)}`
      : process.env.VUE_APP_MEDIECLOUDHOST +
        `yzmediaCloud/?nsukey=login/login_tpl.html?v=${+new Date()}#/resourcedetail?${qs.stringify(
          params,
        )}`
  console.log('列表跳转到稿件详情url', url)
  return url
  // return process.env.VUE_APP_MEDIECLOUDHOST + `yzmediaCloud/?nsukey=login/login_tpl.html?v=${+new Date()}#/resourcedetail?${qs.stringify(params)}`;
  // return process.env.VUE_APP_MEDIECLOUDHOST + `yzmediaCloud/#/resourcedetail?${qs.stringify(params)}`;
  // return 'http://localhost:8080/' + `?nsukey=login/login_tpl.html?v=${+new Date()}#/resourcedetail?${qs.stringify(params)}`;
}
/**
 * @desc 默认请求地址，建议改地址时在此修改,全局统一维护一个地址
 *
 * @return { string } url
 */
export const globalBaseUrl = () => {
  let baseURL = ''
  if (window.SITE_CONFIG && window.SITE_CONFIG.apiUrl) {
    /* 大鱼的配置有地址用大鱼的，否则使用默认地址 */
    baseURL = window.SITE_CONFIG.apiUrl
  } else {
    baseURL = 'http://gc-nginx-rmrb.pdnews.cn'
  }
  return process.env.NODE_ENV === 'production' ? baseURL : ''
}

/**
 * 跳转至登录页
 */
export const toLoginPage = () => {
  let curUrl = window.location.href.split('#')[0] // 当前访问的前端地址
  // window.location.href = window.SITE_CONFIG.loginUrl + '/enduser/api/application/plugin_cas_apereo/idaasplugin_cas_apereo/login?service=' + curUrl;
  window.location.href = window.SITE_CONFIG.loginUrl + '?service=' + curUrl
  // window.location.href = window.SITE_CONFIG.loginUrl;
}

/**
 * 对象类型深冻结
 */
export function deepFreeze(object) {
  if (typeof object !== 'object' || object === null) {
    return object
  }
  // 获取对象的属性名
  const propNames = Reflect.ownKeys(object)

  // 冻结自身前先冻结属性
  for (const name of propNames) {
    const value = object[name]

    if ((value && typeof value === 'object') || typeof value === 'function') {
      deepFreeze(value)
    }
  }

  return Object.freeze(object)
}

/**
 * 深克隆
 */
export const cloneDeep = object => {
  const cache = new WeakMap()

  const _cloneDeep = object => {
    if (typeof object !== 'object' || object == null) return object
    const result = Array.isArray(object) ? [] : {}
    
    if (cache.has(object)) return cache.get(object)
    cache.set(object, result)
    
    for (let k in object) {
      if (Object.hasOwn(object, k)) {
        result[k] = cloneDeep(object[k])
      }
    }
    return result
  }
  return _cloneDeep(object)
}
