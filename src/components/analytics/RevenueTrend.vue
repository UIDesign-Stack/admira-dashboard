<template>
  <div class="bg-white rounded-2xl p-5 shadow-sm border border-gray-100 h-full flex flex-col">
    <!-- Header -->
    <div class="flex items-center justify-between mb-4 flex-shrink-0">
      <div>
        <h2 class="font-semibold text-sm text-gray-900">Revenue Trend</h2>
        <p class="text-[11px] text-gray-400 mt-0.5">Monthly performance this year</p>
      </div>
      <div class="flex items-center gap-4 text-[11px] text-gray-400">
        <span class="flex items-center gap-1.5">
          <span class="w-3 h-1.5 rounded-full bg-brand-500 inline-block"></span>
          Revenue
        </span>
        <span class="flex items-center gap-1.5">
          <span class="w-3 h-1.5 rounded-full bg-pink-400 inline-block"></span>
          Orders
        </span>
      </div>
    </div>

    <div class="flex-1 min-h-0" style="min-height: 220px;">
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
  Legend,
} from 'chart.js'

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Filler, Tooltip, Legend)

const months      = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec']
const revenueData = [45, 52, 48, 61, 75, 68, 82, 78, 91, 88, 105, 120]
const ordersData  = [30, 35, 32, 40, 52, 45, 58, 54, 63, 60,  72,  85]

const chartData = {
  labels: months,
  datasets: [
    {
      label: 'Revenue',
      data: revenueData,
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
    {
      label: 'Orders',
      data: ordersData,
      borderColor: '#ec4899',
      borderWidth: 2,
      borderDash: [5, 3],
      backgroundColor: (ctx) => {
        const chart = ctx.chart
        const { ctx: c, chartArea } = chart
        if (!chartArea) return 'transparent'
        const grad = c.createLinearGradient(0, chartArea.top, 0, chartArea.bottom)
        grad.addColorStop(0, 'rgba(236,72,153,0.1)')
        grad.addColorStop(1, 'rgba(236,72,153,0)')
        return grad
      },
      fill: true,
      tension: 0.4,
      pointBackgroundColor: '#ec4899',
      pointRadius: 4,
      pointHoverRadius: 6,
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
        label: (ctx) => ` ${ctx.dataset.label}: ${ctx.raw}M`,
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
</script>