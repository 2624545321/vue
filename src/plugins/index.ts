// svg
import './useSvg'
// tailwindcss
import './tailwind'
import './nprogress'
// elementPlus
import element from './element'
import globalProperties from './globalProperties'
import { App } from 'vue'

export default {
  install(app: App) {
    app.use(element).use(globalProperties)
  },
}
