// import './assets/main.css'

import { createApp } from 'vue'
import { createPinia } from 'pinia'

// Vuetify
import '@mdi/font/css/materialdesignicons.css'
import 'vuetify/styles'
import { createVuetify } from 'vuetify'
import * as components from 'vuetify/components'
import * as directives from 'vuetify/directives'

import App from './App.vue'
import router from './router'

// Log the Supabase environment variables to verify they are correctly loaded
console.log('Supabase URL:', import.meta.env.VITE_SUPABASE_URL)
console.log('Supabase Anon Key:', import.meta.env.VITE_SUPABASE_ANON_KEY)

// Check if the environment variables are correctly set
if (!import.meta.env.VITE_SUPABASE_URL || !import.meta.env.VITE_SUPABASE_ANON_KEY) {
  console.error('Supabase environment variables are missing or incorrect.')
}

const app = createApp(App)

const vuetify = createVuetify({
  icons: {
    defaultSet: 'mdi', // This is already the default value - only for display purposes
  },
  components,
  directives,
})

app.use(createPinia())
app.use(router)
app.use(vuetify)

app.mount('#app')
