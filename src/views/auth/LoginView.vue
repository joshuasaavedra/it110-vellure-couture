<script setup>
import LoginForm from '@/components/auth/LoginForm.vue'
</script>

<template>
  <v-app>
    <v-app-bar flat class="navbar-glass px-4">
      <span class="text-white text-h6 font-weight-bold">Vellure Couture</span>
    </v-app-bar>

    <v-main>
      <v-container class="fill-height login-container" fluid>
        <v-row align="center" justify="center">
          <v-col cols="12" sm="8" md="4">
            <v-card class="pa-6 glass-card" rounded="xl" elevation="10">
              <!-- Logo -->
              <div class="text-center mb-4">
                <v-img
                  src="/images/circle-logo.png"
                  alt="Vellure Couture Logo"
                  contain
                  width="80"
                  height="80"
                  class="mx-auto"
                />
              </div>

              <!-- Title -->
              <div class="text-center mb-6">
                <h3 class="font-weight-bold">Welcome to Vellure Couture!</h3>
                <p>Please enter your details to login.</p>
              </div>

              <!-- Login Form -->
              <LoginForm />

              <!-- Bottom -->
              <div class="text-center mt-6">
                <span>Don’t have an account?</span>
                <RouterLink
                  to="/register"
                  class="text-primary font-weight-medium text-decoration-none"
                >
                  Register
                </RouterLink>
              </div>
            </v-card>
          </v-col>
        </v-row>
      </v-container>
    </v-main>

    <v-footer class="footer-glass d-flex justify-center" app>
      2025 - Vellure Couture
    </v-footer>
  </v-app>
</template>

<style scoped>
.login-container {
  background: url('/images/background.jpg') no-repeat center center;
  background-size: cover;
}

.glass-card {
  background: rgba(255, 255, 255, 0.15);
  backdrop-filter: blur(20px);
  -webkit-backdrop-filter: blur(20px);
  border: 1px solid rgba(255, 255, 255, 0.2);
  color: white;
}

.navbar-glass {
  background-color: rgba(0, 77, 64, 0.75) !important;
  color: white;
  backdrop-filter: blur(10px);
}

.footer-glass {
  background-color: rgba(0, 77, 64, 0.75) !important;
  color: white;
  backdrop-filter: blur(10px);
}

@supports not ((-webkit-backdrop-filter: none) or (backdrop-filter: none)) {
  .glass-card {
    background-color: rgba(255, 255, 255, 0.9);
  }
}
</style>
