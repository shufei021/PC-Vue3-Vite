<script setup lang="ts">
import { getUserInfo, getUserList, slow } from '@/api/user'
import { useCounterStore } from '@/stores/mudules/counter'
import { onMounted, ref } from 'vue'
const counter = useCounterStore()
const inputValue = ref('')
onMounted(async () => {
  const info = await getUserInfo()
  const userList = await getUserList({ page: 1, size: 20 })
  console.log(info) // 应该拿到 mock 数据
  console.log(userList) // 应该拿到 mock 数据
  const slowTest = await slow()
  console.log(slowTest)
})
</script>

<template>
  <div>
    Count: {{ counter.count }}
    <el-button @click="counter.increment">+1</el-button>
    <!-- 与 v-model 结合使用 -->
    <el-input v-model="inputValue" v-number placeholder="输入数字" clearable />
    <p>输入的值: {{ inputValue }}</p>
  </div>
</template>
