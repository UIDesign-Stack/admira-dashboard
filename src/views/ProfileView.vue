<template>
  <main class="flex-1 overflow-y-auto px-4 lg:px-8 py-6">

    <!-- Header -->
    <div class="flex items-center justify-between mb-6">
      <div>
        <h1 class="text-lg font-bold text-gray-900">My Profile</h1>
        <p class="text-xs text-gray-400 mt-0.5">Manage your personal information and account settings</p>
      </div>
      <!-- Profile Completion -->
      <div class="hidden sm:flex items-center gap-3 bg-white rounded-2xl shadow-sm border border-gray-100 px-4 py-3">
        <svg class="w-4 h-4 text-brand-500 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="1.8">
          <path stroke-linecap="round" stroke-linejoin="round" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"/>
        </svg>
        <div class="min-w-0">
          <div class="flex items-center justify-between gap-6 mb-1">
            <span class="text-[11px] text-gray-500 font-medium">Profile Completion</span>
            <span class="text-[11px] font-bold text-brand-600">{{ completion }}%</span>
          </div>
          <div class="w-40 h-1.5 bg-gray-100 rounded-full overflow-hidden">
            <div class="h-full bg-gradient-to-r from-brand-500 to-brand-700 rounded-full transition-all duration-500"
              :style="{ width: completion + '%' }"/>
          </div>
        </div>
      </div>
    </div>

    <div class="flex flex-col lg:flex-row gap-4">

      <!-- Left Card — Avatar & Info -->
      <div class="lg:w-64 flex-shrink-0 bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
        <!-- Cover -->
        <div class="h-24 bg-gradient-to-br from-brand-200 to-purple-200"></div>
        <!-- Avatar -->
        <div class="flex flex-col items-center px-5 pb-5">
          <div class="relative -mt-10 mb-3">
            <div class="w-20 h-20 rounded-full bg-gradient-to-br from-brand-500 to-brand-700 flex items-center justify-center text-white text-2xl font-bold border-4 border-white shadow">
              {{ avatarInitial }}
            </div>
            <button class="absolute -bottom-1 -right-1 w-7 h-7 rounded-full bg-white border border-gray-200 shadow-sm flex items-center justify-center hover:bg-gray-50 transition-colors">
              <svg class="w-3.5 h-3.5 text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="1.8">
                <path stroke-linecap="round" stroke-linejoin="round" d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9zm9 3a3.5 3.5 0 100 7 3.5 3.5 0 000-7z"/>
              </svg>
            </button>
          </div>
          <p class="text-sm font-bold text-gray-900">{{ profile.name }}</p>
          <p class="text-xs font-medium text-brand-500 mb-4">{{ profile.role }}</p>

          <!-- Info List -->
          <div class="w-full space-y-3 border-t border-gray-100 pt-4">
            <div v-for="info in infoList" :key="info.label" class="flex items-center gap-3">
              <div class="w-8 h-8 rounded-lg bg-brand-50 flex items-center justify-center flex-shrink-0">
                <component :is="info.icon" class="w-4 h-4 text-brand-500" />
              </div>
              <div class="min-w-0">
                <p class="text-[10px] text-gray-400">{{ info.label }}</p>
                <p class="text-xs font-semibold text-gray-700 truncate">{{ info.value }}</p>
              </div>
            </div>
          </div>

          <!-- Change Password -->
          <button type="button"
            class="mt-5 w-full flex items-center justify-center gap-2 py-2.5 rounded-xl border border-brand-200 text-xs font-semibold text-brand-600 hover:bg-brand-50 transition-colors">
            <svg class="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
              <path stroke-linecap="round" stroke-linejoin="round" d="M12 11c0-1.105.895-2 2-2s2 .895 2 2-.895 2-2 2-2-.895-2-2zm0 0V7a4 4 0 118 0v4m-9 8h10a2 2 0 002-2v-6a2 2 0 00-2-2H7a2 2 0 00-2 2v6a2 2 0 002 2z"/>
            </svg>
            Change Password
          </button>
        </div>
      </div>

      <!-- Right Card — Personal Information Form -->
      <div class="flex-1 min-w-0 bg-white rounded-2xl shadow-sm border border-gray-100 p-5 lg:p-6">
        <!-- Section Header -->
        <div class="flex items-center gap-3 mb-6 pb-5 border-b border-gray-100">
          <div class="w-9 h-9 rounded-xl bg-brand-50 flex items-center justify-center flex-shrink-0">
            <svg class="w-4.5 h-4.5 text-brand-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="1.8">
              <path stroke-linecap="round" stroke-linejoin="round" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"/>
            </svg>
          </div>
          <div>
            <p class="text-sm font-bold text-gray-900">Personal Information</p>
            <p class="text-xs text-gray-400">Update your personal details</p>
          </div>
        </div>

        <!-- Form Grid -->
        <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <!-- Full Name -->
          <div>
            <label class="block text-xs font-semibold text-gray-700 mb-1.5">Full Name <span class="text-red-400">*</span></label>
            <input v-model="profile.name" type="text"
              class="w-full border border-gray-200 rounded-xl px-3 py-2.5 text-xs text-gray-800 outline-none focus:border-brand-400 transition-colors"/>
          </div>
          <!-- Username -->
          <div>
            <label class="block text-xs font-semibold text-gray-700 mb-1.5">Username <span class="text-red-400">*</span></label>
            <input v-model="profile.username" type="text"
              class="w-full border border-gray-200 rounded-xl px-3 py-2.5 text-xs text-gray-800 outline-none focus:border-brand-400 transition-colors"/>
            <p class="text-[10px] text-gray-400 mt-1">This will be your unique identifier</p>
          </div>
          <!-- Email -->
          <div>
            <label class="block text-xs font-semibold text-gray-700 mb-1.5">Email Address <span class="text-red-400">*</span></label>
            <input v-model="profile.email" type="email"
              class="w-full border border-gray-200 rounded-xl px-3 py-2.5 text-xs text-gray-800 outline-none focus:border-brand-400 transition-colors"/>
          </div>
          <!-- Phone -->
          <div>
            <label class="block text-xs font-semibold text-gray-700 mb-1.5">Phone Number <span class="text-red-400">*</span></label>
            <div class="flex gap-2">
              <div class="flex items-center gap-1.5 border border-gray-200 rounded-xl px-2.5 py-2.5 bg-white flex-shrink-0">
                <span class="text-base leading-none">🇮🇩</span>
                <svg class="w-3 h-3 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"/></svg>
              </div>
              <input v-model="profile.phone" type="text"
                class="flex-1 border border-gray-200 rounded-xl px-3 py-2.5 text-xs text-gray-800 outline-none focus:border-brand-400 transition-colors"/>
            </div>
          </div>
          <!-- Role -->
          <div>
            <label class="block text-xs font-semibold text-gray-700 mb-1.5">Role</label>
            <select v-model="profile.role"
              class="w-full border border-gray-200 rounded-xl px-3 py-2.5 text-xs text-gray-800 outline-none focus:border-brand-400 transition-colors">
              <option>Administrator</option>
              <option>Editor</option>
              <option>Viewer</option>
            </select>
          </div>
          <!-- Timezone -->
          <div>
            <label class="block text-xs font-semibold text-gray-700 mb-1.5">Timezone <span class="text-red-400">*</span></label>
            <select v-model="profile.timezone"
              class="w-full border border-gray-200 rounded-xl px-3 py-2.5 text-xs text-gray-800 outline-none focus:border-brand-400 transition-colors">
              <option>Asia/Jakarta (GMT+7)</option>
              <option>Asia/Singapore (GMT+8)</option>
              <option>Asia/Tokyo (GMT+9)</option>
              <option>Europe/London (GMT+0)</option>
              <option>America/New_York (GMT-5)</option>
            </select>
            <p class="text-[10px] text-gray-400 mt-1">Set your timecone for the system</p>
          </div>
          <!-- Date of Birth -->
          <div>
            <label class="block text-xs font-semibold text-gray-700 mb-1.5">Date of Birth</label>
            <div class="relative">
              <input v-model="profile.dob" type="date"
                class="w-full border border-gray-200 rounded-xl px-3 py-2.5 text-xs text-gray-800 outline-none focus:border-brand-400 transition-colors"/>
            </div>
          </div>
          <!-- Language -->
          <div>
            <label class="block text-xs font-semibold text-gray-700 mb-1.5">Language</label>
            <select v-model="profile.language"
              class="w-full border border-gray-200 rounded-xl px-3 py-2.5 text-xs text-gray-800 outline-none focus:border-brand-400 transition-colors">
              <option>English</option>
              <option>Bahasa Indonesia</option>
              <option>Japanese</option>
              <option>Chinese</option>
            </select>
          </div>
          <!-- Bio — full width -->
          <div class="sm:col-span-2">
            <label class="block text-xs font-semibold text-gray-700 mb-1.5">Bio</label>
            <div class="relative">
              <textarea v-model="profile.bio" rows="3" maxlength="160" placeholder="Tell us about yourself..."
                class="w-full border border-gray-200 rounded-xl px-3 py-2.5 text-xs text-gray-800 outline-none focus:border-brand-400 transition-colors resize-none"/>
              <span class="absolute bottom-2.5 right-3 text-[10px] text-gray-400">{{ profile.bio.length }} / 160</span>
            </div>
          </div>
        </div>

        <!-- Footer Actions -->
        <div class="flex items-center justify-end gap-3 mt-6 pt-5 border-t border-gray-100">
          <button type="button" @click="resetProfile"
            class="px-5 py-2.5 rounded-xl border border-gray-200 text-xs font-semibold text-gray-600 hover:bg-gray-50 transition-colors">
            Cancel
          </button>
          <button type="button" @click="saveProfile"
            class="px-5 py-2.5 rounded-xl bg-gradient-to-r from-brand-500 to-brand-700 text-white text-xs font-semibold hover:opacity-90 transition-opacity flex items-center gap-2">
            <Transition enter-active-class="transition-opacity duration-150" enter-from-class="opacity-0" enter-to-class="opacity-100"
              leave-active-class="transition-opacity duration-150" leave-from-class="opacity-100" leave-to-class="opacity-0">
              <svg v-if="savedAt" class="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2.5">
                <path stroke-linecap="round" stroke-linejoin="round" d="M5 13l4 4L19 7"/>
              </svg>
            </Transition>
            {{ savedAt ? 'Saved!' : 'Save Changes' }}
          </button>
        </div>
      </div>

    </div>
  </main>
