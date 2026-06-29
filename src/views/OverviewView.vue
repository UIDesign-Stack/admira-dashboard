<template>
  <main class="flex-1 overflow-y-auto px-4 lg:px-8 py-6 pb-6">

    <!-- Stat Cards -->
    <div class="grid grid-cols-2 lg:grid-cols-4 gap-3 mb-6">
      <div
        v-for="stat in stats" :key="stat.label"
        :class="['rounded-2xl p-4 shadow-sm border border-gray-100', stat.featured ? 'bg-gradient-to-br from-brand-500 to-brand-700 border-0' : 'bg-white']"
      >
        <div class="flex items-start justify-between mb-3">
          <div :class="['w-8 h-8 rounded-xl flex items-center justify-center', stat.featured ? 'bg-white/20' : stat.iconBg]">
            <component :is="stat.icon" :class="['w-4 h-4', stat.featured ? 'text-white' : stat.iconColor]" />
          </div>
          <span :class="['text-[10px] font-semibold flex items-center gap-0.5', stat.featured ? 'text-white/80' : 'text-green-500']">
            <svg class="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M5 10l7-7m0 0l7 7m-7-7v18"/>
            </svg>
            {{ stat.growth }}
          </span>
        </div>
        <p :class="['text-[11px] font-medium mb-1', stat.featured ? 'text-white/70' : 'text-gray-400']">{{ stat.label }}</p>
        <p :class="['text-lg font-bold leading-none', stat.featured ? 'text-white' : 'text-gray-900']">{{ stat.value }}</p>
        <p :class="['text-[10px] mt-1', stat.featured ? 'text-white/60' : 'text-gray-400']">vs last month</p>
      </div>
    </div>

    <!-- Chart + AI Insight Row -->
    <div class="grid grid-cols-1 lg:grid-cols-3 gap-4 mb-6">

      <!-- Revenue Chart -->
      <div class="lg:col-span-2 bg-white rounded-2xl p-5 shadow-sm border border-gray-100">
        <div class="flex items-center justify-between mb-4">
          <h2 class="font-semibold text-sm text-gray-900">Revenue Overview</h2>
          <button class="flex items-center gap-1 text-[11px] text-gray-500 bg-gray-50 border border-gray-100 rounded-lg px-2.5 py-1.5 hover:bg-gray-100 transition-colors">
            This Month
            <svg class="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"/>
            </svg>
          </button>
        </div>

        <!-- SVG chart: Y-labels sekarang di dalam SVG agar selalu sinkron dengan grid -->
        <div class="w-full" style="position:relative; padding-bottom:42%;">
          <svg
            viewBox="0 0 560 235"
            style="position:absolute; top:0; left:0; width:100%; height:100%; overflow:visible;"
            preserveAspectRatio="xMidYMid meet"
          >
            <defs>
              <linearGradient id="areaGrad" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stop-color="#7c3aed" stop-opacity="0.18"/>
                <stop offset="100%" stop-color="#7c3aed" stop-opacity="0"/>
              </linearGradient>
              <filter id="ttShadow" x="-30%" y="-40%" width="160%" height="220%">
                <feDropShadow dx="0" dy="2" stdDeviation="5" flood-color="#00000018"/>
              </filter>
            </defs>

            <!--
              Layout area:
                x: 44 → 560  (chart width = 516, kiri 44px untuk Y-labels)
                y: 10 → 170  (chart height = 160)
                y: 185 → 200 (X labels)
            -->

            <!-- Grid lines + Y labels -->
            <!-- 150M → y=10 -->
            <line x1="44" y1="10"  x2="560" y2="10"  stroke="#f3f4f6" stroke-width="1"/>
            <text x="38" y="14"  text-anchor="end" font-size="11" fill="#9ca3af">150M</text>

            <!-- 100M → y=63 -->
            <line x1="44" y1="63"  x2="560" y2="63"  stroke="#f3f4f6" stroke-width="1"/>
            <text x="38" y="67"  text-anchor="end" font-size="11" fill="#9ca3af">100M</text>

            <!-- 50M → y=116 -->
            <line x1="44" y1="116" x2="560" y2="116" stroke="#f3f4f6" stroke-width="1"/>
            <text x="38" y="120" text-anchor="end" font-size="11" fill="#9ca3af">50M</text>

            <!-- 0 → y=170 -->
            <line x1="44" y1="170" x2="560" y2="170" stroke="#f3f4f6" stroke-width="1"/>
            <text x="38" y="174" text-anchor="end" font-size="11" fill="#9ca3af">0</text>

            <!-- Area fill -->
            <path :d="areaPath" fill="url(#areaGrad)"/>

            <!-- Line chart -->
            <path :d="linePath" fill="none" stroke="#7c3aed" stroke-width="2.5"
                  stroke-linejoin="round" stroke-linecap="round"/>

            <!-- Dashed vertical line -->
            <line
              :x1="TX" :y1="TY - 50"
              :x2="TX" :y2="TY - 8"
              stroke="#7c3aed" stroke-width="1.2"
              stroke-dasharray="3,3" opacity="0.45"
            />

            <!-- Dot aktif -->
            <circle :cx="TX" :cy="TY" r="5"  fill="#7c3aed"/>
            <circle :cx="TX" :cy="TY" r="10" fill="#7c3aed" fill-opacity="0.12"/>

            <!-- Tooltip bubble -->
            <g :transform="`translate(${clampX}, ${TY - 58})`">
              <rect x="0" y="0" width="116" height="44" rx="9" fill="white" filter="url(#ttShadow)"/>
              <rect x="0" y="0" width="116" height="44" rx="9" fill="none" stroke="#ede9fe" stroke-width="0.8"/>
              <text x="58" y="16" text-anchor="middle" font-size="10" fill="#9ca3af" font-weight="500">22 May</text>
              <text x="58" y="33" text-anchor="middle" font-size="11.5" fill="#111827" font-weight="700">Rp 94.450.000</text>
            </g>

            <!-- X labels -->
            <text x="44"  y="200" font-size="11" fill="#9ca3af" text-anchor="start">1 May</text>
            <text x="173" y="200" font-size="11" fill="#9ca3af" text-anchor="middle">8 May</text>
            <text x="302" y="200" font-size="11" fill="#9ca3af" text-anchor="middle">15 May</text>
            <text x="431" y="200" font-size="11" fill="#9ca3af" text-anchor="middle">22 May</text>
            <text x="560" y="200" font-size="11" fill="#9ca3af" text-anchor="end">31 May</text>
          </svg>
        </div>
      </div>

      <!-- AI Insight -->
      <div class="bg-white rounded-2xl p-5 shadow-sm border border-gray-100 flex flex-col">
        <div class="flex items-center gap-1.5 mb-3">
          <span class="font-semibold text-sm text-gray-900">AI Insight</span>
          <span class="text-base">✨</span>
        </div>
        <div class="flex-1 space-y-3">
          <div class="bg-brand-50 rounded-xl p-3">
            <p class="text-xs text-gray-700 leading-relaxed">
              Revenue is up <strong class="text-brand-600">12.5%</strong> compared to last month.
            </p>
          </div>
          <div class="bg-green-50 rounded-xl p-3">
            <p class="text-xs text-gray-700 leading-relaxed">
              Main growth driver is from <strong class="text-green-700">New Customers</strong>.
            </p>
          </div>
          <div class="bg-yellow-50 rounded-xl p-3">
            <p class="text-xs text-gray-700 leading-relaxed">
              <strong class="text-yellow-700">Wireless Headphone</strong> stock is low — consider restocking soon.
            </p>
          </div>
        </div>
        <button class="mt-4 w-full py-2.5 rounded-xl bg-gradient-to-r from-brand-500 to-brand-700 text-white text-xs font-semibold hover:opacity-90 transition-opacity">
          See detail
        </button>
      </div>
    </div>

    <!-- Recent Orders + Top Products Row -->
    <div class="grid grid-cols-1 lg:grid-cols-2 gap-4 mb-6">

      <!-- Recent Orders -->
      <div class="bg-white rounded-2xl p-5 shadow-sm border border-gray-100">
        <div class="flex items-center justify-between mb-4">
          <h2 class="font-semibold text-sm text-gray-900">Recent Orders</h2>
          <button class="text-[11px] text-brand-500 font-medium hover:text-brand-700 transition-colors">View all</button>
        </div>
        <div class="space-y-3">
          <div v-for="order in recentOrders" :key="order.id" class="flex items-center gap-3">
            <div class="w-7 h-7 rounded-lg bg-gray-50 border border-gray-100 flex items-center justify-center flex-shrink-0">
              <svg class="w-3.5 h-3.5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"/>
              </svg>
            </div>
            <div class="flex-1 min-w-0">
              <div class="flex items-center justify-between">
                <span class="text-[11px] font-semibold text-gray-700">{{ order.id }}</span>
                <span :class="['text-[10px] font-semibold px-2 py-0.5 rounded-full', statusClass(order.status)]">{{ order.status }}</span>
              </div>
              <div class="flex items-center justify-between mt-0.5">
                <span class="text-[10px] text-gray-400">{{ order.name }}</span>
                <span class="text-[10px] font-medium text-gray-600">{{ order.amount }}</span>
              </div>
            </div>
            <span class="text-[10px] text-gray-300 flex-shrink-0">{{ order.time }}</span>
          </div>
        </div>
      </div>

      <!-- Top Products -->
      <div class="bg-white rounded-2xl p-5 shadow-sm border border-gray-100">
        <div class="flex items-center justify-between mb-4">
          <h2 class="font-semibold text-sm text-gray-900">Top Products</h2>
          <button class="text-[11px] text-brand-500 font-medium hover:text-brand-700 transition-colors">View all</button>
        </div>
        <div class="space-y-3.5">
          <div v-for="product in topProducts" :key="product.name" class="flex items-center gap-3">
            <div class="w-9 h-9 rounded-xl bg-gray-100 flex items-center justify-center text-lg flex-shrink-0">
              {{ product.emoji }}
            </div>
            <div class="flex-1 min-w-0">
              <div class="flex items-center justify-between mb-1">
                <span class="text-xs font-medium text-gray-800 truncate">{{ product.name }}</span>
                <span class="text-xs font-semibold text-gray-700 ml-2 flex-shrink-0">{{ product.revenue }}</span>
              </div>
              <div class="flex items-center gap-2">
                <div class="flex-1 h-1.5 bg-gray-100 rounded-full overflow-hidden">
                  <div
                    class="h-full bg-gradient-to-r from-brand-400 to-brand-600 rounded-full transition-all duration-700"
                    :style="{ width: product.pct + '%' }"
                  ></div>
                </div>
                <span class="text-[10px] text-gray-400 flex-shrink-0">{{ product.sales }} sales</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <!-- Advanced Analytics Banner -->
    <div class="bg-white rounded-2xl p-5 shadow-sm border border-gray-100 overflow-hidden relative">
      <!-- Background blur decorations -->
      <div class="absolute right-24 top-0 w-32 h-32 bg-brand-100 rounded-full blur-3xl opacity-40 pointer-events-none"></div>
      <div class="absolute right-8 bottom-0 w-24 h-24 bg-purple-100 rounded-full blur-2xl opacity-30 pointer-events-none"></div>

      <div class="flex flex-col sm:flex-row items-start sm:items-center gap-4">
        <!-- Icon -->
        <div class="w-12 h-12 rounded-2xl bg-gradient-to-br from-brand-100 to-purple-100 flex items-center justify-center flex-shrink-0">
          <svg class="w-6 h-6 text-brand-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"/>
          </svg>
        </div>

        <!-- Text -->
        <div class="flex-1 min-w-0">
          <h3 class="text-sm font-bold text-gray-900">Get more insights with Advanced Analytics</h3>
          <p class="text-xs text-gray-400 mt-0.5">Unlock detailed insights, track performance in real-time, and grow your business faster.</p>
        </div>

        <!-- Button: full width di mobile, auto di desktop -->
        <button class="w-full sm:w-auto flex-shrink-0 px-4 py-2.5 rounded-xl bg-gradient-to-r from-brand-500 to-brand-700 text-white text-xs font-semibold hover:opacity-90 transition-opacity whitespace-nowrap">
          Explore Analytics
        </button>
      </div>
    </div>

  </main>
