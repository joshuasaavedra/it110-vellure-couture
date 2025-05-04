<script setup>
import { useDisplay } from 'vuetify'
import ProfileHeader from './ProfileHeader.vue'
import CartDrawer from './CartDrawer.vue'
import { useAuthUserStore } from '@/stores/authUser'
import { useCartStore } from '@/stores/cartStore'
import { useSearchStore } from '@/stores/searchStore'
import { useRouter } from 'vue-router'
import { ref, onMounted } from 'vue'
const authStore = useAuthUserStore()
const cartStore = useCartStore()
const searchStore = useSearchStore()
const router = useRouter()
const { mobile } = useDisplay()

// Search functionality
const searchInput = ref('')
const mobileSearchInput = ref('')

const handleSearch = (input) => {
  if (!input.trim()) return

  // Set search query in store
  searchStore.setSearchQuery(input.trim())

  // Navigate to search results page with query parameter
  router.push({
    name: 'SearchResults',
    query: { q: input.trim() },
  })

  // Clear input fields after search
  searchInput.value = ''
  mobileSearchInput.value = ''
}

// Initialize cart drawer as closed
const cartDrawer = ref(false)

//load variables
const isLoggedIn = ref(false)
const isMobileLogged = ref(false)

const getLoggedStatus = async () => {
  isLoggedIn.value = await authStore.isAuthenticated()
  isMobileLogged.value = mobile.value && isLoggedIn.value
}

const toggleCartDrawer = () => {
  cartDrawer.value = !cartDrawer.value
}

// Load Functions during component rendering
onMounted(() => {
  getLoggedStatus()
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
            v-model="searchInput"
            placeholder="Search..."
            hide-details
            prepend-inner-icon="mdi-magnify"
            class="search-bar mr-2"
            variant="solo-filled"
            density="compact"
            clearable
            @keyup.enter="handleSearch(searchInput)"
          >
          </v-text-field>

          <div class="d-flex align-center mr-2" style="gap: 8px">
            <v-btn text class="text-white" size="large" to="/home">Home</v-btn>
            <v-btn text class="text-white" size="large" to="/shop">Shop</v-btn>

            <!-- Cart Button -->
            <v-btn icon variant="text" @click="toggleCartDrawer" size="large">
              <v-badge
                :content="cartStore.totalItems"
                :value="cartStore.totalItems"
                color="error"
                floating
              >
                <v-icon size="large">mdi-cart</v-icon>
              </v-badge>
            </v-btn>

            <ProfileHeader v-if="isLoggedIn"></ProfileHeader>
          </div>
        </v-col>

        <v-col cols="12" sm="12" class="d-flex justify-center align-center" v-if="mobile">
          <!-- Mobile Search Bar -->
          <v-text-field
            v-model="mobileSearchInput"
            placeholder="Search"
            hide-details
            prepend-inner-icon="mdi-magnify"
            class="mobile-search-bar"
            variant="solo-filled"
            density="compact"
            clearable
            @keyup.enter="handleSearch(mobileSearchInput)"
          >
          </v-text-field>
          <!-- Cart Button -->
          <v-btn icon variant="text" @click="toggleCartDrawer" size="large">
            <v-badge
              :content="cartStore.totalItems"
              :value="cartStore.totalItems"
              color="error"
              floating
            >
              <v-icon size="large">mdi-cart</v-icon>
            </v-badge>
          </v-btn>
        </v-col>
      </v-row>
    </v-app-bar>

    <!-- Cart Drawer (works on both desktop and mobile) -->

    <v-navigation-drawer
      v-model="cartDrawer"
      :location="mobile ? 'bottom' : 'right'"
      temporary
      width="350"
      :height="mobile ? '100vh' : 'auto'"
      class="rounded-lg"
      :disabled="!cartDrawer"
    >
      <CartDrawer @close="toggleCartDrawer" />
    </v-navigation-drawer>

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
      <v-btn icon size="large" to="/home">
        <v-icon size="large">mdi-home</v-icon>
      </v-btn>
      <v-btn icon size="large" to="/shop">
        <v-icon size="large">mdi-store</v-icon>
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
  background-image: url('/images/Green.jpg');
  background-size: cover;
  background-position: center;
  color: white;
  backdrop-filter: blur(5px);
}

:deep(body) {
  overflow: hidden !important;
}
</style>
