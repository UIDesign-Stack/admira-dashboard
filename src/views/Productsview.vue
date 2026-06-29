<template>
  <main class="flex-1 overflow-y-auto px-4 lg:px-8 py-6 pb-6">

    <!-- Page Header -->
    <div class="flex items-center justify-between mb-6">
      <div>
        <h1 class="text-lg font-bold text-gray-900">Products</h1>
        <p class="text-xs text-gray-400 mt-0.5">Manage your product catalog</p>
      </div>
      <button
        @click="openModal()"
        class="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-gradient-to-r from-brand-500 to-brand-700 text-white text-xs font-semibold hover:opacity-90 transition-opacity"
      >
        <svg class="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
          <path stroke-linecap="round" stroke-linejoin="round" d="M12 4v16m8-8H4"/>
        </svg>
        Add Product
      </button>
    </div>

    <!-- Stat Cards -->
    <div class="grid grid-cols-2 lg:grid-cols-4 gap-3 mb-6">
      <div v-for="stat in stats" :key="stat.label"
        class="bg-white rounded-2xl p-4 shadow-sm border border-gray-100">
        <div class="flex items-start justify-between mb-3">
          <div :class="['w-8 h-8 rounded-xl flex items-center justify-center', stat.iconBg]">
            <component :is="stat.icon" :class="['w-4 h-4', stat.iconColor]" />
          </div>
          <span :class="['text-[10px] font-semibold px-1.5 py-0.5 rounded-full', stat.badgeClass]">
            {{ stat.badge }}
          </span>
        </div>
        <p class="text-[11px] text-gray-400 mb-1">{{ stat.label }}</p>
        <p class="text-lg font-bold text-gray-900">{{ stat.value }}</p>
      </div>
    </div>

    <!-- Filter + Search + View Toggle -->
    <div class="bg-white rounded-2xl p-4 shadow-sm border border-gray-100 mb-4">
      <div class="flex flex-col sm:flex-row items-stretch sm:items-center gap-3">

        <!-- Search -->
        <div class="flex items-center gap-2 flex-1 bg-gray-50 border border-gray-100 rounded-xl px-3 py-2.5">
          <svg class="w-4 h-4 text-gray-400 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"/>
          </svg>
          <input
            v-model="search"
            type="text"
            placeholder="Search products..."
            class="flex-1 bg-transparent text-xs text-gray-700 placeholder-gray-400 outline-none"
          />
        </div>

        <div class="flex items-center gap-2 flex-shrink-0">
          <!-- Category Filter -->
          <div class="flex items-center gap-1.5 overflow-x-auto">
            <button
              v-for="cat in categories" :key="cat"
              @click="activeCategory = cat"
              :class="[
                'flex-shrink-0 text-[11px] font-semibold px-3 py-2 rounded-xl transition-all',
                activeCategory === cat
                  ? 'bg-brand-500 text-white shadow-sm'
                  : 'bg-gray-50 text-gray-500 hover:bg-gray-100 border border-gray-100'
              ]"
            >{{ cat }}</button>
          </div>

          <!-- View Toggle -->
          <div class="flex items-center bg-gray-50 border border-gray-100 rounded-xl p-1 gap-1 ml-1">
            <button
              v-for="v in ['grid', 'list']" :key="v"
              @click="viewMode = v"
              :class="['w-7 h-7 rounded-lg flex items-center justify-center transition-colors',
                viewMode === v ? 'bg-white shadow-sm text-brand-500' : 'text-gray-400 hover:text-gray-600']"
            >
              <svg v-if="v === 'grid'" class="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z"/>
              </svg>
              <svg v-else class="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 10h16M4 14h16M4 18h16"/>
              </svg>
            </button>
          </div>
        </div>
      </div>
    </div>

    <!-- Grid View -->
    <div v-if="viewMode === 'grid'" class="grid grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
      <div
        v-for="product in filteredProducts" :key="product.id"
        class="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden hover:shadow-md transition-shadow group"
      >
        <!-- Product Image Area -->
        <div :class="['h-32 flex items-center justify-center relative', product.iconBg]">
          <component :is="product.icon" :class="['w-14 h-14', product.iconColor]" />
          <span :class="['absolute top-2.5 right-2.5 text-[10px] font-semibold px-2 py-0.5 rounded-full', stockClass(product.stock)]">
            {{ product.stock }}
          </span>
        </div>
        <!-- Info -->
        <div class="p-3.5">
          <p class="text-[10px] text-gray-400 mb-1">{{ product.category }}</p>
          <p class="text-xs font-bold text-gray-800 mb-1 truncate">{{ product.name }}</p>
          <p class="text-sm font-bold text-brand-600 mb-3">{{ product.price }}</p>
          <div class="flex items-center justify-between">
            <span class="text-[10px] text-gray-400">{{ product.sold }} sold</span>
            <div class="flex items-center gap-1">
              <button
                @click="openModal(product)"
                class="w-7 h-7 rounded-lg bg-brand-50 flex items-center justify-center hover:bg-brand-100 transition-colors"
              >
                <svg class="w-3.5 h-3.5 text-brand-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"/>
                </svg>
              </button>
              <button class="w-7 h-7 rounded-lg bg-red-50 flex items-center justify-center hover:bg-red-100 transition-colors">
                <svg class="w-3.5 h-3.5 text-red-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"/>
                </svg>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- List View -->
    <div v-else class="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
      <div class="hidden sm:block overflow-x-auto">
        <table class="w-full">
          <thead>
            <tr class="border-b border-gray-100 bg-gray-50/50">
              <th class="text-left text-[11px] font-semibold text-gray-400 px-5 py-3.5">Product</th>
              <th class="text-left text-[11px] font-semibold text-gray-400 px-4 py-3.5">Category</th>
              <th class="text-right text-[11px] font-semibold text-gray-400 px-4 py-3.5">Price</th>
              <th class="text-center text-[11px] font-semibold text-gray-400 px-4 py-3.5">Stock</th>
              <th class="text-right text-[11px] font-semibold text-gray-400 px-4 py-3.5">Sold</th>
              <th class="text-center text-[11px] font-semibold text-gray-400 px-5 py-3.5">Action</th>
            </tr>
          </thead>
          <tbody class="divide-y divide-gray-50">
            <tr v-if="filteredProducts.length === 0">
              <td colspan="6" class="text-center py-16 text-sm text-gray-400">No products found</td>
            </tr>
            <tr v-for="product in filteredProducts" :key="product.id"
              class="hover:bg-gray-50/50 transition-colors">
              <td class="px-5 py-3.5">
                <div class="flex items-center gap-3">
                  <div :class="['w-9 h-9 rounded-xl flex items-center justify-center flex-shrink-0', product.iconBg]">
                    <component :is="product.icon" :class="['w-5 h-5', product.iconColor]" />
                  </div>
                  <p class="text-xs font-semibold text-gray-800">{{ product.name }}</p>
                </div>
              </td>
              <td class="px-4 py-3.5">
                <span class="text-[11px] text-gray-500 bg-gray-100 px-2 py-0.5 rounded-lg">{{ product.category }}</span>
              </td>
              <td class="px-4 py-3.5 text-right">
                <p class="text-xs font-bold text-gray-800">{{ product.price }}</p>
              </td>
              <td class="px-4 py-3.5 text-center">
                <span :class="['text-[10px] font-semibold px-2.5 py-1 rounded-full', stockClass(product.stock)]">
                  {{ product.stock }}
                </span>
              </td>
              <td class="px-4 py-3.5 text-right">
                <p class="text-xs text-gray-600">{{ product.sold }}</p>
              </td>
              <td class="px-5 py-3.5">
                <div class="flex items-center justify-center gap-1.5">
                  <button @click="openModal(product)"
                    class="w-7 h-7 rounded-lg bg-brand-50 flex items-center justify-center hover:bg-brand-100 transition-colors">
                    <svg class="w-3.5 h-3.5 text-brand-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"/>
                    </svg>
                  </button>
                  <button class="w-7 h-7 rounded-lg bg-red-50 flex items-center justify-center hover:bg-red-100 transition-colors">
                    <svg class="w-3.5 h-3.5 text-red-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"/>
                    </svg>
                  </button>
                </div>
              </td>
            </tr>
          </tbody>
        </table>
      </div>

      <!-- Mobile list -->
      <div class="sm:hidden divide-y divide-gray-50">
        <div v-for="product in filteredProducts" :key="product.id"
          class="flex items-center gap-3 p-4 hover:bg-gray-50/50 transition-colors">
          <div :class="['w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0', product.iconBg]">
            <component :is="product.icon" :class="['w-5 h-5', product.iconColor]" />
          </div>
          <div class="flex-1 min-w-0">
            <p class="text-xs font-semibold text-gray-800 truncate">{{ product.name }}</p>
            <p class="text-[10px] text-gray-400">{{ product.category }} · {{ product.sold }} sold</p>
          </div>
          <div class="text-right flex-shrink-0">
            <p class="text-xs font-bold text-brand-600">{{ product.price }}</p>
            <span :class="['text-[10px] font-semibold px-1.5 py-0.5 rounded-full mt-1 inline-block', stockClass(product.stock)]">
              {{ product.stock }}
            </span>
          </div>
        </div>
      </div>
    </div>

    <!-- Add/Edit Modal -->
    <Transition
      enter-active-class="transition-all duration-200 ease-out"
      enter-from-class="opacity-0"
      enter-to-class="opacity-100"
      leave-active-class="transition-all duration-150 ease-in"
      leave-from-class="opacity-100"
      leave-to-class="opacity-0"
    >
      <div v-if="showModal" class="fixed inset-0 z-50 flex items-center justify-center p-4">
        <div class="absolute inset-0 bg-black/30 backdrop-blur-sm" @click="showModal = false"></div>
        <div class="relative bg-white rounded-2xl shadow-2xl w-full max-w-md">
          <div class="flex items-center justify-between px-5 py-4 border-b border-gray-100">
            <p class="text-sm font-bold text-gray-900">{{ editingProduct ? 'Edit Product' : 'Add Product' }}</p>
            <button @click="showModal = false"
              class="w-8 h-8 rounded-xl bg-gray-50 border border-gray-100 flex items-center justify-center hover:bg-gray-100 transition-colors">
              <svg class="w-4 h-4 text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"/>
              </svg>
            </button>
          </div>
          <div class="p-5 space-y-4">
            <div>
              <label class="block text-[11px] font-semibold text-gray-500 mb-1.5">Product Name</label>
              <input v-model="form.name" type="text" placeholder="e.g. Wireless Headphone Pro"
                class="w-full bg-gray-50 border border-gray-100 rounded-xl px-3 py-2.5 text-xs text-gray-800 outline-none focus:border-brand-300 focus:bg-white transition-colors"/>
            </div>
            <div class="grid grid-cols-2 gap-3">
              <div>
                <label class="block text-[11px] font-semibold text-gray-500 mb-1.5">Category</label>
                <select v-model="form.category"
                  class="w-full bg-gray-50 border border-gray-100 rounded-xl px-3 py-2.5 text-xs text-gray-800 outline-none focus:border-brand-300 focus:bg-white transition-colors">
                  <option v-for="cat in categories.slice(1)" :key="cat">{{ cat }}</option>
                </select>
              </div>
              <div>
                <label class="block text-[11px] font-semibold text-gray-500 mb-1.5">Stock Status</label>
                <select v-model="form.stock"
                  class="w-full bg-gray-50 border border-gray-100 rounded-xl px-3 py-2.5 text-xs text-gray-800 outline-none focus:border-brand-300 focus:bg-white transition-colors">
                  <option>In Stock</option>
                  <option>Low Stock</option>
                  <option>Out of Stock</option>
                </select>
              </div>
            </div>
            <div>
              <label class="block text-[11px] font-semibold text-gray-500 mb-1.5">Price</label>
              <input v-model="form.price" type="text" placeholder="e.g. Rp 250.000"
                class="w-full bg-gray-50 border border-gray-100 rounded-xl px-3 py-2.5 text-xs text-gray-800 outline-none focus:border-brand-300 focus:bg-white transition-colors"/>
            </div>
            <div>
              <label class="block text-[11px] font-semibold text-gray-500 mb-1.5">Description</label>
              <textarea v-model="form.description" rows="3" placeholder="Short product description..."
                class="w-full bg-gray-50 border border-gray-100 rounded-xl px-3 py-2.5 text-xs text-gray-800 outline-none focus:border-brand-300 focus:bg-white transition-colors resize-none"/>
            </div>
          </div>
          <div class="flex gap-2 px-5 pb-5">
            <button @click="showModal = false"
              class="flex-1 py-2.5 rounded-xl border border-gray-200 text-xs font-semibold text-gray-600 hover:bg-gray-50 transition-colors">
              Cancel
            </button>
            <button
              class="flex-1 py-2.5 rounded-xl bg-gradient-to-r from-brand-500 to-brand-700 text-white text-xs font-semibold hover:opacity-90 transition-opacity">
              {{ editingProduct ? 'Save Changes' : 'Add Product' }}
            </button>
          </div>
        </div>
      </div>
    </Transition>

  </main>
