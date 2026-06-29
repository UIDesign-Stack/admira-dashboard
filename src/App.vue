<template>
  <div class="flex h-screen overflow-hidden bg-[#f4f5f9]">

    <div
      v-if="sidebarOpen"
      class="lg:hidden fixed inset-0 z-30 bg-black/30 backdrop-blur-sm"
      @click="sidebarOpen = false"
    />

    <AppSidebar
      :activeNav="activeNav"
      :isOpen="sidebarOpen"
      @nav-change="activeNav = $event; sidebarOpen = false"
      @close="sidebarOpen = false"
    />

    <div class="flex-1 flex flex-col overflow-hidden">
      <AppTopbar @toggle-sidebar="sidebarOpen = !sidebarOpen" />

      <OverviewView   v-if="activeNav === 'Overview'" />
      <AnalyticsView  v-else-if="activeNav === 'Analytics'" />
      <Productsview   v-else-if="activeNav === 'Products'" />
      <Ordersview     v-else-if="activeNav === 'Orders'" />

      <div v-else class="flex-1 flex items-center justify-center text-gray-400 text-sm">
        <div class="text-center">
          <div class="text-4xl mb-3">🚧</div>
          <p class="font-medium">{{ activeNav }} — coming soon</p>
        </div>
      </div>
    </div>

  </div>
</template>

<script setup>
import { ref } from 'vue'
import AppSidebar    from '@/components/layout/AppSidebar.vue'
import AppTopbar     from '@/components/layout/AppTopbar.vue'
import OverviewView  from '@/views/OverviewView.vue'
import AnalyticsView from '@/views/AnalyticsView.vue'
import Productsview from '@/views/Productsview.vue'
import Ordersview from '@/views/Ordersview.vue'

const activeNav   = ref('Overview')
const sidebarOpen = ref(false)
</script>