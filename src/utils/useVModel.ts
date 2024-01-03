import { computed } from 'vue'

// const cacheMap = new Map()

export default (props: any, propName: any, emits: any) =>
  computed({
    get() {
      const currProp = props[propName]
      // todo: 缓存不生效，待修改
      // if (cacheMap.has(currProp)) {
      //   return cacheMap.get(currProp)
      // }
      const proxy = new Proxy(currProp, {
        get(target, key) {
          // console.log('proxy get', target, key)
          return Reflect.get(target, key)
        },
        set(target, key, value) {
          // console.log('proxy set', target, key, value)
          // Reflect.set(target, key, value)
          emits('update:' + propName, {
            ...target,
            [key]: value,
          })
          return true
        },
      })
      // cacheMap.set(currProp, proxy)
      // console.log('cacheMap', cacheMap)
      // debugger
      return proxy
    },
    set(val) {
      emits('update:' + propName, val)
    },
  })
