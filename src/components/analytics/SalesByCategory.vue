<template>
  <div class="bg-white rounded-2xl p-5 shadow-sm border border-gray-100 h-full flex flex-col">
    <!-- Header -->
    <div class="mb-4 flex-shrink-0">
      <h2 class="font-semibold text-sm text-gray-900">Sales by Category</h2>
      <p class="text-[11px] text-gray-400 mt-0.5">Product category breakdown</p>
    </div>

    <!-- Donut chart -->
    <div class="relative flex justify-center mb-4 flex-shrink-0" style="height:170px;">
      <Doughnut :data="chartData" :options="chartOptions" />

      <!-- Center label (absolute overlay di tengah canvas) -->
      <div class="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
        <span class="text-[10px] text-gray-400 font-medium">Total</span>
        <span class="text-sm font-bold text-gray-900">2,560</span>
      </div>
    </div>

    <!-- Legend -->
    <div class="space-y-2.5 mt-auto">
      <div v-for="cat in categories" :key="cat.label" class="flex items-center justify-between">
        <div class="flex items-center gap-2">
          <span class="w-2.5 h-2.5 rounded-full flex-shrink-0" :style="{ backgroundColor: cat.color }"></span>
          <span class="text-xs text-gray-600">{{ cat.label }}</span>
        </div>
        <div class="flex items-center gap-3">
          <span class="text-xs font-semibold text-gray-800">{{ cat.value }}</span>
          <span class="text-[10px] text-gray-400 w-7 text-right">{{ cat.pct }}%</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { Doughnut } from 'vue-chartjs'
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
} from 'chart.js'

ChartJS.register(ArcElement, Tooltip, Legend)

const categories = [
  { label: 'Electronics', value: '1,024', pct: 40, color: '#7c6af5' },
  { label: 'Accessories', value: '640',   pct: 25, color: '#ec4899' },
  { label: 'Audio',       value: '512',   pct: 20, color: '#3b82f6' },
  { label: 'Peripherals', value: '256',   pct: 10, color: '#f59e0b' },
  { label: 'Others',      value: '128',   pct:  5, color: '#10b981' },
]

const chartData = {
  labels: categories.map(c => c.label),
  datasets: [
    {
      data: categories.map(c => c.pct),
      backgroundColor: categories.map(c => c.color),
      hoverBackgroundColor: categories.map(c => c.color),
      borderWidth: 2,
      borderColor: '#ffffff',
      hoverBorderColor: '#ffffff',
      hoverOffset: 6,
    },
  ],
}

const chartOptions = {
  responsive: true,
  maintainAspectRatio: false,
  cutout: '72%',
  plugins: {
    legend: { display: false },
    tooltip: {
      backgroundColor: '#fff',
      titleColor: '#9ca3af',
      bodyColor: '#111827',
      bodyFont: { weight: 'bold', size: 12 },
      borderColor: '#ede9fe',
      borderWidth: 1,
      padding: 10,
      callbacks: {
        label: (ctx) => {
          const cat = categories[ctx.dataIndex]
          return ` ${cat.label}: ${cat.value} (${cat.pct}%)`
        },
      },
    },
  },
}
</script>