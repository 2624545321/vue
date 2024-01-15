import { computed } from 'vue'

const cacheMap = new Map()
/**
 * @desc 组件自定义v-model
 * @param { any } props
 * @param { string } propName
 * @param { any } emits
 */
export default (props: any, propName: string, emits: any) =>
  computed({
    get() {
      const currProp = props[propName]
      if (cacheMap.has(currProp)) {
        return cacheMap.get(currProp)
      }
      const proxy = new Proxy(currProp, {
        get(target, key) {
          // console.log('proxy get', target, key)
          return Reflect.get(target, key)
        },
        set(target, key, value) {
          // console.log('proxy set', target, key, value)
          Reflect.set(target, key, value)
          emits('update:' + propName, {
            ...target,
            [key]: value,
          })
          return true
        },
      })
      cacheMap.set(currProp, proxy)
      return proxy
    },
    set(val) {
      emits('update:' + propName, val)
    },
  })
