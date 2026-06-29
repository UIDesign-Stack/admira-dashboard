<template>
  <aside class="w-full lg:w-56 flex-shrink-0">
    <div class="bg-white rounded-2xl shadow-sm border border-gray-100 p-2">
      <button
        v-for="item in menuItems" :key="item.label"
        @click="$emit('change', item.label)"
        :class="[
          'flex items-center gap-3 w-full px-3 py-2.5 rounded-xl text-sm font-medium transition-all duration-150 text-left',
          active === item.label
            ? 'bg-brand-50 text-brand-600'
            : 'text-gray-500 hover:bg-gray-50 hover:text-gray-700'
        ]"
      >
        <div :class="['w-7 h-7 rounded-lg flex items-center justify-center flex-shrink-0',
          active === item.label ? 'bg-brand-100' : 'bg-gray-100']">
          <component :is="item.icon" :class="['w-4 h-4', active === item.label ? 'text-brand-500' : 'text-gray-400']" />
        </div>
        {{ item.label }}
      </button>
    </div>
  </aside>
</template>

<script setup>
import { h } from 'vue'

defineProps({ active: String })
defineEmits(['change'])

const Hi = (d) => ({
  render: () => h('svg',
    { fill: 'none', viewBox: '0 0 24 24', stroke: 'currentColor', 'stroke-width': '2' },
    [h('path', { 'stroke-linecap': 'round', 'stroke-linejoin': 'round', d })]
  )
})
const Hi2 = (d1, d2) => ({
  render: () => h('svg',
    { fill: 'none', viewBox: '0 0 24 24', stroke: 'currentColor', 'stroke-width': '2' },
    [h('path', { 'stroke-linecap': 'round', 'stroke-linejoin': 'round', d: d1 }),
     h('path', { 'stroke-linecap': 'round', 'stroke-linejoin': 'round', d: d2 })]
  )
})

const menuItems = [
  { label: 'Profile',         icon: Hi('M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z') },
  { label: 'Security',        icon: Hi('M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z') },
  { label: 'Notifications',   icon: Hi('M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9') },
  { label: 'Appearance',      icon: Hi('M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zm0 0h12a2 2 0 002-2v-4a2 2 0 00-2-2h-2.343M11 7.343l1.657-1.657a2 2 0 012.828 0l2.829 2.829a2 2 0 010 2.828l-8.486 8.485M7 17h.01') },
  { label: 'Billing',         icon: Hi2('M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z', '') },
  { label: 'Integrations',    icon: Hi('M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1') },
  { label: 'API Keys',        icon: Hi('M15 7a2 2 0 012 2m4 0a6 6 0 01-7.743 5.743L11 17H9v2H7v2H4a1 1 0 01-1-1v-2.586a1 1 0 01.293-.707l5.964-5.964A6 6 0 1121 9z') },
  { label: 'Two-Factor Auth', icon: Hi('M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z') },
]
</script>