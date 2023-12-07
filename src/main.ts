import { createApp } from 'vue'
import './style.css'
import App from './App.vue'
// style
import '@/styles/index.scss'
// plugins
import plugins from '@/plugins'
// 自定义全局组件
import GlobalComponent from './components/globalComponent'
// router
import router from './router'
import './router/permission'
// store
import pinia from './store'
const app = createApp(App)
  .use(GlobalComponent)
  .use(plugins)
  .use(router)
  .use(pinia)

app.mount('#app')
