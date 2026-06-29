<template>
  <main class="flex-1 overflow-y-auto px-4 lg:px-8 py-6 pb-24 lg:pb-6 space-y-5">

    <CustomersHeader @add-customer="showModal = true" />
    <CustomersKpi />

    <div class="grid grid-cols-1 lg:grid-cols-3 gap-4">
      <div class="lg:col-span-2">
        <CustomerGrowth />
      </div>
      <CustomerByLocation />
    </div>

    <CustomerList />

    <AddCustomerModal :show="showModal" @close="showModal = false" />

  </main>
</template>

<script setup>
import { ref } from 'vue'
import CustomersHeader    from '@/components/customers/CustomersHeader.vue'
import CustomersKpi       from '@/components/customers/CustomersKpi.vue'
import CustomerGrowth     from '@/components/customers/CustomerGrowth.vue'
import CustomerByLocation from '@/components/customers/CustomerByLocation.vue'
import CustomerList       from '@/components/customers/CustomerList.vue'
import AddCustomerModal   from '@/components/customers/AddCustomerModal.vue'

const showModal = ref(false)
</script>