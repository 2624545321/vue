// svg
import './useSvg'
// elementPlus
import { App } from 'vue'
import ElementPlus from 'element-plus'
import zhCn from 'element-plus/dist/locale/zh-cn.mjs'
// import 'element-plus/dist/index.css'

export default {
  install(app: App) {
    app.use(ElementPlus, {
      locale: zhCn,
    })
  },
}
