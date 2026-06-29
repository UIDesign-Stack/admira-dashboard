<template>
  <div class="bg-white rounded-2xl p-5 shadow-sm border border-gray-100 h-full flex flex-col">
    <!-- header -->
    <div class="flex items-center justify-between mb-4 flex-shrink-0">
      <div>
        <h2 class="font-semibold text-sm text-gray-900">Sales by Category</h2>
        <p class="text-[11px] text-gray-400 mt-0.5">
          Revenue distribution per category
        </p>
      </div>

      <span class="text-[11px] text-brand-500 font-medium bg-brand-50 px-2.5 py-1 rounded-lg">
        This Month
      </span>
    </div>

    <!-- Donut charts -->
    <div class="relative flex justify-center flex-shrink-0" style="height:180px">
      <Doughnut :data="chartData" :options="chartOptions" />

      <!-- Center Overlay -->
      <div class="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
        <span class="text-[10px] text-gray-400 font-medium">Total</span>
        <span class="text-sm font-bold text-gray-900">Rp. 185jt</span>
      </div>
    </div>

    <!-- Legend list -->
    <div class="mt-4 space-y-2.5 flex-1">
      <div
        v-for="cat in categories"
        :key="cat.label"
        class="flex items-center justify-between"
      >
        <div class="flex items-center gap-2">
          <div
            class="w-6 h-6 rounded-lg flex items-center justify-center flex-shrink-0"
            :style="{ backgroundColor: cat.iconBg }"
          >
            <component
              :is="cat.icon"
              class="w-3.5 h-3.5"
              :style="{ color: cat.color }"
            />
          </div>

          <span class="text-xs text-gray-600">{{ cat.label }}</span>
        </div>

        <div class="flex items-center gap-3">
          <div class="w-20 h-1.5 bg-gray-100 rounded-full overflow-hidden">
            <div
              class="h-full rounded-full transition-all duration-700"
              :style="{
                width: cat.pct + '%',
                backgroundColor: cat.color
              }"
            ></div>
          </div>

          <span class="text-xs font-bold text-gray-800 w-12 text-right">
            {{ cat.revenue }}
          </span>

          <span class="text-[10px] text-gray-400 w-7 text-right">
            {{ cat.pct }}%
          </span>
        </div>
      </div>
    </div>

    <!-- footer total -->
    <div class="mt-4 pt-4 border-t border-gray-50 flex items-center justify-between flex-shrink-0">
      <div class="flex items-center gap-1.5">
        <svg
          class="w-4 h-4 text-green-500"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          stroke-width="2"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            d="M13 7h8m0 0v8m0-8L10 18l-4-4-6 6"
          />
        </svg>

        <span class="text-xs font-semibold text-green-600">
          +14.2% vs last month
        </span>
      </div>

      <span class="text-[11px] text-gray-400">5 categories</span>
    </div>
  </div>
</template>

<script setup>
import { h } from 'vue'
import { Doughnut } from 'vue-chartjs'
import { Chart as ChartJs, ArcElement, Tooltip } from 'chart.js'

ChartJs.register(ArcElement, Tooltip)

const HeroIcon = (d) => ({
  render: () =>
    h(
      'svg',
      {
        fill: 'none',
        viewBox: '0 0 24 24',
        stroke: 'currentColor',
        'stroke-width': '2',
      },
      [
        h('path', {
          'stroke-linecap': 'round',
          'stroke-linejoin': 'round',
          d,
        }),
      ]
    ),
})

const IconHeadphone = HeroIcon('M9 19V6l12-3v13M9 19c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-.895 3 2zm12-3c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-.895 3 2zM9 10l12-3')
const IconWatch = HeroIcon('M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z')
const IconMouse = HeroIcon('M15 15l-2 5L9 9l11 4-5 2zm0 015 5')
const IconTag = HeroIcon('M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z')
const IconBox = HeroIcon('M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4')

const categories = [
  { label: 'Audio', icon: IconHeadphone, color: '#7c6af5', iconBg: '#ede9ff', revenue: '74jt', pct: 40 },
  { label: 'Electronics', icon: IconWatch, color: '#3b82f6', iconBg: '#eff6ff', revenue: '46jt', pct: 25 },
  { label: 'Peripherals', icon: IconMouse, color: '#ec4899', iconBg: '#fdf2f8', revenue: '37jt', pct: 20 },
  { label: 'Accessories', icon: IconTag, color: '#f59e0b', iconBg: '#fffbeb', revenue: '19jt', pct: 10 },
  { label: 'Others', icon: IconBox, color: '#10b981', iconBg: '#ecfdf5', revenue: '9jt', pct: 5 },
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
      bodyFont: {
        weight: 'bold',
        size: 12,
      },
      borderColor: '#e5e7eb',
      borderWidth: 1,
      padding: 10,
      callbacks: {
        label: (ctx) => {
          const c = categories[ctx.dataIndex]
          return `${c.label}: ${c.revenue} (${c.pct}%)`
        },
      },
    },
  },
}
</script>