<template>
  <main class="flex-1 overflow-y-auto px-4 lg:px-8 py-6">
    <div class="mb-6">
      <h1 class="text-lg font-bold text-gray-900">Help & Support</h1>
      <p class="text-xs text-gray-400 mt-0.5">Find answers or get in touch with us</p>
    </div>

    <!-- Search -->
    <div class="bg-gradient-to-r from-brand-500 to-brand-700 rounded-2xl p-6 mb-6">
      <p class="text-white font-bold text-base mb-1">How can we help you?</p>
      <p class="text-brand-100 text-xs mb-4">Search our knowledge base for quick answers</p>
      <div class="flex items-center gap-2 bg-white rounded-xl px-3 py-2.5">
        <svg class="w-4 h-4 text-gray-400 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"/>
        </svg>
        <input v-model="search" type="text" placeholder="Search for help articles..."
          class="flex-1 text-xs text-gray-700 placeholder-gray-400 outline-none bg-transparent"/>
      </div>
    </div>

    <!-- Quick Links -->
    <div class="grid grid-cols-2 lg:grid-cols-4 gap-3 mb-6">
      <div v-for="item in quickLinks" :key="item.label"
        class="bg-white rounded-2xl p-4 shadow-sm border border-gray-100 flex flex-col items-center text-center gap-2 cursor-pointer hover:shadow-md transition-shadow">
        <div :class="['w-10 h-10 rounded-xl flex items-center justify-center', item.iconBg]">
          <component :is="item.icon" :class="['w-5 h-5', item.iconColor]" />
        </div>
        <p class="text-xs font-semibold text-gray-800">{{ item.label }}</p>
        <p class="text-[10px] text-gray-400 leading-relaxed">{{ item.desc }}</p>
      </div>
    </div>

    <div class="grid grid-cols-1 lg:grid-cols-3 gap-4">

      <!-- FAQ -->
      <div class="lg:col-span-2 bg-white rounded-2xl shadow-sm border border-gray-100 p-5">
        <h2 class="text-sm font-bold text-gray-900 mb-4">Frequently Asked Questions</h2>
        <div class="space-y-2">
          <div v-for="(faq, i) in filteredFaqs" :key="i"
            class="border border-gray-100 rounded-xl overflow-hidden">
            <button @click="toggleFaq(i)"
              class="w-full flex items-center justify-between px-4 py-3 text-left hover:bg-gray-50 transition-colors">
              <span class="text-xs font-semibold text-gray-800 pr-4">{{ faq.q }}</span>
              <svg :class="['w-4 h-4 text-gray-400 flex-shrink-0 transition-transform duration-200', openFaq === i ? 'rotate-180' : '']"
                fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"/>
              </svg>
            </button>
            <Transition
              enter-active-class="transition-all duration-200 ease-out"
              enter-from-class="opacity-0 max-h-0"
              enter-to-class="opacity-100 max-h-40"
              leave-active-class="transition-all duration-150 ease-in"
              leave-from-class="opacity-100 max-h-40"
              leave-to-class="opacity-0 max-h-0"
            >
              <div v-if="openFaq === i" class="px-4 pb-3">
                <p class="text-xs text-gray-500 leading-relaxed">{{ faq.a }}</p>
              </div>
            </Transition>
          </div>
          <p v-if="filteredFaqs.length === 0" class="text-center text-sm text-gray-400 py-8">
            No results found for "{{ search }}"
          </p>
        </div>
      </div>

      <!-- Contact & Status -->
      <div class="space-y-4">

        <!-- Contact Us -->
        <div class="bg-white rounded-2xl shadow-sm border border-gray-100 p-5">
          <h2 class="text-sm font-bold text-gray-900 mb-4">Contact Us</h2>
          <div class="space-y-3">
            <div v-for="contact in contacts" :key="contact.label"
              class="flex items-center gap-3 p-3 rounded-xl bg-gray-50 border border-gray-100">
              <div :class="['w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0', contact.iconBg]">
                <component :is="contact.icon" :class="['w-4 h-4', contact.iconColor]" />
              </div>
              <div class="min-w-0">
                <p class="text-[11px] font-semibold text-gray-700">{{ contact.label }}</p>
                <p class="text-[10px] text-gray-400 truncate">{{ contact.value }}</p>
              </div>
            </div>
          </div>
        </div>

        <!-- Send Message -->
        <div class="bg-white rounded-2xl shadow-sm border border-gray-100 p-5">
          <h2 class="text-sm font-bold text-gray-900 mb-4">Send a Message</h2>
          <div class="space-y-3">
            <input v-model="msgForm.subject" type="text" placeholder="Subject"
              class="w-full bg-gray-50 border border-gray-100 rounded-xl px-3 py-2.5 text-xs text-gray-800 outline-none focus:border-brand-300 focus:bg-white transition-colors"/>
            <textarea v-model="msgForm.message" rows="3" placeholder="Describe your issue..."
              class="w-full bg-gray-50 border border-gray-100 rounded-xl px-3 py-2.5 text-xs text-gray-800 outline-none focus:border-brand-300 focus:bg-white transition-colors resize-none"/>
            <button type="button" @click="sendMessage"
              class="w-full py-2.5 rounded-xl bg-gradient-to-r from-brand-500 to-brand-700 text-white text-xs font-semibold hover:opacity-90 transition-opacity">
              Send Message
            </button>
            <Transition enter-active-class="transition-opacity duration-200" enter-from-class="opacity-0" enter-to-class="opacity-100"
              leave-active-class="transition-opacity duration-200" leave-from-class="opacity-100" leave-to-class="opacity-0">
              <p v-if="msgSent" class="text-[11px] text-green-600 font-medium text-center">Message sent ✓ We'll get back to you soon.</p>
            </Transition>
          </div>
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

