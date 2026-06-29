<template>
  <main class="flex-1 overflow-y-auto px-4 lg:px-8 py-6 pb-6">

    <!-- Page Header -->
    <div class="flex items-center justify-between mb-6">
      <div>
        <h1 class="text-lg font-bold text-gray-900">Orders</h1>
        <p class="text-xs text-gray-400 mt-0.5">Manage and track all customer orders</p>
      </div>
      <button class="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-gradient-to-r from-brand-500 to-brand-700 text-white text-xs font-semibold hover:opacity-90 transition-opacity">
        <svg class="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
          <path stroke-linecap="round" stroke-linejoin="round" d="M12 4v16m8-8H4"/>
        </svg>
        New Order
      </button>
    </div>

    <!-- Stat Cards -->
    <div class="grid grid-cols-2 lg:grid-cols-4 gap-3 mb-6">
      <div v-for="stat in stats" :key="stat.label"
        class="bg-white rounded-2xl p-4 shadow-sm border border-gray-100">
        <div class="flex items-start justify-between mb-3">
          <div :class="['w-8 h-8 rounded-xl flex items-center justify-center', stat.iconBg]">
            <component :is="stat.icon" :class="['w-4 h-4', stat.iconColor]" />
          </div>
          <span :class="['text-[10px] font-semibold px-1.5 py-0.5 rounded-full', stat.badgeClass]">
            {{ stat.badge }}
          </span>
        </div>
        <p class="text-[11px] text-gray-400 mb-1">{{ stat.label }}</p>
        <p class="text-lg font-bold text-gray-900">{{ stat.value }}</p>
      </div>
    </div>

    <!-- Filter + Search -->
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
            placeholder="Search order ID or customer..."
            class="flex-1 bg-transparent text-xs text-gray-700 placeholder-gray-400 outline-none"
          />
        </div>

        <!-- Status Filter -->
        <div class="flex items-center gap-2 overflow-x-auto pb-0.5 sm:pb-0 flex-shrink-0">
          <button
            v-for="f in filters" :key="f.value"
            @click="activeFilter = f.value"
            :class="[
              'flex-shrink-0 text-[11px] font-semibold px-3 py-2 rounded-xl transition-all',
              activeFilter === f.value
                ? 'bg-brand-500 text-white shadow-sm'
                : 'bg-gray-50 text-gray-500 hover:bg-gray-100 border border-gray-100'
            ]"
          >
            {{ f.label }}
            <span :class="['ml-1 text-[10px] font-bold', activeFilter === f.value ? 'opacity-80' : 'text-gray-400']">
              {{ f.count }}
            </span>
          </button>
        </div>
      </div>
    </div>

    <!-- Table -->
    <div class="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">

      <!-- Desktop Table -->
      <div class="hidden sm:block overflow-x-auto">
        <table class="w-full">
          <thead>
            <tr class="border-b border-gray-100 bg-gray-50/50">
              <th class="text-left text-[11px] font-semibold text-gray-400 px-5 py-3.5">Order ID</th>
              <th class="text-left text-[11px] font-semibold text-gray-400 px-4 py-3.5">Customer</th>
              <th class="text-left text-[11px] font-semibold text-gray-400 px-4 py-3.5">Products</th>
              <th class="text-left text-[11px] font-semibold text-gray-400 px-4 py-3.5">Date</th>
              <th class="text-right text-[11px] font-semibold text-gray-400 px-4 py-3.5">Amount</th>
              <th class="text-center text-[11px] font-semibold text-gray-400 px-4 py-3.5">Status</th>
              <th class="text-center text-[11px] font-semibold text-gray-400 px-5 py-3.5">Action</th>
            </tr>
          </thead>
          <tbody class="divide-y divide-gray-50">
            <tr v-if="filteredOrders.length === 0">
              <td colspan="7" class="text-center py-16 text-sm text-gray-400">No orders found</td>
            </tr>
            <tr
              v-for="order in filteredOrders" :key="order.id"
              class="hover:bg-gray-50/50 transition-colors"
            >
              <!-- Order ID -->
              <td class="px-5 py-4">
                <span class="text-xs font-semibold text-brand-600">{{ order.id }}</span>
              </td>
              <!-- Customer -->
              <td class="px-4 py-4">
                <div class="flex items-center gap-2.5">
                  <div class="w-7 h-7 rounded-full flex items-center justify-center text-white text-[10px] font-bold flex-shrink-0"
                       :style="{ background: order.avatarColor }">
                    {{ order.customer[0] }}
                  </div>
                  <div>
                    <p class="text-xs font-semibold text-gray-800">{{ order.customer }}</p>
                    <p class="text-[10px] text-gray-400">{{ order.email }}</p>
                  </div>
                </div>
              </td>
              <!-- Products -->
              <td class="px-4 py-4">
                <p class="text-xs text-gray-700 truncate max-w-[160px]">{{ order.products }}</p>
                <p class="text-[10px] text-gray-400">{{ order.qty }} item{{ order.qty > 1 ? 's' : '' }}</p>
              </td>
              <!-- Date -->
              <td class="px-4 py-4">
                <p class="text-xs text-gray-700">{{ order.date }}</p>
                <p class="text-[10px] text-gray-400">{{ order.time }}</p>
              </td>
              <!-- Amount -->
              <td class="px-4 py-4 text-right">
                <p class="text-xs font-bold text-gray-800">{{ order.amount }}</p>
              </td>
              <!-- Status -->
              <td class="px-4 py-4 text-center">
                <span :class="['text-[10px] font-semibold px-2.5 py-1 rounded-full', statusClass(order.status)]">
                  {{ order.status }}
                </span>
              </td>
              <!-- Action -->
              <td class="px-5 py-4 text-center">
                <button
                  @click="openDetail(order)"
                  class="w-7 h-7 rounded-lg bg-gray-50 border border-gray-100 flex items-center justify-center mx-auto hover:bg-brand-50 hover:border-brand-200 transition-colors group"
                >
                  <svg class="w-3.5 h-3.5 text-gray-400 group-hover:text-brand-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"/>
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"/>
                  </svg>
                </button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>

      <!-- Mobile Cards -->
      <div class="sm:hidden divide-y divide-gray-50">
        <div v-if="filteredOrders.length === 0" class="text-center py-16 text-sm text-gray-400">
          No orders found
        </div>
        <div
          v-for="order in filteredOrders" :key="order.id"
          class="p-4 hover:bg-gray-50/50 transition-colors"
          @click="openDetail(order)"
        >
          <div class="flex items-start justify-between mb-2">
            <div class="flex items-center gap-2">
              <div class="w-8 h-8 rounded-full flex items-center justify-center text-white text-xs font-bold flex-shrink-0"
                   :style="{ background: order.avatarColor }">
                {{ order.customer[0] }}
              </div>
              <div>
                <p class="text-xs font-semibold text-gray-800">{{ order.customer }}</p>
                <p class="text-[10px] text-brand-500 font-semibold">{{ order.id }}</p>
              </div>
            </div>
            <span :class="['text-[10px] font-semibold px-2 py-0.5 rounded-full', statusClass(order.status)]">
              {{ order.status }}
            </span>
          </div>
          <div class="flex items-center justify-between pl-10">
            <p class="text-[10px] text-gray-400 truncate max-w-[160px]">{{ order.products }}</p>
            <p class="text-xs font-bold text-gray-800 flex-shrink-0 ml-2">{{ order.amount }}</p>
          </div>
          <div class="flex items-center justify-between pl-10 mt-1">
            <p class="text-[10px] text-gray-400">{{ order.date }} · {{ order.time }}</p>
            <p class="text-[10px] text-gray-400">{{ order.qty }} item{{ order.qty > 1 ? 's' : '' }}</p>
          </div>
        </div>
      </div>

      <!-- Pagination -->
      <div class="flex items-center justify-between px-5 py-3.5 border-t border-gray-100">
        <p class="text-[11px] text-gray-400">
          Showing <span class="font-semibold text-gray-700">{{ filteredOrders.length }}</span> of
          <span class="font-semibold text-gray-700">{{ orders.length }}</span> orders
        </p>
        <div class="flex items-center gap-1">
          <button class="w-7 h-7 rounded-lg bg-gray-50 border border-gray-100 flex items-center justify-center text-gray-400 hover:bg-gray-100 transition-colors">
            <svg class="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7"/>
            </svg>
          </button>
          <button v-for="p in 3" :key="p"
            :class="['w-7 h-7 rounded-lg text-[11px] font-semibold transition-colors',
              p === 1 ? 'bg-brand-500 text-white' : 'bg-gray-50 border border-gray-100 text-gray-500 hover:bg-gray-100']">
            {{ p }}
          </button>
          <button class="w-7 h-7 rounded-lg bg-gray-50 border border-gray-100 flex items-center justify-center text-gray-400 hover:bg-gray-100 transition-colors">
            <svg class="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"/>
            </svg>
          </button>
        </div>
      </div>
    </div>

    <!-- Detail Modal -->
    <Transition
      enter-active-class="transition-all duration-200 ease-out"
      enter-from-class="opacity-0"
      enter-to-class="opacity-100"
      leave-active-class="transition-all duration-150 ease-in"
      leave-from-class="opacity-100"
      leave-to-class="opacity-0"
    >
      <div v-if="selectedOrder" class="fixed inset-0 z-50 flex items-center justify-center p-4">
        <!-- Backdrop -->
        <div class="absolute inset-0 bg-black/30 backdrop-blur-sm" @click="selectedOrder = null"></div>

        <!-- Modal -->
        <div class="relative bg-white rounded-2xl shadow-2xl w-full max-w-md overflow-hidden">
          <!-- Modal Header -->
          <div class="flex items-center justify-between px-5 py-4 border-b border-gray-100">
            <div>
              <p class="text-sm font-bold text-gray-900">Order Detail</p>
              <p class="text-[11px] text-brand-500 font-semibold mt-0.5">{{ selectedOrder.id }}</p>
            </div>
            <button @click="selectedOrder = null"
              class="w-8 h-8 rounded-xl bg-gray-50 border border-gray-100 flex items-center justify-center hover:bg-gray-100 transition-colors">
              <svg class="w-4 h-4 text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"/>
              </svg>
            </button>
          </div>

          <div class="p-5 space-y-4">
            <!-- Customer -->
            <div class="flex items-center gap-3 p-3 bg-gray-50 rounded-xl">
              <div class="w-10 h-10 rounded-full flex items-center justify-center text-white font-bold flex-shrink-0"
                   :style="{ background: selectedOrder.avatarColor }">
                {{ selectedOrder.customer[0] }}
              </div>
              <div>
                <p class="text-sm font-semibold text-gray-800">{{ selectedOrder.customer }}</p>
                <p class="text-[11px] text-gray-400">{{ selectedOrder.email }}</p>
              </div>
              <span :class="['ml-auto text-[10px] font-semibold px-2.5 py-1 rounded-full', statusClass(selectedOrder.status)]">
                {{ selectedOrder.status }}
              </span>
            </div>

            <!-- Info Grid -->
            <div class="grid grid-cols-2 gap-3">
              <div v-for="info in orderInfo" :key="info.label" class="bg-gray-50 rounded-xl p-3">
                <p class="text-[10px] text-gray-400 mb-1">{{ info.label }}</p>
                <p class="text-xs font-semibold text-gray-800">{{ info.value }}</p>
              </div>
            </div>

            <!-- Items -->
            <div>
              <p class="text-xs font-semibold text-gray-700 mb-2">Items Ordered</p>
              <div class="space-y-2">
                <div v-for="item in selectedOrder.itemList" :key="item.name"
                  class="flex items-center justify-between p-2.5 bg-gray-50 rounded-xl">
                  <div class="flex items-center gap-2">
                    <div :class="['w-7 h-7 rounded-lg flex items-center justify-center', item.iconBg]">
                      <component :is="item.icon" :class="['w-3.5 h-3.5', item.iconColor]" />
                    </div>
                    <div>
                      <p class="text-[11px] font-semibold text-gray-800">{{ item.name }}</p>
                      <p class="text-[10px] text-gray-400">Qty: {{ item.qty }}</p>
                    </div>
                  </div>
                  <p class="text-[11px] font-bold text-gray-800">{{ item.price }}</p>
                </div>
              </div>
            </div>

            <!-- Total -->
            <div class="flex items-center justify-between pt-3 border-t border-gray-100">
              <p class="text-sm font-bold text-gray-900">Total</p>
              <p class="text-sm font-bold text-brand-600">{{ selectedOrder.amount }}</p>
            </div>
          </div>

          <!-- Actions -->
          <div class="flex gap-2 px-5 pb-5">
            <button class="flex-1 py-2.5 rounded-xl border border-gray-200 text-xs font-semibold text-gray-600 hover:bg-gray-50 transition-colors">
              Print Invoice
            </button>
            <button class="flex-1 py-2.5 rounded-xl bg-gradient-to-r from-brand-500 to-brand-700 text-white text-xs font-semibold hover:opacity-90 transition-opacity">
              Update Status
            </button>
          </div>
        </div>
      </div>
    </Transition>

  </main>
