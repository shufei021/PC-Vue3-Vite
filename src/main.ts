import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import pinia from './stores'

// 👇 引入 Element Plus (全局引入是因为可以使用CDN)
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'

const app = createApp(App)
app.use(router)
app.use(pinia)
app.use(ElementPlus) // 使用 Element Plus
app.mount('#app')
