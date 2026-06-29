<template>
  <div class="bg-white rounded-2xl p-5 shadow-sm border border-gray-100">
    <!-- Header -->
    <div class="flex items-center justify-between mb-5">
      <div>
        <h2 class="font-semibold text-sm text-gray-900">Top Performing Products</h2>
        <p class="text-[11px] text-gray-400 mt-0.5">Based on revenue this month</p>
      </div>
      <button class="text-[11px] text-brand-500 font-medium hover:text-brand-700 transition-colors bg-brand-50 px-2.5 py-1 rounded-lg">
        View all
      </button>
    </div>

    <!-- Table Desktop -->
    <div class="hidden sm:block overflow-x-auto">
      <table class="w-full">
        <thead>
          <tr class="border-b border-gray-50">
            <th class="text-left text-[11px] font-semibold text-gray-400 pb-3 pr-4">Product</th>
            <th class="text-right text-[11px] font-semibold text-gray-400 pb-3 px-4">Revenue</th>
            <th class="text-right text-[11px] font-semibold text-gray-400 pb-3 px-4">Orders</th>
            <th class="text-right text-[11px] font-semibold text-gray-400 pb-3 px-4">Avg. Price</th>
            <th class="text-center text-[11px] font-semibold text-gray-400 pb-3 px-4">Growth</th>
            <th class="text-center text-[11px] font-semibold text-gray-400 pb-3 pl-4">Status</th>
          </tr>
        </thead>
        <tbody class="divide-y divide-gray-50">
          <tr v-for="product in products" :key="product.name"
            class="hover:bg-gray-50/50 transition-colors group"
          >
            <!-- Product -->
            <td class="py-3 pr-4">
              <div class="flex items-center gap-3">
                <div
                  class="w-9 h-9 rounded-xl flex items-center justify-center flex-shrink-0"
                  :style="{ backgroundColor: product.iconBg }"
                >
                  <component :is="product.icon" class="w-5 h-5" :style="{ color: product.iconColor }" />
                </div>
                <div>
                  <p class="text-xs font-semibold text-gray-800">{{ product.name }}</p>
                  <p class="text-[10px] text-gray-400">{{ product.category }}</p>
                </div>
              </div>
            </td>
            <!-- Revenue -->
            <td class="py-3 px-4 text-right">
              <p class="text-xs font-bold text-gray-800">{{ product.revenue }}</p>
            </td>
            <!-- Orders -->
            <td class="py-3 px-4 text-right">
              <p class="text-xs font-semibold text-gray-700">{{ product.orders }}</p>
            </td>
            <!-- Avg Price -->
            <td class="py-3 px-4 text-right">
              <p class="text-xs text-gray-600">{{ product.avgPrice }}</p>
            </td>
            <!-- Growth -->
            <td class="py-3 px-4">
              <div class="flex flex-col items-center gap-1">
                <span :class="['text-[11px] font-semibold flex items-center gap-0.5', product.positive ? 'text-green-600' : 'text-red-500']">
                  <svg class="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2.5">
                    <path stroke-linecap="round" stroke-linejoin="round"
                      :d="product.positive ? 'M5 10l7-7m0 0l7 7m-7-7v18' : 'M19 14l-7 7m0 0l-7-7m7 7V3'" />
                  </svg>
                  {{ product.growth }}
                </span>
                <div class="w-16 h-1.5 bg-gray-100 rounded-full overflow-hidden">
                  <div
                    class="h-full rounded-full"
                    :class="product.positive ? 'bg-green-400' : 'bg-red-400'"
                    :style="{ width: product.growthPct + '%' }"
                  ></div>
                </div>
              </div>
            </td>
            <!-- Status -->
            <td class="py-3 pl-4 text-center">
              <span :class="['text-[10px] font-semibold px-2.5 py-1 rounded-full', statusClass(product.status)]">
                {{ product.status }}
              </span>
            </td>
          </tr>
        </tbody>
      </table>
    </div>

    <!-- Card Mobile -->
    <div class="sm:hidden space-y-3">
      <div v-for="product in products" :key="product.name"
        class="flex items-center gap-3 p-3 rounded-xl bg-gray-50"
      >
        <div
          class="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0 shadow-sm"
          :style="{ backgroundColor: product.iconBg }"
        >
          <component :is="product.icon" class="w-5 h-5" :style="{ color: product.iconColor }" />
        </div>
        <div class="flex-1 min-w-0">
          <div class="flex items-center justify-between">
            <p class="text-xs font-semibold text-gray-800 truncate">{{ product.name }}</p>
            <span :class="['text-[10px] font-semibold px-2 py-0.5 rounded-full ml-2 flex-shrink-0', statusClass(product.status)]">
              {{ product.status }}
            </span>
          </div>
          <div class="flex items-center justify-between mt-1">
            <p class="text-[11px] font-bold text-brand-600">{{ product.revenue }}</p>
            <p :class="['text-[10px] font-semibold flex items-center gap-0.5', product.positive ? 'text-green-600' : 'text-red-500']">
              <svg class="w-2.5 h-2.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2.5">
                <path stroke-linecap="round" stroke-linejoin="round"
                  :d="product.positive ? 'M5 10l7-7m0 0l7 7m-7-7v18' : 'M19 14l-7 7m0 0l-7-7m7 7V3'" />
              </svg>
              {{ product.growth }}
            </p>
          </div>
          <div class="flex items-center gap-2 mt-1">
            <span class="text-[10px] text-gray-400">{{ product.orders }} orders</span>
            <span class="text-gray-200">·</span>
            <span class="text-[10px] text-gray-400">{{ product.category }}</span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { h } from 'vue'

