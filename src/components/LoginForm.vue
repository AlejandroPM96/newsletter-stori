<template>
  <div class="login-container">
    <form class="login-form" @submit.prevent="handleSubmit">
      <h2>Login</h2>
      <div class="form-group">
        <input type="text" v-model="email" placeholder="Username" class="form-control" />
      </div>
      <div class="form-group">
        <input type="password" v-model="password" placeholder="Password" class="form-control" />
      </div>
      <button type="submit" class="submit-button">Login</button>
      <div v-if="error" class="error">{{ error }}</div>
    </form>
  </div>
</template>

<script>
import { ref } from 'vue'
import { useAuthStore } from '@/stores/auth'
import { useRouter } from 'vue-router'

export default {
  name: 'LoginForm',
  setup() {
    const authStore = useAuthStore()
    const router = useRouter()
    const email = ref('')
    const password = ref('')
    const error = ref(null)

    function handleSubmit() {
      try {
        console.log('doing submit')
        console.log(email, password)
        authStore.login(email.value, password.value)

        error.value = null
        router.push({ name: 'home' })
      } catch (err) {
        error.value = err.message
      }
    }

    return { email, password, handleSubmit, error }
  }
}
</script>

<style scoped>
.error {
  color: red;
}

.login-container {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  background: linear-gradient(to right, #00c6ff, #0072ff);
}

.login-form {
  background: white;
  padding: 2rem;
  border-radius: 15px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
  max-width: 400px;
  width: 100%;
  text-align: center;
}

.login-form h2 {
  margin-bottom: 1rem;
  color: #0072ff;
}

.form-group {
  margin-bottom: 1rem;
}

.form-control {
  width: 100%;
  padding: 0.75rem;
  border: 1px solid #0072ff;
  border-radius: 25px;
  outline: none;
  transition: border-color 0.3s;
}

.form-control:focus {
  border-color: #00c6ff;
}

.submit-button {
  background: #0072ff;
  color: white;
  border: none;
  padding: 0.75rem 1.5rem;
  border-radius: 25px;
  cursor: pointer;
  transition: background 0.3s;
}

.submit-button:hover {
  background: #00c6ff;
}
</style>
