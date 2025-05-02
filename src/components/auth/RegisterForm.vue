<script setup>
import { ref } from 'vue'
import AlertNotification from '@/router/common/AlertNotification.vue'
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
const showTerms = ref(false)

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
    formAction.value.formErrorMessage = error.message
    formAction.value.formStatus = error.status
  } else if (data?.user) {
    formAction.value.formSuccessMessage = 'Successfully Registered Account.'
    registerForm.value.reset()

    setTimeout(() => {
      router.replace('/home')
    }, 1500)
  }

  formAction.value.formProcess = false
}

async function handleRegister() {
  const isValid = await registerForm.value?.validate()
  if (isValid) {
    await onSubmit()
  }
}
</script>

<template>
  <!-- ✅ Single place to handle alerts -->
  <AlertNotification
    :form-success-message="formAction.formSuccessMessage"
    :form-error-message="formAction.formErrorMessage"
  />

  <v-form ref="registerForm" @submit.prevent="handleRegister" lazy-validation>
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
