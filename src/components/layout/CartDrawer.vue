<script setup>
import { ref } from 'vue'
import { useCartStore } from '@/stores/cartStore'
import CheckoutForm from '@/components/common/checkout/CheckoutForm.vue'

const emit = defineEmits(['close'])
const cartStore = useCartStore()
const showCheckoutForm = ref(false)

const increaseQuantity = (productId) => {
  const item = cartStore.cartItems.find(item => item.id === productId)
  if (item) {
    cartStore.updateQuantity(productId, item.quantity + 1)
  }
}

const decreaseQuantity = (productId) => {
  const item = cartStore.cartItems.find(item => item.id === productId)
  if (item && item.quantity > 1) {
    cartStore.updateQuantity(productId, item.quantity - 1)
  } else {
    cartStore.removeFromCart(productId)
  }
}

const removeItem = (productId) => {
  cartStore.removeFromCart(productId)
}

const clearCart = () => {
  cartStore.clearCart()
}

const openCheckout = () => {
  showCheckoutForm.value = true
}

const closeCheckout = () => {
  showCheckoutForm.value = false
}
</script>

<template>
  <v-card>
    <!-- Cart Header -->
    <v-toolbar density="compact" color="teal-darken-3">
      <v-toolbar-title class="text-white">Your Cart</v-toolbar-title>
      <v-spacer></v-spacer>
      <v-btn icon @click="emit('close')">
        <v-icon>mdi-close</v-icon>
      </v-btn>
    </v-toolbar>

    <!-- Cart Items -->
    <v-list class="pa-2">
      <v-list-item v-if="cartStore.cartItems.length === 0" class="text-center">
        <v-list-item-title>Your cart is empty</v-list-item-title>
      </v-list-item>

      <v-list-item v-for="item in cartStore.cartItems" :key="item.id" class="mb-2">
        <template v-slot:prepend>
          <v-avatar size="60">
            <v-img :src="item.image" cover></v-img>
          </v-avatar>
        </template>

        <v-list-item-title class="text-truncate">{{ item.title }}</v-list-item-title>
        <v-list-item-subtitle class="d-flex align-center mt-1">
          <span class="font-weight-bold">₱{{ item.price }}</span>

          <div class="d-flex align-center ml-auto">
            <v-btn density="compact" icon size="small" @click="decreaseQuantity(item.id)">
              <v-icon>mdi-minus</v-icon>
            </v-btn>

            <span class="mx-2">{{ item.quantity }}</span>

            <v-btn density="compact" icon size="small" @click="increaseQuantity(item.id)">
              <v-icon>mdi-plus</v-icon>
            </v-btn>

            <v-btn density="compact" icon size="small" class="ml-2" color="error" @click="removeItem(item.id)">
              <v-icon>mdi-delete</v-icon>
            </v-btn>
          </div>
        </v-list-item-subtitle>
      </v-list-item>
    </v-list>

    <!-- Cart Footer -->
    <v-divider></v-divider>
    <div class="pa-4">
      <div class="d-flex justify-space-between mb-4">
        <span class="text-subtitle-1">Total ({{ cartStore.totalItems }} items)</span>
        <span class="text-subtitle-1 font-weight-bold">₱{{ cartStore.totalPrice.toFixed(2) }}</span>
      </div>
      <v-btn block color="teal-darken-3" class="mb-2" :disabled="cartStore.cartItems.length === 0" @click="openCheckout">Checkout</v-btn>
      <v-btn block variant="outlined" @click="clearCart" :disabled="cartStore.cartItems.length === 0">Clear Cart</v-btn>
    </div>
  </v-card>

  <!-- Checkout Form Dialog -->
  <v-dialog v-model="showCheckoutForm" max-width="500px">
    <CheckoutForm :show-form="showCheckoutForm" @close="closeCheckout" />
  </v-dialog>
</template>

<style scoped>
.v-list-item {
  border-radius: 8px;
}

.v-list-item:hover {
  background-color: rgba(0, 0, 0, 0.03);
}
</style>
