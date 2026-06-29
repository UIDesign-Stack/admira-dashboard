<template>
  <div class="space-y-4">

    <!-- Current Plan -->
    <div class="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
      <h2 class="font-bold text-base text-gray-900 mb-0.5">Current Plan</h2>
      <p class="text-xs text-gray-400 mb-5">Manage your subscription and billing</p>

      <div class="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 p-4 rounded-2xl bg-gradient-to-br from-brand-50 to-purple-50 border border-brand-100">
        <div class="flex items-center gap-4">
          <div class="w-12 h-12 rounded-2xl bg-gradient-to-br from-brand-500 to-brand-700 flex items-center justify-center flex-shrink-0">
            <svg class="w-6 h-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z"/>
            </svg>
          </div>
          <div>
            <div class="flex items-center gap-2">
              <p class="text-sm font-bold text-gray-900">Starter Plan</p>
              <span class="text-[10px] font-bold text-brand-600 bg-brand-100 px-2 py-0.5 rounded-full">Active</span>
            </div>
            <p class="text-xs text-gray-500 mt-0.5">Billed monthly · Renews on Jul 29, 2026</p>
          </div>
        </div>
        <div class="text-right flex-shrink-0">
          <p class="text-xl font-bold text-gray-900">$29<span class="text-sm font-medium text-gray-400">/mo</span></p>
          <button class="text-[11px] text-brand-500 font-semibold hover:text-brand-700 mt-1 transition-colors">
            Upgrade Plan →
          </button>
        </div>
      </div>

      <!-- Usage -->
      <div class="mt-5 grid grid-cols-2 sm:grid-cols-3 gap-3">
        <div v-for="u in usage" :key="u.label" class="bg-gray-50 rounded-xl p-3">
          <p class="text-[10px] text-gray-400 mb-1">{{ u.label }}</p>
          <p class="text-sm font-bold text-gray-800">{{ u.used }} <span class="text-[11px] font-normal text-gray-400">/ {{ u.limit }}</span></p>
          <div class="mt-1.5 h-1.5 bg-gray-200 rounded-full overflow-hidden">
            <div class="h-full rounded-full bg-brand-500 transition-all"
                 :style="{ width: (parseInt(u.used) / parseInt(u.limit) * 100) + '%' }"></div>
          </div>
        </div>
      </div>
    </div>

    <!-- Payment Method -->
    <div class="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
      <div class="flex items-center justify-between mb-5">
        <div>
          <h2 class="font-bold text-base text-gray-900">Payment Method</h2>
          <p class="text-xs text-gray-400 mt-0.5">Manage your payment details</p>
        </div>
        <button class="flex items-center gap-1.5 text-xs font-semibold text-brand-500 hover:text-brand-700 transition-colors">
          <svg class="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4"/>
          </svg>
          Add Card
        </button>
      </div>

      <div class="space-y-3">
        <div v-for="card in cards" :key="card.id"
          class="flex items-center justify-between p-3.5 rounded-xl border transition-colors"
          :class="card.default ? 'border-brand-200 bg-brand-50/40' : 'border-gray-100 bg-gray-50'">
          <div class="flex items-center gap-3">
            <div class="w-10 h-7 rounded-lg bg-gradient-to-r from-gray-700 to-gray-900 flex items-center justify-center flex-shrink-0">
              <svg class="w-5 h-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z"/>
              </svg>
            </div>
            <div>
              <p class="text-xs font-semibold text-gray-800">{{ card.brand }} ···· {{ card.last4 }}</p>
              <p class="text-[10px] text-gray-400">Expires {{ card.expiry }}</p>
            </div>
          </div>
          <div class="flex items-center gap-2">
            <span v-if="card.default" class="text-[10px] font-semibold text-brand-600 bg-brand-100 px-2 py-0.5 rounded-full">Default</span>
            <button v-else class="text-[11px] text-gray-400 hover:text-red-400 transition-colors">Remove</button>
          </div>
        </div>
      </div>
    </div>

    <!-- Invoice History -->
    <div class="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
      <h2 class="font-bold text-base text-gray-900 mb-5">Invoice History</h2>
      <div class="space-y-2">
        <div v-for="inv in invoices" :key="inv.id"
          class="flex items-center justify-between p-3 rounded-xl hover:bg-gray-50 transition-colors">
          <div class="flex items-center gap-3">
            <div class="w-8 h-8 rounded-lg bg-gray-100 flex items-center justify-center flex-shrink-0">
              <svg class="w-4 h-4 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"/>
              </svg>
            </div>
            <div>
              <p class="text-xs font-semibold text-gray-800">{{ inv.date }}</p>
              <p class="text-[10px] text-gray-400">{{ inv.plan }}</p>
            </div>
          </div>
          <div class="flex items-center gap-3">
            <span class="text-xs font-bold text-gray-800">{{ inv.amount }}</span>
            <span class="text-[10px] font-semibold text-green-600 bg-green-50 px-2 py-0.5 rounded-full">Paid</span>
            <button class="text-[11px] text-brand-500 font-semibold hover:text-brand-700 transition-colors">Download</button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
const usage = [
  { label: 'Products',   used: '128', limit: '500'  },
  { label: 'Orders/mo',  used: '2560', limit: '5000' },
  { label: 'Team Members', used: '3', limit: '5'    },
]
const cards = [
  { id: 1, brand: 'Visa',       last4: '4242', expiry: '08/27', default: true  },
  { id: 2, brand: 'Mastercard', last4: '8765', expiry: '12/26', default: false },
]
const invoices = [
  { id: 1, date: 'Jun 29, 2026', plan: 'Starter Plan', amount: '$29.00' },
  { id: 2, date: 'May 29, 2026', plan: 'Starter Plan', amount: '$29.00' },
  { id: 3, date: 'Apr 29, 2026', plan: 'Starter Plan', amount: '$29.00' },
]
</script>