import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import * as ElementPlusIconsVue from '@element-plus/icons-vue'

import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'

import * as echarts from 'echarts'

const app = createApp(App)

app.config.globalProperties.$echarts = echarts

for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
  app.component(key, component)
}

import zhCn from 'element-plus/es/locale/lang/zh-cn'

app.use(ElementPlus, {
  locale: zhCn,
})

app.use(router)
app.use(ElementPlus)

app.mount('#app')