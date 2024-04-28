import Vue from 'vue'

import 'normalize.css/normalize.css' // A modern alternative to CSS resets

import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import locale from 'element-ui/lib/locale/lang/zh-CN' // lang i18n

import '@/styles/index.scss' // global css
import '@/styles/app.css'

// import vueSelect2 from 'vue-select2'
// import 'select2/dist/js/select2.js'
// import 'vue-select/dist/vue-select.css'
// import 'vue-select2/dist/vue-select'

import App from './App'
import store from './store'
import router from './router'

import '@/icons' // icon
import '@/permission' // permission control

// flexiable
import './utils/flexiable'
import './utils/filter'

/* 请求改版，现在使用 axionsIntance 
directory:  ./plugins/axios
*/
import plugins from './plugins/index'
// ajax
// import axios from 'axios'
// Vue.prototype.$ajax = axios

// axios http请求
// import http from '@/utils/http'
// Vue.prototype.$http = http
// 挂载时间管理
import moment from 'moment'
Vue.prototype.$moment = moment

// 封装message
import message from '@/utils/msg.js'
Vue.prototype.$msg = message
import confrimmsg from '@/utils/confirmMsg.js'
Vue.prototype.$confrimmsg = confrimmsg

// 引入echarts
import echarts from 'echarts'
Vue.prototype.$echarts = echarts

// 全局组件注册
import globalComponents from './components/globalComponents'

/**
 * If you don't want to use mock-server
 * you want to use MockJs for mock api
 * you can execute: mockXHR()
 *
 * Currently MockJs will be used in the production environment,
 * please remove it before going online! ! !
 */
import { mockXHR } from '../mock'
if (process.env.NODE_ENV === 'production') {
  mockXHR()
}

// set ElementUI lang to EN
Vue.use(ElementUI, { locale })
Vue.use(globalComponents)
Vue.use(plugins)
// 如果想要中文版 element-ui，按如下方式声明
// Vue.use(ElementUI)

Vue.config.productionTip = false

new Vue({
  el: '#app',
  router,
  store,
  render: h => h(App)
})
