<template>
  <div class="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
    <div class="hidden sm:block overflow-x-auto">
      <table class="w-full">
        <thead>
          <tr class="border-b border-gray-100 bg-gray-50/50">
            <th class="text-left text-[11px] font-semibold text-gray-400 px-5 py-3.5">Order ID</th>
            <th class="text-left text-[11px] font-semibold text-gray-400 px-4 py-3.5">Customer</th>
            <th class="text-left text-[11px] font-semibold text-gray-400 px-4 py-3.5">Date</th>
            <th class="text-center text-[11px] font-semibold text-gray-400 px-4 py-3.5">Status</th>
            <th class="text-right text-[11px] font-semibold text-gray-400 px-4 py-3.5">Amount</th>
            <th class="text-center text-[11px] font-semibold text-gray-400 px-5 py-3.5">Action</th>
          </tr>
        </thead>
        <tbody class="divide-y divide-gray-50">
          <tr v-if="filteredOrders.length === 0">
            <td colspan="6" class="text-center py-16 text-sm text-gray-400">No orders found</td>
          </tr>
          <tr v-for="order in filteredOrders" :key="order.id"
            class="hover:bg-gray-50/50 transition-colors">
            <td class="px-5 py-3.5">
              <p class="text-xs font-semibold text-gray-700">{{ order.id }}</p>
            </td>
            <td class="px-4 py-3.5">
              <div class="flex items-center gap-2.5">
                <div :class="['w-8 h-8 rounded-full flex items-center justify-center text-white text-[11px] font-bold flex-shrink-0', avatarClass(order.customer)]">
                  {{ initials(order.customer) }}
                </div>
                <p class="text-xs font-medium text-gray-800">{{ order.customer }}</p>
              </div>
            </td>
            <td class="px-4 py-3.5">
              <p class="text-[11px] text-gray-500">{{ formatDate(order.date) }}</p>
            </td>
            <td class="px-4 py-3.5 text-center">
              <span :class="['text-[10px] font-semibold px-2.5 py-1 rounded-full', statusClass(order.status)]">
                {{ order.status }}
              </span>
            </td>
            <td class="px-4 py-3.5 text-right">
              <p class="text-xs font-bold text-gray-800">{{ order.amount }}</p>
            </td>
            <td class="px-5 py-3.5">
              <div class="flex items-center justify-center gap-1.5">
                <button @click="openModal(order)"
                  class="w-7 h-7 rounded-lg bg-brand-50 flex items-center justify-center hover:bg-brand-100 transition-colors">
                  <svg class="w-3.5 h-3.5 text-brand-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"/>
                  </svg>
                </button>
                <button @click="removeOrder(order)"
                  class="w-7 h-7 rounded-lg bg-red-50 flex items-center justify-center hover:bg-red-100 transition-colors">
                  <svg class="w-3.5 h-3.5 text-red-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"/>
                  </svg>
                </button>
              </div>
            </td>
          </tr>
        </tbody>
      </table>
    </div>

    <!-- Mobile list -->
    <div class="sm:hidden divide-y divide-gray-50">
      <div v-if="filteredOrders.length === 0" class="text-center py-16 text-sm text-gray-400">No orders found</div>
      <div v-for="order in filteredOrders" :key="order.id"
        class="flex items-center gap-3 p-4 hover:bg-gray-50/50 transition-colors" @click="openModal(order)">
        <div :class="['w-9 h-9 rounded-full flex items-center justify-center text-white text-xs font-bold flex-shrink-0', avatarClass(order.customer)]">
          {{ initials(order.customer) }}
        </div>
        <div class="flex-1 min-w-0">
          <div class="flex items-center justify-between">
            <p class="text-xs font-semibold text-gray-800 truncate">{{ order.customer }}</p>
            <p class="text-xs font-bold text-gray-800 flex-shrink-0 ml-2">{{ order.amount }}</p>
          </div>
          <div class="flex items-center justify-between mt-0.5">
            <p class="text-[10px] text-gray-400">{{ order.id }} · {{ formatDate(order.date) }}</p>
            <span :class="['text-[10px] font-semibold px-2 py-0.5 rounded-full', statusClass(order.status)]">
              {{ order.status }}
            </span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { useOrders } from '@/composables/useOrders'

const { filteredOrders, statusClass, avatarClass, initials, formatDate, openModal, removeOrder } = useOrders()
</script>