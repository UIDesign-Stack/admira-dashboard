<template>
  <div class="grid grid-cols-2 lg:grid-cols-4 gap-3">
    <div
      v-for="kpi in kpis" :key="kpi.label"
      class="bg-white rounded-2xl p-4 shadow-sm border border-gray-100 hover:shadow-md transition-shadow"
    >
      <div class="flex items-start justify-between mb-3">
        <div :class="`w-9 h-9 rounded-xl flex items-center justify-center ${kpi.iconBg}`">
          <component :is="kpi.icon" :class="`w-4 h-4 ${kpi.iconColor}`" />
        </div>
        <span :class="`text-[10px] font-semibold px-2 py-0.5 rounded-full flex items-center gap-0.5 ${kpi.positive ? 'bg-green-50 text-green-600' : 'bg-red-50 text-red-500'}`">
          <ArrowTrendingUpIcon v-if="kpi.positive" class="w-2.5 h-2.5" />
          <ArrowTrendingDownIcon v-else class="w-2.5 h-2.5" />
          {{ kpi.change }}
        </span>
      </div>

      <p class="text-xs text-gray-400 mb-0.5">{{ kpi.label }}</p>
      <p class="text-lg font-bold text-gray-900 leading-none">{{ kpi.value }}</p>

      <!-- Sparkline -->
      <div class="mt-3 max-h-10">
        <Line :data="kpi.chartData" :options="sparklineOptions" />
      </div>

      <p class="text-[10px] text-gray-400 mt-1">vs last month</p>
    </div>
  </div>
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
} from 'chart.js'
import {
  BanknotesIcon,
  ReceiptPercentIcon,
  ChartBarIcon,
  ArrowTrendingUpIcon,
  ArrowTrendingDownIcon,
} from '@heroicons/vue/24/outline'

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Filler)

const makeChart = (data, color) => ({
  labels: data.map((_, i) => i),
  datasets: [{
    data,
    borderColor: color,
    borderWidth: 1.5,
    backgroundColor: color + '22',
    fill: true,
    tension: 0.4,
    pointRadius: 0,
  }],
})

const sparklineOptions = {
  responsive: true,
  maintainAspectRatio: false,
  plugins: { legend: { display: false }, tooltip: { enabled: false } },
  scales: { x: { display: false }, y: { display: false } },
  animation: false,
}

const kpis = [
  {
    label: 'Total Sales', value: 'Rp 124.5jt', change: '12.5%', positive: true,
    icon: BanknotesIcon, iconBg: 'bg-brand-50', iconColor: 'text-brand-500',
    chartData: makeChart([40,45,42,50,55,52,60,65,72,68,75,80,88,92,100], '#7c6af5'),
  },
  {
    label: 'Total Expenses', value: 'Rp 48.2jt', change: '4.3%', positive: false,
    icon: ReceiptPercentIcon, iconBg: 'bg-red-50', iconColor: 'text-red-500',
    chartData: makeChart([30,32,31,35,34,36,35,38,37,40,39,42,41,43,44], '#f43f5e'),
  },
  {
    label: 'Net Profit', value: 'Rp 76.3jt', change: '18.2%', positive: true,
    icon: ChartBarIcon, iconBg: 'bg-green-50', iconColor: 'text-green-500',
    chartData: makeChart([20,22,21,25,28,26,32,35,40,38,44,46,50,52,56], '#10b981'),
  },
  {
    label: 'Profit Margin', value: '61.3%', change: '5.1%', positive: true,
    icon: ArrowTrendingUpIcon, iconBg: 'bg-blue-50', iconColor: 'text-blue-500',
    chartData: makeChart([50,52,51,54,56,55,58,60,62,61,63,65,64,66,68], '#3b82f6'),
  },
]
</script>