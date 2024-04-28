import echarts from 'echarts'

/**
 * Created by PanJiaChen on 16/11/18.
 */

/**
 * Parse the time to string
 * @param {(Object|string|number)} time
 * @param {string} cFormat
 * @returns {string | null}
 */
export function parseTime(time, cFormat) {
  if (arguments.length === 0) {
    return null
  }
  const format = cFormat || '{y}-{m}-{d} {h}:{i}:{s}'
  let date
  if (typeof time === 'object') {
    date = time
  } else {
    if (typeof time === 'string' && /^[0-9]+$/.test(time)) {
      time = parseInt(time)
    }
    if (typeof time === 'number' && time.toString().length === 10) {
      time = time * 1000
    }
    date = new Date(time)
  }
  const formatObj = {
    y: date.getFullYear(),
    m: date.getMonth() + 1,
    d: date.getDate(),
    h: date.getHours(),
    i: date.getMinutes(),
    s: date.getSeconds(),
    a: date.getDay(),
  }
  const time_str = format.replace(/{([ymdhisa])+}/g, (result, key) => {
    const value = formatObj[key]
    // Note: getDay() returns 0 on Sunday
    if (key === 'a') {
      return ['日', '一', '二', '三', '四', '五', '六'][value]
    }
    return value.toString().padStart(2, '0')
  })
  return time_str
}

/**
 * @param {number} time
 * @param {string} option
 * @returns {string}
 */
export function formatTime(time, option) {
  if (('' + time).length === 10) {
    time = parseInt(time) * 1000
  } else {
    time = +time
  }
  const d = new Date(time)
  const now = Date.now()

  const diff = (now - d) / 1000

  if (diff < 30) {
    return '刚刚'
  } else if (diff < 3600) {
    // less 1 hour
    return Math.ceil(diff / 60) + '分钟前'
  } else if (diff < 3600 * 24) {
    return Math.ceil(diff / 3600) + '小时前'
  } else if (diff < 3600 * 24 * 2) {
    return '1天前'
  }
  if (option) {
    return parseTime(time, option)
  } else {
    return (
      d.getMonth() +
      1 +
      '月' +
      d.getDate() +
      '日' +
      d.getHours() +
      '时' +
      d.getMinutes() +
      '分'
    )
  }
}

/**
 * @param {string} url
 * @returns {Object}
 */
export function param2Obj(url) {
  const search = url.split('?')[1]
  if (!search) {
    return {}
  }
  return JSON.parse(
    '{"' +
      decodeURIComponent(search)
        .replace(/"/g, '\\"')
        .replace(/&/g, '","')
        .replace(/=/g, '":"')
        .replace(/\+/g, ' ') +
      '"}',
  )
}

/**
 * @desc 字符串 转义标签
 * @param { String } str 字符串
 *
 * @return { String } str 字符串
 */
export const strEscapeTags = str => {
  str = (str && str.trim()) || ''
  str =
    (str &&
      str
        .replace(/\\?&?amp;/g, '&')
        .replace(/\\?&lt;/g, '<')
        .replace(/\\?&gt;/g, '>')
        .replace(/\\?&quot;/, '"')
        .replace(/\\?&#039;/g, "'")) ||
    ''
  return str
}

/**
 * @desc 字符串去除 html 实体
 * @param { String } str 字符串
 *
 * @return { String } str 字符串
 */
export const strRemoveHtmlEntity = str => {
  return (str && str.replace(/&?[lt|br|gt|nbsp|nmp|amp];?/gim, '')) || ''
}

export const strRemoveHtmlTag = str => {
  return (str && str.replace(/<([^>]+)>/ig, '')) || ''
}

/**
 * @desc 获取echarts实例
 * @param { HTMLElement } ele html元素
 * @returns { Object } echarts 实例
 */
export const getEchartsInstance = ele => {
  const existInstance = echarts.getInstanceByDom(ele)
  const echartsInstance = existInstance || echarts.init(ele)
  return echartsInstance
}

/**
 * @desc 导出文件
 * @param { object } data 数据
 * @returns void
 */
export const exportToExcel = data => {
  // 将链接地址字符内容转变成blob地址
  const urlSuffix = '稿件统计.xls'
  const link = document.createElement('a')
  const blob = new Blob([data])
  link.href = window.URL.createObjectURL(blob)
  link.download = urlSuffix
  document.body.appendChild(link)
  link.click()
  document.body.removeChild(link)
  window.URL.revokeObjectURL(link.href)
}
