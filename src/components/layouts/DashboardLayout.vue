<template>
  <div class="flex h-screen bg-gray-50 overflow-hidden">

    <!-- Overlay mobile (klik tutup sidebar) -->
    <Transition
      enter-active-class="transition-opacity duration-300"
      enter-from-class="opacity-0"
      enter-to-class="opacity-100"
      leave-active-class="transition-opacity duration-300"
      leave-from-class="opacity-100"
      leave-to-class="opacity-0"
    >
      <div v-if="sidebarOpen"
        class="lg:hidden fixed inset-0 bg-black/30 backdrop-blur-sm z-30"
        @click="sidebarOpen = false"
      />
    </Transition>

    <!-- Sidebar -->
    <AppSidebar
      :is-open="sidebarOpen"
      :active-nav="activeNav"
      @close="sidebarOpen = false"
      @nav-change="handleNav"
    />

    <!-- Main area -->
    <div class="flex-1 flex flex-col min-w-0 overflow-hidden">

      <!-- Topbar -->
      <AppTopbar @toggle-sidebar="sidebarOpen = !sidebarOpen" />

      <!-- Page content -->
      <RouterView />
    </div>
  </div>
</template>

<script setup>
import { ref, watch } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import AppSidebar from '@/components/layouts/AppSidebar.vue'
import AppTopbar  from '@/components/layouts/AppTopbar.vue'

const router     = useRouter()
const route      = useRoute()
const sidebarOpen = ref(false)

// Sync active nav dengan route saat ini
const activeNav = ref(capitalize(route.name || 'Overview'))

watch(() => route.name, (name) => {
  activeNav.value = capitalize(name || 'Overview')
  sidebarOpen.value = false // tutup sidebar mobile saat navigasi
})

function capitalize(str) {
  return str.charAt(0).toUpperCase() + str.slice(1)
}

function handleNav(label) {
  // Map label sidebar → route name
  const map = {
    'Overview':  'Overview',
    'Analytics': 'Analytics',
    'Orders':    'Orders',
    'Products':  'Products',
    'Customers': 'Customers',
    'Reports':   'Reports',
    'Settings':  'Settings',
  }
  const name = map[label]
  if (name) router.push({ name })
  sidebarOpen.value = false
}
</script>