<template>
  <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-3">

    <!-- Judul -->
    <div>
      <h1 class="text-lg font-bold text-gray-900">Reports</h1>
      <p class="text-xs text-gray-400 mt-0.5">Financial summary and performance reports.</p>
    </div>

    <!-- Filter + Export -->
    <div class="flex items-center gap-2 flex-wrap">
      <!-- Period filter -->
      <div class="flex items-center gap-1 bg-white border border-gray-100 rounded-xl p-1 shadow-sm">
        <button
          v-for="period in periods" :key="period"
          @click="activePeriod = period"
          :class="[
            'px-3 py-1.5 rounded-lg text-xs font-medium transition-all',
            activePeriod === period
              ? 'bg-brand-500 text-white shadow-sm'
              : 'text-gray-500 hover:bg-gray-50'
          ]"
        >
          {{ period }}
        </button>
      </div>

      <!-- Export button -->
      <button class="flex items-center gap-2 px-4 py-2 bg-white border border-gray-100 text-gray-600 text-xs font-semibold rounded-xl hover:bg-gray-50 transition-colors shadow-sm">
        <ArrowDownTrayIcon class="w-4 h-4" />
        Export
      </button>
    </div>

  </div>
</template>

<script setup>
import { ref } from 'vue'
import { ArrowDownTrayIcon } from '@heroicons/vue/24/outline'

const periods      = ['Weekly', 'Monthly', 'Quarterly', 'Yearly']
const activePeriod = ref('Monthly')
</script>