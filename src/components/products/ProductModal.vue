<template>
  <Transition
    enter-active-class="transition-all duration-200 ease-out"
    enter-from-class="opacity-0"
    enter-to-class="opacity-100"
    leave-active-class="transition-all duration-150 ease-in"
    leave-from-class="opacity-100"
    leave-to-class="opacity-0"
  >
    <div v-if="showModal" class="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div class="absolute inset-0 bg-black/30 backdrop-blur-sm" @click="showModal = false"></div>
      <div class="relative bg-white rounded-2xl shadow-2xl w-full max-w-md">
        <div class="flex items-center justify-between px-5 py-4 border-b border-gray-100">
          <p class="text-sm font-bold text-gray-900">{{ editingProduct ? 'Edit Product' : 'Add Product' }}</p>
          <button @click="showModal = false"
            class="w-8 h-8 rounded-xl bg-gray-50 border border-gray-100 flex items-center justify-center hover:bg-gray-100 transition-colors">
            <svg class="w-4 h-4 text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"/>
            </svg>
          </button>
        </div>
        <div class="p-5 space-y-4 max-h-[75vh] overflow-y-auto">
          <div>
            <label class="block text-[11px] font-semibold text-gray-500 mb-1.5">Product Name</label>
            <input v-model="form.name" type="text" placeholder="e.g. Wireless Headphone Pro"
              class="w-full bg-gray-50 border border-gray-100 rounded-xl px-3 py-2.5 text-xs text-gray-800 outline-none focus:border-brand-300 focus:bg-white transition-colors"/>
          </div>
          <div>
            <label class="block text-[11px] font-semibold text-gray-500 mb-1.5">Icon</label>
            <div class="flex items-center gap-2 flex-wrap">
              <button
                v-for="opt in iconOptions" :key="opt.key"
                type="button"
                @click="form.iconKey = opt.key"
                :title="opt.label"
                :class="[
                  'w-9 h-9 rounded-xl flex items-center justify-center border-2 transition-colors',
                  opt.iconBg,
                  form.iconKey === opt.key ? 'border-brand-400' : 'border-transparent hover:border-gray-200'
                ]"
              >
                <component :is="opt.icon" :class="['w-4.5 h-4.5', opt.iconColor]" />
              </button>
            </div>
          </div>
          <div class="grid grid-cols-2 gap-3">
            <div>
              <label class="block text-[11px] font-semibold text-gray-500 mb-1.5">Category</label>
              <select v-model="form.category"
                class="w-full bg-gray-50 border border-gray-100 rounded-xl px-3 py-2.5 text-xs text-gray-800 outline-none focus:border-brand-300 focus:bg-white transition-colors">
                <option v-for="cat in categories.slice(1)" :key="cat">{{ cat }}</option>
              </select>
            </div>
            <div>
              <label class="block text-[11px] font-semibold text-gray-500 mb-1.5">Stock Status</label>
              <select v-model="form.stock"
                class="w-full bg-gray-50 border border-gray-100 rounded-xl px-3 py-2.5 text-xs text-gray-800 outline-none focus:border-brand-300 focus:bg-white transition-colors">
                <option>In Stock</option>
                <option>Low Stock</option>
                <option>Out of Stock</option>
              </select>
            </div>
          </div>
          <div class="grid grid-cols-2 gap-3">
            <div>
              <label class="block text-[11px] font-semibold text-gray-500 mb-1.5">Price</label>
              <input v-model="form.price" type="text" placeholder="e.g. Rp 250.000"
                class="w-full bg-gray-50 border border-gray-100 rounded-xl px-3 py-2.5 text-xs text-gray-800 outline-none focus:border-brand-300 focus:bg-white transition-colors"/>
            </div>
            <div>
              <label class="block text-[11px] font-semibold text-gray-500 mb-1.5">Sold</label>
              <input v-model="form.sold" type="number" min="0" placeholder="0"
                class="w-full bg-gray-50 border border-gray-100 rounded-xl px-3 py-2.5 text-xs text-gray-800 outline-none focus:border-brand-300 focus:bg-white transition-colors"/>
            </div>
          </div>
          <div>
            <label class="block text-[11px] font-semibold text-gray-500 mb-1.5">Description</label>
            <textarea v-model="form.description" rows="3" placeholder="Short product description..."
              class="w-full bg-gray-50 border border-gray-100 rounded-xl px-3 py-2.5 text-xs text-gray-800 outline-none focus:border-brand-300 focus:bg-white transition-colors resize-none"/>
          </div>
        </div>
        <div class="flex gap-2 px-5 pb-5">
          <button type="button" @click="showModal = false"
            class="flex-1 py-2.5 rounded-xl border border-gray-200 text-xs font-semibold text-gray-600 hover:bg-gray-50 transition-colors">
            Cancel
          </button>
          <button type="button" @click="saveProduct"
            class="flex-1 py-2.5 rounded-xl bg-gradient-to-r from-brand-500 to-brand-700 text-white text-xs font-semibold hover:opacity-90 transition-opacity">
            {{ editingProduct ? 'Save Changes' : 'Add Product' }}
          </button>
        </div>
      </div>
    </div>
  </Transition>
</template>

<script setup>
import { useProducts } from '@/composables/useProducts'

const { showModal, editingProduct, form, categories, iconOptions, saveProduct } = useProducts()
</script>