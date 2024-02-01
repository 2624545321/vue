/**
 * @desc deep copy
 * @param { any } obj
 *
 * @return { any } newObject
 */
export const cloneDeep = <T>(obj: T): T => {
  const cache = new WeakMap()

  const _cloneDeep = <T>(obj: T): T => {
    // not object types are returned directly
    if (obj === null || typeof obj !== 'object') {
      return obj
    }

    if (cache.has(obj)) {
      return cache.get(obj)
    }

    const result: T = Array.isArray(obj) ? ([] as T) : ({} as T)
    cache.set(obj, result)
    for (let k in obj) {
      if (Object.hasOwn(obj, k)) {
        result[k] = _cloneDeep(obj[k])
      }
    }

    return result
  }

  return _cloneDeep<T>(obj)
}