</template>

<script setup>
import { h, ref, computed } from 'vue'

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

const stats = [
  { label: 'Total Products', value: '128',    badge: '+5',     badgeClass: 'bg-green-50 text-green-600',  icon: IconBox,     iconBg: 'bg-brand-50',  iconColor: 'text-brand-500' },
  { label: 'Categories',     value: '5',      badge: 'Active', badgeClass: 'bg-blue-50 text-blue-500',    icon: IconTag,     iconBg: 'bg-blue-50',   iconColor: 'text-blue-500'  },
  { label: 'In Stock',       value: '104',    badge: '81%',    badgeClass: 'bg-green-50 text-green-600',  icon: IconCheck,   iconBg: 'bg-green-50',  iconColor: 'text-green-500' },
  { label: 'Low / Out',      value: '24',     badge: '19%',    badgeClass: 'bg-red-50 text-red-500',      icon: IconWarning, iconBg: 'bg-red-50',    iconColor: 'text-red-500'   },
]

const categories = ['All', 'Audio', 'Electronics', 'Peripherals', 'Accessories', 'Others']
const search         = ref('')
const activeCategory = ref('All')
const viewMode       = ref('grid')
const showModal      = ref(false)
const editingProduct = ref(null)
const form           = ref({ name: '', category: 'Audio', stock: 'In Stock', price: '', description: '' })

