import { App } from 'vue'

declare module 'vue' {
  interface ComponentCustomProperties {
    $own: 'gry'
  }
}

//const { proxy } = getCurrentInstance() as ComponentInternalInstance
// console.log('proxy', proxy, proxy.$own)

export default {
  install(app: App) {
    app.config.globalProperties.$own = 'gry'
  },
}
