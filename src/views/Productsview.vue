<template>
  <main class="flex-1 overflow-y-auto px-4 lg:px-8 py-6 pb-6">

    <ProductsHeader />
    <ProductsStats />
    <ProductsFilters />

    <ProductsGrid  v-if="viewMode === 'grid'" />
    <ProductsTable v-else />

    <ProductModal />

  </main>
</template>

<script setup>
import ProductsHeader  from '@/components/products/ProductsHeader.vue'
import ProductsStats   from '@/components/products/ProductsStats.vue'
import ProductsFilters from '@/components/products/ProductsFilters.vue'
import ProductsGrid    from '@/components/products/ProductsGrid.vue'
import ProductsTable   from '@/components/products/ProductsTable.vue'
import ProductModal    from '@/components/products/ProductModal.vue'
import { useProducts } from '@/composables/useProducts'

const { viewMode } = useProducts()
</script>