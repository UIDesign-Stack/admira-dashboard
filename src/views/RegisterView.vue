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
        <h1 class="text-3xl font-bold text-white leading-tight mb-3">Create Your Account</h1>
        <p class="text-white/70 text-sm mb-10">Join us and grow your business</p>

        <!-- Illustration placeholder -->
        <div class="flex justify-center mb-10">
          <div class="w-48 h-48 relative">
            <!-- Clipboard icon illustration -->
            <div class="absolute inset-0 flex items-center justify-center">
              <div class="relative">
                <div class="w-32 h-36 bg-white/20 rounded-2xl border border-white/30 flex flex-col items-center pt-4 gap-2">
                  <div class="w-16 h-2 bg-white/50 rounded-full"></div>
                  <div class="w-20 h-1.5 bg-white/30 rounded-full"></div>
                  <div class="w-20 h-1.5 bg-white/30 rounded-full"></div>
                  <div class="w-16 h-1.5 bg-white/30 rounded-full"></div>
                  <!-- Avatar circle -->
                  <div class="mt-2 w-12 h-12 rounded-full bg-white/30 border-2 border-white/40 flex items-center justify-center">
                    <svg class="w-7 h-7 text-white/70" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"/>
                    </svg>
                  </div>
                </div>
                <!-- Clip at top -->
                <div class="absolute -top-3 left-1/2 -translate-x-1/2 w-10 h-5 bg-white/30 rounded-full border border-white/40"></div>
              </div>
            </div>
          </div>
        </div>

        <!-- Feature list -->
        <div class="space-y-3.5">
          <div v-for="feat in features" :key="feat" class="flex items-center gap-3">
            <div class="w-5 h-5 rounded-full bg-white/20 flex items-center justify-center flex-shrink-0">
              <svg class="w-3 h-3 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M5 13l4 4L19 7"/>
              </svg>
            </div>
            <span class="text-white/80 text-xs">{{ feat }}</span>
          </div>
        </div>

        <!-- Footer -->
        <p class="text-white/30 text-[10px] mt-16">© 2026 Admira. All rights reserved. Created By: FajarDev</p>
      </div>
    </div>

    <!-- Kanan: Form -->
    <div class="flex-1 flex flex-col items-center justify-center px-6 py-12 bg-white overflow-y-auto">

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
        <!-- Heading -->
        <div class="mb-7">
          <h2 class="text-2xl font-bold text-gray-900">Create Account</h2>
          <p class="text-sm text-gray-400 mt-1">Fill in the details to get started</p>
        </div>

        <!-- Form -->
        <div class="space-y-4">

          <!-- Full Name -->
          <div>
            <label class="block text-xs font-semibold text-gray-700 mb-1.5">Full Name</label>
            <div class="relative">
              <input v-model="form.name" type="text" placeholder="Your full name"
                class="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 text-sm text-gray-800 outline-none focus:border-brand-400 focus:bg-white transition-colors pr-10"/>
              <svg class="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-300"
                fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"/>
              </svg>
            </div>
          </div>

          <!-- Email -->
          <div>
            <label class="block text-xs font-semibold text-gray-700 mb-1.5">Email Address</label>
            <div class="relative">
              <input v-model="form.email" type="email" placeholder="you@example.com"
                class="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 text-sm text-gray-800 outline-none focus:border-brand-400 focus:bg-white transition-colors pr-10"/>
              <svg class="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-300"
                fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"/>
              </svg>
            </div>
          </div>

          <!-- Password -->
          <div>
            <label class="block text-xs font-semibold text-gray-700 mb-1.5">Password</label>
            <div class="relative">
              <input v-model="form.password" :type="showPass ? 'text' : 'password'"
                placeholder="••••••••••"
                class="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 text-sm text-gray-800 outline-none focus:border-brand-400 focus:bg-white transition-colors pr-10"/>
              <button @click="showPass = !showPass"
                class="absolute right-3 top-1/2 -translate-y-1/2 text-gray-300 hover:text-gray-500 transition-colors">
                <svg class="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                    :d="showPass ? 'M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21' : 'M15 12a3 3 0 11-6 0 3 3 0 016 0z M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z'"/>
                </svg>
              </button>
            </div>
            <!-- Strength bar -->
            <div v-if="form.password" class="mt-2 flex items-center gap-2">
              <div class="flex gap-1 flex-1">
                <div v-for="i in 4" :key="i"
                  :class="['flex-1 h-1 rounded-full transition-colors duration-300',
                    i <= strength ? strengthColor : 'bg-gray-100']"></div>
              </div>
              <span :class="['text-[10px] font-semibold flex-shrink-0',
                strength <= 1 ? 'text-red-400' : strength <= 2 ? 'text-yellow-500' : strength <= 3 ? 'text-blue-500' : 'text-green-500']">
                {{ strengthLabel }}
              </span>
            </div>
          </div>

          <!-- Confirm Password -->
          <div>
            <label class="block text-xs font-semibold text-gray-700 mb-1.5">Confirm Password</label>
            <div class="relative">
              <input v-model="form.confirm" :type="showConfirm ? 'text' : 'password'"
                placeholder="••••••••••"
                :class="['w-full bg-gray-50 border rounded-xl px-4 py-3 text-sm text-gray-800 outline-none transition-colors pr-10',
                  form.confirm && form.confirm !== form.password
                    ? 'border-red-300 focus:border-red-400'
                    : 'border-gray-200 focus:border-brand-400 focus:bg-white']"/>
              <button @click="showConfirm = !showConfirm"
                class="absolute right-3 top-1/2 -translate-y-1/2 text-gray-300 hover:text-gray-500 transition-colors">
                <svg class="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                    :d="showConfirm ? 'M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21' : 'M15 12a3 3 0 11-6 0 3 3 0 016 0z M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z'"/>
                </svg>
              </button>
            </div>
            <p v-if="form.confirm && form.confirm !== form.password"
              class="text-[10px] text-red-400 mt-1">Passwords do not match</p>
          </div>

          <!-- Terms -->
          <label class="flex items-start gap-2.5 cursor-pointer">
            <input type="checkbox" v-model="form.agreed"
              class="mt-0.5 w-4 h-4 rounded border-gray-300 accent-brand-500 flex-shrink-0"/>
            <span class="text-xs text-gray-500 leading-relaxed">
              I agree to the
              <a href="#" class="text-brand-500 font-semibold hover:text-brand-700 transition-colors">Terms of Service</a>
              and
              <a href="#" class="text-brand-500 font-semibold hover:text-brand-700 transition-colors">Privacy Policy</a>
            </span>
          </label>

          <!-- Submit -->
          <button @click="submit" :disabled="!canSubmit"
            :class="['w-full py-3 rounded-xl text-white text-sm font-bold transition-all shadow-lg mt-1',
              canSubmit
                ? 'bg-gradient-to-r from-brand-500 to-brand-700 hover:opacity-90 shadow-brand-200'
                : 'bg-gray-200 cursor-not-allowed shadow-none']">
            <span v-if="loading" class="flex items-center justify-center gap-2">
              <svg class="w-4 h-4 animate-spin" fill="none" viewBox="0 0 24 24">
                <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"/>
                <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"/>
              </svg>
              Creating account...
            </span>
            <span v-else>Create Account</span>
          </button>

          <!-- Sign in link -->
          <p class="text-center text-xs text-gray-500 mt-2">
            Already have an account?
            <button @click="router.push('/login')" class="text-brand-500 font-semibold hover:text-brand-700 transition-colors ml-1">Sign in</button>
          </p>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()

const form        = ref({ name: '', email: '', password: '', confirm: '', agreed: false })
const showPass    = ref(false)
const showConfirm = ref(false)
const loading     = ref(false)

const strength = computed(() => {
  const p = form.value.password
  let s = 0
  if (p.length >= 8) s++
  if (/[A-Z]/.test(p)) s++
  if (/[0-9]/.test(p)) s++
  if (/[^A-Za-z0-9]/.test(p)) s++
  return s
})

const strengthColor = computed(() =>
  ['bg-red-400', 'bg-red-400', 'bg-yellow-400', 'bg-blue-400', 'bg-green-400'][strength.value]
)
const strengthLabel = computed(() =>
  ['', 'Weak', 'Fair', 'Good', 'Strong'][strength.value]
)

const canSubmit = computed(() =>
  form.value.name &&
  form.value.email &&
  form.value.password &&
  form.value.password === form.value.confirm &&
  form.value.agreed
)

function submit() {
  if (!canSubmit.value) return
  loading.value = true
  setTimeout(() => { loading.value = false }, 1500)
}

const features = [
  'Easy to use dashboard',
  'Powerful analytics',
  'Secure and reliable',
  '24/7 support',
]
</script>