<template>
  <div class="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
    <h2 class="font-bold text-base text-gray-900 mb-0.5">Appearance</h2>
    <p class="text-xs text-gray-400 mb-6">Customize how the dashboard looks and feels</p>

    <div class="space-y-8">

      <!-- Theme -->
      <div>
        <p class="text-xs font-bold text-gray-700 mb-3">Theme</p>
        <div class="grid grid-cols-3 gap-3">
          <button v-for="t in themes" :key="t.value"
            @click="form.theme = t.value"
            :class="['relative rounded-2xl border-2 p-3 transition-all overflow-hidden',
              form.theme === t.value ? 'border-brand-500 shadow-md' : 'border-gray-100 hover:border-gray-200']">
            <!-- Preview mini -->
            <div :class="['rounded-lg h-16 mb-2 flex flex-col gap-1 p-2', t.bg]">
              <div :class="['h-2 w-10 rounded', t.bar]"></div>
              <div :class="['h-1.5 w-16 rounded opacity-60', t.bar]"></div>
              <div :class="['h-1.5 w-12 rounded opacity-40', t.bar]"></div>
            </div>
            <p class="text-[11px] font-semibold text-gray-700 text-center">{{ t.label }}</p>
            <!-- Check badge -->
            <div v-if="form.theme === t.value"
              class="absolute top-2 right-2 w-5 h-5 rounded-full bg-brand-500 flex items-center justify-center">
              <svg class="w-3 h-3 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="3" d="M5 13l4 4L19 7"/>
              </svg>
            </div>
          </button>
        </div>
      </div>

      <!-- Accent Color -->
      <div>
        <p class="text-xs font-bold text-gray-700 mb-3">Accent Color</p>
        <div class="flex flex-wrap gap-3">
          <button v-for="c in colors" :key="c.value"
            @click="form.color = c.value"
            :class="['w-8 h-8 rounded-full transition-transform hover:scale-110',
              form.color === c.value ? 'ring-2 ring-offset-2 scale-110' : '']"
            :style="{ backgroundColor: c.hex, '--tw-ring-color': c.hex }">
          </button>
        </div>
      </div>

      <!-- Font Size -->
      <div>
        <p class="text-xs font-bold text-gray-700 mb-3">Font Size</p>
        <div class="flex items-center gap-3">
          <span class="text-[10px] text-gray-400">A</span>
          <input type="range" v-model="form.fontSize" min="12" max="18" step="1"
            class="flex-1 accent-brand-500"/>
          <span class="text-base text-gray-400">A</span>
          <span class="text-xs text-gray-600 font-semibold w-8">{{ form.fontSize }}px</span>
        </div>
      </div>

      <!-- Sidebar -->
      <div>
        <p class="text-xs font-bold text-gray-700 mb-3">Sidebar Compact Mode</p>
        <div class="flex items-center justify-between p-3.5 bg-gray-50 rounded-xl border border-gray-100">
          <div>
            <p class="text-xs font-semibold text-gray-800">Compact Sidebar</p>
            <p class="text-[10px] text-gray-400 mt-0.5">Show only icons in the sidebar, hide labels</p>
          </div>
          <button @click="form.compact = !form.compact"
            :class="['relative rounded-full transition-colors flex-shrink-0', form.compact ? 'bg-brand-500' : 'bg-gray-200']"
            style="height:22px; width:40px;">
            <span :class="['absolute top-0.5 w-4 h-4 bg-white rounded-full shadow transition-transform',
              form.compact ? 'translate-x-5' : 'translate-x-0.5']"></span>
          </button>
        </div>
      </div>

    </div>

    <div class="flex justify-end mt-8">
      <button class="px-6 py-2.5 rounded-xl bg-gradient-to-r from-brand-500 to-brand-700 text-white text-sm font-semibold hover:opacity-90 transition-opacity">
        Save Appearance
      </button>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'

const form = ref({ theme: 'light', color: '#7c6af5', fontSize: 14, compact: false })

const themes = [
  { value: 'light',  label: 'Light',  bg: 'bg-white border border-gray-100',   bar: 'bg-gray-300' },
  { value: 'dark',   label: 'Dark',   bg: 'bg-gray-800',                        bar: 'bg-gray-600' },
  { value: 'system', label: 'System', bg: 'bg-gradient-to-r from-white to-gray-800', bar: 'bg-gray-400' },
]
const colors = [
  { value: '#7c6af5', hex: '#7c6af5' },
  { value: '#3b82f6', hex: '#3b82f6' },
  { value: '#10b981', hex: '#10b981' },
  { value: '#ec4899', hex: '#ec4899' },
  { value: '#f59e0b', hex: '#f59e0b' },
  { value: '#ef4444', hex: '#ef4444' },
  { value: '#8b5cf6', hex: '#8b5cf6' },
  { value: '#06b6d4', hex: '#06b6d4' },
]
</script>