<template>
  <div class="space-y-4">
    <div class="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
      <div class="flex items-center justify-between mb-0.5">
        <h2 class="font-bold text-base text-gray-900">API Keys</h2>
        <button @click="showCreate = true"
          class="flex items-center gap-1.5 px-4 py-2 rounded-xl bg-gradient-to-r from-brand-500 to-brand-700 text-white text-xs font-semibold hover:opacity-90 transition-opacity">
          <svg class="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4"/>
          </svg>
          Generate Key
        </button>
      </div>
      <p class="text-xs text-gray-400 mb-6">Manage API keys for third-party access</p>

      <!-- Warning -->
      <div class="flex items-start gap-3 p-3.5 bg-yellow-50 border border-yellow-100 rounded-xl mb-5">
        <svg class="w-4 h-4 text-yellow-500 flex-shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"/>
        </svg>
        <p class="text-[11px] text-yellow-700 leading-relaxed">
          Keep your API keys secret. Never share them publicly or expose them in client-side code.
        </p>
      </div>

      <!-- Keys List -->
      <div class="space-y-3">
        <div v-for="key in apiKeys" :key="key.id"
          class="p-4 rounded-xl border border-gray-100 bg-gray-50">
          <div class="flex items-start justify-between mb-2">
            <div>
              <p class="text-xs font-bold text-gray-800">{{ key.name }}</p>
              <p class="text-[10px] text-gray-400 mt-0.5">Created {{ key.created }} · Last used {{ key.lastUsed }}</p>
            </div>
            <div class="flex items-center gap-2">
              <span :class="['text-[10px] font-semibold px-2 py-0.5 rounded-full',
                key.active ? 'bg-green-50 text-green-600' : 'bg-gray-100 text-gray-400']">
                {{ key.active ? 'Active' : 'Inactive' }}
              </span>
              <button @click="deleteKey(key.id)"
                class="w-7 h-7 rounded-lg bg-red-50 flex items-center justify-center hover:bg-red-100 transition-colors">
                <svg class="w-3.5 h-3.5 text-red-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"/>
                </svg>
              </button>
            </div>
          </div>
          <!-- Key value -->
          <div class="flex items-center gap-2 bg-white border border-gray-200 rounded-lg px-3 py-2">
            <code class="text-[11px] text-gray-600 flex-1 font-mono truncate">
              {{ key.visible ? key.value : key.masked }}
            </code>
            <button @click="key.visible = !key.visible"
              class="flex-shrink-0 text-gray-400 hover:text-gray-600 transition-colors">
              <svg class="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                  :d="key.visible ? 'M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21' : 'M15 12a3 3 0 11-6 0 3 3 0 016 0z M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z'"/>
              </svg>
            </button>
            <button @click="copy(key.value)"
              class="flex-shrink-0 text-gray-400 hover:text-brand-500 transition-colors">
              <svg class="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z"/>
              </svg>
            </button>
          </div>
        </div>
      </div>
    </div>

    <!-- Create Key Modal -->
    <Transition enter-active-class="transition-all duration-200 ease-out" enter-from-class="opacity-0" enter-to-class="opacity-100"
      leave-active-class="transition-all duration-150" leave-from-class="opacity-100" leave-to-class="opacity-0">
      <div v-if="showCreate" class="fixed inset-0 z-50 flex items-center justify-center p-4">
        <div class="absolute inset-0 bg-black/30 backdrop-blur-sm" @click="showCreate = false"></div>
        <div class="relative bg-white rounded-2xl shadow-2xl w-full max-w-sm p-6">
          <p class="font-bold text-gray-900 mb-4">Generate New API Key</p>
          <label class="block text-xs font-semibold text-gray-700 mb-1.5">Key Name</label>
          <input v-model="newKeyName" type="text" placeholder="e.g. Production Key"
            class="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-2.5 text-sm text-gray-800 outline-none focus:border-brand-400 focus:bg-white transition-colors mb-5"/>
          <div class="flex gap-2">
            <button @click="showCreate = false"
              class="flex-1 py-2.5 rounded-xl border border-gray-200 text-xs font-semibold text-gray-600 hover:bg-gray-50 transition-colors">Cancel</button>
            <button @click="generateKey"
              class="flex-1 py-2.5 rounded-xl bg-gradient-to-r from-brand-500 to-brand-700 text-white text-xs font-semibold hover:opacity-90 transition-opacity">Generate</button>
          </div>
        </div>
      </div>
    </Transition>
  </div>
</template>

<script setup>
import { ref } from 'vue'

const showCreate = ref(false)
const newKeyName = ref('')

const apiKeys = ref([
  { id: 1, name: 'Production Key', value: 'adm_live_k8x2mPqR7vNjLsW4tYbCfUoGhEiAdZ9', masked: 'adm_live_k8x2••••••••••••••••••••••••••••', created: 'Jun 1, 2026', lastUsed: '2 hours ago', active: true, visible: false },
  { id: 2, name: 'Development Key', value: 'adm_test_p3nQwSjK6cBxUmL8yVoRtFhDaGiZe1', masked: 'adm_test_p3nQ••••••••••••••••••••••••••••', created: 'May 15, 2026', lastUsed: 'Yesterday', active: true, visible: false },
])

function copy(val) { navigator.clipboard?.writeText(val) }

function generateKey() {
  if (!newKeyName.value.trim()) return
  const rand = Math.random().toString(36).slice(2, 34)
  apiKeys.value.push({
    id: Date.now(), name: newKeyName.value,
    value: `adm_live_${rand}`,
    masked: `adm_live_${rand.slice(0,4)}${'•'.repeat(28)}`,
    created: 'Just now', lastUsed: 'Never', active: true, visible: false,
  })
  newKeyName.value = ''
  showCreate.value = false
}

function deleteKey(id) { apiKeys.value = apiKeys.value.filter(k => k.id !== id) }
</script>