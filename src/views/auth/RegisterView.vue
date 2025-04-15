<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()

const firstname = ref('')
const lastname = ref('')
const email = ref('')
const phone = ref('')
const password = ref('')
const passwordConfirmation = ref('')
const acceptTerms = ref(false)

function handlePhoneInput(event) {
  event.target.value = event.target.value.replace(/[^0-9]/g, '')
}

function handleRegister() {
  if (!firstname.value || !lastname.value || !email.value || !phone.value || !password.value) {
    alert('Please fill in all required fields.')
    return
  }

  if (password.value !== passwordConfirmation.value) {
    alert('Passwords do not match.')
    return
  }

  if (!acceptTerms.value) {
    alert('You must accept the terms and conditions.')
    return
  }

  console.log('User registered:', {
    firstname: firstname.value,
    lastname: lastname.value,
    email: email.value,
    phone: phone.value,
    password: password.value
  })

  router.push('/login')
}
</script>

<template>
  <v-app>
    <!-- Navbar -->
    <v-app-bar flat class="navbar-glass px-4">
      <span class="text-white text-h6 font-weight-bold">Vellure Couture</span>
    </v-app-bar>

    <v-main>
      <v-container class="fill-height login-container" fluid>
        <v-row align="center" justify="center">
          <v-col cols="12" sm="8" md="4">
            <!-- Glassmorphic Register Card -->
            <v-card class="pa-6 glass-card" rounded="xl" elevation="10">
              <!-- Logo Image -->
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

              <!-- Title & Subtitle -->
              <div class="text-center mb-6">
                <h3 class="font-weight-bold">Create Your Account</h3>
                <p>Please fill in the form below to register.</p>
              </div>

              <!-- Register Form -->
              <v-form @submit.prevent="handleRegister">
                <v-text-field
                  v-model="firstname"
                  label="First Name"
                  variant="outlined"
                  dense
                  class="mb-3"
                />
                <v-text-field
                  v-model="lastname"
                  label="Last Name"
                  variant="outlined"
                  dense
                  class="mb-3"
                />
                <v-text-field
                  v-model="email"
                  label="Email"
                  variant="outlined"
                  dense
                  class="mb-3"
                />
                <v-text-field
                  v-model="phone"
                  label="Phone Number"
                  type="tel"
                  variant="outlined"
                  dense
                  @input="handlePhoneInput"
                  class="mb-3"
                />
                <v-text-field
                  v-model="password"
                  label="Password"
                  type="password"
                  variant="outlined"
                  dense
                  class="mb-3"
                />
                <v-text-field
                  v-model="passwordConfirmation"
                  label="Confirm Password"
                  type="password"
                  variant="outlined"
                  dense
                  class="mb-3"
                />

                <v-checkbox
                  v-model="acceptTerms"
                  label="I accept the terms and conditions"
                  hide-details
                  density="compact"
                  class="mb-4"
                />

                <v-btn
                  type="submit"
                  block
                  color="#121212"
                  size="default"
                  class="mb-3 text-white"
                  rounded
                >
                  Create Account
                </v-btn>
              </v-form>

              <!-- Already have account -->
              <div class="text-center mt-6">
                <span>Already have an account?</span>
                <RouterLink to="/login" class="text-primary font-weight-medium text-decoration-none">
                  Login
                </RouterLink>
              </div>
            </v-card>
          </v-col>
        </v-row>
      </v-container>
    </v-main>

    <!-- Footer -->
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
