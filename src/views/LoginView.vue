<template>
  <div class="min-h-screen flex">

    <!-- Kiri: Brand Panel -->
    <div class="hidden lg:flex lg:w-5/12 xl:w-1/2 relative flex-col items-center justify-center overflow-hidden"
      style="background: linear-gradient(135deg, #5b4fcf 0%, #7c6af5 50%, #6366f1 100%);">

      <!-- Background decorative circles -->
      <div class="absolute -top-20 -left-20 w-72 h-72 rounded-full opacity-20"
        style="background: rgba(255,255,255,0.15)"></div>
      <div class="absolute -bottom-16 -right-16 w-64 h-64 rounded-full opacity-15"
        style="background: rgba(255,255,255,0.1)"></div>
      <div class="absolute top-1/3 -right-8 w-40 h-40 rounded-full opacity-10"
        style="background: rgba(255,255,255,0.2)"></div>

      <!-- Star decorations -->
      <div class="absolute top-16 right-24 text-white opacity-40 text-xl">✦</div>
      <div class="absolute top-1/3 left-12 text-white opacity-30 text-sm">✦</div>
      <div class="absolute bottom-32 right-16 text-white opacity-40 text-sm">✦</div>
      <div class="absolute bottom-16 left-20 text-white opacity-25 text-xs">✦</div>

      <div class="relative z-10 px-10 w-full max-w-md">
        <!-- Logo -->
        <div class="flex items-center gap-2.5 mb-12">
          <div class="w-9 h-9 rounded-xl bg-white/20 backdrop-blur-sm flex items-center justify-center">
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
        <h1 class="text-3xl font-bold text-white leading-tight mb-3">
          Welcome Back! 👋
        </h1>
        <p class="text-white/70 text-sm mb-10">Sign in to continue to your dashboard</p>

        <!-- Dashboard Preview Card -->
        <div class="bg-white/10 backdrop-blur-sm rounded-2xl p-3 mb-10 border border-white/20">
          <div class="bg-white rounded-xl overflow-hidden shadow-xl">
            <!-- Mini dashboard preview -->
            <div class="flex h-28">
              <!-- Mini sidebar -->
              <div class="w-12 bg-gray-50 border-r border-gray-100 flex flex-col items-center py-2 gap-1.5">
                <div class="w-5 h-5 rounded bg-brand-100"></div>
                <div class="w-4 h-1.5 rounded bg-gray-200 mt-1"></div>
                <div class="w-4 h-1.5 rounded bg-gray-200"></div>
                <div class="w-4 h-1.5 rounded bg-gray-200"></div>
                <div class="w-4 h-1.5 rounded bg-brand-200"></div>
              </div>
              <!-- Mini content -->
              <div class="flex-1 p-2">
                <div class="flex gap-1.5 mb-2">
                  <div v-for="i in 4" :key="i" class="flex-1 h-6 rounded-lg bg-gray-50 border border-gray-100"></div>
                </div>
                <!-- Mini chart area -->
                <div class="bg-gray-50 rounded-lg h-14 flex items-end gap-0.5 px-2 pb-1.5 pt-2">
                  <svg viewBox="0 0 120 40" class="w-full h-full">
                    <polyline points="0,35 15,28 30,30 45,18 60,20 75,10 90,14 105,5 120,2"
                      fill="none" stroke="#7c6af5" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                    <polygon points="0,35 15,28 30,30 45,18 60,20 75,10 90,14 105,5 120,2 120,40 0,40"
                      fill="url(#miniGrad)" opacity="0.3"/>
                    <defs>
                      <linearGradient id="miniGrad" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="0%" stop-color="#7c6af5" stop-opacity="0.5"/>
                        <stop offset="100%" stop-color="#7c6af5" stop-opacity="0"/>
                      </linearGradient>
                    </defs>
                  </svg>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- Feature list -->
        <div class="space-y-4">
          <div v-for="feat in features" :key="feat.label" class="flex items-center gap-3">
            <div class="w-8 h-8 rounded-xl bg-white/15 flex items-center justify-center flex-shrink-0">
              <component :is="feat.icon" class="w-4 h-4 text-white" />
            </div>
            <div>
              <p class="text-white text-xs font-semibold">{{ feat.label }}</p>
              <p class="text-white/60 text-[10px]">{{ feat.desc }}</p>
            </div>
          </div>
        </div>
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
        <!-- Heading -->
        <div class="mb-8">
          <h2 class="text-2xl font-bold text-gray-900">Sign In</h2>
          <p class="text-sm text-gray-400 mt-1">Enter your credentials to access your account</p>
        </div>

        <!-- Form -->
        <div class="space-y-4">

          <!-- Email -->
          <div>
            <label class="block text-xs font-semibold text-gray-700 mb-1.5">Email Address</label>
            <div class="relative">
              <input v-model="form.email" type="email" placeholder="you@example.com"
                class="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 text-sm text-gray-800 outline-none focus:border-brand-400 focus:bg-white transition-colors pr-10"
                @keyup.enter="submit"/>
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
                placeholder="••••••••••••"
                class="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 text-sm text-gray-800 outline-none focus:border-brand-400 focus:bg-white transition-colors pr-10"
                @keyup.enter="submit"/>
              <button @click="showPass = !showPass"
                class="absolute right-3 top-1/2 -translate-y-1/2 text-gray-300 hover:text-gray-500 transition-colors">
                <svg class="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                    :d="showPass
                      ? 'M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21'
                      : 'M15 12a3 3 0 11-6 0 3 3 0 016 0z M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z'"/>
                </svg>
              </button>
            </div>
          </div>

          <!-- Remember me + Forgot -->
          <div class="flex items-center justify-between">
            <label class="flex items-center gap-2 cursor-pointer">
              <input type="checkbox" v-model="form.remember"
                class="w-4 h-4 rounded border-gray-300 accent-brand-500"/>
              <span class="text-xs text-gray-600">Remember Me</span>
            </label>
            <button @click="router.push('/forgot')" class="text-xs text-brand-500 font-semibold hover:text-brand-700 transition-colors">
              Forgot Password?
            </button>
          </div>

          <!-- Submit -->
          <button @click="submit"
            class="w-full py-3 rounded-xl bg-gradient-to-r from-brand-500 to-brand-700 text-white text-sm font-bold hover:opacity-90 transition-opacity shadow-lg shadow-brand-200 mt-2">
            <span v-if="loading" class="flex items-center justify-center gap-2">
              <svg class="w-4 h-4 animate-spin" fill="none" viewBox="0 0 24 24">
                <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"/>
                <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"/>
              </svg>
              Signing in...
            </span>
            <span v-else>Sign In</span>
          </button>

          <!-- Divider -->
          <div class="flex items-center gap-3 my-2">
            <div class="flex-1 h-px bg-gray-100"></div>
            <span class="text-[11px] text-gray-400">or continue with</span>
            <div class="flex-1 h-px bg-gray-100"></div>
          </div>

          <!-- Social -->
          <div class="grid grid-cols-2 gap-3">
            <button class="flex items-center justify-center gap-2 py-2.5 rounded-xl border border-gray-200 bg-gray-50 hover:bg-gray-100 transition-colors">
              <!-- Google icon -->
              <svg class="w-4 h-4" viewBox="0 0 24 24" fill="none">
                <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
                <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
                <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l3.66-2.84z" fill="#FBBC05"/>
                <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
              </svg>
              <span class="text-xs font-semibold text-gray-600">Google</span>
            </button>
            <button class="flex items-center justify-center gap-2 py-2.5 rounded-xl border border-gray-200 bg-gray-50 hover:bg-gray-100 transition-colors">
              <!-- Microsoft icon -->
              <svg class="w-4 h-4" viewBox="0 0 24 24" fill="none">
                <rect x="1" y="1" width="10" height="10" fill="#F25022"/>
                <rect x="13" y="1" width="10" height="10" fill="#7FBA00"/>
                <rect x="1" y="13" width="10" height="10" fill="#00A4EF"/>
                <rect x="13" y="13" width="10" height="10" fill="#FFB900"/>
              </svg>
              <span class="text-xs font-semibold text-gray-600">Microsoft</span>
            </button>
          </div>

          <!-- Sign up link -->
          <p class="text-center text-xs text-gray-500 mt-4">
            Don't have an account?
            <button @click="router.push('/register')" class="text-brand-500 font-semibold hover:text-brand-700 transition-colors ml-1">Sign up</button>
          </p>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { h, ref } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()

const Hi = (d) => ({
  render: () => h('svg',
    { fill: 'none', viewBox: '0 0 24 24', stroke: 'currentColor', 'stroke-width': '2' },
    [h('path', { 'stroke-linecap': 'round', 'stroke-linejoin': 'round', d })]
  )
})

const IconChart  = Hi('M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z')
const IconCog    = Hi('M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z M15 12a3 3 0 11-6 0 3 3 0 016 0z')
const IconShield = Hi('M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z')

const features = [
  { label: 'Real-time Analytics',  desc: 'Track performance in real time', icon: IconChart  },
  { label: 'Smart Management',     desc: 'Manage your business efficiently', icon: IconCog    },
  { label: 'Secure & Reliable',    desc: 'Your data is safe with us',        icon: IconShield },
]

const form     = ref({ email: '', password: '', remember: false })
const showPass = ref(false)
const loading  = ref(false)

function submit() {
  loading.value = true
  setTimeout(() => {
    localStorage.setItem('admira_token', 'demo')
    router.push('/overview')
  }, 1000)
}
</script>