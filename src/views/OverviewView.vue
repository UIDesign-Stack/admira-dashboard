<template>
  <main class="flex-1 overflow-y-auto px-4 lg:px-8 py-6 pb-24 lg:pb-6 space-y-5">

    <!-- Stat Cards -->
    <div class="grid grid-cols-2 lg:grid-cols-4 gap-3">
      <div
        v-for="stat in stats" :key="stat.label"
        :class="['rounded-2xl p-4 shadow-sm border border-gray-100', stat.featured ? 'bg-gradient-to-br from-brand-500 to-brand-700 border-0' : 'bg-white']"
      >
        <div class="flex items-start justify-between mb-3">
          <div :class="['w-8 h-8 rounded-xl flex items-center justify-center', stat.featured ? 'bg-white/20' : stat.iconBg]">
            <component :is="stat.icon" :class="['w-4 h-4', stat.featured ? 'text-white' : stat.iconColor]" />
          </div>
          <span :class="['text-[10px] font-semibold flex items-center gap-0.5', stat.featured ? 'text-white/80' : 'text-green-500']">
            <ArrowTrendingUpIcon class="w-3 h-3" />
            {{ stat.growth }}
          </span>
        </div>
        <p :class="['text-[11px] font-medium mb-1', stat.featured ? 'text-white/70' : 'text-gray-400']">{{ stat.label }}</p>
        <p :class="['text-lg font-bold leading-none', stat.featured ? 'text-white' : 'text-gray-900']">{{ stat.value }}</p>
        <p :class="['text-[10px] mt-1', stat.featured ? 'text-white/60' : 'text-gray-400']">vs last month</p>
      </div>
    </div>

    <!-- Chart -->
    <div class="grid grid-cols-1 lg:grid-cols-3 gap-4">

      <!-- Revenue Chart -->
      <div class="lg:col-span-2 bg-white rounded-2xl p-5 shadow-sm border border-gray-100">
        <div class="flex items-center justify-between mb-4">
          <h2 class="font-semibold text-sm text-gray-900">Revenue Overview</h2>
          <button class="flex items-center gap-1 text-[11px] text-gray-500 bg-gray-50 border border-gray-100 rounded-lg px-2.5 py-1.5 hover:bg-gray-100 transition-colors">
            This Month
            <ChevronDownIcon class="w-3 h-3" />
          </button>
        </div>
        <Line :data="chartData" :options="chartOptions" class="max-h-56" />
      </div>

      <div class="bg-white rounded-2xl p-5 shadow-sm border border-gray-100 flex flex-col">
        <div class="flex items-center gap-1.5 mb-3">
          <SparklesIcon class="w-4 h-4 text-brand-500" />
          <span class="font-semibold text-sm text-gray-900">Insight</span>
        </div>
        <div class="flex-1 space-y-3">
          <div class="bg-brand-50 rounded-xl p-3">
            <p class="text-xs text-gray-700 leading-relaxed">
              Revenue is up <strong class="text-brand-600">12.5%</strong> compared to last month.
            </p>
          </div>
          <div class="bg-green-50 rounded-xl p-3">
            <p class="text-xs text-gray-700 leading-relaxed">
              Main growth driver is from <strong class="text-green-700">New Customers</strong>.
            </p>
          </div>
          <div class="bg-yellow-50 rounded-xl p-3">
            <p class="text-xs text-gray-700 leading-relaxed">
              <strong class="text-yellow-700">Wireless Headphone</strong> stock is low — consider restocking soon.
            </p>
          </div>
        </div>
        <button class="mt-4 w-full py-2.5 rounded-xl bg-gradient-to-r from-brand-500 to-brand-700 text-white text-xs font-semibold hover:opacity-90 transition-opacity">
          See detail
        </button>
      </div>
    </div>

    <!-- Recent Orders + Top Products -->
    <div class="grid grid-cols-1 lg:grid-cols-2 gap-4">

      <!-- Recent Orders -->
      <div class="bg-white rounded-2xl p-5 shadow-sm border border-gray-100">
        <div class="flex items-center justify-between mb-4">
          <h2 class="font-semibold text-sm text-gray-900">Recent Orders</h2>
          <button class="text-[11px] text-brand-500 font-medium hover:text-brand-700 transition-colors">View all</button>
        </div>
        <div class="space-y-3">
          <div v-for="order in recentOrders" :key="order.id" class="flex items-center gap-3">
            <div class="w-8 h-8 rounded-xl bg-brand-50 flex items-center justify-center flex-shrink-0">
              <ClipboardDocumentListIcon class="w-4 h-4 text-brand-500" />
            </div>
            <div class="flex-1 min-w-0">
              <div class="flex items-center justify-between">
                <span class="text-[11px] font-semibold text-gray-700">{{ order.id }}</span>
                <span :class="['text-[10px] font-semibold px-2 py-0.5 rounded-full', statusClass(order.status)]">
                  {{ order.status }}
                </span>
              </div>
              <div class="flex items-center justify-between mt-0.5">
                <span class="text-[10px] text-gray-400">{{ order.name }}</span>
                <span class="text-[10px] font-medium text-gray-600">{{ order.amount }}</span>
              </div>
            </div>
            <span class="text-[10px] text-gray-300 flex-shrink-0">{{ order.time }}</span>
          </div>
        </div>
      </div>

      <!-- Top Products -->
      <div class="bg-white rounded-2xl p-5 shadow-sm border border-gray-100">
        <div class="flex items-center justify-between mb-4">
          <h2 class="font-semibold text-sm text-gray-900">Top Products</h2>
          <button class="text-[11px] text-brand-500 font-medium hover:text-brand-700 transition-colors">View all</button>
        </div>
        <div class="space-y-3.5">
          <div v-for="product in topProducts" :key="product.name" class="flex items-center gap-3">
            <div class="w-9 h-9 rounded-xl bg-brand-50 flex items-center justify-center flex-shrink-0">
              <component :is="product.icon" class="w-5 h-5 text-brand-500" />
            </div>
            <div class="flex-1 min-w-0">
              <div class="flex items-center justify-between mb-1">
                <span class="text-xs font-medium text-gray-800 truncate">{{ product.name }}</span>
                <span class="text-xs font-semibold text-gray-700 ml-2 flex-shrink-0">{{ product.revenue }}</span>
              </div>
              <div class="flex items-center gap-2">
                <div class="flex-1 h-1.5 bg-gray-100 rounded-full overflow-hidden">
                  <div
                    class="h-full bg-gradient-to-r from-brand-400 to-brand-600 rounded-full transition-all duration-700"
                    :style="{ width: product.pct + '%' }"
                  ></div>
                </div>
                <span class="text-[10px] text-gray-400 flex-shrink-0">{{ product.sales }} sales</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Advanced Analytics Banner -->
    <div class="bg-white rounded-2xl p-5 shadow-sm border border-gray-100 overflow-hidden relative">
      <div class="absolute right-24 top-0 w-32 h-32 bg-brand-100 rounded-full blur-3xl opacity-40 pointer-events-none"></div>
      <div class="absolute right-8 bottom-0 w-24 h-24 bg-purple-100 rounded-full blur-2xl opacity-30 pointer-events-none"></div>

      <div class="flex flex-col sm:flex-row items-start sm:items-center gap-4">
        <div class="w-12 h-12 rounded-2xl bg-gradient-to-br from-brand-100 to-purple-100 flex items-center justify-center flex-shrink-0">
          <PresentationChartLineIcon class="w-6 h-6 text-brand-600" />
        </div>
        <div class="flex-1 min-w-0">
          <h3 class="text-sm font-bold text-gray-900">Get more insights with Advanced Analytics</h3>
          <p class="text-xs text-gray-400 mt-0.5">Unlock detailed insights, track performance in real-time, and grow your business faster.</p>
        </div>
        <button class="w-full sm:w-auto flex-shrink-0 px-4 py-2.5 rounded-xl bg-gradient-to-r from-brand-500 to-brand-700 text-white text-xs font-semibold hover:opacity-90 transition-opacity whitespace-nowrap">
          Explore Analytics
        </button>
      </div>
    </div>

  </main>
