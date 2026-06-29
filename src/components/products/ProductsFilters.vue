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
          placeholder="Search products..."
          class="flex-1 bg-transparent text-xs text-gray-700 placeholder-gray-400 outline-none"
        />
      </div>

      <div class="flex items-center gap-2 flex-shrink-0">
        <!-- Category Filter -->
        <div class="flex items-center gap-1.5 overflow-x-auto">
          <button
            v-for="cat in categories" :key="cat"
            @click="activeCategory = cat"
            :class="[
              'flex-shrink-0 text-[11px] font-semibold px-3 py-2 rounded-xl transition-all',
              activeCategory === cat
                ? 'bg-brand-500 text-white shadow-sm'
                : 'bg-gray-50 text-gray-500 hover:bg-gray-100 border border-gray-100'
            ]"
          >{{ cat }}</button>
        </div>

        <!-- View Toggle -->
        <div class="flex items-center bg-gray-50 border border-gray-100 rounded-xl p-1 gap-1 ml-1">
          <button
            v-for="v in ['grid', 'list']" :key="v"
            @click="viewMode = v"
            :class="['w-7 h-7 rounded-lg flex items-center justify-center transition-colors',
              viewMode === v ? 'bg-white shadow-sm text-brand-500' : 'text-gray-400 hover:text-gray-600']"
          >
            <svg v-if="v === 'grid'" class="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z"/>
            </svg>
            <svg v-else class="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 10h16M4 14h16M4 18h16"/>
            </svg>
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { useProducts } from '@/composables/useProducts'

const { search, activeCategory, viewMode, categories } = useProducts()
</script>