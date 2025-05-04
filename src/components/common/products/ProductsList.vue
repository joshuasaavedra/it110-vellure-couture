<script setup>
import { ref, onMounted, computed } from 'vue'
import { useProductStore } from '@/stores/productStore'
import { useCartStore } from '@/stores/cartStore'

const categories = ref(["men's clothing", "women's clothing", 'accessories'])
const productStore = useProductStore()
const cartStore = useCartStore()
const selectedCategory = ref('')
const productDialog = ref(false)
const viewProduct = ref(null)
const addedToCartSnackbar = ref(false)
const snackbarMessage = ref('')

const filteredProducts = computed(() => {
  if (selectedCategory.value === '') return productStore.productsFromApi
  return productStore.productsFromApi.filter(
    (product) => product.category.toLowerCase() === selectedCategory.value.toLowerCase(),
  )
})
const refresh = () => {
  productStore.getProductsFromApi()
  selectedCategory.value = ''
}

const addToCart = (product) => {
  cartStore.addToCart(product)
  snackbarMessage.value = `${product.title} added to cart`
  addedToCartSnackbar.value = true
}

const openProductDetails = (product) => {
  viewProduct.value = product
  productDialog.value = true
}

onMounted(async () => {
  if (productStore.productsFromApi.length === 0) await productStore.getProductsFromApi()

  console.log(productStore.productsFromApi)
})
</script>

<template>
  <v-row>
    <v-col cols="12" md="3">
      <div class="d-flex align-center ga-2 mb-2 justify-center">
        <v-btn size="small" icon class="mb-5" @click="refresh()">
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
        <v-card-actions class="d-flex flex-column" style="gap: 8px">
          <v-btn
            color="primary"
            variant="outlined"
            size="small"
            @click="openProductDetails(product)"
            block
          >
            View Details
          </v-btn>
          <v-btn
            color="primary"
            variant="tonal"
            size="small"
            @click="addToCart(product)"
            block
            prepend-icon="mdi-cart-plus"
          >
            Add to Cart
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-col>
  </v-row>

  <v-dialog v-model="productDialog" width="500">
    <v-card>
      <v-card-title>{{ viewProduct.title }}</v-card-title>
      <v-card-text>
        <v-img :src="viewProduct.image" width="100%" height="200px" contain></v-img>
        <p><b>₱</b> {{ viewProduct.price }}</p>
        <p>{{ viewProduct.description }}</p>
      </v-card-text>
      <v-card-actions>
        <v-btn 
          color="primary" 
          variant="outlined" 
          append-icon="mdi-cart" 
          size="small" 
          block
          @click="addToCart(viewProduct); productDialog = false"
        >
          Add To Cart
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
  
  <!-- Snackbar for cart notification -->
  <v-snackbar v-model="addedToCartSnackbar" :timeout="2000" color="success">
    {{ snackbarMessage }}
    <template v-slot:actions>
      <v-btn variant="text" @click="addedToCartSnackbar = false">Close</v-btn>
    </template>
  </v-snackbar>
</template>

<style scoped></style>
