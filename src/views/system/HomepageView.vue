<script setup>
import { ref } from 'vue'

const theme = ref('light')
const drawer = ref(false)  // Sidebar starts hidden

function toggleTheme() {
  theme.value = theme.value === 'light' ? 'dark' : 'light'
}

function toggleDrawer() {
  drawer.value = !drawer.value  // Toggle sidebar visibility
}
</script>

<template>
  <v-app :theme="theme">
    <!-- Sidebar (Navigation Drawer) -->
    <v-navigation-drawer
      v-model="drawer"
      app
      color="teal-darken-4"
      temporary
      hide-overlay
      class="pt-5"
    >
      <v-list dense>
        <v-list-item>
          <v-list-item-content>
            <v-list-item-title class="text-white font-weight-bold">Categories</v-list-item-title>
          </v-list-item-content>
        </v-list-item>

        <v-divider></v-divider>

        <!-- Menu Items -->
        <v-list-item>
          <v-list-item-content>
            <v-list-item-title class="text-white">Men</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
        <v-list-item>
          <v-list-item-content>
            <v-list-item-title class="text-white">Women</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
        <v-list-item>
          <v-list-item-content>
            <v-list-item-title class="text-white">Kids</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
        <v-list-item>
          <v-list-item-content>
            <v-list-item-title class="text-white">Sale</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
        <v-list-item>
          <v-list-item-content>
            <v-list-item-title class="text-white">Create a Design</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>

    <!-- App Bar (Top Navigation) -->
    <v-app-bar color="teal-darken-4" class="px-3">
      <v-toolbar-title class="text-white">Vellure Couture</v-toolbar-title>
      <v-spacer></v-spacer>

      <!-- Menu Icon to Toggle Sidebar -->
      <v-btn icon @click="toggleDrawer">
        <v-icon class="text-white">mdi-menu</v-icon>
      </v-btn>

      <!-- Theme Toggle Button -->
      <v-btn
        :prepend-icon="theme === 'light' ? 'mdi-weather-sunny' : 'mdi-weather-night'"
        text="Toggle Theme"
        slim
        @click="toggleTheme"
      ></v-btn>
    </v-app-bar>

    <!-- Main Content Area -->
    <v-main>
      <v-container class="mt-10">
        <v-row justify="center">
          <v-col cols="12" md="8">
            <v-card elevation="10" class="pa-6">
              <h1 class="text-h4 font-weight-bold text-teal-darken-4 mb-4">Welcome to the Homepage!</h1>
              <p class="text-subtitle-1">
                This is your home screen. You can add dashboard widgets, recent activity, or anything else here.
              </p>
            </v-card>
          </v-col>
        </v-row>
      </v-container>
    </v-main>

    <!-- Footer -->
    <v-footer class="d-flex justify-center" color="teal-darken-4" border app>
      2025 - Vellure Couture
    </v-footer>
  </v-app>
</template>
