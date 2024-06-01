<template>
  <div class="dashboard">
    <h2>Newsletter Dashboard</h2>
    <button @click="reloadNewsletters" class="reload-button">Reload Newsletters</button>
    <br />
    <br />
    <div :key="uniqueKey" class="newsletter-cards">
      <div
        v-for="(newsletter, index) in newsletters"
        :key="index"
        class="newsletter-card"
        :class="{ selected: selectedNewsletter === newsletter.name }"
        @click="selectNewsletter(newsletter)"
      >
        <h3>{{ newsletter.name }}</h3>
        <p><strong>Recipients:</strong> {{ newsletter.recipients }}</p>
      </div>
    </div>

    <div :key="uniqueKey" v-if="selectedNewsletterDetails" class="newsletter-details">
      <h3>Details for {{ selectedNewsletter }}</h3>
      <p><strong>Newsletter filename:</strong> {{ selectedNewsletterDetails.fileName }}</p>
      <p><strong>Emails sent:</strong> {{ selectedNewsletterDetails.emailsSent }}</p>
      <p>
        <strong>Emails unsubscribed:</strong> {{ selectedNewsletterDetails.unsubscribeCount || 0 }}
      </p>
    </div>

    <div class="add-recipient" v-if="selectedNewsletter">
      <h3>Add New Recipient</h3>
      <input
        v-model="newRecipient"
        type="email"
        placeholder="Recipient email"
        class="recipient-input"
      />
      <button @click="addRecipient" class="add-button" :disabled="isLoading">Add Recipient</button>
      <div v-if="isLoading" class="loading-circle"></div>
    </div>
  </div>
</template>
<script lang="ts">
import { defineComponent, ref, onMounted } from 'vue'
import { useNewsletterStore } from '../stores/newsletter'
import axios from 'axios'

export default defineComponent({
  setup() {
    const newsletterStore = useNewsletterStore()
    const { newsletters } = newsletterStore
    const selectedNewsletter = ref<string>('')
    const selectedNewsletterDetails = ref<any>(null)
    const newRecipient = ref<string>('')
    const isLoading = ref<boolean>(false)

    onMounted(async () => {
      await newsletterStore.fetchNewsletters()
    })

    const selectNewsletter = (newsletter) => {
      selectedNewsletter.value = newsletter.name
      selectedNewsletterDetails.value = newsletter
    }

    const addRecipient = async () => {
      if (!newRecipient.value) {
        alert('Please enter a valid email address.')
        return
      }

      try {
        isLoading.value = true
        const apiUrl = import.meta.env.VITE_API_BASE_URL
        const apiToken = import.meta.env.VITE_API_TOKEN
        console.log(apiUrl)
        const response = await axios.post(
          apiUrl + '/add-email',
          {
            email: newRecipient.value,
            name: selectedNewsletter.value
          },
          {
            headers: { Authorization: 'Bearer ' + apiToken }
          }
        )
        isLoading.value = false
        if (response.data.success) {
          newRecipient.value = ''
          alert('new recipient added.')
        } else {
          alert('Failed to add recipient.')
        }
      } catch (error) {
        isLoading.value = false
        console.error('Error adding recipient:', error)
        alert('An error occurred while adding the recipient.')
      }
    }

    return {
      newsletters,
      selectedNewsletter,
      selectedNewsletterDetails,
      newRecipient,
      selectNewsletter,
      addRecipient,
      isLoading
    }
  },
  methods: {
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
.reload-button {
  padding: 10px 20px;
  background-color: #007bff;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
}
.dashboard {
  padding: 20px;
  border: 2px solid #007bff;
  border-radius: 10px;
  background-color: #f0f8ff;
  max-width: 800px;
  margin: 0 auto;
  text-align: center;
}

.newsletter-cards {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 20px;
}

.newsletter-card {
  padding: 20px;
  border: 2px solid #007bff;
  border-radius: 10px;
  background-color: #fff;
  cursor: pointer;
  transition:
    background-color 0.3s,
    transform 0.3s;
  width: 200px;
  text-align: left;
}

.newsletter-card.selected {
  background-color: #007bff;
  color: white;
  transform: scale(1.05);
}

.newsletter-card:hover {
  background-color: #e0f0ff;
}

.newsletter-details {
  margin-top: 20px;
  padding: 20px;
  border: 2px solid #007bff;
  border-radius: 10px;
  background-color: #fff;
}

.add-recipient {
  margin-top: 20px;
}

.recipient-input {
  width: calc(100% - 120px);
  padding: 10px;
  border: 2px solid #007bff;
  border-radius: 5px;
  background-color: #fff;
}

.add-button {
  padding: 10px 20px;
  background-color: #007bff;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  margin-left: 10px;
}

.add-button:hover {
  background-color: #0056b3;
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
