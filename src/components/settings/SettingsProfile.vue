<template>
  <div class="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
    <div class="mb-6">
      <h2 class="font-bold text-base text-gray-900">Profile Information</h2>
      <p class="text-xs text-gray-400 mt-0.5">Update your personal information</p>
    </div>

    <div class="flex flex-col lg:flex-row gap-8">

      <!-- Form -->
      <div class="flex-1 space-y-5">
        <!-- Full Name -->
        <div>
          <label class="block text-xs font-semibold text-gray-700 mb-1.5">Full Name</label>
          <input v-model="form.name" type="text"
            class="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-2.5 text-sm text-gray-800 outline-none focus:border-brand-400 focus:bg-white transition-colors"/>
        </div>

        <!-- Email -->
        <div>
          <label class="block text-xs font-semibold text-gray-700 mb-1.5">Email Address</label>
          <input v-model="form.email" type="email"
            class="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-2.5 text-sm text-gray-800 outline-none focus:border-brand-400 focus:bg-white transition-colors"/>
        </div>

        <!-- Phone -->
        <div>
          <label class="block text-xs font-semibold text-gray-700 mb-1.5">Phone Number</label>
          <input v-model="form.phone" type="tel"
            class="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-2.5 text-sm text-gray-800 outline-none focus:border-brand-400 focus:bg-white transition-colors"/>
        </div>

        <!-- Role -->
        <div>
          <label class="block text-xs font-semibold text-gray-700 mb-1.5">Role</label>
          <div class="relative">
            <select v-model="form.role"
              class="w-full appearance-none bg-gray-50 border border-gray-200 rounded-xl px-4 py-2.5 text-sm text-gray-800 outline-none focus:border-brand-400 focus:bg-white transition-colors pr-10">
              <option>Administrator</option>
              <option>Manager</option>
              <option>Staff</option>
            </select>
            <svg class="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none"
              fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"/>
            </svg>
          </div>
        </div>

        <hr class="border-gray-100"/>

        <!-- Timezone -->
        <div>
          <label class="block text-xs font-semibold text-gray-700 mb-0.5">Timezone</label>
          <p class="text-[11px] text-brand-500 mb-1.5">Set your timezone for the system</p>
          <div class="relative">
            <select v-model="form.timezone"
              class="w-full appearance-none bg-gray-50 border border-gray-200 rounded-xl px-4 py-2.5 text-sm text-gray-800 outline-none focus:border-brand-400 focus:bg-white transition-colors pr-10">
              <option>Asia/Jakarta (GMT+7)</option>
              <option>Asia/Singapore (GMT+8)</option>
              <option>Asia/Tokyo (GMT+9)</option>
              <option>America/New_York (GMT-5)</option>
              <option>Europe/London (GMT+0)</option>
            </select>
            <svg class="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none"
              fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"/>
            </svg>
          </div>
        </div>
      </div>

      <!-- Avatar -->
      <div class="flex flex-col items-center gap-3 flex-shrink-0">
        <div class="relative">
          <div class="w-24 h-24 rounded-full bg-gradient-to-br from-brand-500 to-brand-700 flex items-center justify-center text-white text-3xl font-bold shadow-lg select-none">
            {{ form.name[0] }}
          </div>
          <button class="absolute bottom-0 right-0 w-8 h-8 rounded-full bg-gray-700 border-2 border-white flex items-center justify-center hover:bg-gray-800 transition-colors">
            <svg class="w-4 h-4 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z"/>
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 13a3 3 0 11-6 0 3 3 0 016 0z"/>
            </svg>
          </button>
        </div>
        <p class="text-[10px] text-gray-400 text-center">JPG, GIF or PNG.<br>Max size of 2MB</p>
        <button class="text-xs font-semibold text-gray-700 border border-gray-200 px-4 py-2 rounded-xl hover:bg-gray-50 transition-colors">
          Change Photo
        </button>
      </div>
    </div>

    <!-- Save -->
    <div class="flex justify-end mt-8">
      <button
        @click="saved = true; setTimeout(() => saved = false, 2000)"
        class="flex items-center gap-2 px-6 py-2.5 rounded-xl bg-gradient-to-r from-brand-500 to-brand-700 text-white text-sm font-semibold hover:opacity-90 transition-opacity">
        <svg v-if="saved" class="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M5 13l4 4L19 7"/>
        </svg>
        {{ saved ? 'Saved!' : 'Save Changes' }}
      </button>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
const saved = ref(false)
const form = ref({
  name: 'Fajar',
  email: 'fajar@example.com',
  phone: '+62 812 3456 7890',
  role: 'Administrator',
  timezone: 'Asia/Jakarta (GMT+7)',
})
</script>