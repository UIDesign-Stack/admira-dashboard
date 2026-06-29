<template>
  <div class="bg-white rounded-2xl p-5 shadow-sm border border-gray-100">
    <!-- Header -->
    <div class="flex items-center justify-between mb-5">
      <div>
        <h2 class="font-semibold text-sm text-gray-900">Customer List</h2>
        <p class="text-[11px] text-gray-400 mt-0.5">All registered customers</p>
      </div>
      <div class="flex items-center gap-2">
        <!-- Filter -->
        <select
          v-model="filterStatus"
          class="text-xs text-gray-500 bg-gray-50 border border-gray-100 rounded-xl px-3 py-2 outline-none hover:bg-gray-100 transition-colors"
        >
          <option value="">All Status</option>
          <option value="Active">Active</option>
          <option value="Inactive">Inactive</option>
          <option value="Blocked">Blocked</option>
        </select>
        <!-- Export -->
        <button class="flex items-center gap-1.5 text-xs text-gray-500 bg-gray-50 border border-gray-100 rounded-xl px-3 py-2 hover:bg-gray-100 transition-colors">
          <ArrowDownTrayIcon class="w-3.5 h-3.5" />
          Export
        </button>
      </div>
    </div>

    <!-- Table Desktop -->
    <div class="hidden sm:block overflow-x-auto">
      <table class="w-full">
        <thead>
          <tr class="border-b border-gray-50">
            <th class="text-left text-[11px] font-semibold text-gray-400 pb-3 pr-4">Customer</th>
            <th class="text-left text-[11px] font-semibold text-gray-400 pb-3 px-4">Email</th>
            <th class="text-right text-[11px] font-semibold text-gray-400 pb-3 px-4">Orders</th>
            <th class="text-right text-[11px] font-semibold text-gray-400 pb-3 px-4">Total Spent</th>
            <th class="text-center text-[11px] font-semibold text-gray-400 pb-3 px-4">Status</th>
            <th class="text-center text-[11px] font-semibold text-gray-400 pb-3 px-4">Join Date</th>
            <th class="text-center text-[11px] font-semibold text-gray-400 pb-3 pl-4">Action</th>
          </tr>
        </thead>
        <tbody class="divide-y divide-gray-50">
          <tr
            v-for="customer in filteredCustomers" :key="customer.id"
            class="hover:bg-gray-50/50 transition-colors"
          >
            <!-- Customer -->
            <td class="py-3 pr-4">
              <div class="flex items-center gap-3">
                <div
                  class="w-8 h-8 rounded-full flex items-center justify-center text-white text-xs font-bold flex-shrink-0"
                  :style="{ backgroundColor: customer.avatarColor }"
                >
                  {{ customer.initials }}
                </div>
                <div>
                  <p class="text-xs font-semibold text-gray-800">{{ customer.name }}</p>
                  <p class="text-[10px] text-gray-400">{{ customer.city }}</p>
                </div>
              </div>
            </td>
            <!-- Email -->
            <td class="py-3 px-4">
              <p class="text-xs text-gray-500">{{ customer.email }}</p>
            </td>
            <!-- Orders -->
            <td class="py-3 px-4 text-right">
              <p class="text-xs font-semibold text-gray-700">{{ customer.orders }}</p>
            </td>
            <!-- Total Spent -->
            <td class="py-3 px-4 text-right">
              <p class="text-xs font-bold text-gray-800">{{ customer.spent }}</p>
            </td>
            <!-- Status -->
            <td class="py-3 px-4 text-center">
              <span :class="`text-[10px] font-semibold px-2.5 py-1 rounded-full ${statusClass(customer.status)}`">
                {{ customer.status }}
              </span>
            </td>
            <!-- Join Date -->
            <td class="py-3 px-4 text-center">
              <p class="text-xs text-gray-400">{{ customer.joinDate }}</p>
            </td>
            <!-- Action -->
            <td class="py-3 pl-4 text-center">
              <div class="flex items-center justify-center gap-2">
                <button class="w-7 h-7 rounded-lg bg-brand-50 flex items-center justify-center hover:bg-brand-100 transition-colors">
                  <EyeIcon class="w-3.5 h-3.5 text-brand-500" />
                </button>
                <button class="w-7 h-7 rounded-lg bg-gray-50 flex items-center justify-center hover:bg-gray-100 transition-colors">
                  <PencilSquareIcon class="w-3.5 h-3.5 text-gray-500" />
                </button>
                <button class="w-7 h-7 rounded-lg bg-red-50 flex items-center justify-center hover:bg-red-100 transition-colors">
                  <TrashIcon class="w-3.5 h-3.5 text-red-400" />
                </button>
              </div>
            </td>
          </tr>
        </tbody>
      </table>
    </div>

    <!-- Card Mobile -->
    <div class="sm:hidden space-y-3">
      <div
        v-for="customer in filteredCustomers" :key="customer.id"
        class="flex items-center gap-3 p-3 rounded-xl bg-gray-50"
      >
        <div
          class="w-10 h-10 rounded-full flex items-center justify-center text-white text-sm font-bold flex-shrink-0"
          :style="{ backgroundColor: customer.avatarColor }"
        >
          {{ customer.initials }}
        </div>
        <div class="flex-1 min-w-0">
          <div class="flex items-center justify-between">
            <p class="text-xs font-semibold text-gray-800 truncate">{{ customer.name }}</p>
            <span :class="`text-[10px] font-semibold px-2 py-0.5 rounded-full ml-2 flex-shrink-0 ${statusClass(customer.status)}`">
              {{ customer.status }}
            </span>
          </div>
          <p class="text-[10px] text-gray-400 mt-0.5 truncate">{{ customer.email }}</p>
          <div class="flex items-center gap-3 mt-1">
            <span class="text-[10px] text-gray-500">{{ customer.orders }} orders</span>
            <span class="text-gray-300">·</span>
            <span class="text-[10px] font-semibold text-brand-600">{{ customer.spent }}</span>
          </div>
        </div>
        <div class="flex flex-col gap-1.5">
          <button class="w-7 h-7 rounded-lg bg-brand-50 flex items-center justify-center">
            <EyeIcon class="w-3.5 h-3.5 text-brand-500" />
          </button>
          <button class="w-7 h-7 rounded-lg bg-red-50 flex items-center justify-center">
            <TrashIcon class="w-3.5 h-3.5 text-red-400" />
          </button>
        </div>
      </div>
    </div>

    <!-- Pagination -->
    <div class="flex items-center justify-between mt-5 pt-4 border-t border-gray-50">
      <p class="text-xs text-gray-400">Showing <span class="font-semibold text-gray-600">{{ filteredCustomers.length }}</span> of <span class="font-semibold text-gray-600">{{ customers.length }}</span> customers</p>
      <div class="flex items-center gap-1">
        <button class="w-7 h-7 rounded-lg bg-gray-50 border border-gray-100 flex items-center justify-center hover:bg-gray-100 transition-colors">
          <ChevronLeftIcon class="w-3.5 h-3.5 text-gray-500" />
        </button>
        <button
          v-for="page in 3" :key="page"
          :class="[
            'w-7 h-7 rounded-lg text-xs font-semibold transition-colors',
            page === 1 ? 'bg-brand-500 text-white' : 'bg-gray-50 border border-gray-100 text-gray-500 hover:bg-gray-100'
          ]"
        >
          {{ page }}
        </button>
        <button class="w-7 h-7 rounded-lg bg-gray-50 border border-gray-100 flex items-center justify-center hover:bg-gray-100 transition-colors">
          <ChevronRightIcon class="w-3.5 h-3.5 text-gray-500" />
        </button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import {
  EyeIcon,
  PencilSquareIcon,
  TrashIcon,
  ArrowDownTrayIcon,
  ChevronLeftIcon,
  ChevronRightIcon,
} from '@heroicons/vue/24/outline'

