<script setup>
import { ref } from 'vue'
import AppLayout from '@/components/layout/AppLayout.vue'
import { useDisplay } from 'vuetify'

const { mobile } = useDisplay()

const collections = ref([
  {
    title: 'Women',
    image: '/images/women-clothing.jpg',
    route: '/shop/women'
  },
  {
    title: 'Men',
    image: '/images/men-clothing.jpg',
    route: '/shop/men'
  },
  {
    title: 'Accessories',
    image: '/images/accessories.jpg',
    route: '/shop/accessories'
  }
])

const goTo = (route) => {
  // Implement navigation logic
  console.log(`Navigating to ${route}`)
}

const goToCollection = (route) => {
  // Implement collection navigation logic
  console.log(`Navigating to collection ${route}`)
}
</script>

<template>
  <AppLayout>
    <template #content>
      <v-container fluid class="pa-0">
        <v-row no-gutters>
          <v-col cols="12">
            <div
              class="main-banner position-relative d-flex align-center"
              :class="mobile ? 'justify-center px-4' : 'justify-end px-8 '"
            >
              <div
                class="banner-content text-center"
                :class="mobile ? 'text-center w-100' : 'text-right'"
              >
                <v-chip
                  color="primary"
                  variant="elevated"
                  class="mb-3"
                >
                  Winter Collection
                </v-chip>
                <h1
                  class="text-h4 text-md-h2 font-weight-bold text-dark-green mb-4"
                  :class="mobile ? 'text-center' : 'text-right'"
                >
                  Elevate Your Style
                  <br>
                  Up to 30% Off New Arrivals
                </h1>
                <div
                  class="d-flex"
                  :class="mobile ? 'justify-center' : 'justify-end'"
                >
                  <v-btn
                    color="primary"
                    size="large"
                    rounded="xl"
                    class="shop-now-btn text-white font-weight-bold"
                    @click="goTo('/shop')"
                  >
                    Shop Now
                    <v-icon end>mdi-arrow-right</v-icon>
                  </v-btn>
                </div>
              </div>
            </div>
          </v-col>
        </v-row>

        <v-container class="py-12">
          <v-row class="text-center">
            <v-col cols="12">
              <h2 class="text-h4 text-md-h3 font-weight-bold mb-4">
                The World of Luxury
              </h2>
              <p class="text-subtitle-1 text-medium-emphasis">
                Explore our curated collections, iconic accessories, and timeless designs
              </p>
            </v-col>
          </v-row>

          <v-row justify="center" class="mt-8" :class="{ 'flex-column': $vuetify.display.smAndDown }">
            <v-col
              v-for="(collection, index) in collections"
              :key="index"
              cols="12"
              md="4"
              class="mb-4"
            >
              <v-card
                elevation="6"
                class="collection-card"
                @click="goToCollection(collection.route)"
              >
                <v-img
                  :src="collection.image"
                  :alt="collection.title"
                  height="350"
                  cover
                  class="collection-image"
                >
                  <div class="collection-overlay d-flex align-end justify-center">
                    <v-card-title class="text-white text-center pb-4">
                      {{ collection.title }}
                    </v-card-title>
                  </div>
                </v-img>
              </v-card>
            </v-col>
          </v-row>
          <v-col cols="12" md="12" class="footer-glass d-flex justify-center" v-if="mobile" elevation="0">
      2025 - Vellure Couture
    </v-col>
        </v-container>
      </v-container>
    </template>
  </AppLayout>
</template>

<style scoped>
.main-banner {
  background: linear-gradient(45deg, rgba(0,0,0,0.5), transparent);
  min-height: 100vh;
  background-image: url('/images/clothing-bg.jpg');
  background-size: cover;
  background-position: center;
  margin-top: -64px; /* Offset the AppBar height */
  padding-top: 64px; /* Compensate for the negative margin */
}

.banner-content {
  max-width: 600px;
  padding: 0 16px;
}

@media (max-width: 600px) {
  .main-banner {
    min-height: 50vh;
    background-size: cover;
    margin-top: -56px; /* Adjust for mobile AppBar height */
    padding-top: 56px;
  }

  .banner-content {
    max-width: 100%;
  }
}

.collection-card {
  transition: transform 0.3s ease;
  cursor: pointer;
}

.collection-card:hover {
  transform: scale(1.05);
}

.collection-image {
  position: relative;
}

.collection-overlay {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: linear-gradient(to bottom, transparent 50%, rgba(0,0,0,0.7));
}
.footer-glass {
  background-color: rgba(0, 77, 64, 0.75) !important;
  color: white;
  backdrop-filter: blur(10px);
}
</style>
