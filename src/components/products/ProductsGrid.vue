<template>
  <div class="grid grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
    <div
      v-for="product in filteredProducts" :key="product.id"
      class="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden hover:shadow-md transition-shadow group"
    >
      <!-- Product Image Area -->
      <div :class="['h-32 flex items-center justify-center relative', product.iconBg]">
        <component :is="product.icon" :class="['w-14 h-14', product.iconColor]" />
        <span :class="['absolute top-2.5 right-2.5 text-[10px] font-semibold px-2 py-0.5 rounded-full', stockClass(product.stock)]">
          {{ product.stock }}
        </span>
      </div>
      <!-- Info -->
      <div class="p-3.5">
        <p class="text-[10px] text-gray-400 mb-1">{{ product.category }}</p>
        <p class="text-xs font-bold text-gray-800 mb-1 truncate">{{ product.name }}</p>
        <p class="text-sm font-bold text-brand-600 mb-3">{{ product.price }}</p>
        <div class="flex items-center justify-between">
          <span class="text-[10px] text-gray-400">{{ product.sold }} sold</span>
          <div class="flex items-center gap-1">
            <button
              @click="openModal(product)"
              class="w-7 h-7 rounded-lg bg-brand-50 flex items-center justify-center hover:bg-brand-100 transition-colors"
            >
              <svg class="w-3.5 h-3.5 text-brand-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"/>
              </svg>
            </button>
            <button class="w-7 h-7 rounded-lg bg-red-50 flex items-center justify-center hover:bg-red-100 transition-colors">
              <svg class="w-3.5 h-3.5 text-red-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"/>
              </svg>
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { useProducts } from '@/composables/useProducts'

const { filteredProducts, stockClass, openModal } = useProducts()
</script>