</template>

<script setup>
import { h, ref, computed } from 'vue'

const HeroIcon = (d) => ({
  render: () => h('svg',
    { fill: 'none', viewBox: '0 0 24 24', stroke: 'currentColor', 'stroke-width': '2' },
    [h('path', { 'stroke-linecap': 'round', 'stroke-linejoin': 'round', d })]
  )
})

const IconOrders     = HeroIcon('M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2')
const IconCheck      = HeroIcon('M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z')
const IconClock      = HeroIcon('M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z')
const IconX          = HeroIcon('M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z')
const IconHeadphone  = HeroIcon('M9 19V6l12-3v13M9 19c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zm12-3c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zM9 10l12-3')
const IconWatch      = HeroIcon('M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z')
const IconSpeaker    = HeroIcon('M11 5.882V19.24a1.76 1.76 0 01-3.417.592l-2.147-6.15M18 13a3 3 0 100-6M5.436 13.683A4.001 4.001 0 017 6h1.832c4.1 0 7.625-1.234 9.168-3v14c-1.543-1.766-5.067-3-9.168-3H7a3.988 3.988 0 01-1.564-.317z')
const IconMouse      = HeroIcon('M15 15l-2 5L9 9l11 4-5 2zm0 0l5 5')

const stats = [
  { label: 'Total Orders',   value: '2,560', badge: '+8.2%',  badgeClass: 'bg-green-50 text-green-600',  icon: IconOrders,  iconBg: 'bg-brand-50',  iconColor: 'text-brand-500' },
  { label: 'Completed',      value: '1,420', badge: '55.5%',  badgeClass: 'bg-green-50 text-green-600',  icon: IconCheck,   iconBg: 'bg-green-50',  iconColor: 'text-green-500' },
  { label: 'Processing',     value: '780',   badge: '30.5%',  badgeClass: 'bg-blue-50 text-blue-500',    icon: IconClock,   iconBg: 'bg-blue-50',   iconColor: 'text-blue-500'  },
  { label: 'Cancelled',      value: '360',   badge: '14.0%',  badgeClass: 'bg-red-50 text-red-500',      icon: IconX,       iconBg: 'bg-red-50',    iconColor: 'text-red-500'   },
]

