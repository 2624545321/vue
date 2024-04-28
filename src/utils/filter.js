import Vue from 'vue'
import { timeFormat } from './timeFormat'
import { strEscapeTags, strRemoveHtmlTag, strRemoveHtmlEntity } from './index'

/**
 * 大数字转换，将大额数字转换为万、等
 * @param value 数字值
 *
 * @return { string } 转换后的值
 */
export const bigNumberTransform = value => {
  value = Number(value)
  let num
  if (Number.isNaN(value)) return value
  if (value > 9999) {
    //大于9999显示x.xx万
    const w = Math.floor(value / 1000) / 10
    num = w.toFixed(2) + '万'
  } else if (value < 9999 && value > -9999) {
    num = (value && value.toFixed()) || value
  } else if (value < -9999) {
    //小于-9999显示-x.xx万
    num = -(Math.floor(Math.abs(value) / 1000) / 10) + '万'
  }
  return num
}

/**
 * 数据超过10万时显示 10万+
 * @param value 数字值
 *
 * @return { string } 转换后的值
 */
export const numberAddSuffix = value => {
  value = Number(value)
  if (value > 99999) {
    //大于99999显示x.xx万
    return '10万+'
  }
  return value.toFixed(0)
}

const filters = {
  timeFormat,
  strRemoveHtmlTag,
  strEscapeTags,
  strRemoveHtmlEntity,
  bigNumberTransform,
  numberAddSuffix,
}

Object.entries(filters).forEach(([k, v]) => {
  Vue.filter(k, v)
})
