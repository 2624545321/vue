import { createApp } from 'vue'
import './style.css'
import App from './App.vue'
// style
import '@/styles/index.scss'
// plugins
import plugins from '@/plugins'
// 自定义全局组件
import GlobalComponent from './components/globalComponent'
// import './../mock/user'
// router
import router from './router'
createApp(App).use(GlobalComponent).use(plugins).use(router).mount('#app')
