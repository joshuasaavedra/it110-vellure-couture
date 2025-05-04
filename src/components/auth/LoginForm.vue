<script setup>
import { requiredValidator, emailValidator } from '@/utils/validators'
import { useLogin } from '@/components/composables/auth/login'
import AlertNotification from '@/components/common/AlertNotification.vue'
import { ref } from 'vue'

const { formData, formAction, refVForm, onFormSubmit } = useLogin()
const isPasswordVisible = ref(false)
</script>

<template>
  <AlertNotification
    :form-success-message="formAction.formSuccessMessage"
    :form-error-message="formAction.formErrorMessage"
  ></AlertNotification>
  <v-form ref="refVForm" @submit.prevent="onFormSubmit">
    <v-text-field
      v-model="formData.email"
      label="Email"
      prepend-inner-icon="mdi-email-outline"
      :rules="[requiredValidator, emailValidator]"
      variant="outlined"
      type="email"
      dense
      class="mb-4"
    />

    <v-text-field
      v-model="formData.password"
      label="Password"
      :type="isPasswordVisible ? 'text' : 'password'"
      prepend-inner-icon="mdi-lock-outline"
      :rules="[requiredValidator]"
      variant="outlined"
      dense
      class="mb-2"
      @click:append-inner="isPasswordVisible = !isPasswordVisible"
      :append-inner-icon="isPasswordVisible ? 'mdi-eye-off-outline' : 'mdi-eye-outline'"
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
