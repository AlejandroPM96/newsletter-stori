import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useAuthStore = defineStore('auth', () => {
  const isAuthenticated = ref(false)
  const hardcodedEmail = 'user@example.com'
  const hardcodedPassword = 'password123'

  function login(email: string, password: string) {
    console.log('comparing')
    console.log(email, password)
    if (email === hardcodedEmail && password === hardcodedPassword) {
      isAuthenticated.value = true
    } else {
      isAuthenticated.value = false
      throw new Error('Invalid email or password')
    }
  }

  function logout() {
    isAuthenticated.value = false
  }

  return { isAuthenticated, login, logout }
})
