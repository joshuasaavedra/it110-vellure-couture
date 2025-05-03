<script setup>
import { useRouter } from 'vue-router'

const router = useRouter()

const goBack = () => {
  router.back()
}

const goHome = () => {
  router.push('/home')
}
</script>

<template>
  <v-container class="d-flex align-center justify-center" style="height: 80vh">
    <v-card max-width="600" class="mx-auto text-center pa-6">
      <v-card-item>
        <v-card-title class="text-h4 mb-4">404 - Page Not Found</v-card-title>
        
        <v-img
          src="https://cdn.vuetifyjs.com/images/cards/sunshine.jpg"
          height="200"
          cover
          class="mb-4 rounded-lg"
        ></v-img>
        
        <v-card-text class="text-body-1">
          <p>Oops! The page you're looking for doesn't exist.</p>
          <p class="mt-2">It might have been moved, deleted, or perhaps never existed in the first place.</p>
        </v-card-text>
      </v-card-item>
      
      <v-card-actions class="justify-center">
        <v-btn
          color="primary"
          variant="outlined"
          class="mr-2"
          @click="goBack"
        >
          Go Back
        </v-btn>
        
        <v-btn
          color="primary"
          @click="goHome"
        >
          Go to Home
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-container>
</template>

<style scoped>
.v-card {
  border-radius: 16px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
}
</style>
