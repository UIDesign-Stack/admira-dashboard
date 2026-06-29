<template>
  <header class="flex items-center justify-between px-4 lg:px-8 py-4 bg-white border-b border-gray-100 relative z-20">

    <!-- Mobile: hamburger -->
    <button
      class="lg:hidden w-9 h-9 flex items-center justify-center rounded-xl bg-gray-50 border border-gray-100"
      @click="$emit('toggle-sidebar')"
    >
      <svg class="w-5 h-5 text-gray-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16"/>
      </svg>
    </button>

    <!-- Greeting -->
    <div>
      <h1 class="text-base lg:text-xl font-bold text-gray-900">Good morning, Fajar 👋</h1>
      <p class="hidden lg:block text-xs text-gray-400 mt-0.5">Here's what's happening with your store today.</p>
    </div>

    <!-- Kanan: Search + Notif -->
    <div class="flex items-center gap-3">

      <!-- Search: hanya desktop -->
      <div class="hidden lg:flex items-center gap-2 bg-gray-50 rounded-xl px-3 py-2 border border-gray-100 w-52">
        <svg class="w-4 h-4 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"/>
        </svg>
        <span class="text-xs text-gray-400">Search anything...</span>
      </div>

      <!-- Notifikasi -->
      <div class="relative" ref="notifRef">
        <button
          @click="toggleNotif"
          class="relative w-9 h-9 rounded-xl bg-gray-50 border border-gray-100 flex items-center justify-center hover:bg-gray-100 transition-colors"
        >
          <svg class="w-4 h-4 text-gray-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9"/>
          </svg>
          <span
            v-if="unreadCount > 0"
            class="absolute -top-1 -right-1 w-4 h-4 bg-brand-500 text-white text-[9px] font-bold rounded-full flex items-center justify-center"
          >{{ unreadCount }}</span>
        </button>

        <!-- Dropdown Notifikasi -->
        <Transition
          enter-active-class="transition-all duration-200 ease-out"
          enter-from-class="opacity-0 translate-y-1 scale-95"
          enter-to-class="opacity-100 translate-y-0 scale-100"
          leave-active-class="transition-all duration-150 ease-in"
          leave-from-class="opacity-100 translate-y-0 scale-100"
          leave-to-class="opacity-0 translate-y-1 scale-95"
        >
          <div
            v-if="notifOpen"
            class="absolute right-0 top-11 w-80 bg-white rounded-2xl shadow-xl border border-gray-100 overflow-hidden"
          >
            <!-- Header -->
            <div class="flex items-center justify-between px-4 py-3 border-b border-gray-100">
              <div class="flex items-center gap-2">
                <span class="font-semibold text-sm text-gray-900">Notifications</span>
                <span v-if="unreadCount > 0" class="text-[10px] font-bold text-white bg-brand-500 rounded-full px-1.5 py-0.5">{{ unreadCount }}</span>
              </div>
              <button @click="markAllRead" class="text-[11px] text-brand-500 font-medium hover:text-brand-700 transition-colors">
                Mark all read
              </button>
            </div>

            <!-- List Notif -->
            <div class="max-h-72 overflow-y-auto">
              <div
                v-for="notif in notifications"
                :key="notif.id"
                @click="readNotif(notif.id)"
                :class="[
                  'flex items-start gap-3 px-4 py-3 cursor-pointer transition-colors border-b border-gray-50 last:border-0',
                  notif.read ? 'bg-white hover:bg-gray-50' : 'bg-brand-50/50 hover:bg-brand-50'
                ]"
              >
                <!-- Icon -->
                <div :class="['w-8 h-8 rounded-xl flex items-center justify-center flex-shrink-0 text-sm', notif.iconBg]">
                  {{ notif.icon }}
                </div>
                <!-- Text -->
                <div class="flex-1 min-w-0">
                  <p :class="['text-xs leading-snug', notif.read ? 'text-gray-600' : 'text-gray-800 font-medium']">
                    {{ notif.message }}
                  </p>
                  <p class="text-[10px] text-gray-400 mt-0.5">{{ notif.time }}</p>
                </div>
                <!-- Unread dot -->
                <div v-if="!notif.read" class="w-2 h-2 rounded-full bg-brand-500 flex-shrink-0 mt-1"></div>
              </div>
            </div>

            <!-- Footer -->
            <div class="px-4 py-3 border-t border-gray-100 text-center">
              <button class="text-xs text-brand-500 font-medium hover:text-brand-700 transition-colors">
                View all notifications
              </button>
            </div>
          </div>
        </Transition>
      </div>

    </div>
  </header>
</template>

<script setup>
import { ref, computed, onMounted, onBeforeUnmount } from 'vue'

defineEmits(['toggle-sidebar'])

const notifOpen = ref(false)
const notifRef = ref(null)

const notifications = ref([
  {
    id: 1,
    icon: '🛒',
    iconBg: 'bg-green-100',
    message: 'New order #ORD-2024-006 from Sarah Connor — Rp 540.000',
    time: '2 minutes ago',
    read: false,
  },
  {
    id: 2,
    icon: '⚠️',
    iconBg: 'bg-yellow-100',
    message: 'Stock for Wireless Headphone is running low (5 left)',
    time: '15 minutes ago',
    read: false,
  },
  {
    id: 3,
    icon: '👤',
    iconBg: 'bg-blue-100',
    message: '3 new customers registered today',
    time: '1 hour ago',
    read: false,
  },
  {
    id: 4,
    icon: '✅',
    iconBg: 'bg-purple-100',
    message: 'Order #ORD-2024-001 has been delivered successfully',
    time: '2 hours ago',
    read: true,
  },
  {
    id: 5,
    icon: '📊',
    iconBg: 'bg-pink-100',
    message: 'Monthly revenue report for May is ready to view',
    time: '1 day ago',
    read: true,
  },
])

const unreadCount = computed(() => notifications.value.filter(n => !n.read).length)

function toggleNotif() {
  notifOpen.value = !notifOpen.value
}

function readNotif(id) {
  const n = notifications.value.find(n => n.id === id)
  if (n) n.read = true
}

function markAllRead() {
  notifications.value.forEach(n => n.read = true)
}

function handleClickOutside(e) {
  if (notifRef.value && !notifRef.value.contains(e.target)) {
    notifOpen.value = false
  }
}

onMounted(() => document.addEventListener('mousedown', handleClickOutside))
onBeforeUnmount(() => document.removeEventListener('mousedown', handleClickOutside))
</script>