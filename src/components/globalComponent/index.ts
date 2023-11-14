import { App, Component } from 'vue'
import SvgIcon from './SvgIcon/SvgIcon.vue'
import CustomPagination from './CustomPagination/CustomPagination.vue'
const globalComponent = {
  SvgIcon,
  CustomPagination,
}

/* 全局组件将会在此自动注入 */
export default {
  install(app: App) {
    Object.entries(globalComponent).forEach((c) => {
      app.component(c.at(0) as string, c.at(1) as Component)
    })
  },
}
