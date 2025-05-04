<script setup>
import { useRouter } from 'vue-router'

const router = useRouter()

const goBack = () => {
  router.back()
}

const goLogin = () => {
  router.push('/')
}
</script>

<template>
  <v-container class="d-flex align-center justify-center" style="height: 80vh">
    <v-card max-width="600" class="mx-auto text-center pa-6">
      <v-card-item>
        <v-card-title class="text-h4 mb-4">403 - Access Forbidden</v-card-title>
        
        <v-img
          src="https://cdn.vuetifyjs.com/images/cards/docks.jpg"
          height="200"
          cover
          class="mb-4 rounded-lg"
        ></v-img>
        
        <v-card-text class="text-body-1">
          <p>Sorry, you don't have permission to access this page.</p>
          <p class="mt-2">Please log in with appropriate credentials or contact the administrator if you believe this is an error.</p>
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
          @click="goLogin"
        >
          Go to Login
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
