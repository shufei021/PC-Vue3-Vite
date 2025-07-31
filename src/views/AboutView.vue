<script setup lang="ts">
import { useCounterStore } from '@/stores/mudules/counter';
const counter = useCounterStore()
</script>

<template>
  <div>
    关于
    Count: {{ counter.count }}
    <button @click="counter.increment">+1</button>
  </div>
</template>