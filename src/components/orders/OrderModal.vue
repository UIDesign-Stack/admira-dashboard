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
          <p class="text-sm font-bold text-gray-900">{{ editingOrder ? 'Edit Order' : 'Add Order' }}</p>
          <button @click="showModal = false"
            class="w-8 h-8 rounded-xl bg-gray-50 border border-gray-100 flex items-center justify-center hover:bg-gray-100 transition-colors">
            <svg class="w-4 h-4 text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"/>
            </svg>
          </button>
        </div>
        <div class="p-5 space-y-4">
          <div>
            <label class="block text-[11px] font-semibold text-gray-500 mb-1.5">Order ID</label>
            <input v-model="form.id" type="text" placeholder="#ORD-2024-006" disabled
              class="w-full bg-gray-100 border border-gray-100 rounded-xl px-3 py-2.5 text-xs text-gray-500 outline-none cursor-not-allowed"/>
            <p class="text-[10px] text-gray-400 mt-1">Auto-generated, can't be edited</p>
          </div>
          <div>
            <label class="block text-[11px] font-semibold text-gray-500 mb-1.5">Customer Name</label>
            <input v-model="form.customer" type="text" placeholder="e.g. John Doe"
              class="w-full bg-gray-50 border border-gray-100 rounded-xl px-3 py-2.5 text-xs text-gray-800 outline-none focus:border-brand-300 focus:bg-white transition-colors"/>
          </div>
          <div class="grid grid-cols-2 gap-3">
            <div>
              <label class="block text-[11px] font-semibold text-gray-500 mb-1.5">Status</label>
              <select v-model="form.status"
                class="w-full bg-gray-50 border border-gray-100 rounded-xl px-3 py-2.5 text-xs text-gray-800 outline-none focus:border-brand-300 focus:bg-white transition-colors">
                <option>Pending</option>
                <option>Processing</option>
                <option>Completed</option>
                <option>Cancelled</option>
              </select>
            </div>
            <div>
              <label class="block text-[11px] font-semibold text-gray-500 mb-1.5">Order Date</label>
              <input v-model="form.date" type="date"
                class="w-full bg-gray-50 border border-gray-100 rounded-xl px-3 py-2.5 text-xs text-gray-800 outline-none focus:border-brand-300 focus:bg-white transition-colors"/>
            </div>
          </div>
          <div>
            <label class="block text-[11px] font-semibold text-gray-500 mb-1.5">Amount</label>
            <input v-model="form.amount" type="text" placeholder="e.g. Rp 250.000"
              class="w-full bg-gray-50 border border-gray-100 rounded-xl px-3 py-2.5 text-xs text-gray-800 outline-none focus:border-brand-300 focus:bg-white transition-colors"/>
          </div>
        </div>
        <div class="flex gap-2 px-5 pb-5">
          <button type="button" @click="showModal = false"
            class="flex-1 py-2.5 rounded-xl border border-gray-200 text-xs font-semibold text-gray-600 hover:bg-gray-50 transition-colors">
            Cancel
          </button>
          <button type="button" @click="saveOrder"
            class="flex-1 py-2.5 rounded-xl bg-gradient-to-r from-brand-500 to-brand-700 text-white text-xs font-semibold hover:opacity-90 transition-opacity">
            {{ editingOrder ? 'Save Changes' : 'Add Order' }}
          </button>
        </div>
      </div>
    </div>
  </Transition>
</template>

<script setup>
import { useOrders } from '@/composables/useOrders'

const { showModal, editingOrder, form, saveOrder } = useOrders()
</script>