const HeroIcon = (d) => ({
  render: () => h('svg',
    { fill: 'none', viewBox: '0 0 24 24', stroke: 'currentColor', 'stroke-width': '1.8' },
    [h('path', { 'stroke-linecap': 'round', 'stroke-linejoin': 'round', d })]
  )
})

// Heroicons per produk
const IconHeadphone = HeroIcon('M9 19V6l12-3v13M9 19c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zm12-3c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zM9 10l12-3')
const IconWatch     = HeroIcon('M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z')
const IconSpeaker   = HeroIcon('M11 5.882V19.24a1.76 1.76 0 01-3.417.592l-2.147-6.15M18 13a3 3 0 100-6M5.436 13.683A4.001 4.001 0 017 6h1.832c4.1 0 7.625-1.234 9.168-3v14c-1.543-1.766-5.067-3-9.168-3H7a3.988 3.988 0 01-1.564-.317z')
const IconMouse     = HeroIcon('M15 15l-2 5L9 9l11 4-5 2zm0 0l5 5M7.188 2.239l.777 2.897M5.136 7.965l-2.898-.777M13.95 4.05l-2.122 2.122m-5.657 5.656l-2.12 2.122')
const IconKeyboard  = HeroIcon('M9 3H5a2 2 0 00-2 2v4m6-6h10a2 2 0 012 2v4M9 3v18m0 0h10a2 2 0 002-2V9M9 21H5a2 2 0 01-2-2V9m0 0h18')

const products = [
  {
    name: 'Wireless Headphone', category: 'Audio',
    icon: IconHeadphone, iconBg: '#ede9ff', iconColor: '#7c6af5',
    revenue: 'Rp 24.800.000', orders: '248', avgPrice: 'Rp 100.000',
    growth: '18.2%', growthPct: 85, positive: true, status: 'In Stock',
  },
  {
    name: 'Smart Watch', category: 'Electronics',
    icon: IconWatch, iconBg: '#eff6ff', iconColor: '#3b82f6',
    revenue: 'Rp 18.600.000', orders: '198', avgPrice: 'Rp 93.939',
    growth: '12.5%', growthPct: 65, positive: true, status: 'In Stock',
  },
  {
    name: 'Bluetooth Speaker', category: 'Audio',
    icon: IconSpeaker, iconBg: '#fdf2f8', iconColor: '#ec4899',
    revenue: 'Rp 15.400.000', orders: '176', avgPrice: 'Rp 87.500',
    growth: '9.1%', growthPct: 50, positive: true, status: 'Low Stock',
  },
  {
    name: 'Gaming Mouse', category: 'Peripherals',
    icon: IconMouse, iconBg: '#fffbeb', iconColor: '#f59e0b',
    revenue: 'Rp 12.300.000', orders: '154', avgPrice: 'Rp 79.870',
    growth: '6.4%', growthPct: 40, positive: true, status: 'In Stock',
  },
  {
    name: 'Mechanical Keyboard', category: 'Peripherals',
    icon: IconKeyboard, iconBg: '#ecfdf5', iconColor: '#10b981',
    revenue: 'Rp 9.800.000', orders: '112', avgPrice: 'Rp 87.500',
    growth: '2.1%', growthPct: 20, positive: false, status: 'Out of Stock',
  },
]

const statusClass = (s) => ({
  'In Stock':     'bg-green-50 text-green-600',
  'Low Stock':    'bg-yellow-50 text-yellow-600',
  'Out of Stock': 'bg-red-50 text-red-500',
}[s] ?? 'bg-gray-100 text-gray-500')
</script>