// ── Quick links ──────────────────────────────────────────────────────────────
const quickLinks = [
  { label: 'Documentation', desc: 'Browse guides and API references', icon: icon('M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253'), iconBg: 'bg-blue-50',   iconColor: 'text-blue-500'   },
  { label: 'Video Tutorials', desc: 'Watch step-by-step tutorials',   icon: icon('M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z M21 12a9 9 0 11-18 0 9 9 0 0118 0z'),                                             iconBg: 'bg-pink-50',   iconColor: 'text-pink-500'   },
  { label: 'Community',      desc: 'Join our community forum',        icon: icon('M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0z'), iconBg: 'bg-green-50',  iconColor: 'text-green-500'  },
  { label: 'Changelog',      desc: 'See what\'s new in each update',  icon: icon('M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 7h.01M9 16h.01'),                                  iconBg: 'bg-amber-50',  iconColor: 'text-amber-500'  },
]

// ── Contact channels ─────────────────────────────────────────────────────────
const contacts = [
  { label: 'Email Support', value: 'support@admira.io',   icon: icon('M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z'), iconBg: 'bg-brand-50', iconColor: 'text-brand-500' },
  { label: 'Live Chat',     value: 'Mon–Fri, 09.00–17.00', icon: icon('M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z'), iconBg: 'bg-green-50', iconColor: 'text-green-500' },
  { label: 'Phone',         value: '+62 21 1234 5678',    icon: icon('M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z'), iconBg: 'bg-purple-50', iconColor: 'text-purple-500' },
]

// ── FAQ ──────────────────────────────────────────────────────────────────────
const faqs = [
  { q: 'How do I reset my password?',             a: 'Go to the login page and click "Forgot Password". Enter your email address and we will send you a reset link.' },
  { q: 'How do I add a new product?',             a: 'Navigate to the Products page and click the "Add Product" button in the top right corner. Fill in the required fields and click Save.' },
  { q: 'Can I export my order data?',             a: 'Yes, go to the Orders page and click the Export button. You can download your order data as a CSV or Excel file.' },
  { q: 'How do I invite team members?',           a: 'Go to Settings > Team and click "Invite Member". Enter their email address and select a role, then send the invitation.' },
  { q: 'What payment methods are supported?',     a: 'We support major credit cards (Visa, Mastercard), bank transfers, and local payment methods including GoPay and OVO.' },
  { q: 'How do I change my billing plan?',        a: 'Go to Settings > Billing and click "Change Plan". Select the plan that suits your needs and confirm the change.' },
  { q: 'Is my data backed up automatically?',     a: 'Yes, all data is automatically backed up every 24 hours. You can also trigger a manual backup from Settings > Security.' },
]

const search       = ref('')
const openFaq      = ref(null)
const filteredFaqs = computed(() =>
  faqs.filter(f =>
    !search.value ||
    f.q.toLowerCase().includes(search.value.toLowerCase()) ||
    f.a.toLowerCase().includes(search.value.toLowerCase())
  )
)

function toggleFaq(i) {
  openFaq.value = openFaq.value === i ? null : i
}

// ── Send message ─────────────────────────────────────────────────────────────
const msgForm = ref({ subject: '', message: '' })
const msgSent = ref(false)

function sendMessage() {
  msgSent.value = true
  msgForm.value = { subject: '', message: '' }
  setTimeout(() => { msgSent.value = false }, 4000)
}
</script>