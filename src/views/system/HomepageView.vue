<script setup>
import AppLayout from '@/components/layout/AppLayout.vue'
</script>

<template>
  <AppLayout>
    <template #content>
      <div class="main-banner d-flex align-center justify-end">
        <div class="text-right banner-content">
          <p class="text-caption text-dark-green mb-2">Winter Collection</p>
          <h1 class="display-1 font-weight-bold text-dark-green mb-4">
            Get up to 30% Off New Arrivals
          </h1>
          <v-btn class="shop-now-btn text-white font-weight-bold" rounded @click="goTo('/shop')">
            Shop Now
          </v-btn>
        </div>
      </div>

      <div class="text-center pt-12 pb-6">
        <h2 class="luxury-title">The World of Luxury</h2>
        <p class="luxury-subtitle">Explore our collections, iconic accessories, women and men</p>
      </div>

      <v-container class="py-10">
        <v-row justify="center" spacing="16">
          <v-col cols="12" md="4">
            <div class="image-box">
              <v-img
                src="/images/women-clothing.jpg"
                alt="Women Collection"
                height="300px"
                class="rounded-lg"
                cover
              />
              <div class="centered-text">Women</div>
            </div>
          </v-col>

          <v-col cols="12" md="4">
            <div class="image-box">
              <v-img
                src="/images/accessories.jpg"
                alt="Accessories Collection"
                height="300px"
                class="rounded-lg"
                cover
              />
              <div class="centered-text">Accessories</div>
            </div>
          </v-col>

          <v-col cols="12" md="4">
            <div class="image-box">
              <v-img
                src="/images/men-clothing.jpg"
                alt="Men Collection"
                height="300px"
                class="rounded-lg"
                cover
              />
              <div class="centered-text">Men</div>
            </div>
          </v-col>
        </v-row>
      </v-container>
    </template>
  </AppLayout>
</template>

<style scoped>
.main-banner {
  background: url('/images/clothing-bg.jpg') no-repeat center center;
  background-size: cover;
  width: 100%;
  height: 100vh;
}

.banner-content {
  max-width: 90%;
  padding: 0 24px;
  color: white;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: flex-end;
}

.text-dark-green {
  color: #003129 !important;
}

.shop-now-btn {
  background-color: #333 !important;
  color: white !important;
  padding: 10px 20px;
  font-size: 1rem;
  font-weight: bold;
  text-transform: uppercase;
  border-radius: 15px;
  transition: background-color 0.3s ease;
}
.shop-now-btn:hover {
  background-color: #555 !important;
}

.luxury-title {
  font-size: 2.5rem;
  font-weight: 700;
  color: #003129;
  font-family: 'Playfair Display', serif;
}
.luxury-subtitle {
  font-size: 1.1rem;
  color: #003129;
  font-family: 'Raleway', sans-serif;
}

.image-box {
  position: relative;
}
.centered-text {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  color: white;
  font-size: 2rem;
  font-weight: bold;
  text-shadow: 2px 2px 6px rgba(0, 0, 0, 0.6);
}
</style>
