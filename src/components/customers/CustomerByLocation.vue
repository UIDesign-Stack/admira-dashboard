<template>
  <div class="bg-white rounded-2xl p-5 shadow-sm border border-gray-100 h-full">
    <div class="mb-4">
      <h2 class="font-semibold text-sm text-gray-900">Customer by Location</h2>
      <p class="text-[11px] text-gray-400 mt-0.5">Top cities this month</p>
    </div>

    <!-- List -->
    <div class="space-y-4">
      <div v-for="(loc, i) in locations" :key="loc.city">
        <!-- Label row -->
        <div class="flex items-center justify-between mb-1.5">
          <div class="flex items-center gap-2">
            <span class="w-5 h-5 rounded-lg bg-brand-50 flex items-center justify-center flex-shrink-0">
              <MapPinIcon class="w-3 h-3 text-brand-500" />
            </span>
            <span class="text-xs font-medium text-gray-700">{{ loc.city }}</span>
          </div>
          <div class="flex items-center gap-2">
            <span class="text-xs font-bold text-gray-800">{{ loc.customers }}</span>
            <span :class="`text-[10px] font-semibold px-1.5 py-0.5 rounded-full ${loc.positive ? 'bg-green-50 text-green-600' : 'bg-red-50 text-red-500'}`">
              {{ loc.positive ? '↑' : '↓' }} {{ loc.change }}
            </span>
          </div>
        </div>

        <!-- Progress bar -->
        <div class="w-full h-2 bg-gray-100 rounded-full overflow-hidden">
          <div
            class="h-full rounded-full transition-all duration-700"
            :style="{ width: loc.pct + '%', backgroundColor: colors[i] }"
          ></div>
        </div>

        <p class="text-[10px] text-gray-400 mt-1">{{ loc.pct }}% of total customers</p>
      </div>
    </div>

    <!-- Total -->
    <div class="mt-5 pt-4 border-t border-gray-50 flex items-center justify-between">
      <div class="flex items-center gap-2">
        <UsersIcon class="w-4 h-4 text-gray-400" />
        <span class="text-xs text-gray-500">Total from top cities</span>
      </div>
      <span class="text-sm font-bold text-gray-900">9,840</span>
    </div>
  </div>
</template>

<script setup>
import { MapPinIcon, UsersIcon } from '@heroicons/vue/24/outline'

const colors = ['#7c6af5', '#ec4899', '#3b82f6', '#f59e0b', '#10b981']

const locations = [
  { city: 'Jakarta',   customers: '3,240', pct: 85, change: '12.4%', positive: true  },
  { city: 'Surabaya',  customers: '2,180', pct: 65, change: '8.1%',  positive: true  },
  { city: 'Bandung',   customers: '1,560', pct: 48, change: '5.3%',  positive: true  },
  { city: 'Medan',     customers: '1,420', pct: 38, change: '3.2%',  positive: false },
  { city: 'Makassar',  customers: '1,440', pct: 30, change: '2.1%',  positive: true  },
]
</script>