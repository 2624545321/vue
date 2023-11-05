import { App, Component } from "vue"
import SvgIcon from './SvgIcon/SvgIcon.vue'
import CustomPagination from './CustomPagination/CustomPagination.vue'
const globalComponent = {
  SvgIcon,
  CustomPagination
}

export default {
  install(app: App) {
    Object.entries(globalComponent).forEach(c => {
      app.component(c.at(0) as string, c.at(1) as Component)
    })
  }
}