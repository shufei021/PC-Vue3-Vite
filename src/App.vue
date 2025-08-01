<!-- src/App.vue -->
<script setup lang="ts">
// 无需引入任何东西，router-view 是 Vue Router 全局注册的组件
</script>

<template>
  <div id="app">
    <!-- 顶部导航（可选） -->
    <nav style="padding: 10px; background: #f0f0f0; margin-bottom: 20px">
      <router-link to="/">首页</router-link> |
      <router-link to="/about">关于</router-link>
    </nav>

    <!-- 路由出口：匹配的组件会在这里渲染 -->
    <router-view />
  </div>
</template>

<style scoped>
/* 可以添加全局样式 */
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
  margin: 0;
  padding: 20px;
}
</style>