</template>

<script setup>
import { Line } from 'vue-chartjs'
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Filler,
  Tooltip,
} from 'chart.js'

import {
  CurrencyDollarIcon,
  ShoppingBagIcon,
  UsersIcon,
  ArrowTrendingUpIcon,
  ChevronDownIcon,
  SparklesIcon,
  ClipboardDocumentListIcon,
  PresentationChartLineIcon,
  MusicalNoteIcon,
  CpuChipIcon,
  SpeakerWaveIcon,
  ComputerDesktopIcon,
} from '@heroicons/vue/24/outline'

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Filler, Tooltip)

// ── Stat Cards ──────────────────────────────────────────────────────────────
const stats = [
  { label: 'Revenue',         value: 'Rp 124.5jt', growth: '12.5%', icon: CurrencyDollarIcon, iconBg: 'bg-brand-50',  iconColor: 'text-brand-500', featured: false },
  { label: 'Orders',          value: '2,560',       growth: '8.2%',  icon: ShoppingBagIcon,    iconBg: 'bg-pink-50',   iconColor: 'text-pink-500',  featured: false },
  { label: 'Customers',       value: '1,245',       growth: '15.3%', icon: UsersIcon,          iconBg: 'bg-blue-50',   iconColor: 'text-blue-500',  featured: false },
  { label: 'Conversion Rate', value: '3.45%',       growth: '0.8%',  icon: ArrowTrendingUpIcon, iconBg: '', iconColor: '', featured: true },
]

