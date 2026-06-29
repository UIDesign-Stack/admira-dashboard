<template>
  <div class="grid grid-cols-2 lg:grid-cols-4 gap-3 mb-6">
    <div v-for="stat in stats" :key="stat.label"
      class="bg-white rounded-2xl p-4 shadow-sm border border-gray-100">
      <div class="flex items-start justify-between mb-3">
        <div :class="['w-8 h-8 rounded-xl flex items-center justify-center', stat.iconBg]">
          <component :is="stat.icon" :class="['w-4 h-4', stat.iconColor]" />
        </div>
        <span :class="['text-[10px] font-semibold px-1.5 py-0.5 rounded-full', stat.badgeClass]">
          {{ stat.badge }}
        </span>
      </div>
      <p class="text-[11px] text-gray-400 mb-1">{{ stat.label }}</p>
      <p class="text-lg font-bold text-gray-900">{{ stat.value }}</p>
    </div>
  </div>
</template>

<script setup>
import { useOrders } from '@/composables/useOrders'

const { stats } = useOrders()
</script>