<script setup>
import { ref } from 'vue'
import { supabase, formActionDefault } from '@/utils/supabase.js'
import { useRouter } from 'vue-router'

const router = useRouter()

const firstname = ref(null)
const lastname = ref(null)
const email = ref(null)
const phone = ref(null)
const password = ref(null)
const passwordConfirmation = ref(null)
const acceptTerms = ref(false)
const registerForm = ref(null)

const formAction = ref({ ...formActionDefault })
const showTerms = ref(false) // Initially hidden

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

const onSubmit = async () => {
  formAction.value = { ...formActionDefault }
  formAction.value.formProcess = true

  const { data, error } = await supabase.auth.signUp({
    email: email.value,
    password: password.value,
    options: {
      data: {
        firstname: firstname.value,
        lastname: lastname.value,
      }
    }
  })

  if (error) {
    formAction.value.FormErrorMessage = error.message
    formAction.value.formStatus = error.status
  } else if (data) {
    formAction.value.formSuccessMessage = 'Successfully Registered Account.'
    showTerms.value = true // Show checkbox after success
    setTimeout(() => {
      router.push('/home')
    }, 2000)
  }

  formAction.value.formProcess = false
}

function handleRegister() {
  if (registerForm.value?.validate()) {
    onSubmit()
  }
}
</script>

<template>
  <v-form ref="registerForm" @submit.prevent="handleRegister" lazy-validation>
    <!-- Success Alert -->
    <v-alert
      v-if="formAction.formSuccessMessage && formAction.formSuccessMessage.trim() !== ''"
      type="success"
      class="mb-3"
      border="start"
      variant="outlined"
      elevation="1"
    >
      {{ formAction.formSuccessMessage }}
    </v-alert>

    <!-- Error Alert -->
    <v-alert
      v-if="formAction.FormErrorMessage"
      type="error"
      class="mb-3"
      border="start"
      variant="outlined"
      elevation="1"
    >
      {{ formAction.FormErrorMessage }}
    </v-alert>

    <!-- Form Fields -->
    <v-text-field
      v-model="firstname"
      label="First Name"
      variant="outlined"
      dense
      class="mb-3"
      :rules="[required]"
      hide-details="auto"
    />
    <v-text-field
      v-model="lastname"
      label="Last Name"
      variant="outlined"
      dense
      class="mb-3"
      :rules="[required]"
      hide-details="auto"
    />
    <v-text-field
      v-model="email"
      label="Email"
      variant="outlined"
      dense
      class="mb-3"
      :rules="emailRules"
      hide-details="auto"
    />
    <v-text-field
      v-model="phone"
      label="Phone Number"
      type="tel"
      variant="outlined"
      dense
      class="mb-3"
      :rules="phoneRules"
      hide-details="auto"
    />
    <v-text-field
      v-model="password"
      label="Password"
      type="password"
      variant="outlined"
      dense
      class="mb-3"
      :rules="passwordRules"
      hide-details="auto"
    />
    <v-text-field
      v-model="passwordConfirmation"
      label="Confirm Password"
      type="password"
      variant="outlined"
      dense
      class="mb-3"
      :rules="confirmPasswordRules"
      hide-details="auto"
    />

    <!-- Terms Checkbox (only after successful registration) -->
    <v-checkbox
      v-if="showTerms"
      v-model="acceptTerms"
      :rules="termsRules"
      label="I accept the terms and conditions"
      hide-details="auto"
      density="compact"
      class="mb-4"
    />

    <!-- Submit Button -->
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
      Create Account
    </v-btn>
  </v-form>
</template>
