<template>
  <div class="parent-container">
    <div class="login-wrapper">
      <LoginForm />
    </div>
  </div>
</template>

<script setup lang="ts">
import LoginForm from '../components/LoginForm.vue'
</script>

<style scoped>
.parent-container {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
}

.login-wrapper {
  width: 100%;
}
</style>
