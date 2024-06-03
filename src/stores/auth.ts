import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useAuthStore = defineStore('auth', () => {
  const isAuthenticated = ref(false)
  const hardcodedEmail = 'admin@example.com'
  const hardcodedPassword = import.meta.env.VITE_USER_PASSWORD

  function login(email: string, password: string) {
    console.log(hardcodedPassword)
    console.log(password)
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
