<template>
  <nav class="navbar">
    <div class="navbar-logo">
      <img src="@/assets/logo.png" alt="Logo" />
    </div>
    <div class="navbar-links">
      <router-link to="/home">Home</router-link>
      <router-link to="/about">About</router-link>
      <button @click="logout" v-if="isAuthenticated" class="logout-button">Log out</button>
      <router-link to="/login" v-if="!isAuthenticated">Log in</router-link>
    </div>
  </nav>
</template>

<script>
import { useAuthStore } from '@/stores/auth'
import { ref, computed } from 'vue'
import { useRouter } from 'vue-router'
export default {
  name: 'AppNavbar',
  setup() {
    const router = useRouter()
    const authStore = useAuthStore()
    const isAuthenticated = computed(() => authStore.isAuthenticated)

    function logout() {
      authStore.logout()
      router.push({ name: 'login' })
    }

    return { isAuthenticated, logout }
  }
}
</script>
<style scoped>
.navbar {
  margin: 0px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1rem 2rem;
  background-color: #0072ff;
  color: white;
}

.navbar-logo img {
  height: 70px;
}

.navbar-links {
  display: flex;
  gap: 1rem;
}

.navbar-links a {
  color: white;
  text-decoration: none;
  font-weight: bold;
}

.navbar-links button,
.navbar-links a {
  background: none;
  border: none;
  cursor: pointer;
}

.navbar-links button.logout-button {
  background-color: #ff4500; /* Adjust color as needed */
  color: white;
  padding: 0.5rem 1rem;
  border-radius: 5px;
  transition: background-color 0.3s;
}

.navbar-links button.logout-button:hover {
  background-color: #ff6347; /* Adjust color as needed */
}
</style>
