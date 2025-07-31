// src/directives/index.ts  项目全局指令 自动化注册，只管使用
import type { App, Directive } from 'vue'

// 自动导入所有指令模块
const modules = import.meta.glob('./modules/*.ts', { eager: true })

export default function setupDirectives(app: App) {
  for (const path in modules) {
    const moduleName = path.match(/\/(\w+)\.ts$/)?.[1]
    if (moduleName) {
      const module = modules[path] as { default: Directive }
      app.directive(moduleName, module.default)
    }
  }
}
