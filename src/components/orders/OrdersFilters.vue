<template>
  <div class="bg-white rounded-2xl p-4 shadow-sm border border-gray-100 mb-4">
    <div class="flex flex-col sm:flex-row items-stretch sm:items-center gap-3">

      <!-- Search -->
      <div class="flex items-center gap-2 flex-1 bg-gray-50 border border-gray-100 rounded-xl px-3 py-2.5">
        <svg class="w-4 h-4 text-gray-400 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"/>
        </svg>
        <input
          v-model="search"
          type="text"
          placeholder="Search by order ID or customer..."
          class="flex-1 bg-transparent text-xs text-gray-700 placeholder-gray-400 outline-none"
        />
      </div>

      <!-- Status Filter -->
      <div class="flex items-center gap-1.5 overflow-x-auto flex-shrink-0">
        <button
          v-for="s in statusFilters" :key="s"
          @click="activeStatus = s"
          :class="[
            'flex-shrink-0 text-[11px] font-semibold px-3 py-2 rounded-xl transition-all',
            activeStatus === s
              ? 'bg-brand-500 text-white shadow-sm'
              : 'bg-gray-50 text-gray-500 hover:bg-gray-100 border border-gray-100'
          ]"
        >{{ s }}</button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { useOrders } from '@/composables/useOrders'

const { search, activeStatus, statusFilters } = useOrders()
</script>