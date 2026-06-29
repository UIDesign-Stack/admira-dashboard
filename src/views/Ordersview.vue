<template>
  <main class="flex-1 overflow-y-auto px-4 lg:px-8 py-6 pb-6">

    <OrdersHeader />
    <OrdersStats />
    <OrdersFilters />
    <OrdersTable />

    <OrderModal />

  </main>
</template>

<script setup>
import OrdersHeader  from '@/components/orders/OrdersHeader.vue'
import OrdersStats   from '@/components/orders/OrdersStats.vue'
import OrdersFilters from '@/components/orders/OrdersFilters.vue'
import OrdersTable   from '@/components/orders/OrdersTable.vue'
import OrderModal    from '@/components/orders/OrderModal.vue'
</script>