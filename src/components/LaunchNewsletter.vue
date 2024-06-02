<template>
  <div class="newsletter-launcher">
    <h2>Select a Newsletter to Launch</h2>
    <br />
    <button :key="uniqueKey" @click="reloadNewsletters" class="reload-button">
      Reload Newsletters
    </button>
    <br />
    <br />
    <select v-model="selectedNewsletter" class="newsletter-select">
      <option v-for="newsletter in newsletters" :key="newsletter.name" :value="newsletter.name">
        {{ newsletter.name }} ({{ newsletter.recipients }} recipients)
      </option>
    </select>
    <button :disabled="isLoading" @click="launchNewsletter" class="launch-button">
      Launch Newsletter
    </button>
    <div v-if="isLoading" class="loading-circle"></div>
    <p v-if="launchMessage != ''" :class="['launch-message', { 'error-message': isError }]">
      {{ launchMessage }}
    </p>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, onMounted } from 'vue'
import { useNewsletterStore } from '../stores/newsletter'
import axios from 'axios'

export default defineComponent({
  name: 'LaunchNewsletter',
  data() {
    return {
      selectedNewsletter: '',
      launchMessage: '',
      isError: false,
      isLoading: false
    }
  },
  setup() {
    const newsletterStore = useNewsletterStore()
    const { newsletters } = newsletterStore
    var uniqueKey = 0
    onMounted(async () => {
      await newsletterStore.fetchNewsletters()
    })
    return {
      newsletters,
      uniqueKey
    }
  },
  methods: {
    async launchNewsletter() {
      console.log(this.selectedNewsletter)
      this.isLoading = true
      if (!this.selectedNewsletter) {
        this.launchMessage = 'Please select a newsletter.'
        return
      }

      try {
        const apiUrl = import.meta.env.VITE_API_BASE_URL
        const apiToken = import.meta.env.VITE_API_TOKEN
        const response = await axios.post(
          apiUrl + '/send-newsletter',
          {
            name: this.selectedNewsletter
          },
          {
            headers: { Authorization: 'Bearer ' + apiToken }
          }
        )
        this.launchMessage = `Successfully launched ${this.selectedNewsletter}!`
        this.isError = false
        this.isLoading = false
      } catch (error) {
        console.error('Error launching newsletter:', error)
        this.launchMessage = 'Failed to launch the newsletter. Please try again.'
        this.isError = true
        this.isLoading = false
      }
    },
    async reloadNewsletters() {
      console.log('reload')
      const newsletterStore = useNewsletterStore()
      await newsletterStore.fetchNewsletters()
      this.uniqueKey++
    }
  }
})
</script>

<style scoped>
.newsletter-launcher {
  padding: 20px;
  border: 2px solid #007bff;
  border-radius: 10px;
  background-color: #f0f8ff;
  text-align: center;
}

.newsletter-select {
  width: 100%;
  padding: 10px;
  margin-bottom: 20px;
  border: 2px solid #007bff;
  border-radius: 5px;
  background-color: #fff;
}

.launch-button,
.reload-button {
  padding: 10px 20px;
  background-color: #007bff;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
}

.launch-button:hover {
  background-color: #0056b3;
}

.launch-message {
  margin-top: 20px;
  font-weight: bold;
}

.error-message {
  color: red;
}

.launch-message:not(.error-message) {
  color: green;
}
.loading-circle {
  border: 5px solid #f3f3f3; /* Light grey */
  border-top: 5px solid #007bff; /* Blue (matches your theme) */
  border-radius: 50%;
  width: 50px;
  height: 50px;
  animation: spin 2s linear infinite;
  margin: 20px auto;
}

@keyframes spin {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
}
</style>
