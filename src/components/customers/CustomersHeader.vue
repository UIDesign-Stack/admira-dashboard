<template>
  <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-3">

    <!-- Judul -->
    <div>
      <h1 class="text-lg font-bold text-gray-900">Customers</h1>
      <p class="text-xs text-gray-400 mt-0.5">Manage and monitor your customer base.</p>
    </div>

    <!-- Search + Add Button -->
    <div class="flex items-center gap-2">

      <!-- Search -->
      <div class="flex items-center gap-2 bg-white border border-gray-100 rounded-xl px-3 py-2 w-52 shadow-sm">
        <MagnifyingGlassIcon class="w-4 h-4 text-gray-400 flex-shrink-0" />
        <input
          v-model="search"
          type="text"
          placeholder="Search customer..."
          class="text-xs text-gray-600 bg-transparent outline-none w-full placeholder-gray-400"
        />
      </div>

      <!-- Add Customer -->
      <button
        @click="$emit('add-customer')"
        class="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-brand-500 to-brand-700 text-white text-xs font-semibold rounded-xl hover:opacity-90 transition-opacity shadow-sm whitespace-nowrap"
      >
        <UserPlusIcon class="w-4 h-4" />
        Add Customer
      </button>

    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { MagnifyingGlassIcon, UserPlusIcon } from '@heroicons/vue/24/outline'

defineEmits(['add-customer'])

const search = ref('')
</script>