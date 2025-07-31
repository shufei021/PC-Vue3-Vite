import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import pinia from './stores'

// 👇 引入 Element Plus (全局引入是因为可以使用CDN)
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'

// 引入指令注册函数
import setupDirectives from './directives'

const app = createApp(App)
app.use(router)
app.use(pinia)
app.use(ElementPlus) // 使用 Element Plus

// 注册所有自定义指令
setupDirectives(app)

app.mount('#app')

window.addEventListener(
  'unhandledrejection',
  function browserRejectionHandler(event) {
    if (event && event.reason && event.reason.name === 'ChunkLoadError') {
      // 页面资源加载失败，系统更新，系统已更新,点击【确认】后将【刷新页面】
      // 点击确定：window.location.reload()
      // 点击取消：用户取消了刷新页面
    } else {
      console.error(event)
    }
  }
)
