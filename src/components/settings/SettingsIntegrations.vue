<template>
  <div class="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
    <h2 class="font-bold text-base text-gray-900 mb-0.5">Integrations</h2>
    <p class="text-xs text-gray-400 mb-6">Connect third-party services to your dashboard</p>

    <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
      <div v-for="intg in integrations" :key="intg.name"
        class="flex flex-col justify-between p-4 rounded-2xl border transition-all"
        :class="intg.connected ? 'border-brand-200 bg-brand-50/30' : 'border-gray-100 bg-gray-50 hover:border-gray-200'">

        <div class="flex items-start justify-between mb-3">
          <div class="flex items-center gap-3">
            <div :class="['w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0', intg.iconBg]">
              <component :is="intg.icon" :class="['w-5 h-5', intg.iconColor]" />
            </div>
            <div>
              <p class="text-xs font-bold text-gray-800">{{ intg.name }}</p>
              <p class="text-[10px] text-gray-400 mt-0.5">{{ intg.category }}</p>
            </div>
          </div>
          <span :class="['text-[10px] font-semibold px-2 py-0.5 rounded-full flex-shrink-0',
            intg.connected ? 'bg-green-50 text-green-600' : 'bg-gray-100 text-gray-400']">
            {{ intg.connected ? 'Connected' : 'Not connected' }}
          </span>
        </div>

        <p class="text-[11px] text-gray-500 mb-3 leading-relaxed">{{ intg.desc }}</p>

        <button
          @click="intg.connected = !intg.connected"
          :class="['w-full py-2 rounded-xl text-xs font-semibold transition-all',
            intg.connected
              ? 'bg-red-50 text-red-400 hover:bg-red-100'
              : 'bg-brand-500 text-white hover:opacity-90']">
          {{ intg.connected ? 'Disconnect' : 'Connect' }}
        </button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { h, reactive } from 'vue'
const Hi = (d) => ({ render: () => h('svg', { fill: 'none', viewBox: '0 0 24 24', stroke: 'currentColor', 'stroke-width': '2' }, [h('path', { 'stroke-linecap': 'round', 'stroke-linejoin': 'round', d })]) })

const IconMail    = Hi('M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z')
const IconChart   = Hi('M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z')
const IconShop    = Hi('M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z')
const IconTruck   = Hi('M9 17a2 2 0 11-4 0 2 2 0 014 0zM19 17a2 2 0 11-4 0 2 2 0 014 0zM13 16V6a1 1 0 00-1-1H4a1 1 0 00-1 1v10l2-2h7zm0 0l2-2h3l2 2')
const IconChat    = Hi('M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z')
const IconCloud   = Hi('M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12')

const integrations = reactive([
  { name: 'Mailchimp',     category: 'Email Marketing', icon: IconMail,  iconBg: 'bg-yellow-50', iconColor: 'text-yellow-500', connected: true,  desc: 'Sync customers and send targeted email campaigns automatically.' },
  { name: 'Google Analytics', category: 'Analytics',  icon: IconChart, iconBg: 'bg-blue-50',   iconColor: 'text-blue-500',   connected: true,  desc: 'Track website traffic, conversions, and user behavior.' },
  { name: 'Shopify',       category: 'E-commerce',     icon: IconShop,  iconBg: 'bg-green-50',  iconColor: 'text-green-500',  connected: false, desc: 'Import products and sync orders from your Shopify store.' },
  { name: 'JNE / J&T',    category: 'Shipping',        icon: IconTruck, iconBg: 'bg-orange-50', iconColor: 'text-orange-500', connected: false, desc: 'Auto-generate shipping labels and track deliveries.' },
  { name: 'WhatsApp API',  category: 'Messaging',       icon: IconChat,  iconBg: 'bg-emerald-50',iconColor: 'text-emerald-500',connected: true,  desc: 'Send order notifications and support messages via WhatsApp.' },
  { name: 'Google Drive',  category: 'Storage',         icon: IconCloud, iconBg: 'bg-brand-50',  iconColor: 'text-brand-500',  connected: false, desc: 'Backup reports and export data directly to Google Drive.' },
])
</script>