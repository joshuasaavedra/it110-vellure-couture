<script setup>
import { ref } from 'vue'
import { useDisplay } from 'vuetify'
const { mobile } = useDisplay()
</script>

<template>
  <v-app>
    <v-app-bar class="navbar-glass px-4 py-1" app fixed>
      <v-row>
        <v-col cols="12" md="12" class="d-flex justify-between align-center" v-if="!mobile">
          <span class="text-white text-h6 font-weight-bold">Vellure Couture</span>
          <v-spacer />
          <!-- Desktop Search Bar -->
          <v-text-field
            placeholder="Search..."
            hide-details
            prepend-inner-icon="mdi-magnify"
            class="search-bar"
            variant="outlined"
          />

          <div class="d-flex align-center" style="gap: 16px">
            <v-btn text class="text-white">Home</v-btn>
            <v-btn text class="text-white">Shop</v-btn>

            <v-btn icon>
              <v-icon>mdi-cart</v-icon>
            </v-btn>

            <v-btn icon>
              <v-icon>mdi-account</v-icon>
            </v-btn>
          </div>
        </v-col>

        <v-col cols="12" sm="12" class="d-flex justify-center align-center" v-if="mobile">
          <!-- Mobile Search Bar -->
          <v-text-field
            placeholder="Search"
            hide-details
            prepend-inner-icon="mdi-magnify"
            class="search-bar"
            variant="solo-filled"
            dense
            clearable
          />
          <v-btn icon size="50">
            <v-icon>mdi-cart</v-icon>
          </v-btn>
        </v-col>
      </v-row>
    </v-app-bar>

    <v-main>
      <v-container fluid class="pt-16">
        <!-- Extra padding to prevent content underlapping the fixed app-bar -->
        <slot name="content" />
      </v-container>
    </v-main>

    <!-- Bottom nav for mobile -->
    <v-bottom-navigation
      v-if="mobile"
      app
      class="navbar-glass mobile-nav py-4 position-fixed bottom-0"
    >
      <v-btn icon size="30">
        <v-icon>mdi-home</v-icon>
      </v-btn>
      <v-btn icon size="30">
        <v-icon>mdi-cart</v-icon>
      </v-btn>
      <v-btn icon size="30">
        <v-icon>mdi-account</v-icon>
      </v-btn>
    </v-bottom-navigation>

    <!-- Footer for desktop -->
    <v-footer class="footer-glass d-flex justify-center" app v-if="!mobile">
      2025 - Vellure Couture
    </v-footer>
  </v-app>
</template>

<style scoped>
.footer-glass {
  background-color: rgba(0, 77, 64, 0.75) !important;
  color: white;
  backdrop-filter: blur(10px);
}

.search-bar {
  max-width: 500px;
  color: white;
}

.navbar-glass {
  background-color: rgba(0, 77, 64, 0.75) !important;
  color: white;
  backdrop-filter: blur(10px);
}
</style>
