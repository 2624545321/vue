const local = window.localStorage

/**
 * @desc 设置数据
 * @param { string } localKey 本地缓存数据的 key
 * @param { any[] } data 数据
 * @param { string | function } item 缓存数据的某一项，支持 . 标识符
 *
 * @return { any[] } 缓存的数据
 */
const setCacheData = (key, val) => {
  local.setItem(
    key,
    typeof val === 'object' && val != null ? JSON.stringify(val) : val,
  )
  return val
}

/**
 * @desc 数据缓存 ps: 逻辑不对不可用，需要重写
 * @param { string } localKey 本地缓存数据的 key
 * @param { any[] } data 数据
 * @param { string | function } item 缓存数据的某一项，支持 . 标识符
 *
 * @return { any[] } 缓存的数据
 */
export const cacheData = (key, data, item) => {
  /* 
  从服务端获取到数据后缓存在本地
  下一次获取数据到数据时：是否有新数据？ 有，跟新数据；没有不变
  */
  const cacheData = JSON.parse(local.getItem(key) || '[]')

  /* 没缓存直接缓存数据 */
  if (Array.isArray(cacheData) && !cacheData.length) {
    return setCacheData(key, data)
  }

  /* item 存在说明要找到对象中的某一项，否则 设置数据本身 */
  let targetData = null
  if (typeof item === 'string') {
    targetData = cacheData[item]
  } else if (typeof item === 'function') {
    targetData = item(cacheData)
  } else {
    targetData = cacheData
  }

  /* 没数据返回缓存的数据 */
  if (Array.isArray(data) && !data.length) {
    return targetData
  }

  if (typeof item === 'string') {
    cacheData[item] = data
  } else if (typeof item === 'function') {
    item(cacheData) && (item(cacheData).data = data)
  } else {
    cacheData = data
  }
  return setCacheData(key, cacheData)
}

export const cacheData_importantReshipRank = () => {}
