import { ref } from 'vue'
import { attrInfoList } from '@/api/productManagement/attr'
// type
import type { Custom_Props } from '@/types/module/productManagement/spuManagement'
import type { AttrItem } from '@/api/productManagement/attr/type'
import type { AttrInfoList } from '@/types/module/productManagement/attr'

/**
 * @desc 获取全部的平台属性
 */
export const useAttrInfoList = (
  cateValue: Custom_Props['cateValue'],
  callback?: (res: AttrInfoList) => void,
): Promise<AttrInfoList> | undefined => {
  const data = ref<AttrItem[]>([])
  const error = ref(null)

  const { firstLevel, secondLevel, threeLevel } = cateValue || {}

  // if no callback, return promise
  let promise
  if (typeof callback !== 'function' && window.Promise) {
    promise = new window.Promise<AttrInfoList>((resolve, reject) => {
      callback = function (res) {
        res.error?.value ? reject(res) : resolve(res)
      }
    })
  }

  attrInfoList(Number(firstLevel), Number(secondLevel), Number(threeLevel))
    .then((res) => {
      if (res.code !== 200 || !Array.isArray(res.data)) {
        data.value = []
      } else {
        data.value = res.data
      }
      if (typeof callback === 'function') {
        callback({ data, error })
      }
    })
    .catch((err) => {
      error.value = err
      if (typeof callback === 'function') {
        callback({ data, error })
      }
    })

  if (promise) {
    return promise
  }
  /*   let a
  setTimeout(() => a())

  return new window.Promise((res) => {
    a = () => {
      res(123)
    }
  }) */
}
