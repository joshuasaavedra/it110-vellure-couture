<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { supabase } from '@/utils/supabase.js'

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

const formAction = ref({
  formProcess: false,
  formErrorMessage: ''
})

async function handleLogin() {
  formAction.value.formErrorMessage = ''
  formAction.value.formProcess = true

  if (loginForm.value?.validate()) {
    const { error } = await supabase.auth.signInWithPassword({
      email: email.value,
      password: password.value,
    })

    if (error) {
      const rawMsg = error.message.toLowerCase()

      if (rawMsg.includes('invalid login credentials')) {
        formAction.value.formErrorMessage = 'Incorrect email or password.'
      } else if (rawMsg.includes('email')) {
        formAction.value.formErrorMessage = 'Please enter a valid email address.'
      } else if (rawMsg.includes('password')) {
        formAction.value.formErrorMessage = 'Password is incorrect or missing.'
      } else {
        formAction.value.formErrorMessage = 'Something went wrong. Please try again.'
      }
    } else {
      console.log('Logged in successfully')

// Optional: Wait a moment to show success feedback (if any)
setTimeout(() => {
  router.replace('/home') // replace() avoids the login page staying in browser history
}, 500)

    }
  }

  formAction.value.formProcess = false
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
      :disabled="formAction.formProcess"
      :loading="formAction.formProcess"
    >
      Login
    </v-btn>

    <div v-if="formAction.formErrorMessage" class="text-center mb-2 text-caption text-red">
      {{ formAction.formErrorMessage }}
    </div>

  </v-form>
</template>
