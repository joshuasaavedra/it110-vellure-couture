// src/router/index.js
import { createRouter, createWebHistory } from 'vue-router'
import { supabase } from '@/utils/supabase'

// Auth Views
import LoginView from '@/views/auth/LoginView.vue'
import RegisterView from '@/views/auth/RegisterView.vue'
import HomepageView from '@/views/system/HomepageView.vue'
import ShopPage from '@/views/system/ShopPage.vue'
import OrderHistoryView from '@/views/OrderHistoryView.vue'
import SearchResultsView from '@/views/SearchResultsView.vue'

// Error Views
import NotFoundView from '@/views/errors/NotFoundView.vue'
import ForbiddenView from '@/views/errors/ForbiddenView.vue'

const routes = [
  {
    path: '/',
    name: 'Login',
    component: LoginView,
    meta: { requiresAuth: false }
  },
  {
    path: '/register',
    name: 'Register',
    component: RegisterView,
    meta: { requiresAuth: false }
  },
  {
    path: '/home',
    name: 'Home',
    component: HomepageView,
    meta: { requiresAuth: true }
  },
  {
    path: '/shop',
    name: 'Shop',
    component: ShopPage,
    meta: { requiresAuth: true }
  },
  {
    path: '/orders',
    name: 'OrderHistory',
    component: OrderHistoryView,
    meta: { requiresAuth: true }
  },
  {
    path: '/search',
    name: 'SearchResults',
    component: SearchResultsView,
    meta: { requiresAuth: true }
  },
  {
    path: '/forbidden',
    name: 'Forbidden',
    component: ForbiddenView,
    meta: { requiresAuth: false }
  },
  {
    // Catch-all route for 404 Not Found
    path: '/:pathMatch(.*)*',
    name: 'NotFound',
    component: NotFoundView,
    meta: { requiresAuth: false }
  },
]

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
})

// Navigation guard to check authentication
router.beforeEach(async (to, from, next) => {
  // Check if the route requires authentication
  const requiresAuth = to.matched.some(record => record.meta.requiresAuth)
  
  if (requiresAuth) {
    // Check if user is authenticated
    const { data } = await supabase.auth.getSession()
    const isAuthenticated = !!data.session
    
    if (!isAuthenticated) {
      // If not authenticated, redirect to login page
      next({ name: 'Login' })
    } else {
      // If authenticated, proceed
      next()
    }
  } else {
    // Route doesn't require authentication, proceed
    next()
  }
})

export default router
