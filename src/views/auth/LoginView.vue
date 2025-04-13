<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()

const theme = ref('light')
const email = ref('')
const password = ref('')

function onClick() {
  theme.value = theme.value === 'light' ? 'dark' : 'light'
}

function handleLogin() {
  if (!email.value || !password.value) {
    alert('Please enter both email and password.')
    return
  }

  // Simulate login logic (replace with real API call if needed)
  console.log('Logging in with:', email.value, password.value)

  // Navigate to homepage
  router.push('/home')
}
</script>

<template>
  <v-responsive class="border rounded">
    <v-app :theme="theme">
      <v-app-bar class="px-3" color="teal-darken-4">
        <v-spacer></v-spacer>
        <v-btn
          :prepend-icon="theme === 'light' ? 'mdi-weather-sunny' : 'mdi-weather-night'"
          text="Toggle Theme"
          slim
          @click="onClick"
        ></v-btn>
      </v-app-bar>

      <v-main>
        <v-container>
          <v-row no-gutters class="d-flex">
            <!-- Login Card -->
            <v-col cols="12" md="6" class="d-flex align-center pa-0">
              <v-card class="mx-auto" elevation="8" outlined>
                <template v-slot:title>
                  <span class="font-weight-black text-teal-darken-4">Welcome to Vellure Couture!</span>
                </template>

                <v-card-text class="bg-surface-light pt-4">
                  <v-form fast-fail @submit.prevent="handleLogin">
                    <v-text-field
                      label="Email"
                      v-model="email"
                      variant="outlined"
                    ></v-text-field>

                    <v-text-field
                      label="Password"
                      type="password"
                      v-model="password"
                      variant="outlined"
                    ></v-text-field>

                    <v-btn class="mt-2" type="submit" block color="teal-darken-4">Login</v-btn>
                  </v-form>

                  <v-divider class="my-5"></v-divider>

                  <h5 class="text-center">
                    Don't have an account? <RouterLink to="/register">Click here to Register</RouterLink>
                  </h5>
                </v-card-text>
              </v-card>
            </v-col>

            <!-- Right-side Image -->
            <v-col cols="12" md="6" class="pa-0">
              <v-img
                src="/images/vellure-couture.png"
                alt="Login Image"
                aspect-ratio="1"
                contain
              ></v-img>
            </v-col>
          </v-row>
        </v-container>
      </v-main>

      <v-footer class="d-flex justify-center" color="teal-darken-4" border app>
        2025 - Vellure Couture
      </v-footer>
    </v-app>
  </v-responsive>
</template>
