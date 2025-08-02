import vue from '@vitejs/plugin-vue'
import path from 'path' // 👈 引入 path
import { defineConfig } from 'vite'
import { viteMockServe } from 'vite-plugin-mock'

// https://vite.dev/config/
export default defineConfig(({ mode }) => {
  return {
    plugins: [
      vue(),
      viteMockServe({
        mockPath: 'src/mock', // mock 文件存放目录
        enable: mode === 'dev' // 只在开发环境启用 Mock
      })
    ],
    resolve: {
      alias: {
        '@': path.resolve(__dirname, 'src') // 设置 @ 指向 src
      }
    },
    // 当你修改 mock 文件夹下的内容时，浏览器页面会自动更新，极大地提高了开发效率
    server: {
      hmr: true // 热更新
    }
  }
})
