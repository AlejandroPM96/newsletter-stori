<template>
  <div class="newsletter-launcher">
    <h2>Select a Newsletter to Launch</h2>
    <select v-model="selectedNewsletter" class="newsletter-select">
      <option v-for="newsletter in newsletters" :key="newsletter.name" :value="newsletter.name">
        {{ newsletter.name }} ({{ newsletter.recipients }} recipients)
      </option>
    </select>
    <button @click="launchNewsletter" class="launch-button">Launch Newsletter</button>
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
      isError: false
    }
  },
  setup() {
    const newsletterStore = useNewsletterStore()
    const { newsletters } = newsletterStore

    onMounted(async () => {
      await newsletterStore.fetchNewsletters()
    })
    return {
      newsletters
    }
  },
  methods: {
    async launchNewsletter() {
      console.log(this.selectedNewsletter)
      if (!this.selectedNewsletter) {
        this.launchMessage = 'Please select a newsletter.'
        return
      }

      try {
        const apiUrl = import.meta.env.VITE_API_BASE_URL
        const response = await axios.post(apiUrl + '/send-newsletter', {
          name: this.selectedNewsletter
        })

        console.log('Launch Response:', response.data)
        this.launchMessage = `Successfully launched ${this.selectedNewsletter}!`
        this.isError = false
      } catch (error) {
        console.error('Error launching newsletter:', error)
        this.launchMessage = 'Failed to launch the newsletter. Please try again.'
        this.isError = true
      }
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

.launch-button {
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
</style>