// ── Chart ────────────────────────────────────────────────────────────────────
const labels = ['1 May','4 May','7 May','10 May','13 May','16 May','19 May','22 May','25 May','28 May','31 May']
const rawData = [8, 22, 28, 35, 45, 50, 68, 72, 82, 95, 148]

const chartData = {
  labels,
  datasets: [
    {
      data: rawData,
      borderColor: '#7c6af5',
      borderWidth: 2.5,
      backgroundColor: (ctx) => {
        const chart = ctx.chart
        const { ctx: c, chartArea } = chart
        if (!chartArea) return 'transparent'
        const grad = c.createLinearGradient(0, chartArea.top, 0, chartArea.bottom)
        grad.addColorStop(0, 'rgba(124,106,245,0.2)')
        grad.addColorStop(1, 'rgba(124,106,245,0)')
        return grad
      },
      fill: true,
      tension: 0.4,
      pointBackgroundColor: '#7c6af5',
      pointRadius: 4,
      pointHoverRadius: 6,
    },
  ],
}

const chartOptions = {
  responsive: true,
  maintainAspectRatio: true,
  plugins: {
    legend: { display: false },
    tooltip: {
      backgroundColor: '#fff',
      titleColor: '#9ca3af',
      bodyColor: '#111827',
      bodyFont: { weight: 'bold', size: 13 },
      borderColor: '#ede9fe',
      borderWidth: 1,
      padding: 10,
      callbacks: {
        label: (ctx) => ` Rp ${(ctx.raw * 1_500_000).toLocaleString('id-ID')}`,
      },
    },
  },
  scales: {
    x: {
      grid: { display: false },
      ticks: { color: '#9ca3af', font: { size: 11 } },
    },
    y: {
      grid: { color: '#f3f4f6' },
      ticks: {
        color: '#9ca3af',
        font: { size: 11 },
        callback: (v) => `${v}M`,
      },
      min: 0,
      max: 150,
    },
  },
}

// ── Recent Orders ─────────────────────────────────────────────────────────────
const recentOrders = [
  { id: '#ORD-2024-001', name: 'John Doe',       status: 'Completed',  amount: 'Rp 250.000', time: '2m ago'  },
  { id: '#ORD-2024-002', name: 'Jane Smith',     status: 'Processing', amount: 'Rp 160.000', time: '15m ago' },
  { id: '#ORD-2024-003', name: 'Robert Brown',   status: 'Pending',    amount: 'Rp 320.000', time: '1h ago'  },
  { id: '#ORD-2024-004', name: 'Emily Davis',    status: 'Completed',  amount: 'Rp 420.000', time: '2h ago'  },
  { id: '#ORD-2024-005', name: 'Michael Wilson', status: 'Cancelled',  amount: 'Rp 180.000', time: '3h ago'  },
]

function statusClass(s) {
  return {
    Completed:  'bg-green-50 text-green-600',
    Processing: 'bg-blue-50 text-blue-500',
    Pending:    'bg-yellow-50 text-yellow-600',
    Cancelled:  'bg-red-50 text-red-500',
  }[s] ?? 'bg-gray-100 text-gray-500'
}

// ── Top Products ──────────────────────────────────────────────────────────────
const topProducts = [
  { name: 'Wireless Headphone', icon: MusicalNoteIcon,    sales: 248, revenue: 'Rp 24.800.000', pct: 100 },
  { name: 'Smart Watch',        icon: CpuChipIcon,        sales: 198, revenue: 'Rp 18.600.000', pct: 80  },
  { name: 'Bluetooth Speaker',  icon: SpeakerWaveIcon,    sales: 176, revenue: 'Rp 15.400.000', pct: 71  },
  { name: 'Gaming Mouse',       icon: ComputerDesktopIcon,sales: 154, revenue: 'Rp 12.300.000', pct: 62  },
]
</script>