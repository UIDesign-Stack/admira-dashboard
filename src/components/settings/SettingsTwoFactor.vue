<template>
  <div class="space-y-4">

    <!-- Status Card -->
    <div class="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
      <h2 class="font-bold text-base text-gray-900 mb-0.5">Two-Factor Authentication</h2>
      <p class="text-xs text-gray-400 mb-6">Add an extra layer of security to your account</p>

      <!-- Status banner -->
      <div :class="['flex items-center gap-4 p-4 rounded-2xl border mb-6',
        enabled ? 'bg-green-50 border-green-200' : 'bg-yellow-50 border-yellow-200']">
        <div :class="['w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0',
          enabled ? 'bg-green-100' : 'bg-yellow-100']">
          <svg :class="['w-5 h-5', enabled ? 'text-green-600' : 'text-yellow-600']"
            fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
              :d="enabled ? 'M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z' : 'M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z'"/>
          </svg>
        </div>
        <div class="flex-1">
          <p :class="['text-sm font-bold', enabled ? 'text-green-800' : 'text-yellow-800']">
            {{ enabled ? '2FA is Enabled' : '2FA is Disabled' }}
          </p>
          <p :class="['text-[11px] mt-0.5', enabled ? 'text-green-600' : 'text-yellow-600']">
            {{ enabled ? 'Your account is protected with two-factor authentication.' : 'Enable 2FA to secure your account from unauthorized access.' }}
          </p>
        </div>
        <button @click="enabled ? (showDisable = true) : (showSetup = true)"
          :class="['px-4 py-2 rounded-xl text-xs font-semibold flex-shrink-0 transition-opacity hover:opacity-90',
            enabled ? 'bg-red-100 text-red-500 hover:bg-red-200' : 'bg-gradient-to-r from-brand-500 to-brand-700 text-white']">
          {{ enabled ? 'Disable' : 'Enable 2FA' }}
        </button>
      </div>

      <!-- Methods -->
      <p class="text-xs font-bold text-gray-700 mb-3">Authentication Methods</p>
      <div class="space-y-3">
        <div v-for="method in methods" :key="method.label"
          class="flex items-center justify-between p-3.5 rounded-xl border border-gray-100 bg-gray-50">
          <div class="flex items-center gap-3">
            <div :class="['w-9 h-9 rounded-xl flex items-center justify-center flex-shrink-0', method.iconBg]">
              <component :is="method.icon" :class="['w-4 h-4', method.iconColor]" />
            </div>
            <div>
              <p class="text-xs font-semibold text-gray-800">{{ method.label }}</p>
              <p class="text-[10px] text-gray-400 mt-0.5">{{ method.desc }}</p>
            </div>
          </div>
          <span :class="['text-[10px] font-semibold px-2 py-0.5 rounded-full',
            method.active ? 'bg-green-50 text-green-600' : 'bg-gray-100 text-gray-400']">
            {{ method.active ? 'Active' : 'Inactive' }}
          </span>
        </div>
      </div>
    </div>

    <!-- Backup Codes -->
    <div class="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
      <div class="flex items-center justify-between mb-4">
        <div>
          <h2 class="font-bold text-base text-gray-900">Backup Codes</h2>
          <p class="text-xs text-gray-400 mt-0.5">Use these if you lose access to your authenticator</p>
        </div>
        <button class="text-xs font-semibold text-brand-500 hover:text-brand-700 transition-colors">
          Regenerate
        </button>
      </div>
      <div class="grid grid-cols-2 sm:grid-cols-4 gap-2">
        <div v-for="code in backupCodes" :key="code"
          class="font-mono text-xs text-center py-2 px-3 bg-gray-50 border border-gray-200 rounded-xl text-gray-600 tracking-wider">
          {{ code }}
        </div>
      </div>
      <p class="text-[10px] text-gray-400 mt-3">Each code can only be used once. Store them in a safe place.</p>
    </div>

    <!-- Setup Modal -->
    <Transition enter-active-class="transition-all duration-200 ease-out" enter-from-class="opacity-0" enter-to-class="opacity-100"
      leave-active-class="transition-all duration-150" leave-from-class="opacity-100" leave-to-class="opacity-0">
      <div v-if="showSetup" class="fixed inset-0 z-50 flex items-center justify-center p-4">
        <div class="absolute inset-0 bg-black/30 backdrop-blur-sm" @click="showSetup = false"></div>
        <div class="relative bg-white rounded-2xl shadow-2xl w-full max-w-sm p-6">
          <p class="font-bold text-gray-900 mb-1">Set Up Authenticator App</p>
          <p class="text-xs text-gray-400 mb-4">Scan this QR code with Google Authenticator or Authy</p>
          <!-- Fake QR placeholder -->
          <div class="w-36 h-36 mx-auto bg-gray-100 rounded-xl flex items-center justify-center mb-4 border-2 border-dashed border-gray-200">
            <svg class="w-16 h-16 text-gray-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1" d="M12 4v1m6 11h2m-6 0h-2v4m0-11v3m0 0h.01M12 12h4.01M16 20h4M4 12h4m12 0h.01M5 8h2a1 1 0 001-1V5a1 1 0 00-1-1H5a1 1 0 00-1 1v2a1 1 0 001 1zm12 0h2a1 1 0 001-1V5a1 1 0 00-1-1h-2a1 1 0 00-1 1v2a1 1 0 001 1zM5 20h2a1 1 0 001-1v-2a1 1 0 00-1-1H5a1 1 0 00-1 1v2a1 1 0 001 1z"/>
            </svg>
          </div>
          <label class="block text-xs font-semibold text-gray-700 mb-1.5">Enter 6-digit code</label>
          <input v-model="otpCode" type="text" maxlength="6" placeholder="000000"
            class="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-2.5 text-sm text-center font-mono tracking-widest text-gray-800 outline-none focus:border-brand-400 focus:bg-white transition-colors mb-4"/>
          <div class="flex gap-2">
            <button @click="showSetup = false"
              class="flex-1 py-2.5 rounded-xl border border-gray-200 text-xs font-semibold text-gray-600 hover:bg-gray-50 transition-colors">Cancel</button>
            <button @click="enabled = true; showSetup = false"
              class="flex-1 py-2.5 rounded-xl bg-gradient-to-r from-brand-500 to-brand-700 text-white text-xs font-semibold hover:opacity-90 transition-opacity">Verify & Enable</button>
          </div>
        </div>
      </div>
    </Transition>
  </div>
