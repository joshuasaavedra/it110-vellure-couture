// src/stores/authUser.js
import { defineStore } from 'pinia'
import { supabase } from '@/utils/supabase'

export const useAuthUserStore = defineStore('authUser', {
  state: () => ({
    userData: {}
  }),
  actions: {
    async fetchUserData() {
      const { data: { user } } = await supabase.auth.getUser()
      if (user) {
        this.userData = {
          email: user.email,
          firstname: user.user_metadata?.firstname || '',
          lastname: user.user_metadata?.lastname || '',
          image_url: user.user_metadata?.image_url || ''
        }
      }
    },
    $reset() {
      this.userData = {}
    }
  }
})
