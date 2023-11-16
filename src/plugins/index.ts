// svg
import './useSvg'
// tailwindcss
import './tailwind'
// elementPlus
import element from './element'
import { App } from 'vue'

export default {
  install(app: App) {
    app.use(element)
  },
}
