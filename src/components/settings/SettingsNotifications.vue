<template>
  <div class="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
    <h2 class="font-bold text-base text-gray-900 mb-0.5">Notifications</h2>
    <p class="text-xs text-gray-400 mb-6">Choose what you want to be notified about</p>

    <div class="space-y-6">
      <div v-for="group in groups" :key="group.title">
        <p class="text-xs font-bold text-gray-500 uppercase tracking-wider mb-3">{{ group.title }}</p>
        <div class="space-y-1">
          <div v-for="item in group.items" :key="item.label"
            class="flex items-center justify-between p-3.5 rounded-xl hover:bg-gray-50 transition-colors">
            <div class="flex items-center gap-3">
              <div :class="['w-8 h-8 rounded-xl flex items-center justify-center flex-shrink-0', item.iconBg]">
                <component :is="item.icon" :class="['w-4 h-4', item.iconColor]" />
              </div>
              <div>
                <p class="text-xs font-semibold text-gray-800">{{ item.label }}</p>
                <p class="text-[10px] text-gray-400 mt-0.5">{{ item.desc }}</p>
              </div>
            </div>
            <!-- Toggle -->
            <button @click="item.enabled = !item.enabled"
              :class="['relative rounded-full transition-colors duration-200 flex-shrink-0 flex items-center',
                item.enabled ? 'bg-brand-500' : 'bg-gray-200']"
              style="width:44px; height:24px; padding: 2px;">
              <span :class="['w-5 h-5 bg-white rounded-full shadow-sm transition-transform duration-200',
                item.enabled ? 'translate-x-5' : 'translate-x-0']"></span>
            </button>
          </div>
        </div>
      </div>
    </div>

    <div class="flex justify-end mt-8">
      <button class="px-6 py-2.5 rounded-xl bg-gradient-to-r from-brand-500 to-brand-700 text-white text-sm font-semibold hover:opacity-90 transition-opacity">
        Save Preferences
      </button>
    </div>
  </div>
</template>

<script setup>
import { h, reactive } from 'vue'
const Hi = (d) => ({ render: () => h('svg', { fill: 'none', viewBox: '0 0 24 24', stroke: 'currentColor', 'stroke-width': '2' }, [h('path', { 'stroke-linecap': 'round', 'stroke-linejoin': 'round', d })]) })

const IconOrder   = Hi('M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2')
const IconUser    = Hi('M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z')
const IconChart   = Hi('M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z')
const IconWarning = Hi('M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z')
const IconMail    = Hi('M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z')
const IconPhone   = Hi('M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z')

const groups = reactive([
  {
    title: 'Activity',
    items: [
      { label: 'New Orders',        desc: 'Get notified when a new order is placed', icon: IconOrder,   iconBg: 'bg-brand-50',  iconColor: 'text-brand-500', enabled: true  },
      { label: 'New Customers',     desc: 'Alert when a new customer registers',     icon: IconUser,    iconBg: 'bg-blue-50',   iconColor: 'text-blue-500',  enabled: true  },
      { label: 'Monthly Reports',   desc: 'Receive monthly performance summary',     icon: IconChart,   iconBg: 'bg-green-50',  iconColor: 'text-green-500', enabled: false },
      { label: 'Low Stock Alerts',  desc: 'Notify when product stock is running low',icon: IconWarning, iconBg: 'bg-yellow-50', iconColor: 'text-yellow-500',enabled: true  },
    ],
  },
  {
    title: 'Channels',
    items: [
      { label: 'Email Notifications', desc: 'Receive alerts via email',        icon: IconMail,  iconBg: 'bg-pink-50',  iconColor: 'text-pink-500',  enabled: true  },
      { label: 'Push Notifications',  desc: 'Receive alerts on your browser',  icon: IconPhone, iconBg: 'bg-purple-50',iconColor: 'text-purple-500', enabled: false },
    ],
  },
])
</script>