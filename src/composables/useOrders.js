import { h, ref, computed } from 'vue'

const HeroIcon = (d) => ({
  render: () => h('svg',
    { fill: 'none', viewBox: '0 0 24 24', stroke: 'currentColor', 'stroke-width': '1.8' },
    [h('path', { 'stroke-linecap': 'round', 'stroke-linejoin': 'round', d })]
  )
})

const IconClipboard = HeroIcon('M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-7-4h.01M9 16h.01')
const IconCheck     = HeroIcon('M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z')
const IconClock     = HeroIcon('M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z')
const IconX         = HeroIcon('M6 18L18 6M6 6l12 12')

export const statusFilters = ['All', 'Pending', 'Processing', 'Completed', 'Cancelled']

// ── Shared state ─────────────────────────────────────────────────────────────
// Module-scope refs → singleton state shared by every component calling useOrders()
const search       = ref('')
const activeStatus  = ref('All')
const showModal     = ref(false)
const editingOrder  = ref(null)
const form          = ref({ id: '', customer: '', status: 'Pending', amount: '', date: '' })

const orders = ref([
  { id: '#ORD-2024-001', customer: 'John Doe',       status: 'Completed',  amount: 'Rp 250.000', date: '2026-06-02' },
  { id: '#ORD-2024-002', customer: 'Jane Smith',     status: 'Processing', amount: 'Rp 160.000', date: '2026-06-10' },
  { id: '#ORD-2024-003', customer: 'Robert Brown',   status: 'Pending',    amount: 'Rp 320.000', date: '2026-06-18' },
  { id: '#ORD-2024-004', customer: 'Emily Davis',    status: 'Completed',  amount: 'Rp 420.000', date: '2026-06-20' },
  { id: '#ORD-2024-005', customer: 'Michael Wilson', status: 'Cancelled',  amount: 'Rp 180.000', date: '2026-06-24' },
])

// ── Derived stats (computed live from the orders list) ───────────────────────
const stats = computed(() => {
  const total      = orders.value.length
  const completed  = orders.value.filter(o => o.status === 'Completed').length
  const processing = orders.value.filter(o => o.status === 'Processing').length
  const pending    = orders.value.filter(o => o.status === 'Pending' || o.status === 'Cancelled').length

  return [
    { label: 'Total Orders', value: String(total),      badge: 'All time', badgeClass: 'bg-brand-50 text-brand-600', icon: IconClipboard, iconBg: 'bg-brand-50',  iconColor: 'text-brand-500' },
    { label: 'Completed',    value: String(completed),  badge: total ? `${Math.round(completed / total * 100)}%` : '0%', badgeClass: 'bg-green-50 text-green-600', icon: IconCheck, iconBg: 'bg-green-50', iconColor: 'text-green-500' },
    { label: 'Processing',   value: String(processing), badge: 'In progress', badgeClass: 'bg-blue-50 text-blue-500',   icon: IconClock, iconBg: 'bg-blue-50',  iconColor: 'text-blue-500'  },
    { label: 'Pending / Cancelled', value: String(pending), badge: 'Needs review', badgeClass: 'bg-red-50 text-red-500', icon: IconX, iconBg: 'bg-red-50', iconColor: 'text-red-500' },
  ]
})

const filteredOrders = computed(() => orders.value.filter(o => {
  const matchStatus = activeStatus.value === 'All' || o.status === activeStatus.value
  const q = search.value.toLowerCase()
  const matchSearch = !q || o.customer.toLowerCase().includes(q) || o.id.toLowerCase().includes(q)
  return matchStatus && matchSearch
}))

const statusClass = (s) => ({
  Completed:  'bg-green-50 text-green-600',
  Processing: 'bg-blue-50 text-blue-500',
  Pending:    'bg-yellow-50 text-yellow-600',
  Cancelled:  'bg-red-50 text-red-500',
}[s] ?? 'bg-gray-100 text-gray-500')

const avatarPalette = [
  'bg-gradient-to-br from-orange-300 to-pink-400',
  'bg-gradient-to-br from-blue-400 to-indigo-500',
  'bg-gradient-to-br from-emerald-400 to-teal-500',
  'bg-gradient-to-br from-purple-400 to-fuchsia-500',
  'bg-gradient-to-br from-amber-400 to-orange-500',
]
function avatarClass(name) {
  const idx = name.split('').reduce((acc, c) => acc + c.charCodeAt(0), 0) % avatarPalette.length
  return avatarPalette[idx]
}
function initials(name) {
  return name.split(' ').map(n => n[0]).slice(0, 2).join('').toUpperCase()
}
function formatDate(d) {
  if (!d) return '-'
  return new Date(d).toLocaleDateString('id-ID', { day: '2-digit', month: 'short', year: 'numeric' })
}

function nextOrderId() {
  const maxNum = orders.value.reduce((max, o) => {
    const n = parseInt(o.id.split('-').pop(), 10)
    return Number.isNaN(n) ? max : Math.max(max, n)
  }, 0)
  return `#ORD-2024-${String(maxNum + 1).padStart(3, '0')}`
}

function openModal(order = null) {
  editingOrder.value = order
  form.value = order
    ? { id: order.id, customer: order.customer, status: order.status, amount: order.amount, date: order.date }
    : { id: nextOrderId(), customer: '', status: 'Pending', amount: '', date: new Date().toISOString().slice(0, 10) }
  showModal.value = true
}


function saveOrder() {
  if (editingOrder.value) {
    const idx = orders.value.findIndex(o => o.id === editingOrder.value.id)
    if (idx !== -1) {
      orders.value[idx] = {
        ...orders.value[idx],
        customer: form.value.customer || orders.value[idx].customer,
        status: form.value.status,
        amount: form.value.amount || orders.value[idx].amount,
        date: form.value.date || orders.value[idx].date,
      }
    }
  } else {
    orders.value.unshift({
      id: form.value.id,
      customer: form.value.customer || 'Unnamed Customer',
      status: form.value.status,
      amount: form.value.amount || 'Rp 0',
      date: form.value.date || new Date().toISOString().slice(0, 10),
    })
  }
  showModal.value = false
}

function removeOrder(order) {
  orders.value = orders.value.filter(o => o.id !== order.id)
}

export function useOrders() {
  return {
    // static data
    statusFilters,
    // shared state
    search, activeStatus, showModal, editingOrder, form, orders,
    // derived
    stats, filteredOrders,
    // helpers
    statusClass, avatarClass, initials, formatDate,
    // actions
    openModal, saveOrder, removeOrder,
  }
}