</template>

<script setup>
import { h, ref } from 'vue'
const Hi = (d) => ({ render: () => h('svg', { fill: 'none', viewBox: '0 0 24 24', stroke: 'currentColor', 'stroke-width': '2' }, [h('path', { 'stroke-linecap': 'round', 'stroke-linejoin': 'round', d })]) })

const enabled    = ref(false)
const showSetup  = ref(false)
const showDisable= ref(false)
const otpCode    = ref('')

const IconPhone = Hi('M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z')
const IconMail  = Hi('M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z')
const IconKey   = Hi('M15 7a2 2 0 012 2m4 0a6 6 0 01-7.743 5.743L11 17H9v2H7v2H4a1 1 0 01-1-1v-2.586a1 1 0 01.293-.707l5.964-5.964A6 6 0 1121 9z')

const methods = [
  { label: 'Authenticator App', desc: 'Google Authenticator or Authy', icon: IconPhone, iconBg: 'bg-brand-50',  iconColor: 'text-brand-500', active: false },
  { label: 'SMS Verification',  desc: 'Send code to +62 812 ···· 7890', icon: IconMail,  iconBg: 'bg-blue-50',   iconColor: 'text-blue-500',  active: false },
  { label: 'Hardware Key',      desc: 'YubiKey or FIDO2 security key',  icon: IconKey,   iconBg: 'bg-amber-50',  iconColor: 'text-amber-500', active: false },
]

const backupCodes = ['4F2A-9K1B', 'R7X3-M8QP', 'Z5C0-L4NW', 'T2H6-E9VJ', 'B1G8-U3SD', 'W9Y4-I6CF', 'D0K5-A7LT', 'N3P1-H2XE']
</script>