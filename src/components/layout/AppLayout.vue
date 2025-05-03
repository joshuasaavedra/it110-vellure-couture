<script setup>
import { useDisplay } from 'vuetify'
import ProfileHeader from './ProfileHeader.vue'
import { useAuthUserStore } from '@/stores/authUser'
import { ref, onMounted } from 'vue'
const authStore = useAuthUserStore()
const { mobile } = useDisplay()

//load variables
const isLoggedIn = ref(false)
const isMobileLogged = ref(false)

onMounted(async () => {
  isLoggedIn.value = await authStore.isAuthenticated()
  isMobileLogged.value = mobile.value && isLoggedIn.value
})
</script>

<template>
  <v-app>
    <v-app-bar class="navbar-glass px-2 py-0" app fixed elevation="0" height="56">
      <v-row no-gutters align="center">
        <v-col cols="12" md="12" class="d-flex justify-between align-center" v-if="!mobile">
          <span class="text-white text-h6 font-weight-bold ml-2">
            <i>Vellure Couture</i>
          </span>
          <v-spacer />
          <!-- Desktop Search Bar -->
          <v-text-field
            placeholder="Search..."
            hide-details
            prepend-inner-icon="mdi-magnify"
            class="search-bar mr-2"
            variant="solo-filled"
            density="compact"
            clearable
          />

          <div class="d-flex align-center mr-2" style="gap: 8px">
            <v-btn text class="text-white" size="large">Home</v-btn>
            <v-btn text class="text-white" size="large" to="/shop">Shop</v-btn>

            <v-btn icon size="large">
              <v-icon size="large">mdi-cart</v-icon>
            </v-btn>

            <ProfileHeader v-if="isLoggedIn"></ProfileHeader>
          </div>
        </v-col>

        <v-col cols="12" sm="12" class="d-flex justify-center align-center" v-if="mobile">
          <!-- Mobile Search Bar -->
          <v-text-field
            placeholder="Search"
            hide-details
            prepend-inner-icon="mdi-magnify"
            class="mobile-search-bar"
            variant="solo-filled"
            density="compact"
            clearable
          />
          <v-btn icon size="large" class="mr-2">
            <v-icon size="large">mdi-cart</v-icon>
          </v-btn>
        </v-col>
      </v-row>
    </v-app-bar>

    <v-main class="main-content">
      <v-container fluid class="pa-0">
        <slot name="content" />
      </v-container>
    </v-main>

    <!-- Bottom nav for mobile -->
    <v-bottom-navigation
      v-if="mobile"
      app
      class="navbar-glass mobile-nav position-fixed bottom-0"
      elevation="0"
      height="56"
    >
      <v-btn icon size="large">
        <v-icon>mdi-home</v-icon>
      </v-btn>
      <v-btn icon size="large">
        <v-icon>mdi-cart</v-icon>
      </v-btn>
      <ProfileHeader v-if="isLoggedIn"></ProfileHeader>
    </v-bottom-navigation>

    <!-- Footer for desktop -->
    <v-footer class="footer-glass d-flex justify-center" app v-if="!mobile" elevation="0">
      2025 - Vellure Couture
    </v-footer>
  </v-app>
</template>

<style scoped>
.main-content {
  height: 100vh;
  overflow-y: auto;
  padding-bottom: 56px;
}

.mobile-nav {
  height: 56px;
  padding: 0 !important;
}

.footer-glass {
  background-color: rgba(0, 77, 64, 0.75) !important;
  color: white;
  backdrop-filter: blur(10px);
}

.search-bar {
  max-width: 400px;
  color: white;
  margin-right: 8px;
}

.mobile-search-bar {
  max-width: 250px;
  margin-right: 10px;
  height: 40px;
}

.navbar-glass {
  background-color: rgba(0, 77, 64, 0.75) !important;
  color: white;
  backdrop-filter: blur(10px);
}

:deep(body) {
  overflow: hidden !important;
}
</style>
