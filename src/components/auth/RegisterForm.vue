<script setup>
import { ref } from 'vue'
import {
  requiredValidator,
  emailValidator,
  phoneNumberValidator,
  passwordValidator,
  confirmedValidator,
} from '@/utils/validators'
import { useRegister } from '@/components/composables/auth/register'
import AlertNotification from '@/components/common/AlertNotification.vue'

const isPasswordVisible = ref(false)
const isPasswordConfirmVisible = ref(false)

const { formData, formAction, refVForm, onFormSubmit } = useRegister()
</script>

<template>
  <AlertNotification
    :form-success-message="formAction.formSuccessMessage"
    :form-error-message="formAction.formErrorMessage"
  />

  <v-form ref="refVForm" @submit.prevent="onFormSubmit" lazy-validation>
    <v-text-field
      v-model="formData.firstname"
      label="First Name"
      variant="outlined"
      dense
      class="mb-3"
      :rules="[requiredValidator]"
      hide-details="auto"
    />
    <v-text-field
      v-model="formData.lastname"
      label="Last Name"
      variant="outlined"
      dense
      class="mb-3"
      :rules="[requiredValidator]"
      hide-details="auto"
    />
    <v-text-field
      v-model="formData.email"
      label="Email"
      variant="outlined"
      dense
      class="mb-3"
      :rules="[requiredValidator, emailValidator]"
      hide-details="auto"
      prepend-inner-icon="mdi-email-outline"
    />
    <v-text-field
      v-model="formData.phone"
      label="Phone Number"
      type="tel"
      variant="outlined"
      dense
      class="mb-3"
      :rules="[requiredValidator, phoneNumberValidator]"
      hide-details="auto"
      prepend-inner-icon="mdi-phone-outline"
    />
    <v-text-field
      v-model="formData.password"
      label="Password"
      variant="outlined"
      dense
      class="mb-3"
      prepend-inner-icon="mdi-lock-outline"
      :rules="[requiredValidator, passwordValidator]"
      :type="isPasswordVisible ? 'text' : 'password'"
      :append-inner-icon="isPasswordVisible ? 'mdi-eye-off' : 'mdi-eye'"
      @click:append-inner="isPasswordVisible = !isPasswordVisible"
      hide-details="auto"
    />
    <v-text-field
      v-model="formData.password_confirmation"
      label="Password"
      variant="outlined"
      dense
      class="mb-3"
      prepend-inner-icon="mdi-lock-outline"
      :rules="[
        requiredValidator,
        requiredValidator,
        confirmedValidator(formData.password, formData.password_confirmation),
      ]"
      :type="isPasswordConfirmVisible ? 'text' : 'password'"
      :append-inner-icon="isPasswordConfirmVisible ? 'mdi-eye-off' : 'mdi-eye'"
      @click:append-inner="isPasswordConfirmVisible = !isPasswordConfirmVisible"
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
