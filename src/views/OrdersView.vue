<script setup>
import { ref, onMounted } from 'vue'
import { useCartStore } from '@/stores/cartStore'
import { useAuthUserStore } from '@/stores/authUser'
import { useRouter } from 'vue-router'

const cartStore = useCartStore()
const authStore = useAuthUserStore()
const router = useRouter()

const orders = ref([])
const isLoading = ref(true)
const error = ref(null)

onMounted(async () => {
  await loadOrders()
})

const loadOrders = async () => {
  isLoading.value = true
  error.value = null
  
  try {
    // Check if user is authenticated
    const isAuthenticated = await authStore.isAuthenticated()
    if (!isAuthenticated) {
      router.push('/login')
      return
    }
    
    // Fetch order history
    const { success, orders: orderData, error: orderError } = await cartStore.getOrderHistory()
    
    if (!success) {
      throw new Error(orderError || 'Failed to load order history')
    }
    
    orders.value = orderData
  } catch (err) {
    console.error('Error loading orders:', err)
    error.value = err.message || 'An error occurred while loading your orders'
  } finally {
    isLoading.value = false
  }
}

const formatDate = (dateString) => {
  const date = new Date(dateString)
  return new Intl.DateTimeFormat('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  }).format(date)
}

const getStatusColor = (status) => {
  switch (status) {
    case 'completed':
      return 'success'
    case 'pending':
      return 'warning'
    case 'cancelled':
      return 'error'
    default:
      return 'info'
  }
}
</script>

<template>
  <v-container>
    <v-row>
      <v-col cols="12">
        <h1 class="text-h4 mb-4">Order History</h1>
        
        <v-card v-if="isLoading" class="pa-4 text-center">
          <v-progress-circular indeterminate color="primary"></v-progress-circular>
          <p class="mt-2">Loading your orders...</p>
        </v-card>
        
        <v-alert
          v-else-if="error"
          type="error"
          variant="tonal"
          class="mb-4"
        >
          {{ error }}
        </v-alert>
        
        <v-alert
          v-else-if="orders.length === 0"
          type="info"
          variant="tonal"
          class="mb-4"
        >
          You haven't placed any orders yet. <v-btn variant="text" to="/shop">Start shopping</v-btn>
        </v-alert>
        
        <template v-else>
          <v-expansion-panels variant="accordion">
            <v-expansion-panel
              v-for="order in orders"
              :key="order.id"
              class="mb-3"
            >
              <v-expansion-panel-title>
                <div class="d-flex justify-space-between align-center w-100">
                  <div>
                    <strong>Order #{{ order.id }}</strong>
                    <div class="text-caption">{{ formatDate(order.created_at) }}</div>
                  </div>
                  <div class="d-flex align-center">
                    <v-chip
                      :color="getStatusColor(order.order_status)"
                      size="small"
                      class="mr-2"
                    >
                      {{ order.order_status }}
                    </v-chip>
                    <span class="font-weight-bold">₱{{ order.total_price.toFixed(2) }}</span>
                  </div>
                </div>
              </v-expansion-panel-title>
              
              <v-expansion-panel-text>
                <v-list>
                  <v-list-subheader>Order Items</v-list-subheader>
                  <v-list-item
                    v-for="item in order.order_items"
                    :key="item.id"
                    density="compact"
                  >
                    <v-list-item-title>
                      Product #{{ item.product_id }} (x{{ item.quantity }})
                    </v-list-item-title>
                    <v-list-item-subtitle class="text-right">
                      ₱{{ item.price.toFixed(2) }} each
                    </v-list-item-subtitle>
                  </v-list-item>
                </v-list>
                
                <div class="d-flex justify-space-between mt-4">
                  <span class="text-subtitle-1">Total:</span>
                  <span class="text-subtitle-1 font-weight-bold">₱{{ order.total_price.toFixed(2) }}</span>
                </div>
              </v-expansion-panel-text>
            </v-expansion-panel>
          </v-expansion-panels>
        </template>
      </v-col>
    </v-row>
  </v-container>
</template>

<style scoped>
.v-expansion-panel {
  border-radius: 8px !important;
  overflow: hidden;
}
</style>
