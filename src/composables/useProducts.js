import { h, ref, computed } from 'vue'

// ── Icon factory ───────────────────────────────────────────────────────────
const HeroIcon = (d) => ({
  render: () => h('svg',
    { fill: 'none', viewBox: '0 0 24 24', stroke: 'currentColor', 'stroke-width': '1.8' },
    [h('path', { 'stroke-linecap': 'round', 'stroke-linejoin': 'round', d })]
  )
})

const IconHeadphone = HeroIcon('M9 19V6l12-3v13M9 19c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zm12-3c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zM9 10l12-3')
const IconWatch     = HeroIcon('M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z')
const IconSpeaker   = HeroIcon('M11 5.882V19.24a1.76 1.76 0 01-3.417.592l-2.147-6.15M18 13a3 3 0 100-6M5.436 13.683A4.001 4.001 0 017 6h1.832c4.1 0 7.625-1.234 9.168-3v14c-1.543-1.766-5.067-3-9.168-3H7a3.988 3.988 0 01-1.564-.317z')
const IconMouse     = HeroIcon('M15 15l-2 5L9 9l11 4-5 2zm0 0l5 5')
const IconKeyboard  = HeroIcon('M9 3H5a2 2 0 00-2 2v4m6-6h10a2 2 0 012 2v4M9 3v18m0 0h10a2 2 0 002-2V9M9 21H5a2 2 0 01-2-2V9m0 0h18')
const IconBox       = HeroIcon('M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4')
const IconTag       = HeroIcon('M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z')
const IconCheck     = HeroIcon('M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z')
const IconWarning   = HeroIcon('M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z')

// ── Static reference data ─────────────────────────────────────────────────
export const categories = ['All', 'Audio', 'Electronics', 'Peripherals', 'Accessories', 'Others']


export const iconOptions = [
  { key: 'headphone', label: 'Headphone', icon: IconHeadphone, iconBg: 'bg-purple-50', iconColor: 'text-purple-500' },
  { key: 'watch',     label: 'Watch',     icon: IconWatch,     iconBg: 'bg-blue-50',   iconColor: 'text-blue-500'  },
  { key: 'speaker',   label: 'Speaker',   icon: IconSpeaker,   iconBg: 'bg-pink-50',   iconColor: 'text-pink-500'  },
  { key: 'mouse',     label: 'Mouse',     icon: IconMouse,     iconBg: 'bg-amber-50',  iconColor: 'text-amber-500' },
  { key: 'keyboard',  label: 'Keyboard',  icon: IconKeyboard,  iconBg: 'bg-green-50',  iconColor: 'text-green-500' },
  { key: 'box',       label: 'Other',     icon: IconBox,       iconBg: 'bg-gray-100',  iconColor: 'text-gray-500'  },
]
const getIconMeta = (key) => iconOptions.find(o => o.key === key) ?? iconOptions[5]

const stats = [
  { label: 'Total Products', value: '128',    badge: '+5',     badgeClass: 'bg-green-50 text-green-600',  icon: IconBox,     iconBg: 'bg-brand-50',  iconColor: 'text-brand-500' },
  { label: 'Categories',     value: '5',      badge: 'Active', badgeClass: 'bg-blue-50 text-blue-500',    icon: IconTag,     iconBg: 'bg-blue-50',   iconColor: 'text-blue-500'  },
  { label: 'In Stock',       value: '104',    badge: '81%',    badgeClass: 'bg-green-50 text-green-600',  icon: IconCheck,   iconBg: 'bg-green-50',  iconColor: 'text-green-500' },
  { label: 'Low / Out',      value: '24',     badge: '19%',    badgeClass: 'bg-red-50 text-red-500',      icon: IconWarning, iconBg: 'bg-red-50',    iconColor: 'text-red-500'   },
]

// ── Shared state ─────────────────────────────────────────────────────────────
const search         = ref('')
const activeCategory = ref('All')
const viewMode       = ref('grid')
const showModal      = ref(false)
const editingProduct = ref(null)
const form           = ref({ name: '', category: 'Audio', stock: 'In Stock', price: '', sold: '', description: '', iconKey: 'box' })

