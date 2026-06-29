<template>
  <div class="space-y-4">

    <!-- Change Password -->
    <div class="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
      <h2 class="font-bold text-base text-gray-900 mb-0.5">Change Password</h2>
      <p class="text-xs text-gray-400 mb-6">Make sure your password is at least 8 characters</p>

      <div class="space-y-4 max-w-md">
        <div>
          <label class="block text-xs font-semibold text-gray-700 mb-1.5">Current Password</label>
          <div class="relative">
            <input :type="show.current ? 'text' : 'password'" v-model="form.current"
              class="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-2.5 text-sm text-gray-800 outline-none focus:border-brand-400 focus:bg-white transition-colors pr-10"/>
            <button @click="show.current = !show.current" class="absolute right-3 top-1/2 -translate-y-1/2">
              <svg class="w-4 h-4 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                  :d="show.current ? 'M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21' : 'M15 12a3 3 0 11-6 0 3 3 0 016 0z M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z'"/>
              </svg>
            </button>
          </div>
        </div>
        <div>
          <label class="block text-xs font-semibold text-gray-700 mb-1.5">New Password</label>
          <div class="relative">
            <input :type="show.new ? 'text' : 'password'" v-model="form.new"
              class="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-2.5 text-sm text-gray-800 outline-none focus:border-brand-400 focus:bg-white transition-colors pr-10"/>
            <button @click="show.new = !show.new" class="absolute right-3 top-1/2 -translate-y-1/2">
              <svg class="w-4 h-4 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"/>
              </svg>
            </button>
          </div>
          <!-- Strength bar -->
          <div v-if="form.new" class="mt-2">
            <div class="flex gap-1 mb-1">
              <div v-for="i in 4" :key="i"
                :class="['flex-1 h-1 rounded-full transition-colors', i <= strength ? strengthColor : 'bg-gray-100']"></div>
            </div>
            <p class="text-[10px]" :class="strength <= 1 ? 'text-red-400' : strength <= 2 ? 'text-yellow-500' : strength <= 3 ? 'text-blue-500' : 'text-green-500'">
              {{ strengthLabel }}
            </p>
          </div>
        </div>
        <div>
          <label class="block text-xs font-semibold text-gray-700 mb-1.5">Confirm New Password</label>
          <input :type="'password'" v-model="form.confirm"
            :class="['w-full bg-gray-50 border rounded-xl px-4 py-2.5 text-sm text-gray-800 outline-none transition-colors',
              form.confirm && form.confirm !== form.new ? 'border-red-300 focus:border-red-400' : 'border-gray-200 focus:border-brand-400 focus:bg-white']"/>
          <p v-if="form.confirm && form.confirm !== form.new" class="text-[10px] text-red-400 mt-1">Passwords do not match</p>
        </div>
      </div>

      <div class="flex justify-end mt-6">
        <button class="px-6 py-2.5 rounded-xl bg-gradient-to-r from-brand-500 to-brand-700 text-white text-sm font-semibold hover:opacity-90 transition-opacity">
          Update Password
        </button>
      </div>
    </div>

    <!-- Active Sessions -->
    <div class="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
      <h2 class="font-bold text-base text-gray-900 mb-0.5">Active Sessions</h2>
      <p class="text-xs text-gray-400 mb-5">Devices currently logged into your account</p>

      <div class="space-y-3">
        <div v-for="session in sessions" :key="session.id"
          class="flex items-center justify-between p-3.5 rounded-xl bg-gray-50 border border-gray-100">
          <div class="flex items-center gap-3">
            <div :class="['w-9 h-9 rounded-xl flex items-center justify-center flex-shrink-0', session.iconBg]">
              <component :is="session.icon" :class="['w-5 h-5', session.iconColor]" />
            </div>
            <div>
              <p class="text-xs font-semibold text-gray-800">{{ session.device }}</p>
              <p class="text-[10px] text-gray-400">{{ session.location }} · {{ session.time }}</p>
            </div>
          </div>
          <div class="flex items-center gap-2">
            <span v-if="session.current"
              class="text-[10px] font-semibold text-green-600 bg-green-50 px-2 py-0.5 rounded-full">Current</span>
            <button v-else class="text-[11px] text-red-400 font-semibold hover:text-red-600 transition-colors">
              Revoke
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { h, ref, computed } from 'vue'
const Hi = (d) => ({ render: () => h('svg', { fill: 'none', viewBox: '0 0 24 24', stroke: 'currentColor', 'stroke-width': '2' }, [h('path', { 'stroke-linecap': 'round', 'stroke-linejoin': 'round', d })]) })

const show = ref({ current: false, new: false })
const form = ref({ current: '', new: '', confirm: '' })

const strength = computed(() => {
  const p = form.value.new
  let s = 0
  if (p.length >= 8) s++
  if (/[A-Z]/.test(p)) s++
  if (/[0-9]/.test(p)) s++
  if (/[^A-Za-z0-9]/.test(p)) s++
  return s
})
const strengthColor = computed(() => ['bg-red-400','bg-red-400','bg-yellow-400','bg-blue-400','bg-green-400'][strength.value])
const strengthLabel = computed(() => ['','Weak','Fair','Good','Strong'][strength.value])

const IconDesktop = Hi('M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z')
const IconPhone   = Hi('M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z')

const sessions = ref([
  { id: 1, icon: IconDesktop, iconBg: 'bg-brand-50', iconColor: 'text-brand-500', device: 'Chrome on Windows', location: 'Jakarta, ID', time: 'Active now', current: true },
  { id: 2, icon: IconPhone,   iconBg: 'bg-green-50',  iconColor: 'text-green-500', device: 'Safari on iPhone', location: 'Bandung, ID', time: '2 hours ago', current: false },
  { id: 3, icon: IconDesktop, iconBg: 'bg-gray-100',  iconColor: 'text-gray-400',  device: 'Firefox on MacOS', location: 'Singapore', time: '3 days ago', current: false },
])
</script>