// src/router/index.js
import { createRouter, createWebHistory } from 'vue-router'

// Auth Views
import LoginView from '@/views/auth/LoginView.vue'
import RegisterView from '@/views/auth/RegisterView.vue'
import HomepageView from '@/views/system/HomepageView.vue'
import ShopPage from '@/views/system/ShopPage.vue'
import UserPage from '@/views/system/UserPage.vue'
import CartView from '@/views/system/CartView.vue' // Import the Cart view

const routes = [
  {
    path: '/',
    name: 'Login',
    component: LoginView,
  },
  {
    path: '/register',
    name: 'Register',
    component: RegisterView,
  },
  {
    path: '/home',
    name: 'Home',
    component: HomepageView,
  },
  {
    path: '/shop',
    name: 'Shop',
    component: ShopPage,
  },
  {
    path: '/user',
    name: 'User',
    component: UserPage,
  },
  {
    path: '/cart',
    name: 'Cart',
    component: CartView,
  },
]

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
})

export default router
