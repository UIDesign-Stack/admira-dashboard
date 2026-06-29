<template>
  <div class="grid grid-cols-2 lg:grid-cols-4 gap-3">
    <div
      v-for="kpi in kpis" :key="kpi.label"
      class="bg-white rounded-2xl p-4 shadow-sm border border-gray-100 hover:shadow-md transition-shadow"
    >
      <!-- Icon + badge -->
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

      <!-- Value -->
      <p class="text-xs text-gray-400 mb-0.5">{{ kpi.label }}</p>
      <p class="text-lg font-bold text-gray-900 leading-none">{{ kpi.value }}</p>

      <!-- Sparkline chart -->
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
  CurrencyDollarIcon,
  ShoppingBagIcon,
  CalculatorIcon,
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
  scales: {
    x: { display: false },
    y: { display: false },
  },
  animation: false,
}

const kpis = [
  {
    label: 'Total Revenue', value: 'Rp 124.5jt', change: '12.5%', positive: true,
    icon: CurrencyDollarIcon, iconBg: 'bg-brand-50', iconColor: 'text-brand-500',
    chartData: makeChart([40,45,42,50,55,52,60,65,72,68,75,80,88,92,100], '#7c6af5'),
  },
  {
    label: 'Total Orders', value: '2,560', change: '8.2%', positive: true,
    icon: ShoppingBagIcon, iconBg: 'bg-pink-50', iconColor: 'text-pink-500',
    chartData: makeChart([20,25,22,28,30,27,35,32,38,40,36,42,45,48,50], '#ec4899'),
  },
  {
    label: 'Avg. Order Value', value: 'Rp 97.875', change: '3.1%', positive: true,
    icon: CalculatorIcon, iconBg: 'bg-blue-50', iconColor: 'text-blue-500',
    chartData: makeChart([60,62,59,64,63,67,65,70,68,72,71,74,73,76,78], '#3b82f6'),
  },
  {
    label: 'Conversion Rate', value: '3.45%', change: '0.4%', positive: false,
    icon: ArrowTrendingDownIcon, iconBg: 'bg-violet-50', iconColor: 'text-violet-500',
    chartData: makeChart([50,48,52,49,47,51,46,50,44,48,43,46,42,45,41], '#8b5cf6'),
  },
]
</script>