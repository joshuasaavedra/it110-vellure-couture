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
const registerForm = ref(null)

const required = v => !!v || 'This field is required'

const emailRules = [
  required,
  v => /.+@.+\..+/.test(v) || 'E-mail must be valid'
]

const phoneRules = [
  required,
  v => /^[0-9]{10,15}$/.test(v) || 'Enter a valid phone number'
]

const passwordRules = [
  required,
  v => v.length >= 6 || 'Password must be at least 6 characters'
]

const confirmPasswordRules = [
  required,
  v => v === password.value || 'Passwords do not match'
]

const termsRules = [
  v => !!v || 'You must accept the terms and conditions'
]

function handleRegister() {
  if (registerForm.value?.validate()) {
    console.log('User registered:', {
      firstname: firstname.value,
      lastname: lastname.value,
      email: email.value,
      phone: phone.value,
      password: password.value
    })

    router.push('/login')
  }
}
</script>

<template>
  <v-form ref="registerForm" @submit.prevent="handleRegister">
    <v-text-field
      v-model="firstname"
      label="First Name"
      variant="outlined"
      dense
      class="mb-3"
      :rules="[required]"
    />
    <v-text-field
      v-model="lastname"
      label="Last Name"
      variant="outlined"
      dense
      class="mb-3"
      :rules="[required]"
    />
    <v-text-field
      v-model="email"
      label="Email"
      variant="outlined"
      dense
      class="mb-3"
      :rules="emailRules"
    />
    <v-text-field
      v-model="phone"
      label="Phone Number"
      type="tel"
      variant="outlined"
      dense
      class="mb-3"
      :rules="phoneRules"
    />
    <v-text-field
      v-model="password"
      label="Password"
      type="password"
      variant="outlined"
      dense
      class="mb-3"
      :rules="passwordRules"
    />
    <v-text-field
      v-model="passwordConfirmation"
      label="Confirm Password"
      type="password"
      variant="outlined"
      dense
      class="mb-3"
      :rules="confirmPasswordRules"
    />

    <v-checkbox
      v-model="acceptTerms"
      :rules="termsRules"
      label="I accept the terms and conditions"
      hide-details="auto"
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
</template>
