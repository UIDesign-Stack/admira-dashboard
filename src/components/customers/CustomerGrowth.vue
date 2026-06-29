<template>
  <div class="bg-white rounded-2xl p-5 shadow-sm border border-gray-100 h-full">
    <div class="flex items-center justify-between mb-4">
      <div>
        <h2 class="font-semibold text-sm text-gray-900">Customer Growth</h2>
        <p class="text-[11px] text-gray-400 mt-0.5">New vs returning customers this year</p>
      </div>
      <div class="flex items-center gap-4 text-[11px] text-gray-400">
        <span class="flex items-center gap-1.5">
          <span class="w-3 h-1.5 rounded-full bg-brand-500 inline-block"></span>
          New
        </span>
        <span class="flex items-center gap-1.5">
          <span class="w-3 h-1.5 rounded-full bg-green-400 inline-block"></span>
          Returning
        </span>
      </div>
    </div>

    <div class="max-h-64">
      <Bar :data="chartData" :options="chartOptions" />
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

const months = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec']

const newCustomers       = [120, 145, 132, 160, 180, 165, 200, 185, 220, 210, 240, 260]
const returningCustomers = [280, 300, 290, 320, 340, 330, 360, 350, 380, 370, 400, 420]

const chartData = {
  labels: months,
  datasets: [
    {
      label: 'New',
      data: newCustomers,
      backgroundColor: '#7c6af5',
      borderRadius: 6,
      borderSkipped: false,
    },
    {
      label: 'Returning',
      data: returningCustomers,
      backgroundColor: '#10b981',
      borderRadius: 6,
      borderSkipped: false,
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
      borderColor: '#ede9fe',
      borderWidth: 1,
      padding: 10,
      callbacks: {
        label: (ctx) => ` ${ctx.dataset.label}: ${ctx.raw} customers`,
      },
    },
  },
  scales: {
    x: {
      grid: { display: false },
      ticks: { color: '#9ca3af', font: { size: 11 } },
      stacked: false,
    },
    y: {
      grid: { color: '#f3f4f6' },
      ticks: { color: '#9ca3af', font: { size: 11 } },
      min: 0,
    },
  },
}
</script>