const filters = [
  { label: 'All',        value: 'all',        count: 12 },
  { label: 'Completed',  value: 'Completed',  count: 5  },
  { label: 'Processing', value: 'Processing', count: 4  },
  { label: 'Pending',    value: 'Pending',    count: 2  },
  { label: 'Cancelled',  value: 'Cancelled',  count: 1  },
]

const search      = ref('')
const activeFilter = ref('all')
const selectedOrder = ref(null)

const orders = ref([
  { id: '#ORD-2024-001', customer: 'John Doe',       email: 'john@email.com',    products: 'Wireless Headphone',         qty: 1, date: '29 Jun 2024', time: '10:24 AM', amount: 'Rp 250.000', status: 'Completed',  avatarColor: 'linear-gradient(135deg,#7c6af5,#a78bfa)', itemList: [{ name: 'Wireless Headphone', qty: 1, price: 'Rp 250.000', icon: IconHeadphone, iconBg: 'bg-purple-100', iconColor: 'text-purple-500' }] },
  { id: '#ORD-2024-002', customer: 'Jane Smith',      email: 'jane@email.com',    products: 'Smart Watch, Gaming Mouse',  qty: 2, date: '29 Jun 2024', time: '09:15 AM', amount: 'Rp 160.000', status: 'Processing', avatarColor: 'linear-gradient(135deg,#ec4899,#f9a8d4)', itemList: [{ name: 'Smart Watch', qty: 1, price: 'Rp 100.000', icon: IconWatch, iconBg: 'bg-blue-100', iconColor: 'text-blue-500' }, { name: 'Gaming Mouse', qty: 1, price: 'Rp 60.000', icon: IconMouse, iconBg: 'bg-amber-100', iconColor: 'text-amber-500' }] },
  { id: '#ORD-2024-003', customer: 'Robert Brown',    email: 'robert@email.com',  products: 'Bluetooth Speaker',          qty: 1, date: '28 Jun 2024', time: '03:40 PM', amount: 'Rp 320.000', status: 'Pending',    avatarColor: 'linear-gradient(135deg,#3b82f6,#93c5fd)', itemList: [{ name: 'Bluetooth Speaker', qty: 1, price: 'Rp 320.000', icon: IconSpeaker, iconBg: 'bg-pink-100', iconColor: 'text-pink-500' }] },
  { id: '#ORD-2024-004', customer: 'Emily Davis',     email: 'emily@email.com',   products: 'Wireless Headphone x2',      qty: 2, date: '28 Jun 2024', time: '11:55 AM', amount: 'Rp 420.000', status: 'Completed',  avatarColor: 'linear-gradient(135deg,#10b981,#6ee7b7)', itemList: [{ name: 'Wireless Headphone', qty: 2, price: 'Rp 420.000', icon: IconHeadphone, iconBg: 'bg-purple-100', iconColor: 'text-purple-500' }] },
  { id: '#ORD-2024-005', customer: 'Michael Wilson',  email: 'michael@email.com', products: 'Gaming Mouse',               qty: 1, date: '27 Jun 2024', time: '08:30 AM', amount: 'Rp 180.000', status: 'Cancelled',  avatarColor: 'linear-gradient(135deg,#f59e0b,#fcd34d)', itemList: [{ name: 'Gaming Mouse', qty: 1, price: 'Rp 180.000', icon: IconMouse, iconBg: 'bg-amber-100', iconColor: 'text-amber-500' }] },
  { id: '#ORD-2024-006', customer: 'Sarah Connor',    email: 'sarah@email.com',   products: 'Smart Watch',                qty: 1, date: '27 Jun 2024', time: '02:10 PM', amount: 'Rp 540.000', status: 'Completed',  avatarColor: 'linear-gradient(135deg,#8b5cf6,#c4b5fd)', itemList: [{ name: 'Smart Watch', qty: 1, price: 'Rp 540.000', icon: IconWatch, iconBg: 'bg-blue-100', iconColor: 'text-blue-500' }] },
  { id: '#ORD-2024-007', customer: 'David Lee',       email: 'david@email.com',   products: 'Bluetooth Speaker, Headphone', qty: 2, date: '26 Jun 2024', time: '04:45 PM', amount: 'Rp 370.000', status: 'Processing', avatarColor: 'linear-gradient(135deg,#ef4444,#fca5a5)', itemList: [{ name: 'Bluetooth Speaker', qty: 1, price: 'Rp 250.000', icon: IconSpeaker, iconBg: 'bg-pink-100', iconColor: 'text-pink-500' }, { name: 'Wireless Headphone', qty: 1, price: 'Rp 120.000', icon: IconHeadphone, iconBg: 'bg-purple-100', iconColor: 'text-purple-500' }] },
  { id: '#ORD-2024-008', customer: 'Lisa Park',       email: 'lisa@email.com',    products: 'Gaming Mouse',               qty: 3, date: '26 Jun 2024', time: '01:20 PM', amount: 'Rp 210.000', status: 'Completed',  avatarColor: 'linear-gradient(135deg,#06b6d4,#67e8f9)', itemList: [{ name: 'Gaming Mouse', qty: 3, price: 'Rp 210.000', icon: IconMouse, iconBg: 'bg-amber-100', iconColor: 'text-amber-500' }] },
  { id: '#ORD-2024-009', customer: 'Tom Anderson',    email: 'tom@email.com',     products: 'Wireless Headphone',         qty: 1, date: '25 Jun 2024', time: '09:00 AM', amount: 'Rp 250.000', status: 'Processing', avatarColor: 'linear-gradient(135deg,#84cc16,#bef264)', itemList: [{ name: 'Wireless Headphone', qty: 1, price: 'Rp 250.000', icon: IconHeadphone, iconBg: 'bg-purple-100', iconColor: 'text-purple-500' }] },
  { id: '#ORD-2024-010', customer: 'Anna Taylor',     email: 'anna@email.com',    products: 'Smart Watch',                qty: 1, date: '25 Jun 2024', time: '11:30 AM', amount: 'Rp 300.000', status: 'Pending',    avatarColor: 'linear-gradient(135deg,#f97316,#fdba74)', itemList: [{ name: 'Smart Watch', qty: 1, price: 'Rp 300.000', icon: IconWatch, iconBg: 'bg-blue-100', iconColor: 'text-blue-500' }] },
])

const filteredOrders = computed(() => {
  return orders.value.filter(o => {
    const matchFilter = activeFilter.value === 'all' || o.status === activeFilter.value
    const matchSearch = !search.value ||
      o.id.toLowerCase().includes(search.value.toLowerCase()) ||
      o.customer.toLowerCase().includes(search.value.toLowerCase())
    return matchFilter && matchSearch
  })
})

const statusClass = (s) => ({
  'Completed':  'bg-green-50 text-green-600',
  'Processing': 'bg-blue-50 text-blue-500',
  'Pending':    'bg-yellow-50 text-yellow-600',
  'Cancelled':  'bg-red-50 text-red-500',
}[s] ?? 'bg-gray-100 text-gray-500')

const orderInfo = computed(() => selectedOrder.value ? [
  { label: 'Order Date',  value: `${selectedOrder.value.date}, ${selectedOrder.value.time}` },
  { label: 'Total Items', value: `${selectedOrder.value.qty} item(s)` },
  { label: 'Payment',     value: 'Bank Transfer' },
  { label: 'Shipping',    value: 'JNE Regular' },
] : [])

function openDetail(order) { selectedOrder.value = order }
</script>