</template>

<script setup>
import { h, computed } from 'vue'

const icon = (d) => ({
  render: () => h('svg',
    { fill: 'none', viewBox: '0 0 24 24', stroke: 'currentColor', 'stroke-width': '2' },
    [h('path', { 'stroke-linecap': 'round', 'stroke-linejoin': 'round', d })]
  )
})

const stats = [
  {
    label: 'Revenue', value: 'Rp 124.5jt', growth: '12.5%',
    icon: icon('M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z'),
    iconBg: 'bg-brand-50', iconColor: 'text-brand-500', featured: false,
  },
  {
    label: 'Orders', value: '2,560', growth: '8.2%',
    icon: icon('M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4'),
    iconBg: 'bg-pink-50', iconColor: 'text-pink-500', featured: false,
  },
  {
    label: 'Customers', value: '1,245', growth: '15.3%',
    icon: icon('M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z'),
    iconBg: 'bg-blue-50', iconColor: 'text-blue-500', featured: false,
  },
  {
    label: 'Conversion Rate', value: '3.45%', growth: '0.8%',
    icon: icon('M13 7h8m0 0v8m0-8l-8 8-4-4-6 6'),
    iconBg: '', iconColor: '', featured: true,
  },
]

// Chart area: x 44→560, y 10→170
const CHART_X_START = 44
const CHART_X_END   = 560
const CHART_Y_TOP   = 10
const CHART_Y_BOT   = 170
const MIN_V = 0
const MAX_V = 150

