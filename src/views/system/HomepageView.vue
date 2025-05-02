<script setup>
import { useRouter } from 'vue-router'
import { ref } from 'vue'

const router = useRouter()
const searchQuery = ref('')

function goTo(page) {
  router.push(page)
}

function search() {
  if (searchQuery.value.trim()) {
    router.push(`/search?query=${encodeURIComponent(searchQuery.value.trim())}`)
  }
}
</script>

<template>
  <v-app>
    <v-app-bar flat class="navbar-glass px-4">
      <span class="text-white text-h6 font-weight-bold">Vellure Couture</span>

      <v-spacer />

      <!-- Search Bar -->
      <v-text-field
        v-model="searchQuery"
        placeholder="Search..."
        hide-details
        dense
        solo-inverted
        flat
        prepend-inner-icon="mdi-magnify"
        class="search-bar"
        @keyup.enter="search"
      />

      <div class="d-flex align-center" style="gap: 16px;">
        <v-btn text class="text-white" @click="goTo('/home')">Home</v-btn>
        <v-btn text class="text-white" @click="goTo('/shop')">Shop</v-btn>

        <v-btn icon @click="goTo('/cart')">
          <v-img
            src="/public/images/cart.png"
            alt="Cart"
            width="28"
            height="28"
            contain
          />
        </v-btn>

        <v-btn icon @click="goTo('/user')">
          <v-img
            src="/public/images/user.png"
            alt="User"
            width="28"
            height="28"
            contain
          />
        </v-btn>
      </div>
    </v-app-bar>

    <v-main class="main-banner d-flex align-center justify-end">
      <div class="text-right banner-content">
        <p class="text-caption text-dark-green mb-2">Winter Collection</p>
        <h1 class="display-1 font-weight-bold text-dark-green mb-4">
          Get up to 30% Off New Arrivals
        </h1>
        <v-btn
          class="shop-now-btn text-white font-weight-bold"
          rounded
          @click="goTo('/shop')"
        >
          Shop Now
        </v-btn>
      </div>
    </v-main>

    <v-container class="text-center pt-12 pb-6">
      <h2 class="luxury-title">The World of Luxury</h2>
      <p class="luxury-subtitle">Explore our collections, iconic accessories, women and men</p>
    </v-container>

    <v-container class="pb-10">
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

    <v-footer class="footer-glass d-flex justify-center" app>
      2025 - Vellure Couture
    </v-footer>
  </v-app>
</template>

<style scoped>
.navbar-glass {
  background-color: rgba(0, 77, 64, 0.75) !important;
  color: white;
  backdrop-filter: blur(10px);
}

.footer-glass {
  background-color: rgba(0, 77, 64, 0.75) !important;
  color: white;
  backdrop-filter: blur(10px);
}

.main-banner {
  background: url('/images/clothing-bg.jpg') no-repeat center center;
  background-size: cover;
  height: 60vh;
  width: 100%;
  position: relative;
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

.search-bar {
  max-width: 500px;
  color: white;
}
</style>
