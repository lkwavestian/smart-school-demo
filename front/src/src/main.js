import { createApp } from 'vue'
//导入路由
import router from './router'
import App from './App.vue'
import {createPinia} from 'pinia'
import piniaPluginPersistedstate from 'pinia-plugin-persistedstate'
//element-plus
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
//粒子模块
import Particles from "vue3-particles";
//可视化大屏组件库
import DataVVue3 from '@kjgl77/datav-vue3'

//配置axios拦截器
import "./util/axios.config"

const pinia = createPinia()
pinia.use(piniaPluginPersistedstate)

createApp(App)
.use(pinia)
.use(router)
.use(ElementPlus)
.use(Particles)
.use(DataVVue3)
.mount('#app')
