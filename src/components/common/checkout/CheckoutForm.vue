<script setup>
import { ref, computed } from 'vue'
import { useCartStore } from '@/stores/cartStore'
import { useAuthUserStore } from '@/stores/authUser'
import { useRouter } from 'vue-router'

defineProps({
  showForm: {
    type: Boolean,
    default: false
  }
})

const emit = defineEmits(['close'])

const cartStore = useCartStore()
const authStore = useAuthUserStore()
const router = useRouter()

// Form state
const paymentMethod = ref('credit_card')
const cardNumber = ref('')
const cardName = ref('')
const cardExpiry = ref('')
const cardCvv = ref('')
const isSubmitting = ref(false)
const formError = ref(null)
const orderComplete = ref(false)
const orderId = ref(null)

// Payment methods
const paymentMethods = [
  { value: 'credit_card', label: 'Credit Card' },
  { value: 'debit_card', label: 'Debit Card' },
  { value: 'paypal', label: 'PayPal' },
  { value: 'gcash', label: 'GCash' }
]

// Computed properties
const isLoggedIn = computed(() => !!authStore.userData)
const formValid = computed(() => {
  if (paymentMethod.value === 'credit_card' || paymentMethod.value === 'debit_card') {
    return cardNumber.value && cardName.value && cardExpiry.value && cardCvv.value
  }
  return true
})

// Methods
const closeCheckout = () => {
  emit('close')
}

const placeOrder = async () => {
  if (!isLoggedIn.value) {
    formError.value = 'You must be logged in to place an order'
    return
  }
  
  if (!formValid.value) {
    formError.value = 'Please fill in all required fields'
    return
  }
  
  isSubmitting.value = true
  formError.value = null
  
  try {
    // Create order in Supabase
    const { success, orderId: newOrderId, error } = await cartStore.createOrder()
    
    if (!success) {
      throw new Error(error || 'Failed to create order')
    }
    
    // Process payment
    const paymentDetails = {
      method: paymentMethod.value,
      cardDetails: paymentMethod.value === 'credit_card' || paymentMethod.value === 'debit_card' 
        ? { number: cardNumber.value, name: cardName.value, expiry: cardExpiry.value, cvv: cardCvv.value }
        : null
    }
    
    const { success: paymentSuccess, error: paymentError } = await cartStore.processPayment(paymentDetails)
    
    if (!paymentSuccess) {
      throw new Error(paymentError || 'Payment processing failed')
    }
    
    // Order successful
    orderComplete.value = true
    orderId.value = newOrderId
    
    // Reset form
    cardNumber.value = ''
    cardName.value = ''
    cardExpiry.value = ''
    cardCvv.value = ''
  } catch (error) {
    console.error('Checkout error:', error)
    formError.value = error.message || 'An error occurred during checkout'
  } finally {
    isSubmitting.value = false
  }
}

const viewOrderHistory = () => {
  closeCheckout()
  router.push('/orders')
}
</script>

<template>
  <v-card v-if="showForm" class="checkout-form">
    <v-card-title class="d-flex align-center">
      <span>Checkout</span>
      <v-spacer></v-spacer>
      <v-btn icon @click="closeCheckout">
        <v-icon>mdi-close</v-icon>
      </v-btn>
    </v-card-title>
    
    <v-divider></v-divider>
    
    <v-card-text>
      <!-- Order Summary -->
      <div class="mb-4">
        <h3 class="text-h6 mb-2">Order Summary</h3>
        <v-list>
          <v-list-item v-for="item in cartStore.cartItems" :key="item.id" density="compact">
            <v-list-item-title>{{ item.title }} (x{{ item.quantity }})</v-list-item-title>
            <v-list-item-subtitle class="text-right">₱{{ (item.price * item.quantity).toFixed(2) }}</v-list-item-subtitle>
          </v-list-item>
        </v-list>
        <div class="d-flex justify-space-between align-center mt-2 font-weight-bold">
          <span>Total:</span>
          <span>₱{{ cartStore.totalPrice.toFixed(2) }}</span>
        </div>
      </div>
      
      <!-- Login Warning -->
      <v-alert
        v-if="!isLoggedIn"
        type="warning"
        variant="tonal"
        class="mb-4"
      >
        Please log in to complete your order.
      </v-alert>
      
      <!-- Order Complete Message -->
      <v-alert
        v-if="orderComplete"
        type="success"
        variant="tonal"
        class="mb-4"
      >
        Your order has been placed successfully! Order #{{ orderId }}
      </v-alert>
      
      <!-- Payment Form -->
      <div v-if="!orderComplete">
        <h3 class="text-h6 mb-2">Payment Information</h3>
        
        <v-select
          v-model="paymentMethod"
          :items="paymentMethods"
          item-title="label"
          item-value="value"
          label="Payment Method"
          variant="outlined"
          density="compact"
          class="mb-3"
        ></v-select>
        
        <div v-if="paymentMethod === 'credit_card' || paymentMethod === 'debit_card'">
          <v-text-field
            v-model="cardNumber"
            label="Card Number"
            variant="outlined"
            density="compact"
            placeholder="1234 5678 9012 3456"
            class="mb-2"
          ></v-text-field>
          
          <v-text-field
            v-model="cardName"
            label="Cardholder Name"
            variant="outlined"
            density="compact"
            placeholder="John Doe"
            class="mb-2"
          ></v-text-field>
          
          <div class="d-flex gap-2">
            <v-text-field
              v-model="cardExpiry"
              label="Expiry Date"
              variant="outlined"
              density="compact"
              placeholder="MM/YY"
              class="mb-2"
            ></v-text-field>
            
            <v-text-field
              v-model="cardCvv"
              label="CVV"
              variant="outlined"
              density="compact"
              placeholder="123"
              class="mb-2"
            ></v-text-field>
          </div>
        </div>
        
        <div v-else-if="paymentMethod === 'paypal'">
          <p class="text-body-2 mb-2">You will be redirected to PayPal to complete your payment.</p>
        </div>
        
        <div v-else-if="paymentMethod === 'gcash'">
          <p class="text-body-2 mb-2">You will be redirected to GCash to complete your payment.</p>
        </div>
        
        <v-alert
          v-if="formError"
          type="error"
          variant="tonal"
          class="mb-4"
        >
          {{ formError }}
        </v-alert>
      </div>
    </v-card-text>
    
    <v-card-actions>
      <v-btn
        v-if="!orderComplete"
        color="primary"
        block
        :loading="isSubmitting"
        :disabled="!isLoggedIn || !formValid || isSubmitting"
        @click="placeOrder"
      >
        Place Order
      </v-btn>
      
      <v-btn
        v-else
        color="primary"
        block
        @click="viewOrderHistory"
      >
        View Order History
      </v-btn>
    </v-card-actions>
  </v-card>
</template>

<style scoped>
.checkout-form {
  max-width: 500px;
  margin: 0 auto;
}
</style>