</template>

<script setup>
import { h, ref, computed } from 'vue'

const icon = (d) => ({
  render: () => h('svg', { fill: 'none', viewBox: '0 0 24 24', stroke: 'currentColor', 'stroke-width': '1.8' },
    [h('path', { 'stroke-linecap': 'round', 'stroke-linejoin': 'round', d })])
})

const profile = ref({
  name:     'Fajar',
  username: 'fajar.admin',
  email:    'fajar@example.com',
  phone:    '+62 812 3456 7890',
  role:     'Administrator',
  timezone: 'Asia/Jakarta (GMT+7)',
  dob:      '',
  language: 'English',
  bio:      '',
  memberSince: 'May 20, 2024',
  lastUpdated: 'May 20, 2024 14:30',
})

const original     = JSON.parse(JSON.stringify(profile.value))
const savedAt      = ref(null)
const avatarInitial = computed(() => (profile.value.name || '?').trim().charAt(0).toUpperCase())

// Profile completion: count filled fields
const completion = computed(() => {
  const fields = ['name', 'username', 'email', 'phone', 'role', 'timezone', 'dob', 'language', 'bio']
  const filled = fields.filter(k => !!profile.value[k]).length
  return Math.round((filled / fields.length) * 100)
})

const infoList = computed(() => [
  { label: 'Email',        value: profile.value.email,       icon: icon('M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z') },
  { label: 'Phone',        value: profile.value.phone,       icon: icon('M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z') },
  { label: 'Timezone',     value: profile.value.timezone,    icon: icon('M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9') },
  { label: 'Member Since', value: profile.value.memberSince, icon: icon('M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z') },
  { label: 'Last Updated', value: profile.value.lastUpdated, icon: icon('M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z') },
])

function saveProfile() {
  profile.value.lastUpdated = new Date().toLocaleString('id-ID', { day: '2-digit', month: 'short', year: 'numeric', hour: '2-digit', minute: '2-digit' })
  savedAt.value = new Date()
  setTimeout(() => { savedAt.value = null }, 3000)
}

function resetProfile() {
  Object.assign(profile.value, original)
}
</script>