// svg
import './useSvg'
// elementPlus
import element from './element'
import { App } from 'vue'

export default {
  install(app: App) {
    app.use(element)
  },
}
