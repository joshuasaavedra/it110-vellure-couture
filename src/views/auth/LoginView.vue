<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()

const email = ref('')
const password = ref('')

function handleLogin() {
  if (!email.value || !password.value) {
    alert('Please enter both email and password.')
    return
  }

  console.log('Logging in with:', email.value, password.value)
  router.push('/home')
}

function loginWithApple() {
  console.log('Redirecting to Apple login...')
  router.push('/auth/apple')
}

function loginWithGoogle() {
  console.log('Redirecting to Google login...')
  router.push('/auth/google')
}
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
              <div class="text-center mb-4">
                <v-img
                  src="/images/circle-logo.png"
                  alt="Vellure Couture Logo"
                  contain
                  width="80"
                  height="80"
                  class="mx-auto"
                ></v-img>
              </div>

              <div class="text-center mb-6">
                <h3 class="font-weight-bold">Welcome to Vellure Couture!</h3>
                <p>Please enter your details to login.</p>
              </div>

              <v-form @submit.prevent="handleLogin">
                <v-text-field
                  v-model="email"
                  label="Email"
                  placeholder="@uxintace.com"
                  variant="outlined"
                  dense
                  hide-details
                  class="mb-4"
                />

                <v-text-field
                  v-model="password"
                  label="Password"
                  type="password"
                  variant="outlined"
                  dense
                  hide-details
                  class="mb-2"
                />

                <div class="d-flex justify-space-between align-center mb-4">
                  <RouterLink to="#" class="text-primary text-decoration-none">Forgot password?</RouterLink>
                  <v-checkbox label="Remember me" hide-details density="compact" class="ma-0 pa-0" />
                </div>

                <v-btn
                  type="submit"
                  block
                  color="#121212"
                  size="default"
                  class="mb-3 text-white"
                  rounded
                >
                  Login
                </v-btn>
              </v-form>

              <div class="text-center mb-2 text-caption">OR</div>
              <div class="d-flex justify-space-between mb-3" style="gap: 8px;">
                <v-btn
                  variant="outlined"
                  color="grey"
                  @click="loginWithApple"
                  style="border-radius: 12px; min-width: 0; padding: 0 12px; font-size: 0.8rem;"
                  class="flex-grow-1"
                >
                  <v-icon start size="20">mdi-apple</v-icon>
                </v-btn>

                <v-btn
                  variant="outlined"
                  color="grey"
                  @click="loginWithGoogle"
                  style="border-radius: 12px; min-width: 0; padding: 0 12px; font-size: 0.8rem;"
                  class="flex-grow-1"
                >
                  <v-icon start size="20">mdi-google</v-icon>
                </v-btn>
              </div>

              <div class="text-center mt-6">
                <span>Don’t have an account?</span>
                <RouterLink to="/register" class="text-primary font-weight-medium text-decoration-none">
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
