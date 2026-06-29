<template>
  <div class="bg-white rounded-2xl p-5 shadow-sm border border-gray-100 h-full flex flex-col">

    <!-- Header -->
    <div class="flex items-center justify-between mb-4 flex-shrink-0">
      <div>
        <h2 class="font-semibold text-sm text-gray-900">Profit Trend</h2>
        <p class="text-[11px] text-gray-400 mt-0.5">Net profit after expenses this year</p>
      </div>
      <div class="flex items-center gap-4 text-[11px] text-gray-400">
        <span class="flex items-center gap-1.5">
          <span class="w-3 h-1.5 rounded-full bg-emerald-500 inline-block"></span>
          Profit
        </span>
        <span class="flex items-center gap-1.5">
          <span class="w-3 h-1.5 rounded-full bg-brand-400 inline-block" style="border-style: dashed;"></span>
          Target
        </span>
      </div>
    </div>

    <!-- KPI Row -->
    <div class="grid grid-cols-3 gap-3 mb-4 flex-shrink-0">
      <div v-for="kpi in kpis" :key="kpi.label"
        class="rounded-xl p-3 text-center"
        :style="{ backgroundColor: kpi.bg }">
        <p class="text-sm font-bold" :style="{ color: kpi.color }">{{ kpi.value }}</p>
        <p class="text-[10px] text-gray-400 mt-0.5">{{ kpi.label }}</p>
      </div>
    </div>

    <!-- Chart -->
    <div class="flex-1 min-h-0" style="min-height: 180px;">
      <Line :data="chartData" :options="chartOptions" />
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
  Tooltip,
} from 'chart.js'

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Filler, Tooltip)

const months = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec']

// Profit = Sales - Expenses (dari SalesVsExpenses sebagai acuan)
const sales    = [65, 72, 68, 80, 95, 88, 102, 98, 115, 110, 128, 145]
const expenses = [30, 32, 31, 35, 38, 36,  40,  38,  44,  42,  48,  52]
const profit   = sales.map((s, i) => s - expenses[i])
// [35, 40, 37, 45, 57, 52, 62, 60, 71, 68, 80, 93]

// Target profit per bulan (garis referensi)
const target = [40, 42, 44, 46, 50, 52, 55, 57, 60, 63, 68, 75]

const kpis = [
  { label: 'Avg Profit/mo', value: 'Rp 58jt', color: '#10b981', bg: '#ecfdf5' },
  { label: 'Best Month',    value: 'Dec 93jt', color: '#7c6af5', bg: '#ede9ff' },
  { label: 'vs Target',     value: '+12.4%',   color: '#3b82f6', bg: '#eff6ff' },
]

const chartData = {
  labels: months,
  datasets: [
    {
      label: 'Profit',
      data: profit,
      borderColor: '#10b981',
      borderWidth: 2.5,
      backgroundColor: (ctx) => {
        const chart = ctx.chart
        const { ctx: c, chartArea } = chart
        if (!chartArea) return 'transparent'
        const grad = c.createLinearGradient(0, chartArea.top, 0, chartArea.bottom)
        grad.addColorStop(0, 'rgba(16,185,129,0.18)')
        grad.addColorStop(1, 'rgba(16,185,129,0)')
        return grad
      },
      fill: true,
      tension: 0.4,
      pointBackgroundColor: '#10b981',
      pointRadius: 4,
      pointHoverRadius: 6,
    },
    {
      label: 'Target',
      data: target,
      borderColor: '#7c6af5',
      borderWidth: 1.8,
      borderDash: [5, 4],
      backgroundColor: 'transparent',
      fill: false,
      tension: 0.4,
      pointRadius: 0,
      pointHoverRadius: 4,
      pointHoverBackgroundColor: '#7c6af5',
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
        label: (ctx) => ` ${ctx.dataset.label}: Rp ${ctx.raw}jt`,
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
        callback: (v) => `${v}jt`,
      },
      min: 0,
    },
  },
}
</script>