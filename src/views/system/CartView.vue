<template>
  <v-container class="py-10">
    <h1 class="text-h4 font-weight-bold mb-6">Your Shopping Cart</h1>

    <v-alert type="info" v-if="cartItems.length === 0">
      Your cart is currently empty.
    </v-alert>

    <v-list v-else>
      <v-list-item
        v-for="(item, index) in cartItems"
        :key="index"
        class="mb-4"
      >
        <v-list-item-content>
          <v-list-item-title>{{ item.name }}</v-list-item-title>
          <v-list-item-subtitle>Price: {{ item.price }}</v-list-item-subtitle>
        </v-list-item-content>
        <v-list-item-action>
          <v-btn icon @click="removeItem(index)">
            <v-icon>mdi-delete</v-icon>
          </v-btn>
        </v-list-item-action>
      </v-list-item>
    </v-list>
  </v-container>
</template>

<script setup>
import { ref } from 'vue'

const cartItems = ref([
  { name: 'Luxury Jacket', price: '$250' },
  { name: 'Designer Bag', price: '$500' },
])

function removeItem(index) {
  cartItems.value.splice(index, 1)
}
</script>