const scaleY = v => CHART_Y_TOP + (1 - (v - MIN_V) / (MAX_V - MIN_V)) * (CHART_Y_BOT - CHART_Y_TOP)
const scaleX = i => CHART_X_START + (i / 30) * (CHART_X_END - CHART_X_START)

const rawData = [8,12,10,18,22,15,28,32,20,25,35,28,30,42,38,45,50,44,60,55,68,72,65,78,82,75,90,88,95,100,148]
const points  = rawData.map((v, i) => ({ x: scaleX(i), y: scaleY(v) }))

const linePath = points.map((p, i) => `${i === 0 ? 'M' : 'L'}${p.x.toFixed(1)},${p.y.toFixed(1)}`).join(' ')
const areaPath = linePath + ` L${CHART_X_END},${CHART_Y_BOT} L${CHART_X_START},${CHART_Y_BOT} Z`

const TIDX   = 21
const TX     = points[TIDX].x
const TY     = points[TIDX].y
const clampX = computed(() => Math.min(Math.max(TX - 58, CHART_X_START + 2), CHART_X_END - 118))
// ─── Data ────────────────────────────────────────────────────────────────────
const recentOrders = [
  { id: '#ORD-2024-001', name: 'John Doe',       status: 'Completed',  amount: 'Rp 250.000', time: '2m ago' },
  { id: '#ORD-2024-002', name: 'Jane Smith',     status: 'Processing', amount: 'Rp 160.000', time: '15m ago' },
  { id: '#ORD-2024-003', name: 'Robert Brown',   status: 'Pending',    amount: 'Rp 320.000', time: '1h ago' },
  { id: '#ORD-2024-004', name: 'Emily Davis',    status: 'Completed',  amount: 'Rp 420.000', time: '2h ago' },
  { id: '#ORD-2024-005', name: 'Michael Wilson', status: 'Cancelled',  amount: 'Rp 180.000', time: '3h ago' },
]

function statusClass(s) {
  return {
    Completed:  'bg-green-50 text-green-600',
    Processing: 'bg-blue-50 text-blue-500',
    Pending:    'bg-yellow-50 text-yellow-600',
    Cancelled:  'bg-red-50 text-red-500',
  }[s] ?? 'bg-gray-100 text-gray-500'
}

const topProducts = [
  { name: 'Wireless Headphone', emoji: '🎧', sales: 248, revenue: 'Rp 24.800.000', pct: 100 },
  { name: 'Smart Watch',        emoji: '⌚', sales: 198, revenue: 'Rp 18.600.000', pct: 80  },
  { name: 'Bluetooth Speaker',  emoji: '🔊', sales: 176, revenue: 'Rp 15.400.000', pct: 71  },
  { name: 'Gaming Mouse',       emoji: '🖱️', sales: 154, revenue: 'Rp 12.300.000', pct: 62  },
]
</script>