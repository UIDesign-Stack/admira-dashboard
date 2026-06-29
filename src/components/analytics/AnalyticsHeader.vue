<template>
  <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-3">

    <!-- Judul -->
    <div>
      <h1 class="text-lg font-bold text-gray-900">Analytics</h1>
      <p class="text-xs text-gray-400 mt-0.5">Track your store performance in detail.</p>
    </div>

    <!-- Date Range Filter -->
    <div class="flex items-center gap-2 flex-wrap">
      <button
        v-for="range in ranges" :key="range"
        @click="activeRange = range"
        :class="[
          'px-3 py-1.5 rounded-xl text-xs font-medium transition-all',
          activeRange === range
            ? 'bg-brand-500 text-white shadow-sm'
            : 'bg-white text-gray-500 border border-gray-100 hover:bg-gray-50'
        ]"
      >
        {{ range }}
      </button>
    </div>

  </div>
</template>

<script setup>
import { ref } from 'vue'

const ranges      = ['Today', 'This Week', 'This Month', 'This Year']
const activeRange = ref('This Month')
</script>