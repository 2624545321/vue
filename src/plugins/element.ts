import 'element-plus/dist/index.css'
import ElementPlus from 'element-plus'
import zhCn from 'element-plus/dist/locale/zh-cn.mjs'
// import * as ElementPlusIconsVue from '@element-plus/icons-vue'
import { User, Lock } from '@element-plus/icons-vue'
import { App } from 'vue'

// 引入需要使用的图标
const ElementPlusIconsVue = {
  User,
  Lock,
}
export default {
  install(app: App) {
    // console.log('install', app)
    app.use(ElementPlus, {
      locale: zhCn,
    })

    for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
      app.component(key, component)
    }
  },
}