const products = ref([
  { id: 1, name: 'Wireless Headphone',   category: 'Audio',       price: 'Rp 250.000', stock: 'In Stock',     sold: '248', icon: IconHeadphone, iconBg: 'bg-purple-50',  iconColor: 'text-purple-500', iconKey: 'headphone' },
  { id: 2, name: 'Smart Watch Pro',      category: 'Electronics', price: 'Rp 540.000', stock: 'In Stock',     sold: '198', icon: IconWatch,     iconBg: 'bg-blue-50',    iconColor: 'text-blue-500',   iconKey: 'watch'     },
  { id: 3, name: 'Bluetooth Speaker',    category: 'Audio',       price: 'Rp 320.000', stock: 'Low Stock',    sold: '176', icon: IconSpeaker,   iconBg: 'bg-pink-50',    iconColor: 'text-pink-500',   iconKey: 'speaker'   },
  { id: 4, name: 'Gaming Mouse X1',      category: 'Peripherals', price: 'Rp 180.000', stock: 'In Stock',     sold: '154', icon: IconMouse,     iconBg: 'bg-amber-50',   iconColor: 'text-amber-500',  iconKey: 'mouse'     },
  { id: 5, name: 'Mechanical Keyboard',  category: 'Peripherals', price: 'Rp 450.000', stock: 'Out of Stock', sold: '112', icon: IconKeyboard,  iconBg: 'bg-green-50',   iconColor: 'text-green-500',  iconKey: 'keyboard'  },
  { id: 6, name: 'True Wireless Earbuds',category: 'Audio',       price: 'Rp 380.000', stock: 'In Stock',     sold: '98',  icon: IconHeadphone, iconBg: 'bg-purple-50',  iconColor: 'text-purple-500', iconKey: 'headphone' },
  { id: 7, name: 'Smartband Lite',       category: 'Electronics', price: 'Rp 210.000', stock: 'In Stock',     sold: '87',  icon: IconWatch,     iconBg: 'bg-blue-50',    iconColor: 'text-blue-500',   iconKey: 'watch'     },
  { id: 8, name: 'USB-C Hub 7-in-1',    category: 'Accessories', price: 'Rp 290.000', stock: 'Low Stock',    sold: '74',  icon: IconBox,       iconBg: 'bg-gray-100',   iconColor: 'text-gray-500',   iconKey: 'box'       },
])

const filteredProducts = computed(() => products.value.filter(p => {
  const matchCat    = activeCategory.value === 'All' || p.category === activeCategory.value
  const matchSearch = !search.value || p.name.toLowerCase().includes(search.value.toLowerCase())
  return matchCat && matchSearch
}))

const stockClass = (s) => ({
  'In Stock':     'bg-green-50 text-green-600',
  'Low Stock':    'bg-yellow-50 text-yellow-600',
  'Out of Stock': 'bg-red-50 text-red-500',
}[s] ?? 'bg-gray-100 text-gray-500')

function openModal(product = null) {
  editingProduct.value = product
  form.value = product
    ? { name: product.name, category: product.category, stock: product.stock, price: product.price, sold: product.sold, description: product.description ?? '', iconKey: product.iconKey ?? 'box' }
    : { name: '', category: 'Audio', stock: 'In Stock', price: '', sold: '', description: '', iconKey: 'box' }
  showModal.value = true
}


function saveProduct() {
  const meta = getIconMeta(form.value.iconKey)

  if (editingProduct.value) {
    const idx = products.value.findIndex(p => p.id === editingProduct.value.id)
    if (idx !== -1) {
      products.value[idx] = {
        ...products.value[idx],
        name: form.value.name || products.value[idx].name,
        category: form.value.category,
        stock: form.value.stock,
        price: form.value.price || products.value[idx].price,
        sold: form.value.sold || products.value[idx].sold,
        description: form.value.description,
        iconKey: meta.key,
        icon: meta.icon,
        iconBg: meta.iconBg,
        iconColor: meta.iconColor,
      }
    }
  } else {
    const newId = products.value.length
      ? Math.max(...products.value.map(p => p.id)) + 1
      : 1
    products.value.unshift({
      id: newId,
      name: form.value.name || 'Untitled Product',
      category: form.value.category,
      price: form.value.price || 'Rp 0',
      stock: form.value.stock,
      sold: form.value.sold || '0',
      description: form.value.description,
      iconKey: meta.key,
      icon: meta.icon,
      iconBg: meta.iconBg,
      iconColor: meta.iconColor,
    })
  }

  showModal.value = false
}

export function useProducts() {
  return {
    // static data
    stats, categories, iconOptions,
    // shared state
    search, activeCategory, viewMode, showModal, editingProduct, form, products,
    // derived
    filteredProducts,
    // helpers
    stockClass, getIconMeta,
    // actions
    openModal, saveProduct,
  }
}