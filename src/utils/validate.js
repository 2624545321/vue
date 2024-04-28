/**
 * Created by PanJiaChen on 16/11/18.
 */

/**
 * @param {string} path
 * @returns {Boolean}
 */
export function isExternal(path) {
  return /^(https?:|mailto:|tel:)/.test(path)
}

/**
 * @param {string} str
 * @returns {Boolean}
 */
export function validUsername(str) {
  // const valid_map = ['admin', 'editor']
  // return valid_map.indexOf(str.trim()) >= 0
  return true
}

/**
 * 字符串长度限制
 * @param {string} str
 * @param {number} length
 */
export function maxValue(str, length) {
  if (!str) return true
  length = length || 20
  str = str.trim()
  let flag = false
  if (str && str.length <= length) {
    flag = true
  }
  return flag
}

/**
 * 特殊字符
 * @param {string} str
 */
export function validSpecialstr(str) {
  if (!str) return false
  str = str.trim()
  const regEn = /[`@#$^&*￥+=<>{}\/[\]]/im
  return regEn.test(str)
}

export function validOnlyNum(str) {
  if (!str) return true
  const reg = /^[0-9]*$/
  return reg.test(str)
}
