<template>
  <div class="bg-white rounded-2xl p-5 shadow-sm border border-gray-100">
    <!-- Header -->
    <div class="flex items-center justify-between mb-5">
      <div>
        <h2 class="font-semibold text-sm text-gray-900">Traffic Source</h2>
        <p class="text-[11px] text-gray-400 mt-0.5">Where your visitors come from</p>
      </div>
      <span class="text-[11px] text-brand-500 font-medium bg-brand-50 px-2.5 py-1 rounded-lg">
        This Month
      </span>
    </div>

    <!-- Bars -->
    <div class="space-y-4">
      <div v-for="source in sources" :key="source.label">
        <!-- Label row -->
        <div class="flex items-center justify-between mb-1.5">
          <div class="flex items-center gap-2">
            <!-- Heroicon icon dalam circle berwarna -->
            <div class="w-6 h-6 rounded-lg flex items-center justify-center flex-shrink-0"
                 :style="{ backgroundColor: source.iconBg }">
              <component :is="source.icon" class="w-3.5 h-3.5" :style="{ color: source.color }" />
            </div>
            <span class="text-xs font-medium text-gray-700">{{ source.label }}</span>
          </div>
          <div class="flex items-center gap-2">
            <span class="text-xs font-bold text-gray-800">{{ source.visitors }}</span>
            <span :class="['text-[10px] font-semibold px-1.5 py-0.5 rounded-full flex items-center gap-0.5',
              source.positive ? 'bg-green-50 text-green-600' : 'bg-red-50 text-red-500']">
              <!-- Arrow up/down heroicon -->
              <svg class="w-2.5 h-2.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2.5">
                <path stroke-linecap="round" stroke-linejoin="round"
                  :d="source.positive ? 'M5 10l7-7m0 0l7 7m-7-7v18' : 'M19 14l-7 7m0 0l-7-7m7 7V3'" />
              </svg>
              {{ source.change }}
            </span>
          </div>
        </div>

        <!-- Progress bar (Tailwind) -->
        <div class="w-full h-2 bg-gray-100 rounded-full overflow-hidden">
          <div
            class="h-full rounded-full transition-all duration-700"
            :style="{ width: source.pct + '%', backgroundColor: source.color }"
          ></div>
        </div>

        <!-- Sub info -->
        <div class="flex items-center justify-between mt-1">
          <span class="text-[10px] text-gray-400">{{ source.pct }}% of total traffic</span>
          <span class="text-[10px] text-gray-400">{{ source.sessions }} sessions</span>
        </div>
      </div>
    </div>

    <!-- Total summary -->
    <div class="mt-5 pt-4 border-t border-gray-50 flex items-center justify-between">
      <div class="text-center">
        <p class="text-sm font-bold text-gray-900">24,820</p>
        <p class="text-[10px] text-gray-400 mt-0.5">Total Visitors</p>
      </div>
      <div class="w-px h-8 bg-gray-100"></div>
      <div class="text-center">
        <p class="text-sm font-bold text-gray-900">38,540</p>
        <p class="text-[10px] text-gray-400 mt-0.5">Total Sessions</p>
      </div>
      <div class="w-px h-8 bg-gray-100"></div>
      <div class="text-center">
        <p class="text-sm font-bold text-gray-900">2m 34s</p>
        <p class="text-[10px] text-gray-400 mt-0.5">Avg. Duration</p>
      </div>
    </div>
  </div>
</template>

<script setup>
import { h } from 'vue'

// Helper buat Heroicon dari path SVG
const HeroIcon = (d) => ({
  render: () => h('svg',
    { fill: 'none', viewBox: '0 0 24 24', stroke: 'currentColor', 'stroke-width': '2' },
    [h('path', { 'stroke-linecap': 'round', 'stroke-linejoin': 'round', d })]
  )
})

// Heroicons outline
const IconSearch    = HeroIcon('M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z')
const IconLink      = HeroIcon('M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1')
const IconDeviceMobile = HeroIcon('M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z')
const IconSpeaker   = HeroIcon('M11 5.882V19.24a1.76 1.76 0 01-3.417.592l-2.147-6.15M18 13a3 3 0 100-6M5.436 13.683A4.001 4.001 0 017 6h1.832c4.1 0 7.625-1.234 9.168-3v14c-1.543-1.766-5.067-3-9.168-3H7a3.988 3.988 0 01-1.564-.317z')
const IconMail      = HeroIcon('M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z')

const sources = [
  {
    label: 'Organic Search',
    icon: IconSearch,
    iconBg: '#ede9ff',
    visitors: '9,840', sessions: '15,200',
    pct: 85, change: '14.2%', positive: true,
    color: '#7c6af5',
  },
  {
    label: 'Direct',
    icon: IconLink,
    iconBg: '#eff6ff',
    visitors: '6,210', sessions: '9,800',
    pct: 65, change: '8.5%', positive: true,
    color: '#3b82f6',
  },
  {
    label: 'Social Media',
    icon: IconDeviceMobile,
    iconBg: '#fdf2f8',
    visitors: '4,920', sessions: '7,400',
    pct: 48, change: '5.1%', positive: true,
    color: '#ec4899',
  },
  {
    label: 'Referral',
    icon: IconSpeaker,
    iconBg: '#fffbeb',
    visitors: '2,580', sessions: '4,100',
    pct: 30, change: '2.3%', positive: false,
    color: '#f59e0b',
  },
  {
    label: 'Email',
    icon: IconMail,
    iconBg: '#ecfdf5',
    visitors: '1,270', sessions: '2,040',
    pct: 15, change: '1.8%', positive: true,
    color: '#10b981',
  },
]
</script>