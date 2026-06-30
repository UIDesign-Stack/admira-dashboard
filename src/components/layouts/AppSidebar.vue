<template>
  <!-- Desktop Sidebar -->
  <aside class="hidden lg:flex w-[180px] flex-shrink-0 bg-white flex-col py-6 px-4 shadow-sm">
    <SidebarContent :activeNav="activeNav" @nav-change="$emit('nav-change', $event)" />
  </aside>

  <!-- Mobile Sidebar (slide dari kiri) -->
  <Transition
    enter-active-class="transition-transform duration-300 ease-out"
    enter-from-class="-translate-x-full"
    enter-to-class="translate-x-0"
    leave-active-class="transition-transform duration-300 ease-in"
    leave-from-class="translate-x-0"
    leave-to-class="-translate-x-full"
  >
    <aside
      v-if="isOpen"
      class="lg:hidden fixed top-0 left-0 z-40 h-full w-[220px] bg-white flex flex-col py-6 px-4 shadow-xl"
    >
      <!-- Tombol Close -->
      <button
        class="absolute top-4 right-4 w-8 h-8 flex items-center justify-center rounded-xl bg-gray-100 hover:bg-gray-200 transition-colors"
        @click="$emit('close')"
      >
        <svg class="w-4 h-4 text-gray-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"/>
        </svg>
      </button>

      <SidebarContent :activeNav="activeNav" @nav-change="$emit('nav-change', $event)" />
    </aside>
  </Transition>
</template>

<script setup>
import SidebarContent from './SidebarContent.vue'

defineProps({ activeNav: String, isOpen: Boolean })
defineEmits(['nav-change', 'close'])
</script>