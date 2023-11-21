import { App } from 'vue'
import 'element-plus/dist/index.css'
import ElementPlus from 'element-plus'
import zhCn from 'element-plus/dist/locale/zh-cn.mjs'
// import * as ElementPlusIconsVue from '@element-plus/icons-vue'
import { User, Lock, Setting } from '@element-plus/icons-vue'

// 引入需要使用的图标 => 全局引入
const ElementPlusIconsVue = Object.freeze({
  User,
  Lock,
  Setting,
})
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
