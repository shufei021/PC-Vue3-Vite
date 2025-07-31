<script setup lang="ts">
import { useCounterStore } from '@/stores/mudules/counter'
import { ref } from 'vue'

const counter = useCounterStore()
const inputValue = ref('')
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
