<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()

const theme = ref('light')
const firstname = ref('')
const lastname = ref('')
const email = ref('')
const phone = ref('')
const password = ref('')
const passwordConfirmation = ref('')

function onClick() {
  theme.value = theme.value === 'light' ? 'dark' : 'light'
}

function handlePhoneInput(event) {
  event.target.value = event.target.value.replace(/[^0-9]/g, '')
}

function handleRegister() {
  // Simple validation example (optional, you can improve this)
  if (!firstname.value || !lastname.value || !email.value || !phone.value || !password.value) {
    alert('Please fill in all required fields.')
    return
  }

  if (password.value !== passwordConfirmation.value) {
    alert('Passwords do not match.')
    return
  }

  // Simulate successful registration
  console.log('User registered:', {
    firstname: firstname.value,
    lastname: lastname.value,
    email: email.value,
    phone: phone.value,
    password: password.value
  })

  // Redirect to login
  router.push('/login')
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
            <!-- Register Card -->
            <v-col cols="12" md="6" class="d-flex align-center pa-0">
              <v-card class="mx-auto" elevation="8" outlined>
                <template v-slot:title>
                  <span class="font-weight-black text-teal-darken-4">Register to Vellure Couture!</span>
                </template>

                <v-card-text class="bg-surface-light pt-4">
                  <v-form fast-fail @submit.prevent="handleRegister">
                    <v-text-field
                      label="Firstname"
                      variant="outlined"
                      v-model="firstname"
                    ></v-text-field>

                    <v-text-field
                      label="Lastname"
                      variant="outlined"
                      v-model="lastname"
                    ></v-text-field>

                    <v-text-field
                      label="Email"
                      variant="outlined"
                      v-model="email"
                    ></v-text-field>

                    <v-text-field
                      label="Phone Number"
                      variant="outlined"
                      type="tel"
                      v-model="phone"
                      @input="handlePhoneInput"
                    ></v-text-field>

                    <v-text-field
                      label="Password"
                      type="password"
                      variant="outlined"
                      v-model="password"
                    ></v-text-field>

                    <v-text-field
                      label="Password confirmation"
                      type="password"
                      variant="outlined"
                      v-model="passwordConfirmation"
                    ></v-text-field>

                    <v-btn class="mt-2" type="submit" block color="teal-darken-4">
                      Register
                    </v-btn>
                  </v-form>

                  <v-divider class="my-5"></v-divider>

                  <h5 class="text-center">
                    <RouterLink to="/login">Click here to Login</RouterLink>
                  </h5>
                </v-card-text>
              </v-card>
            </v-col>

            <!-- Right-side Image -->
            <v-col cols="12" md="6" class="pa-0">
              <v-img
                src="/images/vellure-couture.png"
                alt="Register Image"
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
