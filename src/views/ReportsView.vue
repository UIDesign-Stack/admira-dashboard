<template>
  <main class="flex-1 overflow-y-auto px-4 lg:px-8 py-6 pb-24 lg:pb-6 space-y-5">

    <ReportsHeader />
    <ReportsKpi />

    <div class="grid grid-cols-1 lg:grid-cols-2 gap-4">
      <SalesVsExpenses />
      <ProfitTrend />
    </div>

    <div class="grid grid-cols-1 lg:grid-cols-3 gap-4">
      <SalesCategory />
      <div class="lg:col-span-2">
        <RecentTransactions />
      </div>
    </div>

  </main>
</template>

<script setup>
import ReportsHeader      from '@/components/reports/ReportsHeader.vue'
import ReportsKpi         from '@/components/reports/ReportsKpi.vue'
import SalesVsExpenses    from '@/components/reports/SalesVsExpenses.vue'
import ProfitTrend        from '@/components/reports/ProfitTrend.vue'
import SalesCategory      from '@/components/reports/SalesCategory.vue'
import RecentTransactions from '@/components/reports/RecentTransactions.vue'
</script>