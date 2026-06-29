<template>
  <div class="bg-white rounded-2xl p-5 pb-7 shadow-sm border border-gray-100">
    <!-- Header -->
    <div class="flex items-center justify-between mb-5">
      <div>
        <h2 class="font-semibold text-sm text-gray-900">Orders by Status</h2>
        <p class="text-[11px] text-gray-400 mt-0.5">This month distribution</p>
      </div>
      <!-- Legend -->
      <div class="flex items-center gap-3">
        <span v-for="s in statuses" :key="s.label" class="flex items-center gap-1 text-[10px] text-gray-400">
          <span class="w-2 h-2 rounded-sm inline-block" :style="{ backgroundColor: s.color }"></span>
          {{ s.label }}
        </span>
      </div>
    </div>

    <!-- Bar Chart -->
    <div style="height: 300px;">
      <Bar :data="chartData" :options="chartOptions" />
    </div>

    <!-- Summary row -->
    <div class="grid grid-cols-3 gap-3 mt-4 mb-6">
      <div
        v-for="s in statuses" :key="s.label"
        class="rounded-xl p-3 text-center"
        :style="{ backgroundColor: s.bg }"
      >
        <p class="text-base font-bold" :style="{ color: s.color }">{{ s.total }}</p>
        <p class="text-[10px] text-gray-500 mt-0.5">{{ s.label }}</p>
      </div>
    </div>
  </div>
</template>

<script setup>
import { Bar } from 'vue-chartjs'
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Tooltip,
  Legend,
} from 'chart.js'

ChartJS.register(CategoryScale, LinearScale, BarElement, Tooltip, Legend)

const statuses = [
  { label: 'Completed',  color: '#7c6af5', bg: '#f0eeff', total: '1,420' },
  { label: 'Processing', color: '#3b82f6', bg: '#eff6ff', total: '780'   },
  { label: 'Cancelled',  color: '#f43f5e', bg: '#fff1f2', total: '360'   },
]

const groups = [
  { month: 'Jan', completed: 180, processing: 90,  cancelled: 40  },
  { month: 'Feb', completed: 210, processing: 100, cancelled: 45  },
  { month: 'Mar', completed: 195, processing: 110, cancelled: 38  },
  { month: 'Apr', completed: 240, processing: 120, cancelled: 52  },
  { month: 'May', completed: 280, processing: 140, cancelled: 60  },
  { month: 'Jun', completed: 315, processing: 220, cancelled: 125 },
]

const chartData = {
  labels: groups.map(g => g.month),
  datasets: [
    {
      label: 'Completed',
      data: groups.map(g => g.completed),
      backgroundColor: '#7c6af5',
      hoverBackgroundColor: '#6a57e8',
      borderRadius: 4,
      borderSkipped: false,
      barPercentage: 0.7,
      categoryPercentage: 0.75,
    },
    {
      label: 'Processing',
      data: groups.map(g => g.processing),
      backgroundColor: '#3b82f6',
      hoverBackgroundColor: '#2563eb',
      borderRadius: 4,
      borderSkipped: false,
      barPercentage: 0.7,
      categoryPercentage: 0.75,
    },
    {
      label: 'Cancelled',
      data: groups.map(g => g.cancelled),
      backgroundColor: '#f43f5e',
      hoverBackgroundColor: '#e11d48',
      borderRadius: 4,
      borderSkipped: false,
      barPercentage: 0.7,
      categoryPercentage: 0.75,
    },
  ],
}

const chartOptions = {
  responsive: true,
  maintainAspectRatio: false,
  plugins: {
    legend: { display: false },
    tooltip: {
      backgroundColor: '#fff',
      titleColor: '#9ca3af',
      bodyColor: '#111827',
      bodyFont: { weight: 'bold', size: 12 },
      borderColor: '#e5e7eb',
      borderWidth: 1,
      padding: 10,
      callbacks: {
        label: (ctx) => ` ${ctx.dataset.label}: ${ctx.raw}`,
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
        stepSize: 100,
      },
      min: 0,
      max: 400,
    },
  },
}
</script>