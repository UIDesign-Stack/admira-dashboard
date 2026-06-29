<template>
  <div class="bg-white rounded-2xl p-5 shadow-sm border border-gray-100 h-full flex flex-col">
    <div class="flex items-center justify-between mb-4">
      <div>
        <h2 class="font-semibold text-sm text-gray-900">Sales vs Expenses</h2>
        <p class="text-[11px] text-gray-400 mt-0.5">
          Monthly comparison this year
        </p>
      </div>

      <div class="flex items-center gap-4 text-[11px] text-gray-400">
        <span class="flex items-center gap-1.5">
          <span class="w-3 h-1.5 rounded-full bg-brand-500 inline-block"></span>
          Sales
        </span>

        <span class="flex items-center gap-1.5">
          <span class="w-3 h-1.5 rounded-full bg-red-400 inline-block"></span>
          Expenses
        </span>
      </div>
    </div>

    <!-- Chart -->
    <div class="relative flex-1 h-[320px]">
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
} from 'chart.js'

ChartJS.register(CategoryScale, LinearScale, BarElement, Tooltip)

const months   = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec']
const sales    = [65, 72, 68, 80, 95, 88, 102, 98, 115, 110, 128, 145]
const expenses = [30, 32, 31, 35, 38, 36, 40, 38, 44, 42, 48, 52]

const chartData = {
  labels: months,
  datasets: [
    {
      label: 'Sales',
      data: sales,
      backgroundColor: '#7c6af5',
      borderRadius: 6,
      borderSkipped: false,
    },
    {
      label: 'Expenses',
      data: expenses,
      backgroundColor: '#f43f5e',
      borderRadius: 6,
      borderSkipped: false,
    },
  ],
}

const chartOptions = {
  responsive: true,
  maintainAspectRatio: false,

  layout: {
    padding: {
      top: 12,
      right: 8,
      left: 8,
      bottom: 0,
    },
  },

  plugins: {
    legend: {
      display: false,
    },

    tooltip: {
      backgroundColor: '#fff',
      titleColor: '#9ca3af',
      bodyColor: '#111827',
      bodyFont: {
        weight: 'bold',
        size: 12,
      },
      borderColor: '#ede9fe',
      borderWidth: 1,
      padding: 10,
      callbacks: {
        label: (ctx) => ` ${ctx.dataset.label}: Rp ${ctx.raw}jt`,
      },
    },
  },

  scales: {
    x: {
      grid: {
        display: false,
      },
      ticks: {
        color: '#9ca3af',
        font: {
          size: 11,
        },
      },
    },

    y: {
      beginAtZero: true,
      suggestedMax: 160,

      grid: {
        color: '#f3f4f6',
      },

      ticks: {
        stepSize: 40,
        color: '#9ca3af',
        font: {
          size: 11,
        },
        callback: (v) => `${v}jt`,
      },
    },
  },
}
</script>