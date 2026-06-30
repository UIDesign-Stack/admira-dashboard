import { createRouter, createWebHistory } from 'vue-router'

import LoginView    from '@/views/LoginView.vue'
import RegisterView from '@/views/RegisterView.vue'
import ForgotView   from '@/views/ForgotView.vue'

// Layout utama (yang sudah punya Sidebar + Topbar)
import DashboardLayout from '@/components/layouts/DashboardLayout.vue'

const OverviewView   = () => import('@/views/OverviewView.vue')
const AnalyticsView  = () => import('@/views/AnalyticsView.vue')
const OrdersView     = () => import('@/views/OrdersView.vue')
const ProductsView   = () => import('@/views/ProductsView.vue')
const CustomersView  = () => import('@/views/CustomersView.vue')
const ReportsView    = () => import('@/views/ReportsView.vue')
const SettingsView   = () => import('@/views/SettingsView.vue')

const routes = [
  // ─── Auth (tanpa sidebar) ────────────────────────────────
  { path: '/login',    name: 'Login',    component: LoginView    },
  { path: '/register', name: 'Register', component: RegisterView },
  { path: '/forgot',   name: 'Forgot',   component: ForgotView   },

  // ─── Dashboard (dengan sidebar) ──────────────────────────
  {
    path: '/',
    component: DashboardLayout,
    children: [
      { path: '',          redirect: '/overview' },
      { path: 'overview',  name: 'Overview',   component: OverviewView   },
      { path: 'analytics', name: 'Analytics',  component: AnalyticsView  },
      { path: 'orders',    name: 'Orders',     component: OrdersView     },
      { path: 'products',  name: 'Products',   component: ProductsView   },
      { path: 'customers', name: 'Customers',  component: CustomersView  },
      { path: 'reports',   name: 'Reports',    component: ReportsView    },
      { path: 'settings',  name: 'Settings',   component: SettingsView   },
    ],
  },

  // ─── Catch all → redirect ke login ───────────────────────
  { path: '/:pathMatch(.*)*', redirect: '/login' },
]

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
})

// Navigation guard: halaman dashboard butuh "login" dulu
// Ganti logika ini sesuai auth system Anda (Pinia, localStorage, dll)
router.beforeEach((to, from, next) => {
  const publicPages  = ['/login', '/register', '/forgot']
  const isPublic     = publicPages.includes(to.path)
  const isLoggedIn   = localStorage.getItem('admira_token') // ganti sesuai auth Anda

  if (!isPublic && !isLoggedIn) {
    return next('/login')
  }

  // Kalau sudah login tapi buka halaman auth → redirect ke dashboard
  if (isPublic && isLoggedIn) {
    return next('/overview')
  }

  next()
})

export default router