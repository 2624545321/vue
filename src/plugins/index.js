import _axios from './axios'
import globalConst from './globalConst'

export default {
  install(Vue) {
    Vue.prototype.$axios = _axios
    Vue.use(globalConst)
  },
}
