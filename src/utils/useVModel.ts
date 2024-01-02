import { computed } from 'vue'

const cacheMap = new WeakMap()

export default (props: any, propName: any, emits: any) =>
  computed({
    get() {
      // return props.formData
      // if (!props.formData) return {}
      // console.log('props.formData', props.formData)
      if (cacheMap.has(props[propName])) {
        return cacheMap.get(props[propName])
      }
      const proxy = new Proxy(props[propName], {
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
      cacheMap.set(props[propName], proxy)
      return proxy
    },
    set(val) {
      emits('update:' + propName, val)
    },
  })
