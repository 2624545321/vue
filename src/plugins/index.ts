// svg
import './useSvg'
// tailwindcss
import './tailwind'
import './nprogress'
// elementPlus
import element from './element'
import { App } from 'vue'

export default {
  install(app: App) {
    app.use(element)
  },
}
