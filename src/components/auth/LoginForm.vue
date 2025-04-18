<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()
const email = ref('')
const password = ref('')
const loginForm = ref(null)

const emailRules = [
  v => !!v || 'Email is required',
  v => /.+@.+\..+/.test(v) || 'E-mail must be valid'
]

const passwordRules = [
  v => !!v || 'Password is required',
  v => v.length >= 6 || 'Password must be at least 6 characters'
]

function handleLogin() {
  if (loginForm.value?.validate()) {
    console.log('Logging in with:', email.value, password.value)
    router.push('/home')
  }
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
  <v-form ref="loginForm" @submit.prevent="handleLogin">
    <v-text-field
      v-model="email"
      label="Email"
      placeholder="@uxintace.com"
      :rules="emailRules"
      variant="outlined"
      dense
      class="mb-4"
    />

    <v-text-field
      v-model="password"
      label="Password"
      type="password"
      :rules="passwordRules"
      variant="outlined"
      dense
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
  </v-form>
</template>
