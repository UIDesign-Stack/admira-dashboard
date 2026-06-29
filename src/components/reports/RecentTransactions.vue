<template>
  <div class="bg-white rounded-2xl p-5 shadow-sm border border-gray-100 h-full flex flex-col">
    <!-- Header -->
    <div class="flex items-center justify-between mb-5">
      <div>
        <h2 class="text-sm font-semibold text-gray-900">
          Recent Transactions
        </h2>
        <p class="text-[11px] text-gray-400 mt-0.5">
          Latest customer purchases
        </p>
      </div>

      <button
        class="text-xs font-medium text-brand-500 hover:text-brand-600 transition"
      >
        View All
      </button>
    </div>

    <!-- List -->
    <div class="flex-1 space-y-3">
      <div
        v-for="item in transactions"
        :key="item.id"
        class="flex items-center justify-between rounded-xl border border-gray-100 p-3 hover:bg-gray-50 transition"
      >
        <div class="flex items-center gap-3">
          <!-- Avatar -->
          <div
            class="w-11 h-11 rounded-xl flex items-center justify-center text-sm font-bold text-white"
            :style="{ backgroundColor: item.color }"
          >
            {{ item.initial }}
          </div>

          <div>
            <h3 class="text-sm font-semibold text-gray-900">
              {{ item.customer }}
            </h3>

            <div class="flex items-center gap-2 mt-1">
              <span class="text-xs text-gray-500">
                {{ item.product }}
              </span>

              <span
                class="text-[10px] px-2 py-0.5 rounded-full font-medium"
                :class="statusClass(item.status)"
              >
                {{ item.status }}
              </span>
            </div>
          </div>
        </div>

        <div class="text-right">
          <h4 class="text-sm font-bold text-gray-900">
            {{ item.amount }}
          </h4>

          <p class="text-[11px] text-gray-400 mt-1">
            {{ item.time }}
          </p>
        </div>
      </div>
    </div>

    <!-- Footer -->
    <div
      class="mt-5 pt-4 border-t border-gray-100 flex items-center justify-between"
    >
      <span class="text-xs text-gray-400">
        {{ transactions.length }} transactions today
      </span>

      <span class="text-xs font-semibold text-green-600">
        +18.4% than yesterday
      </span>
    </div>
  </div>
</template>

<script setup>
const transactions = [
  {
    id: 1,
    customer: 'John Carter',
    product: 'Sony WH-1000XM5',
    amount: 'Rp 8.250.000',
    status: 'Paid',
    time: '2 min ago',
    initial: 'JC',
    color: '#7c6af5',
  },
  {
    id: 2,
    customer: 'Sarah Wilson',
    product: 'Apple Watch Ultra',
    amount: 'Rp 13.499.000',
    status: 'Paid',
    time: '10 min ago',
    initial: 'SW',
    color: '#3b82f6',
  },
  {
    id: 3,
    customer: 'Michael Brown',
    product: 'Logitech MX Master 3S',
    amount: 'Rp 1.799.000',
    status: 'Pending',
    time: '18 min ago',
    initial: 'MB',
    color: '#ec4899',
  },
  {
    id: 4,
    customer: 'Amanda Lee',
    product: 'Razer BlackWidow V4',
    amount: 'Rp 2.499.000',
    status: 'Paid',
    time: '35 min ago',
    initial: 'AL',
    color: '#10b981',
  },
  {
    id: 5,
    customer: 'Daniel Smith',
    product: 'JBL Charge 5',
    amount: 'Rp 2.199.000',
    status: 'Refund',
    time: '1 hour ago',
    initial: 'DS',
    color: '#f59e0b',
  },
]

const statusClass = (status) => {
  switch (status) {
    case 'Paid':
      return 'bg-green-100 text-green-700'

    case 'Pending':
      return 'bg-yellow-100 text-yellow-700'

    case 'Refund':
      return 'bg-red-100 text-red-700'

    default:
      return 'bg-gray-100 text-gray-700'
  }
}
</script>