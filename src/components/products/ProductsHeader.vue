<template>
  <div class="flex items-center justify-between mb-6">
    <div>
      <h1 class="text-lg font-bold text-gray-900">Products</h1>
      <p class="text-xs text-gray-400 mt-0.5">Manage your product catalog</p>
    </div>
    <button
      @click="openModal()"
      class="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-gradient-to-r from-brand-500 to-brand-700 text-white text-xs font-semibold hover:opacity-90 transition-opacity"
    >
      <svg class="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
        <path stroke-linecap="round" stroke-linejoin="round" d="M12 4v16m8-8H4"/>
      </svg>
      Add Product
    </button>
  </div>
</template>

<script setup>
import { useProducts } from '@/composables/useProducts'

const { openModal } = useProducts()
</script>