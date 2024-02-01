export const cloneDeep = (obj) => {
  const cache = new WeakMap()

  const _cloneDeep = (obj) => {
    // not object types are returned directly
    if (obj === null || typeof obj !== 'object') {
      return obj
    }

    if (cache.has(obj)) {
      return cache.get(obj)
    }

    const result = Array.isArray(obj) ? [] : {}
    cache.set(obj, result)
    for (let k in obj) {
      if (Object.hasOwn(obj, k)) {
        result[k] = _cloneDeep(obj[k])
      }
    }

    return result
  }

  return _cloneDeep(obj)
}

// const obj = {
//   arr: [1, 2, 3, 4],
//   a: 4,
// }
// obj.sub = obj
// obj.arr.push(obj)

// const newObj = cloneDeep(obj)
// console.log(newObj.arr !== obj.arr)
// console.log(newObj.sub !== obj.sub)
// console.log(newObj.arr[4] !== obj.sub)
// console.log(newObj.arr[4] === newObj)
