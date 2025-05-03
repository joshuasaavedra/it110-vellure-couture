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
  await checkAuth()
  await loadOrders()
})

const checkAuth = async () => {
  const isAuthenticated = await authStore.isAuthenticated()
  if (!isAuthenticated) {
    router.push('/login')
  }
}

const loadOrders = async () => {
  isLoading.value = true
  error.value = null
  
  try {
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

const getStatusIcon = (status) => {
  switch (status) {
    case 'completed':
      return 'mdi-check-circle'
    case 'pending':
      return 'mdi-clock-outline'
    case 'cancelled':
      return 'mdi-close-circle'
    default:
      return 'mdi-information'
  }
}
</script>

<template>
  <v-container>
    <v-row>
      <v-col cols="12">
        <v-card class="mb-4">
          <v-card-title class="d-flex align-center">
            <v-icon icon="mdi-history" class="mr-2" />
            Order History
          </v-card-title>
          <v-card-subtitle>Track and manage your past orders</v-card-subtitle>
        </v-card>
        
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
          <v-card
            v-for="order in orders"
            :key="order.id"
            class="mb-4"
            variant="outlined"
          >
            <v-card-item>
              <template v-slot:prepend>
                <v-icon :icon="getStatusIcon(order.order_status)" :color="getStatusColor(order.order_status)" size="large" />
              </template>
              
              <v-card-title>
                Order #{{ order.id }}
                <v-chip
                  :color="getStatusColor(order.order_status)"
                  size="small"
                  class="ml-2"
                >
                  {{ order.order_status }}
                </v-chip>
              </v-card-title>
              
              <v-card-subtitle>
                Placed on {{ formatDate(order.created_at) }}
              </v-card-subtitle>
            </v-card-item>
            
            <v-divider></v-divider>
            
            <v-card-text>
              <v-list>
                <v-list-subheader>Order Items</v-list-subheader>
                <v-list-item
                  v-for="item in order.order_items"
                  :key="item.id"
                  density="compact"
                >
                  <template v-slot:prepend>
                    <v-avatar size="40" color="grey-lighten-3" class="mr-3">
                      <v-icon>mdi-package-variant-closed</v-icon>
                    </v-avatar>
                  </template>
                  
                  <v-list-item-title>
                    Product #{{ item.product_id }}
                  </v-list-item-title>
                  
                  <v-list-item-subtitle class="d-flex justify-space-between">
                    <span>Quantity: {{ item.quantity }}</span>
                    <span class="font-weight-bold">₱{{ item.price.toFixed(2) }} each</span>
                  </v-list-item-subtitle>
                </v-list-item>
              </v-list>
              
              <v-divider class="my-3"></v-divider>
              
              <div class="d-flex justify-space-between align-center">
                <span class="text-subtitle-1">Total:</span>
                <span class="text-h6 font-weight-bold">₱{{ order.total_price.toFixed(2) }}</span>
              </div>
            </v-card-text>
            
            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn
                variant="text"
                color="primary"
                prepend-icon="mdi-refresh"
                :disabled="order.order_status !== 'pending'"
              >
                Track Order
              </v-btn>
              <v-btn
                variant="text"
                color="error"
                prepend-icon="mdi-cancel"
                :disabled="order.order_status !== 'pending'"
              >
                Cancel Order
              </v-btn>
            </v-card-actions>
          </v-card>
        </template>
      </v-col>
    </v-row>
  </v-container>
</template>

<style scoped>
.v-card-title {
  word-break: break-word;
}
</style>
