<script setup>
import { ref, onMounted, computed, watch } from 'vue'
import { useSearchStore } from '@/stores/searchStore'
import { useProductStore } from '@/stores/productStore'
import { useCartStore } from '@/stores/cartStore'
import { useRoute, useRouter } from 'vue-router'

const searchStore = useSearchStore()
const productStore = useProductStore()
const cartStore = useCartStore()
const route = useRoute()
const router = useRouter()

const addedToCartSnackbar = ref(false)
const snackbarMessage = ref('')

// Get search query from route params
const searchQuery = computed(() => route.query.q || '')

// Watch for route changes to update search query
watch(() => route.query.q, (newQuery) => {
  if (newQuery) {
    searchStore.setSearchQuery(newQuery)
  }
})

onMounted(async () => {
  // Load products if not already loaded
  if (productStore.productsFromApi.length === 0) {
    await productStore.getProductsFromApi()
  }
  
  // Set search query from URL
  if (searchQuery.value) {
    searchStore.setSearchQuery(searchQuery.value)
  }
})

// Add to cart function
const addToCart = (product) => {
  cartStore.addToCart(product)
  snackbarMessage.value = `${product.title} added to cart`
  addedToCartSnackbar.value = true
}



// Clear search and go back to shop
const clearSearch = () => {
  searchStore.clearSearch()
  router.push('/shop')
}

// This function is used in the template
// eslint-disable-next-line
const viewProductDetails = (product) => {
  // Navigate to product details page or open modal
  // For now, we'll just redirect to the shop page
  router.push('/shop')
}
</script>

<template>
  <v-container>
    <v-row>
      <v-col cols="12">
        <v-card class="mb-4">
          <v-card-title :class="{ 'd-flex align-center': !$vuetify.display.xs, 'text-center': $vuetify.display.xs }">
            <v-icon icon="mdi-magnify" class="mr-2" v-if="!$vuetify.display.xs" />
            <span :class="{ 'text-truncate': $vuetify.display.xs }">Search Results</span>
            <v-chip class="mx-2" color="primary" size="small">
              {{ searchStore.searchResults.length }} results
            </v-chip>
            <v-spacer v-if="!$vuetify.display.xs"></v-spacer>
            <div v-if="$vuetify.display.xs" class="my-2"></div>
            <v-btn variant="text" @click="clearSearch" :block="$vuetify.display.xs">
              Clear Search
            </v-btn>
          </v-card-title>
          <v-card-subtitle :class="{ 'text-center': $vuetify.display.xs }">
            Showing results for: "{{ searchQuery }}"
          </v-card-subtitle>
        </v-card>
        
        <div v-if="searchStore.isSearching" class="text-center my-8">
          <v-progress-circular indeterminate color="primary"></v-progress-circular>
          <p class="mt-2">Searching...</p>
        </div>
        
        <div v-else-if="searchStore.searchResults.length === 0" class="text-center my-8">
          <v-icon icon="mdi-magnify-close" size="64" color="grey-lighten-1"></v-icon>
          <h3 class="text-h5 mt-4">No results found</h3>
          <p class="text-body-1 mt-2">
            We couldn't find any products matching "{{ searchQuery }}".
          </p>
          <v-btn color="primary" class="mt-4" to="/shop">
            Browse All Products
          </v-btn>
        </div>
        
        <v-row v-else>
          <v-col cols="12" sm="6" md="4" lg="3" v-for="product in searchStore.searchResults" :key="product.id">
            <v-card height="100%" class="mx-auto">
              <v-img
                :src="product.image"
                height="200px"
                cover
                class="bg-grey-lighten-2"
              ></v-img>
              
              <v-card-title class="text-truncate" :style="$vuetify.display.xs ? 'font-size: 1rem;' : ''">
                {{ product.title }}
              </v-card-title>
              
              <v-card-text>
                <div :class="$vuetify.display.xs ? 'd-block text-center' : 'd-flex align-center'" class="mb-2">
                  <span class="text-h6 font-weight-bold" :class="$vuetify.display.xs ? 'mb-2' : ''">₱{{ product.price }}</span>
                  <v-chip 
                    :class="$vuetify.display.xs ? 'mx-auto' : 'ml-auto'" 
                    size="small" 
                    color="primary" 
                    variant="outlined"
                  >
                    {{ product.category }}
                  </v-chip>
                </div>
                
                <p class="text-truncate-2">{{ product.description }}</p>
              </v-card-text>
              
              <v-card-actions :class="$vuetify.display.xs ? 'd-block' : ''">
                <v-btn
                  variant="outlined"
                  color="primary"
                  block
                  @click="viewProductDetails(product)"
                  :class="$vuetify.display.xs ? 'mb-2' : 'mb-2'"
                  :size="$vuetify.display.xs ? 'small' : 'default'"
                >
                  View Details
                </v-btn>
                
                <v-btn
                  variant="tonal"
                  color="primary"
                  block
                  prepend-icon="mdi-cart-plus"
                  @click="addToCart(product)"
                  :size="$vuetify.display.xs ? 'small' : 'default'"
                >
                  Add to Cart
                </v-btn>
              </v-card-actions>
            </v-card>
          </v-col>
        </v-row>
      </v-col>
    </v-row>
    
    <!-- Snackbar for cart notification -->
    <v-snackbar v-model="addedToCartSnackbar" :timeout="2000" color="success">
      {{ snackbarMessage }}
      <template v-slot:actions>
        <v-btn variant="text" @click="addedToCartSnackbar = false">Close</v-btn>
      </template>
    </v-snackbar>
  </v-container>
</template>

<style scoped>
.text-truncate-2 {
  display: -webkit-box;
  -webkit-line-clamp: 2;
  line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
  text-overflow: ellipsis;
}
</style>
