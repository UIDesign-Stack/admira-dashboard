<template>
  <main class="flex-1 overflow-y-auto px-4 lg:px-8 py-6 pb-24 lg:pb-6 space-y-6">

    <!-- Header -->
    <AnalyticsHeader />

    <!-- KPI Cards -->
    <AnalyticsKpi />

    <!-- Row 1: Revenue Trend + Sales by Category -->
    <div class="grid grid-cols-1 lg:grid-cols-3 gap-4">
      <div class="lg:col-span-2">
        <RevenueTrend />
      </div>
      <SalesByCategory />
    </div>

    <!-- Row 2: Orders by Status + Traffic Source -->
    <div class="grid grid-cols-1 lg:grid-cols-2 gap-4">
      <OrdersByStatus />
      <TrafficSource />
    </div>

    <!-- Row 3: Top Products Table -->
    <TopPerformingProducts />

  </main>
</template>

<script setup>
import AnalyticsHeader       from '@/components/analytics/AnalyticsHeader.vue'
import AnalyticsKpi          from '@/components/analytics/AnalyticsKpi.vue'
import RevenueTrend          from '@/components/analytics/RevenueTrend.vue'
import SalesByCategory       from '@/components/analytics/SalesByCategory.vue'
import OrdersByStatus        from '@/components/analytics/OrdersByStatus.vue'
import TrafficSource         from '@/components/analytics/TrafficSource.vue'
import TopPerformingProducts from '@/components/analytics/TopPerformingProducts.vue'
</script>