const filterStatus = ref('')

const customers = [
  { id: 1, name: 'John Doe',       initials: 'JD', avatarColor: '#7c6af5', email: 'john@email.com',    city: 'Jakarta',  orders: 12, spent: 'Rp 2.400.000', status: 'Active',   joinDate: '12 Jan 2024' },
  { id: 2, name: 'Jane Smith',     initials: 'JS', avatarColor: '#ec4899', email: 'jane@email.com',    city: 'Bandung',  orders: 8,  spent: 'Rp 1.600.000', status: 'Active',   joinDate: '24 Jan 2024' },
  { id: 3, name: 'Robert Brown',   initials: 'RB', avatarColor: '#3b82f6', email: 'robert@email.com',  city: 'Surabaya', orders: 5,  spent: 'Rp 980.000',   status: 'Inactive', joinDate: '3 Feb 2024'  },
  { id: 4, name: 'Emily Davis',    initials: 'ED', avatarColor: '#f59e0b', email: 'emily@email.com',   city: 'Medan',    orders: 20, spent: 'Rp 4.200.000', status: 'Active',   joinDate: '15 Feb 2024' },
  { id: 5, name: 'Michael Wilson', initials: 'MW', avatarColor: '#10b981', email: 'michael@email.com', city: 'Jakarta',  orders: 3,  spent: 'Rp 540.000',   status: 'Blocked',  joinDate: '28 Feb 2024' },
  { id: 6, name: 'Sarah Johnson',  initials: 'SJ', avatarColor: '#f43f5e', email: 'sarah@email.com',   city: 'Makassar', orders: 15, spent: 'Rp 3.100.000', status: 'Active',   joinDate: '5 Mar 2024'  },
  { id: 7, name: 'David Lee',      initials: 'DL', avatarColor: '#8b5cf6', email: 'david@email.com',   city: 'Bandung',  orders: 7,  spent: 'Rp 1.200.000', status: 'Inactive', joinDate: '18 Mar 2024' },
]

const filteredCustomers = computed(() =>
  filterStatus.value
    ? customers.filter(c => c.status === filterStatus.value)
    : customers
)

const statusClass = (s) => ({
  Active:   'bg-green-50 text-green-600',
  Inactive: 'bg-gray-100 text-gray-500',
  Blocked:  'bg-red-50 text-red-500',
}[s] ?? 'bg-gray-100 text-gray-500')
</script>