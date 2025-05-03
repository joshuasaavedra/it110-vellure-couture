<script setup>
import { ref, onMounted, computed } from 'vue'
import { useProductStore } from '@/stores/productStore'

const categories = ref(["men's clothing", "women's clothing", 'accessories'])
const productStore = useProductStore()

const selectedCategory = ref('')

const filteredProducts = computed(() => {
  if (selectedCategory.value === '') return productStore.products
  return productStore.products.filter(
    (product) => product.category.toLowerCase() === selectedCategory.value.toLowerCase(),
  )
})

onMounted(async () => {
  if (productStore.products.length === 0) await productStore.getProductsFromApi()

  console.log(productStore.products)
})
</script>

<template>
  <v-row>
    <v-col cols="12" md="3">
      <div class="d-flex align-center ga-2 mb-2 justify-center">
        <v-btn size="small" icon class="mb-5" @click="productStore.getProductsFromApi()">
          <v-icon>mdi-refresh</v-icon>
        </v-btn>
        <v-select
          label="Select Category"
          :items="categories"
          variant="solo"
          density="compact"
          v-model="selectedCategory"
        ></v-select>
      </div>
    </v-col>
  </v-row>
  <v-row>
    <v-col cols="12" md="3" v-for="product in filteredProducts" :key="product.id">
      <v-card>
        <v-card-title> {{ product.title }}</v-card-title>
        <v-card-text>
          <v-img :src="product.image" width="100%" height="200px" contain></v-img>
          <p><b>₱</b> {{ product.price }}</p>
        </v-card-text>
        <v-card-actions>
          <v-btn color="primary" variant="outlined" append-icon="mdi-cart" size="small"
            >Add To Cart</v-btn
          >
        </v-card-actions>
      </v-card>
    </v-col>
  </v-row>
</template>

<style scoped></style>
