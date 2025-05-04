<script setup>
import AppLayout from '@/components/layout/AppLayout.vue'
import ProductsList from '@/components/common/products/ProductsList.vue'
</script>

<template>
  <AppLayout>
    <template #content>
      <v-container>
        <ProductsList />
      </v-container>
    </template>
  </AppLayout>
</template>
