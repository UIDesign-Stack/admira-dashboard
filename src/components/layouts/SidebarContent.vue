<template>
  <!-- Logo -->
  <div class="flex items-center gap-2 mb-8 px-1">
    <div class="w-9 h-9 rounded-xl bg-gradient-to-br from-brand-500 to-brand-700 flex items-center justify-center shadow-md">
      <svg class="w-5 h-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2.5">
        <path stroke-linecap="round" stroke-linejoin="round" d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6"/>
      </svg>
    </div>
    <div>
      <p class="font-bold text-gray-900 text-sm leading-none">Admira</p>
      <p class="text-[10px] text-gray-400 font-medium tracking-wider mt-0.5">ADMIN PANEL</p>
    </div>
  </div>

  <!-- Nav -->
  <nav class="flex-1 flex flex-col gap-1">
    <button
      v-for="item in navItems" :key="item.label"
      @click="$emit('nav-change', item.label)"
      :class="[
        'flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-all duration-150 w-full text-left',
        activeNav === item.label
          ? 'bg-brand-50 text-brand-600 shadow-sm'
          : 'text-gray-500 hover:bg-gray-50 hover:text-gray-700'
      ]"
    >
      <component :is="item.icon" class="w-4 h-4 flex-shrink-0" />
      {{ item.label }}
    </button>
  </nav>

  <!-- Upgrade Card -->
  <div class="mt-auto">
    <div class="rounded-xl bg-gradient-to-br from-brand-50 to-purple-100 border border-brand-100 p-3 mb-4">
      <div class="flex items-center gap-1.5 mb-1">
        <svg class="w-3.5 h-3.5 text-brand-500" fill="currentColor" viewBox="0 0 20 20">
          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"/>
        </svg>
        <span class="text-xs font-semibold text-brand-700">Upgrade Plan</span>
      </div>
      <p class="text-[10px] text-gray-500 mb-2">Unlock premium features</p>
      <button class="w-full text-[11px] font-semibold text-white bg-gradient-to-r from-brand-500 to-brand-700 rounded-lg py-1.5 hover:opacity-90 transition-opacity">
        Upgrade Now
      </button>
    </div>

    <!-- User Info + Dropdown -->
    <div class="relative" ref="userMenuRef">
      <button
        @click="userMenuOpen = !userMenuOpen"
        :class="[
          'flex items-center gap-2 px-2 py-1.5 rounded-xl w-full text-left transition-colors',
          userMenuOpen ? 'bg-gray-100' : 'hover:bg-gray-50'
        ]"
      >
        <div class="w-8 h-8 rounded-full bg-gradient-to-br from-orange-300 to-pink-400 flex items-center justify-center text-white text-xs font-bold flex-shrink-0">F</div>
        <div class="flex-1 min-w-0">
          <p class="text-xs font-semibold text-gray-800 truncate">Fajar</p>
          <p class="text-[10px] text-gray-400">Administrator</p>
        </div>
        <svg
          :class="['w-3.5 h-3.5 text-gray-400 transition-transform duration-200', userMenuOpen ? 'rotate-180' : '']"
          fill="none" viewBox="0 0 24 24" stroke="currentColor"
        >
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"/>
        </svg>
      </button>

      <!-- Dropdown Menu -->
      <Transition
        enter-active-class="transition-all duration-200 ease-out"
        enter-from-class="opacity-0 translate-y-1 scale-95"
        enter-to-class="opacity-100 translate-y-0 scale-100"
        leave-active-class="transition-all duration-150 ease-in"
        leave-from-class="opacity-100 translate-y-0 scale-100"
        leave-to-class="opacity-0 translate-y-1 scale-95"
      >
        <div
          v-if="userMenuOpen"
          class="absolute bottom-full left-0 right-0 mb-2 bg-white rounded-xl shadow-lg border border-gray-100 overflow-hidden"
        >
          <!-- User Header -->
          <div class="flex items-center gap-2.5 px-3 py-3 border-b border-gray-100 bg-gray-50">
            <div class="w-9 h-9 rounded-full bg-gradient-to-br from-orange-300 to-pink-400 flex items-center justify-center text-white text-sm font-bold flex-shrink-0">F</div>
            <div class="min-w-0">
              <p class="text-xs font-bold text-gray-900 truncate">FajarDev</p>
              <p class="text-[10px] text-gray-400 truncate">fajar@admira.io</p>
            </div>
          </div>

          <!-- Menu Items -->
          <div class="py-1">
            <button
              v-for="item in userMenuItems" :key="item.label"
              @click="handleUserMenu(item)"
              :class="[
                'flex items-center gap-2.5 w-full px-3 py-2 text-left text-xs transition-colors',
                item.danger
                  ? 'text-red-500 hover:bg-red-50'
                  : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
              ]"
            >
              <component :is="item.icon" class="w-3.5 h-3.5 flex-shrink-0" />
              {{ item.label }}
            </button>
          </div>
        </div>
      </Transition>
    </div>
  </div>
</template>

<script setup>
import { h, ref, onMounted, onBeforeUnmount } from 'vue'
import { useRouter } from 'vue-router'

defineProps({ activeNav: String })
defineEmits(['nav-change'])

const router       = useRouter()
const userMenuOpen = ref(false)
const userMenuRef  = ref(null)

const icon = (d) => ({
  render: () => h('svg',
    { fill: 'none', viewBox: '0 0 24 24', stroke: 'currentColor', 'stroke-width': '2' },
    [h('path', { 'stroke-linecap': 'round', 'stroke-linejoin': 'round', d })]
  )
})

const icon2 = (d1, d2) => ({
  render: () => h('svg',
    { fill: 'none', viewBox: '0 0 24 24', stroke: 'currentColor', 'stroke-width': '2' },
    [
      h('path', { 'stroke-linecap': 'round', 'stroke-linejoin': 'round', d: d1 }),
      h('path', { 'stroke-linecap': 'round', 'stroke-linejoin': 'round', d: d2 }),
    ]
  )
})

const navItems = [
  { label: 'Overview',  icon: icon('M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6') },
  { label: 'Analytics', icon: icon('M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z') },
  { label: 'Orders',    icon: icon('M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4') },
  { label: 'Products',  icon: icon('M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z') },
  { label: 'Customers', icon: icon('M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z') },
  { label: 'Reports',   icon: icon('M9 17v-2m3 2v-4m3 4v-6m2 10H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z') },
  { label: 'Settings',  icon: icon2('M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z', 'M15 12a3 3 0 11-6 0 3 3 0 016 0z') },
]

const userMenuItems = [
  { label: 'My Profile',       icon: icon('M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z') },
  { label: 'Account Settings', icon: icon2('M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z', 'M15 12a3 3 0 11-6 0 3 3 0 016 0z') },
  { label: 'Help & Support',   icon: icon('M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z') },
  { label: 'Sign Out',         icon: icon('M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1'), danger: true },
]

function handleUserMenu(item) {
  userMenuOpen.value = false
  if (item.label === 'Sign Out') {
    localStorage.removeItem('admira_token')
    router.push('/login')
  }
}

function handleClickOutside(e) {
  if (userMenuRef.value && !userMenuRef.value.contains(e.target)) {
    userMenuOpen.value = false
  }
}

onMounted(() => document.addEventListener('mousedown', handleClickOutside))
onBeforeUnmount(() => document.removeEventListener('mousedown', handleClickOutside))
</script>