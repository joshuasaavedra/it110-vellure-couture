<script setup>
const emit = defineEmits(['close'])
</script>

<template>
  <v-card>
    <!-- Cart Header -->
    <v-toolbar density="compact" color="primary">
      <v-toolbar-title class="text-white">Your Cart</v-toolbar-title>
      <v-spacer></v-spacer>
      <v-btn icon @click="emit('close')">
        <v-icon>mdi-close</v-icon>
      </v-btn>
    </v-toolbar>

    <!-- Cart Items -->
    <v-list class="pa-2">
      <v-list-item v-for="n in 3" :key="n">
        <template v-slot:prepend>
          <v-avatar color="grey-lighten-1" size="60"></v-avatar>
        </template>
        <v-list-item-title>Item {{ n }}</v-list-item-title>
        <v-list-item-subtitle>$19.99</v-list-item-subtitle>
      </v-list-item>
    </v-list>

    <!-- Cart Footer -->
    <v-divider></v-divider>
    <div class="pa-4">
      <div class="d-flex justify-space-between mb-4">
        <span class="text-subtitle-1">Total:</span>
        <span class="text-subtitle-1 font-weight-bold">$59.97</span>
      </div>
      <v-btn block color="primary" class="mb-2">Checkout</v-btn>
      <v-btn block variant="outlined">Clear Cart</v-btn>
    </div>
  </v-card>
</template>

<style scoped></style>
