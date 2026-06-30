<template>
  <div class="min-h-screen flex">

    <!-- Kiri: Brand Panel -->
    <div class="hidden lg:flex lg:w-5/12 xl:w-1/2 relative flex-col items-center justify-center overflow-hidden"
      style="background: linear-gradient(135deg, #5b4fcf 0%, #7c6af5 50%, #6366f1 100%);">

      <!-- Decorative circles -->
      <div class="absolute -top-20 -left-20 w-72 h-72 rounded-full" style="background: rgba(255,255,255,0.08)"></div>
      <div class="absolute -bottom-16 -right-16 w-64 h-64 rounded-full" style="background: rgba(255,255,255,0.06)"></div>
      <div class="absolute top-1/3 -right-8 w-40 h-40 rounded-full" style="background: rgba(255,255,255,0.05)"></div>

      <!-- Stars -->
      <div class="absolute top-16 right-24 text-white opacity-40 text-xl">✦</div>
      <div class="absolute top-1/3 left-12 text-white opacity-30 text-sm">✦</div>
      <div class="absolute bottom-32 right-16 text-white opacity-40 text-sm">✦</div>
      <div class="absolute bottom-16 left-20 text-white opacity-25 text-xs">✦</div>

      <div class="relative z-10 px-10 w-full max-w-md">
        <!-- Logo -->
        <div class="flex items-center gap-2.5 mb-12">
          <div class="w-9 h-9 rounded-xl bg-white/20 flex items-center justify-center">
            <svg class="w-5 h-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2.5">
              <path stroke-linecap="round" stroke-linejoin="round" d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6"/>
            </svg>
          </div>
          <div>
            <p class="font-bold text-white text-sm leading-none">Admira</p>
            <p class="text-white/60 text-[10px] tracking-wider mt-0.5">ADMIN PANEL</p>
          </div>
        </div>

        <!-- Headline -->
        <h1 class="text-3xl font-bold text-white leading-tight mb-3">Reset Your Password</h1>
        <p class="text-white/70 text-sm mb-12">We'll help you get back to your account</p>

        <!-- Lock illustration -->
        <div class="flex justify-center mb-12">
          <div class="relative w-52 h-52 flex items-center justify-center">
            <!-- Glow background -->
            <div class="absolute w-40 h-40 rounded-full" style="background: rgba(255,255,255,0.08); filter: blur(20px);"></div>

            <!-- Shield shape -->
            <div class="relative z-10">
              <div class="w-36 h-40 flex items-center justify-center relative">
                <!-- Shield SVG -->
                <svg viewBox="0 0 120 140" class="w-36 h-40 drop-shadow-2xl">
                  <defs>
                    <linearGradient id="shieldGrad" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="0%" stop-color="rgba(255,255,255,0.35)"/>
                      <stop offset="100%" stop-color="rgba(255,255,255,0.12)"/>
                    </linearGradient>
                  </defs>
                  <path d="M60 5 L110 25 L110 70 Q110 115 60 135 Q10 115 10 70 L10 25 Z"
                    fill="url(#shieldGrad)" stroke="rgba(255,255,255,0.3)" stroke-width="2"/>
                </svg>

                <!-- Lock icon inside shield -->
                <div class="absolute inset-0 flex items-center justify-center">
                  <svg class="w-14 h-14 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5"
                      d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"/>
                  </svg>
                </div>

                <!-- Check badge -->
                <div class="absolute -bottom-2 -right-2 w-10 h-10 rounded-full bg-green-400 border-4 border-white/30 flex items-center justify-center shadow-lg">
                  <svg class="w-5 h-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M5 13l4 4L19 7"/>
                  </svg>
                </div>
              </div>
            </div>

            <!-- Star decorations around illustration -->
            <div class="absolute top-4 left-8 text-white/50 text-lg">✦</div>
            <div class="absolute top-8 right-6 text-white/30 text-sm">✦</div>
            <div class="absolute bottom-6 left-6 text-white/40 text-xs">✦</div>
          </div>
        </div>

        <!-- Footer -->
        <p class="text-white/30 text-[10px] text-center">© 2024 Admira. All rights reserved. Created By: FajarDev</p>
      </div>
    </div>

    <!-- Kanan: Form -->
    <div class="flex-1 flex flex-col items-center justify-center px-6 py-12 bg-white">

      <!-- Mobile logo -->
      <div class="lg:hidden flex items-center gap-2 mb-8">
        <div class="w-8 h-8 rounded-xl bg-gradient-to-br from-brand-500 to-brand-700 flex items-center justify-center">
          <svg class="w-4 h-4 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2.5">
            <path stroke-linecap="round" stroke-linejoin="round" d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6"/>
          </svg>
        </div>
        <p class="font-bold text-gray-900">Admira</p>
      </div>

      <div class="w-full max-w-sm">

        <!-- Step 1: Input email -->
        <Transition
          enter-active-class="transition-all duration-300 ease-out"
          enter-from-class="opacity-0 translate-x-4"
          enter-to-class="opacity-100 translate-x-0"
          leave-active-class="transition-all duration-200 ease-in"
          leave-from-class="opacity-100 translate-x-0"
          leave-to-class="opacity-0 -translate-x-4"
          mode="out-in"
        >
          <!-- Form step -->
          <div v-if="!sent" key="form">
            <div class="mb-8">
              <h2 class="text-2xl font-bold text-gray-900">Forgot Password?</h2>
              <p class="text-sm text-gray-400 mt-1">Enter your email address and we'll send you a link to reset your password</p>
            </div>

            <div class="space-y-4">

              <!-- Email -->
              <div>
                <label class="block text-xs font-semibold text-gray-700 mb-1.5">Email Address</label>
                <div class="relative">
                  <input v-model="email" type="email" placeholder="you@example.com"
                    @keyup.enter="submit"
                    class="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 text-sm text-gray-800 outline-none focus:border-brand-400 focus:bg-white transition-colors pr-10"/>
                  <svg class="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-300"
                    fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"/>
                  </svg>
                </div>
              </div>

              <!-- Submit -->
              <button @click="submit" :disabled="!email || loading"
                :class="['w-full py-3 rounded-xl text-white text-sm font-bold transition-all mt-2',
                  email && !loading
                    ? 'bg-gradient-to-r from-brand-500 to-brand-700 hover:opacity-90 shadow-lg shadow-brand-200'
                    : 'bg-gray-200 cursor-not-allowed']">
                <span v-if="loading" class="flex items-center justify-center gap-2">
                  <svg class="w-4 h-4 animate-spin" fill="none" viewBox="0 0 24 24">
                    <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"/>
                    <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"/>
                  </svg>
                  Sending...
                </span>
                <span v-else>Send Reset Link</span>
              </button>

              <!-- Info note -->
              <div class="flex items-start gap-2.5 p-3.5 bg-blue-50 border border-blue-100 rounded-xl">
                <svg class="w-4 h-4 text-blue-400 flex-shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"/>
                </svg>
                <p class="text-[11px] text-blue-600 leading-relaxed">
                  If you don't receive the email, please check your spam folder.
                </p>
              </div>

              <!-- Back to sign in -->
              <button @click="router.push('/login')"
                class="w-full text-center text-xs font-semibold text-brand-500 hover:text-brand-700 transition-colors py-2">
                ← Back to Sign In
              </button>
            </div>
          </div>

          <!-- Success step -->
          <div v-else key="success" class="text-center">
            <!-- Success icon -->
            <div class="w-20 h-20 rounded-full bg-green-50 border-4 border-green-100 flex items-center justify-center mx-auto mb-6">
              <svg class="w-10 h-10 text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"/>
              </svg>
            </div>

            <h2 class="text-2xl font-bold text-gray-900 mb-2">Check your email</h2>
            <p class="text-sm text-gray-400 mb-2">We've sent a password reset link to</p>
            <p class="text-sm font-semibold text-brand-600 mb-8">{{ email }}</p>

            <!-- Resend -->
            <p class="text-xs text-gray-400 mb-6">
              Didn't receive it?
              <button @click="sent = false" class="text-brand-500 font-semibold hover:text-brand-700 transition-colors ml-1">
                Resend email
              </button>
            </p>

            <!-- Back to login -->
            <button @click="router.push('/login')"
              class="w-full py-3 rounded-xl bg-gradient-to-r from-brand-500 to-brand-700 text-white text-sm font-bold hover:opacity-90 transition-opacity">
              Back to Sign In
            </button>
          </div>
        </Transition>

      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'

const router  = useRouter()
const email   = ref('')
const loading = ref(false)
const sent    = ref(false)

function submit() {
  if (!email.value) return
  loading.value = true
  setTimeout(() => {
    loading.value = false
    sent.value = true
  }, 1200)
}
</script>