const products = ref([
  { id: 1, name: 'Wireless Headphone',   category: 'Audio',       price: 'Rp 250.000', stock: 'In Stock',     sold: '248', icon: IconHeadphone, iconBg: 'bg-purple-50',  iconColor: 'text-purple-500' },
  { id: 2, name: 'Smart Watch Pro',      category: 'Electronics', price: 'Rp 540.000', stock: 'In Stock',     sold: '198', icon: IconWatch,     iconBg: 'bg-blue-50',    iconColor: 'text-blue-500'   },
  { id: 3, name: 'Bluetooth Speaker',    category: 'Audio',       price: 'Rp 320.000', stock: 'Low Stock',    sold: '176', icon: IconSpeaker,   iconBg: 'bg-pink-50',    iconColor: 'text-pink-500'   },
  { id: 4, name: 'Gaming Mouse X1',      category: 'Peripherals', price: 'Rp 180.000', stock: 'In Stock',     sold: '154', icon: IconMouse,     iconBg: 'bg-amber-50',   iconColor: 'text-amber-500'  },
  { id: 5, name: 'Mechanical Keyboard',  category: 'Peripherals', price: 'Rp 450.000', stock: 'Out of Stock', sold: '112', icon: IconKeyboard,  iconBg: 'bg-green-50',   iconColor: 'text-green-500'  },
  { id: 6, name: 'True Wireless Earbuds',category: 'Audio',       price: 'Rp 380.000', stock: 'In Stock',     sold: '98',  icon: IconHeadphone, iconBg: 'bg-purple-50',  iconColor: 'text-purple-500' },
  { id: 7, name: 'Smartband Lite',       category: 'Electronics', price: 'Rp 210.000', stock: 'In Stock',     sold: '87',  icon: IconWatch,     iconBg: 'bg-blue-50',    iconColor: 'text-blue-500'   },
  { id: 8, name: 'USB-C Hub 7-in-1',    category: 'Accessories', price: 'Rp 290.000', stock: 'Low Stock',    sold: '74',  icon: IconBox,       iconBg: 'bg-gray-100',   iconColor: 'text-gray-500'   },
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
    ? { name: product.name, category: product.category, stock: product.stock, price: product.price, description: '' }
    : { name: '', category: 'Audio', stock: 'In Stock', price: '', description: '' }
  showModal.value